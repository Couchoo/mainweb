'use client';

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar, Star, SortAsc, RotateCcw, Filter, X } from 'lucide-react';
import { getTranslation, Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
    isOpen: boolean;
    onClose: () => void;
    locale: Locale;
    currentYear: string;
    currentRating: string;
    currentSort: string;
    categories?: { id: number; name: string; slug: string }[];
    currentCategory?: string;
    currentCast?: string;
    currentDirector?: string;
    onFilterChange: (key: string, value: string) => void;
    onClear: () => void;
    hasFilters: boolean;
}

export function FilterPanel({
    isOpen,
    onClose,
    locale,
    currentYear,
    currentRating,
    currentSort,
    categories = [],
    currentCategory = 'all',
    currentCast = '',
    currentDirector = '',
    onFilterChange,
    onClear,
    hasFilters
}: FilterPanelProps) {
    const t = (key: any) => getTranslation(key, locale);

    const years = Array.from(
        { length: new Date().getFullYear() - 1950 + 1 },
        (_, i) => (new Date().getFullYear() - i).toString()
    );

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent side="left" className="w-[320px] sm:w-[420px] bg-brand-midnight/95 border-brand-royalPurple/20 backdrop-blur-2xl p-0 flex flex-col overflow-hidden">
                <SheetHeader className="p-8 border-b border-brand-royalPurple/10 text-left">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-2xl font-display tracking-widest uppercase flex items-center gap-3 text-brand-cinemaGold">
                            <Filter className="h-5 w-5" />
                            {t('filters')}
                        </SheetTitle>
                    </div>
                    <SheetDescription className="text-brand-softLavender/60 font-display tracking-widest uppercase text-[10px] mt-1">
                        {t('refine_your_selection') || 'Настройте параметрите на търсене'}
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                    {/* Category Filter (only for Search) */}
                    {categories.length > 0 && (
                        <div className="space-y-4">
                            <Label className="text-[11px] font-display tracking-[0.3em] uppercase text-brand-softLavender/40 ml-1 flex items-center gap-2">
                                <Filter className="h-3 w-3 text-brand-cinemaGold" />
                                {t('category')}
                            </Label>
                            <Select value={currentCategory} onValueChange={(v) => onFilterChange('category', v)}>
                                <SelectTrigger className="w-full bg-brand-midnight/40 border-brand-royalPurple/10 hover:border-brand-cinemaGold/40 transition-all rounded-xl h-12 ring-offset-brand-midnight focus:ring-1 focus:ring-brand-cinemaGold/40">
                                    <SelectValue placeholder={t('allCategories')} className="font-display tracking-widest uppercase text-xs" />
                                </SelectTrigger>
                                <SelectContent className="bg-brand-midnight border-brand-royalPurple/30 backdrop-blur-2xl max-h-[300px]">
                                    <SelectItem value="all" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('allCategories')}</SelectItem>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.slug} className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">
                                            {t(cat.name)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* Sort Filter */}
                    <div className="space-y-4">
                        <Label className="text-[11px] font-display tracking-[0.3em] uppercase text-brand-softLavender/40 ml-1 flex items-center gap-2">
                            <SortAsc className="h-3 w-3 text-brand-cinemaGold" />
                            {t('sort')}
                        </Label>
                        <Select value={currentSort} onValueChange={(v) => onFilterChange('sort', v)}>
                            <SelectTrigger className="w-full bg-brand-midnight/40 border-brand-royalPurple/10 hover:border-brand-cinemaGold/40 transition-all rounded-xl h-12 ring-offset-brand-midnight focus:ring-1 focus:ring-brand-cinemaGold/40">
                                <SelectValue placeholder={t('newest')} className="font-display tracking-widest uppercase text-xs" />
                            </SelectTrigger>
                            <SelectContent className="bg-brand-midnight border-brand-royalPurple/30 backdrop-blur-2xl">
                                <SelectItem value="newest" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('newest')}</SelectItem>
                                <SelectItem value="oldest" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('oldest')}</SelectItem>
                                <SelectItem value="popular" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('mostViewed')}</SelectItem>
                                <SelectItem value="highestRated" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('highestRated')}</SelectItem>
                                {categories.length > 0 && <SelectItem value="title" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('byTitle')}</SelectItem>}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Year Filter */}
                    <div className="space-y-4">
                        <Label className="text-[11px] font-display tracking-[0.3em] uppercase text-brand-softLavender/40 ml-1 flex items-center gap-2">
                            <Calendar className="h-3 w-3 text-brand-cinemaGold" />
                            {t('year')}
                        </Label>
                        <Select value={currentYear} onValueChange={(v) => onFilterChange('year', v)}>
                            <SelectTrigger className="w-full bg-brand-midnight/40 border-brand-royalPurple/10 hover:border-brand-cinemaGold/40 transition-all rounded-xl h-12 ring-offset-brand-midnight focus:ring-1 focus:ring-brand-cinemaGold/40">
                                <SelectValue placeholder={t('allYears')} className="font-display tracking-widest uppercase text-xs" />
                            </SelectTrigger>
                            <SelectContent className="bg-brand-midnight border-brand-royalPurple/30 backdrop-blur-2xl max-h-[300px]">
                                <SelectItem value="all" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('allYears')}</SelectItem>
                                {years.map(y => <SelectItem key={y} value={y} className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{y}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Rating Filter */}
                    <div className="space-y-4">
                        <Label className="text-[11px] font-display tracking-[0.3em] uppercase text-brand-softLavender/40 ml-1 flex items-center gap-2">
                            <Star className="h-3 w-3 text-brand-cinemaGold" />
                            {t('minRating')}
                        </Label>
                        <Select value={currentRating} onValueChange={(v) => onFilterChange('rating', v)}>
                            <SelectTrigger className="w-full bg-brand-midnight/40 border-brand-royalPurple/10 hover:border-brand-cinemaGold/40 transition-all rounded-xl h-12 ring-offset-brand-midnight focus:ring-1 focus:ring-brand-cinemaGold/40">
                                <SelectValue placeholder={t('allRatings')} className="font-display tracking-widest uppercase text-xs" />
                            </SelectTrigger>
                            <SelectContent className="bg-brand-midnight border-brand-royalPurple/30 backdrop-blur-2xl">
                                <SelectItem value="all" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('allRatings')}</SelectItem>
                                {[9, 8, 7, 6, 5, 4, 3, 2, 1].map(r => (
                                    <SelectItem key={r} value={r.toString()} className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{r}+ ⭐</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Director specific (for search) */}
                    {categories.length > 0 && (
                        <div className="space-y-4">
                            <Label className="text-[11px] font-display tracking-[0.3em] uppercase text-brand-softLavender/40 ml-1">
                                {t('director') || 'Режисьор'}
                            </Label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder={t('search_director') || 'Име на режисьор...'}
                                    className="w-full bg-brand-midnight/40 border border-brand-royalPurple/10 rounded-xl px-4 py-3 text-xs font-display tracking-widest uppercase focus:outline-none focus:border-brand-cinemaGold/40 transition-all placeholder:text-brand-softLavender/20"
                                    value={currentDirector}
                                    onChange={(e) => onFilterChange('director', e.target.value)}
                                />
                                {currentDirector && (
                                    <button
                                        onClick={() => onFilterChange('director', '')}
                                        className="absolute right-3 top-3.5 text-brand-softLavender/40 hover:text-brand-playRed transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Cast specific (for search) */}
                    {categories.length > 0 && (
                        <div className="space-y-4">
                            <Label className="text-[11px] font-display tracking-[0.3em] uppercase text-brand-softLavender/40 ml-1">
                                {t('cast') || 'Актьорски състав'}
                            </Label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder={t('search_cast') || 'Име на актьор...'}
                                    className="w-full bg-brand-midnight/40 border border-brand-royalPurple/10 rounded-xl px-4 py-3 text-xs font-display tracking-widest uppercase focus:outline-none focus:border-brand-cinemaGold/40 transition-all placeholder:text-brand-softLavender/20"
                                    value={currentCast}
                                    onChange={(e) => onFilterChange('cast', e.target.value)}
                                />
                                {currentCast && (
                                    <button
                                        onClick={() => onFilterChange('cast', '')}
                                        className="absolute right-3 top-3.5 text-brand-softLavender/40 hover:text-brand-playRed transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-8 border-t border-brand-royalPurple/10 space-y-4 bg-brand-midnight/40">
                    <Button
                        variant="ghost"
                        className="w-full text-brand-cinemaGold hover:bg-brand-cinemaGold/10 h-14 rounded-2xl font-display tracking-widest uppercase text-xs flex items-center justify-center gap-3 border border-brand-cinemaGold/20"
                        onClick={onClose}
                    >
                        {t('apply_filters') || 'Приложи филтри'}
                    </Button>

                    {hasFilters && (
                        <Button
                            variant="ghost"
                            onClick={onClear}
                            className="w-full hover:bg-brand-playRed/10 hover:text-brand-playRed transition-all flex items-center justify-center gap-3 h-12 px-5 group text-brand-softLavender/40 border border-transparent hover:border-brand-playRed/20 font-display tracking-widest uppercase text-[10px]"
                        >
                            <RotateCcw className="h-4 w-4 group-hover:rotate-[-45deg] transition-transform" />
                            {t('clear')}
                        </Button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
