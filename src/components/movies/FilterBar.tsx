'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Star, SortAsc, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { getTranslation, Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface FilterBarProps {
    locale: Locale;
}

export function FilterBar({ locale }: FilterBarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const t = (key: any) => getTranslation(key, locale);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 100);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const currentYear = searchParams.get('year') || 'all';
    const currentRating = searchParams.get('rating') || 'all';
    const currentSort = searchParams.get('sort') || 'newest';

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'all' || (key === 'sort' && value === 'newest')) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        params.delete('page'); // Reset to first page
        router.push(`${pathname}?${params.toString()}`);
    };

    const clearFilters = () => {
        router.push(pathname);
    };

    const years = Array.from(
        { length: new Date().getFullYear() - 1950 + 1 },
        (_, i) => (new Date().getFullYear() - i).toString()
    );

    const hasFilters = currentYear !== 'all' || currentRating !== 'all' || currentSort !== 'newest';

    return (
        <div className={cn(
            "sticky top-16 z-30 transition-all duration-500 py-6 -mx-4 px-4 mb-12",
            scrolled ? "bg-brand-midnight/80 backdrop-blur-2xl border-b border-brand-royalPurple/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" : "bg-transparent"
        )}>
            <div className="container mx-auto">
                <div className="flex flex-wrap items-center gap-4 bg-brand-deepNight/40 p-3 rounded-[2rem] border border-brand-royalPurple/20 backdrop-blur-xl shadow-2xl">
                    <div className="px-5 flex items-center gap-3 text-brand-cinemaGold border-r border-brand-royalPurple/20 mr-2 py-2">
                        <SlidersHorizontal className="h-5 w-5" />
                        <span className="text-sm font-display tracking-widest uppercase hidden md:inline">{t('filters')}</span>
                    </div>

                    {/* Year Filter */}
                    <Select value={currentYear} onValueChange={(v) => handleFilterChange('year', v)}>
                        <SelectTrigger className="w-[140px] bg-brand-midnight/40 border border-brand-royalPurple/10 hover:border-brand-cinemaGold/40 hover:bg-brand-midnight/60 transition-all rounded-xl h-11 ring-offset-brand-midnight focus:ring-1 focus:ring-brand-cinemaGold/40">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-brand-cinemaGold" />
                                <SelectValue placeholder={t('allYears')} className="font-display tracking-widest uppercase text-xs" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="bg-brand-midnight border-brand-royalPurple/30 backdrop-blur-2xl">
                            <SelectItem value="all" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('allYears')}</SelectItem>
                            {years.map(y => <SelectItem key={y} value={y} className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{y}</SelectItem>)}
                        </SelectContent>
                    </Select>

                    {/* Rating Filter */}
                    <Select value={currentRating} onValueChange={(v) => handleFilterChange('rating', v)}>
                        <SelectTrigger className="w-[140px] bg-brand-midnight/40 border border-brand-royalPurple/10 hover:border-brand-cinemaGold/40 hover:bg-brand-midnight/60 transition-all rounded-xl h-11 ring-offset-brand-midnight focus:ring-1 focus:ring-brand-cinemaGold/40">
                            <div className="flex items-center gap-3">
                                <Star className="h-4 w-4 text-brand-cinemaGold fill-brand-cinemaGold/20" />
                                <SelectValue placeholder={t('allRatings')} className="font-display tracking-widest uppercase text-xs" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="bg-brand-midnight border-brand-royalPurple/30 backdrop-blur-2xl">
                            <SelectItem value="all" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('allRatings')}</SelectItem>
                            {[9, 8, 7, 6, 5, 4, 3, 2, 1].map(r => (
                                <SelectItem key={r} value={r.toString()} className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{r}+ ⭐</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Sort Filter */}
                    <Select value={currentSort} onValueChange={(v) => handleFilterChange('sort', v)}>
                        <SelectTrigger className="w-[160px] bg-brand-midnight/40 border border-brand-royalPurple/10 hover:border-brand-cinemaGold/40 hover:bg-brand-midnight/60 transition-all rounded-xl h-11 ring-offset-brand-midnight focus:ring-1 focus:ring-brand-cinemaGold/40">
                            <div className="flex items-center gap-3">
                                <SortAsc className="h-4 w-4 text-brand-cinemaGold" />
                                <SelectValue placeholder={t('newest')} className="font-display tracking-widest uppercase text-xs" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="bg-brand-midnight border-brand-royalPurple/30 backdrop-blur-2xl">
                            <SelectItem value="newest" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('newest')}</SelectItem>
                            <SelectItem value="oldest" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('oldest')}</SelectItem>
                            <SelectItem value="highestRated" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('highestRated')}</SelectItem>
                            <SelectItem value="popular" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('mostViewed')}</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Active Indicator & Clear Button */}
                    {hasFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="ml-auto rounded-xl hover:bg-brand-playRed/10 hover:text-brand-playRed transition-all flex items-center gap-3 h-11 px-5 group border border-transparent hover:border-brand-playRed/20"
                        >
                            <RotateCcw className="h-4 w-4 group-hover:rotate-[-45deg] transition-transform text-brand-playRed" />
                            <span className="text-xs font-display tracking-widest uppercase">{t('clear')}</span>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
