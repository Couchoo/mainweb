import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * POST /api/cinema/heartbeat
 * Updates user presence in the cinema room
 */
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userId = parseInt((session.user as any).id);

        // Update or create presence
        await (prisma as any).cinema_presence.upsert({
            where: { userId },
            create: { userId, lastSeen: new Date() },
            update: { lastSeen: new Date() }
        });

        // Cleanup stale presence (older than 30 seconds)
        const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);
        await (prisma as any).cinema_presence.deleteMany({
            where: { lastSeen: { lt: thirtySecondsAgo } }
        }).catch(() => { }); // Ignore concurrent delete errors

        // Get current active viewers
        const viewers = await (prisma as any).cinema_presence.findMany({
            include: {
                user: {
                    select: { id: true, name: true, image: true, role: true }
                }
            }
        });

        return NextResponse.json({
            success: true,
            viewers: viewers.map((v: any) => v.user)
        });

    } catch (error: any) {
        console.error('Cinema Heartbeat Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
