'use client';

import { motion } from 'framer-motion';

interface StickerTagProps {
    label: string;
    icon?: string;
}

export default function StickerTag({ label, icon }: StickerTagProps) {
    return (
        <motion.span
            whileHover={{
                scale: 1.08,
                rotate: Math.random() > 0.5 ? 3 : -3,
                transition: { type: 'spring', damping: 8, stiffness: 300 },
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-sm cursor-default transition-shadow hover:shadow-[0_0_20px_rgba(0,209,255,0.12)] hover:border-[var(--color-cyan)]/30"
        >
            {icon && <span className="text-base">{icon}</span>}
            <span className="text-[var(--color-fg)]/90">{label}</span>
        </motion.span>
    );
}
