import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/db';

/**
 * Get comprehensive scraper statistics
 */
export async function GET(req: Request) {
    try {
        await requireAdmin();

        // Get our database stats
        const [totalMovies, moviesWithTmdb] = await Promise.all([
            prisma.movie.count(),
            prisma.movie.count({ where: { tmdbId: { not: null } } })
        ]);

        // Get total video server count (since language is not in schema)
        const totalServers = await (prisma as any).videoserver.count();

        // Get recent imports (last 24 hours)
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const recentImports = await prisma.movie.count({
            where: {
                createdAt: { gte: yesterday }
            }
        });

        // Platform coverage (mock data - will be real after scraping)
        const platformCoverage = [
            {
                name: 'Filmisub',
                totalMovies: 8500,
                imported: 0,
                coverage: 0,
                lastChecked: null,
                status: 'not_scraped'
            },
            {
                name: 'Vsi4kifilmi',
                totalMovies: 6000,
                imported: 0,
                coverage: 0,
                lastChecked: null,
                status: 'not_scraped'
            }
        ];

        return NextResponse.json({
            ourDatabase: {
                totalMovies,
                moviesWithTmdb,
                totalServers,
                recentImports
            },
            platformCoverage,
            trending: [], // Will be populated by trending detection
            lastUpdate: new Date()
        });

    } catch (error: any) {
        console.error('Stats error:', error);
        return NextResponse.json({ message: error.message || 'Error' }, { status: 500 });
    }
}
