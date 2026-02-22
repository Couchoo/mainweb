import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * POST /api/shop/popcorn/buy
 * Handles popcorn bundle fulfillment
 */
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userId = parseInt((session.user as any).id);
        const { bundleId, amount, price } = await request.json();

        if (!amount || amount <= 0) {
            return NextResponse.json({ message: 'Invalid amount' }, { status: 400 });
        }

        // Transactions are safer
        const updatedUser = await (prisma as any).user.update({
            where: { id: userId },
            data: {
                popcornBalance: {
                    increment: amount
                }
            },
            select: { popcornBalance: true }
        });

        // Log transaction (can add a dedicated table later if needed)
        console.log(`[Shop] User ${userId} purchased ${amount} popcorn for €${price}`);

        return NextResponse.json({
            success: true,
            newBalance: updatedUser.popcornBalance,
            message: `Успешно добавихте ${amount} пуканки!`
        });

    } catch (error: any) {
        console.error('Shop Fulfillment Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
