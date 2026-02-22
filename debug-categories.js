
const { PrismaClient } = require('@prisma/client');
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
        console.log('CATEGORIES_START');
        console.log(JSON.stringify(categories));
        console.log('CATEGORIES_END');
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
