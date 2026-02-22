'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
    Play,
    Pause,
    RefreshCw,
    AlertCircle,
    CheckCircle2,
    Search,
    ChevronRight,
    ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LinkTesterPanel() {
    const [status, setStatus] = useState<'IDLE' | 'RUNNING' | 'PAUSED' | 'FINISHED' | 'ERROR'>('IDLE');
    const [provider, setProvider] = useState<string>('');
    const [progress, setProgress] = useState(0);
    const [processed, setProcessed] = useState(0);
    const [brokenCount, setBrokenCount] = useState(0);
    const [brokenMovies, setBrokenMovies] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);
    const { toast } = useToast();

    const startScan = async (newScan = false) => {
        if (newScan) {
            setOffset(0);
            setProcessed(0);
            setBrokenCount(0);
            setBrokenMovies([]);
            setProgress(0);
        }

        setStatus('RUNNING');
        runBatch(newScan ? 0 : offset);
    };

    const runBatch = async (currentOffset: number) => {
        if (status === 'PAUSED') return;

        try {
            const res = await fetch('/api/admin/status/check-links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    provider: provider || undefined,
                    limit: 20,
                    offset: currentOffset
                })
            });

            if (!res.ok) throw new Error('Failed to run scan batch');

            const data = await res.json();

            if (data.done || (data.results && data.results.length === 0)) {
                setStatus('FINISHED');
                const totalProcessed = processed + (data.processed || 0);
                toast({
                    title: 'Scan Finished',
                    description: `Processed ${totalProcessed} movies.`
                });
                return;
            }

            // Update stats
            const newlyBroken = data.results.filter((r: any) => r.status === 'BROKEN');
            setBrokenCount(prev => prev + newlyBroken.length);
            setBrokenMovies(prev => [...prev, ...newlyBroken]);
            setProcessed(prev => prev + data.processed);
            setOffset(data.nextOffset);

            // Simple progress simulation (total count isn't fixed, but we show motion)
            setProgress(prev => Math.min(prev + 5, 95));

            // Continue if still running
            setTimeout(() => runBatch(data.nextOffset), 500);
        } catch (error: any) {
            setStatus('ERROR');
            toast({ title: 'Scan Error', description: error.message, variant: 'destructive' });
        }
    };

    const togglePause = () => {
        if (status === 'RUNNING') setStatus('PAUSED');
        else if (status === 'PAUSED') {
            setStatus('RUNNING');
            runBatch(offset);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Bulk Link Tester</h2>
                    <p className="text-muted-foreground italic">Автоматично тестване на видео сървърите за счупени линкове.</p>
                </div>
                <div className="flex gap-2">
                    <select
                        className="bg-secondary text-sm rounded-md px-3 py-2 outline-none border-none ring-1 ring-white/10"
                        value={provider}
                        onChange={(e) => setProvider(e.target.value)}
                        disabled={status === 'RUNNING'}
                    >
                        <option value="">Всички доставчици</option>
                        <option value="2embed">2embed</option>
                        <option value="Embedsu">Embedsu</option>
                        <option value="MoviesAPI">MoviesAPI</option>
                        <option value="Vidsrc">Vidsrc</option>
                    </select>

                    {status === 'IDLE' || status === 'FINISHED' || status === 'ERROR' ? (
                        <Button onClick={() => startScan(true)} className="bg-primary hover:bg-primary/80">
                            <Play className="h-4 w-4 mr-2" />
                            Започни сканиране
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={togglePause}>
                                {status === 'PAUSED' ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
                                {status === 'PAUSED' ? 'Продължи' : 'Пауза'}
                            </Button>
                            <Button variant="destructive" onClick={() => setStatus('IDLE')}>
                                Спри
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Progress Card */}
            {(status !== 'IDLE') && (
                <Card className="border-secondary bg-secondary/10">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                {status === 'RUNNING' && <RefreshCw className="h-5 w-5 text-primary animate-spin" />}
                                {status === 'FINISHED' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                                {status === 'ERROR' && <AlertCircle className="h-5 w-5 text-destructive" />}
                                <span className="font-bold">
                                    {status === 'RUNNING' ? 'Сканиране в реално време...' :
                                        status === 'PAUSED' ? 'Сканирането е на пауза' :
                                            status === 'FINISHED' ? 'Сканирането завърши' : 'Възникна грешка'}
                                </span>
                            </div>
                            <Badge variant="outline" className="font-mono">
                                {processed} проверени
                            </Badge>
                        </div>
                        <Progress value={status === 'FINISHED' ? 100 : progress} className="h-2" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <div className="bg-background/40 p-3 rounded-lg border border-white/5">
                                <p className="text-xs text-muted-foreground uppercase font-black">Проверени</p>
                                <p className="text-2xl font-bold">{processed}</p>
                            </div>
                            <div className="bg-background/40 p-3 rounded-lg border border-white/5">
                                <p className="text-xs text-muted-foreground uppercase font-black">Счупени</p>
                                <p className="text-2xl font-bold text-destructive">{brokenCount}</p>
                            </div>
                            <div className="bg-background/40 p-3 rounded-lg border border-white/5">
                                <p className="text-xs text-muted-foreground uppercase font-black">Успешни</p>
                                <p className="text-2xl font-bold text-green-500">{processed - brokenCount}</p>
                            </div>
                            <div className="bg-background/40 p-3 rounded-lg border border-white/5">
                                <p className="text-xs text-muted-foreground uppercase font-black">Остават</p>
                                <p className="text-2xl font-bold opacity-50">~</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Results List */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    Открити проблеми ({brokenCount})
                </h3>

                {brokenMovies.length > 0 ? (
                    <div className="grid gap-3">
                        {brokenMovies.map((movie) => (
                            <Card key={movie.id} className="border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-colors group">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                                            <AlertCircle className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold leading-none mb-1">{movie.title}</p>
                                            <p className="text-xs text-muted-foreground">ID: {movie.id} • Проверен на: {new Date(movie.checkedAt).toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant="destructive" className="animate-pulse">BROKEN</Badge>
                                        <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                                            <a href={`/movies/${movie.id}`} target="_blank">
                                                Редактирай <ExternalLink className="h-3 w-3 ml-2" />
                                            </a>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center border-2 border-dashed border-secondary rounded-xl bg-secondary/5">
                        <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                        <p className="text-muted-foreground italic">Все още няма открити счупени линкове.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
