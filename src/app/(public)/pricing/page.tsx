'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Gem, X, Star } from 'lucide-react';
import { useState } from 'react';
import { Locale } from '@/lib/i18n';

export default function PricingPage() {
    const localeSelection = 'bg'; // Fallback
    const locale = localeSelection as Locale;
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        if (!session) {
            window.location.href = '/login';
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
            });

            const { url } = await res.json();
            if (url) {
                window.location.href = url;
            }
        } catch (error) {
            console.error('Checkout error:', error);
        } finally {
            setLoading(false);
        }
    };

    const role = (session?.user as any)?.role;
    const isVIP = role === 'VIP' || role === 'ADMIN' || role === 'SUPER_ADMIN';

    return (
        <div className="relative min-h-screen">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-royalPurple/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-cinemaGold/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="container py-24 relative">
                <div className="max-w-4xl mx-auto text-center space-y-6 mb-20">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <img src="/brand/couchoo-icon-64.png" className="h-16 w-16 object-contain" alt="Couchoo" />
                            <div className="absolute inset-0 bg-brand-cinemaGold/20 blur-2xl rounded-full -z-10 animate-pulse" />
                        </div>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display tracking-widest uppercase text-brand-warmCream mb-2">
                        {locale === 'en' ? 'Choose Your Experience' : 'Избери своето преживяване'}
                    </h1>
                    <p className="text-xl font-display tracking-widest text-brand-softLavender uppercase max-w-2xl mx-auto">
                        {locale === 'en'
                            ? 'Pure cinematic joy, from your couch to your screen.'
                            : 'Чисто кино удоволствие, от твоя диван до твоя екран.'}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto px-4">
                    {/* Free Plan */}
                    <Card className="flex flex-col border-brand-royalPurple/20 bg-brand-deepNight/40 backdrop-blur-xl transition-all hover:border-brand-royalPurple/40 rounded-[3rem] overflow-hidden group">
                        <CardHeader className="text-center pb-12 border-b border-brand-royalPurple/10 pt-12">
                            <span className="text-xs font-display tracking-[0.4em] uppercase text-brand-softLavender/60 mb-2 block">
                                {locale === 'en' ? 'Basic' : 'Базов'}
                            </span>
                            <CardTitle className="text-4xl font-display tracking-widest uppercase text-brand-warmCream">
                                {locale === 'en' ? 'Standard' : 'Стандартен'}
                            </CardTitle>
                            <div className="mt-6 flex items-baseline justify-center gap-1">
                                <span className="text-6xl font-display text-brand-warmCream">€0</span>
                                <span className="text-brand-softLavender/40 font-display tracking-widest uppercase text-lg">/mo</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-10 space-y-12">
                            <ul className="space-y-5">
                                <li className="flex items-center gap-4 text-brand-warmCream/80 uppercase font-display tracking-widest text-sm">
                                    <Check className="h-5 w-5 text-brand-softLavender shrink-0" />
                                    <span>{locale === 'en' ? 'Access to all movies' : 'Достъп до всички филми'}</span>
                                </li>
                                <li className="flex items-center gap-4 text-brand-warmCream/80 uppercase font-display tracking-widest text-sm">
                                    <Check className="h-5 w-5 text-brand-softLavender shrink-0" />
                                    <span>HD Quality</span>
                                </li>
                                <li className="flex items-center gap-4 text-brand-softLavender/30 uppercase font-display tracking-widest text-sm italic">
                                    <X className="h-5 w-5 shrink-0" />
                                    <span>{locale === 'en' ? 'Ads included' : 'Включени реклами'}</span>
                                </li>
                            </ul>
                            <Button
                                variant="outline"
                                className="w-full h-14 rounded-2xl border-brand-royalPurple/20 bg-transparent hover:bg-brand-royalPurple/10 text-brand-warmCream font-display tracking-[0.2em] uppercase text-sm transition-all"
                                disabled={!session}
                            >
                                {session ? (locale === 'en' ? 'Current Plan' : 'Текущ план') : (locale === 'en' ? 'Join Now' : 'Присъедини се')}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* VIP Plan */}
                    <Card className="flex flex-col border-brand-cinemaGold bg-brand-midnight shadow-[0_0_80px_rgba(240,192,64,0.15)] relative overflow-hidden transition-all hover:scale-[1.02] rounded-[3rem] group">
                        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-brand-cinemaGold to-transparent" />

                        <div className="absolute top-8 right-8">
                            <div className="px-4 py-1.5 rounded-full bg-brand-cinemaGold/10 border border-brand-cinemaGold/20 flex items-center gap-2">
                                <Star className="w-3 h-3 text-brand-cinemaGold fill-brand-cinemaGold" />
                                <span className="text-[10px] font-display tracking-[0.2em] uppercase text-brand-cinemaGold">VIP Choice</span>
                            </div>
                        </div>

                        <CardHeader className="text-center pb-12 border-b border-brand-cinemaGold/10 pt-12">
                            <div className="flex justify-center mb-4">
                                <div className="p-4 rounded-full bg-brand-cinemaGold/5 border border-brand-cinemaGold/10 group-hover:scale-110 transition-transform duration-500">
                                    <Gem className="h-8 w-8 text-brand-cinemaGold" />
                                </div>
                            </div>
                            <CardTitle className="text-5xl font-display tracking-[0.2em] uppercase text-brand-cinemaGold">
                                Couchoo VIP
                            </CardTitle>
                            <div className="mt-6 flex items-baseline justify-center gap-1">
                                <span className="text-7xl font-display text-brand-cinemaGold drop-shadow-[0_0_15px_rgba(240,192,64,0.3)]">€4</span>
                                <span className="text-brand-softLavender/40 font-display tracking-widest uppercase text-lg">/mo</span>
                            </div>
                        </CardHeader>

                        <CardContent className="flex-1 p-10 space-y-12">
                            <ul className="space-y-5">
                                <li className="flex items-center gap-4 text-brand-cinemaGold uppercase font-display tracking-widest text-sm">
                                    <Star className="h-5 w-5 fill-brand-cinemaGold shrink-0" />
                                    <span className="font-bold">{locale === 'en' ? 'Zero Commercials' : 'БЕЗ всякакви реклами'}</span>
                                </li>
                                <li className="flex items-center gap-4 text-brand-warmCream/90 uppercase font-display tracking-widest text-sm">
                                    <Check className="h-5 w-5 text-brand-cinemaGold shrink-0" />
                                    <span>{locale === 'en' ? 'Early access to releases' : 'Ранен достъп до нови заглавия'}</span>
                                </li>
                                <li className="flex items-center gap-4 text-brand-warmCream/90 uppercase font-display tracking-widest text-sm">
                                    <Check className="h-5 w-5 text-brand-cinemaGold shrink-0" />
                                    <span>{locale === 'en' ? 'Ultra HD 4K Quality' : 'Ultra HD 4K качество'}</span>
                                </li>
                                <li className="flex items-center gap-4 text-brand-warmCream/90 uppercase font-display tracking-widest text-sm">
                                    <Check className="h-5 w-5 text-brand-cinemaGold shrink-0" />
                                    <span>{locale === 'en' ? 'Priority 24/7 Support' : 'Приоритетна 24/7 поддръжка'}</span>
                                </li>
                            </ul>

                            <Button
                                className="w-full h-16 rounded-2xl bg-brand-cinemaGold hover:bg-brand-deepGold text-brand-midnight font-display tracking-[0.3em] uppercase text-lg shadow-[0_15px_30px_rgba(240,192,64,0.3)] transition-all hover:-translate-y-1"
                                onClick={handleSubscribe}
                                disabled={loading || isVIP}
                            >
                                {isVIP ? (locale === 'en' ? 'Active Membership' : 'Активен член') : (loading ? '...' : (locale === 'en' ? 'Go VIP' : 'Стани VIP'))}
                            </Button>

                            <p className="text-center text-[10px] font-display tracking-widest uppercase text-brand-softLavender/30">
                                {locale === 'en' ? 'Cancel anytime. No hidden fees.' : 'Откажи по всяко време. Без такси.'}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* FAQ Hint */}
                <div className="mt-24 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-brand-deepNight/40 border border-brand-royalPurple/20 backdrop-blur-xl">
                        <img src="/brand/couchoo-mascot-transparent.png" className="w-8 h-8 opacity-40 invert" alt="" />
                        <span className="text-[11px] font-display tracking-widest uppercase text-brand-softLavender">
                            {locale === 'en' ? 'Need help? Chouchoo is here for you!' : 'Нужда от помощ? Chouchoo е тук за теб!'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
