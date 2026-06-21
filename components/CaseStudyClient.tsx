"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyClientProps {
  study: {
    client: string;
    resultTitle: string;
    tags: string[];
    problem: string;
    research: string;
    solution: string;
    techStack: { name: string; category: string }[];
    metrics: { value: string; label: string; prefix?: string; suffix?: string }[];
    testimonial: {
      quote: string;
      name: string;
      title: string;
      company: string;
    };
  };
}

export default function CaseStudyClient({ study }: CaseStudyClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  
  // State for the sticky title morphing
  const [activeNarrativeSection, setActiveNarrativeSection] = useState("The Challenge");

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // 1. Hero Entry Animation
    gsap.fromTo(
      ".cs-hero > *",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
    );

    // 2. Narrative Section - Sticky Morphing Trigger
    if (narrativeRef.current) {
      const sections = narrativeRef.current.querySelectorAll(".narrative-block");
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveNarrativeSection(section.getAttribute("data-title") || ""),
          onEnterBack: () => setActiveNarrativeSection(section.getAttribute("data-title") || ""),
        });
        
        // Also fade in the paragraphs
        gsap.fromTo(
          section,
          { opacity: 0.2, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 50%",
              scrub: true,
            }
          }
        );
      });
    }

    // 3. Metrics Counters Animation
    const metrics = containerRef.current.querySelectorAll(".metric-value");
    metrics.forEach((metric) => {
      // Get the raw number from the data attribute
      const endValue = parseFloat(metric.getAttribute("data-value") || "0");
      // Create a proxy object to animate
      const proxy = { val: 0 };
      
      gsap.to(proxy, {
        val: endValue,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: metric,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        onUpdate: () => {
          // If it's a whole number, don't show decimals. Otherwise show 1 decimal point.
          metric.innerHTML = endValue % 1 === 0 
            ? Math.round(proxy.val).toString()
            : proxy.val.toFixed(1);
        }
      });
      
      // Fade in the whole metric block
      gsap.fromTo(
        metric.parentElement,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: metric.parentElement,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // 4. Testimonial Fade Up
    const testimonial = containerRef.current.querySelector(".cs-testimonial");
    if (testimonial) {
      gsap.fromTo(
        testimonial,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonial,
            start: "top 85%",
          }
        }
      );
    }

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full text-white pb-32">
      {/* 1. Dynamic Hero Section */}
      <div className="cs-hero relative mb-32 pt-16">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[#EAB308]/10 blur-[150px] rounded-full pointer-events-none -z-10" />
        
        <div className="flex flex-wrap gap-3 mb-8">
          {study.tags.map((tag, i) => (
            <span key={i} className="px-4 py-1.5 bg-white/5 border border-white/10 text-[#A0A0A0] text-xs font-semibold uppercase tracking-widest rounded-full backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-[clamp(3rem,8vw,7rem)] font-black tracking-tighter leading-[1.0] mb-8 text-white">
          {study.client}.
        </h1>
        
        <h2 className="text-[#EAB308] text-[clamp(1.5rem,4vw,3rem)] font-bold tracking-tight mb-12 max-w-4xl leading-tight">
          {study.resultTitle}
        </h2>
        
        <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
      </div>

      {/* 2. Sticky Narrative Layout */}
      <div className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative" ref={narrativeRef}>
        {/* Left Side: Sticky Morphing Title */}
        <div className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-40">
            <span className="text-[#666666] text-xs font-semibold tracking-widest uppercase mb-4 block">
              The Narrative
            </span>
            <h3 className="text-4xl font-bold text-white transition-all duration-500 transform translate-y-0 opacity-100">
              {activeNarrativeSection}
            </h3>
          </div>
        </div>

        {/* Right Side: Scrolling Content */}
        <div className="lg:col-span-8 space-y-32">
          <div className="narrative-block" data-title="The Challenge">
            {/* Mobile Title (Hidden on Desktop) */}
            <h3 className="text-3xl font-bold text-white mb-6 lg:hidden">The Challenge</h3>
            <p className="text-[#A0A0A0] text-xl md:text-2xl leading-relaxed font-light">
              {study.problem}
            </p>
          </div>

          <div className="narrative-block" data-title="Our Research">
            <h3 className="text-3xl font-bold text-white mb-6 lg:hidden">Our Research</h3>
            <p className="text-[#A0A0A0] text-xl md:text-2xl leading-relaxed font-light">
              {study.research}
            </p>
          </div>

          <div className="narrative-block" data-title="The Solution">
            <h3 className="text-3xl font-bold text-[#EAB308] mb-6 lg:hidden">The Solution</h3>
            <p className="text-white text-xl md:text-2xl leading-relaxed font-medium bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
              <span className="absolute top-0 left-0 w-2 h-full bg-[#EAB308]" />
              {study.solution}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Immersive Living Metrics */}
      <div className="mb-40 bg-[#050505] rounded-[3rem] border border-[#1A1A1A] p-12 lg:p-24 relative overflow-hidden group">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl max-h-96 bg-[#EAB308]/5 rounded-full blur-[100px] opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <h3 className="text-white/50 text-sm font-semibold uppercase tracking-widest text-center mb-20">
          The Impact
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
          {study.metrics.map((metric, idx) => {
            // Extract numbers from the string for GSAP animation
            const numMatch = metric.value.match(/[\d.]+/);
            const numValue = numMatch ? numMatch[0] : "0";
            
            return (
              <div key={idx} className="text-center flex flex-col items-center justify-center">
                <div className="flex items-baseline justify-center text-6xl md:text-8xl font-black text-[#EAB308] mb-6 tracking-tighter">
                  {metric.prefix && <span className="text-4xl md:text-6xl mr-1">{metric.prefix}</span>}
                  <span className="metric-value" data-value={numValue}>0</span>
                  {metric.suffix && <span className="text-4xl md:text-6xl ml-1">{metric.suffix}</span>}
                </div>
                <div className="text-white/80 text-sm md:text-base font-medium tracking-wide bg-white/5 px-6 py-2 rounded-full border border-white/10">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Glassmorphic Tech Stack */}
      <div className="mb-40">
        <h3 className="text-white/50 text-sm font-semibold uppercase tracking-widest mb-12 text-center md:text-left">
          Technology Stack
        </h3>
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          {study.techStack.map((tech, idx) => (
            <div key={idx} className="px-8 py-5 bg-[#0A0A0A]/50 backdrop-blur-md border border-[#1A1A1A] rounded-2xl flex flex-col hover:border-[#EAB308]/50 hover:-translate-y-1 transition-all duration-300">
              <span className="text-[#666666] text-[10px] uppercase tracking-[0.2em] mb-2">{tech.category}</span>
              <span className="text-white font-bold text-lg">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Cinematic Testimonial */}
      <div className="cs-testimonial mb-40 relative px-6 md:px-16 py-16 md:py-24 overflow-hidden">
        {/* Giant background quotes */}
        <div className="text-[#111111] text-[15rem] leading-none font-serif absolute -top-8 -left-8 -z-10 select-none">"</div>
        <div className="text-[#111111] text-[15rem] leading-none font-serif absolute -bottom-24 right-0 -z-10 select-none rotate-180">"</div>
        
        <p className="text-2xl md:text-4xl lg:text-5xl text-white font-light leading-[1.4] mb-16 relative z-10 text-center max-w-5xl mx-auto">
          "{study.testimonial.quote}"
        </p>
        
        <div className="flex flex-col items-center gap-4 relative z-10 text-center">
          <div className="w-16 h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center text-[#EAB308] font-bold text-2xl border border-white/10">
            {study.testimonial.name.charAt(0)}
          </div>
          <div>
            <div className="text-white font-bold text-xl mb-1">{study.testimonial.name}</div>
            <div className="text-[#A0A0A0] text-sm uppercase tracking-widest">{study.testimonial.title}, {study.testimonial.company}</div>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="border-t border-[#1A1A1A] pt-32 flex flex-col items-center text-center">
         <h2 className="text-4xl md:text-6xl font-black text-white mb-12 max-w-2xl leading-tight">
          Ready to engineer your own success story?
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <a
            href="https://wa.me/919929986743"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 bg-[#EAB308] text-black text-lg font-bold text-center rounded-xl hover:scale-105 transition-transform duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            Start Your Project <ArrowUpRight className="w-5 h-5" />
          </a>
          <Link
            href="/work"
            className="px-10 py-5 bg-transparent border border-[#333333] text-white text-lg font-bold text-center rounded-xl hover:bg-white/5 transition-colors duration-300 w-full sm:w-auto"
          >
            View More Work
          </Link>
        </div>
      </div>

    </div>
  );
}
