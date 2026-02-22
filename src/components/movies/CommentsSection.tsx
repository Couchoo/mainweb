'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { bg } from 'date-fns/locale';

interface Comment {
    id: number;
    content: string;
    rating: number | null;
    createdAt: string;
    user: {
        name: string | null;
        image: string | null;
        email: string;
    };
}

interface CommentsSectionProps {
    movieId: number;
}

export function CommentsSection({ movieId }: CommentsSectionProps) {
    const { data: session } = useSession();
    const { toast } = useToast();
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [content, setContent] = useState('');
    const [rating, setRating] = useState<number | null>(null);
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);

    useEffect(() => {
        fetchComments();
    }, [movieId]);

    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/movies/${movieId}/comments`);
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            toast({
                title: 'Необходима е регистрация',
                description: 'Трябва да влезете в профила си, за да оставите коментар.',
                variant: 'destructive',
            });
            return;
        }

        if (!content.trim()) {
            toast({
                title: 'Грешка',
                description: 'Моля, напишете коментар.',
                variant: 'destructive',
            });
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch(`/api/movies/${movieId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, rating }),
            });

            if (res.ok) {
                const newComment = await res.json();
                setComments([newComment, ...comments]);
                setContent('');
                setRating(null);
                toast({
                    title: 'Успех!',
                    description: 'Коментарът ви беше публикуван.',
                });
            } else {
                throw new Error('Failed to post comment');
            }
        } catch (error) {
            toast({
                title: 'Грешка',
                description: 'Неуспешно публикуване на коментара.',
                variant: 'destructive',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const getInitials = (name: string | null, email: string) => {
        if (name) {
            return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        }
        return email[0].toUpperCase();
    };

    const averageRating = comments.length > 0
        ? comments.filter(c => c.rating).reduce((acc, c) => acc + (c.rating || 0), 0) / comments.filter(c => c.rating).length
        : null;

    return (
        <div className="space-y-8">
            {/* Header with stats */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Коментари и ревюта</h2>
                    <span className="text-muted-foreground">({comments.length})</span>
                </div>
                {averageRating && (
                    <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
                        <Star className="h-5 w-5 fill-primary text-primary" />
                        <span className="font-bold text-lg">{averageRating.toFixed(1)}</span>
                        <span className="text-sm text-muted-foreground">/ 10</span>
                    </div>
                )}
            </div>

            {/* Comment form */}
            {session ? (
                <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-secondary/30 rounded-lg border border-secondary">
                    <div className="space-y-2">
                        <Label>Вашата оценка (опционално)</Label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(rating === star ? null : star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(null)}
                                    className="transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={`h-6 w-6 ${
                                            (hoveredRating !== null ? star <= hoveredRating : star <= (rating || 0))
                                                ? 'fill-primary text-primary'
                                                : 'text-muted-foreground'
                                        }`}
                                    />
                                </button>
                            ))}
                            {rating && (
                                <span className="ml-2 text-sm font-medium self-center">{rating}/10</span>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="comment">Вашият коментар</Label>
                        <Textarea
                            id="comment"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Споделете вашето мнение за филма..."
                            rows={4}
                            className="resize-none"
                        />
                    </div>
                    <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                        <Send className="h-4 w-4 mr-2" />
                        {submitting ? 'Публикуване...' : 'Публикувай коментар'}
                    </Button>
                </form>
            ) : (
                <div className="p-6 bg-secondary/30 rounded-lg border border-secondary text-center">
                    <p className="text-muted-foreground mb-4">Влезте в профила си, за да оставите коментар</p>
                    <Button asChild>
                        <a href="/login">Вход</a>
                    </Button>
                </div>
            )}

            {/* Comments list */}
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-8 text-muted-foreground">Зареждане на коментари...</div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        Все още няма коментари. Бъдете първият!
                    </div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="p-6 bg-card rounded-lg border border-secondary space-y-3">
                            <div className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src={comment.user.image || undefined} />
                                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                        {getInitials(comment.user.name, comment.user.email)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold">{comment.user.name || 'Анонимен потребител'}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: bg })}
                                            </p>
                                        </div>
                                        {comment.rating && (
                                            <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                                                <Star className="h-4 w-4 fill-primary text-primary" />
                                                <span className="font-bold text-sm">{comment.rating}/10</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{comment.content}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
