import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * GET /api/admin/maintenance/health/broken
 * Returns movies with broken servers, including working servers info
 */
export async function GET(request: NextRequest) {
    try {
        // Get all movies with broken servers
        const brokenMovies = await (prisma as any).$queryRawUnsafe(`
            SELECT DISTINCT
                m.id as movieId,
                m.titleEN,
                m.titleBG,
                m.imdbId,
                m.healthStatus,
                m.year
            FROM movie m
            INNER JOIN broken_servers bs ON bs.movieId = m.id
            WHERE bs.fixed = 0 AND m.published = 1
            ORDER BY m.titleEN, m.titleBG
            LIMIT 200
        `);

        const result = [];

        for (const movie of brokenMovies) {
            // Get all servers for this movie
            const allServers = await (prisma as any).$queryRawUnsafe(`
                SELECT id, name, url
                FROM videoserver
                WHERE movieId = ?
                ORDER BY \`order\`
            `, movie.movieId);

            // Get broken servers
            const brokenServers = await (prisma as any).$queryRawUnsafe(`
                SELECT bs.id as brokenId, serverId, serverName, url, statusCode, error
                FROM broken_servers bs
                WHERE movieId = ? AND fixed = 0
            `, movie.movieId);

            const brokenServerIds = new Set(brokenServers.map((bs: any) => bs.serverId));

            // Mark servers as working or broken
            const servers = allServers.map((server: any) => ({
                id: server.id,
                serverId: server.id,
                serverName: server.name,
                url: server.url,
                isWorking: !brokenServerIds.has(server.id), // If NOT in broken_servers, it's working
                brokenId: null // Not broken, no broken_servers.id
            }));

            // Add broken servers that were already deleted from videoserver
            for (const broken of brokenServers) {
                const existingServer = servers.find((s: any) => s.serverId === broken.serverId);

                if (existingServer) {
                    // Update existing server with brokenId
                    existingServer.brokenId = broken.brokenId;
                } else {
                    // Server was deleted, add it
                    servers.push({
                        id: broken.serverId,
                        serverId: broken.serverId,
                        serverName: broken.serverName,
                        url: broken.url,
                        isWorking: false,
                        brokenId: broken.brokenId
                    });
                }
            }

            result.push({
                movieId: movie.movieId,
                movieTitle: movie.titleEN || movie.titleBG,
                imdbId: movie.imdbId,
                healthStatus: movie.healthStatus,
                servers
            });
        }

        return NextResponse.json({
            success: true,
            count: result.length,
            brokenServers: result
        });

    } catch (error: any) {
        console.error('[Broken API] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
