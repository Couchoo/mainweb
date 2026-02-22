'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MovieCard } from '@/components/movies/MovieCard';
import { useToast } from '@/hooks/use-toast';
import { User, History, Settings, Gem, Loader2, Heart, CreditCard, Bookmark, FolderOpen, Trash2, Share2, Copy, Crown, Clock, Star } from 'lucide-react';
import { getTranslation, Locale } from '@/lib/i18n';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
    // Determine locale - in a client component we can check cookies or default to 'bg'
    const [locale, setLocale] = useState<Locale>('bg');
    const t = (key: any) => getTranslation(key, locale);

    useEffect(() => {
        const lang = document.cookie.split('; ').find(row => row.startsWith('NEXT_LOCALE='))?.split('=')[1];
        if (lang === 'en' || lang === 'bg') {
            setLocale(lang as Locale);
        }
    }, []);
    const { data: session, update } = useSession();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<any[]>([]);
    const [watchlist, setWatchlist] = useState<any[]>([]);
    const [historyLoading, setHistoryLoading] = useState(true);
    const [watchlistLoading, setWatchlistLoading] = useState(true);
    const [subscription, setSubscription] = useState<any>(null);
    const [subLoading, setSubLoading] = useState(true);
    const [collections, setCollections] = useState<any[]>([]);
    const [collectionsLoading, setCollectionsLoading] = useState(true);
    const [popcornBalance, setPopcornBalance] = useState(0);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [transactionsLoading, setTransactionsLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        image: '',
    });

    async function fetchSubscription() {
        try {
            const res = await fetch('/api/user/subscription');
            if (res.ok) {
                const data = await res.json();
                setSubscription(data);
            }
        } catch (error) {
            console.error('Failed to fetch subscription');
        } finally {
            setSubLoading(false);
        }
    }

    const getRemainingDays = (date: any) => {
        if (!date) return 0;
        const diff = new Date(date).getTime() - new Date().getTime();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days > 0 ? days : 0;
    };

    async function fetchCollections() {
        try {
            const res = await fetch('/api/user/collections');
            if (res.ok) {
                const data = await res.json();
                setCollections(data);
            }
        } finally {
            setCollectionsLoading(false);
        }
    }

    async function fetchPopcornHistory() {
        try {
            const res = await fetch('/api/popcorn/transactions');
            if (res.ok) {
                const data = await res.json();
                setTransactions(data.transactions);
                setPopcornBalance(data.balance);
            }
        } finally {
            setTransactionsLoading(false);
        }
    }

    async function handleBuyVipWithPopcorn() {
        if (!confirm('Сигурни ли сте, че искате да закупите 30 дни VIP за 5000 🍿?')) return;
        setLoading(true);
        try {
            const res = await fetch('/api/popcorn/buy-vip', { method: 'POST' });
            if (res.ok) {
                toast({ title: 'Успешно!', description: 'Вече сте VIP потребител за следващите 30 дни! 💎' });
                await update(); // Update session
                fetchPopcornHistory();
                fetchSubscription();
            } else {
                const data = await res.json();
                toast({ title: 'Грешка', description: data.message, variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Грешка', description: 'Възникна проблем при покупката.', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (session?.user && !loading) {
            setFormData(prev => ({
                name: prev.name || session?.user?.name || '',
                image: prev.image || session?.user?.image || '',
            }));
            fetchHistory();
            fetchWatchlist();
            fetchSubscription();
            fetchCollections();
            fetchPopcornHistory();
        }
    }, [session, loading]);

    async function deleteCollection(id: number) {
        if (!confirm('Сигурни ли сте, че искате да изтриете тази колекция?')) return;
        try {
            const res = await fetch(`/api/user/collections/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast({ title: 'Колекцията е изтрита' });
                fetchCollections();
            }
        } catch (error) {
            toast({ title: 'Грешка', variant: 'destructive' });
        }
    }

    const handleShare = (id: number) => {
        const url = `${window.location.origin}/collections/${id}`;
        navigator.clipboard.writeText(url);
        toast({
            title: 'Линкът е копиран!',
            description: 'Вече можете да споделите вашата колекция.',
        });
    };

    async function fetchWatchlist() {
        try {
            const res = await fetch('/api/watchlist');
            if (res.ok) {
                const data = await res.json();
                setWatchlist(data);
            }
        } catch (error) {
            console.error('Failed to fetch watchlist');
        } finally {
            setWatchlistLoading(false);
        }
    }

    async function fetchHistory() {
        try {
            const res = await fetch('/api/movies/history');
            if (res.ok) {
                const data = await res.json();
                setHistory(data);
            }
        } catch (error) {
            console.error('Failed to fetch history');
        } finally {
            setHistoryLoading(false);
        }
    }

    async function handleUpdateProfile(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                await update({ name: formData.name, image: formData.image });
                toast({ title: 'Профилът е обновен!', description: 'Промените бяха запазени успешно.' });
            }
        } catch (error) {
            toast({ title: 'Грешка', description: 'Неуспешно обновяване', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    }

    if (!session) {
        return (
            <div className="container py-20 text-center">
                <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen pb-20">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-royalPurple/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-cinemaGold/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="container py-12 relative">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-16 p-8 rounded-[3rem] bg-brand-deepNight/40 border border-brand-royalPurple/20 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                    {/* Background Mascot hint */}
                    <div className="absolute -right-16 -bottom-16 opacity-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000">
                        <img src="/brand/couchoo-mascot-footer.png" className="w-64 h-64 invert" alt="" />
                    </div>

                    <div className="relative">
                        <div
                            className="relative w-32 h-32 md:w-40 md:h-40 cursor-pointer group/avatar"
                            onClick={() => document.getElementById('avatar-upload')?.click()}
                        >
                            <Avatar className="w-full h-full border-4 border-brand-royalPurple/20 transition-all group-hover/avatar:border-brand-cinemaGold/40 group-hover/avatar:scale-105 shadow-2xl rounded-[2.5rem]">
                                <AvatarImage src={formData.image || undefined} className="object-cover rounded-[2.5rem]" />
                                <AvatarFallback className="text-4xl bg-brand-royalPurple/20 text-brand-cinemaGold uppercase font-display rounded-[2.5rem]">
                                    {session?.user?.email?.[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-midnight/80 rounded-[2.5rem] opacity-0 group-hover/avatar:opacity-100 transition-opacity backdrop-blur-sm border border-brand-cinemaGold/20">
                                <User className="h-8 w-8 text-brand-cinemaGold mb-1" />
                                <span className="text-[10px] text-brand-cinemaGold font-display tracking-widest uppercase">Update</span>
                            </div>

                            {['VIP', 'ADMIN', 'SUPER_ADMIN'].includes((session?.user as any)?.role) && (
                                <div className="absolute -top-2 -right-2 bg-brand-cinemaGold rounded-2xl p-2 shadow-[0_0_20px_rgba(240,192,64,0.4)] border-2 border-brand-midnight animate-bounce-slow">
                                    <Gem className="h-5 w-5 text-brand-midnight" />
                                </div>
                            )}

                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    setLoading(true);
                                    const uploadData = new FormData();
                                    uploadData.append('file', file);
                                    try {
                                        const res = await fetch('/api/user/profile/upload', {
                                            method: 'POST',
                                            body: uploadData,
                                        });
                                        if (res.ok) {
                                            const data = await res.json();
                                            setFormData(prev => ({ ...prev, image: data.imageUrl }));
                                            await update({ image: data.imageUrl });
                                            toast({ title: t('avatarUpdated'), description: 'Снимката ви беше обновена успешно.' });
                                        }
                                    } catch (err) {
                                        toast({ title: 'Грешка', description: 'Възникна проблем при качването', variant: 'destructive' });
                                    } finally {
                                        setLoading(false);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-2">
                            <h1 className="text-4xl md:text-6xl font-display tracking-widest uppercase text-brand-warmCream">
                                {session?.user?.name || session?.user?.email?.split('@')[0]}
                            </h1>
                            {['VIP', 'ADMIN', 'SUPER_ADMIN'].includes((session?.user as any)?.role) && (
                                <Badge className="bg-brand-cinemaGold/10 text-brand-cinemaGold border-brand-cinemaGold/30 font-display tracking-[0.2em] uppercase text-[10px] px-3 py-1 rounded-full animate-pulse">
                                    VIP Member
                                </Badge>
                            )}
                        </div>
                        <p className="text-xl font-display tracking-widest text-brand-softLavender uppercase mb-6">
                            {session?.user?.email}
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <div className="px-5 py-2 rounded-2xl bg-brand-midnight/40 border border-brand-royalPurple/10 flex items-center gap-3">
                                <History className="w-4 h-4 text-brand-cinemaGold" />
                                <span className="text-xs font-display tracking-widest uppercase text-brand-warmCream">
                                    {history.length} {t('watched')}
                                </span>
                            </div>
                            <div className="px-5 py-2 rounded-2xl bg-brand-midnight/40 border border-brand-royalPurple/10 flex items-center gap-3">
                                <Bookmark className="w-4 h-4 text-brand-cinemaGold" />
                                <span className="text-xs font-display tracking-widest uppercase text-brand-warmCream">
                                    {watchlist.length} {t('watchlist')}
                                </span>
                            </div>
                            <div className="px-5 py-2 rounded-2xl bg-brand-cinemaGold/10 border border-brand-cinemaGold/20 flex items-center gap-3">
                                <span className="text-sm">🍿</span>
                                <span className="text-xs font-display tracking-widest uppercase text-brand-cinemaGold">
                                    {popcornBalance} Popcorn
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="md:border-l border-brand-royalPurple/10 md:pl-8 flex flex-col gap-3 w-full md:w-auto">
                        <Button
                            variant="outline"
                            className="rounded-2xl border-brand-royalPurple/20 hover:bg-brand-royalPurple/10 text-brand-warmCream font-display tracking-widest uppercase h-12 px-8"
                            asChild
                        >
                            <Link href="/watchlist">View Library</Link>
                        </Button>
                        <Button
                            onClick={() => signOut()}
                            variant="ghost"
                            className="text-brand-playRed hover:bg-brand-playRed/10 rounded-2xl font-display tracking-widest uppercase"
                        >
                            {t('logout')}
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="overview" className="space-y-12">
                    <div className="relative group">
                        <TabsList className="bg-brand-deepNight/40 p-1.5 rounded-[2rem] border border-brand-royalPurple/20 backdrop-blur-xl h-auto flex flex-wrap gap-2 justify-center lg:justify-start shadow-2xl overflow-hidden">
                            <TabsTrigger value="overview" className="rounded-2xl px-8 py-3.5 data-[state=active]:bg-brand-cinemaGold data-[state=active]:text-brand-midnight font-display tracking-widest uppercase text-xs transition-all duration-300">
                                <User className="w-4 h-4 mr-3" />
                                {t('overview')}
                            </TabsTrigger>
                            <TabsTrigger value="history" className="rounded-2xl px-8 py-3.5 data-[state=active]:bg-brand-cinemaGold data-[state=active]:text-brand-midnight font-display tracking-widest uppercase text-xs transition-all duration-300">
                                <History className="w-4 h-4 mr-3" />
                                {t('history')}
                            </TabsTrigger>
                            <TabsTrigger value="favorites" className="rounded-2xl px-8 py-3.5 data-[state=active]:bg-brand-cinemaGold data-[state=active]:text-brand-midnight font-display tracking-widest uppercase text-xs transition-all duration-300">
                                <Bookmark className="w-4 h-4 mr-3" />
                                {t('watchlist')}
                            </TabsTrigger>
                            <TabsTrigger value="collections" className="rounded-2xl px-8 py-3.5 data-[state=active]:bg-brand-cinemaGold data-[state=active]:text-brand-midnight font-display tracking-widest uppercase text-xs transition-all duration-300">
                                <FolderOpen className="w-4 h-4 mr-3" />
                                Колекции
                            </TabsTrigger>
                            <TabsTrigger value="billing" className="rounded-2xl px-8 py-3.5 data-[state=active]:bg-brand-cinemaGold data-[state=active]:text-brand-midnight font-display tracking-widest uppercase text-xs transition-all duration-300">
                                <Crown className="w-4 h-4 mr-3" />
                                Абонамент
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="rounded-2xl px-8 py-3.5 data-[state=active]:bg-brand-cinemaGold data-[state=active]:text-brand-midnight font-display tracking-widest uppercase text-xs transition-all duration-300">
                                <Settings className="w-4 h-4 mr-3" />
                                {t('settings')}
                            </TabsTrigger>
                        </TabsList>
                        <div className="absolute top-0 right-10 -z-10 w-40 h-10 bg-brand-cinemaGold/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Overview Tab */}
                    <TabsContent value="overview">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <Card className="border-brand-royalPurple/20 bg-brand-deepNight/40 backdrop-blur-xl rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                    <History className="w-20 h-20 text-brand-cinemaGold" />
                                </div>
                                <CardContent className="pt-10">
                                    <p className="text-[10px] font-display tracking-[0.4em] uppercase text-brand-softLavender mb-2">{t('history')}</p>
                                    <p className="text-6xl font-display text-brand-warmCream mb-4">{history.length}</p>
                                    <div className="h-1 w-12 bg-brand-cinemaGold/40 rounded-full" />
                                </CardContent>
                            </Card>

                            <Card className="border-brand-royalPurple/20 bg-brand-deepNight/40 backdrop-blur-xl rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                    <Bookmark className="w-20 h-20 text-brand-cinemaGold" />
                                </div>
                                <CardContent className="pt-10">
                                    <p className="text-[10px] font-display tracking-[0.4em] uppercase text-brand-softLavender mb-2">{t('watchlist')}</p>
                                    <p className="text-6xl font-display text-brand-warmCream mb-4">{watchlist.length}</p>
                                    <div className="h-1 w-12 bg-brand-cinemaGold/40 rounded-full" />
                                </CardContent>
                            </Card>

                            <Card className="border-brand-royalPurple/20 bg-brand-deepNight/40 backdrop-blur-xl rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                    <FolderOpen className="w-20 h-20 text-brand-cinemaGold" />
                                </div>
                                <CardContent className="pt-10">
                                    <p className="text-[10px] font-display tracking-[0.4em] uppercase text-brand-softLavender mb-2">Колекции</p>
                                    <p className="text-6xl font-display text-brand-warmCream mb-4">{collections.length}</p>
                                    <div className="h-1 w-12 bg-brand-cinemaGold/40 rounded-full" />
                                </CardContent>
                            </Card>

                            <Card className="border-brand-cinemaGold/20 bg-brand-cinemaGold/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                    <Gem className="w-20 h-20 text-brand-cinemaGold" />
                                </div>
                                <CardContent className="pt-10">
                                    <p className="text-[10px] font-display tracking-[0.4em] uppercase text-brand-cinemaGold mb-2">Popcorn</p>
                                    <p className="text-6xl font-display text-brand-cinemaGold mb-4">{popcornBalance}</p>
                                    <div className="h-1 w-12 bg-brand-cinemaGold rounded-full" />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* History Tab */}
                    <TabsContent value="history" className="space-y-6">
                        {historyLoading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : history.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {history.map((item) => (
                                    <MovieCard key={item.id} movie={item.movie} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-secondary/5 border border-dashed border-secondary rounded-3xl p-12 text-center">
                                <p className="text-muted-foreground text-lg italic">{t('noMovies')}</p>
                            </div>
                        )}
                    </TabsContent>

                    {/* Favorites Tab */}
                    <TabsContent value="favorites" className="space-y-6">
                        {watchlistLoading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : watchlist.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {watchlist.map((movie: any) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-secondary/5 border border-dashed border-secondary rounded-3xl p-12 text-center">
                                <p className="text-muted-foreground text-lg italic">{t('noMovies')}</p>
                            </div>
                        )}
                    </TabsContent>

                    {/* Collections Tab */}
                    <TabsContent value="collections" className="space-y-8">
                        {collectionsLoading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="h-8 w-8 animate-spin text-brand-cinemaGold" />
                            </div>
                        ) : collections.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {collections.map((col) => (
                                    <Card key={col.id} className="group overflow-hidden border-brand-royalPurple/20 bg-brand-deepNight/40 backdrop-blur-xl rounded-[2.5rem] hover:border-brand-cinemaGold/40 transition-all duration-500 hover:shadow-2xl flex flex-col">
                                        <CardHeader className="p-8">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-4 rounded-2xl bg-brand-royalPurple/10 text-brand-cinemaGold border border-brand-royalPurple/20">
                                                    <FolderOpen className="w-6 h-6" />
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-10 w-10 rounded-xl hover:bg-brand-cinemaGold/20 hover:text-brand-cinemaGold transition-colors"
                                                        onClick={() => handleShare(col.id)}
                                                    >
                                                        <Share2 className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-10 w-10 rounded-xl hover:bg-brand-playRed/20 hover:text-brand-playRed transition-colors"
                                                        onClick={() => deleteCollection(col.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <CardTitle className="text-2xl font-display tracking-widest uppercase text-brand-warmCream truncate group-hover:text-brand-cinemaGold transition-colors mb-2">
                                                {col.name}
                                            </CardTitle>
                                            <p className="text-xs font-display tracking-[0.2em] uppercase text-brand-softLavender">
                                                {col._count.movies} {col._count.movies === 1 ? 'Film' : 'Films'}
                                            </p>
                                        </CardHeader>
                                        <div className="px-8 pb-8 mt-auto">
                                            <Button asChild className="w-full h-12 rounded-xl bg-brand-royalPurple/20 hover:bg-brand-royalPurple/30 text-brand-warmCream font-display tracking-widest uppercase text-xs transition-all">
                                                <Link href={`/collections/${col.id}`}>
                                                    Open Collection
                                                </Link>
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-brand-deepNight/40 rounded-[3rem] border-2 border-dashed border-brand-royalPurple/20 backdrop-blur-xl">
                                <img src="/brand/couchoo-mascot-footer.png" className="w-32 h-32 mb-8 opacity-20 invert" alt="Chouchoo" />
                                <h2 className="text-3xl font-display tracking-widest text-brand-softLavender/40 uppercase mb-4">
                                    {locale === 'en' ? 'No collections found' : 'Нямате колекции'}
                                </h2>
                                <p className="text-brand-softLavender/20 font-display tracking-widest uppercase text-sm max-w-sm mb-10">
                                    {locale === 'en'
                                        ? 'Start creating your own movie curations from any movie page.'
                                        : 'Започнете да създавате свои собствени филмови курации от всяка страница на филм.'}
                                </p>
                            </div>
                        )}
                    </TabsContent>

                    {/* Subscription & Popcorn Tab */}
                    <TabsContent value="billing" className="space-y-12">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* VIP Subscription Card */}
                            <Card className="lg:col-span-2 border-brand-cinemaGold/30 bg-brand-midnight shadow-[0_0_80px_rgba(240,192,64,0.15)] relative overflow-hidden group rounded-[3rem]">
                                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-brand-cinemaGold to-transparent" />

                                <CardHeader className="p-10 pb-4 relative z-10">
                                    <CardTitle className="text-2xl font-display tracking-widest uppercase flex items-center gap-4 text-brand-cinemaGold">
                                        <Crown className="w-8 h-8 drop-shadow-[0_0_15px_rgba(240,192,64,0.4)]" />
                                        Active Membership
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-10 pt-0 relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                                    <div className="flex items-center gap-8">
                                        <div className={`h-28 w-28 rounded-[2rem] flex items-center justify-center transition-all duration-700 ${((session?.user as any)?.role === 'ADMIN' || (session?.user as any)?.role === 'SUPER_ADMIN' || subscription?.hasActiveSubscription)
                                            ? 'bg-brand-cinemaGold/10 text-brand-cinemaGold shadow-[0_0_50px_rgba(240,192,64,0.2)] border border-brand-cinemaGold/20 rotate-3 group-hover:rotate-0'
                                            : 'bg-brand-deepNight/40 text-brand-softLavender/40 border border-brand-royalPurple/20'
                                            }`}>
                                            <Gem className="h-14 w-14" />
                                        </div>
                                        <div>
                                            <h3 className="text-4xl font-display tracking-widest text-brand-warmCream uppercase mb-2">
                                                {((session?.user as any)?.role === 'ADMIN' || (session?.user as any)?.role === 'SUPER_ADMIN' || (session?.user as any)?.role === 'VIP' || subscription?.hasActiveSubscription)
                                                    ? 'Couchoo VIP'
                                                    : 'Standard Guest'}
                                            </h3>
                                            <p className="text-sm font-display tracking-widest text-brand-softLavender uppercase">
                                                {((session?.user as any)?.role === 'ADMIN' || (session?.user as any)?.role === 'SUPER_ADMIN' || subscription?.hasActiveSubscription)
                                                    ? `Expires: ${new Date(subscription?.currentPeriodEnd || '2030-01-01').toLocaleDateString(locale === 'bg' ? 'bg-BG' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric' })}`
                                                    : 'Unlock the full cinematic experience.'}
                                            </p>
                                        </div>
                                    </div>
                                    <Button asChild className="rounded-2xl h-16 px-12 bg-brand-cinemaGold hover:bg-brand-deepGold text-brand-midnight font-display tracking-widest uppercase text-lg shadow-2xl transition-all hover:scale-105">
                                        <Link href="/vip">{subscription?.hasActiveSubscription ? 'Extend VIP' : 'Upgrade Now'}</Link>
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Popcorn Balance Card */}
                            <Card className="border-brand-royalPurple/20 bg-brand-deepNight/40 backdrop-blur-xl rounded-[3rem] shadow-2xl relative overflow-hidden group">
                                <CardHeader className="p-8 pb-2">
                                    <CardTitle className="text-sm font-display tracking-[0.4em] uppercase text-brand-softLavender flex items-center gap-3">
                                        Reserved Balance
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 text-center">
                                    <div className="text-7xl font-display text-brand-cinemaGold mb-4 group-hover:scale-110 transition-transform duration-500">
                                        {popcornBalance} <span className="text-3xl ml-2">🍿</span>
                                    </div>
                                    <p className="text-[10px] font-display tracking-[0.3em] uppercase text-brand-softLavender/40">
                                        Your Popcorn stash
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Buy VIP with Popcorn */}
                            <Card className="border-brand-royalPurple/20 bg-brand-deepNight/40 backdrop-blur-xl rounded-[3rem] shadow-2xl relative overflow-hidden">
                                <CardHeader className="p-10">
                                    <CardTitle className="text-3xl font-display tracking-widest uppercase text-brand-warmCream">Redeem Rewards</CardTitle>
                                </CardHeader>
                                <CardContent className="px-10 pb-10">
                                    <div className="p-8 rounded-[2rem] bg-brand-midnight/60 border border-brand-royalPurple/10 flex flex-col items-center gap-6 text-center group">
                                        <div className="h-20 w-20 rounded-full bg-brand-cinemaGold/10 border border-brand-cinemaGold/20 flex items-center justify-center text-brand-cinemaGold group-hover:scale-110 transition-transform duration-500">
                                            <Star className="h-10 w-10 fill-brand-cinemaGold" />
                                        </div>
                                        <div>
                                            <h4 className="text-2xl font-display tracking-widest text-brand-warmCream uppercase mb-2">30 Days High-End VIP</h4>
                                            <p className="text-sm font-display tracking-widest text-brand-softLavender/60 uppercase">Exchange your hard-earned popcorn.</p>
                                        </div>
                                        <Button
                                            onClick={handleBuyVipWithPopcorn}
                                            disabled={loading || popcornBalance < 5000}
                                            className="w-full rounded-2xl h-14 bg-brand-cinemaGold hover:bg-brand-deepGold text-brand-midnight font-display tracking-widest uppercase text-lg shadow-xl"
                                        >
                                            Buy for 5000 🍿
                                        </Button>
                                        {popcornBalance < 5000 && (
                                            <p className="text-[10px] font-display tracking-widest text-brand-playRed uppercase">Insufficient Popcorn (need {5000 - popcornBalance} more)</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Transaction History */}
                            <Card className="border-brand-royalPurple/20 bg-brand-deepNight/40 backdrop-blur-xl rounded-[3rem] shadow-2xl flex flex-col overflow-hidden">
                                <CardHeader className="p-10 pb-6 border-b border-brand-royalPurple/10">
                                    <CardTitle className="text-2xl font-display tracking-widest uppercase text-brand-warmCream flex justify-between items-center">
                                        Popcorn Journal
                                        <Clock className="w-6 h-6 text-brand-cinemaGold" />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 flex-1 max-h-[400px] overflow-y-auto custom-scrollbar">
                                    {transactionsLoading ? (
                                        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-brand-cinemaGold" /></div>
                                    ) : transactions.length > 0 ? (
                                        <div className="divide-y divide-brand-royalPurple/10">
                                            {transactions.map((tx: any) => (
                                                <div key={tx.id} className="flex justify-between items-center p-8 hover:bg-brand-royalPurple/5 transition-colors">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[10px] font-display tracking-[0.3em] uppercase text-brand-cinemaGold">
                                                            {tx.type === 'GIFT_SENT' ? 'Outbound Gift' :
                                                                tx.type === 'GIFT_RECEIVED' ? 'Inbound Reward' :
                                                                    tx.type === 'VIP_UPGRADE' ? 'VIP Redemption' : 'Acquisition'}
                                                        </span>
                                                        <span className="text-lg font-display tracking-widest text-brand-warmCream uppercase">{tx.targetName}</span>
                                                        <span className="text-[10px] font-display tracking-widest text-brand-softLavender/40 uppercase">{new Date(tx.createdAt).toLocaleString(locale === 'bg' ? 'bg-BG' : 'en-US')}</span>
                                                    </div>
                                                    <div className={`text-2xl font-display ${tx.amount > 0 ? 'text-green-500' : 'text-brand-playRed'}`}>
                                                        {tx.amount > 0 ? '+' : ''}{tx.amount} 🍿
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-20 text-center">
                                            <p className="text-lg font-display tracking-widest text-brand-softLavender/40 uppercase italic">Journal is empty.</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings">
                        <Card className="max-w-2xl border-brand-royalPurple/20 bg-brand-deepNight/40 backdrop-blur-xl rounded-[3rem] shadow-2xl relative overflow-hidden group">
                            <CardHeader className="p-10">
                                <CardTitle className="text-3xl font-display tracking-widest uppercase text-brand-warmCream">Identity Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="px-10 pb-10">
                                <form onSubmit={handleUpdateProfile} className="space-y-8">
                                    <div className="space-y-3">
                                        <Label htmlFor="name" className="text-[10px] font-display tracking-[0.4em] uppercase text-brand-softLavender ml-1">Display Name</Label>
                                        <div className="relative group/input">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-softLavender group-focus-within/input:text-brand-cinemaGold transition-colors" />
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="pl-12 h-14 bg-brand-midnight/40 border-brand-royalPurple/10 rounded-2xl focus:ring-brand-cinemaGold/30 font-display tracking-widest uppercase text-sm"
                                            />
                                        </div>
                                    </div>
                                    <Button disabled={loading} className="w-full h-14 rounded-2xl bg-brand-cinemaGold hover:bg-brand-deepGold text-brand-midnight font-display tracking-widest uppercase text-lg shadow-xl transition-all hover:-translate-y-1">
                                        {loading ? 'Processing...' : 'Save Preferences'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
