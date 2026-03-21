"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FractalGlassBackground from "./FractalGlassBackground";

const cases = [
  {
    title: "High-Volume AI E-Commerce Infrastructure",
    tagline: "Decoupled Architecture & Intelligent Scaling",
    desc: "Engineered a highly resilient, headless commerce platform tailored for global scale. By strictly separating concerns between a responsive Next.js frontend edge network and a highly performant FastAPI backend, we bypassed traditional monolithic bottlenecks. The architecture integrates advanced logistics APIs, custom payment routing logic, and robust microservices—all containerized via Docker and globally accelerated by Cloudflare R2 for sub-100ms response times.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1600",
    stack: ["Next.js", "FastAPI", "MedusaJS", "Docker", "Cloudflare R2"]
  },
  {
    title: "Institutional Workflow Automation",
    tagline: "University-Scale Administrative Portals",
    desc: "Architected a frictionless 'No Dues' digital clearance system deployed across higher education institutions. This infrastructure eliminates manual administrative bottlenecks through complex relational database management and secure, role-based backend logic. The system autonomously processes thousands of concurrent clearance states, ending in the automated cryptographic generation of verified digital certificates.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600",
    stack: ["Supabase", "PostgreSQL", "Next.js", "Role-Based Access"]
  },
  {
    title: "Private Autonomous AI Systems",
    tagline: "Localized Intelligence & Secure Compute",
    desc: "Spearheaded advanced R&D into secure, privacy-first proprietary AI. We engineered localized AI assistants running on heavily optimized small LLMs rather than relying on expensive, unsecured cloud GPU networks. These tailored models securely ingest and understand full-stack enterprise codebases dynamically, ensuring zero external data leakage while maintaining unparalleled processing speeds on bare-metal infrastructure.",
    image: "https://images.unsplash.com/photo-1620825937374-87fc7d62828e?auto=format&fit=crop&q=80&w=1600",
    stack: ["Python", "Local LLMs", "Custom AI Architecture", "FastAPI"]
  }
];

export default function FeaturedArchitectures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Animation
    gsap.fromTo('.cases-header',
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

    const cards = containerRef.current?.querySelectorAll('.case-card');
    const horizontalCardsWrap = horizontalRef.current?.querySelector('.horizontal-cards-wrap');

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
       if (horizontalCardsWrap) {
         // Pin and horizontal scroll
         const scrollTween = gsap.to(horizontalCardsWrap, {
           x: () => -(horizontalCardsWrap.scrollWidth - window.innerWidth),
           ease: "none",
           scrollTrigger: {
             trigger: horizontalRef.current,
             start: "top top",
             end: () => `+=${horizontalCardsWrap.scrollWidth}`,
             scrub: 1,
             pin: true,
             anticipatePin: 1,
           }
         });

         // Image reveals and parallax text
         cards?.forEach((card) => {
            const image = card.querySelector('.case-image');
            const overlay = card.querySelector('.case-overlay');
            const textElements = card.querySelectorAll('.title-mask > *');
            const cardNumber = card.querySelector('.card-number');

            // Card number reveal
            gsap.fromTo(cardNumber,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1, scale: 1, duration: 0.8, ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTween,
                  start: "left 70%",
                  toggleActions: "play none none reverse"
                }
              }
            );

            // Image Reveal (Unmasking overlay slides UP via clip-path)
            gsap.fromTo(overlay,
               { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" },
               {
                  clipPath: "polygon(0 0, 100% 0, 100% 0%, 0% 0%)",
                  duration: 1.5, ease: "power4.inOut",
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween,
                    start: "left 70%",
                    toggleActions: "play none none reverse"
                  }
               }
            );

            gsap.fromTo(image,
               { scale: 1.2 },
               {
                  scale: 1, duration: 1.5, ease: "power3.out",
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween,
                    start: "left 70%",
                    toggleActions: "play none none reverse"
                  }
               }
            );

            // Staggered Text Reveal
            gsap.fromTo(textElements,
               { yPercent: 120 },
               {
                  yPercent: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween,
                    start: "left 70%",
                    toggleActions: "play none none reverse"
                  }
               }
            );
         });
       }
    });

    mm.add("(max-width: 767px)", () => {
       cards?.forEach((card, i) => {
          const overlay = card.querySelector('.case-overlay');
          const image = card.querySelector('.case-image');
          const textElements = card.querySelectorAll('.title-mask > *');
          const cardNumber = card.querySelector('.card-number');

          if (overlay) gsap.set(overlay, { display: "none" });

          // Card number on mobile
          gsap.fromTo(cardNumber,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1, scale: 1, duration: 0.6, ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" }
            }
          );

          gsap.fromTo(card,
             { opacity: 0, y: 40 },
             {
                opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
                scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" }
             }
          );

          gsap.fromTo(image, { scale: 1.1 }, { scale: 1, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%" } });

          gsap.fromTo(textElements,
             { yPercent: 120 },
             {
                yPercent: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
                scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" }
             }
          );
       });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="architectures" className="relative w-full bg-[#050505] overflow-hidden overflow-x-hidden">
      <FractalGlassBackground />
      {/* Header section normal scrolling */}
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="cases-header text-center md:text-left relative">
          {/* Section number */}
          <span className="section-number absolute -right-4 -top-12 md:-right-16 md:-top-20 text-[6rem] md:text-[8rem] text-white/[0.04] font-bold leading-none select-none pointer-events-none">
            02
          </span>
          {/* Header lines with yellow accent */}
          <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
            <div className="h-px bg-white/10 flex-1 max-w-[60px]" />
            <span className="text-yellow-500 text-[clamp(0.65rem,1.5vw,0.85rem)] font-light tracking-[0.2em] uppercase tabular">
              Case Studies
            </span>
            <div className="h-px bg-white/10 flex-1 max-w-[60px]" />
          </div>
          <h2 className="text-[clamp(2.2rem,5vw,5rem)] text-white mb-4 tracking-tight leading-tight" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
            Engineered Case Studies
          </h2>
          <p className="text-white/50 text-[clamp(0.75rem,2vw,1rem)] uppercase tracking-[0.2em] font-light">
            Architectural Highlights
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={horizontalRef} className="w-full md:h-screen md:flex md:items-center bg-[#050505]">
         <div className="horizontal-cards-wrap flex flex-col md:flex-row md:h-full md:items-center px-6 md:px-0 md:pl-24 pb-24 md:pb-0 gap-16 md:gap-0 md:w-max">
           {cases.map((item, i) => (
             <div key={i} className="case-card flex-shrink-0 w-full md:w-[70vw] lg:w-[60vw] h-[65vh] md:h-[80vh] md:mr-32 relative flex flex-col justify-end p-6 md:p-16 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/5">
               <div className="absolute inset-0 z-0 overflow-hidden">
                 <div className="case-overlay absolute inset-0 bg-[#000] z-20 pointer-events-none" />
                 <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="case-image object-cover opacity-60 z-0"
                    sizes="(max-width: 768px) 100vw, 65vw"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/10 z-10 pointer-events-none" />
               </div>

               {/* Card number */}
               <span className="card-number absolute top-6 right-6 md:top-10 md:right-10 text-[5rem] text-white/[0.04] font-bold leading-none select-none pointer-events-none z-30">
                 {String(i + 1).padStart(2, '0')}
               </span>

               <div className="relative z-30 max-w-4xl">
                 <div className="title-mask overflow-hidden mb-4">
                   <p className="text-yellow-500 font-semibold tracking-[0.2em] uppercase text-xs md:text-sm inline-block">
                     {item.tagline}
                   </p>
                 </div>

                 <div className="title-mask overflow-hidden mb-6">
                   <h3 className="text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-none inline-block pb-1" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                     {item.title}
                   </h3>
                 </div>

                 <div className="title-mask overflow-hidden mb-8 md:mb-10">
                   <p className="text-white/70 font-light text-sm md:text-lg leading-relaxed inline-block max-w-2xl">
                     {item.desc}
                   </p>
                 </div>

                 <div className="flex flex-wrap gap-2 md:gap-3">
                   {item.stack.map((tech, j) => (
                      <span key={j} className="title-mask overflow-hidden inline-block">
                        <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20 bg-white/5 text-white/80 text-xs md:text-sm tracking-wide font-medium backdrop-blur-md inline-block hover:bg-white/12 hover:border-white/30 transition-all duration-300">
                          {tech}
                        </span>
                      </span>
                   ))}
                 </div>
               </div>
             </div>
           ))}
         </div>
      </div>
    </section>
  );
}
