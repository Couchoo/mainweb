import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * POST /api/admin/maintenance/health/remove-broken
 * Archive movie and delete all vidsrc servers for manual review
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

        // Get movie details
        const movieDetails = await (prisma as any).$queryRawUnsafe(`
            SELECT titleEN, titleBG, slug
            FROM movie
            WHERE id = ?
        `, movieId);

        const movie = movieDetails[0];
        if (!movie) {
            return NextResponse.json({
                success: false,
                error: 'Movie not found'
            }, { status: 404 });
        }

        const movieTitle = movie.titleEN || movie.titleBG || `Movie #${movieId}`;
        const movieSlug = movie.slug || '';

        // Get all vidsrc servers (main + backup)
        const vidsrcServers = await (prisma as any).$queryRawUnsafe(`
            SELECT id, name, url
            FROM videoserver
            WHERE movieId = ? AND (name LIKE '%vidsrc%' OR name LIKE '%Vidsrc%')
        `, movieId);

        let removed = vidsrcServers.length;

        // Delete all vidsrc servers
        for (const server of vidsrcServers) {
            await (prisma as any).$executeRawUnsafe(
                `DELETE FROM videoserver WHERE id = ?`,
                server.id
            );

            // Mark as deleted in broken_servers
            await (prisma as any).$executeRawUnsafe(
                `UPDATE broken_servers 
                 SET status = 'deleted', 
                     fixed = 1,
                     fixedAt = ?
                 WHERE movieId = ? AND serverId = ?`,
                new Date(),
                movieId,
                server.id
            );
        }

        // Archive and unpublish movie
        await (prisma as any).$executeRawUnsafe(`
            UPDATE movie 
            SET published = 0, 
                healthStatus = 'ARCHIVED',
                lastChecked = ?
            WHERE id = ?
        `, new Date(), movieId);

        // Add to review queue
        await (prisma as any).$executeRawUnsafe(`
            INSERT INTO fixed_movies_review 
            (movieId, movieTitle, movieSlug, fixType, serversRemoved, serversAdded, fixedAt)
            VALUES (?, ?, ?, 'manual', ?, 0, ?)
        `, movieId, movieTitle, movieSlug, removed, new Date());

        // Log action
        await (prisma as any).$executeRawUnsafe(`
            INSERT INTO movie_fix_log 
            (movieId, action, notes, createdAt)
            VALUES (?, 'archived', ?, ?)
        `, movieId, `Removed ${removed} vidsrc server(s), archived for manual fix`, new Date());

        return NextResponse.json({
            success: true,
            removed,
            message: `Removed ${removed} vidsrc server(s) and archived movie for manual review`
        });

    } catch (error: any) {
        console.error('[Remove Broken API] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
