import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * SEARCH API - Movie autocomplete
 * GET /api/search?q=query
 */
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('q');

        if (!query || query.length < 2) {
            return NextResponse.json({ results: [] });
        }

        // Search movies by title (both BG and EN)
        const movies = await prisma.movie.findMany({
            where: {
                published: true,
                OR: [
                    { titleEN: { contains: query } },
                    { titleBG: { contains: query } }
                ]
            },
            select: {
                id: true,
                slug: true,
                titleEN: true,
                titleBG: true,
                year: true,
                posterUrl: true,
                rating: true
            },
            orderBy: [
                { views: 'desc' },  // Popular first
                { rating: 'desc' }  // Then by rating
            ],
            take: 10
        });

        return NextResponse.json({ results: movies });

    } catch (error: any) {
        console.error('[Search API] Error:', error);
        return NextResponse.json({ error: 'Search failed', results: [] }, { status: 500 });
    }
}
