'use client';

import { motion } from 'framer-motion';

interface ExperienceItem {
    role: string;
    company: string;
    period: string;
    description: string;
    bullets: string[];
}

interface ExperienceTimelineProps {
    items: ExperienceItem[];
}

export default function ExperienceTimeline({ items }: ExperienceTimelineProps) {
    return (
        <div className="relative">
            {/* Vertical accent line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent)]/40 via-[var(--color-purple)]/20 to-transparent" />

            <div className="space-y-6">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                        className="relative pl-10"
                    >
                        {/* Dot on timeline */}
                        <div className="absolute left-[11px] top-2 h-3 w-3 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)]" />

                        {/* Card */}
                        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all hover:border-[var(--color-accent)]/20 hover:shadow-[0_0_30px_rgba(52,211,153,0.06)]">
                            {/* Track header */}
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div>
                                    <h3 className="font-bold text-[var(--color-fg)]">{item.role}</h3>
                                    <p className="text-sm text-[var(--color-accent)]">{item.company}</p>
                                </div>
                                <span className="whitespace-nowrap rounded-full bg-[var(--color-card)] border border-[var(--color-border)] px-3 py-1 font-[family-name:var(--font-mono)] text-xs text-[var(--color-muted)]">
                                    {item.period}
                                </span>
                            </div>

                            <p className="mt-2 text-sm text-[var(--color-muted)]">{item.description}</p>

                            <ul className="mt-3 space-y-1">
                                {item.bullets.map((b, j) => (
                                    <li key={j} className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
                                        <span className="mt-1.5 text-[var(--color-accent)]">▸</span>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
