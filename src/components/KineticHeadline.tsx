'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* ── Masculine, cool color palette ───────────────── */
const LETTER_COLORS = [
    '#00d1ff', // cyan
    '#3b82f6', // blue
    '#6366f1', // indigo
    '#8b5cf6', // violet
    '#06b6d4', // darker cyan
    '#0ea5e9', // sky blue
    '#a78bfa', // soft purple
    '#2dd4bf', // teal
    '#38bdf8', // light blue
    '#7c3aed', // deep purple
    '#14b8a6', // teal-green
];

function getLetterColor(globalIndex: number): string {
    return LETTER_COLORS[globalIndex % LETTER_COLORS.length];
}

/* Simple seeded pseudo-random based on index */
function seededRandom(seed: number): number {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
}

interface KineticHeadlineProps {
    line1: string;
    line2: string;
}

export default function KineticHeadline({ line1, line2 }: KineticHeadlineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isExploded, setIsExploded] = useState(false);
    const prefersReduced = useReducedMotion();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (prefersReduced) return;
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
            if (!hasInteracted) setHasInteracted(true);
        },
        [prefersReduced, hasInteracted]
    );

    const handleClick = useCallback(() => {
        if (prefersReduced || isExploded) return;
        setIsExploded(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsExploded(false), 1000);
    }, [prefersReduced, isExploded]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const line1NonSpaceCount = line1.split('').filter((c) => c !== ' ').length;

    const renderLetters = (text: string, lineIndex: number, colorOffset: number) => {
        let colorIdx = colorOffset;
        return text.split('').map((char, i) => {
            const key = `${lineIndex}-${i}`;
            if (char === ' ') {
                return <span key={key} className="inline-block w-[0.6em]" />;
            }
            const thisColorIdx = colorIdx;
            colorIdx++;
            return (
                <KineticLetter
                    key={key}
                    char={char}
                    colorIndex={thisColorIdx}
                    letterIndex={thisColorIdx}
                    mousePos={mousePos}
                    isExploded={isExploded}
                    prefersReduced={prefersReduced ?? false}
                    hasInteracted={hasInteracted}
                    charDelay={thisColorIdx * 0.04}
                />
            );
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
            className="cursor-pointer select-none"
        >
            <div className="flex flex-wrap items-baseline justify-center">
                {renderLetters(line1, 0, 0)}
            </div>
            <div className="flex flex-wrap items-baseline justify-center mt-[-0.05em]">
                {renderLetters(line2, 1, line1NonSpaceCount)}
            </div>
        </div>
    );
}

/* ── Individual Letter ───────────────────────────── */

function KineticLetter({
    char,
    colorIndex,
    letterIndex,
    mousePos,
    isExploded,
    prefersReduced,
    hasInteracted,
    charDelay,
}: {
    char: string;
    colorIndex: number;
    letterIndex: number;
    mousePos: { x: number; y: number };
    isExploded: boolean;
    prefersReduced: boolean;
    hasInteracted: boolean;
    charDelay: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const hoverColor = getLetterColor(colorIndex);

    // Strong magnetic parallax toward cursor
    useEffect(() => {
        if (prefersReduced || !ref.current || !hasInteracted) return;
        const el = ref.current;
        const rect = el.getBoundingClientRect();
        const parent = el.parentElement?.parentElement;
        if (!parent) return;
        const parentRect = parent.getBoundingClientRect();
        const cx = rect.left - parentRect.left + rect.width / 2;
        const cy = rect.top - parentRect.top + rect.height / 2;

        const dx = mousePos.x - cx;
        const dy = mousePos.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 600;
        const strength = Math.max(0, 1 - dist / maxDist) * 25;

        setOffset({
            x: (dx / (dist || 1)) * strength,
            y: (dy / (dist || 1)) * strength,
        });
    }, [mousePos, prefersReduced, hasInteracted]);

    // Deterministic random values based on letter index — same on server & client
    const initialRotate = (seededRandom(letterIndex * 3) - 0.5) * 30;
    const hoverRotate = seededRandom(letterIndex * 7) > 0.5 ? 5 : -5;
    const explodeTarget = {
        x: (seededRandom(letterIndex * 11) - 0.5) * 500,
        y: (seededRandom(letterIndex * 13) - 0.5) * 350,
        rotate: (seededRandom(letterIndex * 17) - 0.5) * 180,
        scale: seededRandom(letterIndex * 19) * 0.3 + 0.4,
    };

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0, y: 80, scale: 0.3, rotate: initialRotate }}
            animate={
                isExploded
                    ? {
                        ...explodeTarget,
                        transition: { type: 'spring' as const, damping: 6, stiffness: 80 },
                    }
                    : {
                        opacity: 1,
                        y: offset.y,
                        x: offset.x,
                        scale: 1,
                        rotate: 0,
                        transition: { type: 'spring' as const, damping: 12, stiffness: 150 },
                    }
            }
            transition={{
                delay: charDelay,
                duration: 0.7,
                type: 'spring' as const,
                damping: 10,
                stiffness: 80,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={
                prefersReduced
                    ? {}
                    : {
                        scale: 1.2,
                        y: -12,
                        rotate: hoverRotate,
                        transition: { type: 'spring' as const, damping: 6, stiffness: 300 },
                    }
            }
            className="inline-block text-[clamp(3.5rem,11vw,9rem)] font-black leading-[0.85] tracking-tighter transition-colors duration-150"
            style={{
                color: isHovered ? hoverColor : '#f0f0f0',
                textShadow: isHovered
                    ? `0 0 25px ${hoverColor}90, 0 0 50px ${hoverColor}50, 0 0 80px ${hoverColor}25`
                    : '0 2px 10px rgba(0,0,0,0.3)',
            }}
        >
            {char}
        </motion.span>
    );
}
