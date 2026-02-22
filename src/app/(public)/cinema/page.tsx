import { headers } from 'next/headers';
import { Locale } from '@/lib/i18n';
import { CinemaClient } from './CinemaClient';

export default async function CinemaPage() {
    const headersList = await headers();
    const locale = (headersList.get('x-locale') || 'bg') as Locale;

    return <CinemaClient locale={locale} />;
}
