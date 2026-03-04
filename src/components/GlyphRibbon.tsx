'use client';

import { Suspense, lazy, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';

function GlyphScene() {
    const glyphs = ['{', '}', '<', '>', '/', '.', '(', ')'];

    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={0.8} color="#00d1ff" />
            <pointLight position={[-5, -5, 3]} intensity={0.4} color="#a855f7" />

            {glyphs.map((glyph, i) => {
                const angle = (i / glyphs.length) * Math.PI * 2;
                const radius = 2.2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const y = (Math.random() - 0.5) * 1.5;

                return (
                    <Float
                        key={i}
                        speed={1.2 + Math.random() * 0.8}
                        rotationIntensity={0.3}
                        floatIntensity={0.5}
                    >
                        <group position={[x, y, z]}>
                            <mesh>
                                <planeGeometry args={[0.6, 0.8]} />
                                <meshStandardMaterial
                                    transparent
                                    opacity={0.7}
                                    color={i % 2 === 0 ? '#00d1ff' : '#a855f7'}
                                    emissive={i % 2 === 0 ? '#00d1ff' : '#a855f7'}
                                    emissiveIntensity={0.3}
                                />
                            </mesh>
                            {/* Use a simple text overlay since Text3D needs font */}
                        </group>
                    </Float>
                );
            })}
        </>
    );
}

export default function GlyphRibbon() {
    const prefersReduced = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!mounted || prefersReduced || isMobile) return null;

    return (
        <div className="h-[400px] w-full">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                dpr={[1, 1.5]}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <GlyphScene />
                </Suspense>
            </Canvas>
        </div>
    );
}
