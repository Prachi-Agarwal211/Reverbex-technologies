"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiThreedotjs,
  SiTailwindcss, SiNodedotjs, SiPython, SiDocker,
  SiPostgresql, SiOpenai, SiAmazon, SiGooglecloud
} from "react-icons/si";

const techItems = [
  { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
  { name: "Three.js", icon: <SiThreedotjs className="text-white" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
  { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
  { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
  { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
  { name: "OpenAI", icon: <SiOpenai className="text-white" /> },
  { name: "AWS", icon: <SiAmazon className="text-[#FF9900]" /> },
  { name: "GCP", icon: <SiGooglecloud className="text-[#4285F4]" /> },
];

function TechCard({ item }: { item: any }) {
  return (
    <div className="flex flex-col items-center justify-center min-w-[120px] md:min-w-[180px] aspect-square p-4 md:p-8 m-2 md:m-4 transition-all duration-500 hover:scale-110 active:scale-95 cursor-default group border-2 border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/40 shadow-2xl" style={{ willChange: "transform" }}>
      <div className={`text-4xl md:text-7xl mb-4 transition-all duration-500 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]`}>
        {item.icon}
      </div>
      <span className="text-[12px] md:text-[14px] font-mono text-white font-bold tracking-widest uppercase group-hover:scale-110 transition-all duration-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        {item.name}
      </span>
    </div>
  );
}

function MarqueeRow({ direction = 1, speed = 60, isPaused = false }: { 
  direction?: number; 
  speed?: number; 
  isPaused?: boolean;
}) {
  const items = useMemo(() => [...techItems, ...techItems, ...techItems], []);
  const [adjustedSpeed, setAdjustedSpeed] = useState(speed);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setAdjustedSpeed(speed * 1.5);
    }
  }, [speed]);

  return (
    <div className="flex overflow-hidden mask-gradient py-4">
      <motion.div
        className="flex"
        animate={{ x: direction === -1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: adjustedSpeed, ease: "linear" },
        }}
        style={{ willChange: "transform" }}
      >
        {items.map((item, i) => (
          <TechCard key={`${item.name}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TechStream() {
  const [mounted, setMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      ([entry]) => setIsPaused(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <section 
      ref={sectionRef}
      id="capabilities"
      className="w-full min-h-screen flex flex-col justify-center items-center bg-transparent relative overflow-hidden py-32 md:py-64 border-t border-white/10"
    >
      <div className="w-full max-w-[1920px] mx-auto z-10 flex flex-col justify-center h-full">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="px-6 md:px-24 mb-24 md:mb-48"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-[3px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
            <span className="text-[14px] font-mono font-bold tracking-[0.5em] text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">Expertise</span>
          </div>
          <h2 className="text-5xl md:text-9xl font-bold tracking-tighter uppercase text-white leading-none drop-shadow-[0_0_50px_rgba(255,255,255,0.3)]">
            Neural <span className="text-white/60 italic">Ecosystem</span>
          </h2>
        </motion.div>

        <div className="relative w-full flex flex-col gap-4">
          <MarqueeRow direction={-1} speed={50} isPaused={isPaused} />
          <MarqueeRow direction={1} speed={45} isPaused={isPaused} />
        </div>
      </div>

      {/* Decorative Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent blur-3xl opacity-50" />
      </div>

      <style jsx global>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </section>
  );
}
