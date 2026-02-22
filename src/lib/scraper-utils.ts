/**
 * SCRAPER UTILS - Identity rotation and smart delays
 */

const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/121.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPad; CPU OS 17_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1'
];

const REFERERS = [
    'https://www.google.com/',
    'https://www.bing.com/',
    'https://duckduckgo.com/',
    'https://www.imdb.com/',
    'https://vidsrc.me/',
    'https://vidsrc.xyz/'
];

export function getRandomUserAgent(): string {
    return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

export function getRandomReferer(): string {
    return REFERERS[Math.floor(Math.random() * REFERERS.length)];
}

/**
 * Smart random delay between min and max ms
 */
export async function smartDelay(min: number = 1000, max: number = 3000): Promise<void> {
    const ms = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Exponential backoff delay
 */
export async function backoffDelay(attempt: number, base: number = 2000): Promise<void> {
    const ms = base * Math.pow(2, attempt) + Math.random() * 1000;
    console.log(`[Scraper] Backoff delay: ${Math.round(ms)}ms (attempt ${attempt})`);
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * SMART QUEUE - Manages rate-limiting and concurrency per domain
 */
export class SmartQueue {
    private static instances: Map<string, SmartQueue> = new Map();
    private queue: (() => Promise<any>)[] = [];
    private running: number = 0;
    private lastRequestTime: number = 0;

    constructor(
        private domain: string,
        private maxConcurrency: number = 2,
        private minDelay: number = 1000
    ) { }

    static get(domain: string, maxConcurrency: number = 2, minDelay: number = 1000): SmartQueue {
        if (!this.instances.has(domain)) {
            this.instances.set(domain, new SmartQueue(domain, maxConcurrency, minDelay));
        }
        return this.instances.get(domain)!;
    }

    async add<T>(task: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            this.queue.push(async () => {
                try {
                    const result = await task();
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            });
            this.process();
        });
    }

    private async process() {
        if (this.running >= this.maxConcurrency || this.queue.length === 0) return;

        // Ensure minimum delay between requests on this domain
        const now = Date.now();
        const timeSinceLast = now - this.lastRequestTime;
        if (timeSinceLast < this.minDelay) {
            setTimeout(() => this.process(), this.minDelay - timeSinceLast);
            return;
        }

        this.running++;
        this.lastRequestTime = Date.now();
        const task = this.queue.shift();

        if (task) {
            try {
                await task();
            } finally {
                this.running--;
                this.process();
            }
        }
    }
}

