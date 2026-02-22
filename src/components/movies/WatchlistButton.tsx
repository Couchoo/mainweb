'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WatchlistButtonProps {
    movieId: number;
}

export function WatchlistButton({ movieId }: WatchlistButtonProps) {
    const { data: session } = useSession();
    const { toast } = useToast();
    const [isAdded, setIsAdded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function checkStatus() {
            if (!session) return;
            const res = await fetch('/api/watchlist');
            if (res.ok) {
                const movies = await res.json();
                setIsAdded(movies.some((m: any) => m.id === movieId));
            }
        }
        checkStatus();
    }, [session, movieId]);

    const toggleWatchlist = async () => {
        if (!session) {
            toast({
                title: 'Влезте в профила си',
                description: 'Трябва да сте влезли, за да добавяте филми в Любими.',
                variant: 'destructive',
            });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/watchlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ movieId }),
            });

            if (res.ok) {
                const data = await res.json();
                setIsAdded(data.added);
                toast({
                    title: data.added ? 'Добавено!' : 'Премахнато!',
                    description: data.added
                        ? 'Филмът е добавен в Любими.'
                        : 'Филмът е премахнат от Любими.',
                });
            }
        } catch (error) {
            toast({
                title: 'Грешка',
                description: 'Неуспешна операция.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant={isAdded ? "default" : "outline"}
            size="lg"
            onClick={toggleWatchlist}
            disabled={loading}
            className={`gap-2 min-w-[160px] h-14 text-lg font-semibold transition-all ${isAdded ? 'bg-primary shadow-lg shadow-primary/20' : 'hover:border-primary/50'
                }`}
        >
            {isAdded ? (
                <>
                    <BookmarkCheck className="h-6 w-6" />
                    В Любими
                </>
            ) : (
                <>
                    <Bookmark className="h-6 w-6 text-muted-foreground" />
                    Добави
                </>
            )}
        </Button>
    );
}
