'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export default function RegisterPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            toast({
                title: 'Успех!',
                description: 'Акаунтът е създаден',
            });

            router.push('/login');
        } catch (error: any) {
            toast({
                title: 'Грешка',
                description: error.message || 'Нещо се обърка',
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
                    <CardTitle className="text-2xl">Регистрация</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Име</Label>
                            <Input
                                id="name"
                                name="name"
                                required
                                placeholder="Твоето име"
                            />
                        </div>

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
                                minLength={6}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Регистрация...' : 'Регистрирай се'}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Вече имаш акаунт?{' '}
                            <Link href="/login" className="text-primary hover:underline">
                                Влез
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
