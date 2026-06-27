"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Link from "next/link";
import ReverbexBond from "../../components/ReverbexBond";
import PageCTA from "../../components/PageCTA";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Split the text for cinematic reveal
    const textElements = containerRef.current.querySelectorAll(".reveal-text");
    
    if (!prefersReducedMotion) {
      textElements.forEach((element) => {
        const split = new SplitType(element as HTMLElement, { types: "words" });
        
        gsap.fromTo(
          split.words,
          { opacity: 0.1 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "bottom 40%",
              scrub: true,
            }
          }
        );
      });

      // Pin the massive 100% block
      const statBlock = containerRef.current.querySelector(".stat-block");
      if (statBlock) {
        gsap.to(statBlock, {
          scale: 0.95,
          opacity: 0.5,
          scrollTrigger: {
            trigger: statBlock,
            start: "center center",
            end: "bottom top",
            scrub: true,
            pin: true,
            pinSpacing: false,
          }
        });
      }
    }

    return () => {
      textElements.forEach((el) => {
        // Clean up SplitType instances if needed
        (el as any).split?.revert();
      });
    };
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="w-full text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30 overflow-hidden relative bg-[#050505]">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#EAB308]/10 blur-[200px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Cinematic Header */}
        <div className="mb-40 pt-16">
          <span className="text-[#EAB308] text-sm font-semibold tracking-widest uppercase block mb-6">
            Our Philosophy
          </span>
          <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-black tracking-tighter leading-[0.95] mb-12">
            Engineering Without Compromise.
          </h1>
        </div>
        
        {/* Text Reveal Section */}
        <div className="mb-40 max-w-5xl ml-auto border-l border-[#1A1A1A] pl-8 md:pl-16">
          <p className="reveal-text text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.2] mb-16 text-white">
            The digital agency model is broken. Most agencies function as middlemen—selling you a custom project, but delivering a cheap WordPress template modified by junior developers.
          </p>
          <p className="reveal-text text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.2] mb-16 text-[#D0D0D0] text-shadow-body">
            We started Reverbex Technologies to build the exact antithesis of that model.
          </p>
        </div>

        {/* Pinned Stat Block */}
        <div className="stat-block h-screen flex flex-col items-center justify-center mb-40">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#EAB308]/20 rounded-full blur-[100px] transition-transform duration-1000 group-hover:scale-150" />
            <h2 className="text-[clamp(8rem,20vw,20rem)] font-black text-[#EAB308] leading-none tracking-tighter relative z-10 drop-shadow-[0_0_50px_rgba(234,179,8,0.3)]">
              100%
            </h2>
          </div>
          <p className="text-white text-2xl md:text-4xl font-bold uppercase tracking-widest mt-8 z-10">
            In-House Engineering
          </p>
          <p className="text-[#D0D0D0] text-lg font-medium mt-4 z-10 max-w-md text-center text-shadow-body">
            Zero templates. Zero outsourcing. Every line of code is written by senior developers.
          </p>
        </div>

        {/* The Reverbex Standard Grid */}
        <div className="mb-40">
          <h2 className="text-4xl md:text-6xl font-black mb-16 border-b border-[#1A1A1A] pb-8">The Standard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            <div className="group">
              <div className="text-[#EAB308] font-black text-6xl mb-4 opacity-30 group-hover:opacity-100 transition-opacity duration-300">01</div>
              <h3 className="text-2xl font-bold mb-4">Direct Senior Access</h3>
              <p className="text-[#D0D0D0] text-lg leading-relaxed font-medium text-shadow-body">No account managers playing broken telephone. You speak directly with the engineers and strategists building your project.</p>
            </div>
            <div className="group">
              <div className="text-[#EAB308] font-black text-6xl mb-4 opacity-30 group-hover:opacity-100 transition-opacity duration-300">02</div>
              <h3 className="text-2xl font-bold mb-4">100% Code Ownership</h3>
              <p className="text-[#D0D0D0] text-lg leading-relaxed font-medium text-shadow-body">You own every line of code we write. No platform lock-in, no mandatory ongoing subscriptions just to keep your site live.</p>
            </div>
            <div className="group">
              <div className="text-[#EAB308] font-black text-6xl mb-4 opacity-30 group-hover:opacity-100 transition-opacity duration-300">03</div>
              <h3 className="text-2xl font-bold mb-4">Performance Obsession</h3>
              <p className="text-[#D0D0D0] text-lg leading-relaxed font-medium text-shadow-body">If it doesn't load instantly, we rewrite it. We guarantee 100/100 Core Web Vitals for maximum SEO ranking.</p>
            </div>
            <div className="group">
              <div className="text-[#EAB308] font-black text-6xl mb-4 opacity-30 group-hover:opacity-100 transition-opacity duration-300">04</div>
              <h3 className="text-2xl font-bold mb-4">Data-Driven Strategy</h3>
              <p className="text-[#D0D0D0] text-lg leading-relaxed font-medium text-shadow-body">No vanity metrics. We only track what matters: leads generated, costs reduced, and revenue increased.</p>
            </div>
          </div>
        </div>

        <div className="mb-40">
          <ReverbexBond />
        </div>

        <PageCTA />

      </div>
    </main>
  );
}
