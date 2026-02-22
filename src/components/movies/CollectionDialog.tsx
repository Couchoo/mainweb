'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Plus, Bookmark, Loader2, Check, FolderOpen, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getTranslation, Locale } from '@/lib/i18n';
import { usePathname } from 'next/navigation';

interface Collection {
    id: number;
    name: string;
    _count: { movies: number };
}

export function CollectionDialog({ movieId, trigger }: { movieId: number, trigger?: React.ReactNode }) {
    const pathname = usePathname();
    const segment = pathname?.split('/')[1];
    const locale = (segment === 'en' || segment === 'bg' ? segment : 'bg') as Locale;
    const t = (key: any) => getTranslation(key, locale);

    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (open) fetchCollections();
    }, [open]);

    async function fetchCollections() {
        setLoading(true);
        try {
            const res = await fetch('/api/user/collections');
            if (res.ok) {
                const data = await res.json();
                setCollections(data);
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateCollection() {
        if (!newCollectionName.trim()) return;
        try {
            const res = await fetch('/api/user/collections', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCollectionName }),
            });
            if (res.ok) {
                setNewCollectionName('');
                fetchCollections();
                toast({ title: t('collection_created') || 'Колекцията е създадена!' });
            }
        } catch (error) {
            toast({ title: t('error_creating') || 'Грешка при създаване', variant: 'destructive' });
        }
    }

    async function addToCollection(collectionId: number) {
        try {
            const res = await fetch(`/api/user/collections/${collectionId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ movieId }),
            });
            if (res.ok) {
                toast({ title: t('added_to_collection') || 'Добавено в колекцията!', description: t('added_success') || 'Филмът беше успешно добавен.' });
                setOpen(false);
            } else {
                toast({ title: t('already_in_collection') || 'Вече е в тази колекция', variant: 'destructive' });
            }
        } catch (error) {
            toast({ title: t('error') || 'Грешка', variant: 'destructive' });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <button
                        className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-royalPurple/20 text-brand-softLavender hover:bg-brand-royalPurple/40 hover:text-white border border-brand-royalPurple/20 transition-all duration-300 group"
                        title={t('add_to_collection') || "Добави в Колекция"}
                    >
                        <Layers className="h-6 w-6 transition-transform group-hover:scale-110" />
                    </button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-card border-secondary rounded-3xl backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-2">
                        <FolderOpen className="w-6 h-6 text-primary" />
                        Моите Колекции
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 pt-4">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Име на нова колекция..."
                            value={newCollectionName}
                            onChange={(e) => setNewCollectionName(e.target.value)}
                            className="bg-secondary/20 border-secondary focus:border-primary rounded-xl"
                        />
                        <Button onClick={handleCreateCollection} size="icon" className="rounded-xl shrink-0">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
                            </div>
                        ) : collections.length > 0 ? (
                            collections.map((col) => (
                                <button
                                    key={col.id}
                                    onClick={() => addToCollection(col.id)}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-secondary/10 border border-secondary/50 hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
                                >
                                    <div>
                                        <p className="font-bold text-white group-hover:text-primary transition-colors">{col.name}</p>
                                        <p className="text-xs text-muted-foreground uppercase font-black">{col._count.movies} филма</p>
                                    </div>
                                    <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all opacity-0 group-hover:opacity-100 rotate-45 group-hover:rotate-0" />
                                </button>
                            ))
                        ) : (
                            <p className="text-center py-8 text-muted-foreground italic">Все още нямате колекции.</p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
