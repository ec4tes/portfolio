'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const sections = ['about', 'stack', 'projects', 'experience', 'contact'] as const;

export default function Navbar() {
    const t = useTranslations('nav');
    const router = useRouter();
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const fullText = '> ecates';

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setDisplayText(fullText.slice(0, i + 1));
            i++;
            if (i >= fullText.length) clearInterval(timer);
        }, 120);
        return () => clearInterval(timer);
    }, []);


    const currentLocale = pathname.startsWith('/tr') ? 'tr' : 'en';

    const toggleLocale = () => {
        const newLocale = currentLocale === 'en' ? 'tr' : 'en';
        const pathWithoutLocale = pathname.replace(/^\/(en|tr)/, '') || '/';
        router.push(`/${newLocale}${pathWithoutLocale}`);
    };

    const scrollTo = (id: string) => {
        setMobileOpen(false);
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
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
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
                {/* Logo */}
                <button
                    className="flex items-center text-base sm:text-lg font-bold tracking-tight hover:text-[var(--color-accent)] transition-colors group"
                    onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileOpen(false); }}
                >
                    <span className="gradient-text font-black">{displayText}</span>
                    <span className="w-[2px] h-[1em] bg-[var(--color-accent)] animate-terminal-cursor ml-1" />
                </button>

                {/* Nav links (hidden on small screens) */}
                <div className="hidden md:flex items-center gap-6">
                    {sections.map((section) => (
                        <button
                            key={section}
                            onClick={() => scrollTo(section)}
                            className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)] relative group"
                        >
                            {t(section)}
                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full" />
                        </button>
                    ))}
                </div>

                {/* Right side: language toggle + hamburger */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Language toggle */}
                    <button
                        onClick={toggleLocale}
                        className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-xs font-medium transition-all hover:border-[var(--color-accent)]/40 hover:shadow-[0_0_15px_rgba(52,211,153,0.12)]"
                    >
                        <span className={currentLocale === 'en' ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'}>
                            EN
                        </span>
                        <span className="text-[var(--color-border)]">/</span>
                        <span className={currentLocale === 'tr' ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'}>
                            TR
                        </span>
                    </button>

                    {/* Hamburger button (mobile only) */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5"
                        aria-label="Menu"
                    >
                        <motion.span
                            animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                            className="block h-[2px] w-5 bg-[var(--color-fg)] rounded-full origin-center"
                        />
                        <motion.span
                            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="block h-[2px] w-5 bg-[var(--color-fg)] rounded-full"
                        />
                        <motion.span
                            animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                            className="block h-[2px] w-5 bg-[var(--color-fg)] rounded-full origin-center"
                        />
                    </button>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-xl"
                    >
                        <div className="flex flex-col gap-1 px-4 py-3">
                            {sections.map((section, i) => (
                                <button
                                    key={section}
                                    onClick={() => scrollTo(section)}
                                    className="text-left py-3 px-3 rounded-lg text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)] hover:bg-[var(--color-card)] active:bg-[var(--color-card)]"
                                >
                                    {t(section)}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
