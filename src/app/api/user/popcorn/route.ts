import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userId = parseInt((session.user as any).id);
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { popcornBalance: true }
        });

        return NextResponse.json({ balance: user?.popcornBalance || 0 });
    } catch (error) {
        console.error('Popcorn Balance API Error:', error);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}
