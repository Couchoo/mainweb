const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const GENRES = [
    { name: 'Екшън', nameEN: 'Action', slug: 'action' },
    { name: 'Комедия', nameEN: 'Comedy', slug: 'comedy' },
    { name: 'Фантастика', nameEN: 'Sci-Fi', slug: 'sci-fi' },
    { name: 'Ужаси', nameEN: 'Horror', slug: 'horror' },
    { name: 'Приключенски', nameEN: 'Adventure', slug: 'adventure' },
    { name: 'Драма', nameEN: 'Drama', slug: 'drama' },
    { name: 'Трилър', nameEN: 'Thriller', slug: 'thriller' },
    { name: 'Анимация', nameEN: 'Animation', slug: 'animation' }
];

async function main() {
    console.log('--- DB SEED STARTED ---');

    // 1. Create Categories
    for (const genre of GENRES) {
        await prisma.category.upsert({
            where: { slug: genre.slug },
            update: { nameEN: genre.nameEN },
            create: {
                name: genre.name,
                nameEN: genre.nameEN,
                slug: genre.slug
            }
        });
    }
    console.log('✅ Categories seeded');

    // 2. Create Admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: { role: 'ADMIN' },
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
            popcornBalance: 10000
        }
    });
    console.log('✅ Admin account seeded');

    // 3. Create initial movie
    const actionCat = await prisma.category.findUnique({ where: { slug: 'action' } });
    await prisma.movie.upsert({
        where: { slug: 'interstellar' },
        update: {},
        create: {
            titleBG: 'Интерстелар',
            titleEN: 'Interstellar',
            slug: 'interstellar',
            description: 'Екип от изследователи пътува през дупка в пространството в опит да осигури оцеляването на човечеството.',
            year: 2014,
            duration: 169,
            director: 'Christopher Nolan',
            cast: 'Matthew McConaughey, Anne Hathaway',
            videoUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
            posterUrl: 'https://image.tmdb.org/t/p/original/gEU2QniE6Ea70vurnbyKouC7Poc.jpg',
            backdropUrl: 'https://image.tmdb.org/t/p/original/rAiT_Cnoas9pS2XMNU6pXaxr9ST.jpg',
            rating: 8.7,
            isHD: true,
            featured: true,
            published: true,
            categories: {
                create: [
                    { categoryId: actionCat.id }
                ]
            }
        }
    });
    console.log('✅ Initial movie seeded');

    console.log('--- DB SEED COMPLETED ---');
}

main()
    .catch((e) => {
        console.error('❌ SEED ERROR:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
