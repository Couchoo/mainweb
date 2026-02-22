'use client';

import { motion, useMotionValue } from 'framer-motion';
import { Sparkles, Play, Bookmark } from 'lucide-react';
import Link from 'next/link';

import { getTranslation, Locale } from '@/lib/i18n';

interface HeroProps {
    locale: Locale;
}

export function Hero({ locale }: HeroProps) {
    const t = (key: any) => getTranslation(key, locale);

    // Mouse interaction for Mascot
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        // Simple normalization
        const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        mouseX.set((clientX - center.x) / 50);
        mouseY.set((clientY - center.y) / 50);
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative min-h-[600px] md:min-h-[750px] w-full overflow-hidden flex items-center pt-20"
        >
            {/* Cinematic Background Layers */}
            <div className="absolute inset-0 bg-[#0A0A0B] z-0" />

            {/* Dynamic Conic Light Beams */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent,rgba(114,9,183,0.1),transparent,rgba(230,57,70,0.1),transparent)]"
                />
            </div>

            {/* Animated Glows */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-[80%] h-[80%] bg-brand-royalPurple/20 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.05, 0.2, 0.05]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 left-0 w-[60%] h-[70%] bg-brand-cinemaGold/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/4 translate-y-1/4"
            />

            {/* Film Grain Texture overlay */}
            <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/Noise_600x600.png')] mix-blend-overlay" />

            {/* Stardust particles */}
            <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

            <div className="container relative z-10 px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">

                    {/* Left content: Text & Actions */}
                    <div className="flex-1 text-center md:text-left space-y-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: "backOut" }}
                            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-brand-royalPurple/20 border border-brand-royalPurple/30 backdrop-blur-md text-brand-cinemaGold text-[11px] font-black uppercase tracking-[0.4em] font-display shadow-[0_0_30px_rgba(181,23,158,0.2)]"
                        >
                            <Sparkles className="w-4 h-4 text-brand-cinemaGold animate-spin-slow" />
                            {t('hero_badge')}
                        </motion.div>

                        <div className="space-y-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                className="text-7xl md:text-9xl lg:text-[130px] font-display font-black tracking-[-0.04em] text-white leading-[0.8] uppercase"
                            >
                                {t('hero_title_gold')} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cinemaGold via-white to-brand-cinemaGold bg-[length:200%_auto] animate-shimmer drop-shadow-[0_10px_30px_rgba(255,182,0,0.3)]">
                                    {t('hero_title_at_home')}
                                </span>
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-xl md:text-3xl text-brand-softLavender/80 font-medium max-w-xl italic leading-tight drop-shadow-md"
                        >
                            "{t('hero_sub_text')}"
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-6"
                        >
                            <Link
                                href="/search"
                                className="group relative px-12 py-6 bg-brand-playRed text-white font-display text-2xl font-black tracking-[0.1em] uppercase rounded-[2.5rem] transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_-10px_rgba(230,57,70,0.5)] overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-4">
                                    <div className="p-2 bg-white/10 rounded-full">
                                        <Play className="w-5 h-5 fill-current" />
                                    </div>
                                    {t('hero_watch_now')}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </Link>

                            <Link
                                href="/watchlist"
                                className="group px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-brand-warmCream font-display text-2xl font-black tracking-[0.1em] uppercase rounded-[2.5rem] transition-all flex items-center gap-4 backdrop-blur-xl shadow-2xl hover:border-white/20"
                            >
                                <Bookmark className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                {t('hero_my_list')}
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right side: Interactive Mascot */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        className="flex-1 relative hidden md:block"
                    >
                        {/* Glowing ring around mascot */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-royalPurple/20 rounded-full blur-[100px] z-0" />

                        <motion.div
                            style={{
                                x: mouseX,
                                y: mouseY,
                                rotateX: mouseY,
                                rotateY: mouseX
                            }}
                            className="relative z-10 w-full max-w-[550px] mx-auto perspective-[1000px]"
                        >
                            <img
                                src="/brand/couchoo-mascot-hero.png"
                                alt="Couchoo"
                                className="w-full h-auto object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.8)] filter brightness-110"
                            />

                            {/* Floating decorative elements */}
                            <motion.div
                                animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-10 p-5 bg-brand-midnight/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-20 group cursor-default hover:border-brand-cinemaGold/30 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-cinemaGold/10 flex items-center justify-center border border-brand-cinemaGold/20 shadow-inner">
                                        <Star className="w-6 h-6 text-brand-cinemaGold fill-brand-cinemaGold animate-pulse" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-brand-softLavender font-black uppercase tracking-[0.2em]">Authentic Experience</div>
                                        <div className="text-sm font-black text-brand-warmCream flex items-center gap-2 uppercase font-display">
                                            Ultra HD Cinema
                                            <span className="px-1.5 py-0.5 rounded-md bg-brand-cinemaGold text-brand-midnight text-[8px] font-black">4K</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [15, -15, 15], rotate: [2, -2, 2] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-10 -left-10 p-5 bg-brand-royalPurple/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-20"
                            >
                                <div className="flex items-center gap-4 text-white">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-widest">Atmosphere AI</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Fade Transition */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-brand-midnight via-brand-midnight/80 to-transparent z-20" />
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
