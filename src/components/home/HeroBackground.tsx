'use client';

import React from 'react';

// Generates SVG film grain noise as data URL
function generateGrainSVG() {
    return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>
      <filter id='noise'>
        <feTurbulence
          type='fractalNoise'
          baseFrequency='0.9'
          numOctaves='4'
          stitchTiles='stitch'
        />
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='300' height='300' filter='url(#noise)' opacity='0.08'/>
    </svg>
  `)}`;
}

// Ambient particles (dust in projector light)
function Particles() {
    const particles = Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${20 + Math.random() * 60}%`,
        top: `${10 + Math.random() * 80}%`,
        size: 1 + Math.random() * 2,
        duration: `${4 + Math.random() * 6}s`,
        delay: `${Math.random() * 5}s`,
        opacity: 0.3 + Math.random() * 0.5,
    }));

    return (
        <>
            {particles.map((p) => (
                <div
                    key={p.id}
                    style={{
                        position: 'absolute',
                        left: p.left,
                        top: p.top,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        borderRadius: '50%',
                        background: 'rgba(255, 248, 220, 0.8)',
                        animation: `particleFloat ${p.duration} ${p.delay} ease-in-out infinite`,
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}
                />
            ))}
        </>
    );
}

export default function HeroBackground() {
    return (
        <>
            {/* Deep space gradient */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `
          radial-gradient(ellipse 80% 60% at 70% 50%, rgba(75,63,141,0.15) 0%, transparent 70%),
          radial-gradient(ellipse 40% 50% at 20% 30%, rgba(192,57,43,0.06) 0%, transparent 60%),
          linear-gradient(180deg, #08080F 0%, #0A0A14 50%, #06060E 100%)
        `,
                zIndex: 0,
            }} />

            {/* Film grain texture — animated */}
            <div style={{
                position: 'absolute',
                inset: '-50%',
                width: '200%',
                height: '200%',
                backgroundImage: `url("${generateGrainSVG()}")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '300px 300px',
                opacity: 0.4,
                animation: 'grain 0.5s steps(1) infinite',
                pointerEvents: 'none',
                zIndex: 1,
                mixBlendMode: 'overlay',
            }} />

            {/* Vignette edges */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `
          radial-gradient(ellipse 100% 100% at 50% 50%,
            transparent 50%,
            rgba(0,0,0,0.5) 100%
          )
        `,
                pointerEvents: 'none',
                zIndex: 1,
            }} />

            {/* Floating dust particles */}
            <Particles />

            {/* Horizontal scan line — subtle */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 3px,
          rgba(0,0,0,0.03) 3px,
          rgba(0,0,0,0.03) 4px
        )`,
                pointerEvents: 'none',
                zIndex: 1,
            }} />
        </>
    );
}
