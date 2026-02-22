
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

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
    'Music': 'Музикален'
};

async function fixCategories() {
    try {
        const categories = await prisma.category.findMany();
        console.log(`Checking ${categories.length} categories...`);

        for (const cat of categories) {
            // Find the English name for this category if it exists in our map
            let englishName = Object.keys(GENRE_MAPPING).find(key =>
                GENRE_MAPPING[key] === cat.name || key === cat.name
            );

            if (englishName) {
                const newSlug = englishName.toLowerCase().replace(/\s+/g, '-');

                console.log(`Updating ${cat.name}: Slug -> ${newSlug}, nameEN -> ${englishName}`);

                await prisma.category.update({
                    where: { id: cat.id },
                    data: {
                        slug: newSlug,
                        nameEN: englishName
                    }
                });
            } else {
                console.log(`No mapping found for: ${cat.name}`);
            }
        }
        console.log('✅ Done fixing categories!');
    } catch (err) {
        console.error('Error fixing categories:', err);
    } finally {
        await prisma.$disconnect();
    }
}

fixCategories();
