"use client";

import React, { useRef } from "react";
import {
  Bot, Code2, Globe, Smartphone, Cloud, Link2, Database,
  BarChart3, ShoppingCart, CreditCard, Headphones, Video,
  Megaphone, Palette, PenTool, Workflow, Shield, Cpu, Sparkles
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const capabilities = [
  {
    icon: Bot,
    title: "AI Automations",
    desc: "Intelligent workflows that eliminate manual tasks and scale operations autonomously",
    size: "large",
    glow: "from-cyan-500/20"
  },
  {
    icon: Code2,
    title: "Software Development",
    desc: "Enterprise-grade applications built with precision and scalability at the core",
    size: "medium",
    glow: "from-blue-500/20"
  },
  {
    icon: Globe,
    title: "Web Development",
    desc: "High-performance web platforms with cutting-edge frontend and backend architecture",
    size: "medium",
    glow: "from-indigo-500/20"
  },
  {
    icon: Smartphone,
    title: "App Development",
    desc: "Native and cross-platform mobile experiences that users love",
    size: "medium",
    glow: "from-purple-500/20"
  },
  {
    icon: Cloud,
    title: "Cloud Systems",
    desc: "Scalable cloud infrastructure designed for zero downtime and global reach",
    size: "medium",
    glow: "from-sky-500/20"
  },
  {
    icon: Link2,
    title: "Blockchain Technology",
    desc: "Decentralized solutions and smart contracts for secure, transparent systems",
    size: "medium",
    glow: "from-amber-500/20"
  },
  {
    icon: Database,
    title: "CRM Systems",
    desc: "Custom customer relationship platforms that drive retention and growth",
    size: "medium",
    glow: "from-emerald-500/20"
  },
  {
    icon: BarChart3,
    title: "AI Powered Dashboards",
    desc: "Real-time analytics and intelligent insights that inform every decision",
    size: "large",
    glow: "from-rose-500/20"
  },
  {
    icon: ShoppingCart,
    title: "AI E-Commerce Platforms",
    desc: "Custom commerce engines with intelligent product recommendations and automation",
    size: "medium",
    glow: "from-pink-500/20"
  },
  {
    icon: CreditCard,
    title: "Payment Integrations",
    desc: "Secured payment gateways including Razorpay with end-to-end encryption",
    size: "medium",
    glow: "from-violet-500/20"
  },
  {
    icon: Headphones,
    title: "Audio Production",
    desc: "Professional sound design, mixing, and production for any media",
    size: "medium",
    glow: "from-orange-500/20"
  },
  {
    icon: Video,
    title: "Video Editing",
    desc: "Cinematic post-production, motion graphics, and visual storytelling",
    size: "medium",
    glow: "from-red-500/20"
  },
  {
    icon: Megaphone,
    title: "AI Powered Ads",
    desc: "Data-driven ad generation and optimization across all platforms",
    size: "medium",
    glow: "from-teal-500/20"
  },
  {
    icon: Palette,
    title: "Graphic Designing",
    desc: "Visual identity systems, brand collateral, and stunning digital art",
    size: "medium",
    glow: "from-fuchsia-500/20"
  },
  {
    icon: PenTool,
    title: "Logo Designing",
    desc: "Distinctive brand marks that capture your essence and leave lasting impressions",
    size: "medium",
    glow: "from-lime-500/20"
  },
  {
    icon: Workflow,
    title: "Workflow Orchestration",
    desc: "End-to-end process automation connecting your entire tech stack",
    size: "medium",
    glow: "from-cyan-500/20"
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    desc: "Enterprise-grade security architecture and regulatory compliance solutions",
    size: "medium",
    glow: "from-blue-500/20"
  },
  {
    icon: Cpu,
    title: "AI Agents & LLMs",
    desc: "Custom AI agents and language models tailored to your business logic",
    size: "large",
    glow: "from-indigo-500/20"
  }
];

export default function WhatWeOffer() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const floatingOrbsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Header animation with stagger - faster
    gsap.fromTo('.offer-header h2',
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo('.offer-header .subtitle',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate floating orbs on mobile - reduced motion
    if (floatingOrbsRef.current) {
      gsap.to(floatingOrbsRef.current.querySelectorAll('.mobile-orb'), {
        y: -20,
        duration: 2.5,
        stagger: {
          amount: 1.5,
          from: "random"
        },
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Desktop: Staggered grid reveal - faster, less stagger
    mm.add("(min-width: 768px)", () => {
      const cards = gridRef.current?.querySelectorAll('.capability-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5,
            stagger: {
              amount: 0.8,
              grid: "auto",
              from: "center"
            },
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // Mobile: Simple fade-up reveals
    mm.add("(max-width: 767px)", () => {
      const cards = gridRef.current?.querySelectorAll('.capability-card');
      cards?.forEach((card, i) => {
        card.setAttribute('data-reveal', 'fade-up');
        card.setAttribute('style', `--reveal-delay: ${i * 30}ms`);
        const observer = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting) {
              card.setAttribute('data-visible', 'true');
              observer.disconnect();
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(card);
      });
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="capabilities"
      className="relative w-full py-24 md:py-32 bg-[#020202] overflow-hidden"
    >
      {/* ===== BACKDROP LAYER: Fractal Glass + Ambient Lighting ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Desktop fractal glass effect - lighter */}
        <div className="hidden md:block absolute inset-0 fractal-glass-desktop opacity-20" />
        
        {/* Mobile static gradient - lighter */}
        <div className="md:hidden absolute inset-0 fractal-glass-mobile opacity-30" />
        
        {/* Animated mesh gradient overlay - lighter */}
        <div className="absolute inset-0 mesh-gradient-static opacity-15" />
        
        {/* Top gradient transition from hero */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#020202] via-[#020202]/60 to-transparent z-10" />
      </div>

      {/* ===== AMBIENT LIGHTING LAYER ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Desktop: Large ambient glows - lighter */}
        <div className="hidden md:block absolute top-20 left-1/4 w-[600px] h-[600px] bg-cyan-600/5 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="hidden md:block absolute bottom-40 right-1/4 w-[500px] h-[500px] bg-indigo-600/4 blur-[140px] rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/3 blur-[160px] rounded-full" />
        
        {/* Mobile: Smaller, strategic glows - lighter */}
        <div ref={floatingOrbsRef} className="md:hidden absolute inset-0">
          <div className="mobile-orb absolute top-32 right-[-10%] w-64 h-64 bg-cyan-600/8 blur-[100px] rounded-full" />
          <div className="mobile-orb absolute bottom-48 left-[-10%] w-56 h-56 bg-indigo-600/6 blur-[90px] rounded-full" />
          <div className="mobile-orb absolute top-1/2 left-[20%] w-40 h-40 bg-blue-600/5 blur-[80px] rounded-full" />
        </div>
      </div>

      {/* ===== NOISE TEXTURE OVERLAY ===== */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] noise-texture mix-blend-overlay" />

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header - Award-winning typography */}
        <div className="offer-header text-center mb-16 md:mb-20">
          {/* Label with animated lines */}
          <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-white/20 flex-1 max-w-[60px]" />
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-white/60" />
              <span className="text-white/80 text-[clamp(0.6rem,1.3vw,0.75rem)] font-medium tracking-[0.2em] uppercase tabular">
                Our Capabilities
              </span>
              <Sparkles className="w-3.5 h-3.5 text-white/60" />
            </div>
            <div className="h-px bg-gradient-to-r from-white/20 via-white/20 to-transparent flex-1 max-w-[60px]" />
          </div>
          
          {/* Main heading with gradient text */}
          <h2
            className="text-[clamp(2rem,5vw,4rem)] text-white mb-5 tracking-tight leading-[1.05] font-semibold mx-auto max-w-3xl"
            style={{ 
              fontFamily: "var(--font-syne), sans-serif",
              textShadow: '0 0 60px rgba(255,255,255,0.08)'
            }}
          >
            What We{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Build
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/15 via-blue-400/15 to-indigo-400/15 blur-xl -z-10" />
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="subtitle text-white/50 text-[clamp(0.75rem,1.3vw,0.95rem)] font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            From AI-powered automation to stunning visual design — we architect solutions that drive measurable growth
          </p>
        </div>

        {/* Capabilities Grid - Premium card design */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-4"
        >
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            const isLarge = cap.size === "large";

            return (
              <div
                key={i}
                className={`capability-card group relative rounded-xl md:rounded-2xl border border-white/[0.05] bg-gradient-to-br from-white/[0.012] to-transparent p-4 md:p-5 overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] active:scale-[0.98] ${
                  isLarge ? 'md:col-span-2 md:row-span-1' : ''
                }`}
                style={{
                  touchAction: 'manipulation'
                }}
              >
                {/* Animated gradient background on hover - faster */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cap.glow} to-transparent opacity-0 group-hover:opacity-100 md:transition-opacity duration-500`} />
                
                {/* Inner glow ring */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: 'inset 0 0 30px rgba(255,255,255,0.025)'
                  }}
                />

                {/* Mobile tap feedback */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 md:hidden active:opacity-100 transition-opacity duration-200" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with glow effect - smaller */}
                  <div className="w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06] flex items-center justify-center mb-3 md:mb-4 group-hover:border-white/[0.15] group-hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.03)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-white/50 transition-all duration-300 group-hover:text-white group-hover:rotate-6" />
                  </div>

                  {/* Title - smaller */}
                  <h3
                    className="text-white/90 text-[13px] md:text-sm font-semibold tracking-tight mb-1.5 md:mb-2 group-hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    {cap.title}
                  </h3>

                  {/* Description - smaller */}
                  <p className="text-white/35 text-[10px] md:text-[11px] leading-relaxed font-light group-hover:text-white/55 transition-colors duration-300 line-clamp-2 md:line-clamp-2">
                    {cap.desc}
                  </p>
                </div>

                {/* Corner accent lights - smaller */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Scanning line effect on hover - faster */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent animate-scan-down" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA - Premium button design */}
        <div className="offer-header text-center mt-16 md:mt-20">
          <p className="text-white/35 text-[11px] md:text-xs tracking-[0.18em] uppercase mb-5">
            Ready to transform your business?
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-white to-gray-100 text-black text-[13px] font-semibold rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden relative"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <span className="relative z-10">Start a Project</span>
            <svg className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom gradient transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #020202)' }}
      />
    </section>
  );
}
