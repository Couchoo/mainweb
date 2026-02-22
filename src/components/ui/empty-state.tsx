import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: {
        label: string;
        href: string;
    };
    className?: string;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    className
}: EmptyStateProps) {
    return (
        <div className={cn(
            'flex flex-col items-center justify-center py-24 px-6 text-center bg-brand-deepNight/40 rounded-[3rem] border-2 border-dashed border-brand-royalPurple/20 backdrop-blur-xl shadow-2xl',
            className
        )}>
            {Icon && (
                <div className="flex justify-center mb-8">
                    <div className="bg-brand-royalPurple/10 rounded-full p-6 border border-brand-royalPurple/20 relative group">
                        <Icon className="h-10 w-10 text-brand-cinemaGold transition-transform group-hover:scale-110 duration-500" />
                        <div className="absolute inset-0 bg-brand-cinemaGold/10 blur-2xl rounded-full -z-10 group-hover:opacity-100 opacity-0 transition-opacity" />
                    </div>
                </div>
            )}
            <h3 className="text-3xl font-display tracking-widest uppercase text-brand-warmCream mb-4">{title}</h3>
            {description && (
                <p className="text-brand-softLavender/60 font-display tracking-[0.1em] uppercase text-sm mb-10 max-w-sm mx-auto leading-relaxed">
                    {description}
                </p>
            )}
            {action && (
                <Button asChild className="bg-brand-cinemaGold hover:bg-brand-deepGold text-brand-midnight font-display tracking-[0.2em] uppercase h-12 px-8 rounded-xl shadow-lg shadow-brand-cinemaGold/10 transition-all hover:-translate-y-1">
                    <Link href={action.href}>{action.label}</Link>
                </Button>
            )}
        </div>
    );
}

