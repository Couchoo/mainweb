'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
    Play,
    Square,
    Wrench,
    Trash2,
    Search,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Scissors,
    RotateCw,
    Eye,
    Archive,
    Download,
    ChevronRight,
    ChevronLeft
} from 'lucide-react';

interface HealthStats {
    healthy: number;
    partial: number;
    critical: number;
    total: number;
}

interface BrokenMovie {
    movieId: number;
    movieTitle: string;
    imdbId: string;
    healthStatus: string;
    servers: Array<{
        id: number;
        serverId: number;
        serverName: string;
        url: string;
        isWorking?: boolean;
        brokenId?: number | null; // Unique ID from broken_servers table
    }>;
}

export default function HealthCheckPanelV2() {
    const { toast } = useToast();

    // State
    const [isRunning, setIsRunning] = useState(false);
    const [progress, setProgress] = useState({ current: 0, total: 0, percentage: 0 });
    const [stats, setStats] = useState<HealthStats>({ healthy: 0, partial: 0, critical: 0, total: 0 });

    const [partialMovies, setPartialMovies] = useState<BrokenMovie[]>([]);
    const [criticalMovies, setCriticalMovies] = useState<BrokenMovie[]>([]);

    const [activeTab, setActiveTab] = useState<'partial' | 'critical'>('partial');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const [selectedMovies, setSelectedMovies] = useState<Set<number>>(new Set());
    const [isFixing, setIsFixing] = useState(false);

    // Fetch stats and broken movies
    useEffect(() => {
        fetchHealthStats();
        fetchBrokenMovies();

        const interval = setInterval(() => {
            fetchHealthStats();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const fetchHealthStats = async () => {
        try {
            const res = await fetch('/api/admin/maintenance/health/stats');
            const data = await res.json();

            if (data.success) {
                setStats(data.stats);
                setProgress(data.progress || { current: 0, total: 0, percentage: 0 });
                setIsRunning(data.isRunning || false);
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const fetchBrokenMovies = async () => {
        try {
            const res = await fetch('/api/admin/maintenance/health/broken');
            const data = await res.json();

            if (data.success) {
                const partial: BrokenMovie[] = [];
                const critical: BrokenMovie[] = [];

                for (const movie of data.brokenServers) {
                    const workingCount = movie.servers.filter((s: any) => s.isWorking).length;

                    if (workingCount > 0) {
                        partial.push(movie);
                    } else {
                        critical.push(movie);
                    }
                }

                setPartialMovies(partial);
                setCriticalMovies(critical);
            }
        } catch (error) {
            console.error('Failed to fetch broken movies:', error);
        }
    };

    const startScan = async () => {
        try {
            const res = await fetch('/api/admin/maintenance/health?action=start', {
                method: 'POST'
            });
            const data = await res.json();

            if (data.success) {
                toast({ title: '🔄 Health check started' });
                setIsRunning(true);
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
                toast({ title: '⏸️ Health check stopped' });
                setIsRunning(false);
            }
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    };

    const removeBrokenServers = async (movieId: number, movieTitle: string) => {
        try {
            const res = await fetch('/api/admin/maintenance/health/remove-broken', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ movieId })
            });
            const data = await res.json();

            if (data.success) {
                toast({
                    title: '✅ Removed broken servers',
                    description: `${movieTitle}: ${data.removed} server(s) removed. Status: ${data.newStatus}`
                });
                // Immediate refresh
                await fetchBrokenMovies();
                await fetchHealthStats();
            } else {
                toast({ title: 'Error', description: data.error, variant: 'destructive' });
            }
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    };

    const fixAllPartial = async () => {
        setIsFixing(true);
        let fixed = 0;
        let removed = 0;

        try {
            for (const movie of partialMovies) {
                const res = await fetch('/api/admin/maintenance/health/remove-broken', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ movieId: movie.movieId })
                });
                const data = await res.json();

                if (data.success) {
                    fixed++;
                    removed += data.removed;
                }
            }

            toast({
                title: `✅ Fixed ${fixed} movies`,
                description: `Removed ${removed} broken servers`
            });

            // Immediate refresh
            await fetchBrokenMovies();
            await fetchHealthStats();
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setIsFixing(false);
        }
    };

    // Pagination
    const currentMovies = activeTab === 'partial' ? partialMovies : criticalMovies;
    const totalPages = Math.ceil(currentMovies.length / itemsPerPage);
    const paginatedMovies = currentMovies.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="space-y-6">
            {/* Workflow Visualization */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        🔄 Health Check Workflow
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {/* Healthy */}
                        <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <span className="font-semibold text-green-700 dark:text-green-300">Healthy</span>
                            </div>
                            <div className="text-3xl font-bold text-green-600">{stats.healthy}</div>
                            <div className="text-sm text-muted-foreground">All servers working</div>
                        </div>

                        {/* Partial */}
                        <div className="border rounded-lg p-4 bg-yellow-50 dark:bg-yellow-950">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                <span className="font-semibold text-yellow-700 dark:text-yellow-300">Partial</span>
                            </div>
                            <div className="text-3xl font-bold text-yellow-600">{stats.partial}</div>
                            <div className="text-sm text-muted-foreground">Some servers broken</div>
                        </div>

                        {/* Critical */}
                        <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-950">
                            <div className="flex items-center gap-2 mb-2">
                                <XCircle className="h-5 w-5 text-red-600" />
                                <span className="font-semibold text-red-700 dark:text-red-300">Critical</span>
                            </div>
                            <div className="text-3xl font-bold text-red-600">{stats.critical}</div>
                            <div className="text-sm text-muted-foreground">No working servers</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    {isRunning && (
                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span>Scanning: {progress.current} / {progress.total}</span>
                                <span>{progress.percentage}%</span>
                            </div>
                            <div className="w-full bg-secondary rounded-full h-2">
                                <div
                                    className="bg-primary h-2 rounded-full transition-all"
                                    style={{ width: `${progress.percentage}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                        {!isRunning ? (
                            <Button onClick={startScan}>
                                <Play className="h-4 w-4 mr-2" />
                                Start Full Scan
                            </Button>
                        ) : (
                            <Button onClick={stopScan} variant="outline">
                                <Square className="h-4 w-4 mr-2" />
                                Stop
                            </Button>
                        )}

                        {partialMovies.length > 0 && (
                            <Button
                                onClick={fixAllPartial}
                                disabled={isFixing}
                                variant="default"
                            >
                                <Wrench className="h-4 w-4 mr-2" />
                                {isFixing ? 'Fixing...' : `Auto-Fix All ${partialMovies.length} Partial`}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Movies Requiring Attention */}
            <Card>
                <CardHeader>
                    <CardTitle>📊 Movies Requiring Attention</CardTitle>
                    <CardDescription>
                        {partialMovies.length + criticalMovies.length} movies need your attention
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Tabs */}
                    <div className="flex gap-2 mb-4">
                        <Button
                            variant={activeTab === 'partial' ? 'default' : 'outline'}
                            onClick={() => { setActiveTab('partial'); setCurrentPage(1); }}
                        >
                            🟡 Partial ({partialMovies.length})
                        </Button>
                        <Button
                            variant={activeTab === 'critical' ? 'default' : 'outline'}
                            onClick={() => { setActiveTab('critical'); setCurrentPage(1); }}
                        >
                            🔴 Critical ({criticalMovies.length})
                        </Button>
                    </div>

                    {/* Movie List */}
                    <div className="space-y-4">
                        {paginatedMovies.map((movie) => {
                            const workingServers = movie.servers.filter(s => s.isWorking);
                            const brokenServers = movie.servers.filter(s => !s.isWorking);

                            return (
                                <div key={movie.movieId} className="border rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="font-semibold">{movie.movieTitle}</div>
                                            <div className="text-sm text-muted-foreground">
                                                IMDB: {movie.imdbId}
                                            </div>
                                        </div>
                                        <Badge variant={activeTab === 'partial' ? 'secondary' : 'destructive'}>
                                            {activeTab === 'partial' ? '🟡 PARTIAL' : '🔴 CRITICAL'}
                                        </Badge>
                                    </div>

                                    {/* Servers */}
                                    <div className="space-y-1 mb-3">
                                        {workingServers.map((server, idx) => (
                                            <div key={`${movie.movieId}-working-${idx}`} className="text-sm flex items-center gap-2 text-green-600">
                                                <CheckCircle2 className="h-3 w-3" />
                                                {server.serverName} (working)
                                            </div>
                                        ))}
                                        {brokenServers.map((server, idx) => (
                                            <div key={server.brokenId || `${movie.movieId}-broken-${idx}`} className="text-sm flex items-center gap-2 text-red-600">
                                                <XCircle className="h-3 w-3" />
                                                {server.serverName} (broken)
                                            </div>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        {activeTab === 'partial' ? (
                                            <Button
                                                size="sm"
                                                onClick={() => removeBrokenServers(movie.movieId, movie.movieTitle)}
                                            >
                                                <Scissors className="h-3 w-3 mr-1" />
                                                Remove Broken
                                            </Button>
                                        ) : (
                                            <>
                                                <Button size="sm" variant="outline">
                                                    <Search className="h-3 w-3 mr-1" />
                                                    Find Backup
                                                </Button>
                                                <Button size="sm" variant="outline">
                                                    <Archive className="h-3 w-3 mr-1" />
                                                    Archive
                                                </Button>
                                            </>
                                        )}
                                        <Button size="sm" variant="ghost">
                                            <Eye className="h-3 w-3 mr-1" />
                                            View
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-4">
                            <div className="text-sm text-muted-foreground">
                                Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, currentMovies.length)} of {currentMovies.length}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <Button
                                            key={page}
                                            size="sm"
                                            variant={currentPage === page ? 'default' : 'outline'}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
