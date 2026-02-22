import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { MovieForm } from '@/components/admin/MovieForm';

export default async function EditMoviePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const movie = await prisma.movie.findUnique({
        where: { id: parseInt(id) },
        include: {
            moviecategory: true,
            videoserver: {
                orderBy: { order: 'asc' }
            }
        }
    });

    if (!movie) notFound();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Редактирай филм</h1>
                <p className="text-muted-foreground">Променете информацията за "{movie.titleBG}".</p>
            </div>
            <MovieForm initialData={movie} isEditing={true} />
        </div>
    );
}
