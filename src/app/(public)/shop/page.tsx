'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
    Gem,
    Zap,
    Star,
    Check,
    Crown,
    TrendingUp,
    ShieldCheck,
    Rocket,
    Wallet,
    Gift
} from 'lucide-react';

const COIN_BUNDLES = [
    { id: 'budget', popcorn: 15, price: 0.80, label: 'Бърз пакет', color: 'from-blue-500/20 to-blue-400/20', icon: Zap },
    { id: 'basic', popcorn: 100, price: 5.00, label: 'Стартов пакет', color: 'from-emerald-500/20 to-emerald-400/20', icon: Rocket },
    { id: 'value', popcorn: 250, price: 9.99, label: 'Изгоден пакет', discount: '15%', popular: true, color: 'from-primary/20 to-primary/10', icon: TrendingUp },
    { id: 'popular', popcorn: 600, price: 19.99, label: 'Най-продаван', discount: '20%', color: 'from-purple-500/20 to-purple-400/20', icon: Star },
    { id: 'premium', popcorn: 1500, price: 39.99, label: 'Премиум', discount: '30%', color: 'from-amber-500/20 to-amber-400/20', icon: Gem },
    { id: 'ultimate', popcorn: 2500, price: 49.99, label: 'Кралски пакет', discount: '40%', color: 'from-red-500/20 to-red-400/20', icon: Crown },
];

const VIP_FEATURES = [
    'Гледане без реклами',
    'Ранен достъп до нови филми',
    '4K Ultra HD Качество',
    'Специална златна значка в чата',
    'Приоритетна поддръжка',
    'Безплатни подаръци всеки месец'
];

export default function ShopPage() {
    const { data: session } = useSession();
    const { toast } = useToast();
    const [loading, setLoading] = useState<string | null>(null);

    const handlePurchase = async (bundleId: string) => {
        if (!session) {
            toast({ title: 'Влезте в профила си', description: 'Трябва да сте логнати, за да купувате.', variant: 'destructive' });
            return;
        }

        setLoading(bundleId);
        try {
            const res = await fetch('/api/shop/popcorn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bundleId }),
            });

            if (res.ok) {
                const data = await res.json();
                toast({
                    title: 'Покупката е успеша!',
                    description: `Успешно добавихте ${data.popcornAdded} 🍿 пуканки към баланса си.`,
                });
            } else {
                throw new Error('Transaction failed');
            }
        } catch (error) {
            toast({
                title: 'Грешка при покупка',
                description: 'Моля опитайте отново по-късно.',
                variant: 'destructive',
            });
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] pb-24 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 opacity-50" />
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-amber-500/5 blur-[100px] rounded-full opacity-30" />

            <div className="container relative z-10 pt-20">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                    <Badge variant="outline" className="border-primary/20 text-primary bg-primary/10 px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] italic animate-in fade-in slide-in-from-bottom-4 duration-500">
                        Официален Магазин
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white leading-none animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        Зареди своя <span className="text-primary">опит</span>
                    </h1>
                    <p className="text-muted-foreground text-lg italic animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Избери най-добрия пакет за твоето кино изживяване. VIP статус или пуканки за чата? Ти решаваш.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* VIP SECTION */}
                    <div className="lg:col-span-5 relative group animate-in fade-in slide-in-from-left-12 duration-1000">
                        <div className="absolute -inset-1 bg-gradient-to-br from-amber-400 to-amber-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative bg-zinc-900 border border-white/5 rounded-[2.5rem] p-8 md:p-12 h-full flex flex-col">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <div className="p-3 rounded-2xl bg-amber-400/10 text-amber-400 w-fit mb-4">
                                        <Crown className="w-8 h-8" />
                                    </div>
                                    <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">VIP АБОНАМЕНТ</h2>
                                    <p className="text-amber-400/60 font-black uppercase text-xs tracking-widest mt-1">THE ROYAL EXPERIENCE</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-black text-white">$9.99</p>
                                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">на месец</p>
                                </div>
                            </div>

                            <div className="space-y-5 mb-12 flex-grow">
                                {VIP_FEATURES.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-4 group/item">
                                        <div className="h-6 w-6 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 group-hover/item:bg-amber-400 group-hover/item:text-black transition-all">
                                            <Check className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="text-gray-300 font-medium group-hover/item:text-white transition-colors">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button className="w-full h-16 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-black uppercase italic tracking-widest text-lg shadow-[0_10px_30px_rgba(251,191,36,0.2)] hover:shadow-[0_15px_40px_rgba(251,191,36,0.3)] hover:-translate-y-1 transition-all duration-300">
                                Стани VIP Член
                            </Button>

                            <p className="text-center text-[10px] text-white/20 uppercase font-black tracking-widest mt-6">Откажи по всяко време</p>
                        </div>
                    </div>

                    {/* COINS SECTION */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-12 duration-1000">
                        {COIN_BUNDLES.map((bundle, i) => (
                            <div
                                key={bundle.id}
                                className={`group relative p-6 rounded-[2rem] border border-white/5 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${bundle.popular ? 'bg-primary/5 border-primary/20 md:col-span-2' : 'bg-zinc-900/40 hover:bg-zinc-900'
                                    }`}
                            >
                                {/* Glow Effect */}
                                <div className={`absolute -right-4 -bottom-4 w-32 h-32 bg-gradient-to-br ${bundle.color} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className={`p-3 rounded-2xl ${bundle.popular ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'} transition-colors`}>
                                            <bundle.icon className="w-6 h-6" />
                                        </div>
                                        {bundle.discount && (
                                            <Badge className="bg-primary text-black font-black italic text-[10px] px-3 py-1 rounded-full animate-pulse">
                                                +{bundle.discount} БОНУС
                                            </Badge>
                                        )}
                                        {bundle.popular && (
                                            <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10 uppercase font-black italic tracking-widest">
                                                Най-популярен
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex items-end justify-between gap-4">
                                        <div>
                                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-1 line-clamp-1">{bundle.label}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-3xl font-black text-white">{bundle.popcorn}</span>
                                                <span className="text-primary text-2xl">🍿</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Обща цена</p>
                                            <p className={`text-2xl font-black ${bundle.popular ? 'text-primary' : 'text-white'}`}>
                                                €{bundle.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        disabled={loading === bundle.id}
                                        onClick={() => handlePurchase(bundle.id)}
                                        className={`w-full mt-6 h-12 rounded-xl font-black uppercase italic tracking-[0.15em] transition-all duration-300 ${bundle.popular
                                                ? 'bg-primary text-black hover:bg-white shadow-[0_5px_15px_rgba(var(--primary-rgb),0.2)]'
                                                : 'bg-white/5 text-white hover:bg-primary hover:text-black hover:shadow-[0_5px_15px_rgba(var(--primary-rgb),0.2)] border border-white/5'
                                            }`}
                                    >
                                        {loading === bundle.id ? 'Обработка...' : 'Купи Сега'}
                                    </Button>

                                    <div className="mt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors">
                                        <span>Без такси</span>
                                        <span>Моментална доставка</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Trust Section */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-white/5 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="p-3 rounded-full bg-white/5 border border-white/5">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-black uppercase italic tracking-tighter">Сигурни Плащания</p>
                            <p className="text-xs text-muted-foreground font-medium">Криптирани транзакции чрез Stripe</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="p-3 rounded-full bg-white/5 border border-white/5">
                            <Wallet className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-black uppercase italic tracking-tighter">Гъвкави Методи</p>
                            <p className="text-xs text-muted-foreground font-medium">Карти, Google Pay и други</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-3">
                        <div className="p-3 rounded-full bg-white/5 border border-white/5">
                            <Gift className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-black uppercase italic tracking-tighter">Бонус Системи</p>
                            <p className="text-xs text-muted-foreground font-medium">Печели пуканки чрез активност</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
