'use client';

import React, { useEffect, useState } from 'react';
import { getTranslation, Locale } from '@/lib/i18n';

// Splits text into spans for stagger animation
function AnimatedWord({ text, color, startDelay = 0 }: { text: string; color: string; startDelay?: number }) {
    const letters = text.split('');
    return (
        <div style={{ display: 'block', overflow: 'hidden', lineHeight: 1 }}>
            {letters.map((letter, i) => (
                <span
                    key={i}
                    style={{
                        display: 'inline-block',
                        color,
                        fontFamily: "'Anton', 'Impact', sans-serif",
                        fontSize: 'clamp(60px, 8vw, 110px)',
                        fontWeight: 900,
                        letterSpacing: '-2px',
                        lineHeight: 0.95,
                        opacity: 0,
                        animation: `letterIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                        animationDelay: `${startDelay + i * 0.04}s`,
                    }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </span>
            ))}
        </div>
    );
}

export default function HeroText({ locale = 'bg' }: { locale?: Locale }) {
    const t = (key: any) => getTranslation(key, locale);
    const [subtitleVisible, setSubtitleVisible] = useState(false);
    const [pillVisible, setPillVisible] = useState(false);

    useEffect(() => {
        // Pill appears first
        const t1 = setTimeout(() => setPillVisible(true), 200);
        // Subtitle after heading
        const t2 = setTimeout(() => setSubtitleVisible(true), 1400);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    return (
        <div className="hero-text-block" style={{ position: 'relative', zIndex: 3 }}>

            {/* "THE NEW EXPERIENCE" pill */}
            <div className="hero-pill" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '100px',
                border: '1px solid rgba(245,197,24,0.25)',
                background: 'rgba(245,197,24,0.06)',
                marginBottom: '28px',
                opacity: pillVisible ? 1 : 0,
                transform: pillVisible ? 'translateY(0)' : 'translateY(-10px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                // Shimmer effect
                backgroundImage: pillVisible
                    ? 'linear-gradient(90deg, transparent 0%, rgba(245,197,24,0.1) 50%, transparent 100%)'
                    : 'none',
                backgroundSize: '200% 100%',
                animation: pillVisible ? 'shimmer 3s linear infinite' : 'none',
            }}>
                {/* Pulsing dot */}
                <span style={{ position: 'relative', display: 'inline-block' }}>
                    <span style={{
                        display: 'block',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#F5C518',
                    }} />
                    <span style={{
                        position: 'absolute',
                        inset: '-3px',
                        borderRadius: '50%',
                        border: '1px solid rgba(245,197,24,0.5)',
                        animation: 'cursorGlowAppear 1.5s ease-in-out infinite alternate',
                    }} />
                </span>
                <span style={{
                    fontSize: '10px',
                    letterSpacing: '3px',
                    color: 'rgba(245,197,24,0.8)',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                }}>
                    {t('hero_pill_text')}
                </span>
            </div>

            {/* Main heading */}
            <div className="hero-heading" style={{ marginBottom: '24px' }}>
                <AnimatedWord text={t('hero_heading_cinema')} color="white" startDelay={0.4} />
                <AnimatedWord text={t('hero_heading_at_home')} color="var(--gold)" startDelay={0.8} />
            </div>

            {/* Separator line */}
            <div className="hero-separator-line" style={{
                width: subtitleVisible ? '60px' : '0px',
                height: '3px',
                background: 'linear-gradient(90deg, var(--red-couchoo), transparent)',
                borderRadius: '2px',
                marginBottom: '20px',
                transition: 'width 0.6s ease 0.2s',
            }} />

            {/* Casual subtitle */}
            <p className="hero-subtitle" style={{
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                maxWidth: '420px',
                fontFamily: "'Georgia', serif",
                fontStyle: 'italic',
                fontWeight: 400,
                opacity: subtitleVisible ? 1 : 0,
                transform: subtitleVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
                margin: 0,
            }}>
                {t('hero_subtitle_part1')}
                <br />
                <span style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {t('hero_subtitle_part2')}
                </span>
            </p>

            {/* Scroll hint */}
            <div className="hero-scroll-hint" style={{
                marginTop: '48px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                opacity: subtitleVisible ? 0.5 : 0,
                transition: 'opacity 0.5s ease 0.8s',
            }}>
                <div style={{
                    width: '40px',
                    height: '1px',
                    background: 'rgba(255,255,255,0.3)',
                }} />
                <span style={{
                    fontSize: '11px',
                    letterSpacing: '2px',
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                }}>
                    {t('hero_scroll_titles')}
                </span>
            </div>
        </div>
    );
}
