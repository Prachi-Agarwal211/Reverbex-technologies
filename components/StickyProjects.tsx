"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { caseStudiesData } from "../lib/caseStudiesData";

gsap.registerPlugin(ScrollTrigger);

export default function StickyProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const caseStudies = Object.entries(caseStudiesData);
  const totalCards = caseStudies.length;

  useGSAP(() => {
    if (!containerRef.current || cardsRef.current.length === 0) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    
    // Engine math from the prompt
    const segmentSize = 1 / totalCards;
    const cardOffset = 5; // yPercent
    const cardScaleStep = 0.05; // scale

    // Initial Stack
    cards.forEach((card, i) => {
      gsap.set(card, {
        yPercent: -50 + (i * cardOffset),
        scale: 1 - (i * cardScaleStep),
        zIndex: totalCards - i
      });
    });

    // The ScrollTrigger Engine
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${window.innerHeight * totalCards * 1.5}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        let activeIndex = Math.floor(progress / segmentSize);
        activeIndex = Math.min(activeIndex, totalCards - 1);
        
        const segmentProgress = (progress - (activeIndex * segmentSize)) / segmentSize;

        cards.forEach((card, i) => {
          if (i < activeIndex) {
            // Past
            gsap.set(card, {
              yPercent: -250,
              rotationX: 35,
              scale: 1,
              opacity: 0,
            });
          } else if (i === activeIndex) {
            // Present
            gsap.set(card, {
              yPercent: gsap.utils.interpolate(-50, -250, segmentProgress),
              rotationX: gsap.utils.interpolate(0, 35, segmentProgress),
              scale: 1,
              opacity: gsap.utils.interpolate(1, 0, segmentProgress * 2), // fade out halfway up
            });
          } else {
            // Future
            const behindIndex = i - activeIndex;
            const currentYOffset = (behindIndex * cardOffset) - (segmentProgress * cardOffset);
            const currentScale = 1 - ((behindIndex * cardScaleStep) - (segmentProgress * cardScaleStep));
            
            gsap.set(card, {
              yPercent: -50 + currentYOffset,
              rotationX: 0,
              scale: currentScale,
              opacity: 1,
            });
          }
        });
      }
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden flex justify-center items-center perspective-[1000px] bg-[#050505]"
    >
      <div className="absolute top-12 text-center w-full z-0 opacity-50 pointer-events-none">
        <h2 className="text-[#A0A0A0] text-sm uppercase tracking-[0.3em] font-mono">Scroll to explore</h2>
      </div>

      {caseStudies.map(([slug, study], index) => (
        <div
          key={slug}
          ref={(el) => { cardsRef.current[index] = el; }}
          className="absolute w-[90%] md:w-[70%] max-w-5xl h-[70vh] bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row transform-origin-bottom will-change-transform group cursor-pointer"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', transformOrigin: 'center bottom' }}
        >
          {/* Card Content */}
          <Link href={`/work/${slug}`} className="w-full h-full flex flex-col md:flex-row">
            {/* Visual/Metric Side */}
            <div className="md:w-5/12 bg-[#111111] p-10 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#1A1A1A] relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAB308]/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="font-heading text-[#EAB308] text-5xl md:text-7xl font-black tracking-tighter mb-4">
                {study.metrics[0].prefix}{study.metrics[0].value}{study.metrics[0].suffix}
              </div>
              <div className="text-[#666666] text-sm uppercase tracking-widest font-semibold">
                {study.metrics[0].label}
              </div>
            </div>

            {/* Narrative Side */}
            <div className="md:w-7/12 p-10 md:p-16 flex flex-col justify-between h-full">
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {study.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-[#1A1A1A] text-[#A0A0A0] text-xs font-mono uppercase tracking-wider rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6 group-hover:text-[#EAB308] transition-colors duration-300">
                  {study.client}
                </h3>
                <p className="text-[#A0A0A0] text-base leading-relaxed line-clamp-4">
                  {study.problem}
                </p>
              </div>
              
              <div className="mt-8 flex items-center text-white font-semibold text-sm uppercase tracking-wider group-hover:text-[#EAB308] transition-colors duration-300">
                Read Case Study
                <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
}
