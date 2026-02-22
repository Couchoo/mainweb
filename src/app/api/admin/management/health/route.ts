import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { HealthMonitor, getActiveMonitor, setActiveMonitor } from '@/lib/health/health-monitor';
import { getTotalMoviesNeedingCheck } from '@/lib/health/priority-queue';

/**
 * Health Check API
 * 
 * GET    /api/admin/maintenance/health        - Get current status
 * POST   /api/admin/maintenance/health/start  - Start health check
 * POST   /api/admin/maintenance/health/stop   - Stop health check
 * GET    /api/admin/maintenance/health/logs   - Get recent logs
 */

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const action = searchParams.get('action');

        // Get logs
        if (action === 'logs') {
            const jobId = searchParams.get('jobId');

            if (!jobId) {
                return NextResponse.json({ error: 'jobId required' }, { status: 400 });
            }

            const logs = await (prisma as any).$queryRawUnsafe(
                `SELECT * FROM scraperlog 
                 WHERE jobId = ? 
                 ORDER BY createdAt DESC 
                 LIMIT 50`,
                jobId
            );

            return NextResponse.json({ logs });
        }

        // Get status
        const activeJob = await (prisma as any).$queryRawUnsafe(
            `SELECT * FROM scraperjob 
             WHERE type = 'MAINTENANCE' AND status = 'RUNNING' 
             ORDER BY startedAt DESC 
             LIMIT 1`
        );

        if (!activeJob || activeJob.length === 0) {
            return NextResponse.json({
                isRunning: false,
                message: 'No active health check'
            });
        }

        const job = activeJob[0];
        const progress = typeof job.progress === 'string' ? JSON.parse(job.progress) : job.progress;
        const totalBigInt = await getTotalMoviesNeedingCheck();
        const total = Number(totalBigInt); // Convert BigInt to Number

        // Calculate ETA
        const elapsed = Date.now() - new Date(job.startedAt).getTime();
        const rate = progress.checked > 0 ? elapsed / progress.checked : 0;
        const remaining = total - progress.checked;
        const etaMs = rate * remaining;
        const etaHours = Math.round(etaMs / (1000 * 60 * 60));

        return NextResponse.json({
            isRunning: true,
            jobId: job.id,
            stats: progress,
            progress: {
                current: progress.checked,
                total,
                percentage: total > 0 ? ((progress.checked / total) * 100) : 0
            },
            currentMovie: progress.currentMovie || null,
            eta: etaHours > 0 ? `${etaHours} hours` : 'Less than 1 hour',
            startedAt: job.startedAt
        });

    } catch (error: any) {
        console.error('[Health API] GET error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const action = searchParams.get('action');

        // Start health check
        if (action === 'start') {
            // Check if already running
            const existing = await (prisma as any).$queryRawUnsafe(
                `SELECT * FROM scraperjob 
                 WHERE type = 'MAINTENANCE' AND status = 'RUNNING' 
                 LIMIT 1`
            );

            if (existing && existing.length > 0) {
                // Auto-stop the old job
                console.log('[Health API] Auto-stopping old job:', existing[0].id);

                await (prisma as any).$executeRawUnsafe(
                    `UPDATE scraperjob 
                     SET status = 'STOPPED', updatedAt = ? 
                     WHERE id = ?`,
                    new Date(),
                    existing[0].id
                );

                await (prisma as any).$executeRawUnsafe(
                    `INSERT INTO scraperlog (jobId, level, message, createdAt) 
                     VALUES (?, ?, ?, ?)`,
                    existing[0].id,
                    'INFO',
                    '🛑 Auto-stopped by new health check',
                    new Date()
                );

                // Stop active monitor if exists
                const monitor = getActiveMonitor();
                if (monitor) {
                    await monitor.stop();
                    setActiveMonitor(null);
                }
            }

            // Create and start new monitor
            const monitor = new HealthMonitor();
            const jobId = await monitor.start();
            setActiveMonitor(monitor);

            return NextResponse.json({
                success: true,
                message: 'Health check started',
                jobId
            });
        }

        // Stop health check
        if (action === 'stop') {
            const monitor = getActiveMonitor();

            if (monitor) {
                await monitor.stop();
                setActiveMonitor(null);
            } else {
                // Stop via database
                await (prisma as any).$executeRawUnsafe(
                    `UPDATE scraperjob 
                     SET status = 'STOPPED', updatedAt = ? 
                     WHERE type = 'MAINTENANCE' AND status = 'RUNNING'`,
                    new Date()
                );
            }

            return NextResponse.json({
                success: true,
                message: 'Health check stopped'
            });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

    } catch (error: any) {
        console.error('[Health API] POST error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
