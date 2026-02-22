import { requireAdmin } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    Film,
    Tag,
    Users,
    BarChart3,
    ArrowLeft,
    MessageSquare,
    Zap,
    Wrench
} from 'lucide-react';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    try {
        await requireAdmin();
    } catch {
        redirect('/login');
    }

    const navItems = [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { label: 'Филми', href: '/admin/movies', icon: Film },
        { label: 'Категории', href: '/admin/categories', icon: Tag },
        { label: 'Потребители', href: '/admin/users', icon: Users },
        { label: 'Коментари', href: '/admin/comments', icon: MessageSquare },
        { label: 'Статистика', href: '/admin/analytics', icon: BarChart3 },
        { label: 'Management', href: '/admin/management', icon: Wrench },
    ];

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-64 border-r border-secondary bg-card p-6 flex flex-col fixed h-full">
                <div className="mb-10 px-2">
                    <h2 className="text-2xl font-black tracking-tighter text-primary">Admin Panel</h2>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mt-1">Management Console</p>
                </div>

                <nav className="space-y-1 flex-1">
                    {navItems.map((item) => (
                        <Button
                            key={item.href}
                            asChild
                            variant="ghost"
                            className="w-full justify-start hover:bg-secondary group"
                        >
                            <Link href={item.href}>
                                <item.icon className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                {item.label}
                            </Link>
                        </Button>
                    ))}
                </nav>

                <div className="pt-6 border-t border-secondary">
                    <Button asChild variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                        <Link href="/">
                            <ArrowLeft className="mr-3 h-5 w-5" />
                            Към сайта
                        </Link>
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 pl-64">
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
