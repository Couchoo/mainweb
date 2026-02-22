import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        // Security: Only allow ADMIN or SUPER_ADMIN to add popcorn
        const userRole = (session?.user as any)?.role;
        if (!['ADMIN', 'SUPER_ADMIN'].includes(userRole)) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        const { userId, amount } = await request.json();

        if (!userId || !amount || isNaN(amount)) {
            return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: { popcornBalance: { increment: parseInt(amount) } },
            select: { id: true, name: true, popcornBalance: true }
        });

        // 📜 Log as a manual admin adjustment
        await prisma.popcorn_transaction.create({
            data: {
                userId: updatedUser.id,
                type: 'PURCHASE', // Using PURCHASE as a generic "Inflow" or we could add ADMIN_ADD
                amount: parseInt(amount),
                targetName: 'Системно добавяне (Admin)',
                metadata: JSON.stringify({ adminEmail: session?.user?.email })
            }
        });

        return NextResponse.json({
            message: `Добавени ${amount} пуканки на ${updatedUser.name}`,
            newBalance: updatedUser.popcornBalance
        });
    } catch (error: any) {
        console.error('Admin Popcorn Add Error:', error);
        return NextResponse.json({ message: error.message || 'Error' }, { status: 500 });
    }
}
