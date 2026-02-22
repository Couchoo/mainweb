import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { publishToWS } from '@/lib/ws-publisher';

export async function GET(request: NextRequest) {
    try {
        const messages = await (prisma as any).cinema_message.findMany({
            include: {
                user: {
                    select: { id: true, name: true, image: true, email: true, role: true }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 50
        });
        return NextResponse.json(messages.reverse());
    } catch (error) {
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { content, type } = await request.json();
        const userId = parseInt((session.user as any).id);

        const message = await (prisma as any).cinema_message.create({
            data: {
                content: content,
                userId: userId,
                type: type || 'text'
            },
            include: {
                user: {
                    select: { id: true, name: true, image: true, email: true, role: true }
                }
            }
        });

        // 🚀 Push to all WS clients instantly (fire-and-forget, never blocks response)
        publishToWS('chat:message', message);

        return NextResponse.json(message);
    } catch (error) {
        console.error('Chat POST error:', error);
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}
