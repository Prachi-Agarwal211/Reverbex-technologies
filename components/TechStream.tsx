"use client";

import React, { useRef, useEffect } from "react";
import { 
  Cpu, Cloud, Box, Zap, Database, Eye,
  GitBranch, Network, Code, Layers, Hexagon, Shield,
  Link, Sparkles, Smartphone, Settings, Layout, Monitor
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TechStream() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  const techRows = [
    [
      { name: "AI Agents", icon: <Cpu className="w-6 h-6 text-blue-400" /> },
      { name: "CRM Systems", icon: <Cloud className="w-6 h-6 text-sky-400" /> },
      { name: "Custom Software", icon: <Box className="w-6 h-6 text-indigo-400" /> },
      { name: "Automation", icon: <Zap className="w-6 h-6 text-yellow-400" /> },
      { name: "Data Analytics", icon: <Database className="w-6 h-6 text-cyan-400" /> },
      { name: "API Development", icon: <Code className="w-6 h-6 text-blue-500" /> }
    ],
    [
      { name: "Workflow Automation", icon: <GitBranch className="w-6 h-6 text-purple-400" /> },
      { name: "System Architecture", icon: <Layers className="w-6 h-6 text-sky-500" /> },
      { name: "Web Apps", icon: <Code className="w-6 h-6 text-blue-500" /> },
      { name: "Backend Systems", icon: <Network className="w-6 h-6 text-pink-400" /> },
      { name: "Cloud Infrastructure", icon: <Cloud className="w-6 h-6 text-sky-400" /> },
      { name: "Security", icon: <Shield className="w-6 h-6 text-red-400" /> }
    ],
    [
      { name: "Blockchain", icon: <Link className="w-6 h-6 text-yellow-500" /> },
      { name: "Generative AI", icon: <Sparkles className="w-6 h-6 text-amber-400" /> },
      { name: "Mobile Apps", icon: <Smartphone className="w-6 h-6 text-green-400" /> },
      { name: "Process Automation", icon: <Settings className="w-6 h-6 text-gray-300" /> },
      { name: "UI/UX Design", icon: <Layout className="w-6 h-6 text-fuchsia-400" /> },
      { name: "Enterprise Solutions", icon: <Box className="w-6 h-6 text-indigo-400" /> }
    ]
  ];

  // GSAP Effects
  useEffect(() => {
    if (!containerRef.current || !tickerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.tech-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Ticker items stagger animation
      const tickerItems = tickerRef.current?.querySelectorAll('.ticker-item');
      tickerItems?.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // Parallax effect on scroll - restricted to desktop to prevent mobile jitter
      let mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(tickerRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-16 md:py-32 overflow-hidden bg-gradient-to-b from-[#050505] via-[#020202] to-[#050505]">
      {/* Continuous Moving Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-orb w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-blue-600/10 to-cyan-500/10" style={{ top: '0%', left: '-10%' }} />
        <div className="ambient-orb w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-gradient-to-r from-cyan-500/10 to-yellow-500/10" style={{ top: '30%', right: '-5%', animationDelay: '-8s' }} />
        <div className="ambient-orb w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10" style={{ bottom: '20%', left: '30%', animationDelay: '-15s' }} />
        <div className="absolute inset-0 mesh-gradient opacity-25" />
      </div>

      {/* Glow Edges */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-20">
        <div className="tech-header">
          <h2 className="text-4xl md:text-5xl text-gradient-animated text-center mb-4 tracking-tight drop-shadow-md" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Tech Stream
          </h2>
          <p className="text-white/40 text-center text-sm md:text-base font-light tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
            Built with modern technologies
          </p>
        </div>
      </div>

      {/* 3 Infinite Scrolling Ticker Layers with GSAP */}
      <div ref={tickerRef} className="relative flex flex-col gap-6 overflow-hidden w-full group py-4">
        {/* Left/Right Fade Out masks across all rows */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {techRows.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className={`flex items-center gap-6 whitespace-nowrap pl-6 ${rowIndex % 2 === 0 ? 'animate-scrolling-pills-left' : 'animate-scrolling-pills-right'}`} 
            style={{ animationDuration: `${15 + rowIndex * 4}s` }}
          >
            {[...row, ...row, ...row, ...row].map((tech, i) => (
              <div 
                key={`${rowIndex}-${i}`} 
                className="ticker-item inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-md text-white/80 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1 transition-all duration-300 font-sans shadow-[0_0_20px_rgba(0,0,0,0.3)] cursor-default"
              >
                <div className="drop-shadow-[0_0_8px_currentColor] opacity-90">{tech.icon}</div>
                <span className="text-sm md:text-base font-medium tracking-wide drop-shadow-sm">{tech.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes scroll-pills-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 4)); }
        }
        @keyframes scroll-pills-right {
          0% { transform: translateX(calc(-100% / 4)); }
          100% { transform: translateX(0); }
        }
        .animate-scrolling-pills-left {
          animation-name: scroll-pills-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-scrolling-pills-right {
          animation-name: scroll-pills-right;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .group:hover .animate-scrolling-pills-left,
        .group:hover .animate-scrolling-pills-right {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
