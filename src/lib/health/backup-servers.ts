/**
 * Backup Server List for Auto-Fix
 * 
 * Priority order with DIVERSE providers:
 * 1. 2embed (different provider)
 * 2. Embedsu (different provider)
 * 3. MoviesAPI (different provider)
 * 4. Vidsrc.to (fallback)
 */

export interface BackupServer {
    name: string;
    template: (imdbId: string) => string;
    priority: number;
}

export const BACKUP_SERVERS: BackupServer[] = [
    {
        name: '2embed',
        template: (imdbId: string) => `https://www.2embed.cc/embed/${imdbId}`,
        priority: 1
    },
    {
        name: 'Embedsu',
        template: (imdbId: string) => `https://embed.su/embed/movie/${imdbId}`,
        priority: 2
    },
    {
        name: 'MoviesAPI',
        template: (imdbId: string) => `https://moviesapi.club/movie/${imdbId}`,
        priority: 3
    },
    {
        name: 'Vidsrc.to',
        template: (imdbId: string) => `https://vidsrc.to/embed/movie/${imdbId}`,
        priority: 4
    }
];

/**
 * Get backup server URL by name
 */
export function getBackupServerUrl(serverName: string, imdbId: string): string | null {
    const server = BACKUP_SERVERS.find(s => s.name === serverName);
    return server ? server.template(imdbId) : null;
}

/**
 * Get all backup server URLs for a movie
 */
export function getAllBackupUrls(imdbId: string): Array<{ name: string; url: string }> {
    return BACKUP_SERVERS.map(server => ({
        name: server.name,
        url: server.template(imdbId)
    }));
}
