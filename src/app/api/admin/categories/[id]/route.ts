import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-helpers';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await requireAdmin();
        const { id } = await params;
        const { name, slug } = await req.json();

        const category = await prisma.category.update({
            where: { id: parseInt(id) },
            data: { name, slug }
        });

        return NextResponse.json(category);
    } catch (error: any) {
        return NextResponse.json({ message: 'Error updating category' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await requireAdmin();
        const { id } = await params;

        await prisma.category.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ message: 'Category deleted' });
    } catch (error: any) {
        return NextResponse.json({ message: 'Error deleting category' }, { status: 500 });
    }
}
