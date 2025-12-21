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
        <div className="w-[85vw] md:w-[600px] flex flex-col gap-6 group cursor-pointer selection:none">

            {/* 1. Cinematic Image Container (16:9) */}
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)] group-hover:border-white/20">

                {/* Image */}
                {project.thumbnail ? (
                    <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 85vw, 600px"
                    />
                ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 flex items-center justify-center`}>
                        <h4 className="text-2xl md:text-4xl font-syne font-bold text-white/20 p-8 text-center leading-tight">
                            {project.title}
                        </h4>
                    </div>
                )}

                {/* Overlay Gradient (Subtle) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-xl">
                    {project.icon}
                </div>
            </div>

            {/* 2. Info Content (Below Image) */}
            <div className="flex flex-col gap-3 px-2">

                {/* Header Line */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-3xl font-syne font-bold text-white leading-tight group-hover:text-white transition-colors duration-300">
                            {project.title}
                        </h3>
                        <p className="text-lg text-white/50 font-light">{project.subtitle}</p>
                    </div>
                </div>

                {/* Client & Link Row */}
                <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                        {project.client}
                    </span>

                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[10px] font-mono uppercase tracking-widest text-black pearl-bg px-3 py-1 rounded-full hover:scale-105 transition-transform flex items-center gap-1"
                        >
                            Visit Live ↗
                        </a>
                    )}
                </div>

                {/* Impact Metrics (Simple Line) */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/70 font-mono mt-1">
                    {project.impact.slice(0, 2).map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-white" />
                            {item}
                        </div>
                    ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-xs text-white/40 border border-white/5 px-2 py-1 rounded-md uppercase tracking-wider group-hover:border-white/20 transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>

            </div>
        </div>
    );
});

DiagonalPosterCard.displayName = "DiagonalPosterCard";
export default DiagonalPosterCard;
