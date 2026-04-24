'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MagneticLink from './MagneticLink';

interface ProjectItem {
    title: string;
    tagline: string;
    role: string;
    stack: string;
    impact: string;
    bullets: string[];
    link: string;
    linkLabel: string;
}

interface ProjectAccordionProps {
    items: ProjectItem[];
}

export default function ProjectAccordion({ items }: ProjectAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (i: number) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <div className="space-y-4">
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                    <div
                        onClick={() => toggle(i)}
                        className="group cursor-pointer rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 transition-all hover:border-[var(--color-accent)]/25 hover:shadow-[0_0_30px_rgba(232,113,109,0.06)]"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold gradient-text">{item.title}</h3>
                                <p className="mt-1 text-sm text-[var(--color-muted)]">{item.tagline}</p>
                            </div>
                            <motion.span
                                animate={{ rotate: openIndex === i ? 45 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-1 text-xl text-[var(--color-accent)] shrink-0"
                            >
                                +
                            </motion.span>
                        </div>

                        {/* Chips */}
                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-xs text-[var(--color-accent)]">
                                {item.role}
                            </span>
                            <span className="rounded-full bg-[var(--color-purple)]/10 px-3 py-1 text-xs text-[var(--color-purple)]">
                                {item.stack}
                            </span>
                            <span className="rounded-full bg-[var(--color-pink)]/10 px-3 py-1 text-xs text-[var(--color-pink)]">
                                {item.impact}
                            </span>
                        </div>

                        {/* Expanded content */}
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <ul className="mt-4 space-y-2 border-t border-[var(--color-border)] pt-4">
                                        {item.bullets.map((bullet, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                    {item.link && item.link !== '#' && (
                                        <div className="mt-4">
                                            <MagneticLink
                                                href={item.link}
                                                className="text-sm text-[var(--color-accent)] hover:underline"
                                            >
                                                {item.linkLabel} →
                                            </MagneticLink>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
