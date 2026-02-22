import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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
        const commentId = parseInt(id);
        const userId = parseInt((session.user as any).id);

        // Check if already liked
        const existingLike = await prisma.comment_like.findUnique({
            where: {
                commentId_userId: {
                    commentId,
                    userId
                }
            }
        });

        if (existingLike) {
            // Unlike
            await prisma.comment_like.delete({
                where: { id: existingLike.id }
            });
            return NextResponse.json({ liked: false });
        } else {
            // Like
            await prisma.comment_like.create({
                data: {
                    commentId,
                    userId
                }
            });
            return NextResponse.json({ liked: true });
        }

    } catch (error: any) {
        console.error('Comment Like Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
