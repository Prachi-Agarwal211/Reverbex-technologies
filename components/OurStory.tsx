"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FractalGlassBackground from "./FractalGlassBackground";

export default function OurStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !textWrapRef.current) return;
    
    const ctx = gsap.context(() => {
      const texts = textWrapRef.current?.querySelectorAll('.story-paragraph');
      if (!texts || texts.length === 0) return;
      
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
         // Pin the section and scrub through text fading
         gsap.set(texts, { opacity: 0, yPercent: 20 });
         
         const tl = gsap.timeline({
           scrollTrigger: {
             trigger: containerRef.current,
             start: "top top",
             end: "+=3000",
             scrub: 1,
             pin: true,
             anticipatePin: 1
           }
         });
         
         texts.forEach((text, i) => {
           tl.to(text, { opacity: 1, yPercent: 0, duration: 1 })
             .to(text, { opacity: i === texts.length - 1 ? 1 : 0, yPercent: i === texts.length - 1 ? 0 : -20, duration: 1 }, "+=0.8");
         });
      });

      mm.add("(max-width: 767px)", () => {
         // Mobile: simple fade up without pinning
         gsap.set(texts, { opacity: 0.2, y: 30 });
         texts.forEach((text) => {
            gsap.to(text, {
               opacity: 1, y: 0, 
               scrollTrigger: {
                 trigger: text,
                 start: "top 80%",
                 end: "top 50%",
                 scrub: true
               }
            });
         });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="story" className="relative w-full bg-[#020202] text-white min-h-screen flex items-center justify-center overflow-hidden py-32 md:py-0">
      <FractalGlassBackground />

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full flex flex-col md:block h-full md:h-[50vh]" ref={textWrapRef}>
        <div className="story-paragraph md:absolute md:top-1/2 md:left-6 md:right-6 md:transform md:-translate-y-1/2 mb-16 md:mb-0 hw-accelerated">
          <p className="text-[clamp(1.75rem,4vw,3.5rem)] text-white/60 font-light leading-[1.3] tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            For the past 12 months, we operated in stealth. We weren&apos;t just building applications; we were engineering the <span className="text-white font-medium italic">connective tissue</span> for autonomous enterprises.
          </p>
        </div>
        
        <div className="story-paragraph md:absolute md:top-1/2 md:left-6 md:right-6 md:transform md:-translate-y-1/2 mb-16 md:mb-0 hw-accelerated">
          <p className="text-[clamp(1.75rem,4vw,3.5rem)] text-white/60 font-light leading-[1.3] tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            We obsessed over multi-agent workflows, Model Context Protocol (MCP), and secure data pipelines. We didn&apos;t want models that just chat—we built infrastructures where AI <span className="text-white font-medium italic">reasons, integrates, and executes</span>.
          </p>
        </div>

        <div className="story-paragraph md:absolute md:top-1/2 md:left-6 md:right-6 md:transform md:-translate-y-1/2 hw-accelerated">
          <p className="text-[clamp(1.75rem,4vw,3.5rem)] text-white/60 font-light leading-[1.3] tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Our foundational projects—from complex institutional databases to headless commerce—were the proving grounds for this architecture. Now, we are deploying <span className="text-white font-medium italic">production-grade orchestration</span>. Welcome to the new standard.
          </p>
        </div>
      </div>
    </section>
  );
}
