import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { prisma } from '@/lib/db';

/**
 * Detect trending movies from IMDB (Simplified placeholder for clean build)
 */
async function getTrendingMovies(): Promise<any[]> {
    return [];
}

/**
 * Legacy trending check (Disabled)
 */
export async function POST(req: Request) {
    try {
        await requireAdmin();
        return NextResponse.json({
            success: false,
            error: 'Legacy trending scraper disabled'
        }, { status: 501 });
    } catch (error: any) {
        console.error('Trending check error:', error);
        return NextResponse.json({ message: error.message || 'Error' }, { status: 500 });
    }
}

/**
 * Get trending movies globally
 */
export async function GET(req: Request) {
    try {
        await requireAdmin();
        const trending = await getTrendingMovies();
        return NextResponse.json({
            trending: [],
            timestamp: new Date()
        });
    } catch (error: any) {
        console.error('Trending error:', error);
        return NextResponse.json({ message: error.message || 'Error' }, { status: 500 });
    }
}
