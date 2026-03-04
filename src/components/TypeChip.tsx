'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface TypeChipProps {
    labels: string[];
}

export default function TypeChip({ labels }: TypeChipProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % labels.length);
        }, 2500);
        return () => clearInterval(timer);
    }, [labels.length]);

    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 font-[family-name:var(--font-mono)] text-sm">
            <span className="h-2 w-2 rounded-full bg-[var(--color-cyan)] animate-pulse" />
            <div className="relative h-5 overflow-hidden min-w-[220px]">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={labels[index]}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="absolute left-0 whitespace-nowrap text-[var(--color-muted)]"
                    >
                        {labels[index]}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
}
