import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-helpers';

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin();
        const { id } = await params;

        await prisma.comment.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ message: 'Comment deleted' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting comment' }, { status: 500 });
    }
}
