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
    desc: "Headless commerce platform with Next.js frontend and FastAPI backend. Advanced logistics APIs, custom payment routing, and microservices containerized via Docker with Cloudflare R2 acceleration.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1600",
    stack: ["Next.js", "FastAPI", "Docker", "Cloudflare"]
  },
  {
    title: "Institutional Workflow Automation",
    tagline: "University-Scale Administrative Portals",
    desc: "Digital clearance system eliminating manual bottlenecks. Complex relational database with role-based access control. Automated generation of verified digital certificates.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600",
    stack: ["Supabase", "PostgreSQL", "Next.js"]
  },
  {
    title: "Private Autonomous AI Systems",
    tagline: "Localized Intelligence & Secure Compute",
    desc: "Privacy-first AI running on optimized small LLMs. Localized assistants that understand enterprise codebases with zero external data leakage on bare-metal infrastructure.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1600",
    stack: ["Python", "Local LLMs", "FastAPI"]
  }
];

export default function FeaturedArchitectures() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Animation
    gsap.fromTo('.cases-header',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Section number animation
    gsap.fromTo('.section-number',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 1, ease: "power3.out", delay: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    const mm = gsap.matchMedia();

    // Desktop: Horizontal scroll with better pinning
    mm.add("(min-width: 768px)", () => {
      const cards = cardsContainerRef.current?.querySelectorAll('.case-card');
      
      if (cards && cards.length > 0) {
        const totalWidth = cardsContainerRef.current?.scrollWidth || 0;
        const windowWidth = window.innerWidth;
        const scrollDistance = totalWidth - windowWidth;

        // Pin section and scroll horizontally
        gsap.to(cardsContainerRef.current, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        // Card reveal animations
        cards.forEach((card, i) => {
          const image = card.querySelector('.case-image');
          const overlay = card.querySelector('.case-overlay');
          
          // Initial state
          gsap.set(image, { scale: 1.1 });
          gsap.set(overlay, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" });
          
          // Animate on scroll
          gsap.to(overlay, {
            clipPath: "polygon(0 0, 100% 0, 100% 0%, 0% 0%)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getTweensOf(cardsContainerRef.current)[0],
              start: "left 60%",
              toggleActions: "play none none reverse"
            }
          });

          gsap.to(image, {
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getTweensOf(cardsContainerRef.current)[0],
              start: "left 60%",
              toggleActions: "play none none reverse"
            }
          });
        });
      }
    });

    // Mobile: Simple vertical scroll
    mm.add("(max-width: 767px)", () => {
      const cards = cardsContainerRef.current?.querySelectorAll('.case-card');
      
      cards?.forEach((card, i) => {
        const overlay = card.querySelector('.case-overlay');
        if (overlay) gsap.set(overlay, { opacity: 0, display: "none" });

        card.setAttribute('data-reveal', 'fade-up');
        card.setAttribute('style', `--reveal-delay: ${i * 100}ms`);
        
        const observer = new IntersectionObserver(([e]) => {
          if (e.isIntersecting) {
            card.setAttribute('data-visible', 'true');
            observer.disconnect();
          }
        }, { threshold: 0.1 });
        
        observer.observe(card);
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="architectures" className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col pt-20 md:pt-32 pb-16 md:pb-0">
      <FractalGlassBackground />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full shrink-0 mb-12 md:mb-16">
        <div className="cases-header text-center md:text-left relative">
          <span className="section-number absolute -right-4 -top-12 md:-right-16 md:-top-20 text-[6rem] md:text-[8rem] text-white/[0.04] font-bold leading-none select-none pointer-events-none">
            04
          </span>
          
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

      {/* Cards Container */}
      <div className="w-full flex-1 relative z-10 overflow-hidden">
        <div 
          ref={cardsContainerRef}
          className="flex flex-row md:items-center px-6 md:px-0 md:pl-24 gap-6 md:gap-0 w-max"
        >
          {cases.map((item, i) => (
            <div 
              key={i} 
              className="case-card snap-center flex-shrink-0 w-[85vw] md:w-[65vw] lg:w-[55vw] h-[65vh] md:h-[60vh] md:mr-32 relative flex flex-col justify-end p-6 md:p-12 rounded-[2rem] overflow-hidden border border-white/5"
            >
              {/* Image & Overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden rounded-[2rem]">
                <div className="case-overlay absolute inset-0 bg-[#000] z-20 pointer-events-none" />
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="case-image object-cover opacity-60 z-0"
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 z-10 pointer-events-none" />
              </div>

              {/* Card Number */}
              <span className="card-number absolute top-6 right-6 md:top-8 md:right-8 text-[4rem] md:text-[5rem] text-white/[0.04] font-bold leading-none select-none pointer-events-none z-30">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Content */}
              <div className="relative z-30 max-w-3xl">
                {/* Tagline */}
                <p className="text-yellow-500 font-semibold tracking-[0.2em] uppercase text-[11px] md:text-xs mb-4">
                  {item.tagline}
                </p>

                {/* Title */}
                <h3 className="text-2xl md:text-4xl lg:text-5xl text-white tracking-tight leading-none mb-6" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                  {item.title}
                </h3>

                {/* Description - Shorter */}
                <p className="text-white/70 font-light text-[13px] md:text-base leading-relaxed mb-6 max-w-2xl">
                  {item.desc}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {item.stack.map((tech, j) => (
                    <span 
                      key={j}
                      className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/15 bg-white/5 text-white/80 text-[11px] md:text-sm tracking-wide font-medium backdrop-blur-md hover:bg-white/10 hover:border-white/25 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10 hidden md:block"
        style={{ background: 'linear-gradient(to bottom, transparent, #050505)' }}
      />
    </section>
  );
}
