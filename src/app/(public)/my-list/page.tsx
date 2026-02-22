import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { MovieCard } from '@/components/movies/MovieCard';
import { headers } from 'next/headers';
import { getTranslation, Locale, getLocalizedMovie } from '@/lib/i18n';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bookmark, Clock, Film } from 'lucide-react';

export default async function MyListPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        redirect('/login');
    }

    const userId = parseInt((session.user as any).id);
    const headersList = await headers();
    const locale = (headersList.get('x-locale') || 'bg') as Locale;
    const t = (key: any) => getTranslation(key, locale);

    // Fetch watchlist and history
    const [watchlist, history] = await Promise.all([
        (prisma as any).watchlist.findMany({
            where: { userId },
            include: { movie: true },
            orderBy: { movie: { createdAt: 'desc' } }
        }),
        (prisma as any).watchhistory.findMany({
            where: { userId },
            include: { movie: true },
            orderBy: { updatedAt: 'desc' },
            take: 24
        })
    ]);

    return (
        <div className="container py-12">
            <div className="flex flex-col gap-2 mb-10">
                <h1 className="text-4xl font-black tracking-tight">{t('myMovies') || 'Моите Филми'}</h1>
                <p className="text-muted-foreground">{t('myMoviesDesc') || 'Твоят личен списък и хронология на гледане.'}</p>
            </div>

            <Tabs defaultValue="watchlist" className="space-y-8">
                <TabsList className="bg-secondary/20 p-1 rounded-xl border border-white/5 backdrop-blur-md">
                    <TabsTrigger value="watchlist" className="rounded-lg gap-2 px-6">
                        <Bookmark className="h-4 w-4" />
                        {t('watchlist')}
                    </TabsTrigger>
                    <TabsTrigger value="history" className="rounded-lg gap-2 px-6">
                        <Clock className="h-4 w-4" />
                        {t('history') || 'Хронология'}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="watchlist" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {watchlist.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {watchlist.map((item: any) => (
                                <MovieCard
                                    key={item.movie.id}
                                    movie={getLocalizedMovie(item.movie, locale)}
                                    locale={locale}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-secondary/10 rounded-3xl border border-dashed border-white/10">
                            <Bookmark className="h-16 w-16 text-muted-foreground/20 mb-4" />
                            <p className="text-xl font-medium text-muted-foreground">{t('noWatchlist') || 'Нямаш добавени филми в любими.'}</p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="history" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {history.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {history.map((item: any) => (
                                <div key={item.movie.id} className="relative group">
                                    <MovieCard
                                        movie={getLocalizedMovie(item.movie, locale)}
                                        locale={locale}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-secondary/10 rounded-3xl border border-dashed border-white/10">
                            <Clock className="h-16 w-16 text-muted-foreground/20 mb-4" />
                            <p className="text-xl font-medium text-muted-foreground">{t('noHistory') || 'Все още не си гледал нищо.'}</p>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
