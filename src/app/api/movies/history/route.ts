import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { movieId, lastPosition } = await req.json();
        const userId = parseInt((session.user as any).id);

        console.log(`[History] Saving progress for user ${userId}, movie ${movieId}: ${lastPosition}s`);

        const history = await (prisma as any).watchhistory.upsert({
            where: {
                userId_movieId: { userId, movieId: parseInt(movieId) }
            },
            update: {
                lastPosition: parseInt(lastPosition),
                updatedAt: new Date()
            },
            create: {
                userId,
                movieId: parseInt(movieId),
                lastPosition: parseInt(lastPosition)
            }
        });

        return NextResponse.json(history);
    } catch (error) {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json([]);
        }

        const userId = parseInt((session.user as any).id);
        const history = await (prisma as any).watchhistory.findMany({
            where: { userId },
            include: {
                movie: true
            },
            orderBy: { updatedAt: 'desc' },
            take: 12
        });

        return NextResponse.json(history);
    } catch (error) {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}
