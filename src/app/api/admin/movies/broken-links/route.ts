import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/db';

/**
 * GET /api/admin/movies/broken-links
 * Fetch movies with broken links from the last 7 days
 */
export async function GET(request: NextRequest) {
    try {
        await requireAdmin();

        // Get ALL broken links from last 7 days (no limit)
        const brokenLinks = await (prisma as any).$queryRawUnsafe(`
            SELECT id, movieId, movieTitle, movieSlug, fixedAt
            FROM fixed_movies_review
            WHERE fixedAt >= DATE_SUB(NOW(), INTERVAL 7 DAY)
            ORDER BY fixedAt DESC
        `);

        return NextResponse.json({
            brokenLinks,
            count: brokenLinks.length
        });

    } catch (error: any) {
        console.error('Broken links fetch error:', error);
        return NextResponse.json({ message: error.message || 'Error' }, { status: 500 });
    }
}
