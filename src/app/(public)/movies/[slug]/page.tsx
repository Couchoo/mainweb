import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, Calendar, User, Film, Play, Info, Share2, Bookmark, Sparkles } from 'lucide-react';
import { MoviePlayerWrapper } from '@/components/movies/MoviePlayerWrapper';
import { MovieCard } from '@/components/movies/MovieCard';
import { MovieComments } from '@/components/movies/MovieComments';
import { AdBanner } from '@/components/ads/AdBanner';
import { getTranslation, Locale, getLocalizedMovie } from '@/lib/i18n';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { headers } from 'next/headers';
import { Metadata } from 'next';

import { generateMovieMetadata } from '@/lib/seo-utils';
import { WatchlistButton } from '@/components/movies/WatchlistButton';
import { JsonLd } from '@/components/seo/JsonLd';
import { CollectionDialog } from '@/components/movies/CollectionDialog';

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const headersList = await headers();
    const locale = (headersList.get('x-locale') || 'bg') as Locale;

    const movie = await (prisma.movie as unknown as {
        findUnique: (args: any) => Promise<any>
    }).findUnique({
        where: { slug },
        include: {
            moviecategory: {
                include: { category: true }
            }
        }
    });

    if (!movie) return { title: 'Филмът не е намерен' };

    return generateMovieMetadata(movie, locale);
}

export default async function MoviePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const headersList = await headers();
    const locale = (headersList.get('x-locale') || 'bg') as Locale;
    const t = (key: TranslationKey) => getTranslation(key, locale);

    const movie = await (prisma.movie as unknown as {
        findUnique: (args: any) => Promise<any>
    }).findUnique({
        where: { slug },
        include: {
            moviecategory: {
                include: { category: true },
            },
            videoserver: {
                orderBy: { order: 'asc' }
            },
            collection: {
                include: {
                    movies: {
                        where: { published: true },
                        orderBy: { year: 'asc' }
                    }
                }
            }
        },
    });

    if (!movie) notFound();


    const movieData = getLocalizedMovie(movie, locale);

    // Get movies from the same collection (filtered)
    const collectionMovies = movie.collection?.movies.filter((m: { id: number }) => m.id !== movie.id) || [];
    const categoryIds = movie.moviecategory.map((mc: { categoryId: number, category: { name: string, nameEN: string | null } }) => mc.categoryId);
    const collectionMovieIds = collectionMovies.map((m: { id: number }) => m.id);

    const relatedMovies = categoryIds.length > 0
        ? await (prisma.movie as unknown as {
            findMany: (args: any) => Promise<any[]>
        }).findMany({
            where: {
                id: { notIn: [movie.id, ...collectionMovieIds] },
                published: true,
                moviecategory: {
                    some: {
                        categoryId: { in: categoryIds },
                    },
                },
            },
            take: 6,
            orderBy: [
                { views: 'desc' },
                { createdAt: 'desc' }
            ]
        })
        : [];

    return (
        <div suppressHydrationWarning className="min-h-screen bg-brand-midnight text-brand-warmCream">
            {/* Hero Section with Backdrop */}
            <div suppressHydrationWarning className="relative h-[50vh] md:h-[65vh] lg:h-[75vh] w-full overflow-hidden">
                <Image
                    src={movie.backdropUrl || movie.posterUrl}
                    alt={movie.titleEN}
                    fill
                    className="object-cover opacity-20 blur-[2px] scale-105"
                    priority
                />
                {/* Brand Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight via-brand-midnight/60 to-transparent" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-royalPurple/20 via-transparent to-transparent opacity-50" />
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[60%] bg-brand-royalPurple/20 rounded-full blur-[100px]" />

                <div className="absolute inset-0 flex items-center md:items-end">
                    <div className="container mx-auto px-4 pb-16">
                        <div className="flex flex-col md:flex-row gap-10 items-center md:items-end">
                            {/* Poster */}
                            <div className="relative w-48 md:w-72 aspect-[2/3] rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] border border-brand-royalPurple/30 group shrink-0 transform -rotate-1 md:-rotate-2 transition-transform hover:rotate-0 duration-500">
                                <Image
                                    src={movie.posterUrl}
                                    alt={movie.titleBG}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {movie.isHD && (
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className="px-4 py-1.5 bg-brand-cinemaGold text-brand-midnight font-bold rounded-xl shadow-lg uppercase tracking-widest text-[11px]">HD</div>
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left space-y-6">
                                <div className="space-y-3">
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                                        {movie.moviecategory.map((mc: { categoryId: number, category: { name: string, nameEN: string | null } }) => (
                                            <div key={mc.categoryId} className="px-4 py-1.5 bg-brand-royalPurple/20 hover:bg-brand-royalPurple/40 border border-brand-royalPurple/30 text-brand-cinemaGold text-xs font-bold uppercase tracking-widest rounded-xl transition-all font-display">
                                                {locale === 'en' ? (mc.category.nameEN || mc.category.name) : mc.category.name}
                                            </div>
                                        ))}
                                    </div>
                                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display tracking-tight leading-[0.9] text-white">
                                        {movieData.title}
                                    </h1>
                                    <p className="text-xl md:text-2xl text-brand-softLavender font-medium italic opacity-70">
                                        {movieData.title === movie.titleEN ? movie.titleBG : movie.titleEN}
                                    </p>
                                </div>

                                <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 py-2">
                                    <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-brand-cinemaGold/10 text-brand-cinemaGold border border-brand-cinemaGold/20 shadow-xl shadow-brand-cinemaGold/5">
                                        <Star className="h-5 w-5 fill-current" />
                                        <span className="text-xl font-display tracking-widest leading-none">{movie.rating?.toFixed(1) || 'N/A'}</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-brand-softLavender hover:text-brand-warmCream transition-colors group">
                                        <Calendar className="h-5 w-5 text-brand-cinemaGold group-hover:scale-110 transition-transform" />
                                        <span className="font-display tracking-widest text-lg leading-none">{movie.year}</span>
                                    </div>

                                    {movie.duration && (
                                        <div className="flex items-center gap-3 text-brand-softLavender hover:text-brand-warmCream transition-colors group">
                                            <Clock className="h-5 w-5 text-brand-cinemaGold group-hover:scale-110 transition-transform" />
                                            <span className="font-display tracking-widest text-lg leading-none uppercase">{movie.duration} {t('minutes')}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 pt-4">
                                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 pt-6">
                                        <a href="#watch" className="group/btn relative px-12 py-5 bg-brand-playRed hover:bg-brand-playRed/90 text-white font-display text-2xl tracking-widest uppercase rounded-[2rem] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(229,57,53,0.3)] flex items-center gap-5 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                                            <Play className="h-7 w-7 fill-current transition-transform group-hover/btn:scale-110" />
                                            <span className="relative z-10">{t('watch_online') || 'ГЛЕДАЙ'}</span>
                                        </a>
                                        <div className="flex items-center gap-4 bg-brand-deepNight/50 p-2.5 rounded-[2.5rem] border border-brand-royalPurple/20 backdrop-blur-md shadow-2xl">
                                            <WatchlistButton movieId={movie.id} locale={locale} />
                                            <div className="w-[1px] h-8 bg-brand-royalPurple/30 mx-1" />
                                            <CollectionDialog movieId={movie.id} locale={locale} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-12">
                {/* Watch Section */}
                <section className="mb-20 scroll-mt-32" id="watch">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-12 w-1.5 bg-brand-playRed rounded-full shadow-[0_0_15px_rgba(229,57,53,0.5)]" />
                        <h2 className="text-4xl font-display tracking-widest text-brand-warmCream uppercase">{t('watch_online')}</h2>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-brand-royalPurple/30 to-transparent ml-6" />

                        {/* Friendly mascot tip */}
                        <div className="hidden lg:flex items-center gap-4 px-6 py-3 bg-brand-deepNight/50 rounded-[2rem] border border-brand-royalPurple/20 backdrop-blur-md group/tip hover:border-brand-cinemaGold/40 transition-all">
                            <div className="relative">
                                <img src="/brand/couchoo-icon-32.png" className="h-6 w-6 object-contain opacity-50 group-hover/tip:opacity-100 transition-opacity" alt="" />
                                <div className="absolute inset-0 bg-brand-cinemaGold/20 blur-lg rounded-full opacity-0 group-hover/tip:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-[10px] font-display tracking-[0.2em] text-brand-softLavender/60 uppercase group-hover/tip:text-brand-cinemaGold transition-colors">
                                {t('ai_quality_optimal') || "Chouchoo Препоръчва Max Качество"}
                            </span>
                        </div>
                    </div>

                    <MoviePlayerWrapper
                        movieId={movie.id}
                        videoUrl={movie.videoUrl || undefined}
                        videoServers={movie.videoserver && movie.videoserver.length > 0 ? movie.videoserver : undefined}
                        posterUrl={movie.posterUrl}
                        backdropUrl={movie.backdropUrl || undefined}
                        locale={locale}
                    />
                    <AdBanner slot="movie_under_player" />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-12">
                        <section className="bg-brand-deepNight/40 p-10 rounded-[2.5rem] border border-brand-royalPurple/30 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.02] scale-150 transition-transform group-hover:scale-125 duration-1000">
                                <img src="/brand/couchoo-icon-64.png" alt="" className="w-64 h-64" />
                            </div>

                            <h3 className="text-2xl font-display tracking-widest mb-8 flex items-center gap-3 text-brand-cinemaGold">
                                <Info className="h-6 w-6" />
                                {t('description')}
                            </h3>
                            <p className="text-xl text-brand-warmCream/90 leading-relaxed font-body">
                                {movieData.description}
                            </p>

                            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-brand-royalPurple/20">
                                {movie.director && (
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-softLavender">{t('director')}</p>
                                        <div className="text-xl font-display tracking-widest flex items-center gap-3 text-brand-warmCream">
                                            <div className="p-2 bg-brand-royalPurple/20 rounded-xl">
                                                <User className="h-5 w-5 text-brand-cinemaGold" />
                                            </div>
                                            {movie.director}
                                        </div>
                                    </div>
                                )}
                                {movie.cast && (
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-softLavender">{t('cast')}</p>
                                        <div className="text-xl font-display tracking-widest flex items-center gap-3 text-brand-warmCream line-clamp-2">
                                            <div className="p-2 bg-brand-royalPurple/20 rounded-xl">
                                                <Film className="h-5 w-5 text-brand-cinemaGold" />
                                            </div>
                                            {movie.cast}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section aria-label="Comments">
                            <MovieComments movieId={movie.id} locale={locale} />
                        </section>
                    </div>

                    {/* Right Column: Sidebar */}
                    <aside className="space-y-12">
                        <AdBanner slot="movie_sidebar" />

                        {collectionMovies.length > 0 && (
                            <section className="bg-primary/5 p-6 rounded-2xl border border-primary/20 backdrop-blur-sm shadow-inner transition-all hover:bg-primary/[0.07]">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-6 w-1.5 bg-primary rounded-full animate-pulse" />
                                    <h3 className="text-xl font-black tracking-tight text-primary uppercase">
                                        {movie.collection?.name}
                                    </h3>
                                </div>
                                <div className="space-y-5">
                                    {collectionMovies.map((relatedMovie: { id: number, titleBG: string, titleEN: string, posterUrl: string, year: number, rating: number | null }) => (
                                        <div key={relatedMovie.id} className="relative group">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                                            <MovieCard movie={relatedMovie} locale={locale} />
                                            <div className="absolute top-2 right-2 flex gap-1">
                                                <Badge className="bg-black/60 text-[10px] font-bold py-0 h-4 border-none backdrop-blur-md">
                                                    {relatedMovie.year}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </aside>
                </div>
            </main>

            {/* Recommended Section */}
            {relatedMovies.length > 0 && (
                <section className="container mx-auto px-4 py-20">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-10 w-10 bg-brand-cinemaGold/10 border border-brand-cinemaGold/20 flex items-center justify-center rounded-2xl text-brand-cinemaGold">
                            <Sparkles className="h-6 w-6" />
                        </div>
                        <h2 className="text-4xl font-display tracking-widest text-brand-warmCream uppercase">{t('similar_movies')}</h2>
                        <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-cinemaGold/30 to-transparent ml-6" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {relatedMovies.map((m: { id: number, titleBG: string, titleEN: string, posterUrl: string, year: number, rating: number | null }) => (
                            <MovieCard key={m.id} movie={getLocalizedMovie(m, locale)} locale={locale} />
                        ))}
                    </div>
                </section>
            )}

            <JsonLd movie={movieData} locale={locale} />
        </div>
    );
}
