import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

const VIP_COST = 5000; // 5000 Popcorn for 30 days

export async function POST() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userId = parseInt((session.user as any).id);

        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique({
                where: { id: userId },
                select: { popcornBalance: true, role: true }
            });

            if (!user || user.popcornBalance < VIP_COST) {
                throw new Error('Недостатъчен баланс на пуканки.');
            }

            // 1. Deduct popcorn
            await tx.user.update({
                where: { id: userId },
                data: {
                    popcornBalance: { decrement: VIP_COST },
                    role: 'VIP' // For simplicity, we just set role to VIP. 
                    // In a production app, we'd handle currentPeriodEnd etc.
                }
            });

            // 2. Create subscription record if not exists or update it
            await tx.subscription.upsert({
                where: { userId },
                create: {
                    id: crypto.randomUUID(),
                    userId,
                    stripeCustomerId: `popcorn_${userId}`,
                    status: 'ACTIVE',
                    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                },
                update: {
                    status: 'ACTIVE',
                    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                }
            });

            // 📜 3. Log transaction
            await tx.popcorn_transaction.create({
                data: {
                    userId,
                    type: 'VIP_UPGRADE',
                    amount: -VIP_COST,
                    targetName: '30 Дни VIP Абонамент',
                    metadata: JSON.stringify({ cost: VIP_COST, durationDays: 30 })
                }
            });

            return { success: true };
        });

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Buy VIP Error:', error);
        return NextResponse.json({ message: error.message || 'Error' }, { status: 400 });
    }
}
