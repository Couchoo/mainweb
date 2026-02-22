'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Film, Loader2, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export function SingleMovieImportPanel() {
    const [imdbUrl, setImdbUrl] = useState('');
    const [importing, setImporting] = useState(false);
    const [result, setResult] = useState<any>(null);
    const { toast } = useToast();

    const handleImport = async () => {
        if (!imdbUrl.trim()) {
            toast({ title: 'Error', description: 'Please enter an IMDB URL', variant: 'destructive' });
            return;
        }

        setImporting(true);
        setResult(null);

        try {
            const response = await fetch('/api/admin/scraper/single-import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imdbUrl: imdbUrl.trim() })
            });

            const data = await response.json();

            if (data.success) {
                setResult(data);
                toast({
                    title: data.archived ? '⚠️ Archived' : '✅ Success',
                    description: data.message
                });
            } else {
                toast({ title: 'Error', description: data.error, variant: 'destructive' });
                setResult({ success: false, error: data.error });
            }
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
            setResult({ success: false, error: error.message });
        } finally {
            setImporting(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Film className="h-5 w-5" />
                    Single Movie Import (Test)
                </CardTitle>
                <CardDescription>
                    Import one movie from IMDB to test vidsrc validation. Uses EXACT same logic as Mass Import.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Input */}
                <div className="space-y-2">
                    <Label htmlFor="imdb-url">IMDB URL</Label>
                    <div className="flex gap-2">
                        <Input
                            id="imdb-url"
                            placeholder="https://www.imdb.com/title/tt1234567/"
                            value={imdbUrl}
                            onChange={(e) => setImdbUrl(e.target.value)}
                            disabled={importing}
                        />
                        <Button
                            onClick={handleImport}
                            disabled={importing || !imdbUrl.trim()}
                        >
                            {importing ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Importing...
                                </>
                            ) : (
                                <>
                                    <Film className="h-4 w-4 mr-2" />
                                    Import
                                </>
                            )}
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        💡 Try an obscure/old movie to test archiving (e.g., tt0000001)
                    </p>
                </div>

                {/* Result */}
                {result && (
                    <div className="space-y-3 border rounded-lg p-4 bg-muted/30">
                        {result.success ? (
                            <>
                                {/* Status */}
                                <div className="flex items-center gap-2">
                                    {result.archived ? (
                                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                    ) : (
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    )}
                                    <span className="font-medium">
                                        {result.archived ? 'Movie Archived' : 'Movie Published'}
                                    </span>
                                    <Badge variant={result.archived ? 'destructive' : 'default'}>
                                        {result.movie.healthStatus}
                                    </Badge>
                                </div>

                                {/* Movie Info */}
                                <div className="space-y-1 text-sm">
                                    <p><span className="font-medium">Title:</span> {result.movie.title}</p>
                                    <p><span className="font-medium">IMDB ID:</span> {result.movie.imdbId}</p>
                                    <p><span className="font-medium">Slug:</span> {result.movie.slug}</p>
                                    <p><span className="font-medium">Published:</span> {result.movie.published ? 'Yes' : 'No'}</p>
                                </div>

                                {/* Validation Results */}
                                {result.validationResults && result.validationResults.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="font-medium text-sm">Vidsrc Validation:</p>
                                        {result.validationResults.map((v: any, i: number) => (
                                            <div key={i} className="flex items-center gap-2 text-sm">
                                                {v.isWorking ? (
                                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                ) : (
                                                    <XCircle className="h-4 w-4 text-red-600" />
                                                )}
                                                <span className="font-mono text-xs">{v.name}</span>
                                                <Badge variant={v.isWorking ? 'default' : 'destructive'} className="text-xs">
                                                    {v.statusCode || 'N/A'}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => window.open(`/movies/${result.movie.slug}`, '_blank')}
                                    >
                                        View Movie
                                    </Button>
                                    {result.archived && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => window.open('/admin/maintenance?tab=review', '_blank')}
                                        >
                                            Review Queue
                                        </Button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-2 text-red-600">
                                <XCircle className="h-5 w-5" />
                                <span className="font-medium">{result.error}</span>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
