'use client';

import React from 'react';
import { getTranslation, Locale } from '@/lib/i18n';

export default function HeroBadges({ locale = 'bg' }: { locale?: Locale }) {
    const t = (key: any) => getTranslation(key, locale);
    const badges = [
        {
            icon: '★',
            label: t('hero_badge_uhd'),
            sublabel: t('hero_badge_4k'),
            delay: '1.8s',
            position: { top: '18%', right: '6%' },
        },
        {
            icon: '✦',
            label: t('hero_badge_atmosphere'),
            sublabel: t('hero_badge_ai'),
            delay: '2.1s',
            position: { bottom: '22%', right: '10%' },
        },
    ];

    return (
        <>
            {badges.map((badge: any, i) => (
                <div
                    key={i}
                    className="hero-badge"
                    style={{
                        position: 'absolute',
                        ...(badge.position as any),
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 18px',
                        borderRadius: '16px',
                        background: 'rgba(10, 10, 20, 0.75)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
                        opacity: 0,
                        animation: `badgeSlideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${badge.delay} forwards`,
                        zIndex: 5,
                        cursor: 'default',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)';
                    }}
                >
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'rgba(245,197,24,0.12)',
                        border: '1px solid rgba(245,197,24,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        color: 'var(--gold)',
                    }}>
                        {badge.icon}
                    </div>
                    <div>
                        <div style={{
                            fontSize: '9px',
                            letterSpacing: '2.5px',
                            color: 'rgba(255,255,255,0.35)',
                            fontFamily: 'monospace',
                            textTransform: 'uppercase',
                            marginBottom: '2px',
                        }}>
                            {badge.label}
                        </div>
                        <div style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            color: 'white',
                            letterSpacing: '0.5px',
                            fontFamily: "'Anton', sans-serif",
                        }}>
                            {badge.sublabel}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
