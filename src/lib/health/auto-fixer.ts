import { prisma } from '@/lib/db';
import { FixResult } from './health-monitor';

/**
 * Archive movie with broken servers for manual review
 */
export async function smartFixMovie(
    movieId: number,
    imdbId: string,
    workingServers: any[],
    brokenServers: any[]
): Promise<FixResult> {

    // If ANY servers are broken → archive for manual review
    if (brokenServers.length > 0) {
        return await archiveForManualFix(movieId, brokenServers);
    }

    // All servers working - no action needed
    return {
        action: 'All servers working',
        archived: false,
        brokenServers: 0
    };
}

/**
 * Archive movie and add to review queue
 */
async function archiveForManualFix(
    movieId: number,
    brokenServers: any[]
): Promise<FixResult> {

    // Get movie details
    const movieDetails = await (prisma as any).$queryRawUnsafe(`
        SELECT titleEN, titleBG, slug
        FROM movie
        WHERE id = ?
    `, movieId);

    const movie = movieDetails[0];
    const movieTitle = movie?.titleEN || movie?.titleBG || `Movie #${movieId}`;
    const movieSlug = movie?.slug || '';

    // Unpublish and archive
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
        (movieId, movieTitle, movieSlug, fixType, serversRemoved, reviewStatus, fixedAt)
        VALUES (?, ?, ?, 'manual', ?, 'pending', ?)
    `, movieId, movieTitle, movieSlug, brokenServers.length, new Date());

    // Log action
    await (prisma as any).$executeRawUnsafe(`
        INSERT INTO movie_fix_log 
        (movieId, action, notes, createdAt)
        VALUES (?, 'archived', ?, ?)
    `, movieId, `${brokenServers.length} broken server(s) detected`, new Date());

    return {
        action: `Archived for manual review (${brokenServers.length} broken servers)`,
        archived: true,
        brokenServers: brokenServers.length
    };
}

/**
 * Legacy function - kept for compatibility
 * @deprecated No longer used - all fixes are manual now
 */
export async function findAlternativeServers(imdbId: string): Promise<Array<{ name: string; url: string }>> {
    return [];
}
