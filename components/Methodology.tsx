"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
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

      const items = containerRef.current?.querySelectorAll('.method-item');
      
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
         // Draw connecting line
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

         // Reveal each step naturally and activate dot
         items?.forEach((item, i) => {
            const dot = item.querySelector('.timeline-dot');
            const content = item.querySelector('.timeline-content');
            const bgGlow = item.querySelector('.bg-glow');

            const tl = gsap.timeline({
               scrollTrigger: {
                  trigger: item,
                  start: "top 60%", // when step hits a bit past middle
                  toggleActions: "play none none reverse" // plays forward on scroll down, reverses on scroll up
               }
            });

            tl.to(dot, { backgroundColor: "#eab308", borderColor: "#fef08a", scale: 1.2, duration: 0.4, ease: "back.out(1.5)" })
              .fromTo(content, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=0.2")
              .to(bgGlow, { opacity: 1, duration: 1 }, "-=0.6");
         });
      });

      mm.add("(max-width: 767px)", () => {
         // Simpler mobile view
         items?.forEach((item) => {
            const content = item.querySelector('.timeline-content');
            gsap.fromTo(content, 
               { opacity: 0, y: 20 },
               { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" } }
            );
         });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="methodology" className="relative w-full py-24 md:py-40 bg-[#050505] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">
        <div className="method-header text-center mb-16 md:mb-32">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] text-white mb-4 tracking-tight leading-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
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

          <div className="flex flex-col gap-12 md:gap-32 w-full">
            {steps.map((item, i) => (
              <div key={i} className="method-item relative flex flex-col md:flex-row items-start outline-none">
                 {/* Desktop Node */}
                 <div className="hidden md:flex absolute left-0 -translate-x-1/2 w-6 h-6 items-center justify-center bg-[#050505] z-10 mt-[0.3em]">
                    <div className="timeline-dot w-3 h-3 rounded-full border border-white/30 bg-[#111] transition-colors" />
                 </div>

                 <div className="md:ml-20 timeline-content w-full relative">
                    <div className="bg-glow absolute -inset-10 bg-gradient-to-r from-blue-600/5 to-transparent blur-3xl opacity-0 pointer-events-none rounded-full" />
                    
                    <span className="text-yellow-500 text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-4 block">
                      Phase {item.num}
                    </span>
                    <h3 className="text-2xl md:text-4xl text-white mb-4 tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-base md:text-lg font-light leading-relaxed max-w-2xl">
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
