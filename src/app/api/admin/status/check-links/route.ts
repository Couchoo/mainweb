import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { checkLink } from '@/lib/health/link-checker';
import { requireAdmin } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        await requireAdmin();

        const { provider, limit = 50, offset = 0 } = await req.json();

        // 1. Get movies with their video servers
        const query: any = {
            take: limit,
            skip: offset,
            orderBy: { lastChecked: 'asc' },
            include: {
                videoserver: true
            }
        };

        // Filter by provider name if specified
        if (provider) {
            query.where = {
                videoserver: {
                    some: {
                        name: { contains: provider }
                    }
                }
            };
        }

        const movies = await prisma.movie.findMany(query) as any[];

        if (movies.length === 0) {
            return NextResponse.json({
                processed: 0,
                results: [],
                done: true
            });
        }

        const results = [];

        for (const movie of movies) {
            // Parallelize server checks for this movie for speed
            const serverChecks = await Promise.all(
                movie.videoserver.map(async (server: any) => {
                    const check = await checkLink(server.url, 3000); // 3s timeout
                    return { server, check };
                })
            );

            let movieIsBroken = false;
            const brokenServers = [];

            for (const { server, check } of serverChecks) {
                if (!check.ok) {
                    movieIsBroken = true;
                    brokenServers.push({
                        serverId: server.id,
                        serverName: server.name,
                        url: server.url,
                        error: check.error,
                        status: check.status
                    });

                    // Log broken server to dedicated table
                    await prisma.broken_servers.upsert({
                        where: {
                            movieId_serverId: {
                                movieId: movie.id,
                                serverId: server.id
                            }
                        },
                        create: {
                            movieId: movie.id,
                            serverId: server.id,
                            serverName: server.name,
                            url: server.url,
                            error: check.error,
                            statusCode: check.status
                        },
                        update: {
                            error: check.error,
                            statusCode: check.status,
                            checkedAt: new Date(),
                            fixed: 0
                        }
                    });
                }
            }

            // Update movie health status
            const newStatus = movieIsBroken ? 'BROKEN' : 'OK';
            await prisma.movie.update({
                where: { id: movie.id },
                data: {
                    healthStatus: newStatus,
                    lastChecked: new Date()
                }
            });

            results.push({
                id: movie.id,
                title: movie.titleBG,
                status: newStatus,
                checkedAt: new Date(),
                brokenServersCount: brokenServers.length
            });
        }

        return NextResponse.json({
            processed: results.length,
            results,
            done: false,
            nextOffset: offset + limit
        });

    } catch (error: any) {
        console.error('Link Check Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
