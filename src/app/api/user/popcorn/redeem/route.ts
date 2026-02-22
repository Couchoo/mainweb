import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { addMonths } from 'date-fns';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userId = parseInt((session.user as any).id);
        const REDEEM_COST = 5000; // 5,000 Popcorn for 1 Month VIP

        // Transaction: Check balance, deduct, and upgrade/extend subscription
        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({
                where: { id: userId },
                select: { popcornBalance: true, role: true }
            });

            if (!user || user.popcornBalance < REDEEM_COST) {
                throw new Error('Insufficient popcorn balance. Need 5,000 🍿');
            }

            // 1. Deduct Popcorn
            await tx.user.update({
                where: { id: userId },
                data: { popcornBalance: { decrement: REDEEM_COST } }
            });

            // 2. Upgrade/Extend VIP
            const currentSub = await tx.subscription.findUnique({
                where: { userId }
            });

            let newExpiry;
            if (currentSub && currentSub.status === 'ACTIVE') {
                newExpiry = addMonths(new Date(currentSub.currentPeriodEnd), 1);
            } else {
                newExpiry = addMonths(new Date(), 1);
            }

            const updatedSub = await tx.subscription.upsert({
                where: { userId },
                update: {
                    status: 'ACTIVE',
                    currentPeriodEnd: newExpiry,
                },
                create: {
                    userId,
                    id: `sub_${Date.now()}`,
                    stripeCustomerId: `popcorn_cust_${userId}`,
                    status: 'ACTIVE',
                    currentPeriodEnd: newExpiry,
                    stripeSubscriptionId: `popcorn_${Date.now()}`
                }
            });

            // 3. Update User Role if needed
            if (user.role !== 'ADMIN') {
                await tx.user.update({
                    where: { id: userId },
                    data: { role: 'VIP' }
                });
            }

            return {
                newBalance: user.popcornBalance - REDEEM_COST,
                expiry: updatedSub.currentPeriodEnd
            };
        });

        return NextResponse.json({
            message: 'Successfully redeemed VIP status!',
            newBalance: result.newBalance,
            expiry: result.expiry
        });

    } catch (error: any) {
        console.error('Redeem API Error:', error);
        return NextResponse.json({ message: error.message || 'Error' }, { status: 500 });
    }
}
