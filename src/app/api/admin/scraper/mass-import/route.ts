import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/db';
import { scrapeMovieData } from '@/lib/scraper';
import { getBulgarianGenre } from '@/lib/genre-mapping';
import { publishToWS } from '@/lib/ws-publisher';
import { SmartQueue } from '@/lib/scraper-utils';

interface JobLog {
    imdbId: string;
    title: string;
    status: 'success' | 'failed' | 'skipped' | 'processing';
    message?: string;
    posterUrl?: string;
    timestamp: number;
}

interface ImportJob {
    id: string;
    platform: string;
    status: 'running' | 'paused' | 'completed' | 'error' | 'scraping';
    progress: {
        total: number;
        processed: number;
        success: number;
        failed: number;
        skipped: number;
        current: string;
    };
    logs: JobLog[];
    startedAt: Date;
}

// Job storage is now in the database

/**
 * Start mass import from a platform
 * NEW LOGIC:
 * 1. BG sites → only get movie titles + IMDB IDs
 * 2. IMDB → scrape all metadata
 * 3. Vidsrc → get video stream (with multi-language subtitles)
 */
export async function POST(req: Request) {
    try {
        await requireAdmin();
        const { platform, startPage, endPage } = await req.json();

        console.log(`[API] Received import request: platform=${platform}, pages=${startPage}-${endPage}`);

        // Create job in database using raw SQL
        const jobId = `${platform}-${Date.now()}`;
        const initialProgress = {
            total: 0,
            processed: 0,
            success: 0,
            failed: 0,
            skipped: 0,
            current: 'Initializing engine...'
        };

        await (prisma as any).$executeRawUnsafe(
            `INSERT INTO scraperjob (id, type, status, progress, startedAt, updatedAt) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            jobId, 'import', 'running', JSON.stringify(initialProgress), new Date(), new Date()
        );

        // Start background import
        importMoviesInBackground(jobId, startPage || 1, endPage || 999).catch(async (error) => {
            console.error(`[${jobId}] Background import failed:`, error);
            await (prisma as any).$executeRawUnsafe(
                `UPDATE scraperjob SET status = ?, progress = ?, updatedAt = ? WHERE id = ? AND status != ?`,
                'error', JSON.stringify({ ...initialProgress, current: `Error: ${error.message}` }), new Date(), jobId, 'stopped'
            );
        });

        return NextResponse.json({
            success: true,
            jobId,
            message: 'Import started in background'
        });

    } catch (error: any) {
        console.error('Mass import error:', error);
        return NextResponse.json({ message: error.message || 'Error' }, { status: 500 });
    }
}

/**
 * Background import process
 */
async function importMoviesInBackground(
    jobId: string,
    startPage: number,
    endPage: number
) {
    let startingState = { genreIndex: 0, pagesProcessed: 0 };
    let progress = {
        total: 0,
        processed: 0,
        success: 0,
        failed: 0,
        skipped: 0,
        noStream: 0,
        current: 'Scraping IMDB...',
        state: startingState
    };

    try {
        await (prisma as any).$executeRawUnsafe(
            `UPDATE scraperjob SET status = ?, updatedAt = ? WHERE id = ? AND status != ?`,
            'scraping', new Date(), jobId, 'stopped'
        );

        const { FastIMDBScraper } = await import('@/lib/scrapers/fast-imdb-scraper');
        const imdbScraper = new FastIMDBScraper();

        // Find most recent job of same type to potentially resume
        const lastJobs = await (prisma as any).$queryRawUnsafe(
            `SELECT progress FROM scraperjob WHERE type = 'import' ORDER BY startedAt DESC LIMIT 1`
        );
        if (lastJobs && lastJobs.length > 0) {
            try {
                const lastProgress = typeof lastJobs[0].progress === 'string' ? JSON.parse(lastJobs[0].progress) : lastJobs[0].progress;
                if (lastProgress && lastProgress.state) {
                    progress.state = lastProgress.state;
                    startingState = lastProgress.state;
                    console.log(`[${jobId}] Resuming from last state:`, progress.state);
                }
            } catch (e) {
                console.error("Failed to parse last job progress:", e);
            }
        }
        const onProgress = async (phase: string, page: number, total: number, movies: any[], state: { genreIndex: number, pagesProcessed: number }) => {
            progress.current = phase;
            progress.state = state;
            await (prisma as any).$executeRawUnsafe(
                `UPDATE scraperjob SET progress = ?, updatedAt = ? WHERE id = ? AND status != ?`,
                JSON.stringify(progress), new Date(), jobId, 'stopped'
            );

            // Broadcast progress to WebSocket
            await publishToWS('scraper:status', {
                jobId,
                status: 'running',
                progress
            });
        };

        // CONCURRENT MOVIE PROCESSOR
        const onMovieFound = async (movie: any) => {
            // IMMEDIATE ABORT CHECK
            const jobs = await (prisma as any).$queryRawUnsafe(`SELECT status FROM scraperjob WHERE id = ?`, jobId);
            if (!jobs || jobs.length === 0 || jobs[0].status === 'stopped') {
                console.log(`[${jobId}] STOP SIGNAL RECEIVED - Terminating background loop.`);
                throw new Error('JOB_CANCELLED');
            }

            progress.total++;
            progress.current = `Processing: ${movie.title}`;

            await (prisma as any).$executeRawUnsafe(
                `UPDATE scraperjob SET status = ?, progress = ?, updatedAt = ? WHERE id = ? AND status != ?`,
                'running', JSON.stringify(progress), new Date(), jobId, 'stopped'
            );

            // Create log entry using raw SQL
            await (prisma as any).$executeRawUnsafe(
                `INSERT INTO scraperlog (jobId, level, message, metadata, createdAt) 
                 VALUES (?, ?, ?, ?, ?)`,
                jobId, 'info', `Processing: ${movie.title}`,
                JSON.stringify({ imdbId: movie.imdbId, posterUrl: movie.posterUrl }),
                new Date()
            );

            // Get the last log ID (MySQL)
            const logResults = await (prisma as any).$queryRawUnsafe(`SELECT LAST_INSERT_ID() as id`);
            const logId = Number(logResults[0].id);

            try {
                // ABORT CHECK
                const jobs = await (prisma as any).$queryRawUnsafe(`SELECT status FROM scraperjob WHERE id = ?`, jobId);
                if (!jobs || jobs.length === 0 || jobs[0].status === 'stopped') {
                    console.log(`[${jobId}] ABORTING: Job was cancelled or not found.`);
                    throw new Error('JOB_CANCELLED');
                }

                let movieSlug = generateSlug(movie.title);
                if (!movieSlug || movieSlug.length < 2) {
                    movieSlug = movie.imdbId; // Fallback to IMDB ID to prevent break
                }

                // Check if exists
                const existing = await (prisma as any).movie.findFirst({
                    where: {
                        OR: [
                            { imdbId: movie.imdbId },
                            { slug: movieSlug }
                        ]
                    }
                });

                if (existing) {
                    progress.skipped++;
                    progress.processed++;
                    await (prisma as any).$executeRawUnsafe(
                        `UPDATE scraperjob SET progress = ?, updatedAt = ? WHERE id = ? AND status != ?`,
                        JSON.stringify(progress), new Date(), jobId, 'stopped'
                    );
                    await (prisma as any).$executeRawUnsafe(
                        `UPDATE scraperlog SET level = ?, message = ? WHERE id = ?`,
                        'skip', 'Already exists in database', logId
                    );
                    return;
                }

                // Scrape IMDB metadata & Import
                const imdbUrl = `https://www.imdb.com/title/${movie.imdbId}/`;
                const imdbData = await scrapeMovieData(imdbUrl);

                if (!imdbData || !imdbData.titleEN) {
                    progress.failed++;
                    progress.processed++;
                    await (prisma as any).$executeRawUnsafe(
                        `UPDATE scraperjob SET progress = ?, updatedAt = ? WHERE id = ? AND status != ?`,
                        JSON.stringify(progress), new Date(), jobId, 'stopped'
                    );
                    await (prisma as any).$executeRawUnsafe(
                        `UPDATE scraperlog SET level = ?, message = ? WHERE id = ?`,
                        'error', 'IMDB detailed scraping failed', logId
                    );
                    return;
                }

                // ADD VIDEO SERVERS - TEMPLATE URLs (No Validation)
                // Fast import - validation happens later via health check
                console.log(`[Import] Adding template URLs for ${movie.title}...`);

                // Create movie with categories
                const categoriesToLink = (imdbData.genres || []).map((rawGenre: string) => {
                    const bgGenre = getBulgarianGenre(rawGenre);
                    const slug = bgGenre.toLowerCase().replace(/[^а-яa-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

                    return {
                        category: {
                            connectOrCreate: {
                                where: { name: bgGenre },
                                create: {
                                    name: bgGenre,
                                    slug: slug
                                }
                            }
                        }
                    };
                });

                const newMovie = await (prisma as any).movie.create({
                    data: {
                        titleBG: imdbData.titleBG || imdbData.titleEN,
                        titleEN: imdbData.titleEN,
                        slug: movieSlug,
                        description: imdbData.description,
                        year: parseInt(imdbData.year) || new Date().getFullYear(),
                        duration: imdbData.duration ? parseInt(imdbData.duration) : null,
                        director: imdbData.director,
                        cast: imdbData.cast,
                        posterUrl: imdbData.posterUrl || movie.posterUrl,
                        rating: imdbData.rating ? parseFloat(imdbData.rating) : null,
                        imdbId: movie.imdbId,
                        imdbLink: imdbUrl,
                        published: false,
                        healthStatus: 'PENDING',
                        moviecategory: {
                            create: categoriesToLink
                        },
                        videoserver: {
                            create: [
                                {
                                    name: 'Vidsrc',
                                    url: `https://vidsrc.xyz/embed/movie/${movie.imdbId}`,
                                    order: 1
                                }
                            ]
                        }
                    },
                    include: {
                        videoserver: true,
                        moviecategory: { include: { category: true } }
                    }
                });

                // Validate vidsrc servers using SmartQueue
                const { checkServerLink } = await import('@/lib/health/link-checker');
                let hasValidVidsrc = false;
                const vidsrcQueue = SmartQueue.get('vidsrc.xyz', 1, 3000);

                for (const server of newMovie.videoserver) {
                    if (server.name.toLowerCase().includes('vidsrc')) {
                        console.log(`[Import] Queueing validation for ${server.name}: ${server.url}`);

                        const validation = await vidsrcQueue.add(() =>
                            checkServerLink(server.url, 0, server.name)
                        );

                        if (validation.isWorking) {
                            hasValidVidsrc = true;
                            console.log(`[Import] ✅ ${server.name} is valid`);
                            break;
                        } else {
                            console.log(`[Import] ❌ ${server.name} is invalid`);
                        }
                    }
                }

                // If no valid vidsrc found, mark for auto-validation
                if (!hasValidVidsrc) {
                    console.log(`[Import] No valid vidsrc found - setting to PENDING`);

                    await (prisma as any).$executeRawUnsafe(`
                        UPDATE movie 
                        SET published = 0, healthStatus = 'PENDING'
                        WHERE id = ?
                    `, newMovie.id);

                    await (prisma as any).$executeRawUnsafe(
                        `UPDATE scraperlog SET level = ?, message = ? WHERE id = ?`,
                        'warn', '🟠 Validation failed - Status set to PENDING for auto-check', logId
                    );

                    // Increment noStream counter
                    progress.noStream++;
                } else {
                    // Successfully validated - Publish!
                    await (prisma as any).$executeRawUnsafe(`
                        UPDATE movie 
                        SET published = 1, healthStatus = 'OK'
                        WHERE id = ?
                    `, newMovie.id);

                    await (prisma as any).$executeRawUnsafe(
                        `UPDATE scraperlog SET level = ?, message = ? WHERE id = ?`,
                        'success', '✅ Imported successfully', logId
                    );
                }

                // Try to auto-group into collection
                try {
                    const { autoGroupMovieToCollection } = await import('@/lib/collection-utils');
                    await autoGroupMovieToCollection(newMovie.id, newMovie.titleEN);
                } catch (collErr) {
                    console.error(`[Import] Collection grouping failed for ${newMovie.titleEN}:`, collErr);
                }

                progress.success++;
                progress.processed++;
                progress.current = `Imported: ${movie.title} (vidsrc.xyz)`;
                await (prisma as any).$executeRawUnsafe(
                    `UPDATE scraperjob SET progress = ?, updatedAt = ? WHERE id = ? AND status != ?`,
                    JSON.stringify(progress), new Date(), jobId, 'stopped'
                );

            } catch (error: any) {
                if (error.message === 'JOB_CANCELLED') throw error;
                progress.failed++;
                progress.processed++;
                await (prisma as any).$executeRawUnsafe(
                    `UPDATE scraperjob SET progress = ?, updatedAt = ? WHERE id = ? AND status != ?`,
                    JSON.stringify(progress), new Date(), jobId, 'stopped'
                );
                await (prisma as any).$executeRawUnsafe(
                    `UPDATE scraperlog SET level = ?, message = ? WHERE id = ?`,
                    'error', error.message, logId
                );
            }
        };

        // Start concurrent scraping + importing
        try {
            await imdbScraper.scrapeMultiplePages(
                endPage || 20,
                2, // Reduced batch size for stability
                async (movie) => {
                    return onMovieFound(movie);
                },
                onProgress,
                startingState
            );
        } catch (err: any) {
            if (err.message === 'RATE_LIMIT_EXCEEDED') {
                console.log(`[${jobId}] RATE LIMIT DETECTED - Entering Cooldown Mode (5 mins)`);

                await publishToWS('scraper:status', {
                    jobId,
                    status: 'paused',
                    message: 'Rate limit hit. Cooling down for 5 minutes...'
                });

                await (prisma as any).$executeRawUnsafe(
                    `UPDATE scraperjob SET status = ?, updatedAt = ? WHERE id = ?`,
                    'paused', new Date(), jobId
                );

                // Wait 5 minutes
                await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));

                console.log(`[${jobId}] Cooldown finished. Resuming...`);

                // Restart the background process with same parameters (it will resume from state)
                importMoviesInBackground(jobId, startPage, endPage);
                return;
            }
            throw err;
        }

        await (prisma as any).$executeRawUnsafe(
            `UPDATE scraperjob SET status = ?, progress = ?, updatedAt = ? WHERE id = ? AND status != ?`,
            'completed',
            JSON.stringify({ ...progress, current: `Completed! ${progress.success} imported, ${progress.failed} failed, ${progress.skipped} skipped` }),
            new Date(), jobId, 'stopped'
        );

        await publishToWS('scraper:status', {
            jobId,
            status: 'completed',
            progress
        });

    } catch (error: any) {
        if (error.message === 'JOB_CANCELLED') {
            await (prisma as any).$executeRawUnsafe(
                `UPDATE scraperjob SET status = ?, updatedAt = ? WHERE id = ?`,
                'stopped', new Date(), jobId
            );
            await publishToWS('scraper:status', { jobId, status: 'stopped' });
            return;
        }
        console.error(`[${jobId}] FATAL ERROR:`, error);
        await (prisma as any).$executeRawUnsafe(
            `UPDATE scraperjob SET status = ?, progress = ?, updatedAt = ? WHERE id = ? AND status != ?`,
            'error', JSON.stringify({ ...progress, current: `Fatal error: ${error.message}` }), new Date(), jobId, 'stopped'
        );
        await publishToWS('scraper:status', {
            jobId,
            status: 'error',
            message: error.message
        });
    }
}


function generateSlug(title: string): string {
    if (!title) return '';
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove all non-word chars (except space and -)
        .replace(/[\s_]+/g, '-')  // Replace spaces and underscores with -
        .replace(/--+/g, '-')      // Replace multiple - with single -
        .replace(/^-+|-+$/g, ''); // Trim - from start and end
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get job status from database using raw SQL
 */
export async function GET(req: Request) {
    try {
        await requireAdmin();
        const { searchParams } = new URL(req.url);
        const jobId = searchParams.get('jobId');

        if (!jobId) {
            // GET - Return all active jobs (import only, exclude maintenance)
            const jobs = await (prisma as any).$queryRawUnsafe(
                `SELECT * FROM scraperjob
                 WHERE status = 'running' AND type = 'import'
                 ORDER BY startedAt DESC`
            );

            // Get logs for each job (import only)
            for (const job of jobs) {
                const logs = await (prisma as any).$queryRawUnsafe(
                    `SELECT l.* FROM scraperlog l
                     INNER JOIN scraperjob j ON l.jobId = j.id
                     WHERE l.jobId = ? AND j.type = 'import'
                     ORDER BY l.createdAt DESC
                     LIMIT 100`,
                    job.id
                );
                job.logs = logs.map((l: any) => ({
                    ...l,
                    metadata: typeof l.metadata === 'string' ? JSON.parse(l.metadata) : l.metadata
                }));
                job.progress = typeof job.progress === 'string' ? JSON.parse(job.progress) : job.progress;
            }

            return NextResponse.json({ jobs });
        }

        // Get job details
        const jobResult = await (prisma as any).$queryRawUnsafe(
            `SELECT * FROM scraperjob WHERE id = ? LIMIT 1`,
            jobId
        );

        if (!jobResult || jobResult.length === 0) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

        const job = jobResult[0];

        // Get logs - ONLY for import jobs, exclude maintenance
        const logs = await (prisma as any).$queryRawUnsafe(
            `SELECT l.* FROM scraperlog l
             INNER JOIN scraperjob j ON l.jobId = j.id
             WHERE l.jobId = ? AND j.type = 'import'
             ORDER BY l.createdAt DESC 
             LIMIT 50`,
            jobId
        );

        job.logs = logs.map((l: any) => ({
            ...l,
            metadata: typeof l.metadata === 'string' ? JSON.parse(l.metadata) : l.metadata
        }));
        job.progress = typeof job.progress === 'string' ? JSON.parse(job.progress) : job.progress;

        return NextResponse.json(job);

    } catch (error: any) {
        console.error('Job status error:', error);
        return NextResponse.json({ message: error.message || 'Error' }, { status: 500 });
    }
}

/**
 * Stop/clear all jobs in database using raw SQL
 */
export async function DELETE(req: Request) {
    try {
        await requireAdmin();

        // Mark all running jobs as stopped
        await (prisma as any).$executeRawUnsafe(
            `UPDATE scraperjob SET status = ?, updatedAt = ? WHERE status IN ('running', 'scraping')`,
            'stopped', new Date()
        );

        // Async cleanup of old logs (older than 1 hour)
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        (prisma as any).$executeRawUnsafe(
            `DELETE FROM scraperlog WHERE createdAt < ?`,
            oneHourAgo
        ).catch(() => { });

        return NextResponse.json({
            success: true,
            message: 'All jobs marked as stopped'
        });

    } catch (error: any) {
        console.error('Stop jobs error:', error);
        return NextResponse.json({ message: error.message || 'Error' }, { status: 500 });
    }
}
