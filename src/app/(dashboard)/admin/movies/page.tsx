import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, ExternalLink } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MoviesAdminFilters } from '@/components/admin/MoviesAdminFilters';
import { Pagination } from '@/components/ui/pagination';
import { MoviesTable } from '@/components/admin/MoviesTable';
import { BulkImportDialog } from '@/components/admin/BulkImportDialog';


const MOVIES_PER_PAGE = 20;

async function getMovies(searchParams: any) {
    const page = parseInt(searchParams.page || '1');
    const skip = (page - 1) * MOVIES_PER_PAGE;
    const search = searchParams.search || '';
    const status = searchParams.status || 'all';
    const category = searchParams.category || 'all';
    const sortBy = searchParams.sort || 'newest';

    const where: any = {};

    // Search filter
    if (search) {
        where.OR = [
            { titleBG: { contains: search } },
            { titleEN: { contains: search } },
            { slug: { contains: search } },
        ];
    }

    // Status filter
    if (status === 'published') {
        where.published = true;
    } else if (status === 'draft') {
        where.published = false;
    }

    // Category filter
    if (category !== 'all') {
        where.moviecategory = {
            some: {
                category: {
                    slug: category
                }
            }
        };
    }

    // Sort
    const orderBy: any = {};
    switch (sortBy) {
        case 'newest':
            orderBy.createdAt = 'desc';
            break;
        case 'oldest':
            orderBy.createdAt = 'asc';
            break;
        case 'views':
            orderBy.views = 'desc';
            break;
        case 'title':
            orderBy.titleBG = 'asc';
            break;
        default:
            orderBy.createdAt = 'desc';
    }

    const [movies, total] = await Promise.all([
        (prisma as any).movie.findMany({
            where,
            orderBy,
            skip,
            take: MOVIES_PER_PAGE,
            include: {
                moviecategory: {
                    include: { category: true },
                },
            },
        }),
        (prisma as any).movie.count({ where })
    ]);

    return { movies, total, currentPage: page, totalPages: Math.ceil(total / MOVIES_PER_PAGE) };
}

async function getCategories() {
    return await prisma.category.findMany({
        orderBy: { name: 'asc' }
    });
}

export default async function MoviesAdminPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;
    const [result, categories] = await Promise.all([
        getMovies(params),
        getCategories(),
    ]);

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Библиотека с филми</h1>
                    <p className="text-muted-foreground">
                        Управлявайте съдържанието, което се показва на вашите потребители.
                        {result.total > 0 && ` (${result.total} филма)`}
                    </p>
                </div>
                <div className="flex gap-2">
                    <BulkImportDialog />
                    <Button asChild className="shadow-lg shadow-primary/20">
                        <Link href="/admin/movies/new">
                            <Plus className="mr-2 h-5 w-5" />
                            Добави филм
                        </Link>
                    </Button>
                </div>
            </div>

            <MoviesAdminFilters categories={categories} currentParams={params} />

            <MoviesTable movies={result.movies} categories={categories} />

            {result.totalPages > 1 && (
                <Pagination
                    currentPage={result.currentPage}
                    totalPages={result.totalPages}
                    baseUrl="/admin/movies"
                />
            )}
        </div>
    );
}
