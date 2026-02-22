/**
 * Extracts IMDB ID from various formats
 */
export function extractImdbId(input: string): string | null {
    // Direct IMDB ID (tt1234567)
    const directMatch = input.match(/\b(tt\d{7,8})\b/i);
    if (directMatch) return directMatch[1];

    // IMDB URL
    const urlMatch = input.match(/imdb\.com\/title\/(tt\d{7,8})/i);
    if (urlMatch) return urlMatch[1];

    return null;
}

/**
 * Extracts IMDB ID from torrent site description
 */
export async function extractImdbFromTorrent(torrentUrl: string): Promise<string | null> {
    try {
        const response = await fetch(torrentUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            }
        });

        if (!response.ok) return null;

        const html = await response.text();

        // Try to find IMDB ID in the page
        const imdbId = extractImdbId(html);
        return imdbId;

    } catch (error) {
        console.error('Torrent scraper error:', error);
        return null;
    }
}

/**
 * Detects input type and extracts IMDB ID
 */
export async function getImdbId(input: string): Promise<string | null> {
    // First try direct extraction
    const directId = extractImdbId(input);
    if (directId) return directId;

    // If it's a URL, try to scrape it
    if (input.startsWith('http')) {
        return await extractImdbFromTorrent(input);
    }

    return null;
}
