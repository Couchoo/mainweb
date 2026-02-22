'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export type WSConnectionState = 'connecting' | 'connected' | 'disconnected' | 'error';

interface UseCinemaWSOptions {
    onCinemaSync?: (payload: CinemaSyncPayload) => void;
    onCinemaState?: (payload: CinemaStatePayload) => void;
    onChatMessage?: (payload: any) => void;
    onChatClear?: () => void;
    onGiftReceived?: (payload: GiftPayload) => void;
    onPresenceUpdate?: (payload: PresencePayload) => void;
    onCinemaReaction?: (payload: { emoji: string }) => void;
    onCinemaStreak?: (payload: { count: number; emoji: string }) => void;
    onScraperStatus?: (payload: any) => void;
}

export interface CinemaSyncPayload {
    movieId: number;
    movieTitle: string;
    offsetSeconds: number;
    isLive: boolean;
    isPaused: boolean;
    serverTimeMs: number;
    videoUrl?: string;
    viewerCount?: number;
    viewers?: any[];
}

export interface CinemaStatePayload {
    movieId: number;
    movieTitle: string;
    isLive: boolean;
    isPaused?: boolean;
    videoUrl?: string;
    startTime: string;
    endTime: string;
}

export interface GiftPayload {
    from: { name: string; image?: string };
    to: { name: string } | null;
    giftType: string;
    amount: number;
    senderId: number;
    receiverId: number | null;
}

export interface PresencePayload {
    count: number;
    viewers: Array<{ id: number; name: string; role: string; image?: string; createdAt?: string }>;
}

export function useCinemaWS(options: UseCinemaWSOptions = {}) {
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const reconnectDelay = useRef(1000);
    const mountedRef = useRef(true);

    const [connectionState, setConnectionState] = useState<WSConnectionState>('disconnected');

    // Store latest options in a ref to avoid stale closures in the WS message handler
    const optionsRef = useRef(options);
    useEffect(() => {
        optionsRef.current = options;
    }, [options]);

    const connect = useCallback(async () => {
        if (!mountedRef.current) return;
        if (wsRef.current?.readyState === WebSocket.OPEN) return;

        setConnectionState('connecting');

        try {
            // Get a fresh auth token from Next.js (60 second expiry)
            const tokenRes = await fetch('/api/ws/token', { credentials: 'include' });
            if (!tokenRes.ok) {
                // Not logged in — no WS connection needed (cinema still works read-only)
                setConnectionState('disconnected');
                return;
            }
            const { token } = await tokenRes.json();

            const baseUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
            const wsUrl = baseUrl.endsWith('/ws')
                ? `${baseUrl}?token=${token}`
                : `${baseUrl}/ws?token=${token}`;
            const ws = new WebSocket(wsUrl);
            wsRef.current = ws;

            ws.onopen = () => {
                if (!mountedRef.current) { ws.close(); return; }
                setConnectionState('connected');
                reconnectDelay.current = 1000; // reset backoff on success
                console.log('🎬 Cinema WebSocket connected');
            };

            ws.onmessage = (event) => {
                if (!mountedRef.current) return;
                try {
                    const msg = JSON.parse(event.data);
                    switch (msg.type) {
                        case 'cinema:sync':
                            optionsRef.current.onCinemaSync?.(msg.payload);
                            break;
                        case 'cinema:state':
                            optionsRef.current.onCinemaState?.(msg.payload);
                            break;
                        case 'chat:message':
                            optionsRef.current.onChatMessage?.(msg.payload);
                            break;
                        case 'chat:clear':
                            optionsRef.current.onChatClear?.();
                            break;
                        case 'gift:received':
                            optionsRef.current.onGiftReceived?.(msg.payload);
                            break;
                        case 'presence:update':
                            optionsRef.current.onPresenceUpdate?.(msg.payload);
                            break;
                        case 'cinema:reaction':
                            optionsRef.current.onCinemaReaction?.(msg.payload);
                            break;
                        case 'cinema:streak':
                            optionsRef.current.onCinemaStreak?.(msg.payload);
                            break;
                        case 'scraper:status':
                            optionsRef.current.onScraperStatus?.(msg.payload);
                            break;
                        case 'pong':
                            // latency measurement (server echoed our ping)
                            break;
                    }
                } catch (e) {
                    console.error('WS message parse error:', e);
                }
            };

            ws.onclose = () => {
                if (!mountedRef.current) return;
                setConnectionState('disconnected');
                console.log('Cinema WS closed, reconnecting in', reconnectDelay.current, 'ms');

                // Exponential backoff: 1s → 2s → 4s → 8s → … max 30s
                reconnectTimerRef.current = setTimeout(() => {
                    if (mountedRef.current) {
                        reconnectDelay.current = Math.min(reconnectDelay.current * 2, 30000);
                        connect();
                    }
                }, reconnectDelay.current);
            };

            ws.onerror = () => {
                setConnectionState('error');
            };

        } catch (e) {
            console.error('WS connect error:', e);
            setConnectionState('error');
            // Retry after delay
            reconnectTimerRef.current = setTimeout(() => {
                if (mountedRef.current) connect();
            }, reconnectDelay.current);
        }
    }, []); // eslint-disable-line

    useEffect(() => {
        mountedRef.current = true;
        connect();

        // Re-fetch token every 45 seconds before it expires (token expires in 60s)
        const tokenRefresh = setInterval(() => {
            if (mountedRef.current && wsRef.current?.readyState === WebSocket.OPEN) {
                // Token is embedded in connection URL — reconnect to renew
                // Only if current connection is healthy
            }
        }, 45_000);

        return () => {
            mountedRef.current = false;
            if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
            if (wsRef.current) wsRef.current.close();
            clearInterval(tokenRefresh);
        };
    }, [connect]);

    const sendPing = useCallback(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: 'ping' }));
        }
    }, []);

    const sendReaction = useCallback((emoji: string) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: 'cinema:reaction', payload: { emoji } }));
        }
    }, []);

    return { connectionState, sendPing, sendReaction };
}
