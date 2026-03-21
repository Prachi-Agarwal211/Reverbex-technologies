"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  { 
    title: "AI Agents", 
    desc: "Intelligent autonomous agents that handle complex business processes 24/7, from customer support to data processing.",
    icon: "🤖",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop"
  },
  { 
    title: "AI Automations", 
    desc: "Streamline operations with intelligent workflows that learn and adapt to your business needs.",
    icon: "⚡",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop"
  },
  { 
    title: "CRM Systems", 
    desc: "Custom CRM solutions built for your unique business requirements with automation and analytics.",
    icon: "💎",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
  },
  { 
    title: "Custom Software", 
    desc: "Tailored software solutions from frontend to backend, built with modern technologies.",
    icon: "✦",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop"
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yBg1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  // GSAP Effects
  useEffect(() => {
    if (!cardsRef.current) return;

    const ctx = gsap.context(() => {
      // Service cards with image reveal animations
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      cards?.forEach((card, i) => {
        const image = card.querySelector('.service-image');
        
        // Initial state for image
        gsap.set(image, { scale: 1.2, filter: "blur(5px)" });

        // Scroll-triggered image reveal
        gsap.fromTo(image,
          { scale: 1.2, filter: "blur(5px)", opacity: 0.6 },
          {
            scale: 1,
            filter: "blur(0px)",
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            }
          }
        );

        // Card entrance animation
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 80,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Hover effects
        card.addEventListener('mouseenter', () => {
          gsap.to(image, { scale: 1.1, duration: 0.5, ease: "power2.out" });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(image, { scale: 1, duration: 0.5, ease: "power2.out" });
        });
      });

    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="relative w-full py-16 md:py-32 overflow-hidden bg-gradient-to-b from-[#050505] via-black to-[#050505]">
      {/* Continuous Moving Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-orb w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-blue-600/20 to-cyan-500/20" style={{ top: '0%', left: '-10%' }} />
        <div className="ambient-orb w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-gradient-to-r from-cyan-500/15 to-yellow-500/15" style={{ top: '40%', right: '-10%', animationDelay: '-7s' }} />
        <div className="ambient-orb w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-gradient-to-r from-blue-500/15 to-cyan-500/15" style={{ bottom: '10%', left: '20%', animationDelay: '-14s' }} />
        <div className="ambient-orb w-[250px] h-[250px] md:w-[450px] md:h-[450px] bg-gradient-to-r from-yellow-500/15 to-amber-500/15" style={{ top: '60%', left: '40%', animationDelay: '-10s' }} />
        <div className="absolute inset-0 mesh-gradient opacity-30" />
      </div>

      {/* Dynamic Scroll-Linked Background Glows */}
      <motion.div 
        style={{ y: yBg1 }}
        className="hidden md:block absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: yBg2 }}
        className="hidden md:block absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl text-gradient-animated text-center mb-4 tracking-tight drop-shadow-md" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            What We Build
          </h2>
          <p className="text-white/50 text-center text-sm md:text-lg max-w-xl mx-auto font-light tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            AI Agents, Automations & Custom Software
          </p>
        </motion.div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 w-full">
          {services.map((service, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={i} 
              className="service-card group relative rounded-2xl md:rounded-3xl border border-white/5 bg-[#0a0a0a] md:bg-white/[0.03] md:backdrop-blur-xl hover:bg-[#111] md:hover:bg-white/[0.08] hover:border-white/10 transition-all duration-500 overflow-hidden shadow-xl flex flex-col"
            >
              {/* Internal subtle glow on hover */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
              
              {/* Card Image Header with reveal animation */}
              <div className="relative w-full h-48 md:h-72 overflow-hidden z-10">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="service-image w-full h-full object-cover"
                  priority={i < 2}
                  loading={i < 2 ? "eager" : "lazy"}
                />
                
                {/* Floating Icon over the image */}
                <div className="absolute bottom-4 left-4 md:left-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-black/50 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-lg md:group-hover:-translate-y-2 group-hover:border-yellow-500/50 transition-all duration-500">
                  <span className="text-lg md:text-xl text-yellow-500">{service.icon}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="relative z-10 p-6 md:p-10 flex-1 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl text-white mb-3 md:mb-4 tracking-tight group-hover:text-yellow-400 transition-colors duration-300" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed font-light font-sans">
                  {service.desc}
                </p>
                
                {/* Learn More link appearance */}
                <div className="mt-6 md:mt-8 flex items-center gap-2 md:gap-3 text-xs md:text-sm font-semibold text-yellow-500/80 group-hover:text-yellow-400 transition-colors uppercase tracking-widest cursor-pointer w-max">
                  <span className="md:group-hover:translate-x-1 transition-transform">Explore</span>
                  <span className="text-base md:text-lg leading-none md:group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
