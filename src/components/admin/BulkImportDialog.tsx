'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, CheckCircle2, XCircle, Loader2, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function BulkImportDialog() {
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState('');
    const [importing, setImporting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState<any[]>([]);
    const { toast } = useToast();

    const handleImport = async () => {
        const inputList = inputs.split('\n').filter(u => u.trim());

        if (inputList.length === 0) {
            toast({
                title: 'Грешка',
                description: 'Моля, въведете поне един IMDB ID или URL',
                variant: 'destructive'
            });
            return;
        }

        setImporting(true);
        setProgress(0);
        setResults([]);

        try {
            const response = await fetch('/api/admin/movies/bulk-import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    inputs: inputList,
                    useAdvancedScraper: true
                })
            });

            if (!response.ok) {
                throw new Error('Import failed');
            }

            const data = await response.json();
            setResults(data.results);
            setProgress(100);

            toast({
                title: 'Импортът завърши!',
                description: `Успешни: ${data.success}, Публикувани: ${data.published}, Неуспешни: ${data.failed}`
            });

        } catch (error) {
            toast({
                title: 'Грешка',
                description: 'Неуспешен импорт',
                variant: 'destructive'
            });
        } finally {
            setImporting(false);
        }
    };

    const handleReset = () => {
        setInputs('');
        setResults([]);
        setProgress(0);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Zap className="h-4 w-4" />
                    Advanced Import
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        Advanced Bulk Import
                    </DialogTitle>
                    <DialogDescription>
                        Въведете IMDB IDs, IMDB URLs или torrent URLs (един на ред).
                        Системата автоматично ще намери видео сървъри!
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Textarea
                            placeholder="tt0468569&#10;https://www.imdb.com/title/tt0111161/&#10;https://1337x.to/torrent/..."
                            value={inputs}
                            onChange={(e) => setInputs(e.target.value)}
                            rows={8}
                            disabled={importing}
                            className="font-mono text-sm"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                            💡 Поддържа: IMDB IDs (tt1234567), IMDB URLs, torrent URLs
                        </p>
                        <p className="text-xs text-yellow-600 mt-1">
                            ⚡ Автоматично намира видео сървъри и публикува филмите!
                        </p>
                    </div>

                    {importing && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm">Scraping и импортиране... (може да отнеме време)</span>
                            </div>
                            <Progress value={progress} />
                        </div>
                    )}

                    {results.length > 0 && (
                        <div className="border rounded-lg p-4 space-y-2 max-h-64 overflow-y-auto">
                            <h4 className="font-semibold text-sm">Резултати:</h4>
                            {results.map((result, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-secondary/20 rounded text-sm">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        {result.success ? (
                                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                        ) : (
                                            <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                                        )}
                                        <span className="truncate">
                                            {result.success ? result.title : result.input}
                                        </span>
                                    </div>
                                    {result.success ? (
                                        <div className="flex gap-1 ml-2">
                                            <Badge variant="secondary">{result.slug}</Badge>
                                            {result.serversCount > 0 && (
                                                <Badge variant="default" className="bg-green-600">
                                                    {result.serversCount} servers
                                                </Badge>
                                            )}
                                            {result.published && (
                                                <Badge variant="default" className="bg-blue-600">
                                                    Published
                                                </Badge>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-xs text-red-500 ml-2">{result.error}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-2 justify-end">
                        {results.length > 0 && (
                            <Button variant="outline" onClick={handleReset}>
                                Нов импорт
                            </Button>
                        )}
                        <Button
                            onClick={handleImport}
                            disabled={importing || !inputs.trim()}
                        >
                            {importing ? 'Импортиране...' : 'Импортирай'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
