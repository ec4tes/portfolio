'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import MagneticLink from './MagneticLink';

const sections = ['about', 'stack', 'projects', 'experience', 'contact'] as const;

export default function Navbar() {
    const t = useTranslations('nav');
    const router = useRouter();
    const pathname = usePathname();

    const currentLocale = pathname.startsWith('/tr') ? 'tr' : 'en';

    const toggleLocale = () => {
        const newLocale = currentLocale === 'en' ? 'tr' : 'en';
        const pathWithoutLocale = pathname.replace(/^\/(en|tr)/, '') || '/';
        router.push(`/${newLocale}${pathWithoutLocale}`);
    };

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[var(--color-bg)]/80"
            style={{
                boxShadow: '0 4px 30px rgba(0,0,0,0.5), 0 1px 0 rgba(0,0,0,0.8)',
            }}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <MagneticLink
                    href="#"
                    className="text-lg font-bold tracking-tight hover:text-[var(--color-cyan)]"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <span className="gradient-text font-black"> &gt; ecates</span>
                </MagneticLink>

                {/* Nav links (hidden on small screens) */}
                <div className="hidden md:flex items-center gap-6">
                    {sections.map((section) => (
                        <button
                            key={section}
                            onClick={() => scrollTo(section)}
                            className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)] relative group"
                        >
                            {t(section)}
                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-cyan)] transition-all duration-300 group-hover:w-full" />
                        </button>
                    ))}
                </div>

                {/* Language toggle */}
                <button
                    onClick={toggleLocale}
                    className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-xs font-medium transition-all hover:border-[var(--color-cyan)]/40 hover:shadow-[0_0_15px_rgba(0,209,255,0.15)]"
                >
                    <span className={currentLocale === 'en' ? 'text-[var(--color-cyan)]' : 'text-[var(--color-muted)]'}>
                        EN
                    </span>
                    <span className="text-[var(--color-border)]">/</span>
                    <span className={currentLocale === 'tr' ? 'text-[var(--color-cyan)]' : 'text-[var(--color-muted)]'}>
                        TR
                    </span>
                </button>
            </div>
        </motion.nav>
    );
}
