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
                <Button variant="ghost" size="sm" className="flex items-center gap-2 group px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-brand-cinemaGold/40 transition-all shadow-lg active:scale-95 group">
                    <Globe className="w-3.5 h-3.5 text-brand-softLavender group-hover:text-brand-cinemaGold transition-colors" />
                    <span className="font-bold uppercase text-[10px] tracking-widest text-brand-softLavender group-hover:text-brand-warmCream transition-colors">
                        {currentLocale === 'bg' ? 'Български' : 'English'}
                    </span>
                    <span className="text-sm drop-shadow-sm ml-1">
                        {currentLocale === 'bg' ? '🇧🇬' : '🇺🇸'}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-brand-midnight/98 backdrop-blur-3xl border-brand-royalPurple/20 min-w-[200px] rounded-[2rem] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] translate-y-2">
                <DropdownMenuItem
                    onClick={() => setLocale('bg')}
                    className="flex items-center gap-4 cursor-pointer py-4 rounded-2xl focus:bg-brand-royalPurple/20 group/item transition-all"
                >
                    <div className="w-10 h-10 rounded-xl bg-brand-royalPurple/10 flex items-center justify-center text-xl shadow-inner border border-white/5 group-hover/item:scale-110 transition-transform">
                        🇧🇬
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm text-brand-softLavender group-hover/item:text-brand-warmCream">Български</span>
                        <span className="text-[10px] text-brand-softLavender/40 uppercase tracking-tighter">Bulgarian</span>
                    </div>
                    {currentLocale === 'bg' && <div className="ml-auto w-2 h-2 rounded-full bg-brand-cinemaGold shadow-[0_0_15px_rgba(240,192,64,0.7)]" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setLocale('en')}
                    className="flex items-center gap-4 cursor-pointer py-4 rounded-2xl focus:bg-brand-royalPurple/20 group/item transition-all"
                >
                    <div className="w-10 h-10 rounded-xl bg-brand-royalPurple/10 flex items-center justify-center text-xl shadow-inner border border-white/5 group-hover/item:scale-110 transition-transform">
                        🇺🇸
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm text-brand-softLavender group-hover/item:text-brand-warmCream">English</span>
                        <span className="text-[10px] text-brand-softLavender/40 uppercase tracking-tighter">English</span>
                    </div>
                    {currentLocale === 'en' && <div className="ml-auto w-2 h-2 rounded-full bg-brand-cinemaGold shadow-[0_0_15px_rgba(240,192,64,0.7)]" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
