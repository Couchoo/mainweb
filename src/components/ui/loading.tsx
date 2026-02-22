import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    className?: string;
}

export function Loading({ size = 'md', text, className }: LoadingProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    return (
        <div className={cn('flex flex-col items-center justify-center gap-4 py-12', className)}>
            <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
            {text && (
                <p className="text-muted-foreground animate-pulse">{text}</p>
            )}
        </div>
    );
}

export function LoadingSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="aspect-[2/3] bg-secondary/20 rounded-xl animate-pulse"
                />
            ))}
        </div>
    );
}

