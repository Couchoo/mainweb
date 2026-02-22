import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { headers } from 'next/headers';
import { Locale } from '@/lib/i18n';

export default async function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const headersList = await headers();
    const locale = (headersList.get('x-locale') || 'bg') as Locale;

    return (
        <div className="flex min-h-screen flex-col">
            <Header locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} />
        </div>
    );
}
