'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast({
                    title: 'Грешка',
                    description: 'Невалиден имейл или парола',
                    variant: 'destructive',
                });
            } else {
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            toast({
                title: 'Грешка',
                description: 'Нещо се обърка',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Вход</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Имейл</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="твоят@имейл.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Парола</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Влизане...' : 'Вход'}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Нямаш акаунт?{' '}
                            <Link href="/register" className="text-primary hover:underline">
                                Регистрирай се
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
