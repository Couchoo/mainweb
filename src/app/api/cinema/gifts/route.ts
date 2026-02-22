import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { publishToWS } from '@/lib/ws-publisher';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const senderId = parseInt((session.user as any).id);
        const { type, amount, receiverId } = await request.json();

        if (!type || !amount || isNaN(amount) || amount <= 0) {
            return NextResponse.json({ message: 'Invalid gift details' }, { status: 400 });
        }

        if (receiverId && senderId === parseInt(receiverId)) {
            return NextResponse.json({ message: 'Не можете да изпращате подарък на себе си.' }, { status: 400 });
        }

        // 1. Transaction: Deduct from sender, Add to recipient (60/40), Log gift
        const result = await prisma.$transaction(async (tx) => {
            const sender = await (tx as any).user.findUnique({
                where: { id: senderId },
                select: { popcornBalance: true, name: true, image: true, role: true }
            });

            if (!sender || sender.popcornBalance < amount) {
                throw new Error('Insufficient balance');
            }

            // Deduct from sender, increment XP
            await (tx as any).user.update({
                where: { id: senderId },
                data: {
                    popcornBalance: { decrement: amount },
                    giftXP: { increment: amount }
                }
            });

            let receiver = null;
            if (receiverId && !receiverId.toString().startsWith('guest-')) {
                const rId = parseInt(receiverId);
                if (!isNaN(rId)) {
                    // Check if receiver exists before updating to avoid Prisma crash
                    const existingReceiver = await (tx as any).user.findUnique({
                        where: { id: rId },
                        select: { id: true, name: true, image: true, role: true }
                    });

                    if (existingReceiver) {
                        const recipientShare = Math.floor(amount * 0.6);
                        receiver = await (tx as any).user.update({
                            where: { id: rId },
                            data: { popcornBalance: { increment: recipientShare } },
                            select: { id: true, name: true, image: true, role: true }
                        });
                    }
                }
            }

            // Log gift as a chat message so it appears in the chat room
            const message = await (tx as any).cinema_message.create({
                data: { content: type, type: 'gift', userId: senderId },
                include: { user: { select: { id: true, name: true, image: true, role: true } } }
            });

            // 📜 Log Popcorn Transactions
            await (tx as any).popcorn_transaction.create({
                data: {
                    userId: senderId,
                    type: 'GIFT_SENT',
                    amount: -amount,
                    targetName: receiver ? receiver.name : 'Cinema Room',
                    metadata: JSON.stringify({ giftType: type })
                }
            });

            if (receiver) {
                await (tx as any).popcorn_transaction.create({
                    data: {
                        userId: receiver.id,
                        type: 'GIFT_RECEIVED',
                        amount: Math.floor(amount * 0.6),
                        targetName: sender.name,
                        metadata: JSON.stringify({ giftType: type, originalAmount: amount })
                    }
                });
            }

            return { message, sender, receiver };
        });

        // 🚀 Push gift animation to WebSocket (includes IDs for selective visibility)
        publishToWS('gift:received', {
            from: { id: senderId, name: (session.user as any).name, image: (session.user as any).image },
            to: (result as any).receiver ? { id: (result as any).receiver.id, name: (result as any).receiver.name } : null,
            giftType: type,
            amount,
            senderId,
            receiverId: receiverId ? parseInt(receiverId) : null
        });
        // Also push the chat message so it appears in the chat list
        publishToWS('chat:message', (result as any).message);

        return NextResponse.json((result as any).message);
    } catch (error: any) {
        console.error('Gifting API Error:', error);
        return NextResponse.json({ message: error.message || 'Error' }, { status: 500 });
    }
}
