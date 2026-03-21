"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const founders = [
  { name: "Anurag Singh", role: "Lead Architect", desc: "Building intelligent systems that transform businesses" },
  { name: "Prachi Agarwal", role: "Strategy Lead", desc: "Driving innovation through strategic AI solutions" },
];

export default function Founders() {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Effects
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation with stagger
      gsap.fromTo('.founders-header',
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Founder cards with reveal animation
      const cards = containerRef.current?.querySelectorAll('.founder-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 80,
            scale: 0.9,
            rotateX: -15
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );

        // Avatar animation
        const avatar = card.querySelector('.founder-avatar');
        gsap.fromTo(avatar,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="founders" ref={containerRef} className="relative w-full py-16 md:py-32 overflow-hidden bg-gradient-to-b from-black via-[#0a0a0a] to-[#050505]">
      {/* Continuous Moving Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-orb w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-r from-blue-600/15 to-cyan-600/15" style={{ top: '10%', left: '0%' }} />
        <div className="ambient-orb w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-gradient-to-r from-yellow-500/15 to-amber-500/15" style={{ top: '40%', right: '5%', animationDelay: '-6s' }} />
        <div className="ambient-orb w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-gradient-to-r from-cyan-500/15 to-blue-500/15" style={{ bottom: '20%', left: '25%', animationDelay: '-12s' }} />
        <div className="absolute inset-0 mesh-gradient opacity-30" />
      </div>

      {/* Background Glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-yellow-950/20" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="founders-header text-center mb-20">
          <h2 className="text-4xl md:text-6xl text-gradient-animated mb-3 tracking-tight drop-shadow-md" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Leadership</h2>
          <p className="text-white/40 text-sm md:text-base mb-20 font-light tracking-wide uppercase" style={{ fontFamily: "var(--font-inter), sans-serif" }}>The team behind Reverbex</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {founders.map((f, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={i} 
              className="founder-card p-8 md:p-10 border border-white/5 bg-[#0a0a0a] md:bg-white/[0.02] md:backdrop-blur-md hover:bg-[#111] md:hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 text-center group rounded-2xl md:rounded-3xl shadow-xl md:hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="founder-avatar w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-full border border-white/10 flex items-center justify-center text-2xl md:text-3xl text-white/50 group-hover:border-blue-400/40 group-hover:text-blue-400 md:group-hover:scale-110 transition-all duration-500 bg-gradient-to-br from-blue-500/5 to-yellow-500/5 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                {f.name.charAt(0)}
              </div>
              
              <h3 className="text-xl md:text-2xl text-white mb-1 md:mb-2 tracking-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{f.name}</h3>
              <p className="text-yellow-500/80 group-hover:text-yellow-400 transition-colors duration-300 text-xs md:text-sm mb-3 md:mb-4 font-medium tracking-wide uppercase">{f.role}</p>
              <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
