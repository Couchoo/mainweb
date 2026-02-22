import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * POST /api/admin/management/bulk-action
 * Perform bulk approve or reject actions
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action, movieIds } = body;

        if (!action || !movieIds || !Array.isArray(movieIds)) {
            return NextResponse.json({
                success: false,
                error: 'action and movieIds array required'
            }, { status: 400 });
        }

        if (movieIds.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'No movies selected'
            }, { status: 400 });
        }

        const reviewAction = action === 'approve' ? 'approved' : 'rejected';
        let successCount = 0;
        let errorCount = 0;

        for (const movieId of movieIds) {
            try {
                if (action === 'approve') {
                    // Check if movie has servers
                    const servers = await (prisma as any).$queryRawUnsafe(`
                        SELECT COUNT(*) as count
                        FROM videoserver
                        WHERE movieId = ?
                    `, movieId);

                    const serverCount = Number(servers[0]?.count || 0);

                    if (serverCount === 0) {
                        errorCount++;
                        continue; // Skip movies without servers
                    }

                    // Re-publish movie
                    await (prisma as any).$executeRawUnsafe(`
                        UPDATE movie
                        SET published = true, healthStatus = 'HEALTHY'
                        WHERE id = ?
                    `, movieId);
                }

                // Update review status
                await (prisma as any).$executeRawUnsafe(`
                    UPDATE fixed_movies_review
                    SET reviewStatus = ?, reviewedAt = NOW(), reviewedBy = ?
                    WHERE movieId = ? AND reviewStatus = 'pending'
                `, reviewAction, 'admin', movieId);

                successCount++;
            } catch (err) {
                console.error(`Error processing movie ${movieId}:`, err);
                errorCount++;
            }
        }

        return NextResponse.json({
            success: true,
            message: `Bulk ${action}: ${successCount} succeeded, ${errorCount} failed`,
            successCount,
            errorCount
        });

    } catch (error: any) {
        console.error('[Bulk Action API] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
