'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import MagneticLink from './MagneticLink';

export default function ContactSection() {
    const t = useTranslations('contact');
    const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState('sending');

        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.append('access_key', '8f5a8f51-3476-4a87-950a-18110013968b');
        formData.append('subject', 'ecatessoft.com — Yeni mesaj!');
        formData.append('from_name', 'Portfolio Contact Form');

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                setFormState('sent');
                form.reset();
                setTimeout(() => setFormState('idle'), 4000);
            } else {
                setFormState('error');
                setTimeout(() => setFormState('idle'), 4000);
            }
        } catch {
            setFormState('error');
            setTimeout(() => setFormState('idle'), 4000);
        }
    };

    return (
        <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6">
            <div className="mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black gradient-text">{t('title')}</h2>
                    <p className="mt-3 text-base sm:text-lg text-[var(--color-muted)]">{t('subtitle')}</p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-12 space-y-4"
                >
                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            type="text"
                            name="name"
                            placeholder={t('namePlaceholder')}
                            required
                            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-3 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-muted)]/60 outline-none transition-all focus:border-[var(--color-cyan)]/50 focus:shadow-[0_0_20px_rgba(0,209,255,0.1)]"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder={t('emailPlaceholder')}
                            required
                            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-3 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-muted)]/60 outline-none transition-all focus:border-[var(--color-cyan)]/50 focus:shadow-[0_0_20px_rgba(0,209,255,0.1)]"
                        />
                    </div>
                    <textarea
                        name="message"
                        placeholder={t('messagePlaceholder')}
                        required
                        rows={5}
                        className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-3 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-muted)]/60 outline-none transition-all focus:border-[var(--color-cyan)]/50 focus:shadow-[0_0_20px_rgba(0,209,255,0.1)] resize-none"
                    />

                    <motion.button
                        type="submit"
                        disabled={formState !== 'idle'}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full md:w-auto rounded-full bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-purple)] px-8 py-3 text-sm font-bold text-[var(--color-bg)] transition-all hover:shadow-[0_0_30px_rgba(0,209,255,0.3)] disabled:opacity-50"
                    >
                        {formState === 'idle' && t('send')}
                        {formState === 'sending' && t('sending')}
                        {formState === 'sent' && t('sent')}
                        {formState === 'error' && '❌ Hata!'}
                    </motion.button>
                </motion.form>

                {/* Socials */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <p className="mb-4 text-sm text-[var(--color-muted)]">{t('socials')}</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { label: 'GitHub', href: 'https://github.com/ec4tes', icon: '⌘' },
                            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/emircemates/', icon: '↗' },
                            { label: 'X / Twitter', href: 'https://x.com/emir_ates__', icon: '✦' },
                            { label: 'info@ecatessoft.com', href: 'mailto:info@ecatessoft.com', icon: '✉' },
                        ].map((s) => (
                            <MagneticLink
                                key={s.label}
                                href={s.href}
                                className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm transition-all hover:border-[var(--color-cyan)]/40 hover:shadow-[0_0_20px_rgba(0,209,255,0.12)] hover:text-[var(--color-cyan)]"
                            >
                                <span>{s.icon}</span>
                                {s.label}
                            </MagneticLink>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
