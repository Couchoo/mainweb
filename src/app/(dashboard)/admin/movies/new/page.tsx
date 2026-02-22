import { MovieForm } from '@/components/admin/MovieForm';

export default function NewMoviePage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Добави нов филм</h1>
                <p className="text-muted-foreground">Попълнете формата, за да добавите ново заглавие в каталога.</p>
            </div>
            <MovieForm />
        </div>
    );
}
