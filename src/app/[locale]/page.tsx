'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import CursorSpotlight from '@/components/CursorSpotlight';
import KineticHeadline from '@/components/KineticHeadline';
import TypeChip from '@/components/TypeChip';
import ProjectAccordion from '@/components/ProjectAccordion';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import ContactSection from '@/components/ContactSection';
import ScrollBeam from '@/components/ScrollBeam';

/* ── Skill data (not translated — brand names) ──── */
const skills = {
    frontend: [
        { icon: '⚛️', label: 'React', comment: 'frontendSkills.react' },
        { icon: '▲', label: 'Next.js', comment: 'frontendSkills.nextjs' },
        { icon: '🔷', label: 'TypeScript', comment: 'frontendSkills.typescript' },
        { icon: '🎨', label: 'Tailwind CSS', comment: 'frontendSkills.tailwind' },
    ],
    backend: [
        { icon: '🐍', label: 'Python', comment: 'backendSkills.python' },
        { icon: '🗄️', label: 'PostgreSQL', comment: 'backendSkills.postgresql' },
        { icon: '☕', label: 'Java', comment: 'backendSkills.java' },
        { icon: '🍀', label: 'Spring Boot', comment: 'backendSkills.springboot' },
    ],
};

/* ── Section wrapper ─────────────────────────────── */
function Section({
    id,
    children,
    className = '',
}: {
    id: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section id={id} className={`scroll-mt-24 py-16 sm:py-24 px-4 sm:px-6 ${className}`}>
            <div className="mx-auto max-w-5xl">{children}</div>
        </section>
    );
}

/* ── Section heading ─────────────────────────────── */
function SectionHeading({
    title,
    subtitle,
}: {
    title: string;
    subtitle?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
        >
            <h2 className="text-3xl md:text-4xl font-black gradient-text">{title}</h2>
            {subtitle && (
                <p className="mt-2 text-[var(--color-muted)]">{subtitle}</p>
            )}
        </motion.div>
    );
}

/* ── Main Page ───────────────────────────────────── */
export default function HomePage() {
    const tHero = useTranslations('hero');
    const tAbout = useTranslations('about');
    const tStack = useTranslations('stack');
    const tProjects = useTranslations('projects');
    const tExp = useTranslations('experience');
    const tFooter = useTranslations('footer');

    // Get role labels as array
    const roles = [tHero('roles.0'), tHero('roles.1'), tHero('roles.2')];

    // Build project items from translations
    const projectItems = [0, 1, 2].map((i) => ({
        title: tProjects(`items.${i}.title`),
        tagline: tProjects(`items.${i}.tagline`),
        role: tProjects(`items.${i}.role`),
        stack: tProjects(`items.${i}.stack`),
        impact: tProjects(`items.${i}.impact`),
        bullets: [
            tProjects(`items.${i}.bullets.0`),
            tProjects(`items.${i}.bullets.1`),
            tProjects(`items.${i}.bullets.2`),
        ],
        link: tProjects(`items.${i}.link`),
        linkLabel: tProjects(`items.${i}.linkLabel`),
    }));

    // Build experience items from translations
    const expItems = [0, 1].map((i) => ({
        role: tExp(`items.${i}.role`),
        company: tExp(`items.${i}.company`),
        period: tExp(`items.${i}.period`),
        description: tExp(`items.${i}.description`),
        bullets: [],
    }));

    return (
        <>
            <CursorSpotlight />
            <ScrollBeam />
            <Navbar />

            {/* ── Hero ──────────────────────────────────── */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 overflow-hidden">
                {/* Animated background gradient blobs */}
                <div className="pointer-events-none absolute inset-0">
                    <motion.div
                        animate={{
                            x: [0, 30, -20, 0],
                            y: [0, -20, 15, 0],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-[15%] left-[10%] h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] rounded-full bg-[var(--color-accent)]/6 blur-[100px] sm:blur-[150px]"
                    />
                    <motion.div
                        animate={{
                            x: [0, -25, 20, 0],
                            y: [0, 25, -15, 0],
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-[10%] right-[10%] h-[250px] w-[250px] sm:h-[500px] sm:w-[500px] rounded-full bg-[var(--color-purple)]/6 blur-[100px] sm:blur-[150px]"
                    />
                    <motion.div
                        animate={{
                            x: [0, 15, -10, 0],
                            y: [0, -10, 20, 0],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-[40%] right-[25%] h-[300px] w-[300px] rounded-full bg-[var(--color-pink)]/4 blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            x: [0, -20, 10, 0],
                            y: [0, 15, -20, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-[30%] left-[30%] h-[250px] w-[250px] rounded-full bg-[#fbbf24]/4 blur-[100px]"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
                    {/* Small intro label */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mb-10 sm:mb-20 flex justify-center"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-2 font-[family-name:var(--font-mono)] text-sm text-[var(--color-muted)]">
                            <span className="h-2 w-2 rounded-full bg-[#00e5a0] animate-pulse" />
                            {tHero('greeting')}
                        </span>
                    </motion.div>

                    {/* Kinetic headline — desktop only */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="hidden md:flex flex-col items-center"
                    >
                        <KineticHeadline line1="EMİR CEM" line2="ATEŞ" />
                    </motion.div>

                    {/* Static headline — mobile only */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="md:hidden flex flex-col items-center"
                    >
                        <h1 className="text-5xl sm:text-6xl font-black leading-[0.9] tracking-tighter text-[#f0f0f0]">
                            EMİR CEM
                        </h1>
                        <h1 className="text-5xl sm:text-6xl font-black leading-[0.9] tracking-tighter text-[#f0f0f0]">
                            ATEŞ
                        </h1>
                    </motion.div>

                    {/* Type chip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.6 }}
                        className="mt-8 sm:mt-14 flex justify-center"
                    >
                        <TypeChip labels={roles} />
                    </motion.div>

                    {/* Animated gradient line */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
                        className="mx-auto mt-6 sm:mt-10 h-[2px] w-40 sm:w-64 origin-center animated-gradient-line"
                    />

                    {/* Scroll CTA */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                        className="mt-8 text-sm text-[var(--color-muted)]"
                    >
                        {tHero('scrollCta')} ↓
                    </motion.p>
                </div>
            </section>

            {/* ── About ─────────────────────────────────── */}
            <Section id="about">
                <SectionHeading title={tAbout('title')} />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid gap-8 md:grid-cols-2"
                >
                    <div className="space-y-4 text-[var(--color-muted)] leading-relaxed">
                        <p>{tAbout('p1')}</p>
                        <p>{tAbout('p2')}</p>
                    </div>
                    <div className="space-y-4">
                        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
                            <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-accent)]">
                                {tAbout('locationLabel')}
                            </span>
                            <p className="mt-1 text-lg font-bold">{tAbout('location')}</p>
                        </div>
                        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
                            <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-purple)]">
                                {tAbout('focusLabel')}
                            </span>
                            <p className="mt-1 text-lg font-bold">{tAbout('focus')}</p>
                        </div>
                    </div>
                </motion.div>
            </Section>

            {/* ── Stack ─────────────────────────────────── */}
            <Section id="stack">
                <SectionHeading title={tStack('title')} subtitle={tStack('subtitle')} />

                <div className="grid gap-8 md:grid-cols-2">
                    {(Object.keys(skills) as (keyof typeof skills)[]).map((cat, catIdx) => {
                        const accents = [
                            { color: '#e8716d', bgFrom: '#e8716d' },
                            { color: '#9f7aea', bgFrom: '#9f7aea' },
                        ];
                        const accent = accents[catIdx % accents.length];

                        return (
                            <motion.div
                                key={cat}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: catIdx * 0.15 }}
                            >
                                {/* Category label */}
                                <div className="flex items-center gap-3 mb-5">
                                    <div
                                        className="h-5 w-1 rounded-full"
                                        style={{ backgroundColor: accent.color }}
                                    />
                                    <h3
                                        className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest font-bold"
                                        style={{ color: accent.color }}
                                    >
                                        {tStack(`categories.${cat}`)}
                                    </h3>
                                </div>

                                {/* Skill chips */}
                                <div className="flex flex-wrap gap-3">
                                    {skills[cat].map((s, i) => (
                                        <motion.div
                                            key={s.label}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 + i * 0.06 }}
                                            whileHover={{
                                                y: -3,
                                                transition: { type: 'spring' as const, damping: 12, stiffness: 300 },
                                            }}
                                            className="group relative"
                                        >
                                            <div
                                                className="flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 cursor-default transition-all hover:border-opacity-30"
                                                style={{
                                                    ['--hover-border' as string]: accent.color,
                                                }}
                                                onMouseEnter={(e) => {
                                                    (e.currentTarget as HTMLElement).style.borderColor = `${accent.color}40`;
                                                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${accent.color}12`;
                                                }}
                                                onMouseLeave={(e) => {
                                                    (e.currentTarget as HTMLElement).style.borderColor = '';
                                                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                                                }}
                                            >
                                                <span className="text-lg">{s.icon}</span>
                                                <span className="text-sm font-semibold text-[var(--color-fg)] group-hover:text-white transition-colors">
                                                    {s.label}
                                                </span>
                                            </div>

                                            {/* Tooltip on hover */}
                                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 rounded-lg bg-[#1a1b1e] border border-[var(--color-border)] text-[11px] text-[var(--color-muted)] italic whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                {tStack(s.comment)}
                                                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1a1b1e]" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </Section>

            {/* ── Projects ──────────────────────────────── */}
            <Section id="projects">
                <SectionHeading
                    title={tProjects('title')}
                    subtitle={tProjects('subtitle')}
                />
                <ProjectAccordion items={projectItems} />
            </Section>

            {/* ── Experience ────────────────────────────── */}
            <Section id="experience">
                <SectionHeading
                    title={tExp('title')}
                    subtitle={tExp('subtitle')}
                />
                <ExperienceTimeline items={expItems} />
            </Section>

            {/* ── Contact ───────────────────────────────── */}
            <ContactSection />

            {/* ── Footer ────────────────────────────────── */}
            <footer className="border-t border-[var(--color-border)] py-8 text-center text-sm text-[var(--color-muted)]">
                {tFooter('copy')}
            </footer>
        </>
    );
}
