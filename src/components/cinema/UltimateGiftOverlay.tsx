'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { getTranslation, Locale } from '@/lib/i18n';
import { Star, Gift } from 'lucide-react';

interface UltimateGiftOverlayProps {
    gift: {
        giftType: string;
        amount: number;
        from: { name: string };
        to: { name: string } | null;
        senderId: number;
        receiverId: number | null;
    } | null;
    currentUserId?: number;
    locale?: Locale;
}

// 🎁 Tier Mapping helper
const getGiftTier = (giftType: string): number => {
    if (giftType.includes('💍') || giftType.includes('🏎️') || giftType.includes('🚁')) return 3;
    if (giftType.includes('🌹') || giftType.includes('🍫')) return 2;
    return 1;
};

// 🔊 Sound Mapping
const TIER_SOUNDS: Record<number, string> = {
    1: 'https://cdn.pixabay.com/audio/2022/03/15/audio_fe949c5e3d.mp3', // Bubble/Pop
    2: 'https://cdn.pixabay.com/audio/2021/08/04/audio_bb46039433.mp3', // Ta-da/Magic
    3: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a730.mp3',    // Epic Fanfare
};

export function UltimateGiftOverlay({ gift, currentUserId, locale = 'bg' }: UltimateGiftOverlayProps) {
    const [isVisible, setIsVisible] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const t = (key: any) => getTranslation(key, locale);

    useEffect(() => {
        if (gift) {
            setIsVisible(true);
            const tier = getGiftTier(gift.giftType);

            // 🔊 Play Sound
            if (TIER_SOUNDS[tier]) {
                const audio = new Audio(TIER_SOUNDS[tier]);
                audio.volume = 0.5;
                audio.play().catch(e => console.log('Audio play failed:', e));
                audioRef.current = audio;
            }

            // 🎉 Trigger Particles based on Tier
            if (tier === 2) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff0000', '#ffffff', '#ffd700']
                });
            } else if (tier === 3) {
                const duration = 3 * 1000;
                const animationEnd = Date.now() + duration;
                const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

                const interval: any = setInterval(function () {
                    const timeLeft = animationEnd - Date.now();
                    if (timeLeft <= 0) return clearInterval(interval);

                    const particleCount = 50 * (timeLeft / duration);
                    confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
                    confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
                }, 250);
            }

            const timer = setTimeout(() => setIsVisible(false), tier === 3 ? 6000 : 4000);
            return () => clearTimeout(timer);
        }
    }, [gift]);

    if (!gift || !isVisible) return null;

    const tier = getGiftTier(gift.giftType);
    const isReceiver = currentUserId === gift.receiverId;
    const isSender = currentUserId === gift.senderId;

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden">
            {/* 🎥 Epic Effects for Tier 3 */}
            {tier === 3 && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.4, 0] }}
                        className="absolute inset-0 bg-white"
                        transition={{ duration: 0.5 }}
                    />
                    {/* ☀️ Background Rotating Rays */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[150vw] h-[150vw] bg-gradient-to-t from-brand-cinemaGold/20 via-transparent to-brand-cinemaGold/20 opacity-30 blur-3xl pointer-events-none"
                        style={{ clipPath: 'polygon(50% 50%, 0% 0%, 100% 0%, 50% 50%, 100% 100%, 0% 100%)' }}
                    />
                </>
            )}

            <AnimatePresence>
                <motion.div
                    initial={{ scale: 0, y: 100, opacity: 0 }}
                    animate={{
                        scale: [0, 1.1, 1],
                        y: 0,
                        opacity: 1,
                        x: tier === 3 ? [0, -5, 5, -5, 5, 0] : 0, // 📳 Shake effect for Tier 3
                    }}
                    exit={{ scale: 1.5, opacity: 0, filter: 'blur(40px)' }}
                    transition={{
                        type: 'spring',
                        damping: 15,
                        x: tier === 3 ? { repeat: Infinity, duration: 0.1 } : {}
                    }}
                    className="relative flex flex-col items-center"
                >
                    {/* 🌟 Aura Glow behind the gift */}
                    <div className={`absolute inset-0 rounded-full blur-[140px] opacity-70 ${tier === 3 ? 'bg-brand-cinemaGold animate-pulse' :
                        tier === 2 ? 'bg-brand-royalPurple' : 'bg-brand-softLavender/30'
                        }`} />

                    {/* 🎁 Gift Icon & Floating Emojis */}
                    <div className="relative">
                        {tier === 3 && (
                            <>
                                <motion.span
                                    animate={{ y: [-20, -100, -20], opacity: [0, 1, 0], x: [-50, -80, -50] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute text-6xl top-0 left-0"
                                >
                                    🔥
                                </motion.span>
                                <motion.span
                                    animate={{ y: [-20, -120, -20], opacity: [0, 1, 0], x: [50, 80, 50] }}
                                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                                    className="absolute text-6xl top-0 right-0"
                                >
                                    🚀
                                </motion.span>
                                <motion.span
                                    animate={{ y: [0, -150, 0], opacity: [0, 1, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                                    className="absolute text-5xl bottom-0 left-1/2 -translate-x-1/2"
                                >
                                    ✨
                                </motion.span>
                            </>
                        )}
                        <motion.div
                            animate={tier >= 2 ? {
                                scale: [1, 1.15, 1],
                                rotate: [0, 5, -5, 0]
                            } : {}}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className={`text-[140px] md:text-[240px] filter drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] ${tier === 3 ? 'scale-110 drop-shadow-[0_0_120px_rgba(240,192,64,0.7)]' : ''
                                }`}
                        >
                            {gift.giftType.split(' ')[1] || gift.giftType}
                        </motion.div>
                    </div>

                    {/* 📝 Text Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center mt-[-40px] relative z-10"
                    >
                        <h2 className={`text-6xl md:text-9xl font-display tracking-[0.1em] uppercase italic ${tier === 3 ? 'text-brand-cinemaGold drop-shadow-[0_0_40px_rgba(240,192,64,1)]' : 'text-white'
                            }`}>
                            {isSender ? t('gift_you_sent') : isReceiver ? t('gift_you_received') : `${gift.from.name} ${t('gift_sent_message')}`}
                        </h2>

                        <div className="flex flex-col items-center gap-4 mt-4">
                            <div className="flex items-center gap-4 px-8 py-3 rounded-[2rem] bg-brand-midnight/60 backdrop-blur-2xl border border-brand-royalPurple/30 shadow-2xl">
                                <img src="/brand/couchoo-icon-32.png" className="w-6 h-6 object-contain" alt="" />
                                <span className="text-3xl md:text-4xl font-display tracking-widest text-brand-cinemaGold uppercase">
                                    {gift.giftType}
                                </span>
                            </div>

                            {gift.to && !isReceiver && !isSender && (
                                <span className="text-xl font-display tracking-widest text-brand-softLavender uppercase">
                                    {t('gift_to_recipient')} <span className="text-brand-warmCream">{gift.to.name}</span>
                                </span>
                            )}

                            {isReceiver && (
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1], y: [0, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="flex items-center gap-3 px-6 py-2 rounded-2xl bg-brand-playRed/20 border border-brand-playRed/30 shadow-lg shadow-brand-playRed/20"
                                >
                                    <Star className="w-5 h-5 fill-brand-cinemaGold text-brand-cinemaGold" />
                                    <span className="text-3xl font-display tracking-widest text-white">
                                        +{Math.floor(gift.amount * 0.6)} 🍿
                                    </span>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
