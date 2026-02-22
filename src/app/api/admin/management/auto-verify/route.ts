import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * POST /api/admin/management/auto-verify
 * Auto-verify pending movies by checking if they have working servers
 */
export async function POST(request: NextRequest) {
    try {
        // Get all pending movies
        const pendingMovies = await (prisma as any).$queryRawUnsafe(`
            SELECT 
                fmr.id,
                fmr.movieId,
                fmr.movieTitle,
                fmr.movieSlug,
                fmr.fixedAt
            FROM fixed_movies_review fmr
            WHERE fmr.reviewStatus = 'pending'
            ORDER BY fmr.fixedAt DESC
        `);

        const results = [];

        for (const movie of pendingMovies) {
            // Check if movie has servers
            const servers = await (prisma as any).$queryRawUnsafe(`
                SELECT COUNT(*) as count
                FROM videoserver
                WHERE movieId = ?
            `, movie.movieId);

            const serverCount = Number(servers[0]?.count || 0);

            // Check movie health status
            const movieData = await (prisma as any).$queryRawUnsafe(`
                SELECT healthStatus, published
                FROM movie
                WHERE id = ?
            `, movie.movieId);

            const healthStatus = movieData[0]?.healthStatus || 'UNKNOWN';
            const published = movieData[0]?.published || 0;

            // Consider movie valid if it has servers and is not NO_SERVER
            const isValid = serverCount > 0 && healthStatus !== 'NO_SERVER';

            results.push({
                id: movie.id,
                movieId: movie.movieId,
                movieTitle: movie.movieTitle,
                movieSlug: movie.movieSlug,
                fixedAt: movie.fixedAt,
                serverCount,
                healthStatus,
                published: Boolean(published),
                isValid,
                canAutoApprove: isValid
            });
        }

        // Separate valid and invalid
        const validMovies = results.filter(m => m.isValid);
        const invalidMovies = results.filter(m => !m.isValid);

        return NextResponse.json({
            success: true,
            total: results.length,
            validCount: validMovies.length,
            invalidCount: invalidMovies.length,
            validMovies,
            invalidMovies
        });

    } catch (error: any) {
        console.error('[Auto-Verify API] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
