
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/db';
import { scrapeMovieData } from '@/lib/scraper';
import { getBulgarianGenre } from '@/lib/genre-mapping';

/**
 * Scans all movies without categories and syncs them from IMDB
 */
export async function POST(req: Request) {
    try {
        await requireAdmin();

        const jobId = `sync-${Date.now()}`;
        const initialProgress = {
            total: 0,
            processed: 0,
            success: 0,
            failed: 0,
            skipped: 0,
            current: 'Searching for movies missing categories...'
        };

        await (prisma as any).$executeRawUnsafe(
            `INSERT INTO scraperjob (id, type, status, progress, startedAt, updatedAt) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            jobId, 'sync', 'running', JSON.stringify(initialProgress), new Date(), new Date()
        );

        // Run in background
        syncCategoriesInBackground(jobId).catch(async (err) => {
            console.error(`[${jobId}] Sync background error:`, err);
            await (prisma as any).$executeRawUnsafe(
                `UPDATE scraperjob SET status = ?, progress = ?, updatedAt = ? WHERE id = ? AND status != ?`,
                'error', JSON.stringify({ current: `Error: ${err.message}` }), new Date(), jobId, 'stopped'
            );
        });

        return NextResponse.json({
            success: true,
            jobId,
            message: 'Category sync started in background'
        });

    } catch (error: any) {
        console.error('Category sync error:', error);
        return NextResponse.json({ message: error.message || 'Error' }, { status: 500 });
    }
}

async function syncCategoriesInBackground(jobId: string) {
    try {
        // Find movies with no categories
        const moviesToFix = await (prisma as any).movie.findMany({
            where: {
                moviecategory: {
                    none: {}
                }
            },
            select: {
                id: true,
                imdbId: true,
                titleEN: true
            }
        });

        let progress = {
            total: moviesToFix.length,
            processed: 0,
            success: 0,
            failed: 0,
            skipped: 0,
            current: moviesToFix.length > 0 ? `Syncing ${moviesToFix.length} movies...` : 'No movies missing categories.'
        };

        await (prisma as any).$executeRawUnsafe(
            `UPDATE scraperjob SET progress = ?, updatedAt = ? WHERE id = ? AND status != ?`,
            JSON.stringify(progress), new Date(), jobId, 'stopped'
        );

        if (moviesToFix.length === 0) {
            await (prisma as any).$executeRawUnsafe(
                `UPDATE scraperjob SET status = ?, updatedAt = ? WHERE id = ?`,
                'completed', new Date(), jobId
            );
            return;
        }

        for (const movieItem of moviesToFix) {
            const movie = movieItem as any;
            // Check for stop signal
            const jobs = await (prisma as any).$queryRawUnsafe(`SELECT status FROM scraperjob WHERE id = ?`, jobId);
            if (!jobs || jobs.length === 0 || jobs[0].status === 'stopped') break;

            if (!movie.imdbId) {
                progress.skipped++;
                progress.processed++;
                await (prisma as any).$executeRawUnsafe(
                    `UPDATE scraperjob SET progress = ?, updatedAt = ? WHERE id = ? AND status != ?`,
                    JSON.stringify(progress), new Date(), jobId, 'stopped'
                );
                continue;
            }

            try {
                // Create log entry using raw SQL
                await (prisma as any).$executeRawUnsafe(
                    `INSERT INTO scraperlog (jobId, level, message, metadata, createdAt) 
                     VALUES (?, ?, ?, ?, ?)`,
                    jobId, 'info', `Syncing: ${movie.titleEN || movie.imdbId}`,
                    JSON.stringify({ imdbId: movie.imdbId }),
                    new Date()
                );

                const logResults = await (prisma as any).$queryRawUnsafe(`SELECT LAST_INSERT_ID() as id`);
                const logId = Number(logResults[0].id);

                const imdbUrl = `https://www.imdb.com/title/${movie.imdbId}/`;
                const imdbData = await scrapeMovieData(imdbUrl);

                if (imdbData && imdbData.genres && imdbData.genres.length > 0) {
                    // Create/Connect categories
                    for (const rawGenre of imdbData.genres) {
                        const bgName = getBulgarianGenre(rawGenre);
                        const slug = rawGenre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

                        const category = await (prisma.category as any).upsert({
                            where: { name: bgName },
                            update: {},
                            create: {
                                name: bgName,
                                nameEN: rawGenre,
                                slug
                            }
                        });

                        await (prisma as any).moviecategory.upsert({
                            where: {
                                movieId_categoryId: {
                                    movieId: movie.id,
                                    categoryId: category.id
                                }
                            },
                            update: {},
                            create: {
                                movieId: movie.id,
                                categoryId: category.id
                            }
                        });
                    }
                    progress.success++;
                    await (prisma as any).$executeRawUnsafe(
                        `UPDATE scraperlog SET level = ?, message = ? WHERE id = ?`,
                        'success', `Synced! Genres: ${imdbData.genres.join(', ')}`, logId
                    );
                } else {
                    progress.failed++;
                    await (prisma as any).$executeRawUnsafe(
                        `UPDATE scraperlog SET level = ?, message = ? WHERE id = ?`,
                        'error', 'No genres found on IMDB', logId
                    );
                }
            } catch (err: any) {
                console.error(`Failed to sync ${movie.titleEN}:`, err);
                progress.failed++;
            }

            progress.processed++;
            progress.current = `Synced: ${progress.processed}/${progress.total}`;
            await (prisma as any).$executeRawUnsafe(
                `UPDATE scraperjob SET progress = ?, updatedAt = ? WHERE id = ? AND status != ?`,
                JSON.stringify(progress), new Date(), jobId, 'stopped'
            );

            // Small delay to avoid IMDB blocks
            await new Promise(r => setTimeout(r, 800));
        }

        await (prisma as any).$executeRawUnsafe(
            `UPDATE scraperjob SET status = ?, progress = ?, updatedAt = ? WHERE id = ? AND status != ?`,
            'completed',
            JSON.stringify({ ...progress, current: 'Sync complete!' }),
            new Date(), jobId, 'stopped'
        );

    } catch (error: any) {
        console.error('Category sync error:', error);
        await (prisma as any).$executeRawUnsafe(
            `UPDATE scraperjob SET status = ?, updatedAt = ? WHERE id = ? AND status != ?`,
            'error', new Date(), jobId, 'stopped'
        );
    }
}
