'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export function DeleteCommentButton({ id }: { id: number }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    async function handleDelete() {
        if (!confirm('Сигурни ли сте, че искате да изтриете този коментар?')) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/admin/comments/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                toast({ title: 'Изтрито!', description: 'Коментарът беше премахнат успешно.' });
                router.refresh();
            } else {
                toast({
                    title: 'Грешка',
                    description: 'Неуспешно изтриване на коментара.',
                    variant: 'destructive'
                });
            }
        } catch (error) {
            toast({
                title: 'Грешка',
                description: 'Възникна неочаквана грешка.',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={loading}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    );
}
