import { prisma } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Users, Film, MessageSquare, TrendingUp, Star, Download } from 'lucide-react';

async function getAnalytics() {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        d.setHours(0, 0, 0, 0);
        return d;
    }).reverse();

    const [
        totalMovies,
        totalUsers,
        totalViews,
        totalComments,
        topMovies,
        recentEvents,
        moviesByCategory,
        registrationTrend
    ] = await Promise.all([
        prisma.movie.count(),
        prisma.user.count(),
        prisma.movie.aggregate({ _sum: { views: true } }),
        prisma.comment.count(),
        prisma.movie.findMany({
            take: 10,
            orderBy: { views: 'desc' },
            include: {
                moviecategory: {
                    include: { category: true }
                }
            }
        }),
        prisma.analytics.findMany({
            take: 20,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.category.findMany({
            include: {
                moviecategory: {
                    include: {
                        movie: true
                    }
                }
            }
        }),
        Promise.all(last30Days.map(async (day) => {
            const nextDay = new Date(day);
            nextDay.setDate(day.getDate() + 1);
            const count = await prisma.user.count({
                where: {
                    createdAt: { gte: day, lt: nextDay }
                }
            });
            return { date: day.toLocaleDateString('bg-BG', { day: '2-digit', month: 'short' }), count };
        }))
    ]);

    return {
        totalMovies,
        totalUsers,
        totalViews: totalViews._sum.views || 0,
        totalComments,
        topMovies,
        recentEvents,
        moviesByCategory,
        registrationTrend,
        avgViewsPerMovie: totalMovies > 0 ? (totalViews._sum.views || 0) / totalMovies : 0
    };
}

export default async function AdminAnalyticsPage() {
    const analytics = await getAnalytics();

    const statCards = [
        {
            title: 'Общо филми',
            value: analytics.totalMovies,
            icon: Film,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10'
        },
        {
            title: 'Общо потребители',
            value: analytics.totalUsers,
            icon: Users,
            color: 'text-green-500',
            bgColor: 'bg-green-500/10'
        },
        {
            title: 'Общо гледания',
            value: analytics.totalViews.toLocaleString(),
            icon: Eye,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10'
        },
        {
            title: 'Общо коментари',
            value: analytics.totalComments,
            icon: MessageSquare,
            color: 'text-orange-500',
            bgColor: 'bg-orange-500/10'
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        Статистика и Аналитика
                    </h1>
                    <p className="text-muted-foreground mt-2">Преглед на ключовите метрики на платформата</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild>
                        <a href="/api/admin/export?type=movies" download>
                            <Download className="h-4 w-4 mr-2" />
                            Експорт филми
                        </a>
                    </Button>
                    <Button variant="outline" asChild>
                        <a href="/api/admin/export?type=comments" download>
                            <Download className="h-4 w-4 mr-2" />
                            Експорт коментари
                        </a>
                    </Button>
                    <Button variant="outline" asChild>
                        <a href="/api/admin/export?type=analytics" download>
                            <Download className="h-4 w-4 mr-2" />
                            Експорт събития
                        </a>
                    </Button>
                </div>
            </div>

            {/* Engagement & Growth */}
            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2 border-secondary bg-card/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Ръст на потребителите (Последните 30 дни)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-48 flex items-end justify-between gap-1 pt-4">
                            {analytics.registrationTrend.map((day, idx) => {
                                const max = Math.max(...analytics.registrationTrend.map(d => d.count), 1);
                                const height = (day.count / max) * 100;
                                // Only show some labels to avoid clutter
                                const showLabel = idx === 0 || idx === 14 || idx === 29;
                                return (
                                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                                        <div
                                            className="w-full bg-primary/20 hover:bg-primary/50 transition-all rounded-t-sm relative group"
                                            style={{ height: `${height}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-secondary shadow-xl z-20">
                                                {day.count} нови
                                            </div>
                                        </div>
                                        {showLabel && (
                                            <span className="text-[10px] text-muted-foreground whitespace-nowrap absolute -bottom-6">
                                                {day.date}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-8 pt-4 border-t border-secondary/30 flex justify-between text-xs text-muted-foreground italic">
                            <span>Общо нови за периода: {analytics.registrationTrend.reduce((a, b) => a + b.count, 0)}</span>
                            <span>Средно на ден: {(analytics.registrationTrend.reduce((a, b) => a + b.count, 0) / 30).toFixed(1)}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-secondary bg-card/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Eye className="h-4 w-4 text-purple-500" />
                            Engagement
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Средно гледания на филм</p>
                            <p className="text-3xl font-bold">{analytics.avgViewsPerMovie.toFixed(1)}</p>
                            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 rounded-full" style={{ width: '65%' }} />
                            </div>
                        </div>
                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Коментари / Потребител</span>
                                <span className="font-bold">{(analytics.totalComments / (analytics.totalUsers || 1)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Гледания / Потребител</span>
                                <span className="font-bold">{(analytics.totalViews / (analytics.totalUsers || 1)).toFixed(1)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <Card key={stat.title} className="border-secondary">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Top Movies */}
                <Card className="border-secondary">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Star className="h-5 w-5 text-primary" />
                            Топ 10 филма по гледания
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {analytics.topMovies.map((movie: any, index: number) => (
                                <div key={movie.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold truncate">{movie.titleBG}</p>
                                        <div className="flex gap-1 mt-1">
                                            {(movie.moviecategory || []).slice(0, 2).map((c: any) => (
                                                <Badge key={c.categoryId} variant="secondary" className="text-[10px]">
                                                    {c.category.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <Eye className="h-4 w-4" />
                                        <span className="font-mono font-semibold">{movie.views.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Movies by Category */}
                <Card className="border-secondary">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Film className="h-5 w-5 text-primary" />
                            Филми по категории
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {analytics.moviesByCategory
                                .sort((a, b) => (b.moviecategory?.length || 0) - (a.moviecategory?.length || 0))
                                .slice(0, 10)
                                .map((category) => {
                                    const totalViews = (category.moviecategory || []).reduce((sum: number, m: any) => sum + (m.movie?.views || 0), 0);
                                    return (
                                        <div key={category.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                                            <div className="flex-1">
                                                <p className="font-semibold">{category.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {category.moviecategory?.length || 0} филма • {totalViews.toLocaleString()} гледания
                                                </p>
                                            </div>
                                            <Badge variant="outline">{category.moviecategory?.length || 0}</Badge>
                                        </div>
                                    );
                                })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Events */}
            <Card className="border-secondary">
                <CardHeader>
                    <CardTitle>Последна активност</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {analytics.recentEvents.map((event: any) => (
                            <div key={event.id} className="flex items-center justify-between p-2 rounded hover:bg-secondary/20 transition-colors text-sm">
                                <div className="flex items-center gap-3">
                                    <Badge variant="secondary" className="font-mono text-[10px]">
                                        {event.event}
                                    </Badge>
                                    {event.movieId && (
                                        <span className="text-muted-foreground text-xs">Movie ID: {event.movieId}</span>
                                    )}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {new Date(event.createdAt).toLocaleString('bg-BG', {
                                        day: '2-digit',
                                        month: 'short',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                        ))}
                        {analytics.recentEvents.length === 0 && (
                            <p className="text-center py-8 text-muted-foreground italic">Няма записани събития.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
