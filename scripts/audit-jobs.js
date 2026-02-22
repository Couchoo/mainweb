const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    console.log('--- Scraper Job Audit ---');
    const jobs = await prisma.scraperjob.findMany({
        orderBy: { startedAt: 'desc' },
        take: 3,
        include: {
            logs: {
                orderBy: { createdAt: 'desc' },
                take: 10
            }
        }
    });

    for (const job of jobs) {
        console.log(`\nJob ID: ${job.id}`);
        console.log(`Status: ${job.status}`);
        console.log(`Type: ${job.type}`);
        console.log(`Started: ${job.startedAt}`);
        console.log(`Updated: ${job.updatedAt}`);
        console.log(`Progress: ${job.progress}`);
        console.log('Last 5 Logs:');
        job.logs.slice(0, 5).forEach(l => {
            console.log(`  [${l.level}] ${l.message}`);
        });
    }
    await prisma.$disconnect();
}

check();
