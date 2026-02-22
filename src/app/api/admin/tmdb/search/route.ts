import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';

export async function GET(req: Request) {
    try {
        await requireAdmin();
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('query');
        const apiKey = process.env.TMDB_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ message: 'TMDB_API_KEY is missing' }, { status: 500 });
        }

        if (!query) {
            return NextResponse.json({ results: [] });
        }

        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=bg-BG`
        );
        const data = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ results: [] }, { status: 500 });
    }
}
