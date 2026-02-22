import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
    try {
        const now = new Date();
        const nowMs = now.getTime();

        const headers = {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        };

        console.log('[CINEMA] Server time (UTC):', now.toISOString());

        // Fetch all relevant screenings (past 24h + future)
        const allPotential = await (prisma as any).cinema_schedule.findMany({
            where: {
                endTime: { gte: new Date(nowMs - 24 * 60 * 60 * 1000) }
            },
            include: {
                movie: {
                    include: {
                        videoserver: { take: 1 },
                        cinema_library: true  // Include uploaded cinema video
                    }
                }
            },
            orderBy: { startTime: 'asc' },
            take: 20
        });

        let playbackOffset = 0;
        let cinemaVideoUrl: string | null = null;

        const currentMovie = allPotential.find((s: any) => {
            const startMs = new Date(s.startTime).getTime();
            const endMs = new Date(s.endTime).getTime();
            // 🛡️ LEAD TIME: Mark as live if starting within 10s to account for skew
            const isLive = startMs <= (nowMs + 10000) && endMs >= nowMs;

            if (isLive) {
                playbackOffset = Math.floor((nowMs - startMs) / 1000);
                // Prefer the uploaded cinema MP4 over external sources
                if (s.movie.cinema_library?.videoPath) {
                    cinemaVideoUrl = s.movie.cinema_library.videoPath;
                }
            }
            return isLive;
        });

        const nextMovie = allPotential.find((s: any) => new Date(s.startTime).getTime() > nowMs);

        // --- 🧹 CHAT CLEANUP LOGIC ---
        // If a movie just ended (within the last 60s), clear the chat table
        const justEnded = allPotential.find((s: any) => {
            const endMs = new Date(s.endTime).getTime();
            return nowMs > endMs && nowMs < endMs + 60000;
        });

        if (justEnded) {
            const secretRaw = process.env.WS_INTERNAL_SECRET!;
            const secret = secretRaw?.replace(/^["']|["']$/g, '');
            const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
            fetch(`${baseUrl}/api/cinema/chat`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${secret}` }
            }).catch(() => { });
        }

        const fortyFiveSecondsAgo = new Date(nowMs - 45 * 1000);
        const activePresence = await (prisma as any).cinema_presence.findMany({
            where: { lastSeen: { gte: fortyFiveSecondsAgo } },
            include: {
                user: { select: { id: true, name: true, image: true, role: true, createdAt: true } }
            }
        });

        const viewers = activePresence.map((p: any) => p.user);

        // --- 🛠 FIX: Comprehensive BigInt to Number serialization ---
        const serializeCinemaItem = (s: any) => {
            if (!s) return null;
            return {
                ...s,
                movie: {
                    ...s.movie,
                    cinema_library: s.movie.cinema_library ? {
                        ...s.movie.cinema_library,
                        fileSize: Number(s.movie.cinema_library.fileSize)
                    } : null
                }
            };
        };

        const serializedSchedule = allPotential.map(serializeCinemaItem);
        const serializedCurrent = serializeCinemaItem(currentMovie);
        const serializedNext = serializeCinemaItem(nextMovie);

        return NextResponse.json({
            serverTime: now.toISOString(),
            currentMovie: serializedCurrent,
            nextMovie: serializedNext,
            playbackOffset,
            cinemaVideoUrl,
            schedule: serializedSchedule,
            activeViewers: viewers.length,
            viewers,
            debug: {
                now: now.toISOString(),
                potentialCount: allPotential.length,
                hasLive: !!currentMovie,
                hasNext: !!nextMovie,
                playbackOffset,
                hasCinemaVideo: !!cinemaVideoUrl
            }
        }, { headers });

    } catch (error: any) {
        console.error('Cinema Status API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
