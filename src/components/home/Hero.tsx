'use client';

import React, { useEffect, useRef, useState } from 'react';
import HeroBackground from './HeroBackground';
import HeroMascot from './HeroMascot';
import HeroText from './HeroText';
import HeroBadges from './HeroBadges';
import { getTranslation, Locale } from '@/lib/i18n';
import './hero.css';

export function Hero({ locale = 'bg' }: { locale: string }) {
    const heroRef = useRef<HTMLElement>(null);
    const cursorGlowRef = useRef<HTMLDivElement>(null);
    const [mascotOffset, setMascotOffset] = useState(0);

    // ── Cursor golden glow (only in hero zone)
    useEffect(() => {
        if ('ontouchstart' in window) return; // touch device = skip
        const hero = heroRef.current;
        const glow = cursorGlowRef.current;
        if (!hero || !glow) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
        };

        const handleMouseEnter = () => { glow.style.opacity = '1'; };
        const handleMouseLeave = () => { glow.style.opacity = '0'; };

        hero.addEventListener('mousemove', handleMouseMove);
        hero.addEventListener('mouseenter', handleMouseEnter);
        hero.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            hero.removeEventListener('mousemove', handleMouseMove);
            hero.removeEventListener('mouseenter', handleMouseEnter);
            hero.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // ── Parallax scroll for mascot
    useEffect(() => {
        if (window.innerWidth < 768) return; // skip on mobile
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Mascot moves slower — 30% of scroll speed
            setMascotOffset(scrollY * 0.3);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            ref={heroRef}
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '85svh',
                background: '#0A0A14', // Explicit dark background
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                marginTop: '-72px', // Pull up under fixed header (mobile)
                userSelect: 'none', // Prevent text selection
                WebkitUserSelect: 'none',
            }}
            className="hero-section"
        >
            {/* Film grain + ambient particles */}
            <HeroBackground />

            {/* Cursor golden glow */}
            <div
                ref={cursorGlowRef}
                style={{
                    position: 'absolute',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(245,197,24,0.08) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 2,
                    animation: 'cursorGlowAppear 0.3s ease',
                }}
            />

            {/* Main hero grid */}
            <div
                className="hero-grid"
                style={{
                    position: 'relative',
                    zIndex: 3,
                    width: '100%',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '0 60px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    alignItems: 'center',
                    gap: '40px',
                    minHeight: '85svh',
                }}
            >
                {/* LEFT — Text */}
                <HeroText locale={locale as any} />

                {/* RIGHT — Mascot */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: `translateY(${-mascotOffset - 100}px)`, // Lifted even higher
                        transition: 'transform 0.1s linear',
                        animation: 'float 4s ease-in-out infinite',
                    }}
                >
                    <HeroMascot />
                </div>
            </div>

            {/* Floating info badges */}
            <HeroBadges locale={locale as any} />

            {/* Scroll indicator */}
            <div
                className="hero-scroll-hint"
                onClick={() => {
                    document.getElementById('recommended-movies')?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                    position: 'absolute',
                    bottom: '32px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    animation: 'scrollBounce 2s ease-in-out infinite',
                    zIndex: 4,
                    cursor: 'pointer', // Changed to pointer
                }}
            >
                <span style={{
                    fontSize: '11px',
                    letterSpacing: '3px',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    fontFamily: 'monospace',
                }}>
                    {getTranslation('hero_explore', locale as any)}
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M10 3L10 17M10 17L4 11M10 17L16 11"
                        stroke="rgba(245,197,24,0.6)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </section>
    );
}
