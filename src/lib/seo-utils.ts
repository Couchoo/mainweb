/**
 * SEO UTILITIES
 * Generates optimized titles and meta descriptions for movies and categories.
 */

export function generateMovieMetadata(movie: any, locale: string = 'bg') {
    const isEN = locale === 'en';

    // Choose titles based on locale
    const title = isEN ? movie.titleEN : movie.titleBG;
    const year = movie.year;

    // Extract genres/categories
    const genres = movie.moviecategory?.map((mc: any) => {
        const cat = mc.category;
        return isEN ? (cat.nameEN || cat.name) : cat.name;
    }).join(', ');

    // Primary keywords
    const keywords = isEN
        ? "Watch Online, Free Streaming, HD Movie"
        : "Гледай Онлайн, БГ Субтитри, Филми Онлайн, HD";

    // Optimized Title
    const seoTitle = isEN
        ? `${title} (${year}) - Full Movie Online Free Streaming HD`
        : `${title} (${year}) - Гледай Онлайн с БГ Субтитри [Високо Качество]`;

    // Optimized Description
    let seoDescription = "";
    if (isEN) {
        seoDescription = `Watch ${title} (${year}) full movie online. Genre: ${genres}. Featuring ${movie.cast?.substring(0, 80)}. No registration required. High quality streaming available now.`;
    } else {
        seoDescription = `Гледай ${title} (${year}) онлайн с БГ субтитри безплатно. Категория: ${genres}. С участието на ${movie.cast?.substring(0, 80)}. Високо HD качество без регистрация.`;
    }

    const description = seoDescription.substring(0, 160);
    const domain = process.env.NEXT_PUBLIC_APP_URL || 'https://movie-platform.com';
    const movieUrl = `${domain}/movies/${movie.slug}`;
    const imageUrl = movie.backdropUrl || movie.posterUrl;

    return {
        title: seoTitle,
        description: description,
        keywords: `${title}, ${year}, ${genres}, ${keywords}`,
        openGraph: {
            title: seoTitle,
            description: description,
            url: movieUrl,
            siteName: 'MoviePlatform',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: isEN ? 'en_US' : 'bg_BG',
            type: 'video.movie',
        },
        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: description,
            images: [imageUrl],
        },
        alternates: {
            canonical: movieUrl,
        }
    };
}

export function generateCategoryMetadata(category: any, locale: string = 'bg', count: number = 0) {
    const isEN = locale === 'en';
    const name = isEN ? (category.nameEN || category.name) : category.name;

    const seoTitle = isEN
        ? `Best ${name} Movies Online - Free HD Streaming`
        : `Най-добрите ${name} филми онлайн - Гледай с БГ Субтитри`;

    const seoDescription = isEN
        ? `Explore our collection of ${count} ${name} movies. Watch top-rated ${name} films online for free in high definition. Fresh content updated daily.`
        : `Разгледай нашата колекция от ${count} ${name} филма. Гледай най-добрите ${name} филми онлайн безплатно и с високо качество.`;

    return {
        title: seoTitle,
        description: seoDescription.substring(0, 160)
    };
}
