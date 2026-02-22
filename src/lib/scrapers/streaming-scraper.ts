import * as cheerio from 'cheerio';

export interface StreamingServer {
    name: string;
    url: string;
    order: number;
}

/**
 * Validates if a video URL is accessible and actually has video content
 * CRITICAL: Checks HTML content, not just HTTP status
 */
/**
 * Validates if a video URL is accessible and actually has video content
 * CRITICAL: Uses Playwright for visual verification to bypass bot detection
 */
async function validateVideoUrl(url: string): Promise<boolean> {
    const { chromium } = await import('playwright');
    let browser;
    try {
        browser = await chromium.launch({ headless: true });
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();

        // 10 second timeout for page load
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });

        // Wait a bit for JS to execute (players often load via JS)
        await page.waitForTimeout(2000);

        const htmlLower = (await page.content()).toLowerCase();

        // Detect "soft 404" patterns
        const errorPatterns = [
            'this media is unavailable at the moment',
            'this media is unavailable',
            'media is unavailable',
            'video id not found',
            'no video sources found'
        ];

        for (const pattern of errorPatterns) {
            if (htmlLower.includes(pattern)) {
                console.log(`❌ Soft 404 detected: "${pattern}" in ${url}`);
                await browser.close();
                return false;
            }
        }

        // Check for actual video player elements
        const hasVideoPlayer = await page.evaluate(() => {
            const selectors = ['iframe', 'video', '.player', '#player', '.vjs-tech', 'embed', 'object'];
            return selectors.some(s => document.querySelector(s) !== null);
        });

        if (!hasVideoPlayer) {
            console.log(`❌ No video player detected in ${url}`);
            await browser.close();
            return false;
        }

        await browser.close();
        return true;
    } catch (error) {
        console.error(`❌ Playwright validation failed for ${url}:`, error);
        if (browser) await browser.close();
        return false;
    }
}


/**
 * Scrapes video servers from vidsrc.me (ONLY - most reliable)
 */
export async function scrapeVidsrcServers(imdbId: string): Promise<StreamingServer[]> {
    try {
        const servers: StreamingServer[] = [];

        // vidsrc.me direct embed (primary source)
        const vidsrcUrl = `https://vidsrc.me/embed/movie/${imdbId}`;

        // Validate that the video exists
        const isValid = await validateVideoUrl(vidsrcUrl);

        if (isValid) {
            servers.push({
                name: 'Vidsrc',
                url: vidsrcUrl,
                order: 1
            });
            console.log(`✅ Vidsrc server validated for ${imdbId}`);
        } else {
            console.log(`❌ Vidsrc server not available for ${imdbId}`);
        }

        return servers;
    } catch (error) {
        console.error('Vidsrc scraper error:', error);
        return [];
    }
}

/**
 * Main function - only uses Vidsrc
 */
export async function scrapeAllStreamingSources(imdbId: string): Promise<StreamingServer[]> {
    console.log(`🔍 Checking Vidsrc for IMDB ID: ${imdbId}`);
    const servers = await scrapeVidsrcServers(imdbId);

    if (servers.length === 0) {
        console.log(`⚠️ No valid video servers found for ${imdbId}`);
    } else {
        console.log(`✅ Found ${servers.length} valid server(s) for ${imdbId}`);
    }

    return servers;
}
