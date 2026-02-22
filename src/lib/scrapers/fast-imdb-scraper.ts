/**
 * FAST PARALLEL IMDB SCRAPER - V2 (JSON + GENRE ROTATION)
 * Uses IMDB's internal JSON state to get more movies per request.
 * Rotates through genres to bypass pagination blocks.
 */

import * as cheerio from 'cheerio';

export interface IMDBMovie {
    title: string;
    year: number;
    imdbId: string;
    posterUrl?: string;
    rating?: number;
}

export class FastIMDBScraper {
    private baseUrl = 'https://www.imdb.com';
    private headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    };

    // List of genres for deep rotation scraping
    private genres = [
        'action', 'adventure', 'animation', 'biography', 'comedy', 'crime',
        'drama', 'family', 'fantasy', 'horror', 'mystery', 'romance',
        'sci-fi', 'thriller', 'war', 'western', 'history', 'music', 'sport'
    ];

    // IMDB curated lists for mainstream/popular movies
    private popularLists = [
        { name: 'top250', url: 'https://www.imdb.com/chart/top/' },
        { name: 'popular', url: 'https://www.imdb.com/chart/moviemeter/' },
        { name: 'boxoffice', url: 'https://www.imdb.com/chart/boxoffice/' },
    ];

    /**
     * Scrapes IMDB by extracting the hidden JSON block
     */
    async scrapeSearchPage(url: string): Promise<IMDBMovie[]> {
        const { SmartQueue, getRandomUserAgent } = await import('../scraper-utils');
        const queue = SmartQueue.get('www.imdb.com', 2, 2000);

        return queue.add(async () => {
            try {
                const response = await fetch(url, {
                    headers: {
                        ...this.headers,
                        'User-Agent': getRandomUserAgent()
                    }
                });

                if (response.status === 429) {
                    console.error(`[IMDB] RATE LIMITED (429) on ${url}`);
                    throw new Error('RATE_LIMIT_EXCEEDED');
                }

                if (!response.ok) return [];

                const html = await response.text();
                const jsonMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
                if (!jsonMatch) return [];

                const data = JSON.parse(jsonMatch[1]);
                const items = data.props?.pageProps?.searchResults?.titleResults?.titleListItems || [];

                return items.map((m: any) => ({
                    title: m.originalTitleText || m.titleText || "Unknown",
                    year: m.releaseYear || new Date().getFullYear(),
                    imdbId: m.id || m.titleId,
                    rating: m.ratingSummary?.aggregateRating,
                    posterUrl: m.primaryImage?.url
                })).filter((m: any) => m.imdbId && m.title !== "Unknown");

            } catch (error) {
                console.error(`[IMDB] Error scraping JSON search page:`, error);
                throw error; // Re-throw to handle in the caller
            }
        });
    }

    private sorts = [
        'user_rating,desc',
        'release_date,desc',
        'moviemeter,asc',
        'num_votes,desc'
    ];

    /**
     * DEEP PAGINATION SCRAPING
     * Now uses SmartQueue for individual page scrapes.
     */
    async scrapeMultiplePages(
        totalPages: number,
        batchSize: number = 3,
        onMovieFound?: (movie: IMDBMovie) => Promise<void>,
        onProgress?: (phase: string, page: number, total: number, movies: IMDBMovie[], state: { genreIndex: number, pagesProcessed: number }) => void,
        startingState: { genreIndex: number, pagesProcessed: number } = { genreIndex: 0, pagesProcessed: 0 }
    ): Promise<IMDBMovie[]> {
        console.log(`[IMDB] Starting QUEUE-BASED SCRAPE for ${totalPages} pages...`);

        const allMovies: IMDBMovie[] = [];
        const seenIds = new Set<string>();

        let pagesProcessed = 0;
        let genreIndex = startingState.genreIndex;
        let globalPagesDone = startingState.pagesProcessed;

        const currentYear = new Date().getFullYear();

        while (pagesProcessed < totalPages) {
            // Sequential generation of page tasks
            const currentGenreIdx = genreIndex;
            const currentGenre = this.genres[currentGenreIdx % this.genres.length];
            const currentSort = this.sorts[Math.floor(currentGenreIdx / this.genres.length) % this.sorts.length];

            const minYear = 1990;
            const randomYear = Math.floor(Math.random() * (currentYear - minYear + 1)) + minYear;
            const targetYear = randomYear;

            const pageInGenre = Math.floor(currentGenreIdx / (this.genres.length * this.sorts.length * 10));
            const startOffset = (pageInGenre % 5) * 50 + 1;

            const voteThreshold = targetYear < 2010 ? 100000 : 50000;
            const url = `${this.baseUrl}/search/title/?title_type=feature&num_votes=${voteThreshold},&sort=${currentSort}&genres=${currentGenre}&release_date=${targetYear}-01-01,${targetYear}-12-31&start=${startOffset}`;

            console.log(`[IMDB] Queueing: ${currentGenre}/${targetYear}/${currentSort}(off:${startOffset})`);

            try {
                const movies = await this.scrapeSearchPage(url);
                pagesProcessed++;
                globalPagesDone++;
                genreIndex++;

                if (onProgress) {
                    onProgress(
                        `SEARCHING: ${currentGenre.toUpperCase()} | ${targetYear} | ${currentSort.toUpperCase()}`,
                        pagesProcessed,
                        totalPages,
                        movies,
                        { genreIndex, pagesProcessed: globalPagesDone }
                    );
                }

                for (const movie of movies) {
                    if (!seenIds.has(movie.imdbId)) {
                        seenIds.add(movie.imdbId);
                        allMovies.push(movie);
                        if (onMovieFound) await onMovieFound(movie);
                    }
                }
            } catch (err: any) {
                if (err.message === 'RATE_LIMIT_EXCEEDED') {
                    // Bubble up to allow global cooldown handling
                    throw err;
                }
                console.error(`[IMDB] Task failed for ${url}:`, err);
                genreIndex++; // Skip and continue
            }
        }

        console.log(`\n[IMDB] 🎉 SCRAPING COMPLETE! Found ${allMovies.length} unique.`);
        return allMovies;
    }

    /**
     * Scrape IMDB Top 250 / Popular / Box Office lists
     */
    async scrapePopularList(listName: 'top250' | 'popular' | 'boxoffice'): Promise<IMDBMovie[]> {
        const list = this.popularLists.find(l => l.name === listName);
        if (!list) return [];

        const { SmartQueue } = await import('../scraper-utils');
        const queue = SmartQueue.get('www.imdb.com', 2, 2000);

        return queue.add(async () => {
            try {
                console.log(`[IMDB] Scraping ${listName} list via Queue...`);
                const response = await fetch(list.url, { headers: this.headers });
                if (!response.ok) return [];

                const html = await response.text();
                const $ = cheerio.load(html);
                const movies: IMDBMovie[] = [];

                if (listName === 'top250') {
                    $('li.ipc-metadata-list-summary-item').each((_, el) => {
                        const titleEl = $(el).find('h3.ipc-title__text');
                        const title = titleEl.text().replace(/^\d+\.\s*/, '');
                        const link = $(el).find('a.ipc-title-link-wrapper').attr('href');
                        const imdbId = link?.match(/\/title\/(tt\d+)\//)?.[1];
                        const posterUrl = $(el).find('img.ipc-image').attr('src');
                        const year = parseInt($(el).find('.cli-title-metadata-item').first().text()) || new Date().getFullYear();
                        const ratingText = $(el).find('.ipc-rating-star--rating').text();
                        const rating = ratingText ? parseFloat(ratingText) : undefined;

                        if (imdbId && title) movies.push({ title, year, imdbId, posterUrl, rating });
                    });
                } else {
                    $('li.ipc-metadata-list-summary-item, tr.chart-element-item').each((_, el) => {
                        const titleEl = $(el).find('td.titleColumn a, h3.ipc-title__text, a.ipc-title-link-wrapper');
                        const title = titleEl.text().trim().replace(/^\d+\.\s*/, '');
                        const link = titleEl.attr('href') || $(el).find('a').first().attr('href');
                        const imdbId = link?.match(/\/title\/(tt\d+)\//)?.[1];
                        const posterUrl = $(el).find('img').attr('src');
                        const yearText = $(el).find('.secondaryInfo, .cli-title-metadata-item').first().text();
                        const year = parseInt(yearText.replace(/[()]/g, '')) || new Date().getFullYear();

                        if (imdbId && title) movies.push({ title, year, imdbId, posterUrl });
                    });
                }

                return movies;
            } catch (error) {
                console.error(`[IMDB] Error scraping ${listName} list:`, error);
                return [];
            }
        });
    }

    async detectFranchise(imdbId: string): Promise<Array<{ imdbId: string; title: string; year: number }>> {
        return [];
    }
}

