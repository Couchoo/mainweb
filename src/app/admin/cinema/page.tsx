'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Play, Plus, Trash2, MonitorPlay, Film, Pause, CirclePlay } from 'lucide-react';
import { format, addHours, startOfHour } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useCinemaWS } from '@/hooks/use-cinema-ws';
import Link from 'next/link';
import { useCallback } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';

export default function CinemaAdminPage() {
    const [schedule, setSchedule] = useState<any[]>([]);
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
    const [startTimeStr, setStartTimeStr] = useState<string>(format(new Date(), 'HH:mm'));
    const [isPaused, setIsPaused] = useState(false);
    const { toast } = useToast();

    useCinemaWS({
        onCinemaSync: useCallback((payload: import('@/hooks/use-cinema-ws').CinemaSyncPayload) => {
            setIsPaused(payload.isPaused);
        }, [])
    });

    useEffect(() => {
        fetchSchedule();
        fetchMovies();
    }, [selectedDate]); // Re-fetch when date changes

    async function fetchSchedule() {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/cinema/schedule?date=${selectedDate}`);
            if (res.ok) {
                const data = await res.json();
                setSchedule(data || []);
            }
        } catch (e) {
            console.error('Fetch schedule error');
        } finally {
            setLoading(false);
        }
    }

    async function fetchMovies() {
        try {
            const res = await fetch('/api/admin/cinema/library');
            if (res.ok) {
                const data = await res.json();
                // Extract movie object from library entry and add library info
                const libraryMovies = data
                    .filter((entry: any) => entry.videoPath) // Only include movies with an uploaded MP4
                    .map((entry: any) => ({
                        ...entry.movie,
                        libraryId: entry.id,
                        videoPath: entry.videoPath
                    }));
                setMovies(libraryMovies);
            }
        } catch (e) {
            console.error('Fetch library error');
        }
    }

    async function addToSchedule(movie: any) {
        // Use the selected date and time
        const startDateTime = new Date(`${selectedDate}T${startTimeStr}:00`);
        const duration = movie.duration || 120;
        const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

        try {
            const res = await fetch('/api/admin/cinema/schedule', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    movieId: movie.id,
                    startTime: startDateTime,
                    endTime: endDateTime
                })
            });

            if (res.ok) {
                toast({ title: 'Добавено!', description: `${movie.titleBG} е добавен в графика.` });
                fetchSchedule();

                // Advance start time for next movie
                const nextStartTime = new Date(endDateTime.getTime() + 5 * 60000); // 5 min break
                setStartTimeStr(format(nextStartTime, 'HH:mm'));
            } else {
                const data = await res.json();
                toast({ title: 'Грешка', description: data.message || 'Неуспешно добавяне', variant: 'destructive' });
            }
        } catch (e) {
            toast({ title: 'Грешка', variant: 'destructive' });
        }
    }

    async function removeFromSchedule(id: number) {
        try {
            const res = await fetch(`/api/admin/cinema/schedule?id=${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                toast({ title: 'Премахнато' });
                fetchSchedule();
            }
        } catch (e) {
            toast({ title: 'Грешка', variant: 'destructive' });
        }
    }

    async function togglePause(pauseState: boolean) {
        try {
            const res = await fetch('/api/admin/cinema/pause', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isPaused: pauseState })
            });

            if (res.ok) {
                toast({ title: pauseState ? 'Паузирано!' : 'Възобновено!' });
            } else {
                toast({ title: 'Грешка при превключване', variant: 'destructive' });
            }
        } catch (e) {
            toast({ title: 'Грешка', variant: 'destructive' });
        }
    }

    const filteredMovies = movies.filter(m =>
        m.titleBG.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.titleEN.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter flex items-center gap-3">
                        <MonitorPlay className="w-10 h-10 text-primary" />
                        Управление на Киното
                    </h1>
                    <p className="text-muted-foreground uppercase text-xs font-black tracking-widest mt-1">Централен пулт за контрол на прожекциите</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button asChild variant="outline" className="gap-2 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                        <Link href="/admin/cinema/library">
                            <Film className="w-4 h-4" />
                            Кино Библиотека
                        </Link>
                    </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-md shadow-2xl">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-white/40 font-black uppercase tracking-widest ml-1">Дата</span>
                        <Input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-white/5 border-white/10 rounded-xl h-11 w-[160px] text-xs font-bold"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-white/40 font-black uppercase tracking-widest ml-1">Начален час</span>
                        <Input
                            type="time"
                            value={startTimeStr}
                            onChange={(e) => setStartTimeStr(e.target.value)}
                            className="bg-white/5 border-white/10 rounded-xl h-11 w-24 text-xs font-bold"
                        />
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="rounded-2xl h-14 px-8 shadow-2xl shadow-primary/20 gap-2 font-black uppercase tracking-tighter italic">
                                <Plus className="w-5 h-5" />
                                Планирай
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl bg-zinc-900 border-white/5 p-8 rounded-[2rem]">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Избери Филм за Програмата</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 pt-4">
                                <Input
                                    placeholder="Търси филм..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-white/5 border-white/10 rounded-xl h-12"
                                />
                                <div className="max-h-[400px] overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                                    {filteredMovies.map(movie => (
                                        <div key={movie.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group">
                                            <div className="flex items-center gap-4">
                                                {movie.posterUrl && (
                                                    <img src={movie.posterUrl} className="w-10 h-14 object-cover rounded-lg shadow-lg" />
                                                )}
                                                <div>
                                                    <h4 className="font-black uppercase italic tracking-tight text-sm leading-tight">{movie.titleBG}</h4>
                                                    <p className="text-[10px] text-muted-foreground font-bold">{movie.year} • {movie.duration} мин</p>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => addToSchedule(movie)}
                                                className="rounded-xl font-black uppercase tracking-tighter text-[10px]"
                                            >
                                                Избери
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Timeline / Schedule */}
                <Card className="lg:col-span-2 bg-zinc-900/50 border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl">
                    <CardHeader className="p-8 border-b border-white/5 bg-white/5">
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Програма за {format(new Date(selectedDate), 'dd.MM')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        {loading ? (
                            <div className="py-20 text-center animate-pulse">Зареждане...</div>
                        ) : schedule.length === 0 ? (
                            <div className="py-20 text-center text-muted-foreground italic">Програмата за този ден е празна</div>
                        ) : (
                            <div className="relative space-y-4">
                                {schedule.map((item, i) => {
                                    const isNow = new Date(item.startTime) <= new Date() && new Date(item.endTime) >= new Date();
                                    return (
                                        <div key={i} className={`flex items-center gap-6 p-6 rounded-3xl border transition-all ${isNow ? 'bg-primary/10 border-primary/30 ring-1 ring-primary/20' : 'bg-white/5 border-white/5'}`}>
                                            <div className="flex flex-col items-center justify-center min-w-[80px] py-3 px-4 rounded-2xl bg-black/40 border border-white/5">
                                                <span className="text-xs font-black text-primary">{format(new Date(item.startTime), 'HH:mm')}</span>
                                                <div className="h-4 w-[1px] bg-white/10 my-1" />
                                                <span className="text-[10px] font-bold text-white/40">{format(new Date(item.endTime), 'HH:mm')}</span>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-black uppercase italic tracking-tight truncate">{item.movie.titleBG}</h3>
                                                    {isNow && <Badge className="bg-primary text-black font-black uppercase tracking-tighter text-[8px] h-4">НА ЖИВО</Badge>}
                                                </div>
                                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-2">
                                                    <Clock className="w-3 h-3" />
                                                    {item.movie.duration} МИНУТИ
                                                </p>
                                            </div>

                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => removeFromSchedule(item.id)}
                                                className="text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-xl"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Status & Stats */}
                <div className="space-y-6">
                    <Card className="bg-zinc-900/50 border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl">
                        <CardHeader className="p-8 bg-primary/5 border-b border-primary/10">
                            <CardTitle className="text-xl font-black uppercase italic tracking-tighter">Статус</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">В момента се излъчва</p>
                                {schedule.find(s => new Date(s.startTime) <= new Date() && new Date(s.endTime) >= new Date()) ? (
                                    <div className="space-y-4">
                                        <div className="p-4 rounded-2xl bg-primary/20 border border-primary/20">
                                            <p className="font-black uppercase italic tracking-tight text-primary">Активна Прожекция</p>
                                        </div>
                                        <Button
                                            onClick={() => togglePause(!isPaused)}
                                            className={`w-full h-14 rounded-2xl font-black uppercase tracking-tighter italic gap-3 shadow-2xl transition-all ${isPaused
                                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
                                                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                                                }`}
                                        >
                                            {isPaused ? (
                                                <><CirclePlay className="w-6 h-6" /> Продължи</>
                                            ) : (
                                                <><Pause className="w-6 h-6" /> Пауза</>
                                            )}
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="p-4 rounded-2xl bg-zinc-800/50 border border-white/5 text-center">
                                        <p className="font-black uppercase italic tracking-tight text-white/40 italic">Няма сигнал</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl border-dashed">
                        <CardContent className="p-8 text-center space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto">
                                <Plus className="w-6 h-6 text-white/20" />
                            </div>
                            <div>
                                <h4 className="font-black uppercase italic tracking-tight text-white/40">Очаквайте</h4>
                                <p className="text-[10px] text-white/20 uppercase font-black tracking-widest">Автоматично планиране</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
