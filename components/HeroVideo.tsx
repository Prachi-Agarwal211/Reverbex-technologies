"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const statements = [
  { text: "AI Automations", subtext: "Streamline your business", align: "left" },
  { text: "Premium Websites", subtext: "Convert visitors to customers", align: "left" },
  { text: "Mobile Apps", subtext: "Reach users everywhere", align: "left" },
  { text: "AI Agents", subtext: "Intelligent solutions", align: "left" },
];

export default function HeroVideo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(e => console.log("Autoplay prevented:", e));
    }
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % statements.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const currentStatement = statements[currentIndex];

  return (
    <section id="home" className="relative w-full h-screen flex flex-col justify-between overflow-hidden bg-[#050505]">
      {/* Absolute Video Background only for Hero */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay for text readability */}
      </div>
      
      {/* Top Spacer to account for Navbar */}
      <div className="h-24 md:h-32 w-full shrink-0 z-10" />

      {/* Middle Content - All Left, Positioned slightly lower than center */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-16 xl:px-24 pointer-events-none w-full mx-auto max-w-[1400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -50, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 50, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col w-full md:w-[70%] lg:w-[60%] items-start text-left mr-auto"
          >
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] text-white mb-4 tracking-tight leading-[1.1] drop-shadow-lg" 
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {currentStatement.text}
            </h2>
            <p className="text-white/70 text-xs md:text-sm lg:text-base font-light tracking-[0.2em] uppercase mt-2 drop-shadow-md" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              {currentStatement.subtext}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Running Services Bar */}
      <div className="relative z-10 w-full overflow-hidden py-4 md:py-6 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              {["MACHINE LEARNING", "CLOUD SOLUTIONS", "CUSTOM SOFTWARE", "DATA ANALYTICS", "AI INTEGRATION", "NEURAL NETWORKS", "API DEVELOPMENT", "SYSTEM ARCHITECTURE"].map((item, j) => (
                <div key={`${i}-${j}`} className="flex items-center mx-6 md:mx-10">
                  <span className="text-white/70 text-xs md:text-sm font-semibold tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                    {item}
                  </span>
                  <span className="text-yellow-500/60 mx-6 md:mx-10 text-lg md:text-xl font-light">✦</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
      `}</style>
    </section>
  );
}
