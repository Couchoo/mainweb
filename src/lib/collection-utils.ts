import { prisma } from './db';
import { getRandomUserAgent } from './scraper-utils';

/**
 * SMART FRANCHISE DETECTOR
 * Groups movies automatically into collections
 */
export async function autoGroupMovieToCollection(movieId: number, movieTitleEN: string) {
    try {
        // 1. Clean title from year and part suffixes (e.g., "John Wick: Chapter 4" -> "John Wick")
        // Remove common part indicators
        let baseTitle = movieTitleEN
            .replace(/\s(Part|Volume|Chapter|Vol|V|II+)(\s.*|$)/i, '')
            .replace(/\s\d+(\s.*|$)/g, '')
            .split(':')[0]
            .split(' - ')[0]
            .trim();

        // If base title is too short, avoid grouping (danger of false positives like "The")
        if (baseTitle.length < 4) return null;

        // 2. Look for existing collection with similar name
        let collection = await (prisma as any).collection.findFirst({
            where: {
                name: { contains: baseTitle }
            }
        });

        // 3. If no collection, check if there are other movies with the same base title
        if (!collection) {
            const similarMovies = await (prisma as any).movie.findMany({
                where: {
                    id: { not: movieId },
                    titleEN: { startsWith: baseTitle }
                },
                take: 2
            });

            // If we have at least one other movie starting with this, create a collection
            if (similarMovies.length > 0) {
                const slug = baseTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

                collection = await (prisma as any).collection.create({
                    data: {
                        name: baseTitle,
                        slug: slug
                    }
                });

                // Also link the existing similar movies to this new collection
                await (prisma as any).movie.updateMany({
                    where: {
                        id: { in: similarMovies.map((m: any) => m.id) }
                    },
                    data: {
                        collectionId: collection.id
                    }
                });
            }
        }

        // 4. Link the current movie if collection found/created
        if (collection) {
            await (prisma as any).movie.update({
                where: { id: movieId },
                data: { collectionId: collection.id }
            });
            return collection;
        }

        return null;
    } catch (error) {
        console.error(`[Collection] Error grouping movie ${movieTitleEN}:`, error);
        return null;
    }
}

/**
 * REORGANIZE ALL COLLECTIONS (With Job Tracking)
 */
export async function reorganizeAllCollectionsWithJobs(jobId: string) {
    const movies = await (prisma as any).movie.findMany({
        where: { collectionId: null },
        orderBy: { titleEN: 'asc' }
    });

    const total = movies.length;
    let processed = 0;
    let success = 0;

    console.log(`[Collection Job] Analyzing ${total} movies...`);

    const updateJob = async (current: string) => {
        const progress = {
            total,
            processed,
            success,
            failed: 0,
            skipped: total - processed,
            current
        };
        await (prisma as any).$executeRawUnsafe(
            `UPDATE scraperjob SET progress = ?, updatedAt = ? WHERE id = ? AND status != ?`,
            JSON.stringify(progress), new Date(), jobId, 'stopped'
        );
    };

    const log = async (level: string, message: string) => {
        await (prisma as any).$executeRawUnsafe(
            `INSERT INTO scraperlog (jobId, level, message, createdAt) VALUES (?, ?, ?, ?)`,
            jobId, level, message, new Date()
        );
    };

    await log('INFO', `🎬 Started database reorganization (${total} movies)`);

    for (const movie of movies) {
        // ABORT CHECK
        const jobs = await (prisma as any).$queryRawUnsafe(`SELECT status FROM scraperjob WHERE id = ?`, jobId);
        if (!jobs || jobs.length === 0 || jobs[0].status === 'stopped') {
            await log('INFO', '🛑 Reorganization stopped by user');
            return;
        }

        processed++;
        const result = await autoGroupMovieToCollection(movie.id, movie.titleEN);

        if (result) {
            success++;
            await log('SUCCESS', `📦 Groups "${movie.titleEN}" → [${result.name}]`);
        }

        if (processed % 5 === 0) {
            await updateJob(`Processing: ${movie.titleEN}`);
        }
    }

    await (prisma as any).$executeRawUnsafe(
        `UPDATE scraperjob SET status = ?, updatedAt = ? WHERE id = ? AND status != ?`,
        'completed', new Date(), jobId, 'stopped'
    );

    await log('INFO', `✅ Finished! Ordered ${success} movies into franchises.`);
    return success;
}
