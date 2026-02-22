import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/db';
import { scrapeMovieData } from '@/lib/scraper';
import { getBulgarianGenre } from '@/lib/genre-mapping';

export async function POST(req: Request) {
    try {
        await requireAdmin();
        const { inputs, useAdvancedScraper } = await req.json();

        if (!inputs || !Array.isArray(inputs) || inputs.length === 0) {
            return NextResponse.json({ success: false, error: 'No inputs provided' }, { status: 400 });
        }

        const results = [];
        let successCount = 0;
        let failedCount = 0;
        let publishedCount = 0;

        for (const input of inputs) {
            const trimmedInput = input.trim();
            if (!trimmedInput) continue;

            try {
                // Determine URL
                let scrapeUrl = trimmedInput;
                let imdbId = '';

                if (trimmedInput.match(/^tt\d+$/)) {
                    imdbId = trimmedInput;
                    scrapeUrl = `https://www.imdb.com/title/${trimmedInput}/`;
                } else if (trimmedInput.includes('imdb.com/title/')) {
                    const match = trimmedInput.match(/title\/(tt\d+)/);
                    if (match) imdbId = match[1];
                }

                // Check if exists first (if we have an ID)
                if (imdbId) {
                    const existing = await (prisma as any).movie.findUnique({
                        where: { imdbId: imdbId }
                    });
                    if (existing) {
                        results.push({ input: trimmedInput, success: false, error: 'Already exists' });
                        failedCount++;
                        continue;
                    }
                }

                console.log(`[BulkImport] Scraping: ${scrapeUrl}`);
                const movieData = await scrapeMovieData(scrapeUrl);

                if (!movieData.titleEN) {
                    throw new Error('Failed to scrape title');
                }

                // Generate slug fallback
                let finalSlug = movieData.slug;
                if (!finalSlug || finalSlug.length < 2) {
                    finalSlug = imdbId || movieData.titleEN.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                }

                // Check slug existence
                const existingSlug = await (prisma as any).movie.findUnique({
                    where: { slug: finalSlug }
                });
                if (existingSlug) {
                    finalSlug = `${finalSlug}-${Math.floor(Math.random() * 1000)}`;
                }

                // Categories
                const categoriesToLink = (movieData.genres || []).map((rawGenre: string) => {
                    const bgGenre = getBulgarianGenre(rawGenre);
                    const slug = bgGenre.toLowerCase().replace(/[^а-яa-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                    return {
                        category: {
                            connectOrCreate: {
                                where: { name: bgGenre },
                                create: { name: bgGenre, slug: slug }
                            }
                        }
                    };
                });

                // Save Movie
                const newMovie = await (prisma as any).movie.create({
                    data: {
                        imdbId: imdbId || null,
                        titleBG: movieData.titleBG || movieData.titleEN,
                        titleEN: movieData.titleEN,
                        slug: finalSlug,
                        description: movieData.description || '',
                        descriptionEN: movieData.descriptionEN || movieData.description || '',
                        year: movieData.year ? parseInt(movieData.year) : new Date().getFullYear(),
                        duration: movieData.duration ? parseInt(movieData.duration) : null,
                        rating: movieData.rating ? parseFloat(movieData.rating) : null,
                        director: movieData.director || null,
                        cast: movieData.cast || null,
                        posterUrl: movieData.posterUrl || '',
                        published: true,
                        isSeries: movieData.isSeries || false,
                        updatedAt: new Date(),
                        moviecategory: {
                            create: categoriesToLink
                        }
                    }
                });

                // Add Vidsrc Server if IMDB ID exists
                let serversCount = 0;
                if (imdbId || newMovie.imdbId) {
                    const targetId = imdbId || newMovie.imdbId;
                    // Check if series or movie for vidsrc
                    const vidsrcUrl = movieData.isSeries
                        ? `https://vidsrc.me/embed/tv?imdb=${targetId}` // Default to S1E1 or just the embed
                        : `https://vidsrc.me/embed/movie?imdb=${targetId}`;

                    await (prisma as any).videoserver.create({
                        data: {
                            movieId: newMovie.id,
                            name: 'Vidsrc',
                            url: vidsrcUrl,
                            order: 1,
                            updatedAt: new Date()
                        }
                    });
                    serversCount = 1;
                }

                results.push({
                    input: trimmedInput,
                    success: true,
                    title: newMovie.titleEN,
                    slug: newMovie.slug,
                    serversCount,
                    published: true
                });
                successCount++;
                publishedCount++;

            } catch (error: any) {
                console.error(`Error importing ${trimmedInput}:`, error);
                results.push({ input: trimmedInput, success: false, error: error.message });
                failedCount++;
            }
        }

        return NextResponse.json({
            success: true,
            results,
            successCount,
            failedCount,
            publishedCount
        });

    } catch (error: any) {
        console.error('Bulk import error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
