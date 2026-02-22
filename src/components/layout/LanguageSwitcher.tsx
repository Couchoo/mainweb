'use client';

import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Locale } from '@/lib/i18n';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
    currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
    const router = useRouter();

    const setLocale = (locale: Locale) => {
        // Set cookie
        document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`; // 1 year
        // Refresh to apply changes
        router.refresh();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 group px-4 py-1.5 rounded-xl bg-white/5 border border-white/5 hover:border-brand-cinemaGold/30 transition-all">
                    <span className="text-sm grayscale group-hover:grayscale-0 transition-all">
                        {currentLocale === 'bg' ? '🇧🇬' : '🇺🇸'}
                    </span>
                    <span className="font-bold uppercase text-[10px] tracking-widest text-brand-softLavender group-hover:text-brand-warmCream transition-colors">
                        {currentLocale === 'bg' ? 'Български' : 'English'}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-brand-midnight/95 backdrop-blur-2xl border-brand-royalPurple/20 min-w-[160px] rounded-[1.5rem] p-2 shadow-2xl">
                <DropdownMenuItem
                    onClick={() => setLocale('bg')}
                    className="flex items-center gap-3 cursor-pointer py-3 rounded-xl focus:bg-brand-royalPurple/20 group"
                >
                    <span className="text-xl grayscale group-hover:grayscale-0 transition-all">🇧🇬</span>
                    <span className="font-bold text-sm text-brand-softLavender group-hover:text-brand-warmCream">Български</span>
                    {currentLocale === 'bg' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-cinemaGold shadow-[0_0_10px_rgba(240,192,64,0.5)]" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setLocale('en')}
                    className="flex items-center gap-3 cursor-pointer py-3 rounded-xl focus:bg-brand-royalPurple/20 group"
                >
                    <span className="text-xl grayscale group-hover:grayscale-0 transition-all">🇺🇸</span>
                    <span className="font-bold text-sm text-brand-softLavender group-hover:text-brand-warmCream">English</span>
                    {currentLocale === 'en' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-cinemaGold shadow-[0_0_10px_rgba(240,192,64,0.5)]" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
