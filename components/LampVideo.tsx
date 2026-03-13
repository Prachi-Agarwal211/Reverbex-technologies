"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface LampVideoProps {
  videoSrc?: string;
  posterSrc?: string;
  className?: string;
  lampColor?: string;
  lampIntensity?: number;
}

export default function LampVideo({
  videoSrc = "/Reverbex_logo.mp4",
  posterSrc = "/logo.PNG",
  className = "",
  lampColor = "#22d3ee", // Cyan by default
  lampIntensity = 1.5,
}: LampVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lampY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "30%", "0%"]);
  const lampOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full max-w-3xl aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden ${className}`}
    >
      {/* Lamp Glow Effect - Behind everything */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: lampY,
          opacity: lampOpacity,
          scale: glowScale,
        }}
      >
        {/* Main lamp glow */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[80px] md:blur-[120px]"
          style={{
            background: `radial-gradient(ellipse at center, ${lampColor} 0%, transparent 70%)`,
            opacity: 0.6 * lampIntensity,
            top: "-50%",
          }}
        />
        
        {/* Secondary glow layer */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full blur-[60px] md:blur-[80px]"
          style={{
            background: `radial-gradient(ellipse at center, #a855f7 0%, transparent 60%)`,
            opacity: 0.4 * lampIntensity,
            top: "-30%",
          }}
        />
        
        {/* Subtle third layer for depth */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[100px] md:blur-[150px]"
          style={{
            background: `radial-gradient(ellipse at center, #e879f9 0%, transparent 50%)`,
            opacity: 0.2 * lampIntensity,
            top: "-40%",
          }}
        />
      </motion.div>

      {/* Animated light sweep effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              180deg,
              transparent 0%,
              ${lampColor}10 30%,
              ${lampColor}20 50%,
              ${lampColor}10 70%,
              transparent 100%
            )`,
          }}
          animate={{
            y: ["-100%", "100%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Border gradient */}
      <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-white/20">
        <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-b from-white/5 to-black/20" />
      </div>

      {/* Video container with glass effect */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <div className="relative w-full h-full bg-black/30 backdrop-blur-sm rounded-xl flex items-center justify-center overflow-hidden">
          {/* Inner glow */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at center, ${lampColor}20 0%, transparent 60%)`,
            }}
          />
          
          {/* Video */}
          <video
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsLoaded(true)}
            className="relative z-10 w-full h-full object-contain mix-blend-screen opacity-90"
          />
        </div>
      </div>

      {/* Bottom reflection */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px opacity-30"
        style={{
          background: `linear-gradient(90deg, transparent, ${lampColor}, transparent)`,
        }}
      />
    </div>
  );
}

// Alternative: A simpler version with just the lamp header effect
interface LampHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function LampHeader({ children, className = "" }: LampHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, 50]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Lamp light */}
      <motion.div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ opacity }}
      >
        <div 
          className="w-full h-full rounded-full blur-[100px]"
          style={{
            background: "radial-gradient(ellipse at center, #22d3ee 0%, #a855f7 40%, transparent 70%)",
            opacity: 0.5,
          }}
        />
      </motion.div>
      
      {/* Content */}
      <motion.div style={{ y, opacity }}>
        {children}
      </motion.div>
    </div>
  );
}
