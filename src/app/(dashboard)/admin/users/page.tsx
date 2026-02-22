'use client';

import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Users, Shield, ShieldAlert, UserCheck, UserMinus, Gem } from 'lucide-react';

interface User {
    id: number;
    email: string;
    name: string | null;
    role: string;
    banned: boolean;
    createdAt: string;
}

export default function AdminUsersPage() {
    const { toast } = useToast();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const res = await fetch('/api/admin/users');
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }

    async function updateUser(userId: number, data: any) {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, ...data }),
            });

            if (res.ok) {
                toast({ title: 'Успех', description: 'Потребителят е обновен' });
                fetchUsers();
            }
        } catch (error) {
            toast({ title: 'Грешка', description: 'Неуспешна операция', variant: 'destructive' });
        }
    }

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'ADMIN': return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">ADMIN</Badge>;
            case 'VIP': return <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">VIP</Badge>;
            default: return <Badge variant="secondary">FREE</Badge>;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Users className="h-8 w-8 text-primary" />
                    Управление на потребители
                </h1>
                <p className="text-muted-foreground">Променяйте роли, налагайте ограничения и следете регистрациите.</p>
            </div>

            <Card className="border-secondary bg-card/50">
                <CardHeader>
                    <CardTitle>Списък с потребители</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-secondary hover:bg-transparent text-muted-foreground">
                                <TableHead>Потребител</TableHead>
                                <TableHead>Роля</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead>Регистрация</TableHead>
                                <TableHead className="text-right">Действия</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id} className="border-secondary hover:bg-secondary/10 transition-colors">
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{user.name || 'Няма име'}</span>
                                            <span className="text-xs text-muted-foreground">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                                    <TableCell>
                                        {user.banned ? (
                                            <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                                                <ShieldAlert className="h-3 w-3" /> БАННАТ
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="flex items-center gap-1 w-fit text-green-500 border-green-500/20 bg-green-500/5">
                                                <Shield className="h-3 w-3" /> АКТИВЕН
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {new Date(user.createdAt).toLocaleDateString('bg-BG')}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {user.role === 'FREE' ? (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="hover:text-purple-400"
                                                    onClick={() => updateUser(user.id, { role: 'VIP' })}
                                                >
                                                    <Gem className="h-4 w-4 mr-1" /> Дай VIP
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="hover:text-muted-foreground"
                                                    onClick={() => updateUser(user.id, { role: 'FREE' })}
                                                >
                                                    <UserMinus className="h-4 w-4 mr-1" /> Махни VIP
                                                </Button>
                                            )}

                                            {user.banned ? (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-green-500 hover:bg-green-500/10"
                                                    onClick={() => updateUser(user.id, { banned: false })}
                                                >
                                                    <UserCheck className="h-4 w-4 mr-1" /> Махни Бан
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-destructive hover:bg-destructive/10"
                                                    onClick={() => updateUser(user.id, { banned: true })}
                                                >
                                                    <ShieldAlert className="h-4 w-4 mr-1" /> Банни
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
