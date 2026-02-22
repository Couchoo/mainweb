import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-helpers';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

// POST /api/admin/cinema/library/upload
// Body: FormData with `movieId` (string) and `file` (MP4 File)
export async function POST(request: NextRequest) {
    try {
        await requireAdmin();

        const formData = await request.formData();
        const movieIdRaw = formData.get('movieId');
        const file = formData.get('file') as File | null;

        if (!movieIdRaw || !file) {
            return NextResponse.json({ error: 'movieId and file are required' }, { status: 400 });
        }

        const movieId = parseInt(String(movieIdRaw));
        if (isNaN(movieId)) {
            return NextResponse.json({ error: 'Invalid movieId' }, { status: 400 });
        }

        // Validate file type
        if (!file.type.includes('video/') && !file.name.endsWith('.mp4')) {
            return NextResponse.json({ error: 'Only video files are accepted' }, { status: 400 });
        }

        // Verify movie exists
        const movie = await (prisma as any).movie.findUnique({ where: { id: movieId } });
        if (!movie) {
            return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
        }

        // Save file to public/uploads/cinema/
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'cinema');
        await mkdir(uploadsDir, { recursive: true });

        const ext = file.name.split('.').pop() || 'mp4';
        const filename = `movie-${movieId}.${ext}`;
        const filePath = path.join(uploadsDir, filename);

        const bytes = await file.arrayBuffer();
        await writeFile(filePath, Buffer.from(bytes));

        const videoPath = `/uploads/cinema/${filename}`;
        const fileSize = BigInt(file.size);

        // Upsert cinema_library record
        const entry = await (prisma as any).cinema_library.upsert({
            where: { movieId },
            create: { movieId, videoPath, fileSize, uploadedAt: new Date() },
            update: { videoPath, fileSize, uploadedAt: new Date() },
            include: {
                movie: {
                    select: { id: true, titleBG: true, titleEN: true, posterUrl: true }
                }
            }
        });

        return NextResponse.json({
            success: true,
            videoPath,
            fileSize: Number(fileSize),
            entry: {
                ...entry,
                fileSize: Number(entry.fileSize)
            }
        });
    } catch (error: any) {
        console.error('[Cinema Library Upload]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
