"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Path calculation
    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // Orb glow opacity based on scroll speed (optional, kept simple for now)

    // Dynamic color shifting based on section
    const orbColor = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6, 0.8, 1],
        ["#ffffff", "#22d3ee", "#a855f7", "#ffffff", "#f472b6", "#ffffff"]
    );

    return (
        <div className="fixed inset-0 pointer-events-none z-50 mix-blend-screen">
            {/* 1. Main Progress Line (Right side) */}
            <div className="absolute top-0 right-0 md:right-8 h-full w-[2px] bg-white/5 hidden md:block">
                <motion.div
                    className="w-full bg-gradient-to-b from-transparent via-white/50 to-cyan-500/50"
                    style={{ height: orbY }}
                />
            </div>

            {/* 2. The Traveler Orb */}
            <motion.div
                className="absolute right-[-4px] md:right-[28px] top-0 w-3 h-3 md:w-4 md:h-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] z-50"
                style={{
                    top: orbY,
                    backgroundColor: orbColor,
                    scale: useTransform(scrollYProgress, [0, 1], [1, 1.5])
                }}
            >
                <div className="absolute inset-0 bg-white animate-ping opacity-50 rounded-full" />
            </motion.div>

            {/* 3. Bottom Progress Bar (Mobile) */}
            <motion.div
                className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 origin-left md:hidden"
                style={{ scaleX }}
            />
        </div>
    );
}
