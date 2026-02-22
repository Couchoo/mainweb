import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * POST /api/admin/management/republish
 * Re-publish a movie from No Server status (moves to Recently Fixed)
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { movieId } = body;

        if (!movieId) {
            return NextResponse.json({
                success: false,
                error: 'movieId required'
            }, { status: 400 });
        }

        // Check if movie has servers
        const servers = await (prisma as any).$queryRawUnsafe(`
            SELECT COUNT(*) as count
            FROM videoserver
            WHERE movieId = ?
        `, movieId);

        const serverCount = Number(servers[0]?.count || 0);

        if (serverCount === 0) {
            return NextResponse.json({
                success: false,
                error: 'Cannot publish: No servers added. Please add at least one server first.'
            }, { status: 400 });
        }

        // Re-publish movie
        await (prisma as any).$executeRawUnsafe(`
            UPDATE movie
            SET published = 1,
                healthStatus = 'OK',
                lastChecked = ?
            WHERE id = ?
        `, new Date(), movieId);

        // Update review status to 'fixed' (new status for recently fixed)
        await (prisma as any).$executeRawUnsafe(`
            UPDATE fixed_movies_review
            SET reviewStatus = 'fixed',
                reviewedAt = ?,
                reviewedBy = ?,
                serversAdded = ?
            WHERE movieId = ? AND reviewStatus = 'rejected'
        `, new Date(), 'admin', serverCount, movieId);

        // Log action
        await (prisma as any).$executeRawUnsafe(`
            INSERT INTO movie_fix_log 
            (movieId, action, notes, createdAt)
            VALUES (?, 'republished', ?, ?)
        `, movieId, `Re-published from No Server with ${serverCount} server(s)`, new Date());

        return NextResponse.json({
            success: true,
            message: `Movie re-published successfully with ${serverCount} server(s)`
        });

    } catch (error: any) {
        console.error('[Republish API] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
