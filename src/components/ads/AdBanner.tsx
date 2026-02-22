'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

interface AdBannerProps {
    slot: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    className?: string;
}

export function AdBanner({ slot, format = 'auto', className }: AdBannerProps) {
    const { data: session } = useSession();
    const role = (session?.user as any)?.role;
    const isVIP = role === 'VIP' || role === 'ADMIN' || role === 'SUPER_ADMIN';

    useEffect(() => {
        if (!isVIP) {
            try {
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            } catch (e) {
                console.error('AdSense Error:', e);
            }
        }
    }, [isVIP]);

    if (isVIP) return null; // No ads for VIPs

    return (
        <div suppressHydrationWarning className={`flex justify-center my-8 overflow-hidden ${className}`}>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 text-center w-full">Реклама</div>
            <ins
                suppressHydrationWarning
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
}
