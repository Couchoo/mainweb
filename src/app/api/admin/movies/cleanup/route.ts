import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-helpers';

/**
 * Finds potential duplicates based on title and year or imdbId
 */
export async function GET() {
    try {
        await requireAdmin();

        const p = prisma as any;

        // 1. Find duplicates by imdbId (most accurate)
        const imdbDuplicatesRaw: any[] = await p.$queryRaw`
            SELECT imdbId, COUNT(*) as count
            FROM movie
            WHERE imdbId IS NOT NULL AND imdbId != ''
            GROUP BY imdbId
            HAVING count > 1
        `;

        const imdbDuplicates = [];
        for (const duplicate of imdbDuplicatesRaw) {
            const movies = await p.movie.findMany({
                where: { imdbId: duplicate.imdbId },
                include: {
                    moviecategory: { include: { category: true } },
                    videoserver: true,
                    comment: true
                }
            });
            imdbDuplicates.push({
                imdbId: duplicate.imdbId,
                movies
            });
        }

        // 2. Find duplicates by title and year (fuzzy)
        const titleDuplicatesRaw: any[] = await p.$queryRaw`
            SELECT titleBG, year, COUNT(*) as count
            FROM movie
            GROUP BY titleBG, year
            HAVING count > 1
        `;

        const titleDuplicates = [];
        for (const duplicate of titleDuplicatesRaw) {
            const movies = await p.movie.findMany({
                where: {
                    titleBG: duplicate.titleBG,
                    year: Number(duplicate.year)
                },
                include: {
                    moviecategory: { include: { category: true } },
                    videoserver: true,
                    comment: true
                }
            });
            titleDuplicates.push({
                title: duplicate.titleBG,
                year: duplicate.year,
                movies
            });
        }

        return NextResponse.json({
            imdbDuplicates,
            titleDuplicates
        });

    } catch (error: any) {
        console.error('Cleanup GET error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * Merges a list of movies into one (keeping the targetId)
 */
export async function POST(req: Request) {
    try {
        await requireAdmin();
        const { targetId, sourceIds } = await req.json();

        if (!targetId || !sourceIds || !Array.isArray(sourceIds) || sourceIds.length === 0) {
            return NextResponse.json({ error: 'Missing targetId or sourceIds' }, { status: 400 });
        }

        const sourceIdNums = sourceIds.map(Number);
        const targetIdNum = Number(targetId);
        const p = prisma as any;

        // 1. Reassign video servers
        await p.videoserver.updateMany({
            where: { movieId: { in: sourceIdNums } },
            data: { movieId: targetIdNum }
        });

        // 2. Reassign comments
        await p.comment.updateMany({
            where: { movieId: { in: sourceIdNums } },
            data: { movieId: targetIdNum }
        });

        // 3. Reassign watch history
        await p.watchhistory.updateMany({
            where: { movieId: { in: sourceIdNums } },
            data: { movieId: targetIdNum }
        });

        // 4. Reassign watchlist
        // Note: This might cause unique constraint violations if user has both in watchlist
        // We'll use a try-catch for each source
        for (const sourceId of sourceIdNums) {
            try {
                const watchlistItems = await p.watchlist.findMany({
                    where: { movieId: sourceId }
                });
                for (const item of watchlistItems) {
                    try {
                        await p.watchlist.create({
                            data: {
                                userId: item.userId,
                                movieId: targetIdNum
                            }
                        });
                    } catch (e) {
                        // Already in watchlist, ignore
                    }
                }
            } catch (e) { }
        }
        await p.watchlist.deleteMany({
            where: { movieId: { in: sourceIdNums } }
        });

        // 5. Aggregate views
        const sources = await p.movie.findMany({
            where: { id: { in: sourceIdNums } },
            select: { views: true }
        });
        const totalSourceViews = sources.reduce((sum: number, m: any) => sum + m.views, 0);

        await p.movie.update({
            where: { id: targetIdNum },
            data: { views: { increment: totalSourceViews } }
        });

        // 6. Delete sources
        await p.movie.deleteMany({
            where: { id: { in: sourceIdNums } }
        });

        return NextResponse.json({ success: true, merged: sourceIds.length });

    } catch (error: any) {
        console.error('Cleanup POST error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
