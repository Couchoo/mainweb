'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
    Upload,
    Search,
    Trash2,
    CheckCircle,
    Film,
    HardDrive,
    Clock,
    X,
    CloudUpload,
    RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';
import { bg } from 'date-fns/locale';

interface Movie {
    id: number;
    titleBG: string;
    titleEN: string;
    year: number;
    posterUrl: string;
    duration?: number;
    cinemaLibrary?: { id: number; videoPath: string; fileSize: number | null; uploadedAt: string } | null;
}

interface LibraryEntry {
    id: number;
    movieId: number;
    videoPath: string;
    fileSize: number | null;
    uploadedAt: string;
    movie: Movie;
}

function formatBytes(bytes: number | null): string {
    if (!bytes) return 'неизвестен размер';
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export default function CinemaLibraryPage() {
    const { toast } = useToast();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [library, setLibrary] = useState<LibraryEntry[]>([]);
    const [search, setSearch] = useState('');
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [dragOver, setDragOver] = useState(false);
    const [loadingMovies, setLoadingMovies] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchMovies();
        fetchLibrary();
    }, []);

    async function fetchMovies() {
        setLoadingMovies(true);
        try {
            const res = await fetch('/api/admin/movies');
            if (res.ok) {
                const data = await res.json();
                setMovies(Array.isArray(data) ? data : (data.movies || []));
            }
        } catch { } finally { setLoadingMovies(false); }
    }

    async function fetchLibrary() {
        try {
            const res = await fetch('/api/admin/cinema/library');
            if (res.ok) setLibrary(await res.json());
        } catch { }
    }

    function getLibraryEntry(movieId: number) {
        return library.find(e => e.movieId === movieId) || null;
    }

    async function handleUpload(file: File) {
        if (!selectedMovie) return;
        if (!file.type.startsWith('video/') && !file.name.endsWith('.mp4')) {
            toast({ title: 'Само MP4 файлове', variant: 'destructive' });
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        // Simulate progress while uploading
        const progressInterval = setInterval(() => {
            setUploadProgress(p => Math.min(p + 2, 90));
        }, 200);

        try {
            const formData = new FormData();
            formData.append('movieId', String(selectedMovie.id));
            formData.append('file', file);

            const res = await fetch('/api/admin/cinema/library/upload', {
                method: 'POST',
                body: formData,
            });

            clearInterval(progressInterval);
            setUploadProgress(100);

            if (res.ok) {
                const data = await res.json();
                toast({ title: '✅ Файлът е качен успешно!', description: `Запазен: ${data.videoPath}` });
                await fetchLibrary();
            } else {
                const err = await res.json();
                throw new Error(err.error);
            }
        } catch (error: any) {
            clearInterval(progressInterval);
            toast({ title: 'Грешка при качване', description: error.message, variant: 'destructive' });
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    }

    async function handleDelete(entry: LibraryEntry) {
        if (!confirm(`Изтриване на файла за "${entry.movie.titleBG}"?`)) return;
        try {
            const res = await fetch(`/api/admin/cinema/library?id=${entry.id}`, { method: 'DELETE' });
            if (res.ok) {
                toast({ title: 'Файлът е изтрит' });
                fetchLibrary();
            }
        } catch { }
    }

    const filteredMovies = movies.filter(m =>
        m.titleBG?.toLowerCase().includes(search.toLowerCase()) ||
        m.titleEN?.toLowerCase().includes(search.toLowerCase())
    );

    const uploadedMovieIds = new Set(library.map(e => e.movieId));

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="container py-10 max-w-7xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-4xl font-black uppercase italic tracking-tighter flex items-center gap-3">
                            <Film className="w-9 h-9 text-primary" />
                            Кино Библиотека
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1 uppercase font-black tracking-widest">
                            Качете MP4 файлове за синхронизирано Live Cinema
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge className="bg-primary/10 text-primary border-primary/20 font-black uppercase">
                            {library.length} качени
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => { fetchMovies(); fetchLibrary(); }}>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Обнови
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* LEFT — Movie Picker */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Търси филм..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="pl-10 bg-zinc-900/60 border-white/10 rounded-xl h-11"
                            />
                        </div>

                        <div className="rounded-[1.5rem] border border-white/5 bg-zinc-900/40 overflow-hidden">
                            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                                <span className="text-xs font-black uppercase tracking-widest text-white/40">Библиотека ({filteredMovies.length})</span>
                            </div>
                            <div className="max-h-[600px] overflow-y-auto divide-y divide-white/5">
                                {loadingMovies ? (
                                    <div className="p-8 text-center">
                                        <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                                    </div>
                                ) : filteredMovies.map(movie => {
                                    const hasFile = uploadedMovieIds.has(movie.id);
                                    const isSelected = selectedMovie?.id === movie.id;
                                    return (
                                        <button
                                            key={movie.id}
                                            onClick={() => setSelectedMovie(movie)}
                                            className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${isSelected ? 'bg-primary/10 border-l-2 border-primary' : 'hover:bg-white/5'}`}
                                        >
                                            <div className="relative w-10 h-14 shrink-0 rounded-lg overflow-hidden bg-zinc-800">
                                                <img src={movie.posterUrl} alt="" className="w-full h-full object-cover" />
                                                {hasFile && (
                                                    <div className="absolute inset-0 bg-emerald-500/60 flex items-center justify-center">
                                                        <CheckCircle className="w-5 h-5 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-black text-sm uppercase italic tracking-tight line-clamp-1">{movie.titleBG}</p>
                                                <p className="text-xs text-white/30 font-bold">{movie.year}</p>
                                            </div>
                                            {hasFile && (
                                                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[9px] font-black uppercase shrink-0">
                                                    ✓ MP4
                                                </Badge>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — Upload Zone */}
                    <div className="lg:col-span-3 space-y-6">
                        {selectedMovie ? (
                            <>
                                {/* Selected movie info */}
                                <div className="rounded-[1.5rem] border border-white/10 bg-zinc-900/40 p-6 flex gap-5 items-start">
                                    <img src={selectedMovie.posterUrl} alt="" className="w-20 h-28 object-cover rounded-xl border border-white/10 shrink-0" />
                                    <div className="flex-1">
                                        <Badge className="mb-2 bg-primary/10 text-primary border-primary/20 text-[10px] font-black uppercase">Избран филм</Badge>
                                        <h2 className="text-2xl font-black uppercase italic tracking-tighter">{selectedMovie.titleBG}</h2>
                                        <p className="text-white/40 text-sm font-bold">{selectedMovie.titleEN} • {selectedMovie.year}</p>
                                        {selectedMovie.duration && (
                                            <p className="text-white/30 text-xs mt-1 flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {selectedMovie.duration} мин
                                            </p>
                                        )}
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setSelectedMovie(null)}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Existing file info */}
                                {(() => {
                                    const entry = getLibraryEntry(selectedMovie.id);
                                    return entry ? (
                                        <div className="rounded-[1.5rem] border border-emerald-500/30 bg-emerald-500/5 p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-xl bg-emerald-500/10">
                                                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-sm">Файлът е качен</p>
                                                        <p className="text-xs text-white/40 font-mono">{entry.videoPath}</p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(entry)}
                                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-1" /> Изтрий
                                                </Button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-xs text-white/50">
                                                <div className="flex items-center gap-2">
                                                    <HardDrive className="w-3.5 h-3.5" />
                                                    <span>{formatBytes(entry.fileSize)}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span>Качен: {format(new Date(entry.uploadedAt), 'dd.MM.yyyy HH:mm')}</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-white/5">
                                                <p className="text-xs text-white/30 mb-3 uppercase font-black tracking-widest">Замени с нов файл</p>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="w-full border-dashed border-white/20 hover:border-primary/50"
                                                >
                                                    <Upload className="w-4 h-4 mr-2" /> Избери нов MP4
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Upload Drop Zone */
                                        <div
                                            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                                            onDragLeave={() => setDragOver(false)}
                                            onDrop={e => {
                                                e.preventDefault();
                                                setDragOver(false);
                                                const file = e.dataTransfer.files[0];
                                                if (file) handleUpload(file);
                                            }}
                                            className={`rounded-[1.5rem] border-2 border-dashed transition-all duration-300 p-12 text-center cursor-pointer ${dragOver ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-white/30 bg-zinc-900/20'}`}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <div className={`p-5 rounded-full w-fit mx-auto mb-6 transition-all ${dragOver ? 'bg-primary/20' : 'bg-white/5'}`}>
                                                <CloudUpload className={`w-12 h-12 ${dragOver ? 'text-primary' : 'text-white/30'}`} />
                                            </div>
                                            <p className="text-xl font-black uppercase italic tracking-tighter mb-2">
                                                {dragOver ? 'Пусни файла тук' : 'Провлачи MP4 тук'}
                                            </p>
                                            <p className="text-white/30 text-sm">или кликни за избор на файл</p>
                                            <p className="text-white/20 text-xs mt-4 uppercase font-black tracking-widest">Само MP4 / WebM / MKV</p>
                                        </div>
                                    );
                                })()}

                                {/* Upload progress */}
                                {uploading && (
                                    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-3">
                                        <div className="flex justify-between text-sm font-bold">
                                            <span>Качване...</span>
                                            <span>{uploadProgress}%</span>
                                        </div>
                                        <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-300"
                                                style={{ width: `${uploadProgress}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-white/40 italic">Моля изчакайте, файловете са по-големи...</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            /* No movie selected */
                            <div className="rounded-[1.5rem] border border-white/5 bg-zinc-900/20 flex flex-col items-center justify-center p-20 text-center h-full min-h-[400px]">
                                <Film className="w-16 h-16 text-white/10 mb-6" />
                                <p className="text-xl font-black uppercase italic tracking-tighter text-white/20">Избери филм от списъка</p>
                                <p className="text-white/10 text-sm mt-2">за да качиш MP4 файл за Live Cinema</p>
                            </div>
                        )}

                        {/* Recently uploaded */}
                        {library.length > 0 && (
                            <div className="rounded-[1.5rem] border border-white/5 bg-zinc-900/40 overflow-hidden">
                                <div className="p-4 border-b border-white/5">
                                    <span className="text-xs font-black uppercase tracking-widest text-white/40">Качени файлове ({library.length})</span>
                                </div>
                                <div className="divide-y divide-white/5 max-h-64 overflow-y-auto">
                                    {library.map(entry => (
                                        <div key={entry.id} className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors">
                                            <img src={entry.movie.posterUrl} alt="" className="w-8 h-11 object-cover rounded-lg border border-white/10 shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-black text-sm italic line-clamp-1">{entry.movie.titleBG}</p>
                                                <p className="text-xs text-white/30 font-mono truncate">{entry.videoPath}</p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="text-xs text-white/30">{formatBytes(entry.fileSize)}</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="w-8 h-8 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 shrink-0"
                                                onClick={() => handleDelete(entry)}
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/x-matroska,.mp4,.webm,.mkv"
                className="hidden"
                onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                    e.target.value = '';
                }}
            />
        </div>
    );
}
