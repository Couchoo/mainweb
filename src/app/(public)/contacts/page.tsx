import { headers } from 'next/headers';
import { getTranslation, Locale } from '@/lib/i18n';
import { Mail, MessageSquare, Phone } from 'lucide-react';

export default async function ContactsPage() {
    const headersList = await headers();
    const locale = (headersList.get('x-locale') || 'bg') as Locale;
    const t = (key: any) => getTranslation(key, locale);

    return (
        <div className="min-h-screen bg-brand-midnight text-brand-warmCream pt-32 pb-20">
            <div className="container max-w-4xl">
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-12 bg-gradient-to-r from-brand-cinemaGold to-brand-warmCream bg-clip-text text-transparent">
                    {t('contacts')}
                </h1>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="p-8 rounded-[2.5rem] bg-brand-royalPurple/10 border border-brand-royalPurple/20 backdrop-blur-xl">
                        <div className="w-12 h-12 rounded-2xl bg-brand-royalPurple/20 flex items-center justify-center text-brand-cinemaGold mb-6">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Имейл поддръжка</h3>
                        <p className="text-brand-softLavender mb-4">Пишете ни по всяко време и ще ви отговорим възможно най-скоро.</p>
                        <a href="mailto:info@bktfilters.com" className="text-brand-cinemaGold font-bold text-lg hover:underline">
                            info@bktfilters.com
                        </a>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-brand-royalPurple/10 border border-brand-royalPurple/20 backdrop-blur-xl">
                        <div className="w-12 h-12 rounded-2xl bg-brand-royalPurple/20 flex items-center justify-center text-brand-cinemaGold mb-6">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Чат на живо</h3>
                        <p className="text-brand-softLavender mb-4">Влезте в нашата кинозала за помощ от общността и администраторите.</p>
                        <a href="/cinema" className="inline-flex items-center gap-2 text-brand-cinemaGold font-bold hover:underline">
                            Към Кинозалата →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
