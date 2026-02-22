import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { scrapeMovieData } from '@/lib/scraper';

export async function POST(req: Request) {
    try {
        await requireAdmin();
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ message: 'URL is required' }, { status: 400 });
        }

        const result = await scrapeMovieData(url);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Scraper error:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            cause: error.cause
        });
        return NextResponse.json({
            message: error.message || 'Error',
            details: error.toString()
        }, { status: 500 });
    }
}
