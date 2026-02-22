import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * GET /api/admin/maintenance/review-queue
 * Get list of movies in review queue
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status') || 'pending';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = 20; // Changed from dynamic to fixed 20
        const offset = (page - 1) * limit;

        // For 'fixed' status, show both approved and fixed from last 24h
        let whereClause = '';
        let queryParams: (string | number | Date)[] = [];

        if (status === 'fixed') {
            whereClause = `WHERE reviewStatus IN ('approved', 'fixed') 
                          AND reviewedAt >= DATE_SUB(NOW(), INTERVAL 24 HOUR)`;
        } else {
            whereClause = `WHERE reviewStatus = ?`;
            queryParams.push(status);
        }

        // Get total count
        const countResult = await (prisma as any).$queryRawUnsafe(`
            SELECT COUNT(*) as total
            FROM fixed_movies_review
            ${whereClause}
        `, ...queryParams);
        const total = Number(countResult[0]?.total || 0);

        // Get paginated results
        const reviews = await (prisma as any).$queryRawUnsafe(`
            SELECT
                id,
                movieId,
                movieTitle,
                movieSlug,
                fixType,
                serversRemoved,
                serversAdded,
                fixedAt,
                reviewStatus,
                reviewedBy,
                reviewedAt,
                notes
            FROM fixed_movies_review
            ${whereClause}
            ORDER BY fixedAt DESC
            LIMIT ? OFFSET ?
        `, ...queryParams, limit, offset);

        return NextResponse.json({
            success: true,
            reviews,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error: any) {
        console.error('[Review Queue API] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

/**
 * POST/PUT /api/admin/maintenance/review-queue
 * Approve or deny a fixed movie
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action, movieId, notes } = body;

        if (!action || !movieId) {
            return NextResponse.json({
                success: false,
                error: 'action and movieId required'
            }, { status: 400 });
        }

        if (action === 'approve') {
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
                    error: 'Cannot approve: No servers added. Please add at least one server first.'
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

            // Mark as approved
            await (prisma as any).$executeRawUnsafe(`
                UPDATE fixed_movies_review
                SET reviewStatus = 'approved',
                    reviewedAt = ?,
                    reviewedBy = ?,
                    serversAdded = ?,
                    notes = ?
                WHERE movieId = ? AND reviewStatus = 'pending'
            `, new Date(), 'admin', serverCount, notes || null, movieId);

            // Log action
            await (prisma as any).$executeRawUnsafe(`
                INSERT INTO movie_fix_log 
                (movieId, action, notes, createdAt)
                VALUES (?, 'approved', ?, ?)
            `, movieId, notes || `Manually fixed with ${serverCount} server(s) and approved`, new Date());

            return NextResponse.json({
                success: true,
                message: `Movie approved and re-published with ${serverCount} server(s)`
            });

        } else if (action === 'deny') {
            // Mark as rejected (No Server status)
            await (prisma as any).$executeRawUnsafe(`
                UPDATE fixed_movies_review
                SET reviewStatus = 'rejected',
                    reviewedAt = ?,
                    reviewedBy = ?,
                    notes = ?
                WHERE movieId = ? AND reviewStatus = 'pending'
            `, new Date(), 'admin', notes || 'No servers found', movieId);

            // Set NO_SERVER status (keep unpublished)
            await (prisma as any).$executeRawUnsafe(`
                UPDATE movie
                SET healthStatus = 'NO_SERVER'
                WHERE id = ?
            `, movieId);

            // Log action
            await (prisma as any).$executeRawUnsafe(`
                INSERT INTO movie_fix_log 
                (movieId, action, notes, createdAt)
                VALUES (?, 'rejected', ?, ?)
            `, movieId, notes || 'No servers found', new Date());

            return NextResponse.json({
                success: true,
                message: 'Movie marked as NO_SERVER'
            });

        } else {
            return NextResponse.json({
                success: false,
                error: 'Invalid action. Use "approve" or "deny"'
            }, { status: 400 });
        }

    } catch (error: any) {
        console.error('[Review Queue API] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

// Support both POST and PUT methods
export const PUT = POST;
