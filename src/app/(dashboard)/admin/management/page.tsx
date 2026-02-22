'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HealthCheckPanelV2 from '@/components/admin/HealthCheckPanelV2';
import ServerManagementPanel from '@/components/admin/ServerManagementPanel';
import { AdvancedScraperPanel } from '@/components/admin/AdvancedScraperPanel';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Merge, ExternalLink, AlertTriangle } from 'lucide-react';
import { Loading } from '@/components/ui/loading';

function DatabaseCleanup() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [merging, setMerging] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchDuplicates = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/movies/cleanup');
            const result = await res.json();
            setData(result);
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to fetch duplicates', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDuplicates();
    }, []);

    const handleMerge = async (duplicateId: string, movies: any[]) => {
        const target = movies[0];
        const sources = movies.slice(1);

        setMerging(duplicateId);
        try {
            const res = await fetch('/api/admin/movies/cleanup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    targetId: target.id,
                    sourceIds: sources.map(m => m.id)
                })
            });

            if (!res.ok) throw new Error('Merge failed');

            toast({ title: 'Success', description: `Merged ${sources.length + 1} movies successfully.` });
            fetchDuplicates();
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setMerging(null);
        }
    };

    if (loading) return <div className="p-8"><Loading text="Finding potential duplicates..." /></div>;

    const hasDuplicates = (data?.imdbDuplicates?.length || 0) > 0 || (data?.titleDuplicates?.length || 0) > 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Database Cleanup</h2>
                    <p className="text-muted-foreground">Clean up duplicates and optimize database integrity.</p>
                </div>
                <Button onClick={fetchDuplicates} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                </Button>
            </div>

            {!hasDuplicates && (
                <Card>
                    <CardContent className="py-12 text-center">
                        <Badge variant="outline" className="mb-4 bg-green-500/10 text-green-500 border-green-500/20">Clean</Badge>
                        <h3 className="text-xl font-medium">No duplicates found!</h3>
                        <p className="text-muted-foreground">Your movie database is in good shape.</p>
                    </CardContent>
                </Card>
            )}

            {/* IMDB ID Duplicates */}
            {data?.imdbDuplicates?.length > 0 && (
                <section className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        Exact Duplicates (same IMDB ID)
                    </h3>
                    <div className="grid gap-4">
                        {data.imdbDuplicates.map((dup: any) => (
                            <Card key={dup.imdbId}>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base font-mono bg-secondary/30 px-2 py-1 rounded w-fit">
                                            {dup.imdbId}
                                        </CardTitle>
                                        <Button
                                            size="sm"
                                            onClick={() => handleMerge(dup.imdbId, dup.movies)}
                                            disabled={!!merging}
                                        >
                                            {merging === dup.imdbId ? <RefreshCw className="h-3 w-3 animate-spin mr-2" /> : <Merge className="h-3 w-3 mr-2" />}
                                            Merge All
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {dup.movies.map((m: any) => (
                                            <div key={m.id} className="flex items-center justify-between text-sm py-1 border-b last:border-0">
                                                <div className="flex items-center gap-4">
                                                    <img src={m.posterUrl} className="h-10 w-8 object-cover rounded shadow" alt="" />
                                                    <div>
                                                        <div className="font-medium">{m.titleBG} ({m.year})</div>
                                                        <div className="text-xs text-muted-foreground">ID: {m.id} • Slug: {m.slug}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline">{m.views} views</Badge>
                                                    <Badge variant="outline">{m.videoserver.length} servers</Badge>
                                                    <a href={`/movies/${m.slug}`} target="_blank" className="text-primary hover:text-primary/80">
                                                        <ExternalLink className="h-3 w-3" />
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            {/* Title Duplicates */}
            {data?.titleDuplicates?.length > 0 && (
                <section className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2 text-amber-500">
                        <AlertTriangle className="h-5 w-5" />
                        Potential Duplicates (same Title & Year)
                    </h3>
                    <div className="grid gap-4">
                        {data.titleDuplicates.map((dup: any) => (
                            <Card key={dup.title + dup.year}>
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base">
                                            {dup.title} ({dup.year})
                                        </CardTitle>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => handleMerge(dup.title + dup.year, dup.movies)}
                                            disabled={!!merging}
                                        >
                                            {merging === dup.title + dup.year ? <RefreshCw className="h-3 w-3 animate-spin mr-2" /> : <Merge className="h-3 w-3 mr-2" />}
                                            Merge All
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {dup.movies.map((m: any) => (
                                            <div key={m.id} className="flex items-center justify-between text-sm py-1 border-b last:border-0">
                                                <div className="flex items-center gap-4">
                                                    <img src={m.posterUrl} className="h-10 w-8 object-cover rounded shadow" alt="" />
                                                    <div>
                                                        <div className="font-medium">{m.titleBG} ({m.year})</div>
                                                        <div className="text-xs text-muted-foreground">ID: {m.id} • IMDB: {m.imdbId || 'N/A'}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Badge variant="outline">{m.views} views</Badge>
                                                    <Badge variant="outline">{Math.floor(m.description.length / 50)} desc lines</Badge>
                                                    <a href={`/movies/${m.slug}`} target="_blank" className="text-primary hover:text-primary/80">
                                                        <ExternalLink className="h-3 w-3" />
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

import LinkTesterPanel from '@/components/admin/LinkTesterPanel';

export default function ManagementPage() {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Management</h1>
                <p className="text-muted-foreground text-lg">Server management, scraping, and database maintenance.</p>
            </div>

            <Tabs defaultValue="servers" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="servers">🎬 Servers</TabsTrigger>
                    <TabsTrigger value="scraper">🔄 Scraper</TabsTrigger>
                    <TabsTrigger value="database">🗄️ Database</TabsTrigger>
                    <TabsTrigger value="health">🏥 Health & Link Tester</TabsTrigger>
                </TabsList>

                <TabsContent value="servers">
                    <ServerManagementPanel />
                </TabsContent>

                <TabsContent value="scraper">
                    <AdvancedScraperPanel />
                </TabsContent>

                <TabsContent value="database">
                    <DatabaseCleanup />
                </TabsContent>

                <TabsContent value="health">
                    <LinkTesterPanel />
                </TabsContent>
            </Tabs>
        </div>
    );
}
