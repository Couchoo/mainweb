import { prisma } from '@/lib/db';
import { MovieCard } from '@/components/movies/MovieCard';
import { Pagination } from '@/components/ui/pagination';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { getTranslation, getLocalizedMovie, getLocalizedCategory, Locale } from '@/lib/i18n';
import { FilterBarV2 } from '@/components/movies/FilterBarV2';
import { Metadata } from 'next';
import { generateCategoryMetadata } from '@/lib/seo-utils';
import { GENRE_MAPPING } from '@/lib/genre-mapping';

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const headersList = await headers();
    const locale = (headersList.get('x-locale') || 'bg') as Locale;

    const category = await (prisma.category as any).findUnique({
        where: { slug }
    });

    if (!category) return { title: 'Категорията не е намерена' };

    const count = await prisma.movie.count({
        where: {
            published: true,
            moviecategory: {
                some: { category: { slug } }
            }
        }
    });

    return generateCategoryMetadata(category, locale, count);
}

const MOVIES_PER_PAGE = 24;

export default async function CategoryPage({
    params,
    searchParams
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const { slug } = await params;
    const { page, year, rating, sort } = await searchParams;
    const currentPage = parseInt(page || '1');
    const skip = (currentPage - 1) * MOVIES_PER_PAGE;

    const headersList = await headers();
    const locale = (headersList.get('x-locale') || 'bg') as Locale;
    const t = (key: any) => getTranslation(key, locale);

    const filterYear = year ? parseInt(year) : undefined;
    const filterRating = rating ? parseFloat(rating) : undefined;
    const sortBy = sort || 'newest';
    const orderDir = (await searchParams).order === 'asc' ? 'asc' : 'desc';

    // Normalize slug to lowercase for consistent lookup
    const searchSlug = slug.toLowerCase();

    // Find the Bulgarian counterpart if the slug is English
    const bgName = Object.entries(GENRE_MAPPING).find(([en, bg]) =>
        en.toLowerCase() === searchSlug
    )?.[1];

    const where: any = {
        published: true,
        moviecategory: {
            some: {
                category: {
                    OR: [
                        { slug: searchSlug },
                        { name: searchSlug },
                        ...(bgName ? [{ name: bgName }] : [])
                    ]
                }
            }
        }
    };

    if (filterYear) where.year = filterYear;
    if (filterRating) where.rating = { gte: filterRating };

    // newest = year desc (most recent release year first)
    let orderBy: any = { year: 'desc' };
    if (sortBy === 'oldest') orderBy = { year: 'asc' };
    if (sortBy === 'rating') orderBy = { rating: orderDir };
    if (sortBy === 'views') orderBy = { views: orderDir };

    const categoryData = await prisma.category.findFirst({
        where: {
            OR: [
                { slug: searchSlug },
                { name: searchSlug },
                ...(bgName ? [{ name: bgName }] : [])
            ]
        },
    });

    if (!categoryData) notFound();
    const category = getLocalizedCategory(categoryData, locale);

    const [moviesData, total] = await Promise.all([
        (prisma.movie as any).findMany({
            where,
            skip,
            take: MOVIES_PER_PAGE,
            orderBy,
            include: {
                moviecategory: {
                    include: { category: true }
                }
            }
        }),
        prisma.movie.count({ where })
    ]);

    const totalPages = Math.ceil(total / MOVIES_PER_PAGE);

    return (
        <div className="relative min-h-screen">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-royalPurple/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-cinemaGold/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="container py-12 relative">
                <div className="max-w-4xl mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-[2px] w-12 bg-brand-cinemaGold" />
                        <span className="text-[12px] font-display tracking-[0.4em] uppercase text-brand-cinemaGold">
                            {t('category')}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display tracking-widest uppercase text-brand-warmCream leading-none mb-4">
                        {category?.displayName}
                    </h1>
                    <p className="text-xl font-display tracking-widest text-brand-softLavender uppercase">
                        {total} {t('moviesCount')}
                        {totalPages > 1 && (
                            <span className="text-brand-softLavender/40 ml-4">
                                — {t('page')} {currentPage} {t('of')} {totalPages}
                            </span>
                        )}
                    </p>
                </div>

                <FilterBarV2 locale={locale} />

                {moviesData.length > 0 ? (
                    <div className="space-y-12">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 xl:gap-8">
                            {moviesData.map((m: any) => (
                                <MovieCard key={m.id} movie={getLocalizedMovie(m, locale)} locale={locale} />
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <div className="pt-8 border-t border-brand-royalPurple/10">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    baseUrl={`/category/${slug}`}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-brand-deepNight/40 rounded-[3rem] border-2 border-dashed border-brand-royalPurple/20 backdrop-blur-xl">
                        <img src="/brand/couchoo-mascot-transparent.png" className="w-32 h-32 mb-8 opacity-20 invert" alt="Chouchoo" />
                        <h2 className="text-3xl font-display tracking-widest text-brand-softLavender/40 uppercase mb-2">
                            {t('noMoviesInCategory')}
                        </h2>
                        <p className="text-brand-softLavender/20 font-display tracking-widest uppercase text-sm">
                            {t('cinema_adminWillAdd')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
