'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import {
    CheckCircle2, XCircle, ExternalLink, RefreshCw, Plus, Trash2, Edit, Server,
    Clock, TrendingUp, TrendingDown, Users, CheckSquare
} from 'lucide-react';

interface ReviewItem {
    id: number;
    movieId: number;
    movieTitle: string;
    movieSlug: string;
    fixType: 'partial' | 'backup_added' | 'manual';
    serversRemoved: number;
    serversAdded: number;
    fixedAt: string;
    reviewStatus: 'pending' | 'approved' | 'rejected';
    reviewedBy?: string;
    reviewedAt?: string;
    notes?: string;
}

interface Server {
    name: string;
    url: string;
}

interface Stats {
    pending: number;
    approved: number;
    rejected: number;
    recentlyFixed: number;
    last24h: {
        approved: number;
        rejected: number;
    };
    avgResponseTimeMinutes: number;
}

export default function ServerManagementPanel() {
    const [reviews, setReviews] = useState<ReviewItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'fixed'>('pending');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingMovie, setEditingMovie] = useState<number | null>(null);
    const [servers, setServers] = useState<{ [key: number]: Server[] }>({});
    const [selectedMovies, setSelectedMovies] = useState<Set<number>>(new Set());
    const [autoVerifying, setAutoVerifying] = useState(false);
    const [autoVerifyResults, setAutoVerifyResults] = useState<any>(null);
    const [stats, setStats] = useState<Stats | null>(null);
    const { toast } = useToast();

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/management/stats', { cache: 'no-store' });
            const data = await response.json();
            if (data.success) {
                setStats(data.stats);
            }
        } catch (error: any) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/admin/management/review-queue?status=${status}&page=${page}&limit=20&_t=${Date.now()}`, {
                cache: 'no-store'
            });
            const data = await response.json();

            if (data.success) {
                setReviews(data.reviews);
                setTotalPages(data.pagination.totalPages);
            }
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
        fetchStats();
    }, [status, page]);

    const loadServers = async (movieId: number) => {
        try {
            const response = await fetch(`/api/admin/movies/${movieId}/servers`);
            const data = await response.json();

            if (data.success) {
                setServers(prev => ({ ...prev, [movieId]: data.servers }));
            }
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    };

    const handleEditServers = async (movieId: number) => {
        setEditingMovie(movieId);
        await loadServers(movieId);
    };

    const addServer = (movieId: number) => {
        setServers(prev => ({
            ...prev,
            [movieId]: [...(prev[movieId] || []), { name: 'vidsrc.xyz', url: '' }]
        }));
    };

    const removeServer = (movieId: number, index: number) => {
        setServers(prev => ({
            ...prev,
            [movieId]: prev[movieId].filter((_, i) => i !== index)
        }));
    };

    const updateServer = (movieId: number, index: number, field: 'name' | 'url', value: string) => {
        setServers(prev => ({
            ...prev,
            [movieId]: prev[movieId].map((s, i) => i === index ? { ...s, [field]: value } : s)
        }));
    };

    const saveServers = async (movieId: number) => {
        try {
            const movieServers = servers[movieId] || [];

            if (movieServers.some(s => !s.name || !s.url)) {
                toast({ title: 'Error', description: 'All servers must have name and URL', variant: 'destructive' });
                return;
            }

            const response = await fetch(`/api/admin/movies/${movieId}/servers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ servers: movieServers })
            });

            const data = await response.json();

            if (data.success) {
                toast({ title: 'Success', description: data.message });
                setEditingMovie(null);
            } else {
                toast({ title: 'Error', description: data.error, variant: 'destructive' });
            }
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    };

    const handleAction = async (movieId: number, action: 'approve' | 'deny') => {
        try {
            const response = await fetch('/api/admin/management/review-queue', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, movieId })
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: action === 'approve' ? '✅ Approved' : '❌ Denied',
                    description: data.message
                });
                await fetchReviews();
                await fetchStats();
                setEditingMovie(null);
            } else {
                toast({ title: 'Error', description: data.error, variant: 'destructive' });
            }
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    };

    const handleBulkAction = async (action: 'approve' | 'reject') => {
        if (selectedMovies.size === 0) {
            toast({ title: 'Error', description: 'No movies selected', variant: 'destructive' });
            return;
        }

        try {
            const response = await fetch('/api/admin/management/bulk-action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action,
                    movieIds: Array.from(selectedMovies)
                })
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: 'Bulk Action Complete',
                    description: data.message
                });
                setSelectedMovies(new Set());
                await fetchReviews();
                await fetchStats();
            } else {
                toast({ title: 'Error', description: data.error, variant: 'destructive' });
            }
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    };

    const handleAutoVerify = async () => {
        setAutoVerifying(true);
        try {
            const response = await fetch('/api/admin/management/auto-verify', {
                method: 'POST'
            });

            if (response.ok) {
                const data = await response.json();
                setAutoVerifyResults(data);
                toast({
                    title: `Auto-Verify Complete`,
                    description: `Found ${data.validCount} valid movies out of ${data.total} pending`
                });
            }
        } catch (error) {
            toast({ title: 'Auto-verify failed', variant: 'destructive' });
        } finally {
            setAutoVerifying(false);
        }
    };

    const handleAutoApproveAll = async () => {
        if (!autoVerifyResults?.validMovies) return;

        const movieIds = autoVerifyResults.validMovies.map((m: any) => m.movieId);

        try {
            const response = await fetch('/api/admin/management/bulk-action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'approve', movieIds })
            });

            if (response.ok) {
                toast({ title: `Approved ${movieIds.length} movies` });
                setAutoVerifyResults(null);
                fetchReviews();
            }
        } catch (error) {
            toast({ title: 'Bulk approve failed', variant: 'destructive' });
        }
    };

    const handleRepublish = async (movieId: number) => {
        try {
            const response = await fetch('/api/admin/management/republish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ movieId })
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: '✅ Re-published',
                    description: data.message
                });
                await fetchReviews();
                await fetchStats();
                setEditingMovie(null);
            } else {
                toast({ title: 'Error', description: data.error, variant: 'destructive' });
            }
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    };

    const toggleSelectMovie = (movieId: number) => {
        setSelectedMovies(prev => {
            const newSet = new Set(prev);
            if (newSet.has(movieId)) {
                newSet.delete(movieId);
            } else {
                newSet.add(movieId);
            }
            return newSet;
        });
    };

    const toggleSelectAll = () => {
        if (selectedMovies.size === reviews.length) {
            setSelectedMovies(new Set());
        } else {
            setSelectedMovies(new Set(reviews.map(r => r.movieId)));
        }
    };

    const filteredReviews = reviews.filter(review =>
        review.movieTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Server Management</h2>
                    <p className="text-muted-foreground">Manage movie servers and review queue</p>
                </div>
                <Button onClick={() => { fetchReviews(); fetchStats(); }} variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                </Button>
            </div>

            {/* Stats Dashboard */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* Pending */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Pending</p>
                                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                                </div>
                                <Clock className="h-8 w-8 text-yellow-600 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Approved */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Approved</p>
                                    <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                                </div>
                                <CheckCircle2 className="h-8 w-8 text-green-600 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* No Server */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">No Server</p>
                                    <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                                </div>
                                <XCircle className="h-8 w-8 text-red-600 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recently Fixed (24h) */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Recently Fixed</p>
                                    <p className="text-2xl font-bold">{stats.recentlyFixed}</p>
                                </div>
                                <Server className="h-8 w-8 text-blue-600 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Last 24h</p>
                                    <p className="text-2xl font-bold">
                                        <span className="text-green-600">+{stats.last24h.approved}</span>
                                        {' / '}
                                        <span className="text-red-600">-{stats.last24h.rejected}</span>
                                    </p>
                                </div>
                                <TrendingUp className="h-8 w-8 text-blue-600 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Avg Response</p>
                                    <p className="text-2xl font-bold">{Math.round(stats.avgResponseTimeMinutes)}m</p>
                                </div>
                                <Clock className="h-8 w-8 text-purple-600 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <div className="flex items-center gap-2">
                <Input
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-md"
                />
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => { fetchReviews(); fetchStats(); }}
                    title="Refresh data"
                >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
            </div>

            {/* Status Tabs */}
            <div className="flex gap-2">
                <Button
                    variant={status === 'pending' ? 'default' : 'outline'}
                    onClick={() => { setStatus('pending'); setPage(1); setSelectedMovies(new Set()); }}
                >
                    🟡 Pending
                </Button>
                <Button
                    variant={status === 'approved' ? 'default' : 'outline'}
                    onClick={() => { setStatus('approved'); setPage(1); setSelectedMovies(new Set()); }}
                >
                    ✅ Approved
                </Button>
                <Button
                    variant={status === 'rejected' ? 'default' : 'outline'}
                    onClick={() => { setStatus('rejected'); setPage(1); setSelectedMovies(new Set()); }}
                >
                    ❌ No Server
                </Button>
                <Button
                    variant={status === 'fixed' ? 'default' : 'outline'}
                    onClick={() => { setStatus('fixed'); setPage(1); setSelectedMovies(new Set()); }}
                >
                    🔧 Recently Fixed (24h)
                </Button>
            </div>

            {/* Auto-Verify Button (only for pending) */}
            {status === 'pending' && (
                <div className="flex items-center gap-4">
                    <Button
                        onClick={handleAutoVerify}
                        disabled={autoVerifying}
                        variant="outline"
                        className="border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                        {autoVerifying ? (
                            <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            <>
                                <CheckSquare className="h-4 w-4 mr-2" />
                                Auto-Verify All Pending
                            </>
                        )}
                    </Button>
                </div>
            )}

            {/* Auto-Verify Results */}
            {autoVerifyResults && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-blue-900">Auto-Verify Results</h3>
                            <p className="text-sm text-blue-700">
                                Found <strong>{autoVerifyResults.validCount}</strong> valid movies
                                with working servers out of <strong>{autoVerifyResults.total}</strong> pending
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="default"
                                onClick={handleAutoApproveAll}
                                disabled={autoVerifyResults.validCount === 0}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Approve All {autoVerifyResults.validCount} Valid
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setAutoVerifyResults(null)}
                            >
                                Close
                            </Button>
                        </div>
                    </div>

                    {/* Valid Movies List */}
                    {autoVerifyResults.validMovies.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-green-700">✅ Valid Movies ({autoVerifyResults.validCount}):</p>
                            <div className="max-h-60 overflow-y-auto space-y-1">
                                {autoVerifyResults.validMovies.map((movie: any) => (
                                    <div key={movie.movieId} className="flex items-center justify-between p-2 bg-white rounded text-sm">
                                        <span>{movie.movieTitle}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-600">{movie.serverCount} servers</span>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => window.open(`/movies/${movie.movieSlug}`, '_blank')}
                                            >
                                                <ExternalLink className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Bulk Actions (only for pending) */}
            {status === 'pending' && reviews.length > 0 && (
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <Checkbox
                        checked={selectedMovies.size === reviews.length && reviews.length > 0}
                        onCheckedChange={toggleSelectAll}
                    />
                    <span className="text-sm font-medium">
                        {selectedMovies.size} selected
                    </span>
                    {selectedMovies.size > 0 && (
                        <>
                            <Button
                                size="sm"
                                variant="default"
                                onClick={() => handleBulkAction('approve')}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Approve Selected
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleBulkAction('reject')}
                            >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject Selected
                            </Button>
                        </>
                    )}
                </div>
            )}

            {/* Reviews List */}
            {loading ? (
                <div className="text-center py-8">Loading...</div>
            ) : filteredReviews.length === 0 ? (
                <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                        No {status} reviews found
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {filteredReviews.map((review) => (
                        <Card key={review.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3 flex-1">
                                        {status === 'pending' && (
                                            <Checkbox
                                                checked={selectedMovies.has(review.movieId)}
                                                onCheckedChange={() => toggleSelectMovie(review.movieId)}
                                                className="mt-1"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <CardTitle className="text-lg">{review.movieTitle}</CardTitle>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(review.fixedAt).toLocaleString()}
                                                </span>
                                                {review.reviewedBy && (
                                                    <>
                                                        <span className="text-muted-foreground">•</span>
                                                        <span className="text-sm text-muted-foreground">
                                                            {status === 'approved' && '✅ Approved by: '}
                                                            {status === 'rejected' && '❌ Rejected by: '}
                                                            {status === 'fixed' && '🔧 Fixed by: '}
                                                            {(review.reviewedBy === '0' || !review.reviewedBy) ? 'admin' : review.reviewedBy}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Server Editor (only for pending and rejected) */}
                                    {(status === 'pending' || status === 'rejected') && (
                                        <div className="space-y-3">
                                            {editingMovie === review.movieId ? (
                                                <div className="space-y-3 border p-4 rounded-lg bg-muted/30">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-medium">Edit Servers</h4>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => addServer(review.movieId)}
                                                        >
                                                            <Plus className="h-4 w-4 mr-2" />
                                                            Add Server
                                                        </Button>
                                                    </div>

                                                    {(servers[review.movieId] || []).map((server, index) => (
                                                        <div key={index} className="flex gap-2">
                                                            <Input
                                                                placeholder="vidsrc.xyz"
                                                                value={server.name}
                                                                onChange={(e) => updateServer(review.movieId, index, 'name', e.target.value)}
                                                                className="flex-1"
                                                            />
                                                            <Input
                                                                placeholder="Server URL"
                                                                value={server.url}
                                                                onChange={(e) => updateServer(review.movieId, index, 'url', e.target.value)}
                                                                className="flex-[2]"
                                                            />
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => removeServer(review.movieId, index)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    ))}

                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="default"
                                                            size="sm"
                                                            onClick={() => saveServers(review.movieId)}
                                                        >
                                                            Save Servers
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setEditingMovie(null)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEditServers(review.movieId)}
                                                >
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    {status === 'rejected' ? 'Add Servers' : 'Edit Servers'}
                                                </Button>
                                            )}

                                            {status === 'pending' && (
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => window.open(`/movies/${review.movieSlug}`, '_blank')}
                                                    >
                                                        <ExternalLink className="h-4 w-4 mr-2" />
                                                        View Movie
                                                    </Button>
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={() => handleAction(review.movieId, 'approve')}
                                                        className="bg-green-600 hover:bg-green-700"
                                                    >
                                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleAction(review.movieId, 'deny')}
                                                    >
                                                        <XCircle className="h-4 w-4 mr-2" />
                                                        Deny (No Server)
                                                    </Button>
                                                </div>
                                            )}

                                            {status === 'rejected' && (
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => window.open(`/movies/${review.movieSlug}`, '_blank')}
                                                    >
                                                        <ExternalLink className="h-4 w-4 mr-2" />
                                                        View Movie
                                                    </Button>
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                        onClick={() => handleRepublish(review.movieId)}
                                                        className="bg-green-600 hover:bg-green-700"
                                                    >
                                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                                        Publish Now
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Approved - View Only */}
                                    {status === 'approved' && (
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => window.open(`/movies/${review.movieSlug}`, '_blank')}
                                            >
                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                View Movie
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                    >
                        Previous
                    </Button>
                    <span className="py-2 px-4 text-sm">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}
