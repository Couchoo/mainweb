'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Sparkles, Loader2, Link as LinkIcon, Film, Info, Plus, X, Server } from 'lucide-react';

interface Category {
    id: number;
    name: string;
}

interface MovieFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function MovieForm({ initialData, isEditing = false }: MovieFormProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [tmdbLoading, setTmdbLoading] = useState(false);
    const [scrapeUrl, setScrapeUrl] = useState('');

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>(
        initialData?.moviecategory?.map((c: any) => c.categoryId) || []
    );

    const [videoServers, setVideoServers] = useState<Array<{ name: string; url: string; order: number }>>(
        initialData?.videoserver?.length > 0
            ? initialData.videoserver.map((vs: any, index: number) => ({
                name: vs.name || '',
                url: vs.url || '',
                order: vs.order ?? index,
            }))
            : initialData?.videoUrl
                ? [{ name: 'Сървър 1', url: initialData.videoUrl, order: 0 }]
                : [{ name: '', url: '', order: 0 }]
    );

    const [movieData, setMovieData] = useState({
        titleBG: initialData?.titleBG || '',
        titleEN: initialData?.titleEN || '',
        slug: initialData?.slug || '',
        description: initialData?.description || '',
        year: initialData?.year || '',
        duration: initialData?.duration || '',
        director: initialData?.director || '',
        cast: initialData?.cast || '',
        posterUrl: initialData?.posterUrl || '',
        rating: initialData?.rating || '',
        isHD: initialData?.isHD ?? true,
        featured: initialData?.featured ?? false,
        published: initialData?.published ?? true,
    });

    useEffect(() => {
        async function fetchCategories() {
            const res = await fetch('/api/admin/categories');
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        }
        fetchCategories();
    }, []);

    const handleScrapeLink = async () => {
        if (!scrapeUrl.trim()) return;
        setTmdbLoading(true);
        try {
            const res = await fetch('/api/admin/scrape', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: scrapeUrl }),
            });
            const data = await res.json();

            if (res.ok) {
                console.log('Scraper Response:', data);
                setMovieData(prev => ({
                    ...prev,
                    ...data, // Overwrite everything found
                    year: data.year || prev.year,
                    duration: data.duration || prev.duration,
                    posterUrl: data.posterUrl || prev.posterUrl,
                    rating: data.rating || prev.rating,
                    slug: data.slug, // Force update slug if data.slug is present, otherwise it will be overwritten by ...data if data.slug is null/undefined
                }));
                setScrapeUrl('');
                toast({ title: 'Готово!', description: 'Данните бяха автоматично попълнени.' });
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            toast({ title: 'Грешка', description: 'Неуспешно извличане от този линк', variant: 'destructive' });
        } finally {
            setTmdbLoading(false);
        }
    };

    const addVideoServer = () => {
        setVideoServers([...videoServers, { name: '', url: '', order: videoServers.length }]);
    };

    const removeVideoServer = (index: number) => {
        setVideoServers(videoServers.filter((_, i) => i !== index));
    };

    const updateVideoServer = (index: number, field: 'name' | 'url', value: string) => {
        const updated = [...videoServers];
        updated[index] = { ...updated[index], [field]: value };
        setVideoServers(updated);
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        // Validate video servers
        const validServers = videoServers.filter(vs => vs.name.trim() && vs.url.trim());
        if (validServers.length === 0) {
            toast({ title: 'Грешка', description: 'Трябва да добавите поне един видео сървър с име и URL', variant: 'destructive' });
            setLoading(false);
            return;
        }

        const payload = {
            ...movieData,
            categories: selectedCategories,
            year: parseInt(movieData.year.toString()),
            duration: movieData.duration ? parseInt(movieData.duration.toString()) : null,
            rating: movieData.rating ? parseFloat(movieData.rating.toString()) : null,
            videoServers: validServers.map((vs, index) => ({
                name: vs.name.trim(),
                url: vs.url.trim(),
                order: index,
            })),
        };

        try {
            const url = isEditing ? `/api/admin/movies/${initialData.id}` : '/api/admin/movies';
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to save movie');

            toast({ title: 'Успех!', description: isEditing ? 'Филмът е обновен' : 'Филмът е добавен' });
            router.push('/admin/movies');
            router.refresh();
        } catch (error: any) {
            toast({ title: 'Грешка', description: error.message, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Free Scraper Section */}
            {!isEditing && (
                <Card className="border-primary/20 bg-primary/5 backdrop-blur shadow-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl">
                            <Sparkles className="h-6 w-6" />
                            Безплатно автоматично попълване
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Пейстни линк от IMDb или TMDB..."
                                    value={scrapeUrl}
                                    onChange={(e) => setScrapeUrl(e.target.value)}
                                    className="pl-10 bg-background border-secondary"
                                />
                            </div>
                            <Button type="button" variant="default" onClick={handleScrapeLink} disabled={tmdbLoading} className="min-w-[120px]">
                                {tmdbLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Извлечи'}
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 italic flex items-center gap-1">
                            <Info className="h-3 w-3" />
                            Системата ще попълни всичко: Заглавия, Описание, Режисьор, Година, Продължителност и IMDb Рейтинг.
                        </p>
                    </CardContent>
                </Card>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Main Info */}
                    <Card className="border-secondary overflow-hidden">
                        <div className="bg-secondary/30 px-6 py-3 border-b border-secondary">
                            <h3 className="font-bold flex items-center gap-2"><Film className="h-4 w-4 text-primary" /> Основна информация</h3>
                        </div>
                        <CardContent className="space-y-4 pt-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Заглавие (BG)</Label>
                                    <Input value={movieData.titleBG} onChange={e => setMovieData({ ...movieData, titleBG: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Заглавие (EN)</Label>
                                    <Input value={movieData.titleEN} onChange={e => setMovieData({ ...movieData, titleEN: e.target.value })} required />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label>Година</Label>
                                    <Input type="number" value={movieData.year} onChange={e => setMovieData({ ...movieData, year: e.target.value })} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>IMDb Рейтинг</Label>
                                    <Input type="number" step="0.1" value={movieData.rating} onChange={e => setMovieData({ ...movieData, rating: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Продълж. (мин)</Label>
                                    <Input type="number" value={movieData.duration} onChange={e => setMovieData({ ...movieData, duration: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Slug (URL)</Label>
                                <Input value={movieData.slug} onChange={e => setMovieData({ ...movieData, slug: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Описание</Label>
                                <Textarea value={movieData.description} onChange={e => setMovieData({ ...movieData, description: e.target.value })} rows={6} className="resize-none" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Metadata & Technical */}
                    <Card className="border-secondary overflow-hidden">
                        <div className="bg-secondary/30 px-6 py-3 border-b border-secondary">
                            <h3 className="font-bold flex items-center gap-2"><Info className="h-4 w-4 text-primary" /> Детайли и Видео</h3>
                        </div>
                        <CardContent className="space-y-4 pt-6">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-primary font-bold flex items-center gap-2">
                                        <Server className="h-4 w-4" />
                                        Видео Сървъри *
                                    </Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addVideoServer}
                                        className="gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Добави сървър
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {videoServers.map((server, index) => (
                                        <div key={index} className="flex gap-2 items-start p-3 border border-secondary rounded-lg bg-secondary/10">
                                            <div className="flex-1 space-y-2">
                                                <Input
                                                    placeholder="Име на сървъра (напр. VSA, BGNET)"
                                                    value={server.name}
                                                    onChange={(e) => updateVideoServer(index, 'name', e.target.value)}
                                                    className="bg-background"
                                                />
                                                <Input
                                                    placeholder="Video URL (Embed)"
                                                    value={server.url}
                                                    onChange={(e) => updateVideoServer(index, 'url', e.target.value)}
                                                    className="bg-background"
                                                />
                                            </div>
                                            {videoServers.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeVideoServer(index)}
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Можете да добавите множество сървъри. Потребителите ще могат да избират между тях.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label>Постер (URL)</Label>
                                <Input value={movieData.posterUrl} onChange={e => setMovieData({ ...movieData, posterUrl: e.target.value })} required />
                                {movieData.posterUrl && (
                                    <div className="mt-2 h-40 w-full rounded-lg overflow-hidden border border-secondary bg-secondary/20">
                                        <img src={movieData.posterUrl} alt="Preview" className="w-full h-full object-contain" />
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label>Режисьор</Label>
                                    <Input value={movieData.director} onChange={e => setMovieData({ ...movieData, director: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Актьорски състав</Label>
                                <Input value={movieData.cast} onChange={e => setMovieData({ ...movieData, cast: e.target.value })} placeholder="Актьор 1, Актьор 2..." />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Categories & Publish */}
                <Card className="border-secondary bg-card/30 backdrop-blur">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                            <div className="space-y-3 flex-1">
                                <Label className="text-lg font-bold">Избери категории</Label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <Button
                                            key={cat.id}
                                            type="button"
                                            variant={selectedCategories.includes(cat.id) ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setSelectedCategories(prev => prev.includes(cat.id) ? prev.filter(i => i !== cat.id) : [...prev, cat.id])}
                                            className="rounded-full"
                                        >
                                            {cat.name}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 min-w-[200px] border-l border-secondary pl-8">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="isHD" className="cursor-pointer">HD Качество</Label>
                                    <input type="checkbox" id="isHD" checked={movieData.isHD} onChange={e => setMovieData({ ...movieData, isHD: e.target.checked })} className="toggle" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="featured" className="cursor-pointer">Препоръчан</Label>
                                    <input type="checkbox" id="featured" checked={movieData.featured} onChange={e => setMovieData({ ...movieData, featured: e.target.checked })} className="toggle" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="published" className="cursor-pointer text-primary font-bold">Публикуван</Label>
                                    <input type="checkbox" id="published" checked={movieData.published} onChange={e => setMovieData({ ...movieData, published: e.target.checked })} className="toggle" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-4 sticky bottom-4 bg-background/80 backdrop-blur p-4 rounded-2xl border border-secondary shadow-2xl z-20">
                    <Button type="button" variant="outline" onClick={() => router.back()} className="px-8">Отказ</Button>
                    <Button type="submit" disabled={loading} className="px-12 shadow-lg shadow-primary/20">
                        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        {loading ? 'Запазване...' : (isEditing ? 'Обнови филма' : 'Добави филма')}
                    </Button>
                </div>
            </form>
        </div>
    );
}
