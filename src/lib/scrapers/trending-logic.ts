import { prisma } from '@/lib/db';
import { FastIMDBScraper } from './fast-imdb-scraper';

export async function getTrendingMoviesFromIMDB() {
    try {
        const scraper = new FastIMDBScraper();
        // IMDB Most Popular Movies chart
        const popularMovies = await scraper.scrapeSearchPage('https://www.imdb.com/chart/moviemeter/');

        if (!popularMovies || popularMovies.length === 0) return [];

        // Filter movies that exist in our database by imdbId
        const imdbIds = popularMovies.map(m => m.imdbId).filter(Boolean);

        if (imdbIds.length === 0) return [];

        const existingMovies = await (prisma.movie as any).findMany({
            where: {
                imdbId: { in: imdbIds },
                published: true
            }
        });

        if (!existingMovies || existingMovies.length === 0) return [];

        // Sort existing movies by their popularity rank (index in popularMovies)
        const sortedMovies = [...existingMovies].sort((a: any, b: any) => {
            const rankA = popularMovies.findIndex(m => m.imdbId === a.imdbId);
            const rankB = popularMovies.findIndex(m => m.imdbId === b.imdbId);
            return rankA - rankB;
        });

        return sortedMovies;
    } catch (error) {
        console.error('Trending detection error:', error);
        return [];
    }
}

export async function getTrendingMoviesLocal() {
    // Fallback/Local trending based on views
    return await (prisma.movie as any).findMany({
        where: { published: true },
        take: 12,
        orderBy: { views: 'desc' }
    });
}
