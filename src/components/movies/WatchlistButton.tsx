'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getTranslation, Locale, TranslationKey } from '@/lib/i18n';

interface WatchlistButtonProps {
    movieId: number;
    locale: Locale;
}

export function WatchlistButton({ movieId, locale }: WatchlistButtonProps) {
    const { data: session } = useSession();
    const { toast } = useToast();
    const t = (key: TranslationKey) => getTranslation(key, locale);

    const [isAdded, setIsAdded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function checkStatus() {
            if (!session) return;
            const res = await fetch('/api/watchlist');
            if (res.ok) {
                const movies = await res.json();
                setIsAdded(movies.some((m: { id: number }) => m.id === movieId));
            }
        }
        checkStatus();
    }, [session, movieId]);

    const toggleWatchlist = async () => {
        if (!session) {
            toast({
                title: t('login_required') || 'Влезте в профила си',
                description: t('login_to_watchlist') || 'Трябва да сте влезли, за да добавяте филми в Любими.',
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
                    title: data.added ? t('added') || 'Добавено!' : t('removed') || 'Премахнато!',
                    description: data.added
                        ? t('added_to_favorites') || 'Филмът е добавен в Любими.'
                        : t('removed_from_favorites') || 'Филмът е премахнат от Любими.',
                });
            }
        } catch {
            toast({
                title: t('error') || 'Грешка',
                description: t('operation_failed') || 'Неуспешна операция.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={toggleWatchlist}
            disabled={loading}
            className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${isAdded
                ? 'bg-brand-playRed text-white shadow-[0_0_20px_rgba(229,57,53,0.3)] scale-110'
                : 'bg-brand-royalPurple/20 text-brand-softLavender hover:bg-brand-royalPurple/40 hover:text-white border border-brand-royalPurple/20'
                }`}
            title={isAdded ? t('in_favorites') : t('favorites')}
        >
            <Heart className={`h-6 w-6 transition-all duration-500 ${isAdded ? 'fill-current scale-110' : 'group-hover:scale-110'}`} />
        </button>
    );
}
