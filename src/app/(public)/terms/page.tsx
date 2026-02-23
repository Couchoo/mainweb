import { headers } from 'next/headers';
import { getTranslation, Locale } from '@/lib/i18n';

export default async function TermsPage() {
    const headersList = await headers();
    const locale = (headersList.get('x-locale') || 'bg') as Locale;
    const t = (key: any) => getTranslation(key, locale);

    return (
        <div className="min-h-screen bg-brand-midnight text-brand-warmCream pt-32 pb-20">
            <div className="container max-w-4xl">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-8 bg-gradient-to-r from-brand-cinemaGold to-brand-warmCream bg-clip-text text-transparent">
                    {t('terms')}
                </h1>
                <div className="prose prose-invert max-w-none space-y-6 text-brand-softLavender">
                    <p>Тази страница е в процес на подготовка. Благодарим ви за търпението.</p>
                    <p>За въпроси относно общите условия, моля свържете се с нас на: <strong>info@bktfilters.com</strong></p>
                </div>
            </div>
        </div>
    );
}
