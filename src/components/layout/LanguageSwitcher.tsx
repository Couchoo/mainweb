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
                <Button variant="ghost" size="sm" className="flex items-center gap-2 group px-4 py-1.5 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all">
                    <Globe className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-black uppercase text-[11px] tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                        {currentLocale === 'bg' ? 'Български' : 'English'}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background border-secondary min-w-[120px]">
                <DropdownMenuItem
                    onClick={() => setLocale('bg')}
                    className="flex items-center gap-3 cursor-pointer py-2.5"
                >
                    <span className="text-xl">🇧🇬</span>
                    <span className="font-medium">Български</span>
                    {currentLocale === 'bg' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setLocale('en')}
                    className="flex items-center gap-3 cursor-pointer py-2.5"
                >
                    <span className="text-xl">🇺🇸</span>
                    <span className="font-medium">English</span>
                    {currentLocale === 'en' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
