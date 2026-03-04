'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticLinkProps {
    children: React.ReactNode;
    href?: string;
    className?: string;
    onClick?: () => void;
    strength?: number;
}

export default function MagneticLink({
    children,
    href,
    className = '',
    onClick,
    strength = 0.3,
}: MagneticLinkProps) {
    const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { damping: 15, stiffness: 200 });
    const springY = useSpring(y, { damping: 15, stiffness: 200 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((e.clientX - cx) * strength);
        y.set((e.clientY - cy) * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const Tag = href ? motion.a : motion.button;

    return (
        <Tag
            ref={ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>}
            href={href}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={`inline-block transition-colors ${className}`}
        >
            {children}
        </Tag>
    );
}
