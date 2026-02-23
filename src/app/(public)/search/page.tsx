import { prisma } from '@/lib/db';
import { MovieCard } from '@/components/movies/MovieCard';
import { FilterBarV2 } from '@/components/movies/FilterBarV2';
import { Pagination } from '@/components/ui/pagination';
import { Suspense } from 'react';
import { headers } from 'next/headers';
import { getLocalizedMovie, getLocalizedCategory, Locale } from '@/lib/i18n';
import { searchVariants } from '@/lib/transliterate';

const MOVIES_PER_PAGE = 24;

async function getMovies(searchParams: any, locale: Locale) {
    const query = searchParams.q || '';
    const category = searchParams.category || '';
    const year = searchParams.year ? parseInt(searchParams.year) : undefined;
    const minRating = searchParams.rating ? parseFloat(searchParams.rating) : undefined;
    const cast = searchParams.cast || '';
    const director = searchParams.director || '';
    const sortBy = searchParams.sort || 'newest';
    const orderDir = searchParams.order === 'asc' ? 'asc' : 'desc';
    const page = parseInt(searchParams.page || '1');
    const skip = (page - 1) * MOVIES_PER_PAGE;

    const where: any = {
        published: true,
    };

    // Search query — supports Cyrillic and Latin via transliteration
    if (query) {
        // Build all search variants: original + transliterated (BG→EN or EN→BG)
        const variants = searchVariants(query);

        // For each variant, search titleBG, titleEN, description, director, cast
        where.OR = variants.flatMap((v) => [
            { titleBG: { contains: v } },
            { titleEN: { contains: v } },
            { description: { contains: v } },
            { descriptionEN: { contains: v } },
            { director: { contains: v } },
            { cast: { contains: v } },
        ]);
    }

    // Cast filter (specific)
    if (cast) {
        where.cast = { contains: cast as string };
    }

    // Director filter (specific)
    if (director) {
        where.director = { contains: director as string };
    }

    // Category filter
    if (category) {
        where.moviecategory = {
            some: {
                category: {
                    slug: category
                }
            }
        };
    }

    // Year filter
    if (year) {
        where.year = year;
    }

    // Rating filter
    if (minRating) {
        where.rating = { gte: minRating };
    }

    // Sort
    // newest = highest release year first
    const orderBy: any =
        sortBy === 'newest' ? { year: 'desc' } :
            sortBy === 'oldest' ? { year: 'asc' } :
                sortBy === 'views' ? { views: orderDir } :
                    sortBy === 'rating' ? { rating: orderDir } :
                        { year: 'desc' };

    const [moviesData, total] = await Promise.all([
        (prisma.movie as any).findMany({
            where,
            orderBy,
            skip,
            take: MOVIES_PER_PAGE,
            include: {
                moviecategory: {
                    include: { category: true }
                }
            }
        }),
        prisma.movie.count({ where })
    ]);

    const localizedMovies = moviesData.map((m: any) => getLocalizedMovie(m, locale));

    return {
        movies: localizedMovies,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / MOVIES_PER_PAGE)
    };
}

async function getCategories() {
    return await (prisma.category as any).findMany({
        orderBy: { name: 'asc' }
    });
}

async function getAvailableYears() {
    const years = await prisma.movie.findMany({
        where: { published: true },
        select: { year: true },
        distinct: ['year'],
        orderBy: { year: 'desc' }
    });
    return years.map(m => m.year);
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;
    const headersList = await headers();
    const locale = (headersList.get('x-locale') || 'bg') as Locale;
    const isEN = locale === 'en';

    const [result, categories, years] = await Promise.all([
        getMovies(params, locale),
        getCategories(),
        getAvailableYears(),
    ]);

    const query = params.q || '';

    return (
        <div className="relative min-h-screen">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-royalPurple/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-cinemaGold/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="container py-12 relative">
                <div className="flex flex-col gap-12">
                    {/* Results */}
                    <div className="flex-1">
                        <div className="mb-12">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-[2px] w-12 bg-brand-cinemaGold" />
                                <span className="text-[12px] font-display tracking-[0.4em] uppercase text-brand-cinemaGold">
                                    {isEN ? 'Discovery' : 'Откриване'}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display tracking-widest uppercase text-brand-warmCream leading-none mb-4">
                                {query
                                    ? (isEN ? `Results for "${query}"` : `Резултати за "${query}"`)
                                    : (isEN ? 'All Movies' : 'Всички филми')}
                            </h1>
                            <p className="text-xl font-display tracking-widest text-brand-softLavender uppercase">
                                {isEN ? `Found ${result.total} items` : `Намерени ${result.total} филма`}
                                {result.totalPages > 1 && (isEN
                                    ? ` — Page ${result.currentPage} of ${result.totalPages}`
                                    : ` — Страница ${result.currentPage} от ${result.totalPages}`)}
                            </p>
                        </div>

                        <FilterBarV2 locale={locale} categories={categories} />

                        {result.movies.length > 0 ? (
                            <div className="space-y-12">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 xl:gap-8">
                                    {result.movies.map((m: any) => (
                                        <MovieCard key={m.id} movie={m} locale={locale} />
                                    ))}
                                </div>
                                {result.totalPages > 1 && (
                                    <div className="pt-8 border-t border-brand-royalPurple/10">
                                        <Pagination
                                            currentPage={result.currentPage}
                                            totalPages={result.totalPages}
                                            baseUrl="/search"
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-brand-deepNight/40 rounded-[3rem] border-2 border-dashed border-brand-royalPurple/20 backdrop-blur-xl">
                                <img src="/brand/couchoo-mascot-transparent.png" className="w-32 h-32 mb-8 opacity-20 invert" alt="Chouchoo" />
                                <h2 className="text-3xl font-display tracking-widest text-brand-softLavender/40 uppercase mb-4">
                                    {isEN ? 'No matches found' : 'Няма открити резултати'}
                                </h2>
                                <p className="text-brand-softLavender/20 font-display tracking-widest uppercase text-sm max-w-sm">
                                    {isEN
                                        ? 'Try adjusting your filters or search terms for a fresh discovery.'
                                        : 'Опитайте да промените филтрите или ключовите думи за ново търсене.'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
