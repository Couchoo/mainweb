import { prisma } from '@/lib/db';
import { MovieCard } from '@/components/movies/MovieCard';
import { AdBanner } from '@/components/ads/AdBanner';
import { headers } from 'next/headers';
import Link from 'next/link';
import { getTranslation, getLocalizedMovie, getLocalizedCategory, Locale } from '@/lib/i18n';
import { getTrendingMoviesFromIMDB, getTrendingMoviesLocal } from '@/lib/scrapers/trending-logic';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Clock, Sparkles, Play, Star } from 'lucide-react';

async function getTrending(limit: number = 6) {
    let trending = await getTrendingMoviesFromIMDB();
    if (trending.length < limit) {
        const local = await getTrendingMoviesLocal();
        const seenIds = new Set(trending.map((m: any) => m.id));
        for (const movie of local) {
            if (!seenIds.has(movie.id) && trending.length < limit * 2) {
                trending.push(movie);
                seenIds.add(movie.id);
            }
        }
    }
    return trending.slice(0, limit * 2);
}

async function getFeaturedMovies() {
    return await (prisma.movie as any).findMany({
        where: {
            featured: true,
            published: true
        },
        take: 6,
        orderBy: { createdAt: 'desc' },
    });
}

async function getLatestMovies() {
    return await (prisma.movie as any).findMany({
        where: { published: true },
        take: 12,
        orderBy: { createdAt: 'desc' },
    });
}

async function getMostViewedMovies() {
    return await (prisma.movie as any).findMany({
        where: { published: true },
        take: 12,
        orderBy: { views: 'desc' },
    });
}

async function getTopRatedMovies() {
    return await (prisma.movie as any).findMany({
        where: {
            published: true,
            rating: { not: null }
        },
        take: 12,
        orderBy: { rating: 'desc' },
    });
}

async function getRecommendedMovies(userId: number, limit: number = 6) {
    // 1. Get user's most watched categories
    const history = await (prisma as any).watchhistory.findMany({
        where: { userId },
        include: {
            movie: {
                include: {
                    moviecategory: true
                }
            }
        },
        orderBy: { updatedAt: 'desc' },
        take: 20
    });

    if (history.length === 0) return [];

    const categoryCounts: Record<number, number> = {};
    const seenMovieIds = new Set<number>(history.map((h: any) => h.movieId));

    history.forEach((h: any) => {
        h.movie.moviecategory.forEach((mc: any) => {
            categoryCounts[mc.categoryId] = (categoryCounts[mc.categoryId] || 0) + 1;
        });
    });

    const topCategoryIds = Object.entries(categoryCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([id]) => parseInt(id));

    if (topCategoryIds.length === 0) return [];

    // 2. Get popular movies in those categories that user hasn't seen
    return await (prisma.movie as any).findMany({
        where: {
            published: true,
            id: { notIn: Array.from(seenMovieIds) },
            moviecategory: {
                some: {
                    categoryId: { in: topCategoryIds }
                }
            }
        },
        take: limit,
        orderBy: { rating: 'desc' }
    });
}

async function getCategoriesWithMovies() {
    return await (prisma.category as any).findMany({
        include: {
            moviecategory: {
                where: { movie: { published: true } },
                include: { movie: true },
                take: 6,
                orderBy: { movie: { createdAt: 'desc' } }
            }
        },
        where: {
            moviecategory: {
                some: { movie: { published: true } }
            }
        },
        take: 4
    });
}

import { Hero } from '@/components/home/Hero';

// ... (keep previous functions)

export default async function HomePage() {
    const headersList = await headers();
    const locale = (headersList.get('x-locale') || 'bg') as Locale;
    const t = (key: any) => getTranslation(key, locale);

    const session = await getServerSession(authOptions);
    const userId = session?.user ? parseInt((session.user as any).id) : null;

    const [featured, trending, latest, mostViewed, topRated, categories, history, recommended] = await Promise.all([
        getFeaturedMovies(),
        getTrending(6),
        getLatestMovies(),
        getMostViewedMovies(),
        getTopRatedMovies(),
        getCategoriesWithMovies(),
        userId ? (prisma as any).watchhistory.findMany({
            where: { userId },
            include: { movie: true },
            orderBy: { updatedAt: 'desc' },
            take: 6
        }) : Promise.resolve([]),
        userId ? getRecommendedMovies(userId, 6) : Promise.resolve([])
    ]);

    return (
        <div suppressHydrationWarning className="pb-16 space-y-16">
            <Hero t={t} />

            <div className="container space-y-16">
                <AdBanner slot="home_top" />

                {/* Recommended for You */}
                {recommended && recommended.length > 0 && (
                    <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-10 w-10 rounded-2xl bg-brand-cinemaGold/10 border border-brand-cinemaGold/20 flex items-center justify-center text-brand-cinemaGold">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <h2 className="text-4xl font-display tracking-wider text-brand-warmCream uppercase">{t('recommendedForYou') || 'Препоръчани за теб'}</h2>
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-cinemaGold/30 to-transparent ml-4" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {recommended.map((movie: any) => (
                                <MovieCard key={movie.id} movie={getLocalizedMovie(movie, locale)} locale={locale} />
                            ))}
                        </div>
                    </section>
                )}


                {/* Featured Section */}
                {featured.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-10 w-10 rounded-2xl bg-brand-royalPurple/10 border border-brand-royalPurple/20 flex items-center justify-center text-brand-softLavender">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <h2 className="text-4xl font-display tracking-wider text-brand-warmCream uppercase">{t('featured')}</h2>
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-royalPurple/30 to-transparent ml-4" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {featured.map((movie: any) => (
                                <MovieCard key={movie.id} movie={getLocalizedMovie(movie, locale)} locale={locale} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Trending Section */}
                {trending.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-10 w-10 rounded-2xl bg-brand-cinemaGold/10 border border-brand-cinemaGold/20 flex items-center justify-center text-brand-cinemaGold">
                                <Clock className="h-6 w-6" />
                            </div>
                            <h2 className="text-4xl font-display tracking-wider text-brand-warmCream uppercase">{t('trending')}</h2>
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-cinemaGold/30 to-transparent ml-4" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {trending.map((movie: any) => (
                                <MovieCard key={movie.id} movie={getLocalizedMovie(movie, locale)} locale={locale} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Latest Movies */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-10 w-10 rounded-2xl bg-brand-playRed/10 border border-brand-playRed/20 flex items-center justify-center text-brand-playRed">
                            <Play className="h-6 w-6 fill-current" />
                        </div>
                        <h2 className="text-4xl font-display tracking-wider text-brand-warmCream uppercase">{t('latest')}</h2>
                        <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-playRed/30 to-transparent ml-4" />
                    </div>
                    {latest.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {latest.map((movie: any) => (
                                <MovieCard key={movie.id} movie={getLocalizedMovie(movie, locale)} locale={locale} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-brand-deepNight/50 rounded-[2rem] border border-brand-royalPurple/20">
                            <img src="/brand/couchoo-icon-64.png" className="w-16 h-16 mx-auto mb-4 opacity-20 grayscale" alt="" />
                            <p className="text-brand-softLavender/50 font-display tracking-widest uppercase text-lg">{t('noMovies')}</p>
                        </div>
                    )}
                </section>

                {/* Most Viewed Movies */}
                {mostViewed.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-10 w-10 rounded-2xl bg-brand-royalPurple/10 border border-brand-royalPurple/20 flex items-center justify-center text-brand-softLavender">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <h2 className="text-4xl font-display tracking-wider text-brand-warmCream uppercase">{t('mostViewed')}</h2>
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-royalPurple/30 to-transparent ml-4" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {mostViewed.map((movie: any) => (
                                <MovieCard key={movie.id} movie={getLocalizedMovie(movie, locale)} locale={locale} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Top Rated Movies */}
                {topRated.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-10 w-10 rounded-2xl bg-brand-cinemaGold/10 border border-brand-cinemaGold/20 flex items-center justify-center text-brand-cinemaGold">
                                <Star className="h-6 w-6 fill-current" />
                            </div>
                            <h2 className="text-4xl font-display tracking-wider text-brand-warmCream uppercase">{t('topRated')}</h2>
                            <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-cinemaGold/30 to-transparent ml-4" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {topRated.map((movie: any) => (
                                <MovieCard key={movie.id} movie={getLocalizedMovie(movie, locale)} locale={locale} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Movies by Category */}
                {categories.length > 0 && (
                    <div className="space-y-16">
                        {categories.map((cat: any) => {
                            const category = getLocalizedCategory(cat, locale);
                            return category && category.moviecategory.length > 0 && (
                                <section key={category.id}>
                                    <div className="flex items-center gap-4 mb-8">
                                        <h2 className="text-4xl font-display tracking-wider text-brand-warmCream uppercase">{category.displayName}</h2>
                                        <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-royalPurple/20 to-transparent ml-4" />
                                        <Link
                                            href={`/category/${category.slug}`}
                                            className="px-6 py-2 rounded-xl bg-brand-royalPurple/20 hover:bg-brand-royalPurple/30 border border-brand-royalPurple/30 text-brand-cinemaGold text-xs font-bold uppercase tracking-widest font-display transition-all"
                                        >
                                            {t('viewAll')} →
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                                        {category.moviecategory.map((m: any) => (
                                            <MovieCard key={m.movie.id} movie={getLocalizedMovie(m.movie, locale)} locale={locale} />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
