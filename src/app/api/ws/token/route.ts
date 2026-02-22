import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import crypto from 'crypto';

/**
 * GET /api/ws/token
 * Issues a short-lived HMAC-signed token for WebSocket auth.
 * The Go WS server verifies this token without calling back to Next.js.
 */
export async function GET() {
    const session = await getServerSession(authOptions);
    const secretRaw = process.env.WS_INTERNAL_SECRET!;
    const secret = secretRaw?.trim().replace(/^["']|["']$/g, '');
    if (!secret) {
        return NextResponse.json({ error: 'WS not configured' }, { status: 500 });
    }

    const user = session?.user as any;

    const payload = JSON.stringify({
        userId: user ? parseInt(user.id) : 0,
        name: user?.name || 'Guest',
        role: user?.role || 'GUEST',
        image: user?.image || '',
        exp: Date.now() + 300_000,
    });

    const payloadB64 = Buffer.from(payload).toString('base64url');
    const sig = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    const token = `${payloadB64}.${sig}`;

    return NextResponse.json({ token });
}
