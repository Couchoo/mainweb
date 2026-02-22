import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GENRE_MAPPING } from '@/lib/genre-mapping';
import bcrypt from 'bcryptjs';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const manualEmail = searchParams.get('email');
        const session = await getServerSession(authOptions);

        // 1. Restore Categories
        console.log('Seeding and fixing categories...');
        const categories = Object.entries(GENRE_MAPPING);
        let seededCount = 0;

        for (const [enName, bgName] of categories) {
            // Генерираме слъг от английското име (action, sci-fi и т.н.)
            const slug = enName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

            await prisma.category.upsert({
                where: { name: bgName },
                update: {
                    nameEN: enName,
                    slug: slug
                },
                create: {
                    name: bgName,
                    nameEN: enName,
                    slug: slug
                }
            });
            seededCount++;
        }

        // 2. Restore Admin User
        let adminCreated = false;
        const targetEmail = manualEmail || session?.user?.email;

        if (targetEmail) {
            // Хешираме "1234", защото NextAuth очаква хеш, а не чист текст
            const hashedPassword = await bcrypt.hash('1234', 10);

            await prisma.user.upsert({
                where: { email: targetEmail },
                update: {
                    role: 'ADMIN',
                    password: hashedPassword
                },
                create: {
                    email: targetEmail,
                    name: session?.user?.name || 'Admin',
                    role: 'ADMIN',
                    password: hashedPassword
                }
            });
            adminCreated = true;
        }

        return NextResponse.json({
            success: true,
            message: `Database restored: ${seededCount} categories fixed/seeded. Admin account (${targetEmail || 'none'}) hashed: ${adminCreated}`,
            hint: !targetEmail ? "Add ?email=your@email.com to the URL in the browser" : "You can now login with '1234'"
        });
    } catch (error: any) {
        console.error('Restoration error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
