const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🔍 Database Diagnostic Starting...');

    try {
        const movieCount = await prisma.movie.count();
        const serverCount = await prisma.videoserver.count();
        const scheduleCount = await prisma.cinema_schedule.count();
        const userCount = await prisma.user.count();

        console.log(`------------------------------`);
        console.log(`📊 Статистика на Базата Данни:`);
        console.log(`🎬 Филми (Movie): ${movieCount}`);
        console.log(`🖥️ Видео Сървъри (VideoServer): ${serverCount}`);
        console.log(`📅 Програма (Cinema Schedule): ${scheduleCount}`);
        console.log(`👤 Потребители (User): ${userCount}`);
        console.log(`------------------------------`);

        if (movieCount > 0 && serverCount > 0) {
            const linkedServers = await prisma.videoserver.count({
                where: { movieId: { not: null } }
            });
            console.log(`🔗 Свързани сървъри към филми: ${linkedServers}`);

            if (linkedServers === 0) {
                console.error('❌ ГРЕШКА: Всички видео сървъри са "сираци" (нямат movieId). Вероятно IDs в MySQL са се променили при импорта.');
            }
        } else {
            if (movieCount === 0) console.warn('⚠️ ПРЕДУПРЕЖДЕНИЕ: Таблицата с филми е празна!');
            if (serverCount === 0) console.warn('⚠️ ПРЕДУПРЕЖДЕНИЕ: Таблицата със сървъри е празна!');
        }

    } catch (e) {
        console.error('❌ Фатална грешка при свързване с БД:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
