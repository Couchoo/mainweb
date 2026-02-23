'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Calendar, Star, SlidersHorizontal, X, Filter, RotateCcw } from 'lucide-react';
import { FilterPanel } from './FilterPanel';
import { getTranslation, Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface FilterBarV2Props {
    locale: Locale;
    categories?: { id: number; name: string; slug: string }[];
}

export function FilterBarV2({ locale, categories }: FilterBarV2Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const t = (key: any) => getTranslation(key, locale);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 100;
            setScrolled(isScrolled);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const currentYear = searchParams.get('year') || 'all';
    const currentRating = searchParams.get('rating') || 'all';
    const currentSort = searchParams.get('sort') || 'newest';
    const currentCategory = searchParams.get('category') || 'all';
    const currentCast = searchParams.get('cast') || '';
    const currentDirector = searchParams.get('director') || '';

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'all' || value === '' || (key === 'sort' && value === 'newest')) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        params.delete('page');
        router.push(`${pathname}?${params.toString()}`);
    };

    const clearFilters = () => {
        const query = searchParams.get('q');
        router.push(query ? `${pathname}?q=${query}` : pathname);
    };

    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const hasFilters = currentYear !== 'all' ||
        currentRating !== 'all' ||
        currentSort !== 'newest' ||
        currentCategory !== 'all' ||
        currentCast !== '' ||
        currentDirector !== '';

    const getActiveCount = () => {
        let count = 0;
        if (currentYear !== 'all') count++;
        if (currentRating !== 'all') count++;
        if (currentSort !== 'newest') count++;
        if (currentCategory !== 'all') count++;
        if (currentCast !== '') count++;
        if (currentDirector !== '') count++;
        return count;
    };

    return (
        <div className={cn(
            "sticky top-20 z-30 transition-all duration-500 py-6 -mx-4 px-4 mb-12",
            scrolled ? "bg-brand-midnight/90 backdrop-blur-2xl border-b border-brand-royalPurple/20 shadow-2xl" : "bg-transparent"
        )}>
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <Button
                            onClick={() => setIsPanelOpen(true)}
                            className="bg-brand-deepNight/60 hover:bg-brand-deepNight/80 border border-brand-royalPurple/20 p-4 h-14 rounded-2xl flex items-center gap-4 backdrop-blur-xl shadow-2xl transition-all group"
                        >
                            <div className="h-8 w-8 rounded-xl bg-brand-cinemaGold/10 flex items-center justify-center group-hover:bg-brand-cinemaGold/20 transition-colors">
                                <SlidersHorizontal className="h-4 w-4 text-brand-cinemaGold" />
                            </div>
                            <span className="text-sm font-display tracking-[0.2em] uppercase text-brand-warmCream">
                                {t('filters')}
                            </span>
                            {hasFilters && (
                                <span className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-cinemaGold text-[11px] font-black text-brand-midnight animate-in zoom-in border-2 border-brand-midnight/50">
                                    {getActiveCount()}
                                </span>
                            )}
                        </Button>

                        <div className="flex flex-wrap items-center gap-3">
                            {currentYear !== 'all' && (
                                <div className="px-4 py-2 rounded-xl bg-brand-royalPurple/10 border border-brand-royalPurple/20 text-[10px] font-display tracking-widest uppercase text-brand-softLavender flex items-center gap-2 group/tag">
                                    <Calendar className="h-3 w-3 text-brand-cinemaGold" />
                                    {currentYear}
                                    <button onClick={() => handleFilterChange('year', 'all')} className="ml-1 hover:text-brand-playRed transition-colors">
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            )}
                            {currentRating !== 'all' && (
                                <div className="px-4 py-2 rounded-xl bg-brand-royalPurple/10 border border-brand-royalPurple/20 text-[10px] font-display tracking-widest uppercase text-brand-softLavender flex items-center gap-2 group/tag">
                                    <Star className="h-3 w-3 text-brand-cinemaGold shadow-sm" />
                                    {currentRating}+
                                    <button onClick={() => handleFilterChange('rating', 'all')} className="ml-1 hover:text-brand-playRed transition-colors">
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            )}
                            {currentCategory !== 'all' && (
                                <div className="px-4 py-2 rounded-xl bg-brand-royalPurple/10 border border-brand-royalPurple/20 text-[10px] font-display tracking-widest uppercase text-brand-softLavender flex items-center gap-2 group/tag">
                                    <Filter className="h-3 w-3 text-brand-cinemaGold" />
                                    {currentCategory}
                                    <button onClick={() => handleFilterChange('category', 'all')} className="ml-1 hover:text-brand-playRed transition-colors">
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {hasFilters && (
                        <Button
                            variant="ghost"
                            onClick={clearFilters}
                            className="text-[10px] font-display tracking-[0.2em] uppercase text-brand-playRed/60 hover:text-brand-playRed hover:bg-brand-playRed/5 transition-all flex items-center gap-2 group border border-transparent hover:border-brand-playRed/10 rounded-xl"
                        >
                            <RotateCcw className="h-3.5 w-3.5 group-hover:rotate-[-45deg] transition-transform" />
                            {t('clear')}
                        </Button>
                    )}
                </div>
            </div>

            <FilterPanel
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
                locale={locale}
                currentYear={currentYear}
                currentRating={currentRating}
                currentSort={currentSort}
                categories={categories}
                currentCategory={currentCategory}
                currentCast={currentCast}
                currentDirector={currentDirector}
                onFilterChange={handleFilterChange}
                onClear={clearFilters}
                hasFilters={hasFilters}
            />
        </div>
    );
}
