/**
 * ws-publisher.ts
 * Utility for Next.js API routes to publish real-time events to the Go WebSocket server.
 * Fire-and-forget — never blocks the response to the client.
 */

const WS_INTERNAL_URL = process.env.WS_INTERNAL_URL || 'http://localhost:8080';
const WS_INTERNAL_SECRET_RAW = process.env.WS_INTERNAL_SECRET || 'cinema-ws-secret-change-in-production';
const WS_INTERNAL_SECRET = WS_INTERNAL_SECRET_RAW.replace(/^["']|["']$/g, '');

/**
 * Broadcast a message to all connected WebSocket clients.
 * Called after every DB write (chat, gift, etc.)
 */
export async function publishToWS(type: string, payload: unknown): Promise<void> {
    try {
        await fetch(`${WS_INTERNAL_URL}/internal/broadcast`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${WS_INTERNAL_SECRET}`,
            },
            body: JSON.stringify({ type, payload }),
            signal: AbortSignal.timeout(2000), // 2s max — never block the user
        });
    } catch (error) {
        console.error(`[WS-PUBLISHER] Failed to broadcast ${type}:`, error);
        // WS server might be down — that's OK, DB write already succeeded
        // Client will see the message on next poll (fallback)
    }
}

/**
 * Update the Go server's cinema state (called when admin changes the schedule).
 */
export async function publishCinemaState(state: {
    movieId: number;
    movieTitle: string;
    startTime: string;
    endTime: string;
    isLive: boolean;
    videoUrl?: string;
}): Promise<void> {
    try {
        await fetch(`${WS_INTERNAL_URL}/internal/cinema`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${WS_INTERNAL_SECRET}`,
            },
            body: JSON.stringify(state),
            signal: AbortSignal.timeout(2000),
        });
    } catch (error) {
        console.error(`[WS-PUBLISHER] Failed to update cinema state:`, error);
        // same — graceful degradation
    }
}
