import { useSession } from 'next-auth/react';
import React from 'react';

/**
 * Utility to check if a user should see ads
 * @param session NextAuth session
 * @returns boolean true if ads should be shown
 */
export const shouldShowAds = (session: any) => {
    if (!session?.user) return true; // Show ads to guests
    if (session.user.role === 'VIP') return false; // VIPs don't see ads
    if (session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN') return false; // Admins don't see ads
    return true; // Default show ads
};

interface AdSlotProps {
    slotId: string;
    className?: string;
}

/**
 * Component to wrap AdSense or other ad slots
 */
export const AdSlot: React.FC<AdSlotProps> = ({ slotId, className }) => {
    const { data: session } = useSession();

    // Check if ads are globally disabled or if user is VIP
    const isAdsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';
    if (!isAdsEnabled || !shouldShowAds(session)) {
        return null;
    }

    return (
        <div className= {`ad-slot p-4 bg-secondary/10 border border-secondary/20 rounded-xl flex items-center justify-center min-h-[100px] text-muted-foreground text-xs uppercase tracking-widest ${className || ''}`
}>
    <div className="text-center" >
        <p className="mb-1 opacity-50" > Advertisement </p>
            < p className = "font-bold" > Slot: { slotId } </p>
{/* Real AdSense code would be injected here via a useEffect/Script tag */ }
</div>
    </div>
    );
};
