'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


import { getTranslation, Locale, TranslationKey } from '@/lib/i18n';

interface Comment {
    id: number;
    content: string;
    rating: number | null;
    createdAt: string;
    user: {
        name: string | null;
        image: string | null;
        email: string;
        role: string;
    };
    replies?: Comment[];
    likes?: { userId: string }[];
    _count: {
        likes: number;
        replies: number;
    };
}

export function MovieComments({ movieId, locale }: { movieId: number, locale: Locale }) {
    const { data: session } = useSession();
    const { toast } = useToast();
    const t = (key: TranslationKey) => getTranslation(key, locale);

    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyContent, setReplyContent] = useState('');

    const fetchComments = useCallback(async () => {
        const res = await fetch(`/api/movies/${movieId}/comments`);
        if (res.ok) {
            const data = await res.json();
            setComments(data);
        }
    }, [movieId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    async function handleSubmit(e: React.FormEvent, parentId: number | null = null) {
        e.preventDefault();
        const content = parentId ? replyContent : newComment;
        if (!session || !session.user) {
            toast({
                title: t('login_required') || 'Влезте в профила си',
                description: t('login_to_comment') || 'Трябва да сте влезли, за да коментирате.',
                variant: 'destructive'
            });
            return;
        }
        if (!content.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/movies/${movieId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content,
                    rating: parentId ? null : (rating > 0 ? rating : null),
                    parentId
                }),
            });

            if (res.ok) {
                if (parentId) {
                    setReplyContent('');
                    setReplyingTo(null);
                } else {
                    setNewComment('');
                    setRating(0);
                }
                fetchComments();
                toast({
                    title: t('comment_added_thanks') || 'Благодарим!',
                    description: parentId
                        ? (t('reply_added_success') || 'Вашият отговор беше добавен.')
                        : (t('comment_added_success') || 'Вашият коментар беше добавен.')
                });
            }
        } catch {
            toast({
                title: t('error') || 'Грешка',
                description: t('operation_failed') || 'Неуспешна операция.',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    }

    async function handleLike(commentId: number) {
        if (!session) {
            toast({
                title: t('login_required') || 'Влезте в профила си',
                description: t('login_to_like_comment') || 'Трябва да сте влезли, за да харесвате коментари.'
            });
            return;
        }

        try {
            const res = await fetch(`/api/comments/${commentId}/like`, { method: 'POST' });
            if (res.ok) {
                fetchComments(); // Refresh state
            }
        } catch {
            console.error('Like error');
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <MessageSquare className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                    {t('reviews_comments') || 'Ревюта & Коментари'}
                </h2>
            </div>

            {session ? (
                <form onSubmit={(e) => handleSubmit(e)} className="bg-secondary/20 p-6 rounded-2xl border border-secondary/50 space-y-4 shadow-xl">
                    <div className="flex gap-4">
                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                            <AvatarImage src={session.user?.image || undefined} />
                            <AvatarFallback className="bg-primary/20 text-primary font-bold">
                                {session.user?.email?.[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-muted-foreground uppercase font-black tracking-widest">
                                    {t('rate_movie') || 'Оцени филма:'}
                                </span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={`h-6 w-6 transition-all duration-300 transform hover:scale-125 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground hover:text-yellow-500/50'}`}
                                        >
                                            <Star className="h-4 w-4" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <Textarea
                                placeholder={t('write_opinion') || "Напишете вашето мнение тук..."}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="bg-background/50 border-secondary focus:border-primary transition-all min-h-[100px] rounded-xl resize-none"
                            />
                            <div className="flex justify-end">
                                <Button disabled={loading || !newComment.trim()} className="gap-2 rounded-xl px-8 font-black uppercase italic shadow-lg shadow-primary/20">
                                    {loading ? (t('sending') || 'Изпращане...') : <><Send className="h-4 w-4" />{t('publish') || 'Публикувай'}</>}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="bg-secondary/10 p-8 rounded-2xl border border-dashed border-secondary/50 text-center backdrop-blur-sm">
                    <p className="text-muted-foreground italic font-medium">
                        {t('login_to_review') || 'Трябва да влезете в профила си, за да оставите ревю.'}
                    </p>
                </div>
            )}

            <div className="space-y-6">
                {comments.map((comment) => (
                    <div key={comment.id} className="space-y-4">
                        <div className="flex gap-4 p-6 rounded-3xl bg-secondary/10 border border-secondary/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300">
                            <Avatar className="h-12 w-12 border-2 border-secondary/50">
                                <AvatarImage src={comment.user.image || undefined} />
                                <AvatarFallback className="bg-secondary text-muted-foreground font-bold">
                                    {comment.user.email?.[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="font-black text-white uppercase tracking-tight">{comment.user.name || t('user') || 'Потребител'}</span>
                                        {['VIP', 'ADMIN', 'SUPER_ADMIN'].includes(comment.user.role) && (
                                            <Badge className="bg-primary/20 text-primary border-primary/20 text-[9px] uppercase font-black px-1.5 py-0">
                                                {comment.user.role}
                                            </Badge>
                                        )}
                                        {comment.rating && (
                                            <Badge variant="outline" className="text-yellow-500 border-yellow-500/30 bg-yellow-500/5 px-2 py-0 font-bold italic">
                                                ⭐ {comment.rating}/10
                                            </Badge>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest bg-secondary/20 px-2 py-1 rounded-lg">
                                        {new Date(comment.createdAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'bg-BG')}
                                    </span>
                                </div>
                                <p className="text-muted-foreground leading-relaxed text-sm font-medium">{comment.content}</p>

                                <div className="flex items-center gap-6 pt-2">
                                    <button
                                        onClick={() => handleLike(comment.id)}
                                        className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-tighter transition-all hover:scale-110 ${comment.likes?.length ? 'text-primary' : 'text-muted-foreground hover:text-white'}`}
                                    >
                                        <Star className={`h-4 w-4 ${comment.likes?.length ? 'fill-primary' : ''}`} />
                                        {comment._count.likes} {t('likes') || 'Харесвания'}
                                    </button>
                                    <button
                                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                        className="flex items-center gap-1.5 text-xs text-muted-foreground font-black uppercase tracking-tighter hover:text-white transition-colors"
                                    >
                                        <MessageSquare className="h-4 w-4" />
                                        {replyingTo === comment.id ? (t('cancel') || 'Отказ') : (t('reply') || 'Отговори')}
                                    </button>
                                </div>

                                {replyingTo === comment.id && (
                                    <form onSubmit={(e) => handleSubmit(e, comment.id)} className="mt-4 animate-in slide-in-from-top-2 duration-300">
                                        <Textarea
                                            placeholder={t('write_reply') || "Напишете вашия отговор..."}
                                            value={replyContent}
                                            onChange={(e) => setReplyContent(e.target.value)}
                                            className="bg-background/50 border-secondary focus:border-primary transition-all min-h-[80px] rounded-xl text-sm"
                                        />
                                        <div className="flex justify-end mt-2">
                                            <Button size="sm" disabled={loading || !replyContent.trim()} className="rounded-lg px-6">
                                                {loading ? (t('sending') || 'Изпращане...') : (t('publish_reply') || 'Публикувай отговор')}
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                            <div className="ml-12 space-y-4 border-l-2 border-secondary/30 pl-6">
                                {comment.replies.map((reply) => (
                                    <div key={reply.id} className="flex gap-3 p-4 rounded-2xl bg-secondary/5 border border-secondary/30 animate-in fade-in slide-in-from-left-2 duration-500">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={reply.user.image || undefined} />
                                            <AvatarFallback className="bg-secondary text-muted-foreground text-xs">
                                                {reply.user.email?.[0].toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-white text-xs uppercase">{reply.user.name || t('user') || 'Потребител'}</span>
                                                    {['VIP', 'ADMIN', 'SUPER_ADMIN'].includes(reply.user.role) && (
                                                        <Badge className="bg-primary/10 text-primary border-primary/20 text-[8px] uppercase px-1 py-0">
                                                            {reply.user.role}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground text-xs leading-relaxed font-medium">{reply.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {comments.length === 0 && (
                    <div className="text-center py-20 bg-secondary/5 border border-dashed border-secondary rounded-3xl">
                        <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-muted-foreground italic text-lg font-medium">
                            {t('no_comments_yet') || 'Все още няма коментари. Бъдете първият!'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
