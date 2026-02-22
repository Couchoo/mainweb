import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { join } from 'path';
import { access, constants } from 'fs/promises';

export async function GET() {
    const health: any = {
        status: 'OK',
        timestamp: new Date().toISOString(),
        checks: {
            database: 'PENDING',
            websocket: 'PENDING',
            filesystem: 'PENDING'
        }
    };

    try {
        // 1. Database Check
        await prisma.$queryRaw`SELECT 1`;
        health.checks.database = 'OK';

        // 2. WebSocket Check (Internal)
        const wsUrl = process.env.WS_INTERNAL_URL || 'http://127.0.0.1:8080';
        try {
            const wsRes = await fetch(`${wsUrl}/health`, { signal: AbortSignal.timeout(2000) });
            health.checks.websocket = wsRes.ok ? 'OK' : `FAIL (${wsRes.status})`;
        } catch (wsErr) {
            health.checks.websocket = 'OFFLINE';
        }

        // 3. Filesystem Permissions Check
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'avatars');
        try {
            await access(uploadDir, constants.W_OK);
            health.checks.filesystem = 'WRITABLE';
        } catch (fsErr) {
            health.checks.filesystem = 'READ_ONLY_OR_MISSING';
            health.status = 'DEGRADED';
        }

        const checks = health.checks as Record<string, string>;
        if (Object.values(checks).some((v) => v === 'OFFLINE' || v.includes('FAIL'))) {
            health.status = 'DEGRADED';
        }

        return NextResponse.json(health);
    } catch (err: any) {
        return NextResponse.json({
            status: 'ERROR',
            message: err.message,
            checks: health.checks
        }, { status: 500 });
    }
}
