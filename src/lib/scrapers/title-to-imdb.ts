import * as cheerio from 'cheerio';

/**
 * Search for IMDB ID by movie title using IMDB's own search
 * 100% FREE - no API key needed
 */
export async function searchImdbIdByTitle(title: string, year?: number): Promise<string | null> {
    try {
        // Clean title - remove year, quality tags, Bulgarian text
        const cleanTitle = title
            .replace(/\(\d{4}\)/g, '') // Remove (2024)
            .replace(/\b(HD|CAM|TS|HDCAM|WEB-DL|BluRay|BRRip)\b/gi, '') // Remove quality tags
            .replace(/сезон|епизод|серия/gi, '') // Remove Bulgarian series markers
            .replace(/\s+/g, ' ')
            .trim();

        console.log(`🔍 Searching IMDB ID for: "${cleanTitle}" ${year ? `(${year})` : ''}`);

        // Method 1: Direct IMDB search (FREE!)
        const searchQuery = encodeURIComponent(cleanTitle);
        const imdbSearchUrl = `https://www.imdb.com/find/?q=${searchQuery}&s=tt&ttype=ft`;

        const response = await fetch(imdbSearchUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            }
        });

        if (!response.ok) {
            console.log(`❌ IMDB search failed with status: ${response.status}`);
            return null;
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Parse search results
        const results: Array<{ id: string; title: string; year: number }> = [];

        // Try new IMDB layout
        $('li.find-title-result, li.ipc-metadata-list-summary-item').each((_, el) => {
            const $el = $(el);
            const link = $el.find('a').first().attr('href');
            const titleText = $el.find('a').first().text().trim();
            const yearText = $el.text();

            const imdbMatch = link?.match(/\/title\/(tt\d{7,8})/);
            const yearMatch = yearText.match(/\((\d{4})\)/);

            if (imdbMatch) {
                results.push({
                    id: imdbMatch[1],
                    title: titleText,
                    year: yearMatch ? parseInt(yearMatch[1]) : 0
                });
            }
        });

        // Try old IMDB layout
        if (results.length === 0) {
            $('.findResult, .result_text').each((_, el) => {
                const $el = $(el);
                const link = $el.find('a').first().attr('href');
                const titleText = $el.find('a').first().text().trim();
                const yearText = $el.text();

                const imdbMatch = link?.match(/\/title\/(tt\d{7,8})/);
                const yearMatch = yearText.match(/\((\d{4})\)/);

                if (imdbMatch) {
                    results.push({
                        id: imdbMatch[1],
                        title: titleText,
                        year: yearMatch ? parseInt(yearMatch[1]) : 0
                    });
                }
            });
        }

        if (results.length === 0) {
            console.log(`❌ No results found for "${cleanTitle}"`);
            return null;
        }

        // If year is provided, try to match it
        if (year) {
            const exactMatch = results.find(r => r.year === year);
            if (exactMatch) {
                console.log(`✅ Found exact match: ${exactMatch.id} - ${exactMatch.title} (${exactMatch.year})`);
                return exactMatch.id;
            }

            // Try year +/- 1
            const closeMatch = results.find(r => Math.abs(r.year - year) <= 1);
            if (closeMatch) {
                console.log(`✅ Found close match: ${closeMatch.id} - ${closeMatch.title} (${closeMatch.year})`);
                return closeMatch.id;
            }
        }

        // Return first result
        const firstResult = results[0];
        console.log(`✅ Found: ${firstResult.id} - ${firstResult.title} (${firstResult.year})`);
        return firstResult.id;

    } catch (error) {
        console.error(`Error searching IMDB ID for "${title}":`, error);
        return null;
    }
}

/**
 * Batch search IMDB IDs for multiple titles
 * Includes rate limiting to avoid being blocked
 */
export async function batchSearchImdbIds(
    titles: Array<{ title: string; year?: number }>
): Promise<Map<string, string>> {
    const results = new Map<string, string>();

    for (const { title, year } of titles) {
        const imdbId = await searchImdbIdByTitle(title, year);
        if (imdbId) {
            results.set(title, imdbId);
        }

        // Rate limiting - wait 2 seconds between requests to be polite
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    return results;
}
