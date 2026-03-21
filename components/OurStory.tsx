"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FractalGlassBackground from "./FractalGlassBackground";

export default function OurStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const paragraphs = containerRef.current?.querySelectorAll('.story-paragraph');
      if (!paragraphs || paragraphs.length === 0) return;

      // Natural scroll animation - stagger fade up on scroll entry
      gsap.set(paragraphs, { opacity: 0, y: 40 });

      paragraphs.forEach((paragraph, i) => {
        gsap.to(paragraph, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: paragraph,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="story" className="relative w-full bg-[#020202] text-white py-32 md:py-48">
      <FractalGlassBackground />

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full flex flex-col gap-16 md:gap-24">
        <div className="story-paragraph">
          <p className="text-[clamp(1.75rem,4vw,3.5rem)] text-white/60 font-light leading-[1.3] tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            For the past 12 months, we operated in stealth. We weren&apos;t just building applications; we were engineering the <span className="text-white font-medium italic">connective tissue</span> that allows modern enterprises to scale without friction.
          </p>
        </div>

        <div className="story-paragraph">
          <p className="text-[clamp(1.75rem,4vw,3.5rem)] text-white/60 font-light leading-[1.3] tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            We obsessed over multi-agent workflows and secure data pipelines. Because true digital transformation isn&apos;t about shiny tools—it&apos;s about deploying AI that drives <span className="text-white font-medium italic">measurable business growth</span> and operational autonomy.
          </p>
        </div>

        <div className="story-paragraph">
          <p className="text-[clamp(1.75rem,4vw,3.5rem)] text-white/60 font-light leading-[1.3] tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Our foundational projects—from institutional databases to headless commerce—proved our architecture. Now, we are partnering with forward-thinking leaders to integrate <span className="text-white font-medium italic">production-grade intelligence</span> into their core business. Let&apos;s build your unfair advantage.
          </p>
        </div>
      </div>
    </section>
  );
}
