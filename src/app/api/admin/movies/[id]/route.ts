import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-helpers';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await requireAdmin();
        const { id } = await params;
        const data = await req.json();

        const {
            titleBG, titleEN, slug, description, year,
            duration, director, cast, videoUrl,
            trailerUrl, posterUrl, backdropUrl, isHD,
            rating, imdbLink, featured, published, categories, videoServers
        } = data;

        // Delete existing categories and video servers first to replace them
        await Promise.all([
            (prisma as any).moviecategory.deleteMany({
                where: { movieId: parseInt(id) }
            }),
            (prisma as any).videoserver.deleteMany({
                where: { movieId: parseInt(id) }
            })
        ]);

        const movie = await prisma.movie.update({
            where: { id: parseInt(id) },
            data: {
                titleBG, titleEN, slug, description,
                year: parseInt(year),
                duration: duration ? parseInt(duration) : null,
                director, cast, videoUrl: videoUrl || null,
                trailerUrl, posterUrl, backdropUrl,
                isHD: !!isHD,
                rating: rating ? parseFloat(rating) : null,
                imdbLink,
                featured: !!featured,
                published: !!published,
                moviecategory: {
                    create: (categories || []).map((catId: number) => ({
                        categoryId: catId
                    }))
                },
                videoserver: videoServers && videoServers.length > 0 ? {
                    create: videoServers.map((vs: any) => ({
                        name: vs.name,
                        url: vs.url,
                        order: vs.order || 0
                    }))
                } : undefined
            },
            include: {
                videoserver: true,
                moviecategory: { include: { category: true } }
            }
        });

        return NextResponse.json(movie);
    } catch (error: any) {
        console.error('Admin Update Movie Error:', error);
        return NextResponse.json({ message: error.message || 'Error updating movie' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await requireAdmin();
        const { id } = await params;

        await prisma.movie.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ message: 'Movie deleted successfully' });
    } catch (error: any) {
        console.error('Admin Delete Movie Error:', error);
        return NextResponse.json({ message: error.message || 'Error deleting movie' }, { status: 500 });
    }
}
