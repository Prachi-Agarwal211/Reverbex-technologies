"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const cases = [
  {
    title: "MAAC Animation",
    tagline: "Education • Web Design",
    problem: "No online lead generation",
    result: "500+ leads in weeks",
    image: "/work/maac.png",
    stack: ["Next.js", "Meta Ads"]
  },
  {
    title: "Aarya Clothing",
    tagline: "E-Commerce • Full Stack",
    problem: "No scalable sales system",
    result: "₹3+ lakh revenue generated",
    image: "/work/aarya.png",
    stack: ["Custom Commerce", "Stripe API"]
  },
  {
    title: "Khemji Wire Co.",
    tagline: "Corporate • Rebranding",
    problem: "Outdated digital presence",
    result: "Complete transformation",
    image: "/work/khemji.png",
    stack: ["Next.js", "SEO Services"]
  },
  {
    title: "Shipbridge",
    tagline: "Logistics • Platform",
    problem: "Manual supply tracking",
    result: "Automated dispatch system",
    image: "/work/shipbridge.png",
    stack: ["Next.js", "Node API"]
  }
];

export default function FeaturedArchitectures() {
  const containerRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current || imagesRef.current.length === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    
    if (prefersReducedMotion || isMobile) return;

    const images = imagesRef.current.filter(Boolean) as HTMLDivElement[];

    // 1. THE CONFIGURATION ARRAYS
    const initialRotations = [-5, 3, -4, 2]; 
    const phaseOneStartOffsets = [0, 0.1, 0.2, 0.3]; 

    // Final positions for a 2x2 grid. 
    // X and Y are translate percentages relative to the card's width/height.
    // -105% = shifted left by 1 width + 5% gap. 
    const finalPositions = [
      [-105, -105], // Top Left
      [5, -105],    // Top Right
      [-105, 5],    // Bottom Left
      [5, 5]        // Bottom Right
    ];

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=4000px", 
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        images.forEach((img, index) => {
          let x = -50; 
          let y = -50;
          let rotation = 0;
          let scale = 1;

          const phase1Start = phaseOneStartOffsets[index];
          const phase1End = phase1Start + 0.3; 
          
          const phase2Start = 0.55; // Start scattering
          const phase2End = 0.95;   // Finish scattering

          // --- PHASE 0: OFF SCREEN ---
          if (progress < phase1Start) {
            y = 200;
            scale = 0;
            rotation = initialRotations[index];
          } 
          // --- PHASE 1: FLY UP AND STACK ---
          else if (progress >= phase1Start && progress < phase2Start) {
            let phase1Progress = (progress - phase1Start) / (phase1End - phase1Start);
            phase1Progress = Math.min(Math.max(phase1Progress, 0), 1); 

            // Easing curve
            const easedProgress = 1 - Math.pow(1 - phase1Progress, 3);

            y = 200 - (easedProgress * 250); // From 200 to -50
            scale = easedProgress;
            rotation = initialRotations[index];
          } 
          // --- PHASE 2: SCATTER INTO GRID ---
          else if (progress >= phase2Start && progress <= phase2End) {
            let phase2Progress = (progress - phase2Start) / (phase2End - phase2Start);
            const easedProgress = 1 - Math.pow(1 - phase2Progress, 3);

            const finalX = finalPositions[index][0];
            const finalY = finalPositions[index][1];

            x = gsap.utils.interpolate(-50, finalX, easedProgress);
            y = gsap.utils.interpolate(-50, finalY, easedProgress);
            rotation = gsap.utils.interpolate(initialRotations[index], 0, easedProgress);
          } 
          // --- PHASE 3: FINAL LOCK ---
          else if (progress > phase2End) {
            x = finalPositions[index][0];
            y = finalPositions[index][1];
            rotation = 0;
          }

          gsap.set(img, {
            xPercent: x,
            yPercent: y,
            rotation: rotation,
            scale: scale,
          });
        });
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="architectures" className="relative w-full h-screen bg-transparent overflow-hidden flex flex-col md:block">
      
      {/* Header */}
      <div className="absolute top-12 md:top-20 left-0 w-full z-10 pointer-events-none px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[clamp(2.2rem,5vw,5rem)] font-black text-white mb-4 tracking-[-0.04em] leading-tight">
            Real Results.
          </h2>
          <p className="text-[#A0A0A0] text-[clamp(0.75rem,2vw,1rem)] uppercase tracking-[0.2em] font-light">
            Scroll to scatter
          </p>
        </div>
      </div>

      {/* Images Container */}
      <div className="relative w-full flex-1 md:absolute md:inset-0 md:h-full md:pointer-events-none flex flex-col md:block items-center justify-center gap-6 mt-32 md:mt-0 pb-20 md:pb-0 overflow-y-auto md:overflow-hidden">
        {cases.map((item, i) => (
          <div 
            key={i} 
            ref={(el) => { imagesRef.current[i] = el; }}
            className="md:absolute md:top-1/2 md:left-1/2 w-[85vw] md:w-[clamp(280px,35vw,480px)] aspect-[4/3] rounded-[1.5rem] overflow-hidden border border-white/10 bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col group will-change-transform md:pointer-events-auto"
          >
            {/* Image */}
            <div className="relative w-full h-[65%] overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 85vw, 35vw"
              />
            </div>

            {/* Content Bottom */}
            <div className="relative w-full h-[35%] p-4 md:p-6 bg-gradient-to-b from-[#0a0a0a] to-[#050505] flex flex-col justify-center">
              <p className="text-[#EAB308] font-semibold tracking-[0.2em] uppercase text-[9px] md:text-[10px] mb-2">
                {item.tagline}
              </p>
              <h3 className="text-xl md:text-2xl text-white font-bold tracking-tight mb-2">
                {item.title}
              </h3>
              <div className="flex gap-2">
                {item.stack.map((tech, j) => (
                  <span key={j} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-white/70 text-[9px] font-medium tracking-wide">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
