import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';

export async function POST(req: Request) {
    try {
        await requireAdmin();
        return NextResponse.json({
            success: false,
            error: 'Legacy advanced scrape disabled'
        }, { status: 501 });
    } catch (error) {
        console.error('Advanced scrape error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
