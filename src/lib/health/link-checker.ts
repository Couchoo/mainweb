/**
 * Link Checker Utility
 * 
 * Used for automated validation of video server availability.
 */

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
        const headResponse = await fetch(url, {
            method: 'HEAD',
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        clearTimeout(timeoutId);

        if (headResponse.ok) {
            return { ok: true, status: headResponse.status, url };
        }

        // If HEAD fails or is not supported (some players block HEAD), try GET
        const getController = new AbortController();
        const getTimeoutId = setTimeout(() => getController.abort(), timeoutMs);

        const getResponse = await fetch(url, {
            method: 'GET',
            signal: getController.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        clearTimeout(getTimeoutId);

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
