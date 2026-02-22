const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const GENRE_MAPPING = {
    'Action': 'Екшън',
    'Comedy': 'Комедия',
    'Sci-Fi': 'Фантастика',
    'Horror': 'Ужаси',
    'Adventure': 'Приключенски',
    'Drama': 'Драма',
    'Thriller': 'Трилър',
    'Animation': 'Анимация',
    'Western': 'Уестърн',
    'War': 'Военни',
    'Romance': 'Романтичен',
    'Fantasy': 'Фентъзи',
    'Mystery': 'Мистерия',
    'Crime': 'Криминален',
    'Biography': 'Биография',
    'History': 'Исторически',
    'Documentary': 'Документален',
    'Family': 'Семеен',
    'Musical': 'Мюзикъл',
    'Sport': 'Спорт',
    'Music': 'Музикален',
    'Film-Noir': 'Филм-Ноар',
    'Short': 'Късометражен',
    'Adult': 'Еротичен',
    'Reality-TV': 'Риалити',
    'Talk-Show': 'Токшоу',
    'Game-Show': 'Гейм шоу',
    'News': 'Новини',
    'Indian': 'Индийски'
};

async function cleanup() {
    console.log('--- Category Cleanup Started (JS) ---');
    try {
        const categories = await prisma.category.findMany();
        console.log(`Found ${categories.length} total categories.`);

        for (const [english, bulgarian] of Object.entries(GENRE_MAPPING)) {
            const bgCat = categories.find(c => c.name === bulgarian);
            const enCat = categories.find(c => c.name === english);

            if (bgCat && enCat) {
                console.log(`MERGE: ${bulgarian} (ID ${bgCat.id}) -> ${english} (ID ${enCat.id})`);

                const movieLinks = await prisma.moviecategory.findMany({
                    where: { categoryId: bgCat.id }
                });

                console.log(`Moving ${movieLinks.length} movie links...`);
                for (const link of movieLinks) {
                    try {
                        await prisma.moviecategory.upsert({
                            where: {
                                movieId_categoryId: {
                                    movieId: link.movieId,
                                    categoryId: enCat.id
                                }
                            },
                            update: {},
                            create: {
                                movieId: link.movieId,
                                categoryId: enCat.id
                            }
                        });
                    } catch (e) {
                        // console.log(`Skipped duplicate link for movie ${link.movieId}`);
                    }
                }

                await prisma.category.delete({ where: { id: bgCat.id } });
                console.log(`Deleted category: ${bulgarian}`);
            } else if (bgCat && !enCat) {
                console.log(`RENAME: ${bulgarian} (ID ${bgCat.id}) -> ${english}`);
                await prisma.category.update({
                    where: { id: bgCat.id },
                    data: {
                        name: english,
                        slug: english.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    }
                });
            }
        }

        const finalCategories = await prisma.category.findMany();
        for (const cat of finalCategories) {
            const canonicalSlug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            if (cat.slug !== canonicalSlug && cat.slug !== 'null') {
                console.log(`SLUG FIX: ${cat.name} (${cat.slug} -> ${canonicalSlug})`);
                await prisma.category.update({
                    where: { id: cat.id },
                    data: { slug: canonicalSlug }
                });
            }
        }

        console.log('--- Cleanup Finished Successfully ---');
    } catch (error) {
        console.error('ERROR during cleanup:', error);
    } finally {
        await prisma.$disconnect();
    }
}

cleanup();
