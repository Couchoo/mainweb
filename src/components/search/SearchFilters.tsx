'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Filter } from 'lucide-react';
import { getTranslation, Locale } from '@/lib/i18n';

interface SearchFiltersProps {
    categories: { id: number; name: string; slug: string }[];
    years: number[];
    currentParams: { [key: string]: string | string[] | undefined };
    locale?: Locale;
}

export function SearchFilters({ categories, years, locale = 'bg' }: SearchFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = (key: any) => getTranslation(key, locale);

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== 'all') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/search?${params.toString()}`);
    };

    const clearFilters = () => {
        const query = searchParams.get('q');
        router.push(query ? `/search?q=${query}` : '/search');
    };

    const hasActiveFilters =
        searchParams.get('category') ||
        searchParams.get('year') ||
        searchParams.get('rating') ||
        searchParams.get('sort') ||
        searchParams.get('cast') ||
        searchParams.get('director');

    return (
        <Card className="border-brand-royalPurple/20 bg-brand-deepNight/40 backdrop-blur-xl sticky top-24 rounded-[2rem] overflow-hidden shadow-2xl">
            <CardHeader className="pb-6 border-b border-brand-royalPurple/10">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-display tracking-widest uppercase flex items-center gap-3 text-brand-cinemaGold">
                        <Filter className="h-5 w-5" />
                        {t('filters')}
                    </CardTitle>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="h-9 px-3 text-[10px] font-display tracking-[0.2em] uppercase bg-brand-playRed/10 text-brand-playRed hover:bg-brand-playRed/20 rounded-xl transition-all"
                        >
                            <X className="h-3.5 w-3.5 mr-2" />
                            {t('clear')}
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-8 py-8">
                {/* Sort */}
                <div className="space-y-3">
                    <Label className="text-[10px] font-display tracking-[0.3em] uppercase text-brand-softLavender ml-1">{t('sort')}</Label>
                    <Select
                        value={searchParams.get('sort') || 'newest'}
                        onValueChange={(value) => updateFilter('sort', value)}
                    >
                        <SelectTrigger className="bg-brand-midnight/40 border-brand-royalPurple/10 hover:border-brand-cinemaGold/40 transition-all rounded-xl h-12 ring-offset-brand-midnight focus:ring-1 focus:ring-brand-cinemaGold/40">
                            <SelectValue className="font-display tracking-widest uppercase text-xs" />
                        </SelectTrigger>
                        <SelectContent className="bg-brand-midnight border-brand-royalPurple/30 backdrop-blur-2xl">
                            <SelectItem value="newest" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('newest')}</SelectItem>
                            <SelectItem value="oldest" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('oldest')}</SelectItem>
                            <SelectItem value="views" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('mostViewed')}</SelectItem>
                            <SelectItem value="rating" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('highestRated')}</SelectItem>
                            <SelectItem value="title" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('byTitle')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Category */}
                <div className="space-y-3">
                    <Label className="text-[10px] font-display tracking-[0.3em] uppercase text-brand-softLavender ml-1">{t('category')}</Label>
                    <Select
                        value={searchParams.get('category') || 'all'}
                        onValueChange={(value) => updateFilter('category', value)}
                    >
                        <SelectTrigger className="bg-brand-midnight/40 border-brand-royalPurple/10 hover:border-brand-cinemaGold/40 transition-all rounded-xl h-12 ring-offset-brand-midnight focus:ring-1 focus:ring-brand-cinemaGold/40">
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

                {/* Year */}
                <div className="space-y-3">
                    <Label className="text-[10px] font-display tracking-[0.3em] uppercase text-brand-softLavender ml-1">{t('year')}</Label>
                    <Select
                        value={searchParams.get('year') || 'all'}
                        onValueChange={(value) => updateFilter('year', value)}
                    >
                        <SelectTrigger className="bg-brand-midnight/40 border-brand-royalPurple/10 hover:border-brand-cinemaGold/40 transition-all rounded-xl h-12 ring-offset-brand-midnight focus:ring-1 focus:ring-brand-cinemaGold/40">
                            <SelectValue placeholder={t('allYears')} className="font-display tracking-widest uppercase text-xs" />
                        </SelectTrigger>
                        <SelectContent className="bg-brand-midnight border-brand-royalPurple/30 backdrop-blur-2xl max-h-[300px]">
                            <SelectItem value="all" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('allYears')}</SelectItem>
                            {years.map((year) => (
                                <SelectItem key={year} value={year.toString()} className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Rating */}
                <div className="space-y-3">
                    <Label className="text-[10px] font-display tracking-[0.3em] uppercase text-brand-softLavender ml-1">{t('minRating')}</Label>
                    <Select
                        value={searchParams.get('rating') || 'all'}
                        onValueChange={(value) => updateFilter('rating', value)}
                    >
                        <SelectTrigger className="bg-brand-midnight/40 border-brand-royalPurple/10 hover:border-brand-cinemaGold/40 transition-all rounded-xl h-12 ring-offset-brand-midnight focus:ring-1 focus:ring-brand-cinemaGold/40">
                            <SelectValue placeholder={t('allRatings')} className="font-display tracking-widest uppercase text-xs" />
                        </SelectTrigger>
                        <SelectContent className="bg-brand-midnight border-brand-royalPurple/30 backdrop-blur-2xl">
                            <SelectItem value="all" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">{t('allRatings')}</SelectItem>
                            <SelectItem value="9" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">9.0+ ⭐⭐⭐⭐⭐</SelectItem>
                            <SelectItem value="8" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">8.0+ ⭐⭐⭐⭐</SelectItem>
                            <SelectItem value="7" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">7.0+ ⭐⭐⭐</SelectItem>
                            <SelectItem value="6" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">6.0+ ⭐⭐</SelectItem>
                            <SelectItem value="5" className="font-display tracking-widest uppercase text-xs focus:bg-brand-royalPurple/20 focus:text-brand-cinemaGold">5.0+ ⭐</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Director */}
                <div className="space-y-3">
                    <Label className="text-[10px] font-display tracking-[0.3em] uppercase text-brand-softLavender ml-1">{t('director') || 'Режисьор'}</Label>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder={t('search_director') || 'Име на режисьор...'}
                            className="w-full bg-brand-midnight/40 border border-brand-royalPurple/10 rounded-xl px-4 py-3 text-xs font-display tracking-widest uppercase focus:outline-none focus:border-brand-cinemaGold/40 focus:ring-1 focus:ring-brand-cinemaGold/40 transition-all placeholder:text-brand-softLavender/30"
                            value={searchParams.get('director') || ''}
                            onChange={(e) => updateFilter('director', e.target.value)}
                        />
                        {searchParams.get('director') && (
                            <button
                                onClick={() => updateFilter('director', '')}
                                className="absolute right-3 top-3.5 text-brand-softLavender/40 hover:text-brand-playRed transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Cast */}
                <div className="space-y-3">
                    <Label className="text-[10px] font-display tracking-[0.3em] uppercase text-brand-softLavender ml-1">{t('cast') || 'Актьорски състав'}</Label>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder={t('search_cast') || 'Име на актьор...'}
                            className="w-full bg-brand-midnight/40 border border-brand-royalPurple/10 rounded-xl px-4 py-3 text-xs font-display tracking-widest uppercase focus:outline-none focus:border-brand-cinemaGold/40 focus:ring-1 focus:ring-brand-cinemaGold/40 transition-all placeholder:text-brand-softLavender/30"
                            value={searchParams.get('cast') || ''}
                            onChange={(e) => updateFilter('cast', e.target.value)}
                        />
                        {searchParams.get('cast') && (
                            <button
                                onClick={() => updateFilter('cast', '')}
                                className="absolute right-3 top-3.5 text-brand-softLavender/40 hover:text-brand-playRed transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
