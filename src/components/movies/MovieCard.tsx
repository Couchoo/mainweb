'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Star } from 'lucide-react';
import { getTranslation, Locale } from '@/lib/i18n';

interface MovieCardProps {
    movie: {
        id: number;
        titleBG: string;
        titleEN: string;
        displayTitle?: string;
        slug: string;
        year: number;
        posterUrl: string;
        isHD: boolean;
        rating?: number | null;
    };
    locale?: Locale;
}

export function MovieCard({ movie, locale = 'bg' }: MovieCardProps) {
    const t = (key: any) => getTranslation(key, locale);
    const title = movie.displayTitle || movie.titleBG;

    return (
        <Link href={`/movies/${movie.slug}`} className="group block">
            <Card suppressHydrationWarning className="relative overflow-visible border-0 bg-transparent transition-all duration-500 group-hover:-translate-y-3">
                <div suppressHydrationWarning className="aspect-[2/3] relative rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-brand-royalPurple/20 transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.8)] group-hover:border-brand-cinemaGold/40">
                    <Image
                        src={movie.posterUrl}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Hover Overlay */}
                    <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-t from-brand-midnight via-brand-midnight/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <div suppressHydrationWarning className="flex flex-col items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="h-16 w-16 rounded-full bg-brand-playRed flex items-center justify-center shadow-2xl shadow-brand-playRed/50 ring-4 ring-white/10">
                                <Play className="h-7 w-7 fill-white text-white ml-1" />
                            </div>
                            <span className="text-sm font-display tracking-widest uppercase text-white drop-shadow-md">{t('watchNow')}</span>
                        </div>
                    </div>

                    {/* Badges */}
                    <div suppressHydrationWarning className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                        {movie.isHD && (
                            <div suppressHydrationWarning className="px-3 py-1 bg-brand-cinemaGold text-brand-midnight text-[10px] font-bold rounded-lg uppercase tracking-widest shadow-lg">
                                {t('hd') || 'HD'}
                            </div>
                        )}
                        {movie.rating && (
                            <div className="px-3 py-1 bg-brand-midnight/80 backdrop-blur-md border border-white/10 text-brand-cinemaGold text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-lg">
                                <Star className="w-3 h-3 fill-current" /> {movie.rating.toFixed(1)}
                            </div>
                        )}
                    </div>

                    {/* Shadow Decorator */}
                    <div className="absolute -bottom-1 -left-1 -right-1 h-20 bg-gradient-to-t from-brand-midnight to-transparent pointer-events-none" />
                </div>

                {/* Info */}
                <div className="pt-5 px-1 space-y-1">
                    <h3 className="font-display text-xl tracking-wider text-brand-warmCream line-clamp-1 group-hover:text-brand-cinemaGold transition-colors">
                        {title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-brand-softLavender/60 uppercase tracking-widest">
                            {movie.year}
                        </span>
                        <div className="h-1 w-1 rounded-full bg-brand-royalPurple/40" />
                        <span className="text-[10px] font-bold text-brand-softLavender/40 uppercase tracking-[0.2em]">
                            Featured
                        </span>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

