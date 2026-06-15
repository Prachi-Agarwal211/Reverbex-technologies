"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { X, Check } from "lucide-react";

export default function PremiumPositioning() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".premium-reveal",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="premiumpositioning"
      className="w-full py-24 bg-[#0A0A0A] border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 md:mb-20 max-w-3xl">
          <span
            className="premium-reveal text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            ROI Comparison
          </span>
          <h2
            className="premium-reveal text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.0] mb-6"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Why Premium Beats Cheap.
          </h2>
          <p
            className="premium-reveal text-[#A0A0A0] text-lg font-normal leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            A website that costs ₹20,000 but brings zero customers costs more in the long run than a custom system built to generate revenue.
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Template Site */}
          <div className="premium-reveal p-8 bg-[#050505] border border-[#1A1A1A] rounded-xl hover:border-red-500/20 transition-colors duration-300">
            <h3
              className="text-white text-2xl font-bold mb-2"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              ₹20,000 Template Site
            </h3>
            <span className="text-[#666666] text-sm block mb-6">Built by template agencies</span>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-[#A0A0A0] text-sm">
                <X className="w-5 h-5 text-red-500 shrink-0" />
                <span>58/100 PageSpeed score</span>
              </li>
              <li className="flex items-center gap-3 text-[#A0A0A0] text-sm">
                <X className="w-5 h-5 text-red-500 shrink-0" />
                <span>3.8s average load time</span>
              </li>
              <li className="flex items-center gap-3 text-[#A0A0A0] text-sm">
                <X className="w-5 h-5 text-red-500 shrink-0" />
                <span>5 leads generated per month (vanity traffic)</span>
              </li>
              <li className="flex items-center gap-3 text-[#A0A0A0] text-sm">
                <X className="w-5 h-5 text-red-500 shrink-0" />
                <span>You don&apos;t own the code (locked into builder fees)</span>
              </li>
              <li className="flex items-center gap-3 text-[#A0A0A0] text-sm">
                <X className="w-5 h-5 text-red-500 shrink-0" />
                <span>Agency disappears after launch (no updates)</span>
              </li>
            </ul>
          </div>

          {/* Reverbex Custom Site */}
          <div className="premium-reveal p-8 bg-[#050505] border border-[#EAB308]/20 rounded-xl hover:border-[#EAB308] transition-colors duration-300 relative">
            <div className="absolute top-4 right-4 bg-[#EAB308]/10 text-[#EAB308] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
              Recommended
            </div>
            
            <h3
              className="text-white text-2xl font-bold mb-2"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              ₹2,00,000 Custom Site
            </h3>
            <span className="text-[#EAB308] text-sm block mb-6">Engineered by Reverbex</span>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-[#F5F5F0] text-sm font-medium">
                <Check className="w-5 h-5 text-[#22C55E] shrink-0" />
                <span>100/100 PageSpeed score</span>
              </li>
              <li className="flex items-center gap-3 text-[#F5F5F0] text-sm font-medium">
                <Check className="w-5 h-5 text-[#22C55E] shrink-0" />
                <span>0.8s load time (instant load)</span>
              </li>
              <li className="flex items-center gap-3 text-[#F5F5F0] text-sm font-medium">
                <Check className="w-5 h-5 text-[#22C55E] shrink-0" />
                <span>25+ qualified leads per month (+400% increase)</span>
              </li>
              <li className="flex items-center gap-3 text-[#F5F5F0] text-sm font-medium">
                <Check className="w-5 h-5 text-[#22C55E] shrink-0" />
                <span>Full code ownership forever (no license dependencies)</span>
              </li>
              <li className="flex items-center gap-3 text-[#F5F5F0] text-sm font-medium">
                <Check className="w-5 h-5 text-[#22C55E] shrink-0" />
                <span>Daily support & ongoing growth partnership</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="premium-reveal text-center mt-12">
          <p
            className="text-[#666666] text-sm md:text-base italic"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            &ldquo;We don&apos;t build cheap websites. We build custom assets that make money. The math speaks for itself.&rdquo;
          </p>
        </div>

      </div>
    </section>
  );
}
