'use client';

import { motion } from 'framer-motion';
import { Sparkles, Play, Bookmark } from 'lucide-react';
import Link from 'next/link';

interface HeroProps {
    t: (key: string) => string;
}

export function Hero({ t }: HeroProps) {
    return (
        <section className="relative min-h-[500px] md:min-h-[650px] w-full overflow-hidden flex items-center">
            {/* Cinematic Background Layers */}
            <div className="absolute inset-0 bg-brand-midnight z-0" />

            {/* Animated Glows */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[20%] -left-[10%] w-[70%] h-[100%] bg-brand-royalPurple/20 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.05, 0.15, 0.05]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 right-0 w-[60%] h-[70%] bg-brand-cinemaGold/10 rounded-full blur-[100px] pointer-events-none"
            />

            {/* Parallax Dust/Particles (CSS Animation for performance) */}
            <div className="absolute inset-0 z-[1] opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

            <div className="container relative z-10 px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                    {/* Left content: Text & Actions */}
                    <div className="flex-1 text-center md:text-left space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-royalPurple/30 border border-brand-royalPurple/40 text-brand-cinemaGold text-[10px] font-bold uppercase tracking-[0.3em] font-display shadow-lg shadow-brand-royalPurple/20"
                        >
                            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                            {t('hero_badge')}
                        </motion.div>

                        <div className="space-y-2">
                            <motion.h1
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                className="text-6xl md:text-8xl lg:text-[110px] font-display tracking-tighter text-white leading-[0.85] uppercase"
                            >
                                {t('hero_title_gold')} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cinemaGold via-white to-brand-cinemaGold bg-[length:200%_auto] animate-shimmer">
                                    {t('hero_title_at_home')}
                                </span>
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-2xl text-brand-softLavender font-medium max-w-xl italic leading-relaxed opacity-90"
                        >
                            "{t('hero_sub_text')}"
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap items-center justify-center md:justify-start gap-5 pt-4"
                        >
                            <Link
                                href="/search"
                                className="group relative px-10 py-5 bg-brand-playRed text-white font-display text-2xl tracking-[0.1em] uppercase rounded-[2rem] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(230,57,70,0.4)] overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <Play className="w-5 h-5 fill-current" />
                                    {t('hero_watch_now')}
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </Link>

                            <Link
                                href="/watchlist"
                                className="px-10 py-5 bg-brand-royalPurple/10 hover:bg-brand-royalPurple/25 border border-brand-royalPurple/30 text-brand-warmCream font-display text-2xl tracking-[0.1em] uppercase rounded-[2rem] transition-all flex items-center gap-3 backdrop-blur-sm shadow-xl"
                            >
                                <Bookmark className="w-5 h-5" />
                                {t('hero_my_list')}
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right side: Floating Mascot / Key Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        className="flex-1 relative hidden md:block"
                    >
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 2, 0]
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative z-10 w-full max-w-[500px] mx-auto"
                        >
                            <img
                                src="/brand/couchoo-mascot-hero.png"
                                alt="Couchoo"
                                className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                            />
                            {/* Cinematic Light Reflection */}
                            <div className="absolute top-1/4 right-0 w-32 h-32 bg-brand-cinemaGold/20 rounded-full blur-[60px]" />
                        </motion.div>

                        {/* Floating Cards (Decorative) */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 right-0 p-4 bg-brand-midnight/80 backdrop-blur-lg border border-brand-royalPurple/30 rounded-3xl shadow-2xl z-20"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-cinemaGold/20 flex items-center justify-center">
                                    <Star className="w-4 h-4 text-brand-cinemaGold fill-current" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-brand-softLavender font-bold uppercase tracking-widest">Premium Quality</div>
                                    <div className="text-xs font-bold text-brand-warmCream">4K UHD Cinema</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Fade Transition */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-midnight to-transparent z-20" />
        </section>
    );
}

function Star({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}
