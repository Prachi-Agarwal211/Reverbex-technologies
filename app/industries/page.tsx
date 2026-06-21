"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { industriesData } from "../../lib/industriesData";

export default function IndustriesIndexPage() {
  const containerRef = useRef<HTMLElement>(null);
  const industries = Object.entries(industriesData);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      ".industry-header > *",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
    );

    gsap.fromTo(
      ".accordion-item",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.4 }
    );
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="w-full text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30 bg-[#030303] overflow-hidden">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="industry-header mb-20 max-w-4xl">
          <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            Industry Sectors
          </span>
          <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-black tracking-tighter leading-[0.95] mb-8">
            Built for Your Vertical.
          </h1>
          <p className="text-[#A0A0A0] text-xl md:text-2xl font-light leading-relaxed">
            Generic solutions don't work in specialized markets. We build engineering systems and marketing engines tailored to the exact challenges of your industry.
          </p>
        </div>

        {/* Dynamic Hover Accordion */}
        <div className="w-full flex flex-col gap-2">
          {industries.map(([slug, industry], idx) => {
            const isHovered = hoveredIdx === idx;
            
            return (
              <Link 
                key={slug} 
                href={`/industries/${slug}`}
                className="accordion-item relative overflow-hidden bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  height: isHovered ? "350px" : "120px",
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Background Image that fades in on hover */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-0 group-hover:opacity-30 group-hover:scale-105"
                  style={{ backgroundImage: `url(/ambient-bg.png)` }}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent opacity-80" />

                <div className="relative z-10 w-full h-full p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex justify-between items-start w-full">
                    <h2 className="text-3xl md:text-5xl font-black text-white group-hover:text-[#EAB308] transition-colors duration-500">
                      {industry.name}
                    </h2>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#EAB308] group-hover:border-[#EAB308] group-hover:text-black transition-all duration-500">
                      <span className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500 font-bold">→</span>
                    </div>
                  </div>
                  
                  <div 
                    className="w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transform: `translateY(${isHovered ? '0' : '20px'})`
                    }}
                  >
                    <p className="text-white text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-6">
                      {industry.tagline}
                    </p>
                    <div className="text-xs font-semibold tracking-widest uppercase text-[#EAB308]">
                      Explore Solutions
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
