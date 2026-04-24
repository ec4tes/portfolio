'use client';

import { useEffect, useState, useMemo } from 'react';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValueEvent,
    AnimatePresence,
} from 'framer-motion';

const SECTIONS = ['about', 'stack', 'projects', 'experience', 'contact'];
const SECTION_LABELS = ['01', '02', '03', '04', '05'];

export default function ScrollBeam() {
    const [visible, setVisible] = useState(false);
    const [activeIdx, setActiveIdx] = useState(-1);
    const [prevActiveIdx, setPrevActiveIdx] = useState(-1);
    const [nodePositions, setNodePositions] = useState<number[]>([]);

    const { scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, {
        damping: 35,
        stiffness: 120,
        mass: 0.5,
    });

    const orbTop = useTransform(smoothProgress, (v) => `${v * 100}%`);

    /* ── Show after hero ─────────────────────────────── */
    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > window.innerHeight * 0.5);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── Calculate section positions ─────────────────── */
    useEffect(() => {
        const calc = () => {
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;
            setNodePositions(
                SECTIONS.map((id) => {
                    const el = document.getElementById(id);
                    return el ? el.offsetTop / docHeight : 0;
                })
            );
        };
        calc();
        const t = setTimeout(calc, 1500);
        window.addEventListener('resize', calc);
        return () => {
            window.removeEventListener('resize', calc);
            clearTimeout(t);
        };
    }, []);

    /* ── Track active section ────────────────────────── */
    useMotionValueEvent(smoothProgress, 'change', (v) => {
        let active = -1;
        for (let i = nodePositions.length - 1; i >= 0; i--) {
            if (v >= nodePositions[i] - 0.03) {
                active = i;
                break;
            }
        }
        if (active !== activeIdx) {
            setPrevActiveIdx(activeIdx);
            setActiveIdx(active);
        }
    });

    /* ── Particles ───────────────────────────────────── */
    const particles = useMemo(
        () =>
            Array.from({ length: 18 }, (_, i) => ({
                id: i,
                top: `${((i * 5.7 + 2) % 90) + 3}%`,
                delay: `${(i * 1.1) % 7}s`,
                duration: `${3 + ((i * 0.8) % 4)}s`,
                size: 2 + (i % 4),
                drift: ((i * 19) % 40) - 20,
                opacity: 0.15 + (i % 5) * 0.07,
            })),
        []
    );

    /* ── Lightning cracks ────────────────────────────── */
    const cracks = useMemo(
        () =>
            Array.from({ length: 5 }, (_, i) => ({
                id: i,
                top: `${15 + i * 18}%`,
                angle: (i % 2 === 0 ? 1 : -1) * (25 + (i * 7) % 20),
                length: 16 + (i * 5) % 14,
                delay: `${i * 2.1 + 1}s`,
            })),
        []
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="fixed left-5 xl:left-10 top-0 bottom-0 z-40 hidden lg:flex items-center pointer-events-none"
            style={{ width: '90px' }}
        >
            <div className="relative h-[calc(100vh-100px)] w-full">
                {/* ═══════════════════════════════════════════
                    LAYER 1: Background ghost beam
                ═══════════════════════════════════════════ */}
                <div className="absolute left-[24px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />

                {/* Dashed markers along ghost beam */}
                {Array.from({ length: 20 }, (_, i) => (
                    <div
                        key={`dash-${i}`}
                        className="absolute left-[24px] -translate-x-[0.5px] w-px h-[2px] bg-white/[0.06]"
                        style={{ top: `${i * 5 + 2}%` }}
                    />
                ))}

                {/* ═══════════════════════════════════════════
                    LAYER 2: Progress beam (multi-layer glow)
                ═══════════════════════════════════════════ */}

                {/* Core line — sharp */}
                <motion.div
                    className="absolute left-[24px] -translate-x-[0.5px] top-0 w-[1.5px] origin-top will-change-transform"
                    style={{
                        height: '100%',
                        scaleY: smoothProgress,
                        background:
                            'linear-gradient(180deg, rgba(52,211,153,0.1) 0%, rgba(52,211,153,0.7) 15%, rgba(52,211,153,0.9) 50%, rgba(200,100,160,0.7) 80%, rgba(45,212,191,0.5) 100%)',
                    }}
                />

                {/* Glow layer 1 — close */}
                <motion.div
                    className="absolute left-[24px] -translate-x-[2px] top-0 w-[4px] origin-top will-change-transform"
                    style={{
                        height: '100%',
                        scaleY: smoothProgress,
                        background:
                            'linear-gradient(180deg, transparent 0%, rgba(52,211,153,0.3) 15%, rgba(52,211,153,0.5) 50%, rgba(45,212,191,0.3) 100%)',
                        filter: 'blur(3px)',
                    }}
                />

                {/* Glow layer 2 — medium */}
                <motion.div
                    className="absolute left-[24px] -translate-x-[5px] top-0 w-[10px] origin-top will-change-transform"
                    style={{
                        height: '100%',
                        scaleY: smoothProgress,
                        background:
                            'linear-gradient(180deg, transparent 0%, rgba(52,211,153,0.12) 20%, rgba(52,211,153,0.2) 50%, rgba(45,212,191,0.1) 100%)',
                        filter: 'blur(6px)',
                    }}
                />

                {/* Glow layer 3 — wide ambient */}
                <motion.div
                    className="absolute left-[24px] -translate-x-[12px] top-0 w-[24px] origin-top will-change-transform"
                    style={{
                        height: '100%',
                        scaleY: smoothProgress,
                        background:
                            'linear-gradient(180deg, transparent 0%, rgba(52,211,153,0.05) 20%, rgba(52,211,153,0.08) 50%, rgba(45,212,191,0.04) 100%)',
                        filter: 'blur(10px)',
                    }}
                />

                {/* ═══════════════════════════════════════════
                    LAYER 3: Energy shimmer (traveling light)
                ═══════════════════════════════════════════ */}
                <div
                    className="absolute left-[24px] -translate-x-[1px] top-0 w-[2px] h-full overflow-hidden"
                    style={{ clipPath: 'inset(0)' }}
                >
                    <div
                        className="absolute left-0 w-full sb-shimmer"
                        style={{
                            height: '60px',
                            background:
                                'linear-gradient(180deg, transparent, rgba(255,255,255,0.5), rgba(52,211,153,0.4), transparent)',
                            filter: 'blur(1px)',
                        }}
                    />
                </div>

                {/* ═══════════════════════════════════════════
                    LAYER 4: Lightning crackles
                ═══════════════════════════════════════════ */}
                {cracks.map((c) => (
                    <div
                        key={`crack-${c.id}`}
                        className="absolute sb-crackle"
                        style={{
                            top: c.top,
                            left: '24px',
                            width: `${c.length}px`,
                            height: '1px',
                            background: `linear-gradient(${c.angle > 0 ? '90deg' : '270deg'}, rgba(52,211,153,0.7), transparent)`,
                            transformOrigin: c.angle > 0 ? 'left center' : 'right center',
                            transform: `rotate(${c.angle}deg)`,
                            animationDelay: c.delay,
                            filter: 'blur(0.5px)',
                        }}
                    />
                ))}

                {/* ═══════════════════════════════════════════
                    LAYER 5: Section nodes
                ═══════════════════════════════════════════ */}
                {nodePositions.map((pos, i) => {
                    const isActive = activeIdx >= i;
                    const isCurrent = activeIdx === i;
                    const justActivated = isCurrent && prevActiveIdx !== activeIdx;

                    return (
                        <div
                            key={SECTIONS[i]}
                            className="absolute flex items-center"
                            style={{
                                top: `${pos * 100}%`,
                                left: '24px',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            {/* ── Connection line to content ── */}
                            <motion.div
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{
                                    scaleX: isActive ? 1 : 0,
                                    opacity: isActive ? 1 : 0,
                                }}
                                transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                                className="absolute left-5 h-px origin-left"
                                style={{
                                    width: '35px',
                                    background: `linear-gradient(90deg, rgba(52,211,153,${isCurrent ? 0.5 : 0.15}), transparent)`,
                                }}
                            />

                            {/* ── Section number ── */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -4, scale: 0.8 }}
                                        animate={{ opacity: isCurrent ? 0.7 : 0.3, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -4, scale: 0.8 }}
                                        transition={{ duration: 0.4, delay: 0.25 }}
                                        className="absolute font-[family-name:var(--font-mono)] text-[9px] tracking-widest"
                                        style={{
                                            left: '28px',
                                            color: isCurrent ? '#34d399' : 'rgba(255,255,255,0.3)',
                                        }}
                                    >
                                        {SECTION_LABELS[i]}
                                    </motion.span>
                                )}
                            </AnimatePresence>

                            {/* ── Activation shockwave ── */}
                            <AnimatePresence>
                                {justActivated && (
                                    <motion.div
                                        key={`shock-${i}-${activeIdx}`}
                                        initial={{ scale: 0.3, opacity: 0.9 }}
                                        animate={{ scale: 4, opacity: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                        className="absolute h-4 w-4 rounded-full"
                                        style={{
                                            border: '1px solid rgba(52,211,153,0.5)',
                                            boxShadow: '0 0 8px rgba(52,211,153,0.3)',
                                        }}
                                    />
                                )}
                            </AnimatePresence>

                            {/* ── Continuous pulse on current node ── */}
                            {isCurrent && (
                                <motion.div
                                    animate={{
                                        scale: [1, 2.5, 1],
                                        opacity: [0.4, 0, 0.4],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                    className="absolute h-[11px] w-[11px] rotate-45 border border-[var(--color-accent)]/30"
                                />
                            )}

                            {/* ── Node diamond ── */}
                            <motion.div
                                animate={{
                                    scale: isCurrent ? 1.5 : isActive ? 1.15 : 0.7,
                                }}
                                transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                            >
                                <div
                                    className="h-[11px] w-[11px] rotate-45 transition-all duration-700"
                                    style={{
                                        borderWidth: '1.5px',
                                        borderStyle: 'solid',
                                        borderColor: isActive
                                            ? '#34d399'
                                            : 'rgba(255,255,255,0.05)',
                                        backgroundColor: isActive
                                            ? '#34d399'
                                            : 'transparent',
                                        boxShadow: isCurrent
                                            ? '0 0 12px rgba(52,211,153,0.7), 0 0 30px rgba(52,211,153,0.3), 0 0 60px rgba(52,211,153,0.12)'
                                            : isActive
                                            ? '0 0 8px rgba(52,211,153,0.4), 0 0 20px rgba(52,211,153,0.15)'
                                            : 'none',
                                    }}
                                />
                            </motion.div>
                        </div>
                    );
                })}

                {/* ═══════════════════════════════════════════
                    LAYER 6: Tracker Orb
                ═══════════════════════════════════════════ */}
                <motion.div
                    className="absolute"
                    style={{
                        top: orbTop,
                        left: '24px',
                        x: '-50%',
                        y: '-50%',
                    }}
                >
                    {/* Sonar ring — outer (slow, wide) */}
                    <div className="absolute -inset-10 sb-sonar">
                        <div className="h-full w-full rounded-full border border-[var(--color-accent)]/8" />
                    </div>

                    {/* Sonar ring — inner */}
                    <div className="absolute -inset-6 sb-sonar-alt">
                        <div className="h-full w-full rounded-full border border-[var(--color-accent)]/15" />
                    </div>

                    {/* Breathing ambient glow */}
                    <div
                        className="absolute -inset-6 rounded-full sb-breathe"
                        style={{
                            background:
                                'radial-gradient(circle, rgba(52,211,153,0.35) 0%, rgba(52,211,153,0.08) 40%, transparent 70%)',
                        }}
                    />

                    {/* Outer shell */}
                    <div
                        className="relative h-[16px] w-[16px] rounded-full"
                        style={{
                            backgroundColor: '#34d399',
                            boxShadow:
                                '0 0 8px rgba(52,211,153,0.9), ' +
                                '0 0 20px rgba(52,211,153,0.5), ' +
                                '0 0 45px rgba(52,211,153,0.25), ' +
                                '0 0 80px rgba(52,211,153,0.1)',
                        }}
                    >
                        {/* White hot center */}
                        <div className="absolute inset-[3px] rounded-full bg-white/90" />
                    </div>
                </motion.div>

                {/* ═══════════════════════════════════════════
                    LAYER 7: Floating particles
                ═══════════════════════════════════════════ */}
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="absolute sb-particle rounded-full"
                        style={
                            {
                                width: p.size,
                                height: p.size,
                                backgroundColor: `rgba(52,211,153,${p.opacity})`,
                                top: p.top,
                                left: '24px',
                                animationDelay: p.delay,
                                animationDuration: p.duration,
                                '--sb-drift': `${p.drift}px`,
                            } as React.CSSProperties
                        }
                    />
                ))}
            </div>
        </motion.div>
    );
}
