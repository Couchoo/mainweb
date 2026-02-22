import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * GET /api/admin/movies/:id/servers
 * Get all servers for a movie
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const movieId = parseInt(id);

        const servers = await (prisma as any).$queryRawUnsafe(`
            SELECT id, name, url, \`order\`
            FROM videoserver
            WHERE movieId = ?
            ORDER BY \`order\` ASC
        `, movieId);

        return NextResponse.json({
            success: true,
            servers
        });

    } catch (error: any) {
        console.error('[Get Servers API] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

/**
 * POST /api/admin/movies/:id/servers
 * Add or update servers for a movie
 */
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const movieId = parseInt(id);
        const body = await request.json();
        const { servers } = body; // Array of { name, url }

        if (!servers || !Array.isArray(servers)) {
            return NextResponse.json({
                success: false,
                error: 'servers array required'
            }, { status: 400 });
        }

        // Delete existing servers
        await (prisma as any).$executeRawUnsafe(`
            DELETE FROM videoserver WHERE movieId = ?
        `, movieId);

        // Add new servers
        for (let i = 0; i < servers.length; i++) {
            const server = servers[i];
            await (prisma as any).$executeRawUnsafe(`
                INSERT INTO videoserver (movieId, name, url, \`order\`)
                VALUES (?, ?, ?, ?)
            `, movieId, server.name, server.url, i + 1);
        }

        return NextResponse.json({
            success: true,
            message: `Updated ${servers.length} server(s)`
        });

    } catch (error: any) {
        console.error('[Update Servers API] Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
