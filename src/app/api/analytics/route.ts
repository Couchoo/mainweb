import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { event, movieId, metadata } = await req.json();

        // Basic IP/UA tracking
        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        const userAgent = req.headers.get('user-agent') || 'unknown';

        await prisma.analytics.create({
            data: {
                event,
                movieId: movieId ? parseInt(movieId) : null,
                userId: session?.user ? parseInt((session.user as any).id) : null,
                metadata: metadata ? JSON.stringify(metadata) : null,
                ip,
                userAgent
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Analytics Error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
