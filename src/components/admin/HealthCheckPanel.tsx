'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Play, Square, Wrench, Trash2, Search, Loader2 } from 'lucide-react';

interface BrokenServer {
    movieId: number;
    movieTitle: string;
    imdbId: string;
    healthStatus: string;
    lastChecked: string;
    servers: Array<{
        id: number;
        serverId: number;
        serverName: string;
        url: string;
    }>;
}

interface HealthStats {
    checked: number;
    broken: number;
    fixed: number;
    unpublished: number;
}

interface LogEntry {
    timestamp: string;
    level: string;
    message: string;
}

export function HealthCheckPanel() {
    const [isRunning, setIsRunning] = useState(false);
    const [stats, setStats] = useState<HealthStats>({ checked: 0, broken: 0, fixed: 0, unpublished: 0 });
    const [progress, setProgress] = useState({ current: 0, total: 0, percentage: 0 });
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [brokenServers, setBrokenServers] = useState<BrokenServer[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<any>(null);
    const [checkingMovie, setCheckingMovie] = useState(false);
    const { toast } = useToast();

    // Poll for status
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch('/api/admin/maintenance/health');
                const data = await res.json();

                if (data.isRunning) {
                    setIsRunning(true);
                    setStats(data.stats || stats);
                    setProgress(data.progress || progress);
                } else {
                    setIsRunning(false);
                }
            } catch (error) {
                console.error('Failed to fetch status:', error);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Fetch broken servers
    const fetchBrokenServers = async () => {
        try {
            const res = await fetch('/api/admin/maintenance/health/broken');
            const data = await res.json();
            if (data.success) {
                setBrokenServers(data.broken || []);
            }
        } catch (error) {
            console.error('Failed to fetch broken servers:', error);
        }
    };

    useEffect(() => {
        fetchBrokenServers();
        const interval = setInterval(fetchBrokenServers, 10000);
        return () => clearInterval(interval);
    }, []);

    // Search autocomplete
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.length < 2) {
                setSearchResults([]);
                return;
            }

            setIsSearching(true);
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
                const data = await res.json();
                if (data.results) {
                    setSearchResults(data.results);
                }
            } catch (error) {
                console.error('Search failed:', error);
            } finally {
                setIsSearching(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const startScan = async () => {
        try {
            const res = await fetch('/api/admin/maintenance/health?action=start', {
                method: 'POST'
            });
            const data = await res.json();

            if (data.success) {
                toast({ title: 'Health check started', description: `Job ID: ${data.jobId}` });
                setIsRunning(true);
            } else {
                toast({ title: 'Failed to start', description: data.error, variant: 'destructive' });
            }
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    };

    const stopScan = async () => {
        try {
            const res = await fetch('/api/admin/maintenance/health?action=stop', {
                method: 'POST'
            });
            const data = await res.json();

            if (data.success) {
                toast({ title: 'Health check stopped' });
                setIsRunning(false);
            }
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    };

    const quickCheck = async (movieId: number) => {
        setCheckingMovie(true);
        try {
            const res = await fetch('/api/admin/maintenance/health/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ movieId })
            });
            const data = await res.json();

            if (data.success) {
                const status = data.healthStatus === 'OK' ? '✅ All servers working!' :
                    data.healthStatus === 'BROKEN' ? '❌ All servers broken!' :
                        '⚠️ Some servers broken';

                toast({
                    title: status,
                    description: `${data.results.working}/${data.results.total} servers working`
                });

                // Refresh broken servers list
                fetchBrokenServers();
            } else {
                toast({ title: 'Check failed', description: data.error, variant: 'destructive' });
            }
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setCheckingMovie(false);
        }
    };

    const fixServer = async (movieId: number, serverId?: number) => {
        try {
            const res = await fetch('/api/admin/maintenance/health/fix', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ movieId, serverId })
            });
            const data = await res.json();

            if (data.success) {
                toast({ title: '✅ Fixed!', description: data.message });
                fetchBrokenServers();
            } else {
                toast({ title: 'Fix failed', description: data.error, variant: 'destructive' });
            }
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    };

    const deleteServer = async (serverId: number) => {
        if (!confirm('Are you sure you want to delete this server?')) return;

        try {
            const res = await fetch('/api/admin/maintenance/health/server', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ serverId })
            });
            const data = await res.json();

            if (data.success) {
                toast({ title: '🗑️ Deleted', description: data.message });
                fetchBrokenServers();
            } else {
                toast({ title: 'Delete failed', description: data.error, variant: 'destructive' });
            }
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    };

    return (
        <div className="space-y-6">
            {/* Control Panel */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        🏥 Health Check System
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Button
                            onClick={startScan}
                            disabled={isRunning}
                            className="gap-2"
                        >
                            <Play className="h-4 w-4" />
                            Start Full Scan
                        </Button>
                        <Button
                            onClick={stopScan}
                            disabled={!isRunning}
                            variant="outline"
                            className="gap-2"
                        >
                            <Square className="h-4 w-4" />
                            Stop
                        </Button>
                    </div>

                    {isRunning && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Progress: {progress.current} / {progress.total}</span>
                                <span>{progress.percentage.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all"
                                    style={{ width: `${progress.percentage}%` }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-500">{stats.checked}</div>
                            <div className="text-xs text-muted-foreground">Checked</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-red-500">{stats.broken}</div>
                            <div className="text-xs text-muted-foreground">Broken</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-500">{stats.fixed}</div>
                            <div className="text-xs text-muted-foreground">Fixed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-500">{stats.unpublished}</div>
                            <div className="text-xs text-muted-foreground">Unpublished</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Broken Servers Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        🚨 Broken Servers ({brokenServers.length})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {brokenServers.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No broken servers found! 🎉
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {brokenServers.map((movie) => (
                                <div key={movie.movieId} className="border rounded-lg p-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">{movie.movieTitle}</div>
                                            <div className="text-xs text-muted-foreground">
                                                IMDB: {movie.imdbId} • Status: {movie.healthStatus}
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            onClick={() => fixServer(movie.movieId)}
                                            className="gap-2"
                                        >
                                            <Wrench className="h-4 w-4" />
                                            Fix All
                                        </Button>
                                    </div>
                                    <div className="space-y-1">
                                        {movie.servers.map((server) => (
                                            <div key={server.id} className="flex items-center justify-between bg-secondary/50 rounded p-2">
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium">{server.serverName}</div>
                                                    <div className="text-xs text-muted-foreground truncate">{server.url}</div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => fixServer(movie.movieId, server.serverId)}
                                                    >
                                                        <Wrench className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => deleteServer(server.serverId)}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Quick Check */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        🔍 Quick Check Single Movie
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search movie to check..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                        {isSearching && (
                            <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin" />
                        )}
                        {searchResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                {searchResults.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="p-3 hover:bg-secondary cursor-pointer"
                                        onClick={() => {
                                            setSelectedMovie(movie);
                                            setSearchQuery('');
                                            setSearchResults([]);
                                        }}
                                    >
                                        <div className="font-medium">{movie.titleEN || movie.titleBG}</div>
                                        <div className="text-xs text-muted-foreground">{movie.year}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {selectedMovie && (
                        <div className="border rounded-lg p-4">
                            <div className="font-medium mb-2">{selectedMovie.titleEN || selectedMovie.titleBG}</div>
                            <div className="text-sm text-muted-foreground mb-4">
                                Click to check all servers for this movie
                            </div>
                            <Button
                                size="sm"
                                onClick={() => quickCheck(selectedMovie.id)}
                                disabled={checkingMovie}
                            >
                                {checkingMovie ? 'Checking...' : 'Check Servers'}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
