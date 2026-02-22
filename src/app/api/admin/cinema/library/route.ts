import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-helpers';
import { unlink } from 'fs/promises';
import path from 'path';

// GET /api/admin/cinema/library — list all movies with cinema files
export async function GET() {
    try {
        await requireAdmin();

        const library = await (prisma as any).cinema_library.findMany({
            include: {
                movie: {
                    select: {
                        id: true,
                        titleBG: true,
                        titleEN: true,
                        year: true,
                        posterUrl: true,
                        duration: true,
                    }
                }
            },
            orderBy: { uploadedAt: 'desc' }
        });

        const serializedLibrary = library.map((item: any) => ({
            ...item,
            fileSize: item.fileSize ? Number(item.fileSize) : null
        }));

        return NextResponse.json(serializedLibrary);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE /api/admin/cinema/library?id=X — delete cinema library entry + file
export async function DELETE(request: NextRequest) {
    try {
        await requireAdmin();

        const id = parseInt(request.nextUrl.searchParams.get('id') || '0');
        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

        const entry = await (prisma as any).cinema_library.findUnique({ where: { id } });
        if (!entry) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        // Delete physical file
        try {
            const filePath = path.join(process.cwd(), 'public', entry.videoPath);
            await unlink(filePath);
        } catch {
            // File might already be deleted — ignore
        }

        await (prisma as any).cinema_library.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
