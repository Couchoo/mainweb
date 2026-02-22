import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-helpers';
import { publishCinemaState } from '@/lib/ws-publisher';

/**
 * GET /api/admin/cinema/schedule
 * Fetch full schedule for admin (optional if using status API)
 */
export async function GET(request: NextRequest) {
    try {
        await requireAdmin();
        const { searchParams } = new URL(request.url);
        const dateStr = searchParams.get('date');

        const where: any = {};
        if (dateStr) {
            const startOfDay = new Date(dateStr);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(dateStr);
            endOfDay.setHours(23, 59, 59, 999);

            where.startTime = {
                gte: startOfDay,
                lte: endOfDay
            };
        }

        const schedule = await (prisma as any).cinema_schedule.findMany({
            where,
            include: {
                movie: {
                    select: { id: true, titleBG: true, titleEN: true, duration: true, year: true, posterUrl: true }
                }
            },
            orderBy: { startTime: 'asc' }
        });
        return NextResponse.json(schedule);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

/**
 * POST /api/admin/cinema/schedule
 * Adds a movie to the cinema schedule
 */
export async function POST(request: NextRequest) {
    try {
        await requireAdmin();
        const { movieId, startTime, endTime } = await request.json();

        if (!movieId || !startTime || !endTime) {
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
        }

        const newSchedule = await (prisma as any).cinema_schedule.create({
            data: {
                movieId,
                startTime: new Date(startTime),
                endTime: new Date(endTime)
            },
            include: {
                movie: {
                    include: {
                        cinema_library: { select: { videoPath: true } }
                    }
                }
            }
        });

        // 🚀 Notify Go server immediately about the new schedule
        // The Go server is the source of truth for "now" and broadcasts sync pulses
        const now = new Date();
        const start = new Date(newSchedule.startTime);
        const end = new Date(newSchedule.endTime);

        publishCinemaState({
            movieId: newSchedule.movieId,
            movieTitle: newSchedule.movie.titleBG,
            startTime: start.toISOString(),
            endTime: end.toISOString(),
            isLive: now >= start && now <= end,
            videoUrl: (newSchedule.movie as any).cinema_library?.videoPath || undefined
        });

        return NextResponse.json(newSchedule);
    } catch (error: any) {
        console.error('Add Schedule Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/**
 * DELETE /api/admin/cinema/schedule
 * Removes a slot from the schedule
 */
export async function DELETE(request: NextRequest) {
    try {
        await requireAdmin();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
        }

        await (prisma as any).cinema_schedule.delete({
            where: { id: parseInt(id) }
        });

        // 🚀 Tell Go server to re-evaluate state (passing empty state will trigger auto-refresh)
        publishCinemaState({
            movieId: 0,
            movieTitle: '',
            startTime: new Date(0).toISOString(),
            endTime: new Date(0).toISOString(),
            isLive: false
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
