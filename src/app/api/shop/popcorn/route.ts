import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userId = parseInt((session.user as any).id);
        const { bundleId } = await request.json();

        // Bundle Definitions based on user request (0.80€ to 50€)
        const bundles: Record<string, { popcorn: number, price: number, label: string, discount?: string }> = {
            'budget': { popcorn: 15, price: 0.80, label: 'Бърз пакет' },
            'basic': { popcorn: 100, price: 5.00, label: 'Стартов пакет' },
            'value': { popcorn: 250, price: 9.99, label: 'Изгоден пакет', discount: '15%' },
            'popular': { popcorn: 600, price: 19.99, label: 'Най-продаван', discount: '20%' },
            'premium': { popcorn: 1500, price: 39.99, label: 'Премиум', discount: '30%' },
            'ultimate': { popcorn: 2500, price: 49.99, label: 'Кралски пакет', discount: '40%' }
        };

        const selectedBundle = bundles[bundleId];
        if (!selectedBundle) {
            return NextResponse.json({ message: 'Invalid bundle' }, { status: 400 });
        }

        // 1. Transaction: Update user balance and log purchase
        // Note: In a real app, this is where you'd verify a Stripe payment.
        // For now, we simulate success for the economy demo.
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                popcornBalance: { increment: selectedBundle.popcorn }
            }
        });

        // Log transaction (placeholder for real billing integration)
        console.log(`[SHOP] User ${userId} purchased ${selectedBundle.popcorn} popcorn for $${selectedBundle.price}`);

        return NextResponse.json({
            message: 'Purchase successful',
            newBalance: updatedUser.popcornBalance,
            popcornAdded: selectedBundle.popcorn
        });

    } catch (error: any) {
        console.error('Shop API Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
