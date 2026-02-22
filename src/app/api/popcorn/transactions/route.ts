import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userId = parseInt((session.user as any).id);

        const transactions = await prisma.popcorn_transaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { popcornBalance: true }
        });

        return NextResponse.json({
            transactions,
            balance: user?.popcornBalance || 0
        });
    } catch (error) {
        console.error('Popcorn Transactions Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
