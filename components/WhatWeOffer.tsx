"use client";

import { useRef } from "react";
import {
  Globe,
  ShoppingCart,
  Smartphone,
  Megaphone,
  Search,
  Users,
  Database,
  MessageSquare,
  Cpu,
  Palette,
  RefreshCw,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Globe,
    title: "Custom Websites",
    desc: "Custom Next.js websites built for speed, SEO, and maximum business conversions.",
    link: "/services/website-development",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    desc: "Custom online stores with payment integration, inventory management, and zero platform fees.",
    link: "/services/e-commerce",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile applications for iOS and Android that drive engagement.",
    link: "/services/mobile-apps",
  },
  {
    icon: Megaphone,
    title: "Meta Ads",
    desc: "Facebook and Instagram advertising campaigns designed specifically to generate customers.",
    link: "/services/meta-ads",
  },
  {
    icon: Search,
    title: "Google Ads",
    desc: "Search, Display, and YouTube campaigns configured for measurable return on investment.",
    link: "/services/google-ads",
  },
  {
    icon: Users,
    title: "Lead Generation",
    desc: "High-converting funnels and landing pages that deliver qualified leads to your business.",
    link: "/services/lead-generation",
  },
  {
    icon: Database,
    title: "ERP & CRM",
    desc: "Custom ERP and CRM systems to automate operations, track leads, manage customers, and drive sales.",
    link: "/services/erp-systems",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Automation",
    desc: "Automated customer messaging flows, order confirmations, and instant lead routing.",
    link: "/services/whatsapp-automation",
  },
  {
    icon: Cpu,
    title: "AI Solutions",
    desc: "Intelligent process automation, AI chatbots, and custom automation flows to reduce overhead.",
    link: "/services/ai-solutions",
  },
  {
    icon: Palette,
    title: "Logo & Branding",
    desc: "Distinctive, high-impact brand identities that make your business stand out from competitors.",
    link: "/services/logo-branding",
  },
  {
    icon: RefreshCw,
    title: "Complete Rebranding",
    desc: "Comprehensive visual and strategic brand refresh from strategy to full deployment.",
    link: "/services/rebranding",
  },
  {
    icon: Sparkles,
    title: "SEO & AI Optimization",
    desc: "Dominate Google search results and get cited by AI engines like ChatGPT, Gemini, and Perplexity.",
    link: "/services/seo",
  },
];

export default function WhatWeOffer() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Clip-path wipe on heading
    const headingMask = containerRef.current.querySelector(".offer-heading-mask");
    if (headingMask) {
      gsap.fromTo(
        headingMask,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.0,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Eyebrow slide
    const eyebrow = containerRef.current.querySelector(".offer-eyebrow");
    if (eyebrow) {
      gsap.fromTo(
        eyebrow,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".service-card");

    // Card stack fan-out with rotateZ variation
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 50,
        rotateZ: (i: number) => (i % 2 === 0 ? -2 : 2),
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        rotateZ: 0,
        scale: 1,
        stagger: {
          each: 0.05,
          from: "start",
        },
        duration: 0.6,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="capabilities"
      className="w-full py-24 md:py-32 bg-transparent border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-left mb-16 md:mb-24 max-w-3xl">
          <span className="offer-label text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            Capabilities
          </span>
          <h2 className="offer-heading text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-[-0.04em] leading-[1.0] mb-6">
            What We Build.
          </h2>
          <p className="offer-subtitle text-[#A0A0A0] text-lg font-normal leading-relaxed">
            Twelve services. Each one engineered to move a specific business metric.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          style={{ perspective: "1000px" }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isLarge = index === 0 || index === 4 || index === 8;
            return (
              <Link
                key={index}
                href={service.link}
                className={`service-card group block p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308] hover:bg-[#111111] transition-all duration-300 relative overflow-hidden ${
                  isLarge ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
                aria-label={service.title}
              >
                {/* Accent light indicator */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#EAB308] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-[#111111] border border-[#1A1A1A] group-hover:border-[#EAB308]/20 group-hover:bg-[#EAB308]/5 rounded-lg transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-[#A0A0A0] group-hover:text-[#EAB308] transition-colors duration-300" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#666666] group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-white text-xl font-bold tracking-tight mb-3 group-hover:text-[#EAB308] transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-[#A0A0A0] text-sm leading-relaxed font-normal">
                  {service.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
