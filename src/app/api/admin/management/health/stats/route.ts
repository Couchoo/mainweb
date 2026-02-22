import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * GET /api/admin/maintenance/health/stats
 * Get health check statistics
 */
export async function GET(request: NextRequest) {
    try {
        // Get total published movies
        const totalResult = await (prisma as any).$queryRawUnsafe(`
            SELECT COUNT(*) as total
            FROM movie
            WHERE published = 1
        `);
        const total = Number(totalResult[0]?.total || 0);

        // Get healthy count (OK status)
        const healthyResult = await (prisma as any).$queryRawUnsafe(`
            SELECT COUNT(*) as count
            FROM movie
            WHERE published = 1 AND healthStatus = 'OK'
        `);
        const healthy = Number(healthyResult[0]?.count || 0);

        // Get partial count (PARTIAL status)
        const partialResult = await (prisma as any).$queryRawUnsafe(`
            SELECT COUNT(*) as count
            FROM movie
            WHERE published = 1 AND healthStatus = 'PARTIAL'
        `);
        const partial = Number(partialResult[0]?.count || 0);

        // Get critical count (BROKEN or CRITICAL status)
        const criticalResult = await (prisma as any).$queryRawUnsafe(`
            SELECT COUNT(*) as count
            FROM movie
            WHERE published = 1 AND (healthStatus = 'BROKEN' OR healthStatus = 'CRITICAL')
        `);
        const critical = Number(criticalResult[0]?.count || 0);

        // Check if health check is running
        const runningJob = await (prisma as any).$queryRawUnsafe(`
            SELECT * FROM scraperjob 
            WHERE type = 'MAINTENANCE' AND status = 'RUNNING' 
            LIMIT 1
        `);

        const isRunning = runningJob && runningJob.length > 0;

        // Get progress if running
        let progress = { current: 0, total: 0, percentage: 0 };
        if (isRunning) {
            const checkedResult = await (prisma as any).$queryRawUnsafe(`
                SELECT COUNT(*) as count
                FROM movie
                WHERE published = 1 AND lastChecked IS NOT NULL
            `);
            const checked = Number(checkedResult[0]?.count || 0);

            progress = {
                current: checked,
                total,
                percentage: total > 0 ? Math.round((checked / total) * 100) : 0
            };
        }

        return NextResponse.json({
            success: true,
            stats: {
                healthy,
                partial,
                critical,
                total
            },
            progress,
            isRunning
        });

    } catch (error: any) {
        console.error('[Health Stats API] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
