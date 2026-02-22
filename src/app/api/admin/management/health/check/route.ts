import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { checkAllMovieServers } from '@/lib/health/link-checker';

/**
 * POST /api/admin/maintenance/health/check
 * Quick check for a single movie
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

        // Get movie with servers
        const movie = await (prisma as any).$queryRawUnsafe(`
            SELECT m.*, 
                   GROUP_CONCAT(
                       CONCAT_WS('|||', vs.id, vs.name, vs.url, vs.\`order\`)
                       ORDER BY vs.\`order\`
                       SEPARATOR ':::'
                   ) as videoServersData
            FROM movie m
            LEFT JOIN videoserver vs ON vs.movieId = m.id
            WHERE m.id = ?
            GROUP BY m.id
            LIMIT 1
        `, movieId);

        if (!movie || movie.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Movie not found'
            }, { status: 404 });
        }

        const movieData = movie[0];

        // Parse servers
        const servers = movieData.videoServersData
            ? movieData.videoServersData.split(':::').map((vs: string) => {
                const [id, name, url, order] = vs.split('|||');
                return { id: parseInt(id), name, url, order: parseInt(order) };
            })
            : [];

        if (servers.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Movie has no servers'
            }, { status: 400 });
        }

        // Check all servers
        const results = await checkAllMovieServers(servers);

        const workingServers = results.filter(r => r.isWorking);
        const brokenServers = results.filter(r => !r.isWorking);

        // Record broken servers
        for (const broken of brokenServers) {
            await (prisma as any).$executeRawUnsafe(
                `INSERT INTO broken_servers (movieId, serverId, serverName, url, statusCode, error, checkedAt)
                 VALUES (?, ?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE 
                    statusCode = VALUES(statusCode),
                    error = VALUES(error),
                    checkedAt = VALUES(checkedAt)`,
                movieId,
                broken.serverId,
                broken.serverName,
                broken.url,
                broken.statusCode || null,
                broken.error || null,
                new Date()
            );
        }

        // Update movie status
        let healthStatus = 'OK';
        if (workingServers.length === 0) {
            healthStatus = 'BROKEN';
        } else if (brokenServers.length > 0) {
            healthStatus = 'PARTIAL';
        }

        await (prisma as any).$executeRawUnsafe(
            `UPDATE movie SET healthStatus = ?, lastChecked = ? WHERE id = ?`,
            healthStatus,
            new Date(),
            movieId
        );

        return NextResponse.json({
            success: true,
            movieTitle: movieData.titleEN || movieData.titleBG,
            healthStatus,
            results: {
                total: results.length,
                working: workingServers.length,
                broken: brokenServers.length
            },
            servers: results.map(r => ({
                name: r.serverName,
                url: r.url,
                isWorking: r.isWorking,
                statusCode: r.statusCode,
                error: r.error
            }))
        });

    } catch (error: any) {
        console.error('[Quick Check API] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
