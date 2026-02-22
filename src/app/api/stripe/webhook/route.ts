import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import Stripe from 'stripe';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        if (!session?.client_reference_id) {
            return new NextResponse('User id is required', { status: 400 });
        }

        const subscriptionId = crypto.randomUUID();
        await prisma.subscription.create({
            data: {
                id: subscriptionId,
                userId: parseInt(session.client_reference_id),
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: (subscription as any).customer as string,
                priceId: (subscription as any).items.data[0].price.id,
                status: (subscription as any).status,
                currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
            },
        });

        await prisma.user.update({
            where: {
                id: parseInt(session.client_reference_id),
            },
            data: {
                role: 'VIP',
            },
        });
    }

    if (event.type === 'invoice.payment_succeeded') {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        await prisma.subscription.update({
            where: {
                stripeSubscriptionId: (subscription as any).id,
            },
            data: {
                priceId: (subscription as any).items.data[0].price.id,
                currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
            },
        });
    }

    return new NextResponse(null, { status: 200 });
}
