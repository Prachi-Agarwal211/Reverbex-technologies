"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FractalGlassBackground from "./FractalGlassBackground";

const StoryParagraph = ({
  children,
  highlightIndices
}: {
  children: React.ReactNode;
  highlightIndices: number[]
}) => {
  const paragraphRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!paragraphRef.current) return;

    const mm = gsap.matchMedia();

    // Desktop: word-by-word reveal
    mm.add("(min-width: 768px)", () => {
      const words = paragraphRef.current?.querySelectorAll('.story-word > span');
      if (!words || words.length === 0) return;

      gsap.set(words, { yPercent: 110 });

      gsap.to(words, {
        yPercent: 0,
        duration: 0.7,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Highlighted spans fade effect
      const highlights = paragraphRef.current?.querySelectorAll('.highlight-span');
      if (highlights && highlights.length > 0) {
        gsap.fromTo(highlights,
          { backgroundColor: "rgba(234, 179, 8, 0.2)" },
          {
            backgroundColor: "rgba(234, 179, 8, 0)",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Left border accent
      const borderAccent = paragraphRef.current?.querySelector('.border-accent');
      if (borderAccent) {
        gsap.fromTo(borderAccent,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, { scope: paragraphRef });

  // Mobile: use CSS data-reveal system (same as other sections)
  useEffect(() => {
    if (!paragraphRef.current) return;
    
    // Set data-reveal attribute for mobile
    paragraphRef.current.setAttribute('data-reveal', 'fade-up');
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          paragraphRef.current?.setAttribute('data-visible', 'true');
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    
    observer.observe(paragraphRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={paragraphRef} className="story-paragraph relative">
      <div className="border-accent absolute left-0 top-0 bottom-0 w-px bg-white/8 origin-top hidden md:block" />
      <div className="pl-0 md:pl-6">
        {children}
      </div>
    </div>
  );
};

const WordRevealText = ({ text, highlightIndices }: { text: string; highlightIndices: number[] }) => {
  const words = text.split(' ');

  return (
    <p
      className="text-[clamp(1.3rem,4vw,2.2rem)] md:text-[clamp(1.6rem,3.5vw,3.2rem)] text-white/80 md:text-white/60 font-light leading-[1.35] md:leading-[1.3] tracking-tight"
      style={{ fontFamily: "var(--font-syne), sans-serif" }}
    >
      {words.map((word, i) => {
        const isHighlighted = highlightIndices.includes(i);

        return (
          <span key={i} className="story-word inline-block overflow-hidden mr-[0.25em] align-top">
            <span className={`inline-block ${isHighlighted ? 'highlight-span px-0.5 md:px-1 rounded bg-yellow-500/10' : ''}`}>
              {word}
            </span>
          </span>
        );
      })}
    </p>
  );
};

export default function OurStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const paragraphs = [
    {
      text: "For the past 12 months, we operated in stealth. We weren't just building applications; we were engineering the connective tissue that allows modern enterprises to scale without friction.",
      highlights: [13, 14]
    },
    {
      text: "We obsessed over multi-agent workflows and secure data pipelines. Because true digital transformation isn't about shiny tools—it's about deploying AI that drives measurable business growth and operational autonomy.",
      highlights: [24, 25, 26]
    },
    {
      text: "Our foundational projects—from institutional databases to headless commerce—proved our architecture. Now, we are partnering with forward-thinking leaders to integrate production-grade intelligence into their core business. Let's build your unfair advantage.",
      highlights: [21, 22]
    }
  ];

  return (
    <section 
      ref={containerRef} 
      id="story" 
      className="relative w-full bg-[#020202] text-white pt-32 pb-24 md:py-48 overflow-hidden"
    >
      {/* Gradient overlay at top for section transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-20" />
      
      {/* Colored ambient orbs for mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden md:hidden">
        <div className="absolute top-20 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
        <div className="absolute top-40 left-10 w-48 h-48 bg-cyan-600/15 blur-[80px] rounded-full" />
        <div className="absolute bottom-20 right-10 w-56 h-56 bg-purple-600/15 blur-[90px] rounded-full" />
      </div>

      <FractalGlassBackground />

      <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10 w-full flex flex-col gap-12 md:gap-24">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4 md:mb-8">
          <div className="h-px bg-white/10 flex-1 max-w-[60px]" />
          <span className="text-yellow-500 text-[clamp(0.65rem,1.5vw,0.85rem)] font-light tracking-[0.2em] uppercase tabular">
            Our Story
          </span>
          <div className="h-px bg-white/10 flex-1 max-w-[60px]" />
        </div>
        {paragraphs.map((para, index) => (
          <StoryParagraph key={index} highlightIndices={para.highlights}>
            <WordRevealText text={para.text} highlightIndices={para.highlights} />
          </StoryParagraph>
        ))}
      </div>
    </section>
  );
}
