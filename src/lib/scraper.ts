import * as cheerio from 'cheerio';

/**
 * Fetch official Bulgarian metadata (title, summary) from Wikidata anonymously
 * No API key or registration required.
 * Uses P645 (IMDb ID) to find the entity.
 */
async function fetchWikidataBG(imdbId: string) {
    if (!imdbId) return null;

    // Ensure ID starts with 'tt'
    const id = imdbId.startsWith('tt') ? imdbId : `tt${imdbId}`;

    try {
        const query = `
            SELECT ?item ?itemLabel ?itemDescription WHERE {
                ?item wdt:P645 "${id}".
                SERVICE wikibase:label { bd:serviceParam wikibase:language "bg,en". }
            }
            LIMIT 1
        `;

        const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(query)}&format=json`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'MoviePlatform/1.0 (https://your-domain.com; admin@your-domain.com) fetch-bg-metadata',
                'Accept': 'application/json'
            },
            next: { revalidate: 86400 } // Cache for 24h
        });

        if (!response.ok) return null;

        const data = await response.json();
        const result = data.results?.bindings?.[0];

        if (result) {
            return {
                titleBG: result.itemLabel?.value || null,
                descriptionBG: result.itemDescription?.value || null
            };
        }
    } catch (err) {
        console.error('[Wikidata] Error fetching BG label:', err);
    }
    return null;
}

export async function scrapeMovieData(url: string) {
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch the URL: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const result: any = {
        titleBG: '',
        titleEN: '',
        description: '',
        year: '',
        duration: '',
        director: '',
        cast: '',
        posterUrl: '',
        rating: '',
        slug: '',
        genres: [] as string[],
        isSeries: false
    };

    const isTMDB = url.includes('themoviedb.org');
    const isIMDB = url.includes('imdb.com');

    if (isTMDB) {
        // TMDB Scraper
        const mainTitle = $('h2 a').first().text().trim() || $('.title h2').first().text().trim() || $('title').text().split('—')[0].trim();
        const hasCyrillic = /[а-яА-Я]/.test(mainTitle);

        if (hasCyrillic) {
            result.titleBG = mainTitle;
        } else {
            result.titleEN = mainTitle;
        }

        result.description = $('.overview p').text().trim() || $('meta[name="description"]').attr('content')?.trim();

        const yearMatch = $('.release_date').text().match(/\d{4}/) || $('.release').text().match(/\d{4}/) || $('title').text().match(/\d{4}/);
        result.year = yearMatch ? yearMatch[0] : '';

        const runtimeText = $('.runtime').first().text().trim() || $('.facts .runtime').text().trim();
        if (runtimeText) {
            const h = runtimeText.match(/(\d+)h/);
            const m = runtimeText.match(/(\d+)m/);
            const totalMins = (h ? parseInt(h[1]) * 60 : 0) + (m ? parseInt(m[1]) : 0);
            result.duration = totalMins ? String(totalMins) : '';
        }

        const posterPath = $('.poster img').attr('src') || $('.poster .image_content img').attr('src') || $('meta[property="og:image"]').attr('content');
        if (posterPath) {
            result.posterUrl = posterPath.includes('http') ? posterPath : 'https://image.tmdb.org/t/p/w500' + posterPath;
        }

        const score = $('.user_score_chart').attr('data-percent') || $('.percentage').text().replace('%', '');
        result.rating = score ? (parseFloat(score) / 10).toFixed(1) : '';

        // Metadata
        $('section.facts p, .fact').each((i, el) => {
            const label = $(el).find('strong').text().toLowerCase();
            const content = $(el).clone().children('strong').remove().end().text().trim();
            if (label.includes('director') || label.includes('режисьор')) result.director = content;
        });

        // Genres
        $('.genres a').each((i, el) => {
            result.genres.push($(el).text().trim());
        });

        // Series check (basic)
        if (url.includes('/tv/')) {
            result.isSeries = true;
        }

        const enUrl = url.includes('?') ? url + '&language=en-US' : url + '?language=en-US';
        const enResponse = await fetch(enUrl, { headers: { 'Accept-Language': 'en-US' } });
        if (enResponse.ok) {
            const enHtml = await enResponse.text();
            const $en = cheerio.load(enHtml);
            const enTitleFound = $en('h2 a').first().text().trim() || $en('.title h2').first().text().trim() || $en('title').text().split('—')[0].trim();
            if (hasCyrillic) {
                result.titleEN = enTitleFound;
            } else {
                result.titleEN = mainTitle;
            }
        }
    } else if (isIMDB) {
        const jsonLdScript = $('script[type="application/ld+json"]').first().html();
        if (jsonLdScript) {
            try {
                const data = JSON.parse(jsonLdScript);

                // Decode HTML entities (e.g., &apos; → ')
                const decodeHtml = (text: string) => {
                    if (!text) return text;
                    return text
                        .replace(/&apos;/g, "'")
                        .replace(/&quot;/g, '"')
                        .replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>');
                };

                const name = decodeHtml(data.name);
                const altName = data.alternateName ? decodeHtml(data.alternateName) : null;
                const hasCyrillicName = /[а-яА-Я]/.test(name);
                const hasCyrillicAlt = altName ? /[а-яА-Я]/.test(altName) : false;

                if (hasCyrillicName) {
                    result.titleBG = name;
                    result.titleEN = altName || name;
                } else if (hasCyrillicAlt) {
                    result.titleBG = altName;
                    result.titleEN = name;
                } else {
                    result.titleBG = name;
                    result.titleEN = name;
                }

                result.description = data.description;
                result.genres = Array.isArray(data.genre) ? data.genre : (data.genre ? [data.genre] : []);
                result.year = data.datePublished?.split('-')[0] || '';
                result.posterUrl = data.image || '';
                result.rating = data.aggregateRating?.ratingValue ? String(data.aggregateRating.ratingValue) : '';
                result.director = Array.isArray(data.director) ? data.director[0]?.name : data.director?.name;
                result.cast = data.actor?.slice(0, 5).map((a: any) => a.name).join(', ');

                if (data['@type'] === 'TVSeries' || data['@type'] === 'TVShow') {
                    result.isSeries = true;
                }

                if (data.duration) {
                    const hMatch = data.duration.match(/(\d+)H/);
                    const mMatch = data.duration.match(/(\d+)M/);
                    const h = hMatch ? parseInt(hMatch[1]) : 0;
                    const m = mMatch ? parseInt(mMatch[1]) : 0;
                    result.duration = (h || m) ? String(h * 60 + m) : '';
                }
            } catch (jsonErr) {
                console.error(`[Scraper] JSON-LD parse error for ${url}:`, jsonErr);
            }
        }
    }

    // ── NEW: Official Bulgarian Metadata Hook ──
    const imdbIdMatch = url.match(/tt\d+/);
    if (imdbIdMatch || result.imdbId) {
        const id = imdbIdMatch ? imdbIdMatch[0] : result.imdbId;
        const wikidata = await fetchWikidataBG(id);
        if (wikidata?.titleBG && wikidata.titleBG !== result.titleEN) {
            result.titleBG = wikidata.titleBG;
            // Only update description if it's actually useful (not just "movie" or "film")
            if (wikidata.descriptionBG && wikidata.descriptionBG.length > 10) {
                result.description = wikidata.descriptionBG;
            }
        }
    }

    // Final Slug & Title Logic (Strict)
    if (result.titleEN) {
        result.slug = result.titleEN
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_]+/g, '-')
            .replace(/--+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    if (!result.titleBG) result.titleBG = result.titleEN;
    if (!result.titleEN) result.titleEN = result.titleBG;

    return result;
}
