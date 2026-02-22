import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = parseInt((session.user as any).id);

        if (isNaN(userId)) {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        const [watchedCount, watchlistCount, collectionsCount, user] = await Promise.all([
            prisma.watchhistory.count({
                where: { userId }
            }),
            prisma.watchlist.count({
                where: { userId }
            }),
            prisma.user_collection.count({
                where: { userId }
            }),
            prisma.user.findUnique({
                where: { id: userId },
                select: {
                    popcornBalance: true,
                    giftXP: true,
                    role: true
                } as any
            })
        ]);

        return NextResponse.json({
            watched: watchedCount,
            watchlist: watchlistCount,
            collections: collectionsCount,
            popcorn: user?.popcornBalance || 0,
            xp: user?.giftXP || 0,
            role: user?.role || 'FREE'
        });
    } catch (error) {
        console.error('Error fetching user stats:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
