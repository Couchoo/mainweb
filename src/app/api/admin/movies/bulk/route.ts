import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        await requireAdmin();
        const { action, movieIds } = await request.json();

        if (!movieIds || !Array.isArray(movieIds) || movieIds.length === 0) {
            return NextResponse.json({ message: 'No movie IDs provided' }, { status: 400 });
        }

        switch (action) {
            case 'delete':
                // Delete related data first using any to avoid casing issues with Prisma
                const p = prisma as any;
                await Promise.all([
                    p.moviecategory.deleteMany({
                        where: { movieId: { in: movieIds.map((id: any) => parseInt(id)) } },
                    }),
                    p.videoserver.deleteMany({
                        where: { movieId: { in: movieIds.map((id: any) => parseInt(id)) } },
                    }),
                    p.comment.deleteMany({
                        where: { movieId: { in: movieIds.map((id: any) => parseInt(id)) } },
                    }),
                    p.watchhistory.deleteMany({
                        where: { movieId: { in: movieIds.map((id: any) => parseInt(id)) } },
                    }),
                    p.watchlist.deleteMany({
                        where: { movieId: { in: movieIds.map((id: any) => parseInt(id)) } },
                    }),
                ]);

                // Finally delete the movies
                const deleteResult = await prisma.movie.deleteMany({
                    where: { id: { in: movieIds.map((id: any) => parseInt(id)) } },
                });

                return NextResponse.json({
                    message: `Successfully deleted ${deleteResult.count} movies`,
                    count: deleteResult.count
                });

            case 'publish':
                const publishResult = await prisma.movie.updateMany({
                    where: { id: { in: movieIds.map((id: any) => parseInt(id)) } },
                    data: { published: true },
                });
                return NextResponse.json({
                    message: `Successfully published ${publishResult.count} movies`,
                    count: publishResult.count
                });

            case 'unpublish':
                const unpublishResult = await prisma.movie.updateMany({
                    where: { id: { in: movieIds.map((id: any) => parseInt(id)) } },
                    data: { published: false },
                });
                return NextResponse.json({
                    message: `Successfully unpublished ${unpublishResult.count} movies`,
                    count: unpublishResult.count
                });

            case 'updateCategories':
                const { categoryIds } = await request.json();
                if (!categoryIds || !Array.isArray(categoryIds)) {
                    return NextResponse.json({ message: 'No category IDs provided' }, { status: 400 });
                }

                await prisma.$transaction(async (tx) => {
                    // First remove existing categories for these movies
                    const p = tx as any;
                    await p.moviecategory.deleteMany({
                        where: { movieId: { in: movieIds.map((id: any) => parseInt(id)) } }
                    });

                    // Then add new categories
                    const data = [];
                    for (const movieId of movieIds) {
                        for (const categoryId of categoryIds) {
                            data.push({
                                movieId: parseInt(movieId),
                                categoryId: parseInt(categoryId)
                            });
                        }
                    }
                    await p.moviecategory.createMany({
                        data
                    });
                });

                return NextResponse.json({
                    message: `Successfully updated categories for ${movieIds.length} movies`
                });

            default:
                return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
        }
    } catch (error: any) {
        console.error('Bulk action error:', error);
        return NextResponse.json({ message: error.message || 'Error' }, { status: 500 });
    }
}
