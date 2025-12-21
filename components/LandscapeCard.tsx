"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { memo } from "react";

interface Project {
    id: number;
    title: string;
    subtitle: string;
    client: string;
    impact: string[];
    tags: string[];
    gradient: string;
    icon: string;
    images: string[];
    thumbnail: string | null;
    liveUrl?: string; // Should be optional
}

// 16:9 Optimized Landscape Card
const LandscapeCard = memo(({ project, style }: { project: Project; style: any }) => {
    // Magnetic Hover (Reduced intensity for performance)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ ...style }}
            className="absolute w-[85vw] md:w-[60vw] lg:w-[800px] aspect-video cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative w-full h-full group overflow-hidden rounded-2xl border border-white/10 bg-[#050505] shadow-2xl">

                {/* 1. Background Image (Full Bleed) */}
                {project.thumbnail ? (
                    <div className="absolute inset-0">
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 90vw, 800px"
                            priority={false}
                        />
                        {/* Vignette Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                    </div>
                ) : (
                    // Fallback Gradient for No Image
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
                )}

                {/* 2. Content Layout (Grid) */}
                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end md:justify-center items-start z-10">

                    {/* Client Badge */}
                    <div className="mb-4 opacity-0 md:opacity-100 transition-opacity duration-300">
                        <span className="text-xs font-mono uppercase tracking-widest text-white/80 bg-white/10 px-3 py-1 rounded border border-white/20">
                            {project.client}
                        </span>
                    </div>

                    {/* Title & Icon */}
                    <div className="flex items-center gap-4 mb-2">
                        <span className="text-3xl md:text-4xl filter drop-shadow-lg">{project.icon}</span>
                        <h3 className="text-3xl md:text-5xl font-syne font-bold text-white leading-tight drop-shadow-md">
                            {project.title}
                        </h3>
                    </div>

                    <p className="text-base md:text-xl text-white/80 font-light mb-6 max-w-lg drop-shadow-sm">
                        {project.subtitle}
                    </p>

                    {/* Info / Impact (Visible on Desktop or specialized view) */}
                    <div className="hidden md:block space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {project.impact.slice(0, 3).map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-white/90 font-mono bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5">
                                    <span className="text-white">▹</span> {item}
                                </div>
                            ))}
                        </div>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {project.tags.map((tag, i) => (
                                <span key={i} className="text-xs uppercase tracking-wider text-white/50">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Only Info (Simplified) */}
                    <div className="md:hidden mt-2 flex flex-wrap gap-2">
                        {project.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-wider text-white/60">
                                {tag}
                            </span>
                        ))}
                    </div>

                </div>

                {/* Hover Highlight Border */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 transition-colors duration-300 rounded-2xl pointer-events-none" />

            </div>
        </motion.div>
    );
});

LandscapeCard.displayName = "LandscapeCard";
export default LandscapeCard;
