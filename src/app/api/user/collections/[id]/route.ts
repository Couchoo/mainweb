import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const collection = await prisma.user_collection.findUnique({
            where: { id: parseInt(id) },
            include: {
                movies: {
                    include: {
                        movie: true
                    }
                }
            }
        });

        if (!collection) {
            return NextResponse.json({ message: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(collection);
    } catch (error) {
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
        const { movieId } = await request.json();

        const collectionItem = await prisma.user_collection_movie.create({
            data: {
                collectionId: parseInt(id),
                movieId: parseInt(movieId)
            }
        });

        return NextResponse.json(collectionItem);
    } catch (error) {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const { movieId } = await request.json();

        // If movieId is provided, remove only that movie
        if (movieId) {
            await prisma.user_collection_movie.delete({
                where: {
                    collectionId_movieId: {
                        collectionId: parseInt(id),
                        movieId: parseInt(movieId)
                    }
                }
            });
            return NextResponse.json({ success: true });
        }

        // Otherwise delete the whole collection
        await prisma.user_collection.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}
