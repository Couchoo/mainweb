'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit2, Trash2, Plus, Tag } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

export default function CategoriesPage() {
    const { toast } = useToast();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        const res = await fetch('/api/admin/categories');
        if (res.ok) {
            const data = await res.json();
            setCategories(data);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEditing ? `/api/admin/categories/${isEditing}` : '/api/admin/categories';
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, slug }),
            });

            if (!res.ok) throw new Error('Failed to save category');

            toast({
                title: 'Успех',
                description: isEditing ? 'Категорията е обновена' : 'Категорията е създадена',
            });

            setName('');
            setSlug('');
            setIsEditing(null);
            fetchCategories();
        } catch (error: any) {
            toast({
                title: 'Грешка',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: number) {
        if (!confirm('Сигурни ли сте, че искате да изтриете тази категория?')) return;

        try {
            const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete');

            toast({ title: 'Изтрито', description: 'Категорията е премахната' });
            fetchCategories();
        } catch (error: any) {
            toast({ title: 'Грешка', description: error.message, variant: 'destructive' });
        }
    }

    const handleEdit = (cat: Category) => {
        setIsEditing(cat.id);
        setName(cat.name);
        setSlug(cat.slug);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Управление на категории</h1>
                    <p className="text-muted-foreground">Добавяйте и редактирайте жанрове за вашите филми.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Form */}
                <Card className="border-secondary bg-card/50 h-fit">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {isEditing ? <Edit2 className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                            {isEditing ? 'Редактирай' : 'Добави категория'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Име</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="напр: Екшън"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    required
                                    placeholder="напр: action"
                                />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Button type="submit" className="flex-1" disabled={loading}>
                                    {loading ? 'Запазване...' : (isEditing ? 'Обнови' : 'Създай')}
                                </Button>
                                {isEditing && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setIsEditing(null);
                                            setName('');
                                            setSlug('');
                                        }}
                                    >
                                        Отказ
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* List */}
                <Card className="md:col-span-2 border-secondary bg-card/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Tag className="h-5 w-5" />
                            Списък с категории
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-secondary">
                                    <TableHead>Име</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead className="text-right">Действия</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map((cat) => (
                                    <TableRow key={cat.id} className="border-secondary hover:bg-secondary/20 transition-colors">
                                        <TableCell className="font-medium">{cat.name}</TableCell>
                                        <TableCell className="text-muted-foreground">{cat.slug}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(cat)}>
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(cat.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
