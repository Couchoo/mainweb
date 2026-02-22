'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { MovieCard } from '@/components/movies/MovieCard';
import { Bookmark } from 'lucide-react';
import { Loading } from '@/components/ui/loading';
import { EmptyState } from '@/components/ui/empty-state';
import { useToast } from '@/hooks/use-toast';
import { getLocalizedMovie, Locale } from '@/lib/i18n';

export default function WatchlistPage() {
    const { data: session, status } = useSession();
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const [locale, setLocale] = useState<Locale>('bg');

    useEffect(() => {
        const cookieLocale = document.cookie
            .split('; ')
            .find(row => row.startsWith('NEXT_LOCALE='))
            ?.split('=')[1] as Locale;
        if (cookieLocale) setLocale(cookieLocale);
    }, []);

    const isEN = locale === 'en';

    useEffect(() => {
        async function fetchWatchlist() {
            if (status !== 'authenticated') {
                setLoading(false);
                return;
            }

            try {
                setError(null);
                const res = await fetch('/api/watchlist');

                if (!res.ok) {
                    throw new Error(isEN ? 'Failed to load watchlist' : 'Неуспешно зареждане на списъка');
                }

                const data = await res.json();
                setMovies(data);
            } catch (error: any) {
                console.error('Failed to fetch watchlist:', error);
                setError(error.message || (isEN ? 'An error occurred while loading' : 'Възникна грешка при зареждане'));
                toast({
                    title: isEN ? 'Error' : 'Грешка',
                    description: isEN ? 'Failed to load your watchlist' : 'Неуспешно зареждане на списъка с любими филми',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        }
        fetchWatchlist();
    }, [status, toast, isEN]);

    if (status === 'loading' || loading) {
        return (
            <div className="container py-12">
                <Loading size="lg" text={isEN ? 'Loading your collection...' : 'Зареждане на вашата колекция...'} />
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <div className="container py-12">
                <EmptyState
                    icon={Bookmark}
                    title={isEN ? 'Please sign in' : 'Влезте в профила си'}
                    description={isEN ? 'You need to be logged in to view your watchlist.' : 'Трябва да сте влезли, за да виждате вашия списък с любими филми.'}
                    action={{
                        label: isEN ? 'To Login' : 'Към вход',
                        href: '/login'
                    }}
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-12">
                <EmptyState
                    icon={Bookmark}
                    title={isEN ? 'Loading Error' : 'Грешка при зареждане'}
                    description={error}
                    action={{
                        label: isEN ? 'Try Again' : 'Опитай отново',
                        href: '/watchlist'
                    }}
                />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-royalPurple/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-cinemaGold/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="container py-12 relative">
                <div className="max-w-4xl mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-[2px] w-12 bg-brand-cinemaGold" />
                        <span className="text-[12px] font-display tracking-[0.4em] uppercase text-brand-cinemaGold">
                            {isEN ? 'Library' : 'Библиотека'}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display tracking-widest uppercase text-brand-warmCream leading-none mb-4 flex items-center gap-6">
                        <Bookmark className="h-12 w-12 text-brand-cinemaGold fill-brand-cinemaGold/20" />
                        {isEN ? 'Watchlist' : 'Любими филми'}
                    </h1>
                    <p className="text-xl font-display tracking-widest text-brand-softLavender uppercase">
                        {movies.length} {isEN ? (movies.length === 1 ? 'film saved' : 'films saved') : 'запазени филма'}
                    </p>
                </div>

                {movies.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 xl:gap-8">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={getLocalizedMovie(movie, locale)} locale={locale} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={Bookmark}
                        title={isEN ? 'Your couch is calling' : 'Твоят диван те зове'}
                        description={isEN ? 'Your watchlist is empty. Start exploring and save the ones you love for a cozy night in.' : 'Списъкът ти е празен. Започни да изследваш и запази филмите, които обичаш, за уютна вечер.'}
                        action={{
                            label: isEN ? 'Browse Cinema' : 'Разгледай киното',
                            href: '/'
                        }}
                    />
                )}
            </div>
        </div>
    );
}
