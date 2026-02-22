import { NextResponse } from 'next/server';
import { getTrendingMoviesFromIMDB, getTrendingMoviesLocal } from '@/lib/scrapers/trending-logic';

export async function GET() {
    try {
        let trending = await getTrendingMoviesFromIMDB();

        // If we don't have many trending movies from IMDB in our DB, fallback to local views
        if (trending.length < 6) {
            const localTrending = await getTrendingMoviesLocal();
            // Merge and deduplicate
            const seenIds = new Set(trending.map(m => m.id));
            for (const movie of localTrending) {
                if (!seenIds.has(movie.id) && trending.length < 12) {
                    trending.push(movie);
                    seenIds.add(movie.id);
                }
            }
        }

        return NextResponse.json(trending.slice(0, 12));
    } catch (error: any) {
        console.error('Trending API error:', error);
        return NextResponse.json({ error: 'Failed to fetch trending movies' }, { status: 500 });
    }
}
