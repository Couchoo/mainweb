import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const role = (session?.user as any)?.role;

    // Only Admins can pause the cinema
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { isPaused } = await req.json();

        // Forward to Go WebSocket server
        const wsInternalUrl = process.env.WS_INTERNAL_URL || 'http://localhost:8080';
        const secret = process.env.WS_INTERNAL_SECRET || 'cinema-ws-secret-change-in-production';

        const res = await fetch(`${wsInternalUrl}/internal/cinema/pause`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${secret}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isPaused }),
        });

        if (!res.ok) {
            const error = await res.text();
            console.error('[CINEMA-PAUSE] Go server error:', error);
            return NextResponse.json({ error: 'Go server error' }, { status: 500 });
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('[CINEMA-PAUSE] Request error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
