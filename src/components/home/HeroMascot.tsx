'use client';

import React from 'react';

export default function HeroMascot() {
    return (
        <div className="hero-mascot-wrapper mascot" style={{
            position: 'relative',
            width: 'clamp(380px, 45vw, 620px)',
            filter: 'drop-shadow(0 30px 60px rgba(75,63,141,0.4))',
        }}>
            <img
                src="/assets/couchoo-mascot-v2.svg"
                alt="Couchoo mascot"
                style={{ width: '100%', height: 'auto' }}
                draggable={false}
            />

            {/* Projector light reflection on the "floor" */}
            <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '10%',
                right: '10%',
                height: '40px',
                background: 'radial-gradient(ellipse, rgba(75,63,141,0.3) 0%, transparent 70%)',
                filter: 'blur(10px)',
            }} />
        </div>
    );
}
