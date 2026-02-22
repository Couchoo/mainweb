'use client';

import { getTranslation, Locale } from '@/lib/i18n';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Shield, Zap, History, Bookmark, Gem, User, Play, Calendar, Star, TrendingUp, HelpCircle } from 'lucide-react';

interface FooterProps {
    locale?: Locale;
}

export function Footer({ locale = 'bg' }: FooterProps) {
    const t = (key: any) => getTranslation(key, locale);

    const footerSections = [
        {
            title: t('footer_discover'),
            links: [
                { label: t('home'), href: '/' },
                { label: t('latest'), href: '/category/latest' },
                { label: t('trending'), href: '/category/trending' },
                { label: t('topRated'), href: '/category/top-rated' },
                { label: t('categories'), href: '/#categories' },
            ]
        },
        {
            title: t('footer_cinema_exp'),
            links: [
                { label: t('cinema_todaySchedule'), href: '/cinema' },
                { label: t('cinema_live'), href: '/cinema' },
                { label: t('footer_top_gifters'), href: '/cinema' },
                { label: t('footer_popcorn_shop'), href: '/cinema' },
            ]
        },
        {
            title: t('footer_my_couchoo'),
            links: [
                { label: t('profile'), href: '/profile' },
                { label: t('watchlist'), href: '/watchlist' },
                { label: t('myMovies'), href: '/my-list' },
                { label: t('footer_vip_portal'), href: '/vip' },
            ]
        },
        {
            title: t('footer_support_legal'),
            links: [
                { label: t('terms'), href: '/terms' },
                { label: t('privacy'), href: '/privacy' },
                { label: t('footer_dmca'), href: '/dmca' },
                { label: t('contacts'), href: '/contacts' },
            ]
        }
    ];

    return (
        <footer className="relative bg-brand-midnight border-t border-brand-royalPurple/20 pt-20 pb-12 overflow-hidden">
            {/* 🦉 Animated Mascot Background - Peeking Owl */}
            <div className="absolute -bottom-10 -right-10 w-80 h-80 pointer-events-none opacity-[0.05] grayscale">
                <motion.img
                    src="/brand/couchoo-mascot-transparent.png"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [12, 10, 12],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-full h-full object-contain"
                    alt=""
                />
            </div>

            {/* Subtle Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-royalPurple/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-brand-cinemaGold/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-1 space-y-6">
                        <Link href="/" className="inline-block group">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                src="/brand/couchoo-wordmark-dark.png"
                                className="h-9 w-auto object-contain filter group-hover:drop-shadow-[0_0_15px_rgba(240,192,64,0.3)] transition-all"
                                alt="Couchoo"
                            />
                        </Link>
                        <p className="text-sm text-brand-softLavender leading-relaxed max-w-xs font-medium italic opacity-80">
                            "{t('footer_tagline_new')}"
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <div className="p-2.5 rounded-xl bg-brand-royalPurple/20 border border-brand-royalPurple/30 text-brand-cinemaGold">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-softLavender/40">Official Support</span>
                                <a href="mailto:support@couchoo.com" className="text-brand-warmCream font-bold hover:text-brand-cinemaGold transition-colors">
                                    {t('footer_support_mail')}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    {footerSections.map((section, idx) => (
                        <div key={idx} className="space-y-6">
                            <h4 className="text-[11px] font-display uppercase tracking-[0.3em] text-brand-cinemaGold font-bold">
                                {section.title}
                            </h4>
                            <nav className="flex flex-col gap-4">
                                {section.links.map((link, lIdx) => (
                                    <Link
                                        key={lIdx}
                                        href={link.href}
                                        className="text-[13px] text-brand-softLavender hover:text-brand-warmCream transition-colors flex items-center gap-2 group"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-royalPurple/40 group-hover:bg-brand-cinemaGold transition-colors" />
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-brand-royalPurple/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <p className="text-[11px] text-brand-softLavender/40 font-display uppercase tracking-widest">
                            &copy; {new Date().getFullYear()} COUCHOO. {t('allRightsReserved')}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-[10px] text-brand-softLavender/30 font-display tracking-[0.4em] uppercase">
                        <span>Your Cinema</span>
                        <div className="w-1 h-1 rounded-full bg-brand-royalPurple/50" />
                        <span>Your Couch</span>
                        <div className="w-1 h-1 rounded-full bg-brand-royalPurple/50" />
                        <span>Your Chouchoo</span>
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <div className="px-3 py-1 rounded-lg bg-brand-deepNight border border-brand-royalPurple/20 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-brand-softLavender uppercase tracking-widest">System Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
