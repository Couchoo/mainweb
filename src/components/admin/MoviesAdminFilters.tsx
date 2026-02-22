'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface MoviesAdminFiltersProps {
    categories: { id: number; name: string; slug: string }[];
    currentParams: { [key: string]: string | string[] | undefined };
}

export function MoviesAdminFilters({ categories, currentParams }: MoviesAdminFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== 'all') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.delete('page'); // Reset to page 1 when filtering
        router.push(`/admin/movies?${params.toString()}`);
    };

    const clearFilters = () => {
        router.push('/admin/movies');
    };

    const hasActiveFilters = 
        searchParams.get('search') || 
        searchParams.get('status') !== 'all' || 
        searchParams.get('category') !== 'all' || 
        searchParams.get('sort') !== 'newest';

    return (
        <Card className="border-secondary bg-card/50">
            <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    {/* Search */}
                    <div className="flex-1 w-full">
                        <Label>Търсене</Label>
                        <div className="relative mt-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Търси по заглавие или slug..."
                                value={searchParams.get('search') || ''}
                                onChange={(e) => {
                                    const params = new URLSearchParams(searchParams.toString());
                                    if (e.target.value) {
                                        params.set('search', e.target.value);
                                    } else {
                                        params.delete('search');
                                    }
                                    params.delete('page');
                                    router.push(`/admin/movies?${params.toString()}`);
                                }}
                                className="pl-9 bg-secondary/30 border-secondary"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div className="w-full md:w-48">
                        <Label>Статус</Label>
                        <Select
                            value={searchParams.get('status') || 'all'}
                            onValueChange={(value) => updateFilter('status', value)}
                        >
                            <SelectTrigger className="mt-1 bg-secondary/30 border-secondary">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Всички</SelectItem>
                                <SelectItem value="published">Публикувани</SelectItem>
                                <SelectItem value="draft">Чернови</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Category */}
                    <div className="w-full md:w-48">
                        <Label>Категория</Label>
                        <Select
                            value={searchParams.get('category') || 'all'}
                            onValueChange={(value) => updateFilter('category', value)}
                        >
                            <SelectTrigger className="mt-1 bg-secondary/30 border-secondary">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Всички категории</SelectItem>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.slug}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sort */}
                    <div className="w-full md:w-48">
                        <Label>Сортиране</Label>
                        <Select
                            value={searchParams.get('sort') || 'newest'}
                            onValueChange={(value) => updateFilter('sort', value)}
                        >
                            <SelectTrigger className="mt-1 bg-secondary/30 border-secondary">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Най-нови</SelectItem>
                                <SelectItem value="oldest">Най-стари</SelectItem>
                                <SelectItem value="views">Най-гледани</SelectItem>
                                <SelectItem value="title">По заглавие</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Clear */}
                    {hasActiveFilters && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={clearFilters}
                            className="gap-2"
                        >
                            <X className="h-4 w-4" />
                            Изчисти
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

