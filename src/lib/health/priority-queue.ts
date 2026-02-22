import { prisma } from '@/lib/db';

/**
 * Priority Queue - Smart movie selection for health checks
 * 
 * Prioritization logic:
 * 1. UNKNOWN status first (newly imported)
 * 2. BROKEN status second (needs fixing)
 * 3. Popular movies (by views)
 * 4. Oldest unchecked
 */

export async function getNextMoviesToCheck(limit: number = 5) {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Use raw SQL to avoid Prisma schema issues
    const movies = await (prisma as any).$queryRawUnsafe(`
        SELECT m.*, 
               GROUP_CONCAT(
                   CONCAT_WS('|||', vs.id, vs.name, vs.url, vs.\`order\`)
                   ORDER BY vs.\`order\`
                   SEPARATOR ':::'
               ) as videoServersData
        FROM movie m
        LEFT JOIN videoserver vs ON vs.movieId = m.id
        WHERE (m.published = 1 OR m.healthStatus = 'PENDING')
          AND (
              m.healthStatus = 'PENDING'
              OR m.healthStatus = 'UNKNOWN'
              OR m.healthStatus = 'BROKEN'
              OR m.lastChecked IS NULL
              OR m.lastChecked < ?
          )
        GROUP BY m.id
        ORDER BY 
            FIELD(m.healthStatus, 'PENDING', 'UNKNOWN', 'BROKEN', 'OK'),
            m.views DESC,
            m.lastChecked ASC
        LIMIT ?
    `, sevenDaysAgo, limit);

    // Parse videoserver data
    return movies.map((m: any) => ({
        ...m,
        videoserver: m.videoServersData
            ? m.videoServersData.split(':::').map((vs: string) => {
                const [id, name, url, order] = vs.split('|||');
                return { id: parseInt(id), name, url, order: parseInt(order) };
            })
            : []
    }));
}

export async function getTotalMoviesNeedingCheck(): Promise<number> {
    // Count ALL published movies for full scan
    const result = await (prisma as any).$queryRawUnsafe(`
        SELECT COUNT(*) as total
        FROM movie
        WHERE published = 1
    `);

    return Number(result[0]?.total || 0);
}
