/**
 * Link Checker Utility
 * 
 * Used for automated validation of video server availability.
 */

const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0'
];

function getRandomUA() {
    return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

export interface LinkCheckResult {
    ok: boolean;
    status?: number;
    error?: string;
    url: string;
}

/**
 * Check a single URL with a timeout
 */
export async function checkLink(url: string, timeoutMs: number = 5000): Promise<LinkCheckResult> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        // Try HEAD first (faster)
        const headers = {
            'User-Agent': getRandomUA(),
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,video/mp4,*/*;q=0.8',
            'Accept-Language': 'bg-BG,bg;q=0.9,en-US;q=0.8,en;q=0.7',
            'Referer': 'https://vidsrc.to/',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'cross-site',
            'Upgrade-Insecure-Requests': '1'
        };

        const headResponse = await fetch(url, {
            method: 'HEAD',
            signal: controller.signal,
            headers
        });

        clearTimeout(timeoutId);

        if (headResponse.ok) {
            return { ok: true, status: headResponse.status, url };
        }

        // If 403 or 429, we are being BLOCKED, not necessarily broken
        if (headResponse.status === 403 || headResponse.status === 429) {
            return {
                ok: true, // We treat it as OK (still exists) but blocked for us
                status: headResponse.status,
                error: headResponse.status === 429 ? 'Rate Limited' : 'Blocked by WAF',
                url
            };
        }

        // If HEAD fails or is not supported (some players block HEAD), try GET
        const getController = new AbortController();
        const getTimeoutId = setTimeout(() => getController.abort(), timeoutMs);

        const getResponse = await fetch(url, {
            method: 'GET',
            signal: getController.signal,
            headers
        });

        clearTimeout(getTimeoutId);

        // Even with GET, if it's 403/429, it's likely still alive but we are blocked
        if (getResponse.status === 403 || getResponse.status === 429) {
            return { ok: true, status: getResponse.status, error: 'Proxy Blocked', url };
        }

        return {
            ok: getResponse.ok,
            status: getResponse.status,
            url
        };
    } catch (error: any) {
        return {
            ok: false,
            error: error.name === 'AbortError' ? 'Timeout' : error.message,
            url
        };
    }
}

/**
 * Check a single server link (wrapper for scraper consumption)
 */
export async function checkServerLink(url: string, delayMs: number = 0, serverName: string = 'Unknown'): Promise<{ isWorking: boolean; statusCode: number; error?: string }> {
    if (delayMs > 0) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    const result = await checkLink(url);

    return {
        isWorking: result.ok,
        statusCode: result.status || 0,
        error: result.error
    };
}

/**
 * Check multiple servers concurrently
 */
export async function checkAllMovieServers(servers: Array<{ id: number; name: string; url: string }>): Promise<Array<{ serverId: number; serverName: string; url: string; isWorking: boolean; statusCode: number; error?: string }>> {
    const results = await Promise.all(
        servers.map(async (server) => {
            const check = await checkLink(server.url);
            return {
                serverId: server.id,
                serverName: server.name,
                url: server.url,
                isWorking: check.ok,
                statusCode: check.status || 0,
                error: check.error
            };
        })
    );

    return results;
}
