import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        const currentUserId = session?.user ? parseInt((session.user as any).id) : null;

        const { id } = await params;
        const comments = await prisma.comment.findMany({
            where: {
                movieId: parseInt(id),
                parentId: null // Only fetch top-level comments first
            },
            include: {
                user: {
                    select: { name: true, image: true, email: true, role: true }
                },
                replies: {
                    include: {
                        user: {
                            select: { name: true, image: true, email: true, role: true }
                        },
                        _count: {
                            select: { likes: true }
                        }
                    },
                    orderBy: { createdAt: 'asc' }
                },
                likes: currentUserId ? {
                    where: { userId: currentUserId }
                } : false,
                _count: {
                    select: { likes: true, replies: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(comments);
    } catch (error) {
        console.error('Comments GET error:', error);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const { content, rating, parentId } = await request.json();
        const userId = parseInt((session.user as any).id);

        const comment = await prisma.comment.create({
            data: {
                content,
                rating: rating ? parseInt(rating) : null,
                movieId: parseInt(id),
                userId: userId,
                parentId: parentId ? parseInt(parentId) : null
            },
            include: {
                user: {
                    select: { name: true, image: true, email: true, role: true }
                }
            }
        });

        return NextResponse.json(comment);
    } catch (error) {
        console.error('Comments POST error:', error);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}
