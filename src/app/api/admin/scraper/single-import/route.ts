import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { scrapeMovieData } from '@/lib/scraper';
import { checkServerLink } from '@/lib/health/link-checker';

/**
 * POST /api/admin/scraper/single-import
 * Import a single movie from IMDB URL with vidsrc validation
 * Uses EXACT same logic as mass-import for testing
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { imdbUrl } = body;

        if (!imdbUrl || !imdbUrl.includes('imdb.com')) {
            return NextResponse.json({
                success: false,
                error: 'Valid IMDB URL required'
            }, { status: 400 });
        }

        // Extract IMDB ID
        const imdbIdMatch = imdbUrl.match(/tt\d+/);
        if (!imdbIdMatch) {
            return NextResponse.json({
                success: false,
                error: 'Could not extract IMDB ID from URL'
            }, { status: 400 });
        }

        const imdbId = imdbIdMatch[0];

        // Check if already exists
        const existing = await (prisma as any).movie.findFirst({
            where: { imdbId }
        });

        if (existing) {
            return NextResponse.json({
                success: false,
                error: 'Movie already exists in database',
                movieId: existing.id,
                slug: existing.slug
            }, { status: 409 });
        }

        // Scrape IMDB data
        console.log(`[Single Import] Scraping IMDB: ${imdbUrl}`);
        const imdbData = await scrapeMovieData(imdbUrl);

        if (!imdbData || !imdbData.titleEN) {
            return NextResponse.json({
                success: false,
                error: 'Failed to scrape IMDB data'
            }, { status: 500 });
        }

        // Generate slug
        const generateSlug = (title: string) => {
            return title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
        };

        let movieSlug = generateSlug(imdbData.titleEN);
        if (!movieSlug || movieSlug.length < 2) {
            movieSlug = imdbId;
        }

        // Check slug uniqueness
        const slugExists = await (prisma as any).movie.findFirst({
            where: { slug: movieSlug }
        });

        if (slugExists) {
            movieSlug = `${movieSlug}-${imdbId}`;
        }

        // Get Bulgarian genre mapping
        const getBulgarianGenre = (englishGenre: string): string => {
            const genreMap: { [key: string]: string } = {
                'Action': 'Екшън',
                'Adventure': 'Приключенски',
                'Animation': 'Анимация',
                'Biography': 'Биография',
                'Comedy': 'Комедия',
                'Crime': 'Криминален',
                'Drama': 'Драма',
                'Family': 'Семеен',
                'Fantasy': 'Фантастика',
                'Horror': 'Ужаси',
                'Mystery': 'Мистерия',
                'Romance': 'Романтика',
                'Sci-Fi': 'Научна фантастика',
                'Thriller': 'Трилър',
                'War': 'Военен',
                'Western': 'Уестърн',
                'History': 'Исторически',
                'Music': 'Музикален',
                'Sport': 'Спортен'
            };
            return genreMap[englishGenre] || englishGenre;
        };

        // Create categories
        const categoriesToLink = (imdbData.genres || []).map((rawGenre: string) => {
            const bgGenre = getBulgarianGenre(rawGenre);
            const slug = bgGenre.toLowerCase().replace(/[^а-яa-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

            return {
                category: {
                    connectOrCreate: {
                        where: { name: bgGenre },
                        create: {
                            name: bgGenre,
                            slug: slug
                        }
                    }
                }
            };
        });

        // Create movie with vidsrc servers (EXACT SAME AS MASS IMPORT)
        console.log(`[Single Import] Creating movie: ${imdbData.titleEN}`);
        const newMovie = await (prisma as any).movie.create({
            data: {
                titleBG: imdbData.titleBG || imdbData.titleEN,
                titleEN: imdbData.titleEN,
                slug: movieSlug,
                description: imdbData.description,
                year: parseInt(imdbData.year) || new Date().getFullYear(),
                duration: imdbData.duration ? parseInt(imdbData.duration) : null,
                director: imdbData.director,
                cast: imdbData.cast,
                posterUrl: imdbData.posterUrl,
                rating: imdbData.rating ? parseFloat(imdbData.rating) : null,
                imdbId: imdbId,
                imdbLink: imdbUrl,
                published: false,
                healthStatus: 'PENDING',
                moviecategory: {
                    create: categoriesToLink
                },
                videoserver: {
                    create: [
                        {
                            name: 'Vidsrc',
                            url: `https://vidsrc.xyz/embed/movie/${imdbId}`,
                            order: 1
                        }
                    ]
                }
            },
            include: {
                videoserver: true,
                moviecategory: { include: { category: true } }
            }
        });

        // Validate vidsrc servers (EXACT SAME AS MASS IMPORT)
        console.log(`[Single Import] Validating vidsrc servers...`);
        let hasValidVidsrc = false;
        const validationResults = [];

        for (const server of newMovie.videoserver) {
            if (server.name.toLowerCase().includes('vidsrc')) {
                console.log(`[Single Import] Checking ${server.name}: ${server.url}`);
                const validation = await checkServerLink(server.url, 0, server.name);

                validationResults.push({
                    name: server.name,
                    url: server.url,
                    isWorking: validation.isWorking,
                    statusCode: validation.statusCode
                });

                if (validation.isWorking) {
                    hasValidVidsrc = true;
                    console.log(`[Single Import] ✅ ${server.name} is VALID`);
                    break;
                } else {
                    console.log(`[Single Import] ❌ ${server.name} is INVALID (${validation.statusCode})`);
                }
            }
        }

        // Archive if no valid vidsrc (EXACT SAME AS MASS IMPORT)
        if (!hasValidVidsrc) {
            console.log(`[Single Import] ⚠️ No valid vidsrc found - ARCHIVING movie`);

            await (prisma as any).$executeRawUnsafe(`
                UPDATE movie 
                SET published = 0, healthStatus = 'ARCHIVED'
                WHERE id = ?
            `, newMovie.id);

            // Add to review queue
            await (prisma as any).$executeRawUnsafe(`
                INSERT INTO fixed_movies_review 
                (movieId, movieTitle, movieSlug, fixType, serversRemoved, reviewStatus, fixedAt)
                VALUES (?, ?, ?, 'manual', 0, 'pending', ?)
            `, newMovie.id, newMovie.titleEN || newMovie.titleBG, newMovie.slug, new Date());

            // Log action
            await (prisma as any).$executeRawUnsafe(`
                INSERT INTO movie_fix_log 
                (movieId, action, notes, createdAt)
                VALUES (?, 'archived', ?, ?)
            `, newMovie.id, 'Invalid vidsrc detected during single import', new Date());

            return NextResponse.json({
                success: true,
                archived: true,
                movie: {
                    id: newMovie.id,
                    title: newMovie.titleEN,
                    slug: newMovie.slug,
                    imdbId: newMovie.imdbId,
                    published: false,
                    healthStatus: 'ARCHIVED'
                },
                validationResults,
                message: '⚠️ Movie imported but ARCHIVED due to invalid vidsrc. Check Review Queue.'
            });
        }

        // Successfully validated - Publish!
        await (prisma as any).$executeRawUnsafe(`
            UPDATE movie 
            SET published = 1, healthStatus = 'OK'
            WHERE id = ?
        `, newMovie.id);

        // Try to auto-group into collection
        try {
            const { autoGroupMovieToCollection } = await import('@/lib/collection-utils');
            await autoGroupMovieToCollection(newMovie.id, newMovie.titleEN);
        } catch (collErr) {
            console.error(`[Single Import] Collection grouping failed:`, collErr);
        }

        // Success - published
        console.log(`[Single Import] ✅ Movie imported and PUBLISHED`);
        return NextResponse.json({
            success: true,
            archived: false,
            movie: {
                id: newMovie.id,
                title: newMovie.titleEN,
                slug: newMovie.slug,
                imdbId: newMovie.imdbId,
                published: true,
                healthStatus: 'OK'
            },
            validationResults,
            message: '✅ Movie imported successfully with valid vidsrc'
        });

    } catch (error: any) {
        console.error('[Single Import] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
