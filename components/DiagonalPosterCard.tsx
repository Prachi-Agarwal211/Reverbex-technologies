"use client";

import { motion } from "framer-motion";
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
    liveUrl?: string;
}

// Optimized Cinematic Card (16:9)
const DiagonalPosterCard = memo(({ project }: { project: Project }) => {
    return (
        <motion.div
            className="w-[85vw] md:w-[600px] flex flex-col gap-6 cursor-pointer selection:none"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
        >
            {/* 1. Cinematic Image Container (16:9) */}
            <motion.div
                className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl group"
                whileHover={{
                    borderColor: "rgba(34, 211, 238, 0.4)",
                    boxShadow: "0 20px 60px rgba(34, 211, 238, 0.2)"
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Image */}
                {project.thumbnail ? (
                    <motion.div
                        className="relative w-full h-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 85vw, 600px"
                        />
                    </motion.div>
                ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 flex items-center justify-center`}>
                        <h4 className="text-2xl md:text-4xl font-syne font-bold text-white/20 p-8 text-center leading-tight">
                            {project.title}
                        </h4>
                    </div>
                )}

                {/* Overlay Gradient (Subtle) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Icon Badge */}
                <motion.div
                    className="absolute top-4 left-4 w-10 h-10 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                >
                    {project.icon}
                </motion.div>
            </motion.div>

            {/* 2. Info Content (Below Image) */}
            <div className="flex flex-col gap-3 px-2">

                {/* Header Line */}
                <div className="flex items-center justify-between">
                    <div>
                        <motion.h3
                            className="text-3xl font-syne font-bold text-white leading-tight"
                            whileHover={{ x: 5 }}
                        >
                            {project.title}
                        </motion.h3>
                        <p className="text-lg text-white/50 font-light">{project.subtitle}</p>
                    </div>
                </div>

                {/* Client & Link Row */}
                <div className="flex items-center gap-3 mt-1">
                    <motion.span
                        className="text-[10px] font-mono uppercase tracking-widest text-white/80 bg-white/10 px-3 py-1 rounded-full border border-white/20"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                        {project.client}
                    </motion.span>

                    {project.liveUrl && (
                        <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[10px] font-mono uppercase tracking-widest text-black pearl-bg px-3 py-1 rounded-full flex items-center gap-1"
                            whileHover={{ scale: 1.1, boxShadow: "0 4px 20px rgba(34, 211, 238, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Visit Live ↗
                        </motion.a>
                    )}
                </div>

                {/* Impact Metrics (Simple Line) */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/70 font-mono mt-1">
                    {project.impact.slice(0, 2).map((item, i) => (
                        <motion.div
                            key={i}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <span className="w-1 h-1 rounded-full bg-cyan-400" />
                            {item}
                        </motion.div>
                    ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                        <motion.span
                            key={i}
                            className="text-xs text-white/40 border border-white/5 px-2 py-1 rounded-md uppercase tracking-wider"
                            whileHover={{
                                borderColor: "rgba(34, 211, 238, 0.4)",
                                color: "rgba(255,255,255,0.8)",
                                scale: 1.05
                            }}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </div>

            </div>
        </motion.div>
    );
});

DiagonalPosterCard.displayName = "DiagonalPosterCard";
export default DiagonalPosterCard;
