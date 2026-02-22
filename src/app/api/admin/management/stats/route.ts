import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * GET /api/admin/management/stats
 * Get server management statistics
 */
export async function GET(request: NextRequest) {
    try {
        // Get counts for each status
        const pendingCount = await (prisma as any).$queryRawUnsafe(`
            SELECT COUNT(*) as count
            FROM fixed_movies_review
            WHERE reviewStatus = 'pending'
        `);

        const approvedCount = await (prisma as any).$queryRawUnsafe(`
            SELECT COUNT(*) as count
            FROM fixed_movies_review
            WHERE reviewStatus = 'approved'
        `);

        const rejectedCount = await (prisma as any).$queryRawUnsafe(`
            SELECT COUNT(*) as count
            FROM fixed_movies_review
            WHERE reviewStatus = 'rejected'
        `);

        // Get recently fixed count (approved + fixed from last 24h)
        const recentlyFixedCount = await (prisma as any).$queryRawUnsafe(`
            SELECT COUNT(*) as count
            FROM fixed_movies_review
            WHERE reviewStatus IN ('approved', 'fixed')
            AND reviewedAt >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
        `);

        // Get last 24h stats
        const last24hApproved = await (prisma as any).$queryRawUnsafe(`
            SELECT COUNT(*) as count
            FROM fixed_movies_review
            WHERE reviewStatus = 'approved'
            AND reviewedAt >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
        `);

        const last24hRejected = await (prisma as any).$queryRawUnsafe(`
            SELECT COUNT(*) as count
            FROM fixed_movies_review
            WHERE reviewStatus = 'rejected'
            AND reviewedAt >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
        `);

        // Get average response time (pending -> approved/rejected)
        const avgResponseTime = await (prisma as any).$queryRawUnsafe(`
            SELECT AVG(TIMESTAMPDIFF(MINUTE, fixedAt, reviewedAt)) as avgMinutes
            FROM fixed_movies_review
            WHERE reviewStatus IN ('approved', 'rejected')
            AND reviewedAt IS NOT NULL
        `);

        return NextResponse.json({
            success: true,
            stats: {
                pending: Number(pendingCount[0]?.count || 0),
                approved: Number(approvedCount[0]?.count || 0),
                rejected: Number(rejectedCount[0]?.count || 0),
                recentlyFixed: Number(recentlyFixedCount[0]?.count || 0),
                last24h: {
                    approved: Number(last24hApproved[0]?.count || 0),
                    rejected: Number(last24hRejected[0]?.count || 0)
                },
                avgResponseTimeMinutes: Number(avgResponseTime[0]?.avgMinutes || 0)
            }
        });

    } catch (error: any) {
        console.error('[Stats API] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
