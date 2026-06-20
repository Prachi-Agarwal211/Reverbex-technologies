"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReverbexBond from "./ReverbexBond";
import Link from "next/link";

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
  const [activeTab, setActiveTab] = useState(0);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Hero Entry
    gsap.fromTo(
      ".cs-hero > *",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
    );

    // Section Reveals
    gsap.utils.toArray<HTMLElement>(".cs-section").forEach((section) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full text-white">
      {/* Hero */}
      <div className="cs-hero mb-24 border-b border-[#1A1A1A] pb-16">
        <div className="flex flex-wrap gap-3 mb-8">
          {study.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-[#1A1A1A] text-[#A0A0A0] text-xs font-mono uppercase tracking-widest rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] mb-6 text-white" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
          {study.client}
        </h1>
        <h2 className="text-[#EAB308] text-2xl md:text-4xl font-bold tracking-tight mb-8" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
          {study.resultTitle}
        </h2>
      </div>

      {/* The Story Grid */}
      <div className="cs-section grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
        <div className="lg:col-span-4">
          <h3 className="text-[#666666] text-xs font-semibold tracking-widest uppercase mb-4 sticky top-32">
            The Narrative
          </h3>
        </div>
        <div className="lg:col-span-8 space-y-16">
          
          <div className="group relative pl-8 border-l border-[#1A1A1A] hover:border-[#EAB308]/50 transition-colors duration-500">
            <div className="absolute w-3 h-3 bg-[#1A1A1A] group-hover:bg-[#EAB308] rounded-full -left-[6.5px] top-2 transition-colors duration-500"></div>
            <h4 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: "var(--font-heading), sans-serif" }}>The Challenge</h4>
            <p className="text-[#A0A0A0] text-lg leading-relaxed font-light">{study.problem}</p>
          </div>

          <div className="group relative pl-8 border-l border-[#1A1A1A] hover:border-[#EAB308]/50 transition-colors duration-500">
            <div className="absolute w-3 h-3 bg-[#1A1A1A] group-hover:bg-[#EAB308] rounded-full -left-[6.5px] top-2 transition-colors duration-500"></div>
            <h4 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: "var(--font-heading), sans-serif" }}>Our Research</h4>
            <p className="text-[#A0A0A0] text-lg leading-relaxed font-light">{study.research}</p>
          </div>

          <div className="group relative pl-8 border-l border-[#1A1A1A] hover:border-[#EAB308]/50 transition-colors duration-500">
            <div className="absolute w-3 h-3 bg-[#1A1A1A] group-hover:bg-[#EAB308] rounded-full -left-[6.5px] top-2 transition-colors duration-500"></div>
            <h4 className="text-2xl font-bold mb-4 text-[#EAB308]" style={{ fontFamily: "var(--font-heading), sans-serif" }}>The Solution</h4>
            <p className="text-white text-lg leading-relaxed font-medium">{study.solution}</p>
          </div>

        </div>
      </div>

      {/* Living Metrics */}
      <div className="cs-section mb-32 bg-[#0A0A0A] border border-[#1A1A1A] p-12 lg:p-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EAB308]/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
        <h3 className="text-white text-3xl font-bold mb-16 text-center" style={{ fontFamily: "var(--font-heading), sans-serif" }}>The Results</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {study.metrics.map((metric, idx) => (
            <div key={idx} className="text-center">
              <div className="text-5xl md:text-7xl font-black text-[#EAB308] mb-4" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
                {metric.prefix}{metric.value}{metric.suffix}
              </div>
              <div className="text-[#A0A0A0] text-sm uppercase tracking-widest font-semibold">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="cs-section mb-32">
        <h3 className="text-white text-2xl font-bold mb-8" style={{ fontFamily: "var(--font-heading), sans-serif" }}>Technology Stack</h3>
        <div className="flex flex-wrap gap-4">
          {study.techStack.map((tech, idx) => (
            <div key={idx} className="px-6 py-4 bg-[#0A0A0A] border border-[#1A1A1A] flex flex-col">
              <span className="text-[#666666] text-xs uppercase tracking-widest mb-1">{tech.category}</span>
              <span className="text-white font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="cs-section mb-32 bg-[#111111] border border-[#EAB308]/20 p-12 relative">
        <div className="text-[#EAB308] text-6xl font-serif absolute top-8 left-8 opacity-20">"</div>
        <p className="text-xl md:text-3xl text-white font-light leading-relaxed mb-8 relative z-10 italic">
          "{study.testimonial.quote}"
        </p>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-[#222222] rounded-full flex items-center justify-center text-[#EAB308] font-bold text-xl">
            {study.testimonial.name.charAt(0)}
          </div>
          <div>
            <div className="text-white font-bold">{study.testimonial.name}</div>
            <div className="text-[#A0A0A0] text-sm">{study.testimonial.title}, {study.testimonial.company}</div>
          </div>
        </div>
      </div>

      <div className="cs-section border-t border-[#1A1A1A] pt-20 flex flex-col items-center pb-12">
         <h2 className="text-3xl md:text-4xl font-black text-white mb-8" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
          Ready for your own success story?
        </h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <a
            href="https://wa.me/919929986743"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#EAB308] text-black text-base font-bold text-center hover:bg-white transition-colors duration-300"
          >
            Start Your Project
          </a>
          <Link
            href="/work"
            className="px-8 py-4 bg-transparent border border-[#333333] text-white text-base font-bold text-center hover:border-white transition-colors duration-300"
          >
            View More Work
          </Link>
        </div>
      </div>

    </div>
  );
}
