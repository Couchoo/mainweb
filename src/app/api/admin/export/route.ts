import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
    try {
        await requireAdmin();

        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type') || 'movies';

        let csvContent = '';

        if (type === 'movies') {
            const movies = await prisma.movie.findMany({
                include: {
                    moviecategory: {
                        include: { category: true }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });

            // CSV Header
            csvContent = 'ID,Title BG,Title EN,Slug,Year,Duration,Rating,Director,Cast,Views,Published,Categories,Created At\n';

            // CSV Rows
            movies.forEach(movie => {
                const categories = (movie as any).moviecategory?.map((c: any) => c.category.name).join('|') || '';
                const row = [
                    movie.id,
                    `"${movie.titleBG.replace(/"/g, '""')}"`,
                    `"${movie.titleEN.replace(/"/g, '""')}"`,
                    movie.slug,
                    movie.year,
                    movie.duration || '',
                    movie.rating || '',
                    movie.director ? `"${movie.director.replace(/"/g, '""')}"` : '',
                    movie.cast ? `"${movie.cast.replace(/"/g, '""')}"` : '',
                    movie.views,
                    movie.published ? 'Yes' : 'No',
                    `"${categories}"`,
                    new Date(movie.createdAt).toISOString()
                ].join(',');
                csvContent += row + '\n';
            });

        } else if (type === 'analytics') {
            const analytics = await prisma.analytics.findMany({
                orderBy: { createdAt: 'desc' },
                take: 10000
            });

            csvContent = 'ID,Event,Movie ID,User ID,IP,Created At\n';

            analytics.forEach(event => {
                const row = [
                    event.id,
                    event.event,
                    event.movieId || '',
                    event.userId || '',
                    event.ip || '',
                    new Date(event.createdAt).toISOString()
                ].join(',');
                csvContent += row + '\n';
            });

        } else if (type === 'comments') {
            const comments = await prisma.comment.findMany({
                include: {
                    user: { select: { name: true, email: true } },
                    movie: { select: { titleBG: true } }
                },
                orderBy: { createdAt: 'desc' }
            });

            csvContent = 'ID,Movie,User Name,User Email,Rating,Comment,Created At\n';

            comments.forEach(comment => {
                const row = [
                    comment.id,
                    `"${comment.movie.titleBG.replace(/"/g, '""')}"`,
                    comment.user.name ? `"${comment.user.name.replace(/"/g, '""')}"` : '',
                    comment.user.email,
                    comment.rating || '',
                    `"${comment.content.replace(/"/g, '""')}"`,
                    new Date(comment.createdAt).toISOString()
                ].join(',');
                csvContent += row + '\n';
            });
        }

        const filename = `${type}_export_${new Date().toISOString().split('T')[0]}.csv`;

        return new NextResponse(csvContent, {
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });

    } catch (error: any) {
        console.error('Export error:', error);
        return NextResponse.json({ message: error.message || 'Error' }, { status: 500 });
    }
}
