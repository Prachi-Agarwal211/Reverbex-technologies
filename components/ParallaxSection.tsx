"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transform values
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yHeader = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yCards = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  // GSAP Effects
  useEffect(() => {
    if (!containerRef.current || !cardsRef.current || !horizontalRef.current) return;

    const ctx = gsap.context(() => {
      // Cards with blur transitions on scroll
      const cards = cardsRef.current?.querySelectorAll('.capability-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 60, 
            filter: "blur(10px)",
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Add hover blur effect
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { filter: "blur(0px)", duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { filter: "blur(0px)", duration: 0.3 });
        });
      });

      // Horizontal scroll section
      const horizontalSection = horizontalRef.current;
      const horizontalCardsWrap = horizontalSection?.querySelector('.horizontal-cards-wrap');
      
      if (horizontalCardsWrap) {
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
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="capabilities" 
      ref={containerRef}
      className="relative w-full py-24 md:py-48 overflow-hidden bg-[#050505] flex items-center justify-center min-h-[100vh]"
    >
      {/* Scroll-Linked Grainy Background */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 z-0 h-[150%] origin-top opacity-[0.15] md:opacity-[0.25] mix-blend-screen pointer-events-none"
      >
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '150px 150px'
          }}
        />
      </motion.div>
      
      {/* Continuous Moving Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-orb w-[700px] h-[700px] bg-gradient-to-r from-blue-600/15 to-cyan-500/15" style={{ top: '-20%', left: '-10%' }} />
        <div className="ambient-orb w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/15 to-yellow-500/15" style={{ top: '30%', right: '-5%', animationDelay: '-8s' }} />
        <div className="ambient-orb w-[400px] h-[400px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10" style={{ bottom: '10%', left: '30%', animationDelay: '-12s' }} />
        <div className="absolute inset-0 mesh-gradient opacity-40" />
      </div>

      {/* Animated Atmospheric Glows - Hidden on Mobile to save GPU */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-blue-950/10 to-[#050505] z-0 pointer-events-none" />
      <div className="hidden md:block absolute top-1/2 left-1/2 w-[50rem] h-[50rem] bg-indigo-600/10 rounded-full blur-[120px] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse duration-[7000ms]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        {/* Parallax Header */}
        <motion.div style={{ y: yHeader }} className="text-center mb-16 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl lg:text-[7rem] text-gradient-animated mb-4 drop-shadow-xl tracking-tight leading-none" 
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Capabilities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/50 text-xs md:text-base lg:text-lg max-w-2xl mx-auto font-light tracking-[0.1em] md:tracking-[0.3em] uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Technical Expertise & Core Competencies
          </motion.p>
        </motion.div>

        {/* GSAP ScrollTrigger Cards with blur transitions */}
        <motion.div ref={cardsRef} style={{ y: yCards }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 w-full max-w-6xl mb-32">
          {capabilities.map((item, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={i} 
              className="capability-card p-6 md:p-10 border border-white/5 bg-[#0a0a0a] md:bg-white/[0.01] md:backdrop-blur-md hover:bg-[#111] md:hover:bg-white/[0.04] hover:border-white/15 transition-all duration-500 group rounded-2xl md:rounded-3xl relative overflow-hidden shadow-xl"
            >
              <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <h3 className="relative z-10 text-xl md:text-3xl text-white mb-2 md:mb-4 tracking-tight group-hover:text-yellow-400 md:group-hover:-translate-y-1 transition-all duration-500" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                {item.title}
              </h3>
              <p className="relative z-10 text-white/50 text-sm md:text-base font-light font-sans leading-relaxed md:group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Horizontal Scroll Section */}
        <div ref={horizontalRef} className="w-full overflow-hidden">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl text-white mb-4 tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Specialized Services
            </h3>
            <p className="text-white/40 text-sm md:text-base font-light tracking-wide uppercase">
              Scroll to explore
            </p>
          </div>
          
          <div className="horizontal-cards-wrap flex gap-6 md:gap-8 px-4">
            {horizontalCards.map((item, i) => (
              <div 
                key={i}
                className="flex-shrink-0 w-[85vw] md:w-[400px] p-8 md:p-12 border border-white/5 bg-[#0a0a0a] rounded-2xl md:rounded-3xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10">
                  <span className="text-yellow-500 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
                    0{i + 1}
                  </span>
                  <h4 className="text-2xl md:text-3xl text-white mb-4 tracking-tight group-hover:text-yellow-400 transition-colors duration-300" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                    {item.title}
                  </h4>
                  <p className="text-white/50 text-sm md:text-base font-light leading-relaxed">
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
