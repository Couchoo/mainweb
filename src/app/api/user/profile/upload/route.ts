import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json({ message: 'Invalid file type. Only JPG, PNG and WebP are allowed.' }, { status: 400 });
        }

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            return NextResponse.json({ message: 'File too large. Max size is 2MB.' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure upload directory exists - Use more robust creation
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'avatars');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (dirErr) {
            console.error('[Upload API] Directory creation failed:', dirErr);
        }

        // Generate unique filename
        const filename = `${uuidv4()}-${file.name.replace(/\s+/g, '-')}`;
        const path = join(uploadDir, filename);

        console.log(`[Upload API] Writing file to: ${path}`);
        await writeFile(path, buffer);

        const imageUrl = `/uploads/avatars/${filename}`;

        // Update user in DB
        const userId = parseInt((session.user as any).id);
        if (isNaN(userId)) {
            throw new Error('Invalid user ID in session');
        }

        await prisma.user.update({
            where: { id: userId },
            data: { image: imageUrl }
        });

        console.log(`[Upload API] Success: User ${userId} updated with ${imageUrl}`);

        return NextResponse.json({ success: true, imageUrl });

    } catch (error: any) {
        console.error('[Upload API] Fatal Error:', error);
        return NextResponse.json({
            message: 'Upload failed',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
