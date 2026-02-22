'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    TrendingUp,
    Database,
    Globe,
    Zap,
    AlertCircle,
    RefreshCw,
    Play,
    BarChart3,
    Loader2,
    Square,
    Film,
    Server,
    LayoutGrid
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SingleMovieImportPanel } from './SingleMovieImportPanel';
import { useCinemaWS } from '@/hooks/use-cinema-ws';

interface JobLog {
    id: number;
    jobId: string;
    level: 'info' | 'success' | 'error' | 'skip' | 'broken';
    message: string;
    metadata?: {
        imdbId?: string;
        posterUrl?: string;
    };
    createdAt: string;
}

interface JobProgress {
    id: string;
    type: 'import' | 'sync';
    status: string;
    progress: {
        total: number;
        processed: number;
        success: number;
        failed: number;
        skipped: number;
        noStream?: number;
        current: string;
    };
    logs: JobLog[];
}

interface ScraperStats {
    ourDatabase: {
        totalMovies: number;
        moviesWithTmdb: number;
        totalServers: number;
        recentImports: number;
    };
}

export function AdvancedScraperPanel() {
    const [stats, setStats] = useState<ScraperStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [importing, setImporting] = useState(false);
    const [syncingCategories, setSyncingCategories] = useState(false);
    const [genreSyncProgress, setGenreSyncProgress] = useState<string | null>(null);
    const [endPage, setEndPage] = useState(20);
    const [activeJobId, setActiveJobId] = useState<string | null>(null);
    const [jobProgress, setJobProgress] = useState<JobProgress | null>(null);
    const [hasMounted, setHasMounted] = useState(false);
    const [selectedLog, setSelectedLog] = useState<JobLog | null>(null);
    const [brokenLinks, setBrokenLinks] = useState<any[]>([]);
    const [brokenLinksSearch, setBrokenLinksSearch] = useState('');
    const [brokenLinksPage, setBrokenLinksPage] = useState(1);
    const [brokenLinksPerPage, setBrokenLinksPerPage] = useState(15);
    const { toast } = useToast();

    // Hydration fix
    useEffect(() => {
        setHasMounted(true);
        loadStats();
        checkForActiveJobs();
        const interval = setInterval(() => {
            loadStats();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    // Fetch broken links from last 7 days
    useEffect(() => {
        const fetchBrokenLinks = async () => {
            try {
                const res = await fetch('/api/admin/movies/broken-links');
                if (res.ok) {
                    const data = await res.json();
                    setBrokenLinks(data.brokenLinks || []);
                }
            } catch (error) {
                console.error('Failed to fetch broken links:', error);
            }
        };
        fetchBrokenLinks();
        // Refresh every 30 seconds
        const interval = setInterval(fetchBrokenLinks, 30000);
        return () => clearInterval(interval);
    }, []);

    // WebSocket Integration
    useCinemaWS({
        onScraperStatus: (payload) => {
            console.log('📡 WebSocket Scraper Status:', payload);
            if (payload.jobId === activeJobId || !activeJobId) {
                if (payload.jobId) setActiveJobId(payload.jobId);

                // Update local status
                if (payload.status === 'running') {
                    setImporting(true);
                } else if (payload.status === 'completed' || payload.status === 'error' || payload.status === 'stopped') {
                    setImporting(false);
                    setSyncingCategories(false);
                    loadStats();

                    toast({
                        title: payload.status === 'completed' ? '✅ Task Complete!' :
                            payload.status === 'stopped' ? '🛑 Task Stopped' : '❌ Task Failed',
                        description: payload.message || `Status: ${payload.status}`,
                        variant: payload.status === 'completed' ? 'default' : 'destructive'
                    });
                }

                // If payload contains progress, update it
                if (payload.progress) {
                    setJobProgress((prev: any) => ({
                        logs: [], // Initialize logs if they don't exist
                        ...prev,
                        status: payload.status,
                        progress: payload.progress,
                    }));
                } else {
                    setJobProgress((prev: any) => prev ? { ...prev, status: payload.status } : null);
                }
            }
        }
    });

    useEffect(() => {
        if (!activeJobId) return;

        // Polling as a fallback, but less frequent if WS is working
        const pollInterval = setInterval(async () => {
            try {
                const response = await fetch(`/api/admin/scraper/mass-import?jobId=${activeJobId}`);
                if (response.ok) {
                    const job = await response.json();

                    // Only update if not already updated by WS (or as a double-check)
                    setJobProgress(prev => {
                        if (!prev || JSON.stringify(prev.progress) !== JSON.stringify(job.progress)) {
                            return job;
                        }
                        return prev;
                    });

                    if (job.status === 'completed' || job.status === 'error' || job.status === 'stopped') {
                        clearInterval(pollInterval);
                        if (job.type === 'import') setImporting(false);
                        if (job.type === 'sync') setSyncingCategories(false);
                        setActiveJobId(null);
                        loadStats();
                    }
                }
            } catch (error) {
                console.error('Failed to poll job status:', error);
            }
        }, 5000); // Increased polling interval since we have WS

        return () => clearInterval(pollInterval);
    }, [activeJobId]);

    const checkForActiveJobs = async () => {
        try {
            const response = await fetch('/api/admin/scraper/mass-import');
            if (response.ok) {
                const data = await response.json();
                if (data.jobs && Array.isArray(data.jobs) && data.jobs.length > 0) {
                    // Pick the most recent active job
                    const job = data.jobs[0];
                    setActiveJobId(job.id);
                    setJobProgress(job);
                    if (job.type === 'import') setImporting(true);
                    if (job.type === 'sync') setSyncingCategories(true);
                }
            }
        } catch (error) { }
    };

    const stopImport = async () => {
        try {
            const response = await fetch('/api/admin/scraper/mass-import', { method: 'DELETE' });
            if (response.ok) {
                toast({
                    title: "Stopping Tasks",
                    description: "Sent stop signal to all background workers.",
                });
                // Don't clear activeJobId immediately - let the polling catch the 'stopped' status
                setTimeout(() => {
                    setImporting(false);
                    setSyncingCategories(false);
                }, 2000);
            }
        } catch (error) {
            console.error('Stop error:', error);
        }
    };

    const handleSyncCategories = async () => {
        if (syncingCategories) return;
        setSyncingCategories(true);
        try {
            const res = await fetch('/api/admin/scraper/sync-categories', { method: 'POST' });
            const data = await res.json();
            if (data.jobId) {
                setActiveJobId(data.jobId);
                toast({ title: "🚀 Category Sync Started" });
            } else {
                setSyncingCategories(false);
                toast({ title: "❌ Sync Failed", description: data.message });
            }
            loadStats();
        } catch (error) {
            setSyncingCategories(false);
            toast({ title: "❌ Sync Error", variant: "destructive" });
        }
    };

    const loadStats = async () => {
        try {
            const response = await fetch('/api/admin/scraper/stats');
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) { } finally {
            setLoading(false);
        }
    };

    const startFullImport = async () => {
        setImporting(true);
        setJobProgress(null);

        try {
            const response = await fetch('/api/admin/scraper/mass-import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ platform: 'imdb', startPage: 1, endPage })
            });

            if (response.ok) {
                const data = await response.json();
                setActiveJobId(data.jobId);
                toast({ title: '🚀 Import Started!' });
            } else {
                throw new Error();
            }
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to start import', variant: 'destructive' });
            setImporting(false);
        }
    };

    if (!hasMounted) return null;
    if (loading || !stats) {
        return (
            <div className="flex items-center justify-center p-24">
                <RefreshCw className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between bg-card p-6 rounded-xl border-2 border-primary/10 shadow-sm relative overflow-hidden">
                {importing && jobProgress?.status === 'scraping' && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-primary/20">
                        <div className="h-full bg-primary animate-pulse" style={{ width: '100%' }} />
                    </div>
                )}
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        <Database className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Advanced Movie Scraper</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs uppercase tracking-wider">
                                {jobProgress?.status || 'IDLE'}
                            </Badge>
                            {importing && (
                                <p className="text-sm text-primary font-medium animate-pulse">
                                    {jobProgress?.progress.current}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {(importing || syncingCategories) && (
                        <Button variant="destructive" size="sm" onClick={stopImport} className="gap-2 shadow-lg shadow-destructive/20">
                            <AlertCircle className="h-4 w-4" /> Stop All Tasks
                        </Button>
                    )}
                    <Button onClick={loadStats} variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                    </Button>
                </div>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Total Movies', value: stats.ourDatabase.totalMovies, icon: Film, color: 'text-purple-500' },
                    { label: 'Total Servers', value: stats.ourDatabase.totalServers, icon: Server, color: 'text-green-500' },
                    { label: 'New (24h)', value: stats.ourDatabase.recentImports, icon: Zap, color: 'text-green-500' },
                ].map((stat, i) => (
                    <Card key={i} className="hover:border-primary/50 transition-colors bg-card/60 backdrop-blur-sm">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                    <h3 className="text-3xl font-bold mt-1">{stat.value.toLocaleString()}</h3>
                                </div>
                                <stat.icon className={`h-8 w-8 ${stat.color} opacity-20`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Control Panel */}
                <div className="xl:col-span-1 space-y-6">
                    <SingleMovieImportPanel />
                    <Card className="border-2 border-green-500/20 bg-card/40">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-600">
                                <Play className="h-5 w-5" /> Import Engine
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3">
                                <Label>Pages to Scrape</Label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        type="number"
                                        min="1"
                                        max="999"
                                        value={endPage}
                                        onChange={(e) => setEndPage(parseInt(e.target.value) || 20)}
                                        className="text-lg font-bold"
                                        disabled={importing}
                                    />
                                    <Badge variant="secondary" className="whitespace-nowrap px-4 py-2">
                                        ~{endPage * 50} movies
                                    </Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                {[5, 20, 50, 200, 500, 999].map(p => (
                                    <Button key={p} variant="outline" size="sm"
                                        onClick={() => setEndPage(p)}
                                        disabled={importing}
                                        className={endPage === p ? 'border-primary bg-primary/5' : ''}>
                                        {p === 999 ? '♾️ Unlimited' : `${p} Pages`}
                                    </Button>
                                ))}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Button className="w-full h-14 text-lg font-bold shadow-lg shadow-green-500/10 transition-transform active:scale-95"
                                    onClick={startFullImport}
                                    disabled={importing || syncingCategories}>
                                    {importing ? (
                                        <><RefreshCw className="h-6 w-6 mr-2 animate-spin" /> RUNNING...</>
                                    ) : (
                                        <><Zap className="h-6 w-6 mr-2 fill-current" /> START IMPORT</>
                                    )}
                                </Button>

                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant="outline"
                                        className="h-10 border-primary/20 hover:bg-primary/5"
                                        onClick={handleSyncCategories}
                                        disabled={importing || syncingCategories}
                                    >
                                        {syncingCategories ? (
                                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Syncing...</>
                                        ) : (
                                            <><RefreshCw className="mr-2 h-4 w-4" /> Sync Genres</>
                                        )}
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        className="h-10"
                                        onClick={stopImport}
                                        disabled={!importing}
                                    >
                                        <Square className="mr-2 h-4 w-4" /> Stop
                                    </Button>
                                </div>
                            </div>

                            {syncingCategories && jobProgress?.type === 'sync' && (
                                <div className="mt-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="text-xs font-bold text-blue-500 uppercase">Sync Progress</div>
                                        <div className="text-xs font-mono">{jobProgress.progress.processed}/{jobProgress.progress.total}</div>
                                    </div>
                                    <Progress value={(jobProgress.progress.processed / jobProgress.progress.total) * 100} className="h-1.5" />
                                    <div className="text-[10px] mt-2 opacity-60 truncate">{jobProgress.progress.current}</div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-primary/20 bg-card/40">
                        <CardHeader className="py-4">
                            <CardTitle className="flex items-center gap-2 text-primary text-sm">
                                <LayoutGrid className="h-4 w-4" /> Maintenance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pb-6">
                            <p className="text-[10px] text-muted-foreground leading-relaxed">
                                Automatically group existing movies into franchises (e.g. NFS series).
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-xs border-primary/20 hover:bg-primary/10"
                                onClick={async () => {
                                    if (!confirm('Organize all movies into collections?')) return;

                                    toast({
                                        title: 'Maintenance Started',
                                        description: 'Organizing movies into franchises...'
                                    });

                                    try {
                                        const res = await fetch('/api/admin/management/organize-collections', { method: 'POST' });
                                        const data = await res.json();
                                        if (data.success && data.jobId) {
                                            setActiveJobId(data.jobId);
                                            setSyncingCategories(true);
                                        } else if (!data.success) {
                                            toast({
                                                title: 'Error',
                                                description: data.error || 'Failed to organize',
                                                variant: 'destructive'
                                            });
                                        }
                                    } catch (err) {
                                        toast({
                                            title: 'Error',
                                            description: 'Operation failed',
                                            variant: 'destructive'
                                        });
                                    }
                                }}
                            >
                                <RefreshCw className="mr-2 h-3 w-3" /> Group Collections
                            </Button>
                        </CardContent>
                    </Card>

                    {jobProgress && (
                        <Card className="bg-muted/10 border-2 border-primary/10 overflow-hidden">
                            <div className="bg-primary/10 px-4 py-2 border-b flex justify-between items-center">
                                <span className="text-xs font-bold uppercase tracking-wider text-primary">Live Console</span>
                                <Badge variant="outline" className="text-[10px] animate-pulse">Connected</Badge>
                            </div>
                            <div className="p-4 font-mono text-[10px] space-y-1 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20">
                                {(jobProgress.logs || []).map((log: any, i) => (
                                    <div key={i} className={`${log.level === 'success' ? 'text-green-400' : log.level === 'error' ? 'text-red-400' : 'text-yellow-400'} opacity-80`}>
                                        [{new Date(log.createdAt).toLocaleTimeString()}] {log.level.toUpperCase()}: {log.message}
                                    </div>
                                ))}
                                <div className="text-yellow-500 opacity-80 animate-pulse">_</div>
                            </div>
                        </Card>
                    )}
                </div>

                {/* Live Progress Table */}
                <div className="xl:col-span-3">
                    <Card className="h-full border-2 border-primary/20 bg-card/50 overflow-hidden flex flex-col">
                        <CardHeader className="border-b bg-muted/30 py-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-primary" />
                                    Real-time Import Stream
                                </CardTitle>
                                {jobProgress && (
                                    <div className="flex gap-4 text-sm font-mono tracking-tighter">
                                        <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/5">✅ {jobProgress.progress?.success}</Badge>
                                        <Badge variant="outline" className="text-red-500 border-red-500/20 bg-red-500/5">❌ {jobProgress.progress?.failed}</Badge>
                                        <Badge variant="outline" className="text-blue-500 border-blue-500/20 bg-blue-500/5">⏭️ {jobProgress.progress?.skipped}</Badge>
                                        <Badge variant="outline" className="text-orange-500 border-orange-500/20 bg-orange-500/5">📵 {jobProgress.progress?.noStream || 0}</Badge>
                                        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">📄 Pages: {jobProgress.progress?.processed}/{jobProgress.progress?.total}</Badge>
                                        <Badge variant="outline" className="opacity-50 border-primary/20">🔍 Found: {(jobProgress.progress?.success || 0) + (jobProgress.progress?.skipped || 0)}</Badge>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 flex-1 relative overflow-hidden">
                            <div className="overflow-y-auto h-[600px] scrollbar-thin scrollbar-thumb-primary/20">
                                <table className="w-full border-collapse text-left">
                                    <thead className="sticky top-0 bg-background/95 backdrop-blur-md z-10 border-b">
                                        <tr className="text-xs font-bold uppercase tracking-widest opacity-40">
                                            <th className="p-4 w-16">Poster</th>
                                            <th className="p-4 w-28">IMDB ID</th>
                                            <th className="p-4">Movie Title / Details</th>
                                            <th className="p-4 w-32">Status</th>
                                            <th className="p-4 w-12 text-center">Info</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-primary/5">
                                        {(!jobProgress || (jobProgress.logs || []).length === 0) ? (
                                            <tr>
                                                <td colSpan={5} className="p-24 text-center">
                                                    <div className="flex flex-col items-center gap-4 opacity-20">
                                                        <Database className="h-16 w-16" />
                                                        <p className="italic text-lg">No active movie stream. Start import to see real-time logic.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            <>
                                                {(jobProgress.logs || [])
                                                    // Filter out maintenance/health check logs
                                                    .filter((log: any) => {
                                                        const msg = log.message.toLowerCase();
                                                        // Exclude maintenance-related messages
                                                        if (msg.includes('maintenance') ||
                                                            msg.includes('health check') ||
                                                            msg.includes('scan started')) {
                                                            return false;
                                                        }
                                                        return true;
                                                    })
                                                    .map((log: any) => (
                                                        <tr key={log.id} className={`group hover:bg-primary/[0.02] transition-colors`}>
                                                            <td className="p-2 pl-4">
                                                                {log.metadata?.posterUrl ? (
                                                                    <img src={log.metadata.posterUrl} alt="" className="w-10 h-14 object-cover rounded shadow-sm border border-primary/10" />
                                                                ) : (
                                                                    <div className="w-10 h-14 bg-muted rounded flex items-center justify-center">
                                                                        <Globe className="h-4 w-4 opacity-20" />
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td className="p-4 font-mono text-[11px] opacity-60">
                                                                {log.metadata?.imdbId || 'N/A'}
                                                            </td>
                                                            <td className="p-4">
                                                                <div className="font-bold text-sm group-hover:text-primary transition-colors">{log.message}</div>
                                                                <div className="text-[10px] text-muted-foreground line-clamp-1 opacity-60">
                                                                    {new Date(log.createdAt).toLocaleString()}
                                                                </div>
                                                            </td>
                                                            <td className="p-4">
                                                                <Badge className={`
                                                                ${log.level === 'success' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                                        log.level === 'error' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                                            log.level === 'broken' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                                                'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'} 
                                                                font-bold text-[10px]
                                                            `}>
                                                                    {log.level === 'broken' ? '🔴 BROKEN' : log.level.toUpperCase()}
                                                                </Badge>
                                                            </td>
                                                            <td className="p-4 text-center">
                                                                {log.level === 'error' && (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-7 w-7 rounded-full hover:bg-muted"
                                                                        onClick={() => setSelectedLog(log)}
                                                                    >
                                                                        <AlertCircle className="h-4 w-4 opacity-40 hover:opacity-100 transition-opacity" />
                                                                    </Button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Error Detail Dialog (Simple Overlay) */}
            {selectedLog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedLog(null)}>
                    <Card className="w-full max-w-md shadow-2xl border-2 border-primary/20" onClick={e => e.stopPropagation()}>
                        <CardHeader className="border-b">
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                                {selectedLog.level.toUpperCase()} Detail
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex gap-4">
                                {selectedLog.metadata?.posterUrl && <img src={selectedLog.metadata.posterUrl} className="w-16 h-24 rounded object-cover" />}
                                <div className="space-y-1">
                                    <p className="font-mono text-xs opacity-60 underline">{selectedLog.metadata?.imdbId}</p>
                                </div>
                            </div>
                            <div className="p-4 bg-muted rounded-lg text-sm italic font-mono border-l-4 border-primary">
                                "{selectedLog.message}"
                            </div>
                            <Button className="w-full" onClick={() => setSelectedLog(null)}>Close</Button>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Broken Links Panel - Last 7 Days */}
            <Card className="border-red-500/20 bg-red-500/5">
                <CardHeader className="border-b bg-red-500/10 py-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                            Broken Links (Last 7 Days)
                        </CardTitle>
                        <Badge variant="outline" className="text-red-500 border-red-500/20">
                            {brokenLinks.filter(m => m.movieTitle.toLowerCase().includes(brokenLinksSearch.toLowerCase())).length} archived
                        </Badge>
                    </div>
                    {/* Search Bar */}
                    <div className="mt-4">
                        <Input
                            placeholder="Search broken links..."
                            value={brokenLinksSearch}
                            onChange={(e) => {
                                setBrokenLinksSearch(e.target.value);
                                setBrokenLinksPage(1); // Reset to page 1 on search
                            }}
                            className="bg-background"
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-4">
                    {(() => {
                        const filtered = brokenLinks.filter(m =>
                            m.movieTitle.toLowerCase().includes(brokenLinksSearch.toLowerCase())
                        );
                        const totalPages = Math.ceil(filtered.length / brokenLinksPerPage);
                        const startIdx = (brokenLinksPage - 1) * brokenLinksPerPage;
                        const endIdx = startIdx + brokenLinksPerPage;
                        const paginatedLinks = filtered.slice(startIdx, endIdx);

                        return (
                            <>
                                {filtered.length === 0 ? (
                                    <div className="text-center py-8 opacity-50">
                                        <AlertCircle className="h-12 w-12 mx-auto mb-2" />
                                        <p>{brokenLinksSearch ? 'No matching broken links found' : 'No broken links detected in the last 7 days'}</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-2 mb-4">
                                            {paginatedLinks.map((movie: any) => (
                                                <div key={movie.id} className="flex items-center gap-3 p-3 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors">
                                                    <span className="text-red-500 text-lg">🔴</span>
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-sm">{movie.movieTitle}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            Found: {new Date(movie.fixedAt).toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <a
                                                        href={`/admin/management?tab=servers`}
                                                        className="text-xs text-blue-500 hover:underline"
                                                    >
                                                        Review →
                                                    </a>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Pagination Controls */}
                                        <div className="flex items-center justify-between pt-4 border-t border-red-500/20">
                                            <div className="flex items-center gap-2">
                                                <Label className="text-xs">Per page:</Label>
                                                <select
                                                    value={brokenLinksPerPage}
                                                    onChange={(e) => {
                                                        setBrokenLinksPerPage(Number(e.target.value));
                                                        setBrokenLinksPage(1);
                                                    }}
                                                    className="h-8 px-2 rounded border bg-background text-xs"
                                                >
                                                    <option value={10}>10</option>
                                                    <option value={15}>15</option>
                                                    <option value={20}>20</option>
                                                    <option value={50}>50</option>
                                                    <option value={100}>100</option>
                                                </select>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setBrokenLinksPage(p => Math.max(1, p - 1))}
                                                    disabled={brokenLinksPage === 1}
                                                >
                                                    Previous
                                                </Button>
                                                <span className="text-xs px-2">
                                                    Page {brokenLinksPage} of {totalPages || 1}
                                                </span>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setBrokenLinksPage(p => Math.min(totalPages, p + 1))}
                                                    disabled={brokenLinksPage >= totalPages}
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        );
                    })()}
                </CardContent>
            </Card>
        </div>
    );
}

const CheckCircle2 = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
);
