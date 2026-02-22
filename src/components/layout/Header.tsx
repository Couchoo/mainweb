'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Search, LogOut, Bookmark, Gem, LayoutDashboard, User, Clock, Play, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NAVBAR_ORDER, GENRE_MAPPING } from '@/lib/genre-mapping';
import { getTranslation, Locale } from '@/lib/i18n';
import { prisma } from '@/lib/db';

import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
    locale?: Locale;
}

export function Header({ locale = 'bg' }: HeaderProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const t = (key: any) => getTranslation(key, locale);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [categories, setCategories] = useState<{ id: number; name: string; slug: string }[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Fetch categories
    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch(`/api/categories`);
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error('Failed to fetch categories');
            }
        }
        fetchCategories();
    }, [locale]);

    // Autocomplete search with debounce
    useEffect(() => {
        if (searchQuery.length < 2) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
                if (res.ok) {
                    const data = await res.json();
                    setSearchResults(data.results || []);
                    setShowResults(true);
                }
            } catch (error) {
                console.error('Search failed:', error);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsMenuOpen(false);
            setShowResults(false);
        }
    };

    const selectMovie = (slug: string) => {
        router.push(`/movies/${slug}`);
        setSearchQuery('');
        setShowResults(false);
        setIsMenuOpen(false);
    };

    const mainOrdered = NAVBAR_ORDER.map(orderName => {
        return categories.find(c =>
            (c as any).nameEN === orderName ||
            GENRE_MAPPING[orderName] === c.name
        );
    }).filter(Boolean) as { id: number; name: string; slug: string; nameEN?: string }[];

    const otherCategories = categories.filter(c =>
        !mainOrdered.some(m => m.id === c.id)
    ).sort((a, b) => a.name.localeCompare(b.name));

    const getCategoryDisplayName = (cat: any) => {
        const enKey = (cat as any).nameEN || Object.keys(GENRE_MAPPING).find(k => GENRE_MAPPING[k] === cat.name);
        return enKey ? t(enKey) : cat.name;
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-secondary bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                {/* Left Zone: Logo & Mobile Menu */}
                <div className="flex items-center gap-4 lg:gap-8 flex-1">
                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        {mounted && (
                            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-brand-warmCream">
                                        <Menu className="h-6 w-6" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[300px] border-secondary bg-brand-midnight">
                                    <SheetHeader>
                                        <SheetTitle className="text-left flex items-center gap-3">
                                            <img src="/brand/couchoo-wordmark-dark.png" alt="Couchoo" className="h-8 w-auto" />
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="mt-8 space-y-4">
                                        <form onSubmit={handleSearch} className="mb-6">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    type="search"
                                                    placeholder={t('search')}
                                                    className="pl-10 h-11 bg-brand-deepNight/50 border-brand-royalPurple/30 rounded-2xl focus:ring-brand-cinemaGold/50 transition-all font-body"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />
                                            </div>
                                        </form>
                                        <nav className="flex flex-col gap-2">
                                            <Link
                                                href="/"
                                                className="px-4 py-3 text-sm font-semibold hover:bg-brand-royalPurple/20 text-brand-warmCream rounded-xl transition-all flex items-center gap-3 font-display tracking-widest uppercase"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <div className="h-2 w-2 rounded-full bg-brand-cinemaGold animate-pulse" />
                                                {t('home')}
                                            </Link>

                                            {/* Mobile VIP/Upgrade Button */}
                                            {session && !['VIP', 'ADMIN', 'SUPER_ADMIN'].includes((session.user as any)?.role) ? (
                                                <Link
                                                    href="/vip"
                                                    className="flex items-center gap-3 px-4 py-4 rounded-2xl text-white font-extrabold bg-gradient-to-r from-brand-playRed to-brand-playRed/80 shadow-lg shadow-brand-playRed/20 mb-4 transition-transform active:scale-95"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <Gem className="h-6 w-6 animate-pulse" />
                                                    <div className="flex flex-col font-display tracking-wider">
                                                        <span className="leading-tight text-lg">{t('upgradeToVip')}</span>
                                                        <span className="text-[10px] opacity-70 uppercase tracking-[0.2em] font-bold">Premium Features</span>
                                                    </div>
                                                </Link>
                                            ) : (
                                                <Link
                                                    href="/vip"
                                                    className="flex items-center gap-3 px-4 py-4 rounded-2xl text-brand-cinemaGold font-bold bg-brand-cinemaGold/10 border border-brand-cinemaGold/20 mb-4 font-display tracking-widest uppercase"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <Gem className="h-5 w-5" />
                                                    {t('vipAccount')}
                                                </Link>
                                            )}
                                            <div className="pt-2 pb-1 px-4 text-[10px] font-bold text-brand-softLavender uppercase tracking-[0.3em] font-display">
                                                {t('categories')}
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {mainOrdered.map((cat) => (
                                                    <Link
                                                        key={cat.slug}
                                                        href={`/category/${cat.slug}`}
                                                        className="px-4 py-2 text-xs font-semibold text-brand-warmCream/70 hover:text-brand-warmCream hover:bg-brand-royalPurple/30 rounded-xl transition-all font-display tracking-widest uppercase"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        {getCategoryDisplayName(cat)}
                                                    </Link>
                                                ))}
                                            </div>
                                        </nav>
                                    </div>

                                    {/* Mobile Friendly Chouchoo Message */}
                                    <div className="absolute bottom-10 left-6 right-6 p-4 rounded-3xl bg-brand-royalPurple/10 border border-brand-royalPurple/20 flex items-center gap-3">
                                        <img src="/brand/couchoo-icon-64.png" className="w-10 h-10 object-contain" alt="Chouchoo" />
                                        <p className="text-[11px] text-brand-softLavender font-medium italic">
                                            "Хей! Настани се удобно на дивана..."
                                        </p>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        )}
                    </div>

                    {/* Logo & Navbar Mascot */}
                    <Link href="/" className="flex items-center group pl-2">
                        <img
                            src="/brand/couchoo-wordmark-dark.png"
                            className="h-8 md:h-10 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(240,192,64,0.3)] filter"
                            alt="Couchoo"
                        />
                    </Link>
                </div>

                {/* Center Zone: Navigation */}
                <nav className="hidden xl:flex items-center justify-center space-x-1 flex-[2]">
                    {mainOrdered.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            className="px-3 py-1.5 text-[13px] font-bold text-brand-warmCream/60 hover:text-brand-cinemaGold hover:bg-brand-royalPurple/20 rounded-xl transition-all whitespace-nowrap font-display tracking-widest uppercase"
                        >
                            {getCategoryDisplayName(cat)}
                        </Link>
                    ))}
                    {otherCategories.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="px-3 py-1.5 text-[13px] font-bold text-brand-warmCream/60 hover:text-brand-cinemaGold hover:bg-brand-royalPurple/20 rounded-xl transition-all font-display tracking-widest uppercase outline-none">
                                {t('more')}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="max-h-[70vh] overflow-y-auto bg-brand-deepNight border-brand-royalPurple/30 rounded-2xl p-2 shadow-2xl">
                                {otherCategories.map((cat) => (
                                    <DropdownMenuItem key={cat.slug} asChild className="rounded-xl focus:bg-brand-royalPurple/40">
                                        <Link href={`/category/${cat.slug}`} className="font-display tracking-widest uppercase text-xs">
                                            {getCategoryDisplayName(cat)}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    <div className="w-[1px] h-4 bg-brand-royalPurple/30 mx-2" />

                    <Link
                        href="/cinema"
                        className="px-5 py-1.5 text-[13px] font-bold text-white bg-brand-playRed hover:bg-brand-playRed/90 rounded-2xl transition-all uppercase font-display tracking-[0.1em] flex items-center gap-2 group shadow-lg shadow-brand-playRed/10 active:scale-95"
                    >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        {t('home')}
                    </Link>
                </nav>

                {/* Right Zone: Search & User */}
                <div className="flex items-center justify-end space-x-2 lg:space-x-4 flex-1">
                    <LanguageSwitcher currentLocale={locale} />

                    {/* Search - Desktop */}
                    <form onSubmit={handleSearch} className="hidden lg:block relative">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-softLavender group-focus-within:text-brand-cinemaGold transition-colors" />
                            <Input
                                type="search"
                                placeholder={t('search')}
                                className="w-[120px] xl:w-[180px] pl-10 h-10 bg-brand-deepNight/50 border-brand-royalPurple/30 rounded-2xl focus:w-[220px] transition-all focus:ring-brand-cinemaGold/30 font-body text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => searchResults.length > 0 && setShowResults(true)}
                                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                            />
                        </div>

                        {/* Autocomplete Dropdown */}
                        {showResults && searchResults.length > 0 && (
                            <div className="absolute top-full mt-3 right-0 w-[350px] bg-brand-midnight/95 backdrop-blur-xl border border-brand-royalPurple/30 rounded-3xl shadow-2xl z-50 overflow-hidden ring-1 ring-white/5">
                                <div className="p-3 border-b border-brand-royalPurple/20 flex items-center justify-between">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-brand-softLavender ml-2">Резултати</span>
                                    <img src="/brand/couchoo-icon-32.png" className="h-5 w-auto opacity-50" alt="" />
                                </div>
                                <div className="max-h-[400px] overflow-y-auto p-1">
                                    {searchResults.map((movie) => (
                                        <button
                                            key={movie.id}
                                            type="button"
                                            onClick={() => selectMovie(movie.slug)}
                                            className="w-full flex items-center gap-4 p-2.5 hover:bg-brand-royalPurple/20 transition-all text-left rounded-2xl group/item"
                                        >
                                            {movie.posterUrl ? (
                                                <div className="relative">
                                                    <img
                                                        src={movie.posterUrl}
                                                        alt={movie.titleEN || movie.titleBG}
                                                        className="w-11 h-16 object-cover rounded-xl shadow-md border border-white/5"
                                                    />
                                                    <div className="absolute inset-0 bg-brand-cinemaGold/10 opacity-0 group-hover/item:opacity-100 transition-opacity rounded-xl" />
                                                </div>
                                            ) : (
                                                <div className="w-11 h-16 bg-brand-deepNight rounded-xl flex items-center justify-center border border-brand-royalPurple/20">
                                                    <Search className="h-5 w-5 opacity-30" />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="font-bold text-sm truncate text-brand-warmCream group-hover/item:text-brand-cinemaGold transition-colors">
                                                    {movie.titleEN || movie.titleBG}
                                                </div>
                                                <div className="text-[11px] text-brand-softLavender flex items-center gap-2 mt-1">
                                                    <span className="bg-brand-deepNight px-2 py-0.5 rounded-md border border-brand-royalPurple/20">{movie.year}</span>
                                                    {movie.rating && (
                                                        <span className="flex items-center gap-1 text-brand-cinemaGold font-bold">
                                                            <Star className="w-3 h-3 fill-current" /> {movie.rating}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </form>

                    {/* User Menu */}
                    {session ? (
                        <div className="flex items-center gap-2 sm:gap-4">
                            {mounted && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-2.5 p-1 pl-1 pr-3 rounded-2xl bg-brand-deepNight/40 border border-brand-royalPurple/30 hover:bg-brand-royalPurple/20 hover:border-brand-cinemaGold/30 transition-all group outline-none">
                                            <div className="relative">
                                                <Avatar className="h-9 w-9 border-2 border-brand-deepNight rounded-xl shadow-inner group-hover:scale-105 transition-transform">
                                                    <AvatarImage src={session.user?.image || undefined} className="rounded-xl" />
                                                    <AvatarFallback className="bg-brand-royalPurple/40 text-brand-cinemaGold text-xs font-bold rounded-xl">
                                                        {session.user?.email?.[0].toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                {['VIP', 'ADMIN', 'SUPER_ADMIN'].includes((session.user as any)?.role) && (
                                                    <div className="absolute -top-1 -right-1 bg-brand-cinemaGold text-brand-midnight rounded-full h-4.5 w-4.5 flex items-center justify-center shadow-lg border-2 border-brand-midnight">
                                                        <Gem className="h-2.5 w-2.5" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="hidden sm:flex flex-col items-start leading-tight">
                                                <span className="text-xs font-bold truncate max-w-[90px] text-brand-warmCream">
                                                    {session.user?.name || session.user?.email?.split('@')[0]}
                                                </span>
                                                <span className={`text-[9px] uppercase tracking-wider font-display font-bold ${['VIP', 'ADMIN', 'SUPER_ADMIN'].includes((session.user as any)?.role) ? 'text-brand-cinemaGold' : 'text-brand-softLavender'}`}>
                                                    {['VIP', 'ADMIN', 'SUPER_ADMIN'].includes((session.user as any)?.role) ? t('vipAccount') : 'Standard'}
                                                </span>
                                            </div>
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-64 p-2.5 border-brand-royalPurple/30 bg-brand-midnight/95 backdrop-blur-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] rounded-[2rem] overflow-hidden">
                                        <div className="p-4 mb-2 rounded-3xl bg-brand-deepNight/50 border border-brand-royalPurple/20 flex flex-col gap-1 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-2 opacity-5 scale-150 transition-transform group-hover:scale-175 duration-700">
                                                <img src="/brand/couchoo-icon-64.png" alt="" />
                                            </div>
                                            <p className="text-[10px] font-bold text-brand-softLavender uppercase tracking-[0.2em] font-display">{t('account')}</p>
                                            <p className="font-bold truncate text-brand-warmCream text-sm">{session.user?.email}</p>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <DropdownMenuItem asChild className="rounded-2xl cursor-pointer focus:bg-brand-royalPurple/30 py-2.5">
                                                <Link href="/profile" className="flex items-center text-sm font-semibold">
                                                    <User className="mr-3 h-4 w-4 text-brand-softLavender" />
                                                    {t('profile')}
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild className="rounded-2xl cursor-pointer focus:bg-brand-royalPurple/30 py-2.5">
                                                <Link href="/watchlist" className="flex items-center text-sm font-semibold">
                                                    <Bookmark className="mr-3 h-4 w-4 text-brand-softLavender" />
                                                    {t('watchlist')}
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild className="rounded-2xl cursor-pointer text-brand-cinemaGold focus:text-brand-cinemaGold focus:bg-brand-cinemaGold/10 py-2.5">
                                                <Link href="/vip" className="flex items-center text-sm font-bold">
                                                    <Gem className="mr-3 h-4 w-4" />
                                                    {['VIP', 'ADMIN', 'SUPER_ADMIN'].includes((session.user as any)?.role) ? t('vipAccount') : t('upgradeToVip')}
                                                </Link>
                                            </DropdownMenuItem>

                                            {((session.user as any)?.role === 'ADMIN' || (session.user as any)?.role === 'SUPER_ADMIN') && (
                                                <DropdownMenuItem asChild className="rounded-2xl cursor-pointer text-blue-400 focus:text-blue-400 focus:bg-blue-400/10 py-2.5">
                                                    <Link href="/admin" className="flex items-center text-sm font-semibold">
                                                        <LayoutDashboard className="mr-3 h-4 w-4" />
                                                        {t('adminPanel')}
                                                    </Link>
                                                </DropdownMenuItem>
                                            )}
                                        </div>

                                        <DropdownMenuSeparator className="my-2 bg-brand-royalPurple/20" />

                                        <DropdownMenuItem onClick={() => signOut()} className="rounded-2xl cursor-pointer text-brand-playRed focus:text-white focus:bg-brand-playRed transition-all py-2.5 mb-1">
                                            <LogOut className="mr-3 h-4 w-4" />
                                            <span className="font-bold">{t('logout')}</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Button asChild variant="ghost" className="hidden sm:inline-flex rounded-2xl text-brand-softLavender hover:text-brand-warmCream hover:bg-brand-royalPurple/20 font-display tracking-widest uppercase text-xs">
                                <Link href="/login">{t('login')}</Link>
                            </Button>
                            <Button asChild className="bg-brand-playRed text-white font-bold hover:bg-brand-playRed/90 shadow-lg shadow-brand-playRed/10 transition-all rounded-2xl px-6 font-display tracking-widest uppercase text-xs h-10">
                                <Link href="/register">{t('register')}</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header >
    );
}

