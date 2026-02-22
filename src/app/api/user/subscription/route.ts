import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const subscription = await prisma.subscription.findUnique({
            where: {
                userId: Number((session.user as any).id)
            }
        });

        if (!subscription) {
            return NextResponse.json({
                hasActiveSubscription: false,
                role: (session.user as any).role
            });
        }

        return NextResponse.json({
            hasActiveSubscription: true,
            status: subscription.status,
            currentPeriodEnd: subscription.currentPeriodEnd,
            cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
            priceId: subscription.priceId,
            role: (session.user as any).role
        });

    } catch (error: any) {
        console.error('Subscription Fetch Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
