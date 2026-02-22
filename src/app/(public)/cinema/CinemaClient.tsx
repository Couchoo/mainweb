'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Send,
    Users,
    Gift,
    MessageSquare,
    Play,
    Calendar,
    Star,
    X,
    Clock,
} from 'lucide-react';
import { VideoPlayer } from '@/components/movies/VideoPlayer';
import { useToast } from '@/hooks/use-toast';
import { format, differenceInSeconds } from 'date-fns';
import { bg as bgLocale, enUS } from 'date-fns/locale';
import { useCinemaWS, type GiftPayload } from '@/hooks/use-cinema-ws';
import { UltimateGiftOverlay } from '@/components/cinema/UltimateGiftOverlay';
import { getTranslation, Locale } from '@/lib/i18n';

interface CinemaClientProps {
    locale: Locale;
}

function CountdownTimer({ targetDate, locale }: { targetDate: Date, locale: Locale }) {
    const t = (key: any) => getTranslation(key, locale);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const diff = differenceInSeconds(targetDate, now);

            if (diff <= 0) {
                clearInterval(timer);
                window.location.reload();
                return;
            }

            setTimeLeft({
                hours: Math.floor(diff / 3600),
                minutes: Math.floor((diff % 3600) / 60),
                seconds: diff % 60
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex gap-4 justify-center">
            {[
                { label: t('cinema_hours'), value: timeLeft.hours },
                { label: t('cinema_minutes_unit'), value: timeLeft.minutes },
                { label: t('cinema_seconds_unit'), value: timeLeft.seconds }
            ].map((unit, i) => (
                <div key={i} className="flex flex-col items-center">
                    <div className="text-5xl md:text-7xl font-display text-brand-cinemaGold tabular-nums tracking-wider drop-shadow-[0_0_30px_rgba(240,192,64,0.3)]">
                        {unit.value.toString().padStart(2, '0')}
                    </div>
                    <span className="text-[10px] font-display text-brand-softLavender/40 tracking-[0.3em] uppercase mt-2">{unit.label}</span>
                </div>
            ))}
        </div>
    );
}

export function CinemaClient({ locale }: CinemaClientProps) {
    const { data: session } = useSession();
    const { toast } = useToast();
    const t = (key: any) => getTranslation(key, locale);
    const dfnsLocale = locale === 'bg' ? bgLocale : enUS;

    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [activeViewers, setActiveViewers] = useState(0);
    const [currentMovie, setCurrentMovie] = useState<any>(null);
    const [nextMovie, setNextMovie] = useState<any>(null);
    const [schedule, setSchedule] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [popcornBalance, setPopcornBalance] = useState(0);
    const [viewers, setViewers] = useState<any[]>([]);
    const [playbackOffset, setPlaybackOffset] = useState(0);
    const [cinemaVideoUrl, setCinemaVideoUrl] = useState<string | null>(null);
    const [giftingTo, setGiftingTo] = useState<any>(null);
    const [activeGift, setActiveGift] = useState<GiftPayload | null>(null);
    const [isCinemaLive, setIsCinemaLive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [showViewersModal, setShowViewersModal] = useState(false);
    const [reactions, setReactions] = useState<{ id: number; emoji: string; x: number }[]>([]);
    const [giftLeaderboard, setGiftLeaderboard] = useState<Record<string, { name: string; amount: number; image?: string }>>({});
    const scrollRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // ─── WebSocket: Real-time events ────────────────────────────────────────────
    const { connectionState, sendReaction } = useCinemaWS({
        onCinemaSync: useCallback((payload: any) => {
            setPlaybackOffset(payload.offsetSeconds);
            setIsCinemaLive(payload.isLive);
            setIsPaused(payload.isPaused);
            if (payload.viewerCount !== undefined) setActiveViewers(payload.viewerCount);
            if (payload.viewers) {
                const sortedViewers = [...payload.viewers].sort((a, b) => (a.id || 0) - (b.id || 0));
                setViewers(sortedViewers);
            }
            if (payload.isLive && !currentMovie && !loading) {
                fetchCinemaData();
            }
        }, [currentMovie, loading]),

        onCinemaState: useCallback((payload: any) => {
            setIsCinemaLive(payload.isLive);
            setIsPaused(payload.isPaused || false);
            if (!payload.isLive) {
                setCurrentMovie(null);
                setCinemaVideoUrl(null);
                setPlaybackOffset(0);
            }
            fetchCinemaData();
        }, []),

        onChatMessage: useCallback((msg: any) => {
            setMessages(prev => {
                const newMessages = [...prev, msg];
                return newMessages.length > 50 ? newMessages.slice(newMessages.length - 50) : newMessages;
            });
        }, []),

        onGiftReceived: useCallback((payload: any) => {
            setActiveGift(payload);
            const brutalGifts = ['Пръстен 💍', 'Суперкола 🏎️', 'Хеликоптер 🚁', 'Ring 💍', 'Supercar 🏎️', 'Helicopter 🚁'];
            const isBrutal = brutalGifts.includes(payload.giftType);
            setTimeout(() => setActiveGift(null), isBrutal ? 6000 : 4000);

            if (payload.from && payload.amount) {
                setGiftLeaderboard(prev => {
                    const current = prev[payload.from.name] || { name: payload.from.name, amount: 0, image: payload.from.image };
                    return {
                        ...prev,
                        [payload.from.name]: {
                            ...current,
                            amount: current.amount + payload.amount,
                            image: payload.from.image || current.image
                        }
                    };
                });
            }
        }, []),

        onCinemaReaction: useCallback((payload: { emoji: string }) => {
            const id = Date.now() + Math.random();
            const x = Math.floor(Math.random() * 80) - 40;
            setReactions(prev => [...prev.slice(-30), { id, emoji: payload.emoji, x }]);
            setTimeout(() => {
                setReactions(prev => prev.filter(r => r.id !== id));
            }, 3000);
        }, []),

        onPresenceUpdate: useCallback((payload: any) => {
            const sortedViewers = [...payload.viewers].sort((a, b) => (a.id || 0) - (b.id || 0));
            setViewers(sortedViewers);
            setActiveViewers(payload.count);
        }, []),
    });

    useEffect(() => {
        fetchCinemaData();
        fetchMessages();

        // Presence heartbeat
        const heartbeat = setInterval(async () => {
            console.log('[CINEMA-WS] Heartbeat check. Session:', !!session);
            if (session) {
                try {
                    console.log('[CINEMA-WS] Sending heartbeat...');
                    const res = await fetch('/api/cinema/heartbeat', { method: 'POST' });
                    console.log('[CINEMA-WS] Heartbeat status:', res.status);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.viewers) {
                            const sortedViewers = [...data.viewers].sort((a, b) => (a.id || 0) - (b.id || 0));
                            setViewers(sortedViewers);
                            setActiveViewers(data.viewers.length);
                        }
                    }
                } catch (e) {
                    console.error('[CINEMA-WS] Heartbeat fetch failed:', e);
                }
            }
        }, 15000);

        const scheduleInterval = setInterval(fetchCinemaData, 30000);
        return () => {
            clearInterval(heartbeat);
            clearInterval(scheduleInterval);
        };
    }, [session]);

    useEffect(() => {
        if (session) fetchBalance();
    }, [session]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    async function fetchBalance() {
        try {
            const res = await fetch('/api/user/popcorn');
            if (res.ok) {
                const data = await res.json();
                setPopcornBalance(data.balance);
            }
        } catch (error) { }
    }

    async function fetchCinemaData() {
        try {
            const res = await fetch(`/api/cinema/status?t=${Date.now()}`);
            if (res.ok) {
                const data = await res.json();
                setCurrentMovie(data.currentMovie);
                setNextMovie(data.nextMovie);
                setSchedule(data.schedule);
                setPlaybackOffset(data.playbackOffset || 0);
                setCinemaVideoUrl(data.cinemaVideoUrl || null);
                if (data.activeViewers !== undefined) setActiveViewers(data.activeViewers);
                if (data.viewers) setViewers(data.viewers);
            }
        } catch (error) {
            console.error('Cinema status error');
        } finally {
            setLoading(false);
        }
    }

    async function fetchMessages() {
        try {
            const res = await fetch('/api/cinema/chat');
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            }
        } catch (error) { }
    }

    async function handleSendMessage(e: React.FormEvent) {
        e.preventDefault();
        if (!session) {
            toast({ title: t('cinema_loginRequired'), description: t('cinema_loginToChat') });
            return;
        }
        if (!newMessage.trim()) return;

        const content = newMessage;
        setNewMessage('');

        try {
            const res = await fetch('/api/cinema/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content }),
            });
            if (res.ok) fetchMessages();
        } catch (error) {
            toast({ title: 'Error', variant: 'destructive' });
        }
    }

    async function sendGift(type: string, amount: number) {
        if (!session || !giftingTo) return;
        if (popcornBalance < amount) {
            toast({ title: t('cinema_notEnoughPopcorn'), variant: 'destructive' });
            return;
        }
        try {
            const res = await fetch('/api/cinema/gifts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, amount, receiverId: giftingTo.id }),
            });
            if (res.ok) {
                toast({ title: t('cinema_giftSent') });
                fetchMessages();
                fetchBalance();
                setGiftingTo(null);
            } else {
                const data = await res.json();
                toast({ title: 'Error', description: data.message || t('cinema_giftFailed'), variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Error', description: t('cinema_problemSending'), variant: 'destructive' });
        }
    }

    const handleMovieEnd = useCallback(async () => {
        if (!currentMovie?.id) return;
        try {
            await fetch('/api/cinema/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ scheduleId: currentMovie.id }),
            });
            setCurrentMovie(null);
            setCinemaVideoUrl(null);
            fetchCinemaData();
        } catch (error) {
            console.error('Failed to terminate movie');
        }
    }, [currentMovie]);

    if (loading) {
        return (
            <div className="container py-20 text-center">
                <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="mt-4 text-muted-foreground uppercase font-black tracking-widest italic animate-pulse">{t('cinema_loading')}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-midnight text-brand-warmCream">
            <div className="container py-6 lg:py-10 grid grid-cols-1 lg:grid-cols-4 gap-6 xl:gap-8 max-w-[1920px] mx-auto">
                {/* ── Main Screen (Player Area) ── */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="relative aspect-video bg-brand-deepNight rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-brand-royalPurple/30 group ring-1 ring-white/5">
                        {currentMovie ? (
                            <div className="w-full h-full">
                                <VideoPlayer
                                    movieId={currentMovie.movie.id}
                                    videoUrl={cinemaVideoUrl || undefined}
                                    playbackOffset={playbackOffset}
                                    isPaused={isPaused}
                                    isCinemaMode={true}
                                    onEnded={handleMovieEnd}
                                />
                                <div className="absolute top-8 left-8 pointer-events-none transition-transform group-hover:translate-x-1 z-30">
                                    <div className="bg-brand-playRed text-white border-0 font-display uppercase tracking-widest px-6 py-2 rounded-2xl animate-pulse shadow-[0_0_30px_rgba(229,57,53,0.6)] flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                        {t('cinema_live')}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-brand-deepNight relative overflow-hidden">
                                {nextMovie?.movie.posterUrl && (
                                    <div
                                        className="absolute inset-0 opacity-10 blur-[100px] scale-110 pointer-events-none"
                                        style={{ backgroundImage: `url(${nextMovie.movie.posterUrl})`, backgroundSize: 'cover' }}
                                    />
                                )}

                                {/* Host Backdrop Decor */}
                                <div className="absolute -bottom-20 -right-20 opacity-5 scale-150 rotate-12">
                                    <img src="/brand/couchoo-icon-512.png" alt="" className="w-[800px] h-[800px]" />
                                </div>

                                <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
                                    <div className="mb-10 p-10 rounded-[3rem] bg-brand-midnight/50 border border-brand-royalPurple/30 backdrop-blur-2xl shadow-2xl animate-in fade-in zoom-in duration-1000">
                                        <div className="flex items-center gap-4 mb-6 justify-center">
                                            <img src="/brand/couchoo-icon-32.png" className="w-6 h-6 animate-bounce" alt="" />
                                            <span className="text-[12px] font-display uppercase tracking-[0.4em] text-brand-cinemaGold">{t('cinema_nextShowing')}</span>
                                        </div>

                                        {nextMovie && differenceInSeconds(new Date(nextMovie.startTime), new Date()) <= 86400 ? (
                                            <>
                                                <CountdownTimer targetDate={new Date(nextMovie.startTime)} locale={locale} />
                                                <div className="mt-10 flex items-center gap-6 text-left p-6 rounded-[2rem] bg-brand-royalPurple/10 border border-brand-royalPurple/20 animate-in slide-in-from-bottom-8 duration-700 hover:bg-brand-royalPurple/20 transition-all cursor-pointer group/card shadow-2xl">
                                                    <div className="w-20 h-30 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-brand-royalPurple/30 transition-transform group-hover/card:scale-105 group-hover/card:-rotate-2">
                                                        <img src={nextMovie.movie.posterUrl} className="w-full h-full object-cover" alt="Poster" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[10px] text-brand-cinemaGold font-display uppercase tracking-widest mb-1">{t('cinema_nextShowing')}</p>
                                                        <h3 className="text-3xl font-display tracking-wider text-white leading-tight truncate group-hover/card:text-brand-cinemaGold transition-colors">
                                                            {locale === 'en' ? (nextMovie.movie.titleEN || nextMovie.movie.titleBG) : nextMovie.movie.titleBG}
                                                        </h3>
                                                        <div className="flex items-center gap-4 mt-3">
                                                            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-brand-midnight/60 border border-brand-royalPurple/20">
                                                                <Clock className="w-3.5 h-3.5 text-brand-cinemaGold" />
                                                                <span className="text-[11px] font-display uppercase tracking-widest text-brand-softLavender">{nextMovie.movie.duration} {t('minutes')}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-brand-playRed/20 border border-brand-playRed/30">
                                                                <Play className="w-3.5 h-3.5 text-brand-playRed fill-current" />
                                                                <span className="text-[11px] font-display uppercase tracking-widest text-white">{format(new Date(nextMovie.startTime), 'HH:mm')}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="py-12 space-y-6">
                                                <img src="/brand/couchoo-mascot-transparent.png" className="w-24 h-24 mx-auto opacity-30 invert" alt="" />
                                                <div>
                                                    <h2 className="text-3xl font-display uppercase tracking-widest mb-2 text-brand-softLavender/30">{t('cinema_noShowings')}</h2>
                                                    <p className="text-brand-softLavender/20 text-[11px] uppercase font-display tracking-[0.3em]">{t('cinema_adminWillAdd')}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-6 text-brand-softLavender/20">
                                        <div className="h-[1px] w-16 bg-brand-royalPurple/20" />
                                        <p className="text-[11px] font-display tracking-[0.4em] uppercase">Your Cinema. Your Couch. Your Chouchoo.</p>
                                        <div className="h-[1px] w-16 bg-brand-royalPurple/20" />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-midnight via-transparent to-transparent pointer-events-none opacity-80" />
                    </div>
                </div>

                {/* ── Chat Column ── */}
                <div className="flex flex-col h-[500px] lg:h-0 lg:min-h-full rounded-[3rem] bg-brand-deepNight/40 border border-brand-royalPurple/20 backdrop-blur-xl overflow-hidden relative lg:row-span-1 shadow-2xl">
                    <div className="p-8 border-b border-brand-royalPurple/20 flex items-center justify-between bg-brand-royalPurple/10">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-brand-cinemaGold/10 text-brand-cinemaGold shadow-lg shadow-brand-cinemaGold/5"><MessageSquare className="w-6 h-6" /></div>
                            <div>
                                <h3 className="text-xl font-display tracking-widest text-brand-warmCream uppercase">{t('cinema_liveChat')}</h3>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <p className="text-[9px] text-brand-softLavender/60 uppercase font-display tracking-[0.2em] whitespace-nowrap">{t('cinema_topGifters')}:</p>
                                    <div className="flex -space-x-2 items-center">
                                        {Object.values(giftLeaderboard)
                                            .sort((a, b) => b.amount - a.amount)
                                            .slice(0, 3)
                                            .map((entry, idx) => (
                                                <div key={entry.name} className="relative group/leader">
                                                    <Avatar className={`h-6 w-6 border-2 border-brand-midnight ring-2 ${idx === 0 ? 'ring-brand-cinemaGold' : idx === 1 ? 'ring-zinc-400' : 'ring-brand-playRed'}`}>
                                                        <AvatarImage src={entry.image} />
                                                        <AvatarFallback className="text-[8px] font-display">{entry.name[0]}</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                            ))
                                        }
                                        {Object.keys(giftLeaderboard).length === 0 && (
                                            <span className="text-[9px] text-brand-softLavender/20 font-display italic ml-1">{t('cinema_noGifts')}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Users className="w-5 h-5 text-brand-softLavender/40" />
                    </div>

                    <div className="flex-1 p-6 overflow-hidden flex flex-col relative">
                        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                            <style>{`
                                @keyframes popcorn-float {
                                    0% { transform: translateY(0) scale(0.5); opacity: 0; }
                                    10% { opacity: 1; transform: translateY(-20px) scale(1.2); }
                                    100% { transform: translateY(-400px) scale(1); opacity: 0; }
                                }
                                .animate-popcorn {
                                    animation: popcorn-float 2.5s ease-out forwards;
                                }
                            `}</style>
                            {reactions.map(r => (
                                <div
                                    key={r.id}
                                    className="absolute bottom-10 right-10 text-4xl animate-popcorn"
                                    style={{ right: `${40 + r.x}px` }}
                                >
                                    {r.emoji}
                                </div>
                            ))}
                        </div>

                        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
                            <div className="space-y-6">
                                {messages.map((msg, i) => {
                                    const isAdmin = msg.user?.role === 'ADMIN' || msg.user?.role === 'SUPER_ADMIN';
                                    const isVIP = msg.user?.role === 'VIP';

                                    return (
                                        <div key={i} className={`flex gap-4 group animate-in fade-in slide-in-from-bottom-2 p-3 rounded-3xl transition-all ${isAdmin ? 'bg-brand-playRed/5 border border-brand-playRed/10 shadow-[0_0_20px_rgba(229,57,53,0.05)]' :
                                            isVIP ? 'bg-brand-cinemaGold/5 border border-brand-cinemaGold/10 shadow-[0_0_20px_rgba(240,192,64,0.05)]' :
                                                'hover:bg-white/5'
                                            }`}>
                                            <Avatar
                                                className={`h-11 w-11 shrink-0 ring-2 cursor-pointer hover:ring-brand-cinemaGold/50 transition-all ${isAdmin ? 'ring-brand-playRed/30' :
                                                    isVIP ? 'ring-brand-cinemaGold/30' : 'ring-white/5'
                                                    }`}
                                                onClick={() => msg.user && setGiftingTo(msg.user)}
                                            >
                                                <AvatarImage src={msg.user?.image} />
                                                <AvatarFallback className="bg-brand-royalPurple text-[11px] font-display uppercase">{msg.user?.name?.[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-2 flex-1 min-w-0">
                                                <div className="flex items-baseline gap-3">
                                                    <span
                                                        onClick={() => msg.user && setGiftingTo(msg.user)}
                                                        className={`text-[12px] font-display tracking-widest uppercase cursor-pointer hover:text-brand-cinemaGold transition-all duration-300 ${isAdmin ? 'text-brand-playRed' :
                                                            isVIP ? 'text-brand-cinemaGold' : 'text-brand-softLavender'
                                                            }`}
                                                    >
                                                        {msg.user?.name || 'User'}
                                                    </span>
                                                    <span className="text-[9px] text-brand-softLavender/20 font-display tracking-widest">{format(new Date(msg.createdAt), 'HH:mm')}</span>
                                                </div>
                                                {msg.type === 'gift' ? (
                                                    <div className="p-4 rounded-2xl bg-brand-cinemaGold/10 border border-brand-cinemaGold/20 flex items-center gap-4 shadow-[0_0_30px_rgba(240,192,64,0.1)]">
                                                        <div className="h-10 w-10 rounded-full bg-brand-cinemaGold flex items-center justify-center text-brand-midnight shadow-lg">
                                                            <Gift className="w-5 h-5" />
                                                        </div>
                                                        <p className="text-[13px] font-display tracking-widest text-white italic">
                                                            {t('cinema_sent')} <span className="text-brand-cinemaGold uppercase">{msg.content}</span>
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p className={`text-[14px] leading-relaxed font-body font-medium break-words ${isAdmin ? 'text-white' : 'text-brand-warmCream/90'
                                                        }`}>{msg.content}</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    </div>

                    <div className="p-8 bg-brand-royalPurple/5 border-t border-brand-royalPurple/20 space-y-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-brand-cinemaGold/10"><Star className="w-4 h-4 fill-brand-cinemaGold text-brand-cinemaGold" /></div>
                                <span className="text-[12px] font-display tracking-[0.2em] uppercase text-brand-cinemaGold">{popcornBalance} {t('cinema_popcorn')}</span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => router.push('/shop')} className="h-8 text-[10px] font-display tracking-widest uppercase bg-brand-royalPurple/20 hover:bg-brand-cinemaGold hover:text-brand-midnight rounded-xl transition-all">
                                {t('cinema_shop')}
                            </Button>
                        </div>
                        <form onSubmit={handleSendMessage} className="relative group">
                            <div className="relative flex gap-3">
                                <Input
                                    placeholder={t('cinema_typeSomething')}
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="bg-brand-midnight/40 border-brand-royalPurple/30 focus:border-brand-cinemaGold/50 transition-all rounded-2xl h-14 pr-14 font-body text-brand-warmCream selection:bg-brand-cinemaGold/30"
                                />
                                <div className="absolute right-16 top-1/2 -translate-y-1/2 z-10">
                                    <button
                                        type="button"
                                        onClick={() => sendReaction('🍿')}
                                        className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-brand-royalPurple/20 transition-all active:scale-90 text-2xl grayscale hover:grayscale-0"
                                    >
                                        🍿
                                    </button>
                                </div>
                                <Button type="submit" size="icon" className="h-14 w-14 rounded-2xl shrink-0 bg-brand-cinemaGold hover:bg-brand-deepGold text-brand-midnight shadow-xl shadow-brand-cinemaGold/10 transition-transform active:scale-95">
                                    <Send className="w-5 h-5" />
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* ── Profile Popup ── */}
                    {giftingTo && (
                        <div
                            className="absolute inset-0 bg-brand-midnight/90 backdrop-blur-xl z-50 flex items-end animate-in slide-in-from-bottom-full duration-500"
                            onClick={(e) => { if (e.target === e.currentTarget) setGiftingTo(null); }}
                        >
                            <div className="w-full bg-brand-deepNight/95 rounded-t-[3.5rem] border-t border-brand-royalPurple/20 p-10 space-y-8 shadow-2xl relative overflow-hidden">
                                {/* Decorative Host */}
                                <img src="/brand/couchoo-mascot-transparent.png" className="absolute -top-10 -left-10 w-40 h-40 opacity-5 -rotate-12" alt="" />

                                <div className="flex justify-between items-start relative z-10">
                                    <div className="flex items-center gap-6">
                                        <Avatar className="h-20 w-20 border-4 border-brand-midnight ring-4 ring-brand-cinemaGold/20 shadow-2xl">
                                            <AvatarImage src={giftingTo.image} />
                                            <AvatarFallback className="bg-brand-royalPurple text-2xl font-display uppercase">{giftingTo.name?.[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h2 className={`text-3xl font-display tracking-widest uppercase ${giftingTo.role === 'ADMIN' || giftingTo.role === 'SUPER_ADMIN' ? 'text-brand-playRed' :
                                                giftingTo.role === 'VIP' ? 'text-brand-cinemaGold' : 'text-brand-warmCream'
                                                }`}>{giftingTo.name}</h2>
                                            <p className="text-[11px] text-brand-softLavender/40 uppercase font-display tracking-[0.3em] mt-1">{giftingTo.role || 'User'}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setGiftingTo(null)} className="rounded-2xl hover:bg-brand-royalPurple/20 w-12 h-12">
                                        <X className="w-6 h-6" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-4 gap-4 pb-4 relative z-10">
                                    {[
                                        { type: t('cinema_juice') + ' 🥤', amount: 50 },
                                        { type: t('cinema_popcorn') + ' 🍿', amount: 100 },
                                        { type: t('cinema_rose') + ' 🌹', amount: 500 },
                                        { type: t('cinema_chocolate') + ' 🍫', amount: 1000 },
                                        { type: t('cinema_ring') + ' 💍', amount: 5000 },
                                        { type: t('cinema_supercar') + ' 🏎️', amount: 15000 },
                                        { type: t('cinema_helicopter') + ' 🚁', amount: 30000 },
                                    ].map((gift) => (
                                        <button
                                            key={gift.type}
                                            onClick={() => sendGift(gift.type, gift.amount)}
                                            className="group relative flex flex-col items-center p-5 rounded-[2.5rem] bg-brand-midnight/40 border border-brand-royalPurple/20 hover:border-brand-cinemaGold/40 hover:bg-brand-royalPurple/10 transition-all active:scale-95 shadow-lg"
                                        >
                                            <div className="text-4xl mb-3 transition-transform group-hover:scale-110 drop-shadow-lg">{gift.type.split(' ')[1]}</div>
                                            <div className="text-[10px] font-display tracking-widest uppercase text-brand-softLavender/60 mb-1.5">{gift.type.split(' ')[0]}</div>
                                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cinemaGold/10">
                                                <Star className="w-3 h-3 fill-brand-cinemaGold text-brand-cinemaGold" />
                                                <span className="text-[11px] font-display tracking-widest text-brand-cinemaGold">{gift.amount}</span>
                                            </div>
                                            {popcornBalance < gift.amount && (
                                                <div className="absolute inset-0 bg-brand-midnight/60 flex items-center justify-center backdrop-blur-[2px] rounded-[2.5rem]">
                                                    <Clock className="w-7 h-7 text-white/20" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Movie Info Area (Row 2) ── */}
                <div className="lg:col-span-3">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 p-10 rounded-[3rem] bg-brand-deepNight/40 border border-brand-royalPurple/20 backdrop-blur-xl shadow-2xl">
                        <div className="space-y-3 flex-1">
                            {currentMovie ? (
                                <>
                                    <h1 className="text-4xl md:text-5xl font-display tracking-widest text-brand-warmCream uppercase">
                                        {locale === 'en' ? (currentMovie.movie.titleEN || currentMovie.movie.titleBG) : currentMovie.movie.titleBG}
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm font-display tracking-widest">
                                        <span className="px-3 py-1 bg-brand-cinemaGold/10 text-brand-cinemaGold rounded-xl border border-brand-cinemaGold/20 uppercase">{currentMovie.movie.quality || '4K'}</span>
                                        <span className="text-brand-softLavender">{currentMovie.movie.year}</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-royalPurple/40" />
                                        <span className="text-brand-softLavender uppercase">{currentMovie.movie.duration} {t('minutes')}</span>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center gap-4 py-2">
                                    <img src="/brand/couchoo-icon-32.png" className="w-10 h-10 object-contain grayscale opacity-20" alt="" />
                                    <h1 className="text-3xl font-display tracking-[0.2em] text-brand-softLavender/20 uppercase">{t('cinema_noActiveMovie')}</h1>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex -space-x-4 items-center cursor-pointer group/pres" onClick={() => setShowViewersModal(true)}>
                                {viewers.slice(0, 5).map((viewer, i) => (
                                    <Avatar key={viewer.id || i} className="h-12 w-12 border-4 border-brand-midnight ring-2 ring-brand-royalPurple/20 shadow-2xl transition-all group-hover/pres:scale-110 group-hover/pres:z-10 group-hover/pres:ring-brand-cinemaGold/40">
                                        <AvatarImage src={viewer.image} />
                                        <AvatarFallback className="bg-brand-royalPurple text-xs font-display">{viewer.name?.[0] || '?'}</AvatarFallback>
                                    </Avatar>
                                ))}

                                <div className={`h-12 px-6 rounded-2xl border-2 ring-2 transition-all duration-700 shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center text-xs font-display tracking-widest ml-6 ${isCinemaLive
                                    ? 'bg-brand-playRed/10 border-brand-playRed/30 text-white ring-brand-playRed/10'
                                    : 'bg-brand-royalPurple/10 border-brand-royalPurple/20 text-brand-softLavender/40 ring-brand-royalPurple/5'
                                    }`}>
                                    <span className={`w-2 h-2 rounded-full mr-3 ${isCinemaLive ? 'bg-brand-playRed animate-pulse' : 'bg-brand-softLavender/20'}`} />
                                    <span className="mr-1.5">{activeViewers}</span> {isCinemaLive ? t('cinema_watching') : t('cinema_waiting')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container pb-20 mt-12">
                <div className="p-8 rounded-[3rem] bg-zinc-900/40 border border-white/5 backdrop-blur-md">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-2.5 rounded-2xl bg-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]"><Calendar className="w-6 h-6 text-black" /></div>
                        <div>
                            <h2 className="text-2xl font-black uppercase italic tracking-tighter">{t('cinema_todaySchedule')}</h2>
                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{t('cinema_cinemaPoster')}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {schedule
                            .filter((item) => new Date(item.endTime).getTime() >= Date.now())
                            .map((item, i) => {
                                const isLive = currentMovie?.id === item.id;
                                return (
                                    <div key={i} className={`group relative p-8 rounded-[2.5rem] border transition-all duration-700 ${isLive
                                        ? 'bg-brand-cinemaGold/10 border-brand-cinemaGold/40 shadow-2xl shadow-brand-cinemaGold/5'
                                        : 'bg-brand-midnight/40 border-brand-royalPurple/20 hover:border-brand-cinemaGold/40 hover:bg-brand-royalPurple/10'}`}>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] font-display tracking-widest text-brand-softLavender/60">{format(new Date(item.startTime), 'HH:mm')} - {format(new Date(item.endTime), 'HH:mm')}</span>
                                            {isLive && (
                                                <span className="text-[10px] font-display tracking-widest text-brand-playRed animate-pulse flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-brand-playRed rounded-full shadow-[0_0_8px_rgba(229,57,53,0.8)]" />
                                                    {t('live')}
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="text-xl font-display tracking-widest text-brand-warmCream uppercase leading-tight group-hover:text-brand-cinemaGold transition-colors line-clamp-2">
                                            {locale === 'en' ? (item.movie.titleEN || item.movie.titleBG) : item.movie.titleBG}
                                        </h4>
                                    </div>
                                );
                            })
                        }
                        {schedule.filter((item) => new Date(item.endTime).getTime() >= Date.now()).length === 0 && (
                            <div className="col-span-full text-center py-12 text-white/20">
                                <p className="font-black uppercase italic tracking-widest text-sm">{t('cinema_noUpcomingShowings')}</p>
                            </div>
                        )}
                    </div>
                </div>

                <UltimateGiftOverlay
                    gift={activeGift}
                    currentUserId={session?.user ? parseInt((session.user as any).id) : undefined}
                    locale={locale}
                />

                {showViewersModal && (
                    <div
                        className="fixed inset-0 bg-brand-midnight/90 backdrop-blur-2xl z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500"
                        onClick={(e) => { if (e.target === e.currentTarget) setShowViewersModal(false); }}
                    >
                        <div className="w-full max-w-xl bg-brand-deepNight/90 rounded-[3.5rem] border border-brand-royalPurple/20 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] relative text-brand-warmCream">
                            <div className="p-10 border-b border-brand-royalPurple/20 flex justify-between items-center bg-brand-royalPurple/10">
                                <div className="flex items-center gap-5">
                                    <div className="p-4 rounded-[1.5rem] bg-brand-cinemaGold/10 text-brand-cinemaGold shadow-lg shadow-brand-cinemaGold/5">
                                        <Users className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-display tracking-widest uppercase">{t('cinema_viewersInHall')}</h2>
                                        <p className="text-[11px] text-brand-softLavender/60 uppercase font-display tracking-[0.2em] mt-1">
                                            <span className="text-brand-cinemaGold mr-2">{activeViewers}</span> {t('cinema_peopleTotal')}
                                        </p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setShowViewersModal(false)} className="rounded-2xl hover:bg-brand-royalPurple/20 w-12 h-12 transition-all">
                                    <X className="w-6 h-6" />
                                </Button>
                            </div>

                            <ScrollArea className="flex-1 p-6">
                                <div className="space-y-3">
                                    {viewers.map((viewer, i) => (
                                        <div
                                            key={viewer.id || i}
                                            onClick={() => {
                                                setGiftingTo(viewer);
                                                setShowViewersModal(false);
                                            }}
                                            className="flex items-center justify-between p-5 rounded-[2rem] hover:bg-white/5 transition-all group cursor-pointer border border-transparent hover:border-brand-royalPurple/20 shadow-sm hover:shadow-xl"
                                        >
                                            <div className="flex items-center gap-5">
                                                <Avatar className="h-14 w-14 border-4 border-brand-midnight group-hover:ring-4 group-hover:ring-brand-cinemaGold/20 transition-all">
                                                    <AvatarImage src={viewer.image} />
                                                    <AvatarFallback className="bg-brand-royalPurple text-sm font-display uppercase">{viewer.name?.[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h4 className={`text-lg font-display tracking-widest uppercase transition-colors ${viewer.role === 'ADMIN' || viewer.role === 'SUPER_ADMIN' ? 'text-brand-playRed' :
                                                        viewer.role === 'VIP' ? 'text-brand-cinemaGold' : 'text-white'
                                                        }`}>{viewer.name}</h4>
                                                    <p className="text-[10px] text-brand-softLavender/40 uppercase font-display tracking-[0.2em] mt-0.5">{viewer.role || 'User'}</p>
                                                </div>
                                            </div>
                                            <Button size="sm" variant="ghost" className="rounded-xl opacity-0 group-hover:opacity-100 transition-all bg-brand-cinemaGold/10 text-brand-cinemaGold hover:bg-brand-cinemaGold hover:text-brand-midnight font-display uppercase tracking-widest text-[10px] px-6 h-9">
                                                {t('cinema_gift')} 🎁
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
