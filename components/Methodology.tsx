"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const steps = [
  {
     num: "01",
     title: "Architecture",
     desc: "We begin by mapping system constraints, data payloads, and security requirements to design a resilient foundation."
  },
  {
     num: "02",
     title: "Engineering",
     desc: "Rigorous implementation of decoupled, scalable services utilizing modern API structures and highly optimized edge networks."
  },
  {
     num: "03",
     title: "Autonomy",
     desc: "Integration of autonomous agents and LLM logic layers for intelligent reasoning, automation, and self-healing infrastructure."
  }
];

export default function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Animation
    gsap.fromTo('.method-header',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Section number animation
    gsap.fromTo('.section-number',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    const items = containerRef.current?.querySelectorAll('.method-item');

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
       // Draw connecting line with glow effect
       gsap.fromTo('.progress-line',
          { scaleY: 0 },
          {
             scaleY: 1,
             ease: "none",
             scrollTrigger: {
                trigger: '.timeline-container',
                start: "top 50%",
                end: "bottom 70%",
                scrub: true
             }
          }
       );

       // Progress line glow
       gsap.fromTo('.progress-line-glow',
          { scaleY: 0, opacity: 0 },
          {
             scaleY: 1,
             opacity: 0.6,
             ease: "none",
             scrollTrigger: {
                trigger: '.timeline-container',
                start: "top 50%",
                end: "bottom 70%",
                scrub: true
             }
          }
       );

       // Reveal each step naturally and activate dot with ripple
       items?.forEach((item, i) => {
          const dot = item.querySelector('.timeline-dot');
          const ripple = item.querySelector('.ripple-dot');
          const content = item.querySelector('.timeline-content');
          const bgGlow = item.querySelector('.bg-glow');
          const phaseNumber = item.querySelector('.phase-number');

          const tl = gsap.timeline({
             scrollTrigger: {
                trigger: item,
                start: "top 60%",
                toggleActions: "play none none reverse"
             }
          });

          // Dot activation
          tl.to(dot, { backgroundColor: "#eab308", borderColor: "#fef08a", scale: 1.2, duration: 0.4, ease: "back.out(1.5)" })
            // Ripple effect
            .to(ripple, { scale: 2.5, opacity: 0, duration: 1, ease: "power2.out", overwrite: "auto" }, "-=0.2")
            // Content reveal
            .fromTo(content, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
            // Phase number reveal
            .fromTo(phaseNumber, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, "-=0.6")
            // Background glow
            .to(bgGlow, { opacity: 1, duration: 1 }, "-=0.4");

          // Reset ripple for reverse
          tl.eventCallback("onReverseComplete", () => {
            if (ripple) {
              gsap.set(ripple, { scale: 1, opacity: 1 });
            }
          });
       });
    });

    mm.add("(max-width: 767px)", () => {
       // Simpler mobile view - opacity + y reveals only
       items?.forEach((item, i) => {
          const content = item.querySelector('.timeline-content');
          const phaseNumber = item.querySelector('.phase-number');
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });

          tl.fromTo(phaseNumber, 
            { opacity: 0, scale: 0.8 }, 
            { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
          )
          .fromTo(content,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3"
          );
       });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="methodology" className="relative w-full py-24 md:py-40 bg-[#050505] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
        <div className="method-header text-center mb-16 md:mb-32 relative">
          {/* Section number */}
          <span className="section-number absolute -right-4 -top-12 md:-right-16 md:-top-20 text-[6rem] md:text-[8rem] text-white/[0.04] font-bold leading-none select-none pointer-events-none">
            03
          </span>
          {/* Header lines with yellow accent */}
          <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
            <div className="h-px bg-white/10 flex-1 max-w-[60px]" />
            <span className="text-yellow-500 text-[clamp(0.65rem,1.5vw,0.85rem)] font-light tracking-[0.2em] uppercase tabular">
              Process
            </span>
            <div className="h-px bg-white/10 flex-1 max-w-[60px]" />
          </div>
          <h2 className="text-[clamp(2.2rem,5vw,5rem)] text-white mb-4 tracking-tight leading-tight" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
            Methodology
          </h2>
          <p className="text-white/50 text-[clamp(0.75rem,2vw,1rem)] uppercase tracking-[0.2em] font-light">
            Our systematic approach
          </p>
        </div>

        <div className="timeline-container relative w-full md:pl-8">
          {/* Timeline background lines (desktop only) */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-[1px] bg-white/10" />
          <div className="progress-line hidden md:block absolute left-8 top-0 bottom-0 w-[1px] bg-yellow-500 origin-top" />
          <div className="progress-line-glow hidden md:block absolute left-8 top-0 bottom-0 w-[2px] bg-yellow-500/50 blur-sm origin-top" />

          <div className="flex flex-col gap-12 md:gap-32 w-full">
            {steps.map((item, i) => (
              <div key={i} className="method-item relative flex flex-col md:flex-row items-start outline-none">
                 {/* Desktop Node */}
                 <div className="hidden md:flex absolute left-0 -translate-x-1/2 w-6 h-6 items-center justify-center bg-[#050505] z-10 mt-[0.3em]">
                    <div className="timeline-dot w-3 h-3 rounded-full border border-white/30 bg-[#111] transition-colors" />
                    <div className="ripple-dot absolute w-3 h-3 rounded-full bg-yellow-500/30 scale-100 opacity-100" />
                 </div>

                 <div className="md:ml-20 timeline-content w-full relative">
                    <div className="bg-glow absolute -inset-10 bg-gradient-to-r from-blue-600/5 to-transparent blur-3xl opacity-0 pointer-events-none rounded-full" />

                    {/* Phase number - huge decorative number behind label */}
                    <span className="phase-number absolute -left-4 -top-8 md:-left-8 md:-top-12 text-[5rem] md:text-[7rem] text-white/[0.04] font-bold leading-none select-none pointer-events-none opacity-0">
                      {item.num}
                    </span>

                    <span className="text-yellow-500 text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-4 block relative z-10">
                      Phase {item.num}
                    </span>
                    <h3 className="text-2xl md:text-4xl text-white mb-4 tracking-tight relative z-10" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-base md:text-lg font-light leading-relaxed max-w-2xl relative z-10">
                      {item.desc}
                    </p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
