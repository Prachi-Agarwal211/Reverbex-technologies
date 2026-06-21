"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { XCircle, CheckCircle2 } from "lucide-react";

export default function PremiumPositioning() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".premium-reveal",
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".premium-card-left",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".premium-card-right",
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="premium-positioning"
      className="w-full py-24 md:py-32 bg-transparent border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 mx-auto max-w-4xl">
          <span
            className="premium-reveal text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            The Math
          </span>
          <h2
            className="premium-reveal text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.0] mb-6"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Why Premium Beats Cheap.
          </h2>
          <p
            className="premium-reveal text-[#A0A0A0] text-lg md:text-xl font-normal leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            A website that costs ₹20,000 but brings zero customers costs more than a website that costs ₹2,00,000 and brings 25 leads per month.
          </p>
        </div>

        {/* Comparison Layout */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-8 mb-16">
          
          {/* Cheap Template Site */}
          <div className="premium-card-left flex-1 p-8 md:p-10 bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl flex flex-col items-start relative opacity-50 hover:opacity-100 transition-opacity duration-300">
            <span className="text-[#666666] uppercase tracking-widest text-xs font-bold mb-4">The Template Agency</span>
            <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-8" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
              ₹20,000 <span className="text-xl text-[#666666] font-normal">Template Site</span>
            </h3>

            <ul className="space-y-5 w-full">
              {[
                "58/100 PageSpeed",
                "3.8s load time",
                "5 leads per month",
                "You don't own the code",
                "Disappears after launch"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
                  <span className="text-[#A0A0A0]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Custom Site */}
          <div className="premium-card-right flex-1 p-8 md:p-10 bg-[#111111] border-2 border-[#EAB308] rounded-2xl flex flex-col items-start relative shadow-[0_0_40px_rgba(234,179,8,0.1)] transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#EAB308] text-black px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
              The Reverbex Standard
            </div>
            
            <span className="text-[#EAB308] uppercase tracking-widest text-xs font-bold mb-4">The Custom Solution</span>
            <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-8" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
              ₹2,00,000 <span className="text-xl text-[#A0A0A0] font-normal">Custom Site</span>
            </h3>

            <ul className="space-y-5 w-full">
              {[
                "100/100 PageSpeed",
                "0.8s load time",
                "25 leads per month",
                "You own everything",
                "Daily support & partnership"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                  <span className="text-white font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="premium-reveal text-center border-t border-[#1A1A1A] pt-12">
          <p className="text-white text-xl md:text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
            We don't build cheap websites. We build websites that make money. <br className="hidden md:block" />
            <span className="text-[#EAB308]">The math speaks for itself.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
