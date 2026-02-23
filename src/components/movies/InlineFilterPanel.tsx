'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCcw, ChevronDown, Calendar, Star, LayoutGrid, ArrowUpDown, User, Users } from 'lucide-react';
import { getTranslation, Locale } from '@/lib/i18n';

const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1970;

const SORT_OPTIONS = [
    { value: 'newest', label: 'Нови', icon: '✦' },
    { value: 'oldest', label: 'Стари', icon: '⌛' },
    { value: 'views', label: 'Популярни', icon: '🔥' },
    { value: 'rating', label: 'Рейтинг', icon: '⭐' },
    { value: 'title', label: 'А-Я', icon: '◈' },
];

interface InlineFilterPanelProps {
    isOpen: boolean;
    locale: Locale;
    currentYear: string;
    currentRating: string;
    currentSort: string;
    categories?: { id: number; name: string; slug: string }[];
    currentCategory: string;
    currentCast: string;
    currentDirector: string;
    onFilterChange: (key: string, value: string) => void;
    onClear: () => void;
    hasFilters: boolean;
}

export function InlineFilterPanel({
    isOpen,
    locale,
    currentYear,
    currentRating,
    currentSort,
    categories = [],
    currentCategory,
    currentCast,
    currentDirector,
    onFilterChange,
    onClear,
    hasFilters,
}: InlineFilterPanelProps) {
    const t = (key: any) => getTranslation(key, locale);

    // Local slider state (commit to URL only on mouse/touch up)
    const [yearVal, setYearVal] = useState<number>(
        currentYear !== 'all' ? parseInt(currentYear) : MIN_YEAR
    );
    const [ratingVal, setRatingVal] = useState<number>(
        currentRating !== 'all' ? parseFloat(currentRating) : 0
    );
    const [castVal, setCastVal] = useState(currentCast);
    const [directorVal, setDirectorVal] = useState(currentDirector);

    // Sync from URL when filters cleared externally
    useEffect(() => {
        setYearVal(currentYear !== 'all' ? parseInt(currentYear) : MIN_YEAR);
    }, [currentYear]);

    useEffect(() => {
        setRatingVal(currentRating !== 'all' ? parseFloat(currentRating) : 0);
    }, [currentRating]);

    useEffect(() => { setCastVal(currentCast); }, [currentCast]);
    useEffect(() => { setDirectorVal(currentDirector); }, [currentDirector]);

    // Commit year slider
    const commitYear = useCallback(() => {
        onFilterChange('year', yearVal === MIN_YEAR ? 'all' : String(yearVal));
    }, [yearVal, onFilterChange]);

    // Commit rating slider
    const commitRating = useCallback(() => {
        onFilterChange('rating', ratingVal === 0 ? 'all' : String(ratingVal));
    }, [ratingVal, onFilterChange]);

    // Debounced text inputs
    const castTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dirTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleCastChange = (v: string) => {
        setCastVal(v);
        if (castTimer.current) clearTimeout(castTimer.current);
        castTimer.current = setTimeout(() => onFilterChange('cast', v), 600);
    };

    const handleDirectorChange = (v: string) => {
        setDirectorVal(v);
        if (dirTimer.current) clearTimeout(dirTimer.current);
        dirTimer.current = setTimeout(() => onFilterChange('director', v), 600);
    };

    // CSS custom property for slider fill
    const yearPct = ((yearVal - MIN_YEAR) / (CURRENT_YEAR - MIN_YEAR)) * 100;
    const ratingPct = (ratingVal / 10) * 100;

    return (
        <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{
                maxHeight: isOpen ? '600px' : '0px',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
            }}
        >
            <div className="mt-4 rounded-3xl bg-[#0F0E17]/95 backdrop-blur-3xl border border-[#2D2460]/40 shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden">
                {/* Gold top accent line */}
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#F0C040] to-transparent opacity-60" />

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

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
                                        <span className="text-lg font-display tracking-widest text-[#F0C040] font-black">{ratingVal.toFixed(1)}</span>
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

                    {/* ── SORT TABS ── */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <ArrowUpDown className="h-4 w-4 text-[#F0C040]" />
                            <span className="text-[11px] font-display tracking-[0.3em] uppercase text-[#7B6BAA]">Сортиране</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {SORT_OPTIONS.map(opt => {
                                const isActive = currentSort === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        onClick={() => onFilterChange('sort', opt.value)}
                                        className={`
                                            px-4 py-2 rounded-xl text-[11px] font-display tracking-widest uppercase
                                            flex items-center gap-1.5 transition-all duration-200
                                            ${isActive
                                                ? 'bg-[#F0C040]/10 border border-[#F0C040]/50 text-[#F0C040] shadow-[0_0_16px_rgba(240,192,64,0.2)]'
                                                : 'bg-[#1A1828] border border-[#2D2460]/20 text-[#7B6BAA] hover:border-[#2D2460]/60 hover:text-[#F5F0E8]'
                                            }
                                        `}
                                    >
                                        <span>{opt.icon}</span>
                                        {opt.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── GENRE PILLS ── */}
                    {categories.length > 0 && (
                        <div className="md:col-span-2 xl:col-span-3 space-y-4">
                            <div className="flex items-center gap-2">
                                <LayoutGrid className="h-4 w-4 text-[#F0C040]" />
                                <span className="text-[11px] font-display tracking-[0.3em] uppercase text-[#7B6BAA]">Жанр</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => onFilterChange('category', 'all')}
                                    className={`
                                        px-4 py-2 rounded-xl text-[11px] font-display tracking-widest uppercase transition-all duration-200
                                        ${currentCategory === 'all'
                                            ? 'bg-[#F0C040]/10 border border-[#F0C040]/50 text-[#F0C040] shadow-[0_0_16px_rgba(240,192,64,0.2)]'
                                            : 'bg-[#1A1828] border border-[#2D2460]/20 text-[#7B6BAA] hover:border-[#2D2460]/60 hover:text-[#F5F0E8]'
                                        }
                                    `}
                                >
                                    ✦ Всички
                                </button>
                                {categories.map(cat => {
                                    const isActive = currentCategory === cat.slug;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => onFilterChange('category', isActive ? 'all' : cat.slug)}
                                            className={`
                                                px-4 py-2 rounded-xl text-[11px] font-display tracking-widest uppercase transition-all duration-200
                                                ${isActive
                                                    ? 'bg-[#F0C040]/10 border border-[#F0C040]/50 text-[#F0C040] shadow-[0_0_16px_rgba(240,192,64,0.2)]'
                                                    : 'bg-[#1A1828] border border-[#2D2460]/20 text-[#7B6BAA] hover:border-[#2D2460]/60 hover:text-[#F5F0E8]'
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

                    {/* ── DIRECTOR & CAST ── */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-[#F0C040]" />
                            <span className="text-[11px] font-display tracking-[0.3em] uppercase text-[#7B6BAA]">Режисьор</span>
                        </div>
                        <input
                            type="text"
                            value={directorVal}
                            onChange={e => handleDirectorChange(e.target.value)}
                            placeholder="Търси режисьор..."
                            className="w-full bg-[#1A1828] border border-[#2D2460]/30 rounded-xl px-4 py-3 text-sm text-[#F5F0E8] placeholder-[#2D2460]/60 outline-none focus:border-[#F0C040]/40 focus:shadow-[0_0_12px_rgba(240,192,64,0.1)] transition-all font-body"
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-[#F0C040]" />
                            <span className="text-[11px] font-display tracking-[0.3em] uppercase text-[#7B6BAA]">В ролята</span>
                        </div>
                        <input
                            type="text"
                            value={castVal}
                            onChange={e => handleCastChange(e.target.value)}
                            placeholder="Търси актьор..."
                            className="w-full bg-[#1A1828] border border-[#2D2460]/30 rounded-xl px-4 py-3 text-sm text-[#F5F0E8] placeholder-[#2D2460]/60 outline-none focus:border-[#F0C040]/40 focus:shadow-[0_0_12px_rgba(240,192,64,0.1)] transition-all font-body"
                        />
                    </div>

                    {/* ── CLEAR ── */}
                    {hasFilters && (
                        <div className="flex items-end">
                            <button
                                onClick={onClear}
                                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E53935]/5 border border-[#E53935]/20 text-[#E53935] text-[11px] font-display tracking-[0.2em] uppercase hover:bg-[#E53935]/10 hover:border-[#E53935]/40 transition-all group"
                            >
                                <RotateCcw className="h-3.5 w-3.5 group-hover:rotate-[-45deg] transition-transform" />
                                Изчисти всички
                            </button>
                        </div>
                    )}
                </div>

                {/* Bottom gold line */}
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#2D2460]/40 to-transparent" />
            </div>
        </div>
    );
}
