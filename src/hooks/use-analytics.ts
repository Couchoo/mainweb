'use client';

import { useCallback } from 'react';

export function useAnalytics() {
    const track = useCallback(async (event: string, data: { movieId?: number; metadata?: any } = {}) => {
        try {
            fetch('/api/analytics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event,
                    movieId: data.movieId,
                    metadata: data.metadata,
                }),
            });
        } catch (error) {
            // Fail silently
        }
    }, []);

    return { track };
}
