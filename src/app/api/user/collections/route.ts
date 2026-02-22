import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userId = parseInt((session.user as any).id);
        const collections = await prisma.user_collection.findMany({
            where: { userId },
            include: {
                _count: {
                    select: { movies: true }
                }
            },
            orderBy: { updatedAt: 'desc' }
        });

        return NextResponse.json(collections);
    } catch (error) {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}

function simpleSlugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userId = parseInt((session.user as any).id);
        const { name, isPublic } = await request.json();

        if (!name) {
            return NextResponse.json({ message: 'Name is required' }, { status: 400 });
        }

        const slug = simpleSlugify(name);

        const collection = await prisma.user_collection.create({
            data: {
                name,
                slug,
                userId,
                isPublic: isPublic ?? true
            }
        });

        return NextResponse.json(collection);
    } catch (error) {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}
