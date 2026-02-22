import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-helpers';

export async function POST(req: Request) {
    try {
        await requireAdmin();
        const { name, slug } = await req.json();

        const category = await prisma.category.create({
            data: { name, slug }
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: 'Error creating category' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching categories' }, { status: 500 });
    }
}
