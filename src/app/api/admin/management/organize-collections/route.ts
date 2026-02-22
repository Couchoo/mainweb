import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { reorganizeAllCollectionsWithJobs } from '@/lib/collection-utils';
import { prisma } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
    try {
        await requireAdmin();

        const jobId = uuidv4();

        // Create initial job record
        const initialProgress = {
            total: 0,
            processed: 0,
            success: 0,
            failed: 0,
            skipped: 0,
            current: 'Scanning database...'
        };

        await (prisma as any).$executeRawUnsafe(
            `INSERT INTO scraperjob (id, type, status, progress, startedAt, updatedAt) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            jobId, 'sync', 'running', JSON.stringify(initialProgress), new Date(), new Date()
        );

        // Start background process
        reorganizeAllCollectionsWithJobs(jobId).catch(async (error) => {
            console.error(`[Maintenance Job ${jobId}] Failed:`, error);
            await (prisma as any).$executeRawUnsafe(
                `UPDATE scraperjob SET status = ?, updatedAt = ? WHERE id = ?`,
                'error', new Date(), jobId
            );
        });

        return NextResponse.json({
            success: true,
            jobId,
            message: 'Database organization started'
        });
    } catch (error: any) {
        console.error('[Collection API] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
