import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * DELETE /api/admin/maintenance/health/server
 * Delete a broken server
 */
export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { serverId } = body;

        if (!serverId) {
            return NextResponse.json({
                success: false,
                error: 'serverId required'
            }, { status: 400 });
        }

        // Get server details before deleting
        const server = await (prisma as any).$queryRawUnsafe(
            `SELECT id, movieId, name FROM videoserver WHERE id = ? LIMIT 1`,
            serverId
        );

        if (!server || server.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Server not found'
            }, { status: 404 });
        }

        const serverData = server[0];

        // Delete server
        await (prisma as any).$executeRawUnsafe(
            `DELETE FROM videoserver WHERE id = ?`,
            serverId
        );

        // Check if movie has any remaining servers
        const remainingServers = await (prisma as any).$queryRawUnsafe(
            `SELECT COUNT(*) as count FROM videoserver WHERE movieId = ?`,
            serverData.movieId
        );

        const hasServers = remainingServers[0]?.count > 0;

        // If no servers left, mark movie as broken and unpublish
        if (!hasServers) {
            await (prisma as any).$executeRawUnsafe(
                `UPDATE movie SET healthStatus = ?, published = ?, lastChecked = ? WHERE id = ?`,
                'BROKEN',
                0,
                new Date(),
                serverData.movieId
            );
        }

        return NextResponse.json({
            success: true,
            message: `Server ${serverData.name} deleted`,
            movieUnpublished: !hasServers
        });

    } catch (error: any) {
        console.error('[Delete Server API] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
