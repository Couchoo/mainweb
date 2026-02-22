import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-helpers';

export async function GET() {
    try {
        await requireAdmin();
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                banned: true,
                createdAt: true,
                subscription: true
            }
        });
        return NextResponse.json(users);
    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Unauthorized' }, { status: 401 });
    }
}

export async function PUT(req: Request) {
    try {
        await requireAdmin();
        const { userId, role, banned } = await req.json();

        const user = await prisma.user.update({
            where: { id: parseInt(userId) },
            data: {
                role: role !== undefined ? role : undefined,
                banned: banned !== undefined ? banned : undefined
            }
        });

        return NextResponse.json(user);
    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Error' }, { status: 500 });
    }
}
