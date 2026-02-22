import { prisma } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Film, Users, Gem, Eye, TrendingUp } from 'lucide-react';
import { headers } from 'next/headers';
import { getTranslation, Locale } from '@/lib/i18n';

async function getStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        d.setHours(0, 0, 0, 0);
        return d;
    }).reverse();

    const last24h = new Date();
    last24h.setHours(last24h.getHours() - 24);

    const [totalMovies, totalUsers, totalVIP, todayViews, recentMovies, dailyActivity, trendingMovies, newUsers7d] = await Promise.all([
        prisma.movie.count(),
        prisma.user.count(),
        prisma.user.count({ where: { role: 'VIP' } }),
        prisma.analytics.count({
            where: {
                event: 'movie_view_start',
                createdAt: { gte: today }
            }
        }),
        prisma.movie.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: { id: true, titleBG: true, createdAt: true, views: true },
        }),
        Promise.all(last7Days.map(async (day) => {
            const nextDay = new Date(day);
            nextDay.setDate(day.getDate() + 1);
            const count = await prisma.analytics.count({
                where: {
                    event: 'movie_view_start',
                    createdAt: { gte: day, lt: nextDay }
                }
            });
            return { day: day.toLocaleDateString('bg-BG', { weekday: 'short' }), count };
        })),
        prisma.analytics.groupBy({
            by: ['movieId'],
            where: {
                event: 'movie_view_start',
                createdAt: { gte: last24h },
                movieId: { not: null }
            },
            _count: {
                movieId: true
            },
            orderBy: {
                _count: {
                    movieId: 'desc'
                }
            },
            take: 5
        }),
        prisma.user.count({
            where: {
                createdAt: { gte: last7Days[0] }
            }
        })
    ]);

    // Fetch movie details for trending movies
    const trendingWithDetails = await Promise.all(
        trendingMovies.map(async (item: any) => {
            const movie = await prisma.movie.findUnique({
                where: { id: item.movieId },
                select: { titleBG: true, posterUrl: true, rating: true }
            });
            return { ...movie, viewCount: item._count.movieId };
        })
    );

    return { totalMovies, totalUsers, totalVIP, todayViews, recentMovies, dailyActivity, trendingMovies: trendingWithDetails, newUsers7d };
}

export default async function AdminDashboard() {
    const stats = await getStats();
    const headersList = await headers();
    const locale = (headersList.get('x-locale') || 'bg') as Locale;
    const t = (key: any) => getTranslation(key, locale);

    const statCards = [
        { label: 'Общо филми', value: stats.totalMovies, icon: Film, color: 'text-blue-400' },
        { label: 'Общо потребители', value: stats.totalUsers, icon: Users, color: 'text-emerald-400' },
        { label: 'Нови (7 дни)', value: stats.newUsers7d, icon: TrendingUp, color: 'text-indigo-400' },
        { label: 'VIP членово', value: stats.totalVIP, icon: Gem, color: 'text-fuchsia-400' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">{t('adminPanel')}</h1>
                <p className="text-muted-foreground">Добре дошли в контролния панел на платформата.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-4">
                {statCards.map((card) => (
                    <Card key={card.label} className="overflow-hidden border-secondary">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {card.label}
                            </CardTitle>
                            <card.icon className={`h-5 w-5 ${card.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{card.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* 7 Day Chart */}
            <Card className="border-secondary bg-card/50">
                <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <Gem className="h-5 w-5 text-primary" />
                        Активност (Гледания) - Последните 7 дни
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64 flex items-end justify-between gap-2 pt-4">
                        {stats.dailyActivity.map((day) => {
                            const max = Math.max(...stats.dailyActivity.map(d => d.count), 1);
                            const height = (day.count / max) * 100;
                            return (
                                <div key={day.day} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div className="relative w-full flex items-end justify-center h-full">
                                        <div
                                            className="w-full max-w-[40px] bg-primary/20 hover:bg-primary/40 rounded-t-lg transition-all duration-500 relative group"
                                            style={{ height: `${height}%` }}
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-secondary shadow-xl z-10">
                                                {day.count} гледания
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-muted-foreground uppercase">{day.day}</span>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Trending Movies (24h) */}
                <Card className="border-secondary bg-card/50 overflow-hidden group">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-secondary/50 bg-secondary/10">
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                            <Gem className="h-5 w-5 text-yellow-500 animate-pulse" />
                            {t('trending24h')}
                        </CardTitle>
                        <span className="text-xs font-bold text-muted-foreground uppercase bg-secondary px-2 py-1 rounded">{t('live')}</span>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-secondary/30">
                            {stats.trendingMovies.length > 0 ? (
                                stats.trendingMovies.map((movie: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-4 p-4 hover:bg-secondary/20 transition-colors"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-black">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold truncate">{movie.titleBG}</p>
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">⭐ {movie.rating}</span>
                                                <span className="flex items-center gap-1 italic opacity-70">
                                                    {movie.viewCount} {t('newViews')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="p-12 text-center text-muted-foreground italic">Няма достатъчно данни за трендинг.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Movies */}
                <Card className="border-secondary bg-card/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-xl font-bold">Последно добавени филми</CardTitle>
                        <Film className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {stats.recentMovies.length > 0 ? (
                                stats.recentMovies.map((movie: any) => (
                                    <div
                                        key={movie.id}
                                        className="flex items-center justify-between border-b border-secondary pb-4 last:border-0 last:pb-0"
                                    >
                                        <div className="space-y-1">
                                            <p className="font-semibold text-lg">{movie.titleBG}</p>
                                            <p className="text-sm text-muted-foreground flex items-center">
                                                Добавен на: {movie.createdAt.toLocaleDateString('bg-BG')}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1 rounded-full text-sm font-medium">
                                            <Eye className="h-4 w-4 text-primary" />
                                            {movie.views.toLocaleString()} гледания
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center py-8 text-muted-foreground italic">Няма открити филми.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
