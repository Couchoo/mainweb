/**
 * HEADLESS BROWSER VALIDATOR
 * Uses Playwright to actually load the video embed and check if it works
 * This is the MOST ACCURATE validation method - simulates a real user
 */

import { chromium, Browser, Page } from 'playwright';

export interface BrowserValidationResult {
    valid: boolean;
    url: string;
    serverName: string;
    reason?: string;
    screenshot?: string; // Base64 screenshot for debugging
}

// Domains known to be blocked or unreliable
const BLOCKED_DOMAINS = [
    'vidsrc-embed.ru',
    'vidsrc.ru',
];

const VIDEO_SERVERS = [
    { name: 'Vidsrc.to', urlTemplate: (imdbId: string) => `https://vidsrc.to/embed/movie/${imdbId}` },
    { name: 'Vidsrc.me', urlTemplate: (imdbId: string) => `https://vidsrc.me/embed/movie?imdb=${imdbId}` },
];

let browserInstance: Browser | null = null;

/**
 * Get or create browser instance (reuse for performance)
 */
async function getBrowser(): Promise<Browser> {
    if (!browserInstance || !browserInstance.isConnected()) {
        browserInstance = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
    }
    return browserInstance;
}

/**
 * Close browser instance
 */
export async function closeBrowser() {
    if (browserInstance) {
        await browserInstance.close();
        browserInstance = null;
    }
}

/**
 * Validate video server using headless browser
 * This is the GOLD STANDARD - actually loads the page and checks for errors
 */
export async function validateWithBrowser(url: string, serverName: string): Promise<BrowserValidationResult> {
    let page: Page | null = null;

    try {
        const browser = await getBrowser();
        page = await browser.newPage();

        // Set viewport and user agent
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.setExtraHTTPHeaders({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        });

        console.log(`[Browser Validator] 🌐 Loading ${serverName}: ${url}`);

        // Navigate with timeout
        const response = await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 15000
        });

        if (!response || !response.ok()) {
            return {
                valid: false,
                url,
                serverName,
                reason: `HTTP ${response?.status() || 'timeout'}`
            };
        }

        // Check if redirected to blocked domain
        const finalUrl = page.url();
        for (const blockedDomain of BLOCKED_DOMAINS) {
            if (finalUrl.includes(blockedDomain)) {
                return {
                    valid: false,
                    url: finalUrl,
                    serverName,
                    reason: `Redirected to blocked domain: ${blockedDomain}`
                };
            }
        }

        // Wait for page to settle
        await page.waitForTimeout(3000);

        // CHECK FOR ERROR MESSAGES
        const pageText = await page.textContent('body');
        const errorPatterns = [
            'this media is unavailable',
            'media is unavailable at the moment',
            'video not found',
            'content not available',
            'file not found',
            '404 not found',
            'video has been removed',
            'no video sources found'
        ];

        const hasError = errorPatterns.some(pattern =>
            pageText?.toLowerCase().includes(pattern)
        );

        if (hasError) {
            console.log(`[Browser Validator] ❌ Error message detected`);
            return {
                valid: false,
                url,
                serverName,
                reason: 'Error message detected: media unavailable'
            };
        }

        // CHECK FOR VIDEO PLAYER ELEMENTS
        const hasIframe = await page.locator('iframe').count() > 0;
        const hasVideo = await page.locator('video').count() > 0;
        const hasPlayer = await page.locator('[class*="player"], [id*="player"]').count() > 0;

        if (!hasIframe && !hasVideo && !hasPlayer) {
            console.log(`[Browser Validator] ❌ No video player found`);
            return {
                valid: false,
                url,
                serverName,
                reason: 'No video player elements detected'
            };
        }

        // ADDITIONAL CHECK: Look for loading indicators (good sign)
        const hasLoading = await page.locator('[class*="loading"], [class*="spinner"]').count() > 0;

        console.log(`[Browser Validator] ✅ ${serverName} looks good (iframe: ${hasIframe}, video: ${hasVideo}, player: ${hasPlayer})`);

        return {
            valid: true,
            url,
            serverName
        };

    } catch (error: any) {
        console.error(`[Browser Validator] Error: ${error.message}`);
        return {
            valid: false,
            url,
            serverName,
            reason: `Browser error: ${error.message}`
        };
    } finally {
        if (page) {
            await page.close();
        }
    }
}

/**
 * Find first working server using browser validation
 */
export async function findWorkingServerWithBrowser(imdbId: string): Promise<BrowserValidationResult | null> {
    console.log(`[Browser Validator] 🔍 Checking servers for IMDB: ${imdbId}`);

    for (const server of VIDEO_SERVERS) {
        const url = server.urlTemplate(imdbId);
        const result = await validateWithBrowser(url, server.name);

        if (result.valid) {
            console.log(`[Browser Validator] ✅ ${server.name} WORKS for ${imdbId}`);
            return result;
        } else {
            console.log(`[Browser Validator] ❌ ${server.name} FAILED: ${result.reason}`);
        }

        // Small delay between checks
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`[Browser Validator] ⚠️ ALL SERVERS FAILED for ${imdbId}`);
    return null;
}

/**
 * Find ALL working servers using browser validation
 */
export async function findAllWorkingServersWithBrowser(imdbId: string): Promise<BrowserValidationResult[]> {
    console.log(`[Browser Validator] 🔍 Finding ALL working servers for IMDB: ${imdbId}`);
    const workingServers: BrowserValidationResult[] = [];

    for (const server of VIDEO_SERVERS) {
        const url = server.urlTemplate(imdbId);
        const result = await validateWithBrowser(url, server.name);

        if (result.valid) {
            console.log(`[Browser Validator] ✅ ${server.name} WORKS`);
            workingServers.push(result);
        } else {
            console.log(`[Browser Validator] ❌ ${server.name} FAILED: ${result.reason}`);
        }

        // Delay between checks
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`[Browser Validator] 📊 Result: ${workingServers.length}/${VIDEO_SERVERS.length} servers working`);

    // Close browser after batch validation
    await closeBrowser();

    return workingServers;
}
