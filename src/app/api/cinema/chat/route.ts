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
export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user || (session.user as any).role !== 'ADMIN' && (session.user as any).role !== 'SUPER_ADMIN') {
            // Internal system calls might not have session, so we also check for internal secret
            const authHeader = request.headers.get('Authorization');
            const secretRaw = process.env.WS_INTERNAL_SECRET!;
            const secret = secretRaw?.replace(/^["']|["']$/g, '');

            if (authHeader !== `Bearer ${secret}`) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }
        }

        await (prisma as any).cinema_message.deleteMany({});

        // Notify WS to clear chat UI for all clients
        publishToWS('chat:clear', {});

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error' }, { status: 500 });
    }
}
