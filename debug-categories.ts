
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { moviecategory: true }
                }
            }
        });
        console.log('--- CATEGORIES START ---');
        categories.forEach(c => {
            console.log(`ID: ${c.id}, Name: ${c.name}, Slug: ${c.slug}, Count: ${c._count.moviecategory}`);
        });
        console.log('--- CATEGORIES END ---');
    } catch (err) {
        console.error('Error fetching categories:', err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
