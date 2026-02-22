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
                <Button variant="ghost" size="sm" className="flex items-center gap-2 group px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-cinemaGold/40 transition-all shadow-lg active:scale-95">
                    <span className="text-base drop-shadow-sm">
                        {currentLocale === 'bg' ? '🇧🇬' : '🇺🇸'}
                    </span>
                    <span className="font-bold uppercase text-[10px] tracking-widest text-brand-softLavender group-hover:text-brand-warmCream transition-colors">
                        {currentLocale === 'bg' ? 'Български' : 'English'}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-brand-midnight/98 backdrop-blur-3xl border-brand-royalPurple/20 min-w-[180px] rounded-[1.5rem] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                <DropdownMenuItem
                    onClick={() => setLocale('bg')}
                    className="flex items-center gap-3 cursor-pointer py-3.5 rounded-xl focus:bg-brand-royalPurple/20 group"
                >
                    <span className="text-2xl drop-shadow-md">🇧🇬</span>
                    <span className="font-bold text-sm text-brand-softLavender group-hover:text-brand-warmCream">Български</span>
                    {currentLocale === 'bg' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-cinemaGold shadow-[0_0_12px_rgba(240,192,64,0.6)]" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setLocale('en')}
                    className="flex items-center gap-3 cursor-pointer py-3.5 rounded-xl focus:bg-brand-royalPurple/20 group"
                >
                    <span className="text-2xl drop-shadow-md">🇺🇸</span>
                    <span className="font-bold text-sm text-brand-softLavender group-hover:text-brand-warmCream">English</span>
                    {currentLocale === 'en' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-cinemaGold shadow-[0_0_12px_rgba(240,192,64,0.6)]" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
