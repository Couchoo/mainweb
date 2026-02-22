'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Gem, Zap, Shield, Crown, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getTranslation, Locale } from '@/lib/i18n';
import { useEffect } from 'react';

export default function VipPage() {
    const { data: session } = useSession();
    const { toast } = useToast();
    const [loading, setLoading] = useState<string | null>(null);
    const [locale, setLocale] = useState<Locale>('bg');
    const t = (key: any) => getTranslation(key, locale);

    useEffect(() => {
        const lang = document.cookie.split('; ').find(row => row.startsWith('NEXT_LOCALE='))?.split('=')[1];
        if (lang === 'en' || lang === 'bg') {
            setLocale(lang as Locale);
        }
    }, []);

    const handleSubscribe = async (plan: string) => {
        setLoading(plan);
        try {
            // Placeholder for Stripe checkout
            // We check if Stripe is configured on the client side or via API
            const response = await fetch('/api/billing/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan }),
            });

            if (response.ok) {
                const { url } = await response.json();
                if (url) {
                    window.location.href = url;
                } else {
                    toast({
                        title: "Coming Soon",
                        description: "Payment integration is being finalized. Please check back later!",
                    });
                }
            } else {
                toast({
                    title: "Coming Soon",
                    description: "Payment integration is being finalized. Please check back later!",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setLoading(null);
        }
    };

    const benefits = [
        { icon: Shield, title: "No Ads", desc: "Enjoy a completely ad-free experience across the entire platform." },
        { icon: Crown, title: "VIP Servers", desc: "Access to high-speed, 4K streaming servers for a buffer-free experience." },
        { icon: Zap, title: "Early Access", desc: "Be the first to watch the latest releases before they go public." },
        { icon: CreditCard, title: "Priority Support", desc: "Direct line to our support team for any issues or requests." },
    ];

    const plans = [
        {
            id: 'monthly',
            name: 'Monthly VIP',
            price: '9.99',
            period: '/mo',
            features: ['No Ads', 'HD/4K Servers', 'Unlimited History', 'Priority Support'],
            popular: false
        },
        {
            id: 'yearly',
            name: 'Yearly VIP',
            price: '89.99',
            period: '/year',
            features: ['Everything in Monthly', '2 Months Free', 'VIP Badge', 'Early Features'],
            popular: true,
            saving: 'save 25%'
        }
    ];

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
                <div className="container relative z-10 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-bold uppercase tracking-wider animate-bounce">
                        <Gem className="h-4 w-4" />
                        Ultimate Experience
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-white">
                        Upgrade to <span className="text-primary">VIP</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl">
                        Unlock premium features, remove ads, and support the platform. Get the best streaming experience today.
                    </p>
                </div>
            </div>

            {/* Benefits Grid */}
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-secondary/20 border border-secondary/50 hover:bg-secondary/30 transition-colors space-y-4 group">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <benefit.icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
                            <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pricing Section */}
            <div className="container py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan) => (
                        <Card key={plan.id} className={`relative border-2 overflow-hidden bg-card/50 backdrop-blur rounded-[2.5rem] ${plan.popular ? 'border-primary shadow-2xl shadow-primary/20 scale-105 z-10' : 'border-secondary'}`}>
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-primary text-black px-6 py-1 font-black text-xs uppercase tracking-widest rounded-bl-3xl">
                                    Best Value
                                </div>
                            )}
                            <CardHeader className="text-center pt-10">
                                <CardTitle className="text-2xl font-black uppercase italic tracking-tight">{plan.name}</CardTitle>
                                <div className="mt-4 flex items-justify-center items-baseline gap-1">
                                    <span className="text-5xl font-black text-white">${plan.price}</span>
                                    <span className="text-muted-foreground font-bold">{plan.period}</span>
                                </div>
                                {plan.saving && (
                                    <span className="text-xs font-bold text-green-400 uppercase tracking-widest mt-2 block">{plan.saving}</span>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-4 py-8">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <Check className="h-3 w-3 text-green-500" />
                                        </div>
                                        <span className="text-sm text-muted-foreground font-medium">{feature}</span>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter className="pb-10 px-8">
                                <Button
                                    className={`w-full h-14 rounded-2xl font-black uppercase italic text-lg ${plan.popular ? 'bg-primary text-black hover:bg-primary/90' : 'bg-secondary text-white hover:bg-secondary/80'}`}
                                    onClick={() => handleSubscribe(plan.id)}
                                    disabled={loading !== null}
                                >
                                    {loading === plan.id ? 'Processing...' : 'Start VIP Now'}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Support Message */}
            <div className="container text-center pt-12">
                <p className="text-sm text-muted-foreground italic">
                    All payments are secure and encrypted. Cancel any time from your profile.
                </p>
            </div>
        </div>
    );
}
