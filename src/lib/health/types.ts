// Health Check System Types

export interface HealthStats {
    checked: number;
    broken: number;
    fixed: number;
    unpublished: number;
}

export interface HealthCheckResult {
    movieId: number;
    movieTitle: string;
    status: 'OK' | 'PARTIAL' | 'BROKEN';
    workingServers: number;
    brokenServers: number;
}

export interface ServerCheckResult {
    serverId: number;
    serverName: string;
    url: string;
    isWorking: boolean;
    statusCode?: number;
    error?: string;
}

export interface ServerValidationResult {
    isWorking: boolean;
    statusCode?: number;
    error?: string;
}

export interface HealthJob {
    id: string;
    status: 'RUNNING' | 'STOPPED' | 'COMPLETED' | 'ERROR';
    progress: HealthStats;
    currentMovie?: string;
    startedAt: Date;
    updatedAt: Date;
}
