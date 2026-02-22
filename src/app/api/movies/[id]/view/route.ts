import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { movieId } = await req.json();

        if (!movieId) {
            return NextResponse.json({ message: 'Movie ID required' }, { status: 400 });
        }

        // Increment movie views
        await prisma.movie.update({
            where: { id: parseInt(movieId) },
            data: { views: { increment: 1 } }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error tracking view:', error);
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}
