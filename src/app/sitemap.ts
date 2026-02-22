import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    let movies: any[] = [];
    let categories: any[] = [];

    try {
        // Get all published movies
        movies = await prisma.movie.findMany({
            where: { published: true },
            select: { slug: true, updatedAt: true }
        });

        // Get all categories
        categories = await prisma.category.findMany({
            select: { slug: true }
        });
    } catch (error) {
        console.warn('⚠️ Sitemap: Database not ready or tables missing. Skipping dynamic routes during build.');
    }

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/search`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/my-list`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.6,
        },
    ];

    // Movie pages
    const moviePages = movies.map((movie) => ({
        url: `${baseUrl}/movies/${movie.slug}`,
        lastModified: movie.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // Category pages
    const categoryPages = categories.map((category) => ({
        url: `${baseUrl}/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...moviePages, ...categoryPages];
}
