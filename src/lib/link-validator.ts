/**
 * Link Validator - Validates video server URLs before import
 * Prevents broken links from entering the database
 */

export interface ValidationResult {
    valid: boolean;
    url?: string;
    serverName?: string;
    reason?: string;
}

// Domains known to be blocked or unreliable
const BLOCKED_DOMAINS = [
    'vidsrc-embed.ru',  // Frequently blocked/inaccessible
    'vidsrc.ru',        // Regional blocks
];

const VIDEO_SERVERS = [
    { name: 'Vidsrc.to', urlTemplate: (imdbId: string) => `https://vidsrc.to/embed/movie/${imdbId}` },
    { name: 'Vidsrc.me', urlTemplate: (imdbId: string) => `https://vidsrc.me/embed/movie?imdb=${imdbId}` },
];

/**
 * Validates a single video server URL
 * Uses multiple checks to ensure the link actually works
 */
export async function validateVideoServer(url: string, serverName: string): Promise<ValidationResult> {
    try {
        // 1. HTTP HEAD check with redirect following
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const headRes = await fetch(url, {
            method: 'HEAD',
            signal: controller.signal,
            redirect: 'follow', // CRITICAL: Follow redirects
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            }
        });
        clearTimeout(timeoutId);

        if (!headRes.ok) {
            return {
                valid: false,
                reason: `HTTP ${headRes.status}`,
                url,
                serverName
            };
        }

        // CHECK FINAL URL after redirects
        const finalUrl = headRes.url || url;
        console.log(`[Validator] ${serverName}: ${url} → ${finalUrl}`);

        // Check if final URL is on blocked domain
        for (const blockedDomain of BLOCKED_DOMAINS) {
            if (finalUrl.includes(blockedDomain)) {
                return {
                    valid: false,
                    reason: `Redirects to blocked domain: ${blockedDomain}`,
                    url: finalUrl,
                    serverName
                };
            }
        }

        // 2. Content check (detect soft 404s and validate actual video embed)
        const bodyController = new AbortController();
        const bodyTimeoutId = setTimeout(() => bodyController.abort(), 10000);

        const bodyRes = await fetch(url, {
            signal: bodyController.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://vidsrc.me/'
            }
        });
        clearTimeout(bodyTimeoutId);

        const html = await bodyRes.text();

        // Detect common "soft 404" patterns
        const soft404Patterns = [
            'this media is unavailable at the moment',  // EXACT vidsrc error message
            'this media is unavailable',
            'media is unavailable',
            '404 not found',
            'file not found',
            'video not found',
            'content not available',
            'this video is unavailable',
            'video has been removed',
            'no video sources found'
        ];

        const htmlLower = html.toLowerCase();
        for (const pattern of soft404Patterns) {
            if (htmlLower.includes(pattern)) {
                return {
                    valid: false,
                    reason: 'Soft 404 detected',
                    url,
                    serverName
                };
            }
        }

        // Check if response is suspiciously short (likely error page)
        if (html.length < 500) {
            return {
                valid: false,
                reason: 'Response too short (likely error page)',
                url,
                serverName
            };
        }

        // CRITICAL: Check for actual video player elements
        const hasVideoPlayer = html.includes('iframe') ||
            html.includes('video') ||
            html.includes('player') ||
            html.includes('embed');

        if (!hasVideoPlayer) {
            return {
                valid: false,
                reason: 'No video player detected in response',
                url,
                serverName
            };
        }

        return {
            valid: true,
            url,
            serverName
        };

    } catch (error: any) {
        return {
            valid: false,
            reason: error.message || 'Network error',
            url,
            serverName
        };
    }
}

/**
 * Validates a movie by trying multiple video servers
 * Returns the first working server, or null if all fail
 * This is used during import to ensure we NEVER add movies with broken links
 * IMPORTANT: Follows redirects and blocks servers that redirect to inaccessible domains
 */
export async function findWorkingServer(imdbId: string): Promise<ValidationResult | null> {
    console.log(`[Validator] 🔍 Checking servers for IMDB: ${imdbId}`);

    for (const server of VIDEO_SERVERS) {
        const url = server.urlTemplate(imdbId);
        console.log(`[Validator] Testing ${server.name}...`);

        const result = await validateVideoServer(url, server.name);

        if (result.valid) {
            console.log(`[Validator] ✅ ${server.name} WORKS for ${imdbId}`);
            return result;
        } else {
            console.log(`[Validator] ❌ ${server.name} FAILED: ${result.reason}`);
        }

        // Small delay between server checks to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`[Validator] ⚠️ ALL SERVERS FAILED for ${imdbId} - WILL NOT IMPORT`);
    return null;
}

/**
 * Batch validate multiple servers for a movie and return all working ones
 * Goal: Add 2-3 backup servers per movie for maximum reliability
 */
export async function findAllWorkingServers(imdbId: string): Promise<ValidationResult[]> {
    console.log(`[Validator] 🔍 Finding ALL working servers for IMDB: ${imdbId}`);
    const workingServers: ValidationResult[] = [];

    for (const server of VIDEO_SERVERS) {
        const url = server.urlTemplate(imdbId);
        console.log(`[Validator] Testing ${server.name}...`);

        const result = await validateVideoServer(url, server.name);

        if (result.valid) {
            console.log(`[Validator] ✅ ${server.name} WORKS`);
            workingServers.push(result);
        } else {
            console.log(`[Validator] ❌ ${server.name} FAILED: ${result.reason}`);
        }

        // Delay between checks to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`[Validator] 📊 Result: ${workingServers.length}/${VIDEO_SERVERS.length} servers working`);
    return workingServers;
}
