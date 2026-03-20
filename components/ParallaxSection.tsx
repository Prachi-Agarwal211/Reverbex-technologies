"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const capabilities = [
  { title: "Neural Architecture", desc: "Advanced AI systems built for scale" },
  { title: "Deep Learning", desc: "Intelligent models that learn and adapt" },
  { title: "Automation", desc: "Smart workflows that increase efficiency" },
  { title: "Cloud Solutions", desc: "Scalable infrastructure for modern needs" },
  { title: "Machine Learning", desc: "Data-driven insights and predictions" },
  { title: "Digital Transformation", desc: "Modern solutions for future-ready businesses" },
];

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transform values
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yHeader = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yCards = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  return (
    <section 
      id="capabilities" 
      ref={containerRef}
      className="relative w-full py-24 md:py-48 overflow-hidden bg-[#050505] flex items-center justify-center min-h-[100vh]"
    >
      {/* Scroll-Linked Grainy Background */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 z-0 h-[150%] origin-top opacity-[0.15] md:opacity-[0.25] mix-blend-screen pointer-events-none"
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '150px 150px'
          }}
        />
      </motion.div>
      
      {/* Animated Atmospheric Glows - Hidden on Mobile to save GPU */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-blue-950/10 to-[#050505] z-0 pointer-events-none" />
      <div className="hidden md:block absolute top-1/2 left-1/2 w-[50rem] h-[50rem] bg-indigo-600/10 rounded-full blur-[120px] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse duration-[7000ms]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        {/* Parallax Header */}
        <motion.div style={{ y: yHeader }} className="text-center mb-16 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl lg:text-[7rem] text-white mb-4 drop-shadow-xl tracking-tight leading-none" 
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Capabilities
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/50 text-xs md:text-base lg:text-lg max-w-2xl mx-auto font-light tracking-[0.1em] md:tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            End-to-end solutions for modern businesses
          </motion.p>
        </motion.div>

        {/* Parallax Cards */}
        <motion.div style={{ y: yCards }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 w-full max-w-6xl">
          {capabilities.map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={i} 
              className="p-6 md:p-10 border border-white/5 bg-[#0a0a0a] md:bg-white/[0.01] md:backdrop-blur-md hover:bg-[#111] md:hover:bg-white/[0.04] hover:border-white/15 transition-all duration-500 group rounded-2xl md:rounded-3xl relative overflow-hidden shadow-xl"
            >
              <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <h3 className="relative z-10 text-xl md:text-3xl text-white mb-2 md:mb-4 tracking-tight group-hover:text-yellow-400 md:group-hover:-translate-y-1 transition-all duration-500" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                {item.title}
              </h3>
              <p className="relative z-10 text-white/50 text-sm md:text-base font-light font-sans leading-relaxed md:group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
