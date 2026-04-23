"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const services = [
  {
    title: "AI Development",
    category: "01",
    desc: "Custom large language models, autonomous agents, and intelligent workflows tailored precisely to your enterprise requirements.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
    tags: ["LLMs", "Neural Networks", "Computer Vision"]
  },
  {
    title: "System Architecture",
    category: "02",
    desc: "Scalable, high-performance distributed systems designed to handle immense data loads with zero downtime.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    tags: ["Microservices", "Cloud Native", "DevOps"]
  },
  {
    title: "Data Intelligence",
    category: "03",
    desc: "Advanced analytics and predictive modeling pipelines that transform raw data into actionable strategic insights.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    tags: ["Data Pipelines", "Machine Learning", "Analytics"]
  }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRefDesktop = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header animation
    gsap.fromTo('.services-header',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }
    );

    const mm = gsap.matchMedia();
    
    // For DESKTOP (md+): GSAP ScrollTrigger pin with panels
    mm.add("(min-width: 768px)", () => {
      const panels = cardsRefDesktop.current?.querySelectorAll('.service-panel');
      if (!panels || panels.length === 0) return;

      // Pin the services section with a single unified timeline
      const totalScroll = panels.length * 100;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalScroll}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Sequence the panels ascending over the mapped timeline duration
      panels.forEach((panel, i) => {
        if (i === 0) return; // First panel is already in place
        
        gsap.set(panel, { yPercent: 100 });
        
        tl.to(panel, {
          yPercent: 0,
          ease: "none",
          duration: 1 // Equal duration for each panel
        });
      });

      panels.forEach((card) => {
        const image = card.querySelector('.service-image');
        const serviceIcon = card.querySelector('.service-icon');
        const exploreText = card.querySelector('.explore-text');
        const scanline = card.querySelector('.scanline-overlay');

        const onEnter = () => {
          gsap.to(image, { scale: 1.05, duration: 0.8, ease: "power2.out", overwrite: "auto" });
          gsap.to(serviceIcon, { x: 10, duration: 0.4, ease: "power2.out", overwrite: "auto" });
          gsap.to(exploreText, { x: 8, duration: 0.4, ease: "power2.out", overwrite: "auto" });
          gsap.to(scanline, { opacity: 1, duration: 0.3, overwrite: "auto" });
        };
        const onLeave = () => {
          gsap.to(image, { scale: 1, duration: 0.8, ease: "power2.out", overwrite: "auto" });
          gsap.to(serviceIcon, { x: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
          gsap.to(exploreText, { x: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
          gsap.to(scanline, { opacity: 0, duration: 0.3, overwrite: "auto" });
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);

        return () => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: swipeable cards approach (no pinning)
      const cards = containerRef.current?.querySelectorAll('.service-mobile-card');
      cards?.forEach((card) => {
        card.setAttribute('data-reveal', 'scale-in');
        const observer = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting) {
              card.setAttribute('data-visible', 'true');
              observer.disconnect();
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(card);
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="services" className="relative w-full min-h-[100vh] bg-[#020202] overflow-hidden flex flex-col pt-24 md:pt-32"
      style={{
        background: 'linear-gradient(180deg, #020202 0%, #0d1b2a 30%, #1b263b 60%, #020202 100%)'
      }}
    >
        {/* Enhanced background static meshes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full top-[-20%] right-[-10%]" />
          <div className="absolute w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full bottom-[-10%] left-[-10%]" />
          <div className="absolute inset-0 mesh-gradient-static opacity-20" />
          {/* Mobile-specific colored orbs */}
          <div className="md:hidden absolute top-40 right-0 w-56 h-56 bg-cyan-600/15 blur-[90px] rounded-full" />
          <div className="md:hidden absolute bottom-60 left-0 w-48 h-48 bg-purple-600/15 blur-[80px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full flex-1 flex flex-col">
          <div className="services-header text-center md:text-left mb-8 md:mb-16 shrink-0">
            <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
              <div className="h-px bg-white/10 flex-1 max-w-[60px]" />
              <span className="text-yellow-500 text-[clamp(0.65rem,1.5vw,0.85rem)] font-light tracking-[0.2em] uppercase tabular whitespace-nowrap">
                Our Expertise
              </span>
              <div className="h-px bg-white/10 flex-1 max-w-[60px]" />
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] md:text-[clamp(2.2rem,5vw,5rem)] text-white mb-4 tracking-tight leading-tight max-w-4xl px-2" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
              Uncompromising Digital Engineering
            </h2>
            <p className="text-white/50 text-[clamp(0.7rem,1.8vw,0.85rem)] md:text-[clamp(0.75rem,2vw,1rem)] uppercase tracking-[0.2em] font-light px-2">
              Our specialized disciplines
            </p>
          </div>

          {/* DESKTOP PINNED PANELS */}
          <div ref={cardsRefDesktop} className="hidden md:block relative w-full flex-1 min-h-[55vh] mb-24 overflow-hidden">
            {services.map((service, i) => (
              <div
                key={i}
                className={`service-panel w-full h-full bg-[#020202] group grid grid-cols-2 gap-16 items-center ${i === 0 ? 'relative' : 'absolute inset-0'}`}
              >
                <div className={`relative w-full h-full max-h-[60vh] rounded-3xl overflow-hidden ${i % 2 === 1 ? 'order-2' : ''}`}>
                  <div className="scanline-overlay absolute inset-0 z-20 pointer-events-none opacity-0"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
                    }}
                  />
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="service-image object-cover"
                    sizes="50vw"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/80 via-transparent to-transparent z-0" />
                </div>

                <div className={`service-text-content flex flex-col justify-center relative ${i % 2 === 1 ? 'order-1' : ''}`}>
                  <span className="absolute -right-8 -top-16 text-[8rem] text-white/[0.03] font-bold leading-none select-none pointer-events-none">
                    {service.category}
                  </span>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-yellow-500 font-semibold tracking-[0.2em] text-base">
                      {service.category}
                    </span>
                    <div className="h-[1px] w-12 bg-yellow-500/30" />
                  </div>

                  <h3 className="text-[clamp(2rem,4vw,3.5rem)] text-white mb-6 tracking-tight leading-tight group-hover:text-yellow-400 transition-colors duration-500" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                    {service.title}
                  </h3>

                  <p className="text-white/60 text-xl font-light leading-relaxed mb-8 max-w-xl">
                    {service.desc}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    {service.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm tracking-wide font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-white hover:text-yellow-400 transition-colors duration-300 w-max cursor-pointer magnetic overflow-hidden">
                    <span className="explore-text uppercase tracking-[0.15em] font-semibold text-sm">Explore Expertise</span>
                    <ArrowRight className="service-icon w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE HORIZONTAL CARDS */}
          <div className="md:hidden flex flex-row overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 pt-4 w-[calc(100%+2rem)] -ml-4 px-4 gap-3">
            {services.map((service, i) => (
              <div
                key={i}
                className="service-mobile-card snap-center flex-shrink-0 relative h-[65vh] w-[82vw] flex flex-col justify-end overflow-hidden rounded-2xl border border-white/10 active:scale-[0.98] transition-transform duration-200"
                style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}
              >
                {/* Full-bleed image inside rounded card */}
                <Image src={service.image} alt={service.title} fill className="object-cover" loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=" />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                {/* Colored glow on tap */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-600/20 to-transparent opacity-0 active:opacity-100 transition-opacity duration-200" />
                {/* Content at bottom */}
                <div className="relative z-10 px-5 pb-6 pt-10">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="text-yellow-500 text-[10px] font-semibold tracking-[0.2em]">{service.category}</span>
                    <div className="h-px w-6 bg-yellow-500/50" />
                  </div>
                  <h3 className="text-2xl md:text-3xl text-white font-bold mb-2 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-3 line-clamp-3">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag, j) => (
                      <span key={j} className="px-2.5 py-1 rounded-full border border-white/15 bg-white/15 backdrop-blur-md text-white/90 text-[9px] md:text-[10px] uppercase tracking-wider font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to bottom, transparent, #020202)' }}
        />
    </section>
  );
}
