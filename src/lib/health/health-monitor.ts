import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/db';
import { HealthStats, HealthCheckResult } from './types';
import { getNextMoviesToCheck, getTotalMoviesNeedingCheck } from './priority-queue';
import { checkAllMovieServers } from './link-checker';
import { findAlternativeServers } from './auto-fixer';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Health Monitor - Main orchestrator for health check system
 */

export interface FixResult {
    action: string;
    archived: boolean;
    brokenServers: number;
}

export class HealthMonitor {
    private jobId: string;
    private isRunning: boolean = false;
    private stats: HealthStats = {
        checked: 0,
        broken: 0,
        fixed: 0,
        unpublished: 0
    };

    constructor(jobId?: string) {
        this.jobId = jobId || uuidv4();
    }

    async start(): Promise<string> {
        if (this.isRunning) {
            throw new Error('Health monitor is already running');
        }

        // Create job in database
        await (prisma as any).$executeRawUnsafe(
            `INSERT INTO scraperjob (id, type, status, progress, startedAt, updatedAt) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            this.jobId,
            'MAINTENANCE',
            'RUNNING',
            JSON.stringify(this.stats),
            new Date(),
            new Date()
        );

        // Log start
        await (prisma as any).$executeRawUnsafe(
            `INSERT INTO scraperlog (jobId, level, message, createdAt) 
             VALUES (?, ?, ?, ?)`,
            this.jobId,
            'INFO',
            '🏥 Health check started',
            new Date()
        );

        this.isRunning = true;

        // Start background processing (non-blocking)
        this.processLoop().catch(async (error) => {
            console.error('[HealthMonitor] Fatal error:', error);
            await this.handleError(error);
        });

        return this.jobId;
    }

    private async processLoop(): Promise<void> {
        while (this.isRunning) {
            try {
                // Check if job was stopped externally
                const job = await (prisma as any).$queryRawUnsafe(
                    `SELECT status FROM scraperjob WHERE id = ? LIMIT 1`,
                    this.jobId
                );

                if (!job || job.length === 0 || job[0].status !== 'RUNNING') {
                    console.log('[HealthMonitor] Job stopped externally');
                    this.isRunning = false;
                    break;
                }

                // Get next batch of movies
                const movies = await getNextMoviesToCheck(5);

                if (movies.length === 0) {
                    console.log('[HealthMonitor] No more movies to check - completing');
                    await this.complete();
                    break;
                }

                // Process each movie
                for (const movie of movies) {
                    if (!this.isRunning) break;

                    await this.checkMovie(movie);

                    // Rate limiting - 10s between movies
                    await delay(10000);
                }

                // Update progress
                await this.updateProgress();

            } catch (error) {
                console.error('[HealthMonitor] Loop error:', error);
                await delay(5000); // Wait before retry
            }
        }
    }

    private async checkMovie(movie: any): Promise<void> {
        const movieTitle = movie.titleEN || movie.titleBG || `Movie #${movie.id}`;

        console.log(`[HealthMonitor] Checking: ${movieTitle}`);

        // Log current movie
        await (prisma as any).$executeRawUnsafe(
            `UPDATE scraperjob SET progress = ?, updatedAt = ? WHERE id = ?`,
            JSON.stringify({ ...this.stats, currentMovie: movieTitle }),
            new Date(),
            this.jobId
        );

        // Check all servers (including backups)
        const serverResults = await checkAllMovieServers(
            movie.videoserver.map((s: any) => ({
                id: s.id,
                name: s.name,
                url: s.url
            }))
        );

        console.log(`[HealthMonitor] ${movieTitle}: ${serverResults.filter(r => r.isWorking).length}/${serverResults.length} servers working`);

        const workingServers = serverResults.filter(r => r.isWorking);
        const brokenServers = serverResults.filter(r => !r.isWorking);

        // Update stats
        this.stats.checked++;

        // Increment broken counter if any servers are broken
        if (brokenServers.length > 0) {
            this.stats.broken++;
        }

        // Record broken servers in database
        for (const broken of brokenServers) {
            await (prisma as any).$executeRawUnsafe(
                `INSERT INTO broken_servers (movieId, serverId, serverName, url, statusCode, error, checkedAt)
                 VALUES (?, ?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE 
                    statusCode = VALUES(statusCode),
                    error = VALUES(error),
                    checkedAt = VALUES(checkedAt)`,
                movie.id,
                broken.serverId,
                broken.serverName,
                broken.url,
                broken.statusCode || null,
                broken.error || null,
                new Date()
            );
        }

        // If ANY servers are broken, use smart fix
        if (brokenServers.length > 0) {
            const { smartFixMovie } = await import('./auto-fixer');

            const fixResult = await smartFixMovie(
                movie.id,
                movie.imdbId,
                workingServers,
                brokenServers
            );

            // Log based on status
            if (fixResult.archived) {
                this.stats.unpublished++;
                await this.log('ERROR', `🚫 ${movieTitle} - ${fixResult.action}`);
            } else {
                await this.log('SUCCESS', `✅ ${movieTitle} - ${fixResult.action}`);
            }
        } else {
            // All servers working - mark any broken servers as fixed
            if (movie.videoserver.length > 0) {
                await (prisma as any).$executeRawUnsafe(
                    `UPDATE broken_servers SET fixed = 1, fixedAt = ? 
                     WHERE movieId = ? AND serverId IN (${movie.videoserver.map((s: any) => s.id).join(',')}) AND fixed = 0`,
                    new Date(),
                    movie.id
                );
            }

            // If it was PENDING (draft), auto-publish it now!
            const wasPending = movie.healthStatus === 'PENDING';

            await (prisma as any).$executeRawUnsafe(
                `UPDATE movie SET published = 1, healthStatus = ?, lastChecked = ? WHERE id = ?`,
                'OK',
                new Date(),
                movie.id
            );

            const actionMsg = wasPending ? 'Auto-published (was PENDING)' : `${workingServers.length} server(s) OK`;
            await this.log('SUCCESS', `✅ ${movieTitle} - ${actionMsg}`);
        }
    }

    private async log(level: string, message: string): Promise<void> {
        await (prisma as any).$executeRawUnsafe(
            `INSERT INTO scraperlog (jobId, level, message, createdAt) 
             VALUES (?, ?, ?, ?)`,
            this.jobId,
            level,
            message,
            new Date()
        );
    }

    private async updateProgress(): Promise<void> {
        await (prisma as any).$executeRawUnsafe(
            `UPDATE scraperjob SET progress = ?, updatedAt = ? WHERE id = ?`,
            JSON.stringify(this.stats),
            new Date(),
            this.jobId
        );
    }

    async stop(): Promise<void> {
        console.log('[HealthMonitor] Stopping gracefully...');
        this.isRunning = false;

        await (prisma as any).$executeRawUnsafe(
            `UPDATE scraperjob SET status = ?, updatedAt = ? WHERE id = ?`,
            'STOPPED',
            new Date(),
            this.jobId
        );

        await this.log('INFO', '🛑 Health check stopped');
    }

    private async complete(): Promise<void> {
        this.isRunning = false;

        await (prisma as any).$executeRawUnsafe(
            `UPDATE scraperjob SET status = ?, updatedAt = ? WHERE id = ?`,
            'COMPLETED',
            new Date(),
            this.jobId
        );

        await this.log('SUCCESS', `✅ Health check completed - Checked: ${this.stats.checked}, Fixed: ${this.stats.fixed}, Unpublished: ${this.stats.unpublished}`);
    }

    private async handleError(error: any): Promise<void> {
        this.isRunning = false;

        await (prisma as any).$executeRawUnsafe(
            `UPDATE scraperjob SET status = ?, updatedAt = ? WHERE id = ?`,
            'ERROR',
            new Date(),
            this.jobId
        );

        await this.log('ERROR', `❌ Fatal error: ${error.message}`);
    }

    getJobId(): string {
        return this.jobId;
    }

    getStats(): HealthStats {
        return { ...this.stats };
    }
}

// Singleton instance
let activeMonitor: HealthMonitor | null = null;

export function getActiveMonitor(): HealthMonitor | null {
    return activeMonitor;
}

export function setActiveMonitor(monitor: HealthMonitor | null): void {
    activeMonitor = monitor;
}
