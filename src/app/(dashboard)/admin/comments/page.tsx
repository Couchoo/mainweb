import { prisma } from '@/lib/db';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, MessageSquare, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DeleteCommentButton } from '@/components/admin/DeleteCommentButton';

async function getComments() {
    return await prisma.comment.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            user: {
                select: { name: true, email: true }
            },
            movie: {
                select: { titleBG: true }
            }
        }
    });
}

export default async function AdminCommentsPage() {
    const comments = await getComments();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <MessageSquare className="h-8 w-8 text-primary" />
                    Модерация на коментари
                </h1>
                <p className="text-muted-foreground">Тук можете да преглеждате и изтривате потребителски коментари и ревюта.</p>
            </div>

            <div className="bg-card border border-secondary rounded-xl overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-secondary">
                            <TableHead className="w-[200px]">Потребител</TableHead>
                            <TableHead>Филм</TableHead>
                            <TableHead>Коментар</TableHead>
                            <TableHead className="w-[100px]">Рейтинг</TableHead>
                            <TableHead className="w-[150px]">Дата</TableHead>
                            <TableHead className="text-right">Действие</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <TableRow key={comment.id} className="border-secondary hover:bg-secondary/20 transition-colors">
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold">{comment.user.name || 'Няма име'}</span>
                                            <span className="text-xs text-muted-foreground">{comment.user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-primary">
                                        {comment.movie.titleBG}
                                    </TableCell>
                                    <TableCell className="max-w-md">
                                        <p className="line-clamp-2 text-sm text-balance leading-relaxed">
                                            {comment.content}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        {comment.rating ? (
                                            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-none gap-1">
                                                <Star className="h-3 w-3 fill-yellow-500" />
                                                {comment.rating}
                                            </Badge>
                                        ) : (
                                            <span className="text-muted-foreground text-xs italic">Няма</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {new Date(comment.createdAt).toLocaleDateString('bg-BG', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DeleteCommentButton id={comment.id} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground italic">
                                    Няма намерени коментари.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
