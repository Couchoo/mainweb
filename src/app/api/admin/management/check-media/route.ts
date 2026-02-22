import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

// Global variable to track if a loop is already running in this process
// This helps prevent double-spawning if the user clicks start multiple times quickly
let isMaintenanceRunning = false;

export async function GET() {
    try {
        await requireAdmin();
        const job = await (prisma as any).scraperjob.findFirst({
            where: { type: 'MAINTENANCE', status: 'RUNNING' },
            orderBy: { startedAt: 'desc' }
        });

        if (job) {
            return NextResponse.json({
                running: true,
                job,
                stats: job.progress ? JSON.parse(job.progress) : { checked: 0, broken: 0, fixed: 0, removed: 0 }
            });
        }

        // Return last completed/stopped job for context
        const lastJob = await (prisma as any).scraperjob.findFirst({
            where: { type: 'MAINTENANCE' },
            orderBy: { startedAt: 'desc' }
        });

        return NextResponse.json({
            running: false,
            job: lastJob,
            stats: lastJob && lastJob.progress ? JSON.parse(lastJob.progress) : { checked: 0, broken: 0, fixed: 0, removed: 0 }
        });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await requireAdmin();
        const { action, movieId } = await req.json();

        // --- START ACTION ---
        if (action === 'start') {
            // Check for existing running job
            const existing = await (prisma as any).scraperjob.findFirst({
                where: { type: 'MAINTENANCE', status: 'RUNNING' }
            });

            if (existing) {
                // Trigger the loop just in case it died but DB says running (recovery)
                if (!isMaintenanceRunning) runMaintenanceLoop(existing.id);
                return NextResponse.json({ success: true, message: 'Job already running', jobId: existing.id });
            }

            // Create new job
            const newJob = await (prisma as any).scraperjob.create({
                data: {
                    id: uuidv4(),
                    type: 'MAINTENANCE',
                    status: 'RUNNING',
                    progress: JSON.stringify({ checked: 0, broken: 0, fixed: 0, removed: 0 }),
                    logs: {
                        create: { level: 'INFO', message: 'Maintenance scan started' }
                    }
                }
            });

            // Start background process
            runMaintenanceLoop(newJob.id);

            return NextResponse.json({ success: true, jobId: newJob.id });
        }

        if (action === 'list_broken') {
            const broken = await (prisma as any).movie.findMany({
                where: { healthStatus: 'BROKEN', published: true },
                select: { id: true, titleEN: true, healthStatus: true }
            });
            // Map to frontend expectation
            const formatted = broken.map((m: any) => ({
                id: m.id,
                title: m.titleEN,
                status: 'BROKEN',
                logs: ['Detected as broken']
            }));
            return NextResponse.json({ success: true, results: formatted });
        }

        // --- STOP ACTION ---
        if (action === 'stop') {
            await (prisma as any).scraperjob.updateMany({
                where: { type: 'MAINTENANCE', status: 'RUNNING' },
                data: { status: 'STOPPED' }
            });
            return NextResponse.json({ success: true });
        }

        // --- FIX ACTION ---
        if (action === 'fix' && movieId) {
            return await handleFixAction(movieId);
        }

        // --- UNPUBLISH ACTION ---
        if (action === 'unpublish' && movieId) {
            await (prisma as any).movie.update({
                where: { id: movieId },
                data: { published: false, healthStatus: 'BROKEN' }
            });
            return NextResponse.json({ success: true });
        }

        // --- CHECK SINGLE ACTION ---
        if (action === 'check-single' && movieId) {
            const movie = await (prisma as any).movie.findUnique({
                where: { id: Number(movieId) },
                include: { videoserver: true }
            });

            if (!movie) return NextResponse.json({ error: 'Movie not found' }, { status: 404 });

            const checkResult = await checkMovieAvailability(movie);

            await (prisma as any).movie.update({
                where: { id: movie.id },
                data: {
                    healthStatus: checkResult.isAvailable ? 'OK' : 'BROKEN',
                    lastChecked: new Date()
                }
            });

            return NextResponse.json({
                success: true,
                result: {
                    id: movie.id,
                    title: movie.titleEN,
                    status: checkResult.isAvailable ? 'OK' : 'BROKEN',
                    logs: checkResult.logs
                }
            });
        }

        // --- SEARCH ACTION ---
        if (action === 'search') {
            const { query } = await req.json();
            if (!query || query.length < 2) return NextResponse.json({ success: true, results: [] });

            const movies = await (prisma as any).movie.findMany({
                where: {
                    OR: [
                        { titleEN: { contains: query } },
                        { titleBG: { contains: query } }
                    ]
                },
                take: 5,
                select: { id: true, titleEN: true, titleBG: true, posterUrl: true }
            });

            return NextResponse.json({ success: true, results: movies });
        }

        return NextResponse.json({ success: false, error: 'Invalid action' });

    } catch (error: any) {
        console.error('Maintenance error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// --- BACKGROUND WORKER ---
async function runMaintenanceLoop(jobId: string) {
    if (isMaintenanceRunning) return;
    isMaintenanceRunning = true;

    console.log(`[Maintenance] Starting loop for job ${jobId}`);

    try {
        let keepRunning = true;

        // Initial Stats
        let stats = { checked: 0, broken: 0, fixed: 0, removed: 0 };

        // Load initial stats if resuming? For now, start fresh or load from DB.
        const initialJob = await (prisma as any).scraperjob.findUnique({ where: { id: jobId } });
        if (initialJob && initialJob.progress) {
            try { stats = JSON.parse(initialJob.progress); } catch (e) { }
        }

        while (keepRunning) {
            // 1. Check Job Status
            const job = await (prisma as any).scraperjob.findUnique({ where: { id: jobId } });
            if (!job || job.status !== 'RUNNING') {
                console.log('[Maintenance] Job stopped or deleted.');
                keepRunning = false;
                break;
            }

            // 2. Fetch Batch - SMART PRIORITIZATION
            // Check popular movies first (most viewed), then oldest unchecked
            const movies = await (prisma as any).movie.findMany({
                where: {
                    published: true,
                    OR: [
                        { healthStatus: 'UNKNOWN' },
                        { healthStatus: 'BROKEN' },
                        { lastChecked: { lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }
                    ]
                },
                orderBy: [
                    { views: 'desc' },        // Popular movies first
                    { lastChecked: 'asc' }    // Then oldest
                ],
                take: 5,
                include: { videoserver: true }
            });

            if (movies.length === 0) {
                console.log('[Maintenance] No more movies to check. Complete.');
                await (prisma as any).scraperjob.update({
                    where: { id: jobId },
                    data: { status: 'COMPLETED' }
                });
                keepRunning = false;
                break;
            }

            // 3. Process Batch
            for (const movie of movies) {
                // Double check status inside loop
                const currentJob = await (prisma as any).scraperjob.findUnique({ where: { id: jobId }, select: { status: true } });
                if (currentJob?.status !== 'RUNNING') { keepRunning = false; break; }

                const checkResult = await checkMovieAvailability(movie);

                await (prisma as any).movie.update({
                    where: { id: movie.id },
                    data: {
                        healthStatus: checkResult.isAvailable ? 'OK' : 'BROKEN',
                        lastChecked: new Date()
                    }
                });

                // Update counts
                stats.checked++;
                if (!checkResult.isAvailable) stats.broken++;

                // Log failure details to scraperlog
                if (!checkResult.isAvailable) {
                    await (prisma as any).scraperlog.create({
                        data: {
                            jobId,
                            level: 'WARN',
                            message: `[${movie.titleEN}] Broken: ${checkResult.logs[0] || 'Unknown error'}`
                        }
                    });
                }

                // CRITICAL: Add delay to avoid rate limiting
                // Vidsrc blocks rapid requests from same IP
                console.log('[Health Check] Waiting 10s before next check...');
                await new Promise(resolve => setTimeout(resolve, 10000));
            }

            // 4. Update Job Progress
            await (prisma as any).scraperjob.update({
                where: { id: jobId },
                data: {
                    progress: JSON.stringify(stats),
                    updatedAt: new Date()
                }
            });
        }

    } catch (e) {
        console.error('[Maintenance] Loop crashed:', e);
        await (prisma as any).scraperjob.update({
            where: { id: jobId },
            data: { status: 'ERROR' }
        });
    } finally {
        isMaintenanceRunning = false;
    }
}

async function handleFixAction(movieId: string | number) {
    const movie = await (prisma as any).movie.findUnique({
        where: { id: Number(movieId) },
        include: { videoserver: true }
    });

    if (!movie) return NextResponse.json({ error: 'Movie not found' }, { status: 404 });

    if (!movie.imdbId) {
        return NextResponse.json({ success: true, fixed: false, logs: ['No IMDB ID - cannot auto-fix'] });
    }

    // Try alternative servers with simple HTTP checks
    const alternativeServers = [
        { name: 'Vidsrc.to', url: `https://vidsrc.to/embed/movie/${movie.imdbId}` },
        { name: 'Vidsrc.me', url: `https://vidsrc.me/embed/movie?imdb=${movie.imdbId}` },
    ];

    const existingUrls = new Set(movie.videoserver.map((s: any) => s.url));
    let addedCount = 0;

    for (const server of alternativeServers) {
        if (existingUrls.has(server.url)) continue;

        try {
            // Simple HTTP HEAD check
            const response = await fetch(server.url, {
                method: 'HEAD',
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });

            if (response.ok) {
                await (prisma as any).videoserver.create({
                    data: {
                        movieId: movie.id,
                        name: server.name,
                        url: server.url,
                        order: 99 + addedCount
                    }
                });
                addedCount++;
            }
        } catch (error) {
            // Server failed, try next one
            continue;
        }

        // Delay between checks
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    if (addedCount > 0) {
        await (prisma as any).movie.update({
            where: { id: movie.id },
            data: { healthStatus: 'OK', lastChecked: new Date() }
        });

        return NextResponse.json({
            success: true,
            fixed: true,
            logs: [`Added ${addedCount} alternative server(s)`]
        });
    }

    return NextResponse.json({ success: true, fixed: false, logs: ['No working alternatives found'] });
}

// Logic from previous step, effectively reused
async function checkMovieAvailability(movie: any) {
    const servers = movie.videoserver;
    let isAvailable = false;
    let logs = [];

    if (servers.length === 0) return { isAvailable: false, logs: ['No servers'] };

    for (const server of servers) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            const res = await fetch(server.url, {
                method: 'GET',
                signal: controller.signal,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Referer': 'https://vidsrc.me/'
                }
            });
            clearTimeout(timeoutId);

            if (res.ok) {
                const text = await res.text();
                // Check if pseudo-success
                if (text.includes('404 Not Found') || text.includes('File not found') || text.length < 500) {
                    logs.push(`${server.name}: Soft 404`);
                } else {
                    isAvailable = true;
                    break;
                }
            } else {
                logs.push(`${server.name}: HTTP ${res.status}`);
            }
        } catch (error: any) {
            logs.push(`${server.name}: ${error.message}`);
        }
    }
    return { isAvailable, logs };
}
