"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Optimized spring config for mobile
    const scaleX = useSpring(scrollYProgress, {
        stiffness: isMobile ? 50 : 100,
        damping: isMobile ? 20 : 30,
        restDelta: 0.001,
        mass: 0.5,
    });

    // Always call useTransform hooks - they need to be before any conditional returns
    const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const orbColor = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], 
        ["#ffffff", "#22d3ee", "#a855f7", "#ffffff", "#f472b6", "#ffffff"]);
    const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

    // Use CSS display to conditionally show/hide instead of early return
    if (isMobile) {
        return (
            <motion.div
                className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 origin-left z-50"
                style={{ scaleX }}
            />
        );
    }

    // DESKTOP: Full version with transforms
    return (
        <div className="fixed inset-0 pointer-events-none z-50 mix-blend-screen">
            {/* Progress Line */}
            <div className="absolute top-0 right-8 h-full w-[2px] bg-white/5">
                <motion.div
                    className="w-full bg-gradient-to-b from-transparent via-white/50 to-cyan-500/50"
                    style={{ height: orbY }}
                />
            </div>

            {/* Orb */}
            <motion.div
                className="absolute right-[28px] top-0 w-4 h-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] z-50"
                style={{
                    top: orbY,
                    backgroundColor: orbColor,
                    scale: orbScale,
                    willChange: 'transform, background-color',
                }}
            >
                <div className="absolute inset-0 bg-white animate-ping opacity-50 rounded-full" />
            </motion.div>
        </div>
    );
}
