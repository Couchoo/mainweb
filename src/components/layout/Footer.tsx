import { getTranslation, Locale } from '@/lib/i18n';
import Link from 'next/link';

interface FooterProps {
    locale?: Locale;
}

export function Footer({ locale = 'bg' }: FooterProps) {
    const t = (key: any) => getTranslation(key, locale);

    return (
        <footer className="border-t border-brand-royalPurple/20 bg-brand-midnight py-12 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-royalPurple/5 rounded-full blur-3xl" />

            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8">
                    {/* Brand Section */}
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <Link href="/" className="flex items-center gap-2 group">
                            <img src="/brand/couchoo-icon-64.png" className="h-8 w-8 object-contain transition-transform group-hover:rotate-12" alt="Couchoo" />
                            <img src="/brand/couchoo-logo-navbar.png" className="h-6 w-auto" alt="Couchoo" />
                        </Link>
                        <p className="text-[12px] text-brand-softLavender font-medium italic max-w-[200px] text-center md:text-left">
                            "Твоето кино. Твоят диван. Твоят най-добър приятел Chouchoo."
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="flex flex-col items-center md:items-end gap-4">
                        <nav className="flex items-center gap-6 text-[13px] font-display tracking-widest uppercase text-brand-warmCream/60">
                            <Link href="/terms" className="hover:text-brand-cinemaGold transition-colors">{t('terms')}</Link>
                            <Link href="/privacy" className="hover:text-brand-cinemaGold transition-colors">{t('privacy')}</Link>
                            <Link href="/contacts" className="hover:text-brand-cinemaGold transition-colors">{t('contacts')}</Link>
                        </nav>

                        <div className="flex items-center gap-4">
                            <p className="text-[11px] text-brand-softLavender font-display tracking-widest uppercase opacity-50">
                                &copy; {new Date().getFullYear()} COUCHOO. {t('allRightsReserved')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom line */}
                <div className="pt-8 border-t border-brand-royalPurple/10 text-center">
                    <p className="text-[10px] text-brand-softLavender/30 font-display tracking-[0.5em] uppercase">
                        Your Cinema. Your Couch. Your Chouchoo.
                    </p>
                </div>
            </div>
        </footer>
    );
}

