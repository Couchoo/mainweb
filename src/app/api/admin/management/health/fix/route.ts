import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { findAlternativeServers } from '@/lib/health/auto-fixer';

/**
 * POST /api/admin/maintenance/health/fix
 * Fix broken server by finding working backup
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { movieId, serverId } = body;

        if (!movieId) {
            return NextResponse.json({
                success: false,
                error: 'movieId required'
            }, { status: 400 });
        }

        // Get movie details
        const movie = await (prisma as any).$queryRawUnsafe(
            `SELECT id, titleEN, titleBG, imdbId FROM movie WHERE id = ? LIMIT 1`,
            movieId
        );

        if (!movie || movie.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Movie not found'
            }, { status: 404 });
        }

        const movieData = movie[0];

        if (!movieData.imdbId) {
            return NextResponse.json({
                success: false,
                error: 'Movie has no IMDB ID'
            }, { status: 400 });
        }

        // Find working alternatives
        const alternatives = await findAlternativeServers(movieData.imdbId);

        if (alternatives.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'No working backup servers found'
            }, { status: 404 });
        }

        // Use first working alternative
        const backup = alternatives[0];

        // If serverId provided, replace that server
        // Otherwise, add as new server
        if (serverId) {
            await (prisma as any).$executeRawUnsafe(
                `UPDATE videoserver SET name = ?, url = ? WHERE id = ?`,
                backup.name,
                backup.url,
                serverId
            );
        } else {
            await (prisma as any).$executeRawUnsafe(
                `INSERT INTO videoserver (movieId, name, url, \`order\`) VALUES (?, ?, ?, ?)`,
                movieId,
                backup.name,
                backup.url,
                99
            );
        }

        // Update movie health status
        await (prisma as any).$executeRawUnsafe(
            `UPDATE movie SET healthStatus = ?, lastChecked = ? WHERE id = ?`,
            'OK',
            new Date(),
            movieId
        );

        return NextResponse.json({
            success: true,
            message: `Fixed with ${backup.name}`,
            newServer: {
                name: backup.name,
                url: backup.url
            }
        });

    } catch (error: any) {
        console.error('[Fix API] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
