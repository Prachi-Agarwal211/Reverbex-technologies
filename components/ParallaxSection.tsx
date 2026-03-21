"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  const capabilities = [
    { title: "AI Agents", desc: "Autonomous agents that handle complex business processes 24/7" },
    { title: "AI Automations", desc: "Intelligent workflows that streamline your business operations" },
    { title: "CRM Systems", desc: "Custom customer relationship management with analytics" },
    { title: "Process Automation", desc: "Reduce manual effort with intelligent workflow automation" },
    { title: "API Integration", desc: "Seamless connectivity between disparate systems and platforms" },
    { title: "Custom Software", desc: "Tailored solutions built for your unique requirements" },
  ];

  const horizontalCards = [
    { title: "AI Agents", desc: "Autonomous agents that handle complex business processes" },
    { title: "Automations", desc: "Streamline operations with intelligent workflows" },
    { title: "CRM Systems", desc: "Custom solutions built for your business" },
  ];

  // GSAP Effects
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current || !cardsRef.current || !horizontalRef.current) return;

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      let { isDesktop, isMobile } = context.conditions as { isDesktop: boolean, isMobile: boolean };

      // Capability Cards fade up
      const cards = cardsRef.current?.querySelectorAll('.capability-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: isMobile ? 30 : 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // Horizontal scroll logic
      const horizontalSection = horizontalRef.current;
      const horizontalCardsWrap = horizontalSection?.querySelector('.horizontal-cards-wrap');
      
      if (isDesktop && horizontalCardsWrap) {
        // Desktop: complex pinning and scrubbing
        gsap.to(horizontalCardsWrap, {
          x: () => -(horizontalCardsWrap.scrollWidth - window.innerWidth + 100),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSection,
            start: "top 80%",
            end: () => `+=${horizontalCardsWrap.scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        });

        // Parallax Header & Cards & BG
        gsap.to(".parallax-bg", {
          y: "30%",
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, scrub: true }
        });
        gsap.to(".parallax-header", {
          y: "20%",
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, scrub: true }
        });
        gsap.to(cardsRef.current, {
          y: "-5%",
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, scrub: true }
        });
      }

      if (isMobile) {
        // Mobile: simple fade up for horizontal section, disable hijacking
        const horizCards = horizontalSection?.querySelectorAll('.horizontal-card');
        if (horizontalSection && horizCards && horizCards.length > 0) {
          gsap.fromTo(horizCards as unknown as Element, 
            { opacity: 0, y: 40 },
            {
               opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
               scrollTrigger: {
                  trigger: horizontalSection,
                  start: "top 80%",
                  toggleActions: "play none none reverse"
               }
            }
          );
        }
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      id="capabilities" 
      ref={containerRef}
      className="relative w-full py-24 md:py-48 overflow-hidden bg-[#050505] flex items-center justify-center min-h-[100vh]"
    >
      {/* Scroll-Linked Grainy Background */}
      <div 
        className="parallax-bg absolute inset-0 z-0 h-[150%] opacity-[0.15] md:opacity-[0.25] mix-blend-screen pointer-events-none -top-[25%]"
      >
        <div 
          className="w-full h-full hw-accelerated"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '150px 150px'
          }}
        />
      </div>
      
      {/* Static Gradient Orbs instead of animated blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[700px] h-[700px] bg-blue-600/10 blur-[120px] rounded-full" style={{ top: '-20%', left: '-10%' }} />
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full" style={{ top: '30%', right: '-5%' }} />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/5 blur-[80px] rounded-full" style={{ bottom: '10%', left: '30%' }} />
        <div className="absolute inset-0 mesh-gradient-static opacity-30 mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        {/* Parallax Header */}
        <div className="parallax-header text-center mb-16 md:mb-32">
          <h2 
            className="text-[clamp(2.5rem,8vw,6.5rem)] text-white mb-2 md:mb-4 drop-shadow-xl tracking-tight leading-tight py-2 font-medium" 
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Capabilities
          </h2>
          <p
            className="text-white/60 text-[clamp(0.7rem,2vw,1rem)] max-w-2xl mx-auto font-light tracking-[0.2em] md:tracking-[0.3em] uppercase pb-2"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Technical Expertise & Core Competencies
          </p>
        </div>

        {/* GSAP Cards */}
        <div ref={cardsRef} className="parallax-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 w-full max-w-6xl mb-32">
          {capabilities.map((item, i) => (
            <div 
              key={i} 
              className="capability-card p-6 md:p-10 border border-white/5 bg-[#0a0a0a] md:bg-white/[0.01] hover:bg-[#111] md:hover:bg-white/[0.04] hover:border-white/15 transition-all duration-500 group rounded-2xl md:rounded-3xl relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.5)] hw-accelerated"
            >
              <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <h3 className="relative z-10 text-xl md:text-3xl text-white mb-2 md:mb-4 tracking-tight group-hover:text-yellow-400 md:group-hover:-translate-y-1 transition-all duration-500" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                {item.title}
              </h3>
              <p className="relative z-10 text-white/60 text-sm md:text-base font-light font-sans leading-relaxed md:group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Horizontal Scroll Section */}
        <div ref={horizontalRef} className="w-full overflow-hidden">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-[clamp(2rem,5vw,4.5rem)] text-white mb-2 md:mb-4 tracking-tight leading-tight py-2 font-medium" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Specialized Services
            </h3>
            <p className="text-white/50 text-[clamp(0.75rem,2vw,1rem)] font-light tracking-[0.2em] uppercase">
              Scroll to explore
            </p>
          </div>
          
          <div className="horizontal-cards-wrap flex flex-col md:flex-row gap-6 md:gap-8 px-0 md:px-4 pb-12 w-full md:w-max overflow-x-hidden">
            {horizontalCards.map((item, i) => (
              <div 
                key={i}
                className="horizontal-card flex-shrink-0 w-full md:w-[450px] p-8 md:p-12 border border-white/5 bg-[#0a0a0a] rounded-2xl md:rounded-3xl relative overflow-hidden group hw-accelerated shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  <span className="text-yellow-500 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                    0{i + 1}
                  </span>
                  <h4 className="text-[clamp(1.5rem,3vw,2.5rem)] text-white mb-4 tracking-tight group-hover:text-yellow-400 transition-colors duration-300 leading-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                    {item.title}
                  </h4>
                  <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
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
