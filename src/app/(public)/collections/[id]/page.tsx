'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MovieCard } from '@/components/movies/MovieCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Loader2, Users } from 'lucide-react';

export default function PublicCollectionViewPage() {
    const params = useParams();
    const id = params.id;
    const [collection, setCollection] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            fetchCollection();
        }
    }, [id]);

    async function fetchCollection() {
        try {
            const res = await fetch(`/api/collections/${id}`);
            if (res.ok) {
                const data = await res.json();
                setCollection(data);
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="container py-20 text-center">
                <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
                <p className="mt-4 text-muted-foreground uppercase font-black tracking-widest italic animate-pulse">Зареждане на колекция...</p>
            </div>
        );
    }

    if (error || !collection) {
        return (
            <div className="container py-20 text-center">
                <FolderOpen className="h-20 w-20 mx-auto text-muted-foreground opacity-20 mb-6" />
                <h1 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Колекцията не е намерена</h1>
                <p className="text-muted-foreground italic">Тази колекция може да е частна или вече да не съществува.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20">
            {/* Header Section */}
            <div className="relative py-20 bg-gradient-to-b from-secondary/10 to-transparent border-b border-white/5 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full -mt-40 opacity-50" />

                <div className="container relative z-10 flex flex-col items-center text-center">
                    <Badge variant="outline" className="mb-6 border-primary/20 text-primary bg-primary/10 px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] italic">
                        Публична Колекция
                    </Badge>

                    <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40 leading-none">
                        {collection.name}
                    </h1>

                    <div className="flex flex-col items-center gap-4 p-6 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-md shadow-2xl">
                        <Avatar className="h-20 w-20 border-4 border-[#050505] ring-2 ring-primary/20 shadow-2xl">
                            <AvatarImage src={collection.user?.image} />
                            <AvatarFallback className="bg-primary/10 text-primary uppercase text-2xl font-black">
                                {collection.user?.name?.[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Куратор</p>
                            <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 uppercase">
                                {collection.user?.name || 'Потребител'}
                            </p>
                        </div>
                        <div className="pt-4 border-t border-white/5 w-full flex items-center justify-center gap-6 mt-4">
                            <div className="text-center">
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Филми</p>
                                <p className="text-lg font-black italic">{collection.movies.length}</p>
                            </div>
                            <div className="w-[1px] h-8 bg-white/5 self-end mb-1" />
                            <div className="text-center">
                                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Вид</p>
                                <p className="text-lg font-black italic uppercase tracking-tighter text-primary">Playlist</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Movies Grid */}
            <div className="container mt-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                    {collection.movies.map((item: any) => (
                        <MovieCard key={item.movie.id} movie={item.movie} />
                    ))}
                </div>

                {collection.movies.length === 0 && (
                    <div className="py-20 text-center bg-secondary/5 border border-dashed border-secondary rounded-[3rem]">
                        <p className="text-muted-foreground italic">Тази колекция все още е празна.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
