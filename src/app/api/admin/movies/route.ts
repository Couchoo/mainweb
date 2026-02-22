import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-helpers';

export async function POST(request: NextRequest) {
    try {
        await requireAdmin();
        const body = await request.json();
        const { checkServerLink } = await import('@/lib/health/link-checker');

        // Validate vidsrc server if provided
        let vidsrcValid = false;
        let shouldPublish = true;

        let vidsrcServer = null;
        if (body.videoServers && body.videoServers.length > 0) {
            vidsrcServer = body.videoServers.find((s: any) =>
                s.name.toLowerCase().includes('vidsrc')
            );

            if (vidsrcServer) {
                console.log(`[Movie Creation] Validating vidsrc: ${vidsrcServer.url}`);
                const validation = await checkServerLink(
                    vidsrcServer.url,
                    0,
                    vidsrcServer.name
                );

                vidsrcValid = validation.isWorking;

                if (!vidsrcValid) {
                    console.log(`[Movie Creation] Vidsrc invalid - will archive movie`);
                    shouldPublish = false;
                } else {
                    console.log(`[Movie Creation] Vidsrc valid - will publish movie`);
                }
            }
        }


        const {
            titleBG, titleEN, slug, description, year,
            duration, director, cast, videoUrl,
            trailerUrl, posterUrl, backdropUrl, isHD,
            rating, imdbLink, featured, published, categories, videoServers
        } = body;

        const movie = await prisma.movie.create({
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
                published: shouldPublish && !!published, // Archive if vidsrc invalid
                healthStatus: shouldPublish ? 'OK' : 'ARCHIVED',
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

        // If archived due to invalid vidsrc, add to review queue
        if (!shouldPublish && vidsrcServer) {
            await (prisma as any).$executeRawUnsafe(`
                INSERT INTO fixed_movies_review 
                (movieId, movieTitle, movieSlug, fixType, serversRemoved, reviewStatus, fixedAt)
                VALUES (?, ?, ?, 'manual', 0, 'pending', ?)
            `, movie.id, movie.titleEN || movie.titleBG, movie.slug, new Date());

            await (prisma as any).$executeRawUnsafe(`
                INSERT INTO movie_fix_log 
                (movieId, action, notes, createdAt)
                VALUES (?, 'archived', ?, ?)
            `, movie.id, 'Invalid vidsrc detected during scraping', new Date());
        }

        return NextResponse.json(movie, { status: 201 });
    } catch (error: any) {
        console.error('Admin Create Movie Error:', error);
        return NextResponse.json({ message: error.message || 'Error creating movie' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await requireAdmin();
        const movies = await prisma.movie.findMany({
            orderBy: { createdAt: 'desc' },
            include: { moviecategory: { include: { category: true } } }
        });
        return NextResponse.json(movies);
    } catch (error: any) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
}
