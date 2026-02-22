import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const collectionId = parseInt(id);

        if (isNaN(collectionId)) {
            return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
        }

        const collection = await prisma.user_collection.findUnique({
            where: {
                id: collectionId,
                isPublic: true
            },
            include: {
                user: {
                    select: { name: true, image: true }
                },
                movies: {
                    include: {
                        movie: true
                    }
                }
            }
        });

        if (!collection) {
            return NextResponse.json({
                message: 'Collection not found or private',
                debug: { requestedId: id, parsedId: collectionId }
            }, { status: 404 });
        }

        return NextResponse.json(collection);
    } catch (error) {
        console.error('Public Collection API Error:', error);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}
