'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorSpotlight() {
    const [visible, setVisible] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
    const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

    useEffect(() => {
        // Respect prefers-reduced-motion
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (mq.matches) return;

        const handleMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!visible) setVisible(true);
        };

        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, [cursorX, cursorY, visible]);

    if (!visible) return null;

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-[9998]"
            style={{
                background: `radial-gradient(600px circle at var(--cx) var(--cy), rgba(0,209,255,0.06), transparent 60%)`,
            }}
        >
            <motion.div
                className="pointer-events-none fixed w-[600px] h-[600px] rounded-full"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background:
                        'radial-gradient(circle, rgba(0,209,255,0.07) 0%, rgba(168,85,247,0.03) 40%, transparent 70%)',
                }}
            />
        </motion.div>
    );
}
