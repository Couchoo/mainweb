'use client';

import { movie } from '@prisma/client';

interface JsonLdProps {
    movie: any; // Using any for localized movie data
    locale: string;
}

export function JsonLd({ movie, locale }: JsonLdProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Movie',
        name: movie.titleBG || movie.titleEN,
        alternateName: movie.titleEN,
        description: movie.description,
        image: movie.posterUrl,
        datePublished: movie.year.toString(),
        director: movie.director ? {
            '@type': 'Person',
            name: movie.director,
        } : undefined,
        aggregateRating: movie.rating ? {
            '@type': 'AggregateRating',
            ratingValue: movie.rating,
            bestRating: '10',
            worstRating: '1',
            ratingCount: movie.views || 1,
        } : undefined,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
