"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const statements = [
  { 
    text: "AI Agents", 
    subtext: "Autonomous agents for your business",
    align: "left" 
  },
  { 
    text: "AI Automations", 
    subtext: "Intelligent workflow automation",
    align: "left" 
  },
  { 
    text: "CRM Systems", 
    subtext: "Custom customer relationship management",
    align: "left" 
  },
  { 
    text: "Custom Software", 
    subtext: "Tailored software solutions",
    align: "left" 
  },
];

export default function HeroVideo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

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

  // GSAP ScrollTrigger Effects
  useEffect(() => {
    if (!containerRef.current || !videoOverlayRef.current) return;

    const ctx = gsap.context(() => {
      // Video scale and opacity on scroll - creates distortion effect
      gsap.fromTo(videoRef.current, 
        { scale: 1, filter: "blur(0px)" },
        {
          scale: 1.15,
          filter: "blur(4px)",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          }
        }
      );

      // Video overlay opacity linked to scroll
      gsap.fromTo(videoOverlayRef.current,
        { opacity: 0.4 },
        {
          opacity: 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "center top",
            scrub: true,
          }
        }
      );

      // Text reveal animation on scroll
      if (textRef.current) {
        const textElements = textRef.current.querySelectorAll('.hero-text-char');
        gsap.fromTo(textElements,
          { opacity: 0.3, y: 20, rotateX: -30 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.02,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: 1,
            }
          }
        );
      }

      // Marquee parallax
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: "-25%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom 80%",
            end: "bottom top",
            scrub: 1,
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentStatement = statements[currentIndex];

  // Split text into characters for scroll animation
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span 
        key={i} 
        className="hero-text-char inline-block"
        style={{ display: 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section id="home" ref={containerRef} className="relative w-full h-screen flex flex-col justify-between overflow-hidden bg-[#050505]">
      {/* Continuous Moving Gradient Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Orb 1 - Primary blue gradient */}
        <div 
          className="ambient-orb w-[500px] h-[500px] bg-gradient-to-r from-blue-600/30 to-cyan-500/30"
          style={{ top: '10%', left: '10%', animationDelay: '0s' }}
        />
        {/* Orb 2 - Blue to yellow */}
        <div 
          className="ambient-orb w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/25 to-yellow-500/25"
          style={{ top: '50%', right: '15%', animationDelay: '-5s' }}
        />
        {/* Orb 3 - Blue accent */}
        <div 
          className="ambient-orb w-[350px] h-[350px] bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
          style={{ bottom: '20%', left: '30%', animationDelay: '-10s' }}
        />
        {/* Orb 4 - Yellow warm */}
        <div 
          className="ambient-orb w-[450px] h-[450px] bg-gradient-to-r from-yellow-500/20 to-amber-500/20"
          style={{ top: '30%', right: '40%', animationDelay: '-15s' }}
        />
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 mesh-gradient opacity-50" />
      </div>
      
      {/* Absolute Video Background only for Hero */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
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
        <div ref={videoOverlayRef} className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Top Spacer to account for Navbar */}
      <div className="h-24 md:h-32 w-full shrink-0 z-10" />

      {/* Middle Content - All Left, Positioned slightly lower than center */}
      <div ref={textRef} className="relative z-10 flex-1 flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-16 xl:px-24 pointer-events-none w-full mx-auto max-w-[1400px]">
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] text-gradient-animated mb-4 tracking-tight leading-[1.1] drop-shadow-lg" 
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", perspective: "1000px" }}
            >
              {splitText(currentStatement.text)}
            </h2>
            <p className="text-white/70 text-xs md:text-sm lg:text-base font-light tracking-[0.2em] uppercase mt-2 drop-shadow-md" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
              {currentStatement.subtext}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Running Services Bar with GSAP parallax */}
      <div ref={marqueeRef} className="relative z-10 w-[200%] overflow-hidden py-4 md:py-6 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="flex whitespace-nowrap items-center">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {["AI AGENTS", "AI AUTOMATIONS", "CRM SYSTEMS", "CUSTOM SOFTWARE", "PROCESS AUTOMATION", "WEB APPLICATIONS", "API INTEGRATION", "SYSTEM DESIGN"].map((item, j) => (
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
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-25%); } }
      `}</style>
    </section>
  );
}
