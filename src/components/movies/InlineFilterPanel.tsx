'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCcw, Calendar, Star, LayoutGrid, TrendingUp, Clock, Flame, Trophy, ArrowUp, ArrowDown } from 'lucide-react';
import { getTranslation, Locale } from '@/lib/i18n';

const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1970;

const SORT_OPTIONS = [
    { value: 'newest', label: 'Нови', Icon: Clock, hasDir: false },
    { value: 'views', label: 'Популярни', Icon: Flame, hasDir: true },
    { value: 'rating', label: 'Рейтинг', Icon: Trophy, hasDir: true },
];

interface InlineFilterPanelProps {
    isOpen: boolean;
    locale: Locale;
    currentYear: string;
    currentRating: string;
    currentSort: string;
    currentOrder: string;
    categories?: { id: number; name: string; slug: string }[];
    currentCategory: string;
    currentCast: string;
    currentDirector: string;
    onFilterChange: (key: string, value: string) => void;
    onBatchChange: (changes: Record<string, string>) => void;
    onClear: () => void;
    hasFilters: boolean;
}

export function InlineFilterPanel({
    isOpen,
    locale,
    currentYear,
    currentRating,
    currentSort,
    currentOrder,
    categories = [],
    currentCategory,
    onFilterChange,
    onBatchChange,
    onClear,
    hasFilters,
}: InlineFilterPanelProps) {
    const t = (key: any) => getTranslation(key, locale);

    // Local slider state — commit to URL only on release
    const [yearVal, setYearVal] = useState<number>(
        currentYear !== 'all' ? parseInt(currentYear) : MIN_YEAR
    );
    const [ratingVal, setRatingVal] = useState<number>(
        currentRating !== 'all' ? parseFloat(currentRating) : 0
    );

    // Sync from URL when cleared externally
    useEffect(() => {
        setYearVal(currentYear !== 'all' ? parseInt(currentYear) : MIN_YEAR);
    }, [currentYear]);

    useEffect(() => {
        setRatingVal(currentRating !== 'all' ? parseFloat(currentRating) : 0);
    }, [currentRating]);

    const commitYear = useCallback(() => {
        onFilterChange('year', yearVal === MIN_YEAR ? 'all' : String(yearVal));
    }, [yearVal, onFilterChange]);

    const commitRating = useCallback(() => {
        onFilterChange('rating', ratingVal === 0 ? 'all' : String(ratingVal));
    }, [ratingVal, onFilterChange]);

    const yearPct = ((yearVal - MIN_YEAR) / (CURRENT_YEAR - MIN_YEAR)) * 100;
    const ratingPct = (ratingVal / 10) * 100;

    return (
        <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{
                maxHeight: isOpen ? '520px' : '0px',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(-6px)',
            }}
        >
            <div className="mt-4 rounded-3xl bg-[#0F0E17]/95 backdrop-blur-3xl border border-[#2D2460]/40 shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden">
                {/* Gold accent top line */}
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#F0C040] to-transparent opacity-50" />

                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* ── YEAR SLIDER ── */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-[#F0C040]" />
                                <span className="text-[11px] font-display tracking-[0.3em] uppercase text-[#7B6BAA]">Година</span>
                            </div>
                            <span className="text-lg font-display tracking-widest text-[#F0C040] font-black">
                                {yearVal === MIN_YEAR ? 'Всички' : `${yearVal}+`}
                            </span>
                        </div>
                        <div className="relative pt-2 pb-1">
                            <input
                                type="range"
                                min={MIN_YEAR}
                                max={CURRENT_YEAR}
                                value={yearVal}
                                onChange={e => setYearVal(Number(e.target.value))}
                                onMouseUp={commitYear}
                                onTouchEnd={commitYear}
                                className="couchoo-slider"
                                style={{ ['--slider-pct' as any]: `${yearPct}%` }}
                            />
                            <div className="flex justify-between mt-2 text-[10px] font-display tracking-widest text-[#2D2460]">
                                <span>{MIN_YEAR}</span>
                                <span>{CURRENT_YEAR}</span>
                            </div>
                        </div>
                    </div>

                    {/* ── RATING SLIDER ── */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-[#F0C040]" />
                                <span className="text-[11px] font-display tracking-[0.3em] uppercase text-[#7B6BAA]">Мин. рейтинг</span>
                            </div>
                            <div className="flex items-center gap-1">
                                {ratingVal === 0 ? (
                                    <span className="text-sm font-display tracking-widest text-[#2D2460]/60">Всички</span>
                                ) : (
                                    <>
                                        <Star className="h-4 w-4 text-[#F0C040] fill-[#F0C040]" />
                                        <span className="text-lg font-display tracking-widest text-[#F0C040] font-black">
                                            {ratingVal.toFixed(1)}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="relative pt-2 pb-1">
                            <input
                                type="range"
                                min={0}
                                max={10}
                                step={0.5}
                                value={ratingVal}
                                onChange={e => setRatingVal(Number(e.target.value))}
                                onMouseUp={commitRating}
                                onTouchEnd={commitRating}
                                className="couchoo-slider"
                                style={{ ['--slider-pct' as any]: `${ratingPct}%` }}
                            />
                            <div className="flex justify-between mt-2 text-[10px] font-display tracking-widest text-[#2D2460]">
                                <span>0</span>
                                <span>10</span>
                            </div>
                        </div>
                    </div>

                    {/* ── SORT ── */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-[#F0C040]" />
                            <span className="text-[11px] font-display tracking-[0.3em] uppercase text-[#7B6BAA]">Сортиране</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {SORT_OPTIONS.map(({ value, label, Icon, hasDir }) => {
                                const isActive = currentSort === value;
                                const isDesc = currentOrder !== 'asc';
                                const DirIcon = isDesc ? ArrowDown : ArrowUp;
                                return (
                                    <button
                                        key={value}
                                        onClick={() => {
                                            if (isActive && hasDir) {
                                                // already active → flip direction only
                                                onFilterChange('order', isDesc ? 'asc' : 'desc');
                                            } else if (hasDir) {
                                                // activate + set default direction in ONE push
                                                onBatchChange({ sort: value, order: 'desc' });
                                            } else {
                                                onFilterChange('sort', value);
                                            }
                                        }}
                                        className={`
                                            flex flex-col items-center justify-center gap-2
                                            py-3 rounded-xl text-[10px] font-display tracking-widest uppercase
                                            border transition-all duration-200 relative
                                            ${isActive
                                                ? 'bg-[#F0C040]/10 border-[#F0C040]/50 text-[#F0C040] shadow-[0_0_16px_rgba(240,192,64,0.15)]'
                                                : 'bg-[#1A1828] border-[#2D2460]/20 text-[#7B6BAA] hover:border-[#2D2460]/60 hover:text-[#F5F0E8]'
                                            }
                                        `}
                                    >
                                        <div className="relative">
                                            <Icon className="h-4 w-4" />
                                            {isActive && hasDir && (
                                                <DirIcon className="absolute -top-1.5 -right-2.5 h-3 w-3 text-[#F0C040]" />
                                            )}
                                        </div>
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── GENRE PILLS ── */}
                    {categories.length > 0 && (
                        <div className="md:col-span-3 space-y-4">
                            <div className="flex items-center gap-2">
                                <LayoutGrid className="h-4 w-4 text-[#F0C040]" />
                                <span className="text-[11px] font-display tracking-[0.3em] uppercase text-[#7B6BAA]">Жанр</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => onFilterChange('category', 'all')}
                                    className={`
                                        px-4 py-2 rounded-xl text-[11px] font-display tracking-widest uppercase transition-all duration-200 border
                                        ${currentCategory === 'all'
                                            ? 'bg-[#F0C040]/10 border-[#F0C040]/50 text-[#F0C040] shadow-[0_0_16px_rgba(240,192,64,0.15)]'
                                            : 'bg-[#1A1828] border-[#2D2460]/20 text-[#7B6BAA] hover:border-[#2D2460]/60 hover:text-[#F5F0E8]'
                                        }
                                    `}
                                >
                                    Всички
                                </button>
                                {categories.map(cat => {
                                    const isActive = currentCategory === cat.slug;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => onFilterChange('category', isActive ? 'all' : cat.slug)}
                                            className={`
                                                px-4 py-2 rounded-xl text-[11px] font-display tracking-widest uppercase transition-all duration-200 border
                                                ${isActive
                                                    ? 'bg-[#F0C040]/10 border-[#F0C040]/50 text-[#F0C040] shadow-[0_0_16px_rgba(240,192,64,0.15)]'
                                                    : 'bg-[#1A1828] border-[#2D2460]/20 text-[#7B6BAA] hover:border-[#2D2460]/60 hover:text-[#F5F0E8]'
                                                }
                                            `}
                                        >
                                            {cat.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ── CLEAR ── */}
                    {hasFilters && (
                        <div className={categories.length > 0 ? 'md:col-span-3' : 'md:col-span-3'}>
                            <button
                                onClick={onClear}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E53935]/5 border border-[#E53935]/20 text-[#E53935] text-[11px] font-display tracking-[0.2em] uppercase hover:bg-[#E53935]/10 hover:border-[#E53935]/40 transition-all group"
                            >
                                <RotateCcw className="h-3.5 w-3.5 group-hover:rotate-[-45deg] transition-transform" />
                                Изчисти всички
                            </button>
                        </div>
                    )}
                </div>

                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#2D2460]/30 to-transparent" />
            </div>
        </div>
    );
}
