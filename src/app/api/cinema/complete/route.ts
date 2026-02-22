import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { publishCinemaState } from '@/lib/ws-publisher';

export async function POST(request: NextRequest) {
    try {
        const { scheduleId } = await request.json();

        const id = typeof scheduleId === 'string' ? parseInt(scheduleId) : scheduleId;

        if (!id || isNaN(id)) {
            return NextResponse.json({ error: 'Invalid scheduleId' }, { status: 400 });
        }

        // Check if it exists before deleting to avoid crash
        const exists = await (prisma as any).cinema_schedule.findUnique({ where: { id } });
        if (!exists) {
            console.warn(`[CINEMA] Schedule item ${id} already deleted or not found.`);
        } else {
            await (prisma as any).cinema_schedule.delete({
                where: { id }
            });
            console.log(`[CINEMA] Movie with scheduleId ${id} terminated.`);
        }

        // 🚀 Broadcast to all Go server clients that the state has changed
        // This will trigger a re-fresh for everyone
        await publishCinemaState({
            movieId: 0,
            movieTitle: '',
            startTime: new Date(0).toISOString(),
            endTime: new Date(0).toISOString(),
            isLive: false
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[Cinema Complete API Error]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
