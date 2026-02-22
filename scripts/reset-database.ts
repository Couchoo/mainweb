import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetDatabase() {
    console.log('🗑️  Resetting database...\n');

    try {
        // Delete all data in correct order
        console.log('Deleting VideoServers...');
        const deletedServers = await (prisma as any).videoserver.deleteMany({});
        console.log(`✅ Deleted ${deletedServers.count} video servers`);

        console.log('Deleting Movies...');
        const deletedMovies = await prisma.movie.deleteMany({});
        console.log(`✅ Deleted ${deletedMovies.count} movies`);

        console.log('Deleting Users (except admins)...');
        const deletedUsers = await prisma.user.deleteMany({
            where: {
                role: { not: 'ADMIN' }
            }
        });
        console.log(`✅ Deleted ${deletedUsers.count} users`);

        console.log('\n✅ Database reset complete!');
        console.log('You can now run a fresh import.\n');

    } catch (error) {
        console.error('❌ Error resetting database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

resetDatabase();
