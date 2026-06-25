"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReverbexBond from "./ReverbexBond";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface IndustryClientProps {
  industry: {
    name: string;
    tagline: string;
    challenges: string[];
    solutions: string[];
    metrics: { value: string; label: string }[];
    relatedCaseStudySlug?: string;
    relatedCaseStudyName?: string;
  };
}

export default function IndustryClient({ industry }: IndustryClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      ".ind-hero > *",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
    );

    gsap.utils.toArray<HTMLElement>(".ind-section").forEach((section) => {
      gsap.fromTo(
        section,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full text-white">
      
      {/* Hero */}
      <div className="ind-hero mb-20 text-center max-w-4xl mx-auto">
        <span className="text-[#EAB308] text-sm font-semibold tracking-widest uppercase block mb-6">
          Industry Focus
        </span>
        <h1 className="font-heading text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-8">
          {industry.name}
        </h1>
        <p className="text-[#A0A0A0] text-xl md:text-2xl font-light leading-relaxed">
          {industry.tagline}
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="ind-section mb-32 grid grid-cols-2 gap-px bg-[#1A1A1A] border border-[#1A1A1A]">
        {industry.metrics.map((metric, idx) => (
          <div key={idx} className="bg-[#0A0A0A] p-12 text-center flex flex-col justify-center">
            <div className="font-heading text-4xl md:text-6xl font-black text-[#EAB308] mb-4">
              {metric.value}
            </div>
            <div className="text-[#A0A0A0] text-sm uppercase tracking-widest font-semibold">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Challenges vs Solutions */}
      <div className="ind-section mb-32">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-center mb-16">
          Breaking Industry Bottlenecks
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-8 md:p-12">
            <h3 className="text-red-500/80 text-lg font-semibold tracking-wider uppercase mb-8 border-b border-red-500/20 pb-4">
              Common Challenges
            </h3>
            <ul className="space-y-8">
              {industry.challenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start gap-4 text-[#A0A0A0] text-lg">
                  <span className="text-red-500/50 mt-1 block">✕</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-[#111111] border border-[#EAB308]/20 p-8 md:p-12 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAB308]/5 rounded-full blur-3xl -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-150"></div>
            <h3 className="text-[#EAB308] text-lg font-semibold tracking-wider uppercase mb-8 border-b border-[#EAB308]/20 pb-4 relative z-10">
              The Reverbex Engine
            </h3>
            <ul className="space-y-8 relative z-10">
              {industry.solutions.map((solution, idx) => (
                <li key={idx} className="flex items-start gap-4 text-white font-medium text-lg">
                  <span className="text-green-500 mt-1 block">✓</span>
                  <span>{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Optional Case Study Link */}
      {industry.relatedCaseStudySlug && (
        <div className="ind-section mb-32">
          <Link 
            href={`/work/${industry.relatedCaseStudySlug}`}
            className="block w-full bg-[#1A1A1A] hover:bg-[#222] transition-colors duration-300 p-12 text-center border border-[#333]"
          >
            <span className="text-[#666] text-sm uppercase tracking-widest block mb-4">View Featured Case Study</span>
            <span className="font-heading text-2xl md:text-4xl font-bold text-white block mb-4">
              {industry.relatedCaseStudyName}
            </span>
            <span className="text-[#EAB308] font-semibold uppercase tracking-wider inline-flex items-center gap-2">
              Read the Full Story <span>→</span>
            </span>
          </Link>
        </div>
      )}

      {/* The Reverbex Bond */}
      <div className="ind-section mb-32">
        <ReverbexBond />
      </div>

      <div className="ind-section border-t border-[#1A1A1A] pt-20 flex flex-col items-center pb-12 text-center">
         <h2 className="font-heading text-3xl md:text-5xl font-black text-white mb-6">
          Ready to dominate your industry?
        </h2>
        <p className="text-[#A0A0A0] text-lg mb-10 max-w-2xl mx-auto">
          We build custom engineering solutions tailored specifically to the {industry.name} sector.
        </p>
        <a
          href="https://wa.me/919929986743"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-5 bg-[#EAB308] text-black text-lg font-bold hover:bg-white transition-colors duration-300"
        >
          Consult with an Expert
        </a>
      </div>

    </div>
  );
}
