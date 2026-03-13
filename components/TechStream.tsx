"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiThreedotjs,
  SiTailwindcss, SiNodedotjs, SiPython, SiDocker,
  SiPostgresql, SiOpenai, SiAmazon, SiGooglecloud,
  SiVercel, SiMongodb, SiRedis, SiTensorflow,
  SiPytorch, SiGraphql, SiFirebase, SiGit
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

const TechCard = ({ item }: { item: any }) => (
  <div className="flex flex-col items-center justify-center min-w-[70px] md:min-w-[140px] p-2 mx-1 md:mx-2 transition-transform duration-300 hover:scale-110 cursor-default">
    <div className="text-3xl md:text-6xl mb-1 md:mb-2 transition-transform">
      {item.icon}
    </div>
    <span className="text-[8px] md:text-xs font-mono text-white/40">
      {item.name}
    </span>
  </div>
);

function MarqueeRow({ direction = 1, speed = 40, isPaused = false, isMobile = false }: { 
  direction?: number; 
  speed?: number; 
  isPaused?: boolean;
  isMobile?: boolean;
}) {
  const items = useMemo(() => [...techItems, ...techItems, ...techItems], []);
  
  if (isPaused || isMobile) {
    // STATIC GRID on mobile for better performance
    return (
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-4">
        {techItems.map((item, i) => (
          <TechCard key={`static-${i}`} item={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden mask-gradient">
      <motion.div
        className="flex"
        animate={{ x: direction === -1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: speed, ease: "linear" },
        }}
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
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // PAUSE when not in view
    const observer = new IntersectionObserver(
      ([entry]) => setIsPaused(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);

  if (!mounted) return null;

  return (
    <section 
      ref={sectionRef}
      className="w-full min-h-[40vh] md:h-screen flex flex-col justify-center items-center bg-transparent relative overflow-hidden py-12 md:py-0"
    >
      <div className="w-full max-w-[1920px] mx-auto z-10 flex flex-col justify-center h-full">
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-8 px-4"
        >
          <h2 className="text-3xl md:text-7xl font-bold mb-2 md:mb-4">
            Powering <span className="animate-pearl">Innovation</span>
          </h2>
          <p className="text-white/60 text-sm md:text-lg max-w-2xl mx-auto">
            Cutting-edge technologies
          </p>
        </motion.div>

        <div className="relative w-full flex-grow flex flex-col justify-center gap-4 md:gap-6">
          <MarqueeRow 
            direction={-1} 
            speed={isMobile ? 80 : 40} 
            isPaused={isPaused}
            isMobile={isMobile}
          />
          {/* Only show second row on desktop */}
          {!isMobile && (
            <MarqueeRow 
              direction={1} 
              speed={35} 
              isPaused={isPaused}
              isMobile={false}
            />
          )}
        </div>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-purple-500/05 rounded-full blur-2xl md:blur-[120px]" />
      </div>

      <style jsx global>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
      `}</style>
    </section>
  );
}
