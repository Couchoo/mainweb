import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { name, image } = await req.json();
        const userId = parseInt((session.user as any).id);

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: name || undefined,
                image: image || undefined
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}
