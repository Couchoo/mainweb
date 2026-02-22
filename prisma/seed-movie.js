const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const movie = await prisma.movie.create({
        data: {
            titleBG: 'Завръщане в бъдещето',
            titleEN: 'Back to the Future',
            slug: 'back-to-the-future',
            description: 'Марти Макфлай се завръща в миналото с машина на времето...',
            year: 1985,
            duration: 116,
            country: 'USA',
            director: 'Robert Zemeckis',
            cast: 'Michael J. Fox, Christopher Lloyd',
            videoUrl: 'https://www.youtube.com/embed/qvsgGuM62zQ',
            posterUrl: 'https://image.tmdb.org/t/p/original/7lyBszUM4Sbbas787KZYp7p0Zg3.jpg',
            isHD: true,
            rating: 8.5,
            featured: true,
            published: true,
        },
    });

    console.log('Test movie created:', movie.titleBG);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
