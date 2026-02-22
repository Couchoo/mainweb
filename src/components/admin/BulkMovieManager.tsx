'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Eye, EyeOff, Tag, Loader2 } from 'lucide-react';

interface BulkMovieManagerProps {
    movies: any[];
    onActionComplete: () => void;
}

export function BulkMovieManager({ movies, onActionComplete }: BulkMovieManagerProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const toggleSelectAll = () => {
        if (selectedIds.length === movies.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(movies.map(m => m.id.toString()));
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleAction = async (action: string) => {
        if (selectedIds.length === 0) return;

        if (action === 'delete' && !confirm(`Are you sure you want to delete ${selectedIds.length} movies?`)) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/admin/movies/bulk', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, movieIds: selectedIds }),
            });

            if (res.ok) {
                const data = await res.json();
                toast({ title: 'Success', description: data.message });
                setSelectedIds([]);
                onActionComplete();
            } else {
                const error = await res.json();
                toast({ title: 'Error', description: error.message, variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to perform bulk action', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between bg-secondary/20 p-4 rounded-xl border border-secondary/50">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="select-all"
                            checked={selectedIds.length === movies.length && movies.length > 0}
                            onCheckedChange={toggleSelectAll}
                        />
                        <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                            Select All ({selectedIds.length}/{movies.length})
                        </label>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        disabled={loading || selectedIds.length === 0}
                        onClick={() => handleAction('publish')}
                        className="h-9 px-3 border-secondary hover:bg-green-500/10 hover:text-green-500"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        Publish
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        disabled={loading || selectedIds.length === 0}
                        onClick={() => handleAction('unpublish')}
                        className="h-9 px-3 border-secondary hover:bg-yellow-500/10 hover:text-yellow-500"
                    >
                        <EyeOff className="w-4 h-4 mr-2" />
                        Unpublish
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        disabled={loading || selectedIds.length === 0}
                        onClick={() => handleAction('delete')}
                        className="h-9 px-3"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </div>

            <div className="grid gap-2 max-h-[400px] overflow-y-auto pr-2">
                {movies.map((movie) => (
                    <div
                        key={movie.id}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${selectedIds.includes(movie.id.toString())
                                ? 'bg-primary/5 border-primary/30'
                                : 'bg-card/50 border-secondary hover:border-secondary-foreground/30'
                            }`}
                        onClick={() => toggleSelect(movie.id.toString())}
                    >
                        <div className="flex items-center gap-3">
                            <Checkbox
                                checked={selectedIds.includes(movie.id.toString())}
                                onCheckedChange={() => toggleSelect(movie.id.toString())}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <div>
                                <p className="font-bold text-sm leading-tight">{movie.titleBG}</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{movie.year}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {movie.published ? (
                                <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase">Public</span>
                            ) : (
                                <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase">Draft</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {loading && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] flex items-center justify-center rounded-xl z-50">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            )}
        </div>
    );
}
