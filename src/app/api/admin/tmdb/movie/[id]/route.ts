import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin();
        const { id } = await params;
        const apiKey = process.env.TMDB_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ message: 'TMDB_API_KEY is missing' }, { status: 500 });
        }

        // Fetch movie details in BG
        const resBG = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=bg-BG&append_to_response=credits,videos`
        );
        const dataBG = await resBG.json();

        // Fetch movie details in EN for English title
        const resEN = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        const dataEN = await resEN.json();

        const director = dataBG.credits?.crew?.find((c: any) => c.job === 'Director')?.name;
        const cast = dataBG.credits?.cast?.slice(0, 10).map((c: any) => c.name).join(', ');
        const trailer = dataBG.videos?.results?.find((v: any) => v.type === 'Trailer')?.key;

        return NextResponse.json({
            tmdbId: dataBG.id,
            titleBG: dataBG.title,
            titleEN: dataEN.title,
            description: dataBG.overview,
            year: new Date(dataBG.release_date).getFullYear(),
            duration: dataBG.runtime,
            director,
            cast,
            posterUrl: `https://image.tmdb.org/t/p/w500${dataBG.poster_path}`,
            backdropUrl: `https://image.tmdb.org/t/p/original${dataBG.backdrop_path}`,
            rating: dataBG.vote_average,
            imdbId: dataBG.imdb_id,
            trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer}` : null,
            genres: dataBG.genres?.map((g: any) => g.name)
        });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching movie' }, { status: 500 });
    }
}
