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

        const { movieId } = await req.json();
        const userId = parseInt((session.user as any).id);

        const existing = await (prisma as any).watchlist.findUnique({
            where: {
                userId_movieId: { userId, movieId: parseInt(movieId) }
            }
        });

        if (existing) {
            await (prisma as any).watchlist.delete({
                where: {
                    userId_movieId: { userId, movieId: parseInt(movieId) }
                }
            });
            return NextResponse.json({ added: false });
        } else {
            await (prisma as any).watchlist.create({
                data: {
                    userId,
                    movieId: parseInt(movieId)
                }
            });
            return NextResponse.json({ added: true });
        }
    } catch (error: any) {
        console.error('Watchlist Error:', error);
        return NextResponse.json(
            {
                message: error?.message || 'Възникна грешка при обработка на заявката',
                error: process.env.NODE_ENV === 'development' ? error?.stack : undefined
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json([]);
        }

        const userId = parseInt((session.user as any).id);
        const watchlist = await (prisma as any).watchlist.findMany({
            where: { userId },
            include: { movie: true }
        });

        return NextResponse.json(watchlist.map((w: any) => w.movie));
    } catch (error: any) {
        console.error('Watchlist GET Error:', error);
        return NextResponse.json(
            {
                message: error?.message || 'Възникна грешка при зареждане на списъка',
                error: process.env.NODE_ENV === 'development' ? error?.stack : undefined
            },
            { status: 500 }
        );
    }
}
