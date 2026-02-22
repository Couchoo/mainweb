'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit2, ExternalLink } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { BulkActions } from '@/components/admin/BulkActions';

interface MoviesTableProps {
    movies: any[];
    categories: any[];
}

export function MoviesTable({ movies, categories }: MoviesTableProps) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const toggleSelection = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedIds.length === movies.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(movies.map(m => m.id));
        }
    };

    return (
        <div className="space-y-4">
            {selectedIds.length > 0 && (
                <BulkActions
                    selectedIds={selectedIds}
                    categories={categories}
                    onClearSelection={() => setSelectedIds([])}
                />
            )}

            <div className="rounded-xl border border-secondary bg-card overflow-hidden">
                <Table>
                    <TableHeader className="bg-secondary/30">
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={selectedIds.length === movies.length && movies.length > 0}
                                    onCheckedChange={toggleAll}
                                />
                            </TableHead>
                            <TableHead className="font-bold py-5">Заглавие</TableHead>
                            <TableHead className="font-bold">Година</TableHead>
                            <TableHead className="font-bold">Категории</TableHead>
                            <TableHead className="font-bold text-center">Гледания</TableHead>
                            <TableHead className="font-bold">Статус</TableHead>
                            <TableHead className="font-bold text-right">Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {movies.length > 0 ? (
                            movies.map((movie: any) => (
                                <TableRow
                                    key={movie.id}
                                    className="hover:bg-secondary/20 transition-colors border-secondary"
                                >
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedIds.includes(movie.id)}
                                            onCheckedChange={() => toggleSelection(movie.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-semibold py-4">
                                        <div className="flex flex-col">
                                            <span>{movie.titleBG}</span>
                                            <span className="text-xs text-muted-foreground font-normal">{movie.titleEN}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{movie.year}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {movie.moviecategory?.slice(0, 2).map((c: any) => (
                                                <Badge key={c.categoryId} variant="secondary" className="bg-secondary text-[10px] uppercase tracking-wider">
                                                    {c.category?.name}
                                                </Badge>
                                            ))}
                                            {(movie.moviecategory?.length || 0) > 2 && (
                                                <Badge variant="outline" className="text-[10px]">
                                                    +{(movie.moviecategory?.length || 0) - 2}
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center font-mono">{movie.views.toLocaleString()}</TableCell>
                                    <TableCell>
                                        {movie.published ? (
                                            <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">Публикуван</Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20">Чернова</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <Link href={`/movies/${movie.slug}`} target="_blank">
                                                    <ExternalLink className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-primary">
                                                <Link href={`/admin/movies/${movie.id}/edit`}>
                                                    <Edit2 className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                    Няма намерени филми.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

