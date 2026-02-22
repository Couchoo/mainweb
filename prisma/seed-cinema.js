const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Virtual Cinema...');

    // 1. Get some movies
    const movies = await prisma.movie.findMany({ take: 5 });
    if (movies.length === 0) {
        console.log('No movies found to seed cinema.');
        return;
    }

    // 2. Clear existing schedule
    await prisma.cinema_schedule.deleteMany({});

    // 3. Create schedule for today
    const now = new Date();

    for (let i = 0; i < movies.length; i++) {
        const start = new Date(now);
        start.setHours(now.getHours() + (i * 2)); // Every 2 hours
        const end = new Date(start);
        end.setHours(start.getHours() + 2);

        await prisma.cinema_schedule.create({
            data: {
                movieId: movies[i].id,
                startTime: start,
                endTime: end
            }
        });
        console.log(`Scheduled: ${movies[i].titleBG || movies[i].titleEN} at ${start.toLocaleTimeString()}`);
    }

    // 4. Create some initial messages
    await prisma.cinema_message.deleteMany({});
    const users = await prisma.user.findMany({ take: 3 });

    if (users.length > 0) {
        await prisma.cinema_message.createMany({
            data: [
                { content: 'Добре дошли във Виртуалното Кино!', userId: users[0].id, type: 'info' },
                { content: 'Приятно гледане на всички!', userId: users[1].id, type: 'text' },
                { content: 'Rose', userId: users[2].id, type: 'gift' }
            ]
        });
    }

    console.log('Cinema seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
