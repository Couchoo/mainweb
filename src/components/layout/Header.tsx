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
import {
    Menu, Search, LogOut, Bookmark, User, Play, Star, Sword,
    Ghost, Heart, Smile, Rocket, Zap, Music, Skull,
    Clapperboard, Shield, History, Film, Trophy, Users,
    Monitor, Sparkles, Mic2, Compass, Waves, Flame, Camera,
    Crown, ChevronDown, Library, Hexagon, PieChart, CreditCard, Settings
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NAVBAR_ORDER, GENRE_MAPPING } from '@/lib/genre-mapping';
import { getTranslation, Locale } from '@/lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';

interface UserStats {
    watched: number;
    watchlist: number;
    collections: number;
    popcorn: number;
    xp: number;
    role: string;
}

interface HeaderProps {
    locale?: Locale;
}

export function Header({ locale: initialLocale = 'bg' }: HeaderProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const t = (key: any) => getTranslation(key, locale as Locale);
    const locale = initialLocale;
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [categories, setCategories] = useState<{ id: number; name: string; slug: string; _count?: { moviecategory: number } }[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [userStats, setUserStats] = useState<UserStats | null>(null);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catsRes, statsRes] = await Promise.all([
                    fetch('/api/categories'),
                    session ? fetch('/api/user/stats') : Promise.resolve(null)
                ]);

                if (catsRes.ok) {
                    const data = await catsRes.json();
                    setCategories(data);
                }

                if (statsRes && statsRes.ok) {
                    const stats = await statsRes.json();
                    setUserStats(stats);
                }
            } catch (error) {
                console.error("Error fetching header data:", error);
            }
        };
        fetchData();
    }, [session, locale]);

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
        }, 300);

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
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-500 ${isScrolled
                ? 'py-2'
                : 'py-4'
                }`}
        >
            <div className="container px-4">
                <nav className={`relative flex items-center justify-between transition-all duration-500 px-6 py-2.5 rounded-[2.5rem] border ${isScrolled
                    ? 'bg-brand-midnight/90 backdrop-blur-2xl border-brand-royalPurple/40 shadow-[0_0_40px_rgba(0,0,0,0.5)]'
                    : 'bg-brand-midnight/40 backdrop-blur-lg border-brand-royalPurple/10'
                    }`}>

                    {/* Left: Logo & Mobile Menu Trigger */}
                    <div className="flex items-center gap-1 sm:gap-4 flex-shrink-0">
                        <div className="xl:hidden">
                            {mounted && (
                                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-brand-warmCream rounded-full hover:bg-brand-royalPurple/20">
                                            <Menu className="h-5 w-5" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-[300px] border-brand-royalPurple/20 bg-brand-midnight p-0 overflow-hidden">
                                        <div className="p-6 border-b border-brand-royalPurple/10">
                                            <img src="/brand/couchoo-wordmark-dark.png" alt="Couchoo" className="h-8 w-auto mb-2" />
                                            <p className="text-[10px] text-brand-softLavender font-display tracking-[0.2em] font-bold uppercase opacity-40">Your Cinema Experience</p>
                                        </div>
                                        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-100px)]">
                                            <nav className="flex flex-col gap-1">
                                                <Link
                                                    href="/"
                                                    className="px-4 py-3 text-sm font-bold text-brand-warmCream hover:bg-brand-royalPurple/20 rounded-2xl transition-all flex items-center gap-3 font-display tracking-widest uppercase group"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <div className="h-2 w-2 rounded-full bg-brand-cinemaGold shadow-[0_0_10px_rgba(240,192,64,0.5)]" />
                                                    {t('home')}
                                                </Link>
                                                <Link
                                                    href="/cinema"
                                                    className="px-4 py-3 text-sm font-bold text-white bg-brand-playRed/10 hover:bg-brand-playRed/20 border border-brand-playRed/20 rounded-2xl transition-all flex items-center gap-3 font-display tracking-widest uppercase my-2"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <Play className="h-4 w-4 fill-current text-brand-playRed" />
                                                    {t('home')} (Live)
                                                </Link>
                                            </nav>
                                            <div className="space-y-4">
                                                <h4 className="px-4 text-[10px] font-bold text-brand-softLavender/40 uppercase tracking-[0.3em] font-display">Categories</h4>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {categories.map((cat) => (
                                                        <Link
                                                            key={cat.slug}
                                                            href={`/category/${cat.slug}`}
                                                            className="px-4 py-2 text-[11px] font-bold text-brand-warmCream/60 hover:text-brand-cinemaGold hover:bg-brand-royalPurple/10 rounded-xl transition-all font-display tracking-widest uppercase"
                                                            onClick={() => setIsMenuOpen(false)}
                                                        >
                                                            {getCategoryDisplayName(cat)}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            )}
                        </div>

                        <Link href="/" className="flex items-center group">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                src="/brand/couchoo-wordmark-dark.png"
                                className="h-6 sm:h-8 md:h-9 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(240,192,64,0.6)] brightness-0 invert"
                                alt="Couchoo"
                            />
                        </Link>
                    </div>

                    {/* Center: Desktop Navigation (Pill Style) */}
                    <div className="hidden xl:flex items-center bg-brand-deepNight/50 border border-brand-royalPurple/10 rounded-full px-2 py-1 gap-1">
                        {mainOrdered.slice(0, 6).map((cat) => {
                            const enName = (cat as any).nameEN ||
                                Object.keys(GENRE_MAPPING).find(k =>
                                    GENRE_MAPPING[k] === cat.name ||
                                    k.toLowerCase() === cat.name.toLowerCase()
                                ) ||
                                cat.name;
                            const urlSlug = enName.toLowerCase().replace(/\s+/g, '-');

                            return (
                                <Link
                                    key={cat.id}
                                    href={`/category/${urlSlug}`}
                                    className="px-4 py-2 text-[11px] font-bold text-brand-softLavender hover:text-brand-cinemaGold hover:bg-brand-royalPurple/20 rounded-full transition-all whitespace-nowrap font-display tracking-widest uppercase"
                                >
                                    {getCategoryDisplayName(cat)}
                                </Link>
                            );
                        })}
                        {otherCategories.length > 0 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="px-4 py-2 text-[11px] font-bold text-brand-softLavender hover:text-brand-cinemaGold hover:bg-brand-royalPurple/20 rounded-full transition-all font-display tracking-widest uppercase outline-none">
                                    {t('more')}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-brand-midnight/95 backdrop-blur-2xl border-brand-royalPurple/30 rounded-[2.5rem] p-4 shadow-2xl min-w-[420px] grid grid-cols-2 gap-2">
                                    <div className="col-span-2 px-3 py-2 border-b border-brand-royalPurple/10 mb-2">
                                        <span className="text-[9px] font-bold text-brand-cinemaGold uppercase tracking-[0.3em]">Explore Genres</span>
                                    </div>
                                    {otherCategories
                                        .sort((a, b) => getCategoryDisplayName(a).localeCompare(getCategoryDisplayName(b)))
                                        .map((cat) => {
                                            // Get English name for mapping (robust lookup)
                                            const enName = (cat as any).nameEN ||
                                                Object.keys(GENRE_MAPPING).find(k =>
                                                    GENRE_MAPPING[k] === cat.name ||
                                                    k.toLowerCase() === cat.name.toLowerCase()
                                                ) ||
                                                cat.name;

                                            // 1. Creative Icon Mapping (Unique for every genre)
                                            let CategoryIcon = Film;
                                            let accentColor = "from-brand-royalPurple/20";
                                            let tagline = `${cat._count?.moviecategory || 0} movies`;

                                            const searchName = enName.toLowerCase();

                                            if (searchName.includes('action')) { CategoryIcon = Sword; accentColor = "from-red-500/20"; }
                                            else if (searchName.includes('animation')) { CategoryIcon = Sparkles; accentColor = "from-amber-400/20"; }
                                            else if (searchName.includes('biography')) { CategoryIcon = User; accentColor = "from-blue-400/20"; }
                                            else if (searchName.includes('comedy')) { CategoryIcon = Smile; accentColor = "from-yellow-400/20"; }
                                            else if (searchName.includes('crime')) { CategoryIcon = Shield; accentColor = "from-zinc-500/20"; }
                                            else if (searchName.includes('documentary')) { CategoryIcon = Monitor; accentColor = "from-emerald-400/20"; }
                                            else if (searchName.includes('drama')) { CategoryIcon = Heart; accentColor = "from-indigo-400/20"; }
                                            else if (searchName.includes('family')) { CategoryIcon = Users; accentColor = "from-orange-400/20"; }
                                            else if (searchName.includes('fantasy')) { CategoryIcon = Zap; accentColor = "from-purple-400/20"; }
                                            else if (searchName.includes('history')) { CategoryIcon = History; accentColor = "from-stone-500/20"; }
                                            else if (searchName.includes('horror')) { CategoryIcon = Ghost; accentColor = "from-slate-700/30"; }
                                            else if (searchName.includes('music')) { CategoryIcon = Music; accentColor = "from-pink-400/20"; }
                                            else if (searchName.includes('musical')) { CategoryIcon = Mic2; accentColor = "from-fuchsia-400/20"; }
                                            else if (searchName.includes('mystery')) { CategoryIcon = Compass; accentColor = "from-teal-500/20"; }
                                            else if (searchName.includes('romance')) { CategoryIcon = Flame; accentColor = "from-rose-500/20"; }
                                            else if (searchName.includes('sci-fi')) { CategoryIcon = Rocket; accentColor = "from-cyan-400/20"; }
                                            else if (searchName.includes('sport')) { CategoryIcon = Trophy; accentColor = "from-green-500/20"; }
                                            else if (searchName.includes('thriller')) { CategoryIcon = Waves; accentColor = "from-blue-600/20"; }
                                            else if (searchName.includes('war')) { CategoryIcon = Skull; accentColor = "from-gray-700/30"; }
                                            else if (searchName.includes('western')) { CategoryIcon = Clapperboard; accentColor = "from-orange-600/20"; }

                                            // Canonical English slug for the URL
                                            const urlSlug = enName.toLowerCase().replace(/\s+/g, '-');

                                            return (
                                                <DropdownMenuItem key={cat.id} asChild className="rounded-[2rem] focus:bg-brand-royalPurple/20 p-2 cursor-pointer group/cat border border-white/5 hover:border-brand-royalPurple/40 transition-all active:scale-[0.98] relative overflow-hidden">
                                                    <Link href={`/category/${urlSlug}`} className="flex items-center gap-5 relative z-10 w-full">
                                                        {/* Innovative Banner Background Glow */}
                                                        <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} to-transparent opacity-0 group-hover/cat:opacity-100 transition-opacity duration-500`} />

                                                        <div className="w-12 h-12 rounded-2xl bg-brand-royalPurple/10 flex items-center justify-center text-brand-softLavender group-hover/cat:text-brand-cinemaGold group-hover/cat:bg-brand-royalPurple/30 transition-all shadow-xl border border-white/5 relative z-20">
                                                            <CategoryIcon className="w-6 h-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
                                                        </div>
                                                        <div className="flex flex-col relative z-20">
                                                            <span className="font-display tracking-[0.15em] uppercase text-[11px] font-black text-brand-warmCream group-hover/cat:text-white transition-colors">
                                                                {getCategoryDisplayName(cat)}
                                                            </span>
                                                            <span className="text-[9px] font-bold text-brand-softLavender/50 uppercase tracking-widest mt-1 group-hover/cat:text-brand-cinemaGold/70 transition-colors">
                                                                {tagline}
                                                            </span>
                                                        </div>
                                                        <div className="ml-auto opacity-0 group-hover/cat:opacity-100 -translate-x-2 group-hover/cat:translate-x-0 transition-all">
                                                            <Sparkles className="w-3.5 h-3.5 text-brand-cinemaGold/40 animate-pulse" />
                                                        </div>
                                                    </Link>
                                                </DropdownMenuItem>
                                            );
                                        })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>

                    {/* Right: Actions (Cinema, Search, User) */}
                    <div className="flex items-center gap-1.5 sm:gap-2 ml-auto lg:ml-0">
                        {/* Cinema Button - Hidden on mobile, shown on large screens */}
                        <Link
                            href="/cinema"
                            className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full bg-brand-playRed/10 border border-brand-playRed/20 text-brand-playRed hover:bg-brand-playRed hover:text-white transition-all duration-300 group active:scale-95 shadow-lg shadow-brand-playRed/5"
                        >
                            <div className="relative">
                                <Play className="w-3.5 h-3.5 fill-current" />
                                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                            </div>
                            <span className="text-[11px] font-bold font-display tracking-widest uppercase">Cinema</span>
                        </Link>

                        {/* Mobile Cinema Icon - Compact for small screens */}
                        <Link href="/cinema" className="flex lg:hidden">
                            <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-brand-playRed/10 border border-brand-playRed/20 text-brand-playRed hover:bg-brand-playRed hover:text-white transition-all scale-90 sm:scale-100">
                                <Play className="w-4 h-4 fill-current" />
                            </Button>
                        </Link>

                        {/* Search Bar - Cinematic Expansion */}
                        <div className="relative group/search hidden md:block">
                            <form onSubmit={handleSearch} className="relative z-10">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-softLavender group-focus-within/search:text-brand-cinemaGold transition-colors" />
                                <Input
                                    type="search"
                                    placeholder={t('search')}
                                    className="w-[140px] focus:w-[240px] pl-10 h-10 bg-brand-deepNight/50 border-brand-royalPurple/20 rounded-full transition-all duration-500 focus:ring-brand-cinemaGold/30 font-body text-xs"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => searchResults.length > 0 && setShowResults(true)}
                                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                                />
                            </form>

                            {/* Search Results Dropdown */}
                            <AnimatePresence>
                                {showResults && searchResults.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full mt-4 right-0 w-[380px] bg-brand-midnight/95 backdrop-blur-3xl border border-brand-royalPurple/20 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-[100] overflow-hidden"
                                    >
                                        <div className="p-4 border-b border-brand-royalPurple/10 flex items-center justify-between">
                                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-cinemaGold">Search Spotlight</span>
                                            <div className="flex gap-1">
                                                {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-brand-royalPurple/30" />)}
                                            </div>
                                        </div>
                                        <div className="max-h-[420px] overflow-y-auto p-2">
                                            {searchResults.map((movie) => (
                                                <button
                                                    key={movie.id}
                                                    type="button"
                                                    onClick={() => selectMovie(movie.slug)}
                                                    className="w-full flex items-center gap-4 p-3 hover:bg-brand-royalPurple/10 transition-all text-left rounded-2xl group/item"
                                                >
                                                    <div className="relative overflow-hidden rounded-xl border border-white/5 shadow-lg shrink-0">
                                                        <img
                                                            src={movie.posterUrl || '/brand/couchoo-icon-64.png'}
                                                            alt={movie.titleEN}
                                                            className="w-12 h-18 object-cover group-hover/item:scale-110 transition-transform duration-500"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-midnight/60 to-transparent" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h5 className="font-bold text-sm text-brand-warmCream group-hover/item:text-brand-cinemaGold transition-colors truncate">
                                                            {movie.titleEN || movie.titleBG}
                                                        </h5>
                                                        <div className="flex items-center gap-2 mt-1.5">
                                                            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-brand-deepNight text-brand-softLavender border border-brand-royalPurple/20 uppercase tracking-tighter">{movie.year}</span>
                                                            {movie.rating && (
                                                                <span className="flex items-center gap-1 text-brand-cinemaGold font-bold text-[10px]">
                                                                    <Star className="w-3 h-3 fill-current" /> {movie.rating}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="w-[1px] h-6 bg-brand-royalPurple/10 mx-1 hidden sm:block" />

                        <LanguageSwitcher currentLocale={locale} />

                        {/* User Profile / Login */}
                        {session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 p-1.5 rounded-full bg-brand-deepNight/50 border border-brand-royalPurple/10 hover:border-brand-cinemaGold/40 transition-all outline-none group active:scale-95">
                                        <Avatar className="h-8 w-8 border border-white/10 group-hover:border-brand-cinemaGold/40 transition-colors">
                                            <AvatarImage src={session.user?.image || undefined} />
                                            <AvatarFallback className="bg-brand-royalPurple/40 text-brand-cinemaGold text-[10px] font-bold">
                                                {session.user?.email?.[0].toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="hidden lg:flex flex-col items-start pr-2">
                                            <span className="text-[10px] font-bold text-brand-warmCream max-w-[80px] truncate">
                                                {session.user?.name || session.user?.email?.split('@')[0]}
                                            </span>
                                            {['VIP', 'ADMIN', 'SUPER_ADMIN'].includes((session.user as any)?.role) && (
                                                <span className="text-[8px] uppercase tracking-tighter text-brand-cinemaGold font-bold">Premium</span>
                                            )}
                                        </div>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    sideOffset={20}
                                    className="w-85 p-0 border-none bg-transparent shadow-none"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="relative pt-12 overflow-visible"
                                    >
                                        {/* Virtual Couch/Shelf for Mascot */}
                                        <div className="absolute top-8 left-0 right-0 h-16 bg-brand-midnight rounded-t-[3rem] border-t border-x border-white/10 z-0" />

                                        {/* Mascot Owl Sitting on Couch */}
                                        <motion.div
                                            className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 z-20 pointer-events-none"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                                        >
                                            <img
                                                src="/brand/couchoo-mascot-transparent.png"
                                                alt="Mascot"
                                                className="w-full h-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]"
                                            />
                                        </motion.div>

                                        <div className="relative z-10 overflow-hidden bg-brand-midnight/98 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.7)] p-6">
                                            {/* Header & Avatar */}
                                            <div className="text-center mt-4 mb-6">
                                                <div className="relative inline-block mb-3">
                                                    <motion.div
                                                        className="absolute inset-0 bg-brand-cinemaGold/20 blur-xl rounded-full"
                                                        animate={{ scale: [1, 1.2, 1] }}
                                                        transition={{ duration: 3, repeat: Infinity }}
                                                    />
                                                    <Avatar className="h-20 w-20 border-4 border-brand-midnight relative z-10 shadow-2xl">
                                                        <AvatarImage src={session.user?.image || undefined} />
                                                        <AvatarFallback className="bg-brand-royalPurple text-brand-cinemaGold font-black text-2xl">
                                                            {session.user?.email?.[0].toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {userStats?.role === 'VIP' && (
                                                        <div className="absolute -bottom-1 -right-1 bg-brand-cinemaGold p-1.5 rounded-full shadow-lg border-2 border-brand-midnight z-20">
                                                            <Star className="w-3.5 h-3.5 text-brand-midnight fill-brand-midnight" />
                                                        </div>
                                                    )}
                                                </div>
                                                <h4 className="font-display font-black text-2xl text-brand-warmCream truncate px-4">
                                                    {session.user?.name || session.user?.email?.split('@')[0]}
                                                </h4>
                                                <div className="flex justify-center mt-2">
                                                    <span className="px-4 py-1.5 rounded-full bg-brand-cinemaGold/10 border border-brand-cinemaGold/20 text-[10px] font-black uppercase text-brand-cinemaGold tracking-[0.2em] shadow-inner">
                                                        {userStats?.role || (session.user as any)?.role || 'Standard'} Member
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Stats Bubbles */}
                                            <div className="grid grid-cols-3 gap-3 mb-6">
                                                {[
                                                    { label: 'Gledani', val: userStats?.watched, icon: History, color: 'brand-cinemaGold' },
                                                    { label: 'Spisuk', val: userStats?.watchlist, icon: Bookmark, color: 'brand-warmCream' },
                                                    { label: 'Popcorn', val: userStats?.popcorn, icon: Sparkles, color: 'brand-royalPurple' }
                                                ].map((s, i) => (
                                                    <motion.div
                                                        key={i}
                                                        whileHover={{ y: -5, scale: 1.05 }}
                                                        className="flex flex-col items-center p-3 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-default"
                                                    >
                                                        <div className={`p-2 rounded-2xl bg-brand-midnight shadow-inner mb-2`}>
                                                            <s.icon className={`w-4 h-4 text-${s.color}`} />
                                                        </div>
                                                        <span className="text-lg font-display font-black text-brand-warmCream">{s.val || 0}</span>
                                                        <span className="text-[7px] font-black uppercase text-brand-softLavender/40 tracking-widest">{s.label}</span>
                                                    </motion.div>
                                                ))}
                                            </div>

                                            {/* Interactive Grid Menu */}
                                            <div className="grid grid-cols-2 gap-2 mb-6">
                                                <DropdownMenuItem asChild className="p-0 bg-transparent focus:bg-transparent">
                                                    <Link href="/profile" className="flex flex-col items-center justify-center gap-1.5 p-4 rounded-3xl bg-brand-royalPurple/5 hover:bg-brand-royalPurple/20 border border-brand-royalPurple/10 transition-all text-brand-softLavender group/mitem">
                                                        <User className="w-5 h-5 group-hover/mitem:scale-110 group-hover/mitem:text-brand-cinemaGold transition-all" />
                                                        <span className="text-[11px] font-black uppercase tracking-wider">{t('profile')}</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild className="p-0 bg-transparent focus:bg-transparent">
                                                    <Link href="/collections" className="flex flex-col items-center justify-center gap-1.5 p-4 rounded-3xl bg-brand-playRed/5 hover:bg-brand-playRed/20 border border-brand-playRed/10 transition-all text-brand-softLavender group/mitem">
                                                        <Library className="w-5 h-5 group-hover/mitem:scale-110 group-hover/mitem:text-brand-cinemaGold transition-all" />
                                                        <span className="text-[11px] font-black uppercase tracking-wider">Kolekcii</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            </div>

                                            {/* Settings & Logout */}
                                            <div className="flex flex-col gap-2 relative z-10">
                                                <DropdownMenuItem asChild className="p-0 bg-transparent focus:bg-transparent">
                                                    <Link href="/settings" className="flex items-center gap-3 w-full h-11 px-5 rounded-2xl bg-white/5 hover:bg-white/10 text-brand-softLavender/70 transition-all group/sublink">
                                                        <Settings className="w-4 h-4 group-hover/sublink:rotate-90 transition-transform" />
                                                        <span className="text-[12px] font-bold">Nastroiki</span>
                                                    </Link>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    onClick={() => signOut()}
                                                    className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl bg-brand-playRed/10 hover:bg-brand-playRed text-brand-playRed hover:text-white transition-all cursor-pointer font-black uppercase tracking-widest text-[11px] border border-brand-playRed/20"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    {t('logout')}
                                                </DropdownMenuItem>
                                            </div>

                                            {/* Animated Background Glow */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-royalPurple/10 blur-[60px] rounded-full -mr-10 -mt-10" />
                                        </div>
                                    </motion.div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/login" className="px-5 py-2 rounded-full bg-brand-cinemaGold text-brand-midnight font-bold font-display tracking-widest uppercase text-[11px] hover:bg-white transition-colors active:scale-95 shadow-xl shadow-brand-cinemaGold/10">
                                {t('login')}
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

