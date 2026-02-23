'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Calendar, Star, SlidersHorizontal, X, Filter, ChevronDown } from 'lucide-react';
import { InlineFilterPanel } from './InlineFilterPanel';
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
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
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
        setIsOpen(false);
    };

    const hasFilters =
        currentYear !== 'all' ||
        currentRating !== 'all' ||
        currentSort !== 'newest' ||
        currentCategory !== 'all' ||
        currentCast !== '' ||
        currentDirector !== '';

    const activeCount = [
        currentYear !== 'all',
        currentRating !== 'all',
        currentSort !== 'newest',
        currentCategory !== 'all',
        currentCast !== '',
        currentDirector !== '',
    ].filter(Boolean).length;

    return (
        <div className={cn(
            'mb-12 transition-all duration-500',
            scrolled && isOpen ? 'sticky top-20 z-30' : ''
        )}>
            {/* ── Trigger row ── */}
            <div className={cn(
                'rounded-2xl border transition-all duration-300',
                isOpen
                    ? 'bg-[#0F0E17]/95 backdrop-blur-2xl border-[#F0C040]/20 shadow-[0_4px_40px_rgba(240,192,64,0.08)]'
                    : 'bg-[#1A1828]/60 backdrop-blur-xl border-[#2D2460]/30 hover:border-[#2D2460]/60'
            )}>
                <div className="flex flex-wrap items-center gap-4 p-4">
                    {/* Main FILTERS toggle */}
                    <button
                        onClick={() => setIsOpen(prev => !prev)}
                        className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-[#0F0E17] border border-[#2D2460]/40 hover:border-[#F0C040]/30 transition-all group"
                    >
                        <div className="h-7 w-7 rounded-lg bg-[#F0C040]/10 flex items-center justify-center group-hover:bg-[#F0C040]/20 transition-colors">
                            <SlidersHorizontal className="h-3.5 w-3.5 text-[#F0C040]" />
                        </div>
                        <span className="text-[11px] font-display tracking-[0.25em] uppercase text-[#F5F0E8]">
                            {t('filters')}
                        </span>
                        {hasFilters && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F0C040] text-[10px] font-black text-[#0F0E17]">
                                {activeCount}
                            </span>
                        )}
                        <ChevronDown
                            className={cn(
                                'h-4 w-4 text-[#7B6BAA] transition-transform duration-300 ml-1',
                                isOpen && 'rotate-180'
                            )}
                        />
                    </button>

                    {/* Active filter chips */}
                    {currentYear !== 'all' && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0C040]/10 border border-[#F0C040]/30 text-[10px] font-display tracking-widest uppercase text-[#F0C040]">
                            <Calendar className="h-3 w-3" />
                            {currentYear}+
                            <button onClick={() => handleFilterChange('year', 'all')} className="ml-1 hover:text-[#E53935] transition-colors">
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    )}
                    {currentRating !== 'all' && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0C040]/10 border border-[#F0C040]/30 text-[10px] font-display tracking-widest uppercase text-[#F0C040]">
                            <Star className="h-3 w-3 fill-current" />
                            {currentRating}+
                            <button onClick={() => handleFilterChange('rating', 'all')} className="ml-1 hover:text-[#E53935] transition-colors">
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    )}
                    {currentCategory !== 'all' && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0C040]/10 border border-[#F0C040]/30 text-[10px] font-display tracking-widest uppercase text-[#F0C040]">
                            <Filter className="h-3 w-3" />
                            {currentCategory}
                            <button onClick={() => handleFilterChange('category', 'all')} className="ml-1 hover:text-[#E53935] transition-colors">
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    )}
                    {currentDirector !== '' && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0C040]/10 border border-[#F0C040]/30 text-[10px] font-display tracking-widest uppercase text-[#F0C040]">
                            Dir: {currentDirector}
                            <button onClick={() => handleFilterChange('director', '')} className="ml-1 hover:text-[#E53935] transition-colors">
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    )}
                    {currentCast !== '' && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0C040]/10 border border-[#F0C040]/30 text-[10px] font-display tracking-widest uppercase text-[#F0C040]">
                            Act: {currentCast}
                            <button onClick={() => handleFilterChange('cast', '')} className="ml-1 hover:text-[#E53935] transition-colors">
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Inline expandable panel */}
                <div className="px-4 pb-0">
                    <InlineFilterPanel
                        isOpen={isOpen}
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
                {isOpen && <div className="h-4" />}
            </div>
        </div>
    );
}
