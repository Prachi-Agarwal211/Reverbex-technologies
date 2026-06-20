"use client";

import { useRef } from "react";
import {
  Globe, ShoppingCart, Smartphone, Megaphone,
  Search, Users, Database, MessageSquare,
  Cpu, Palette, RefreshCw, Sparkles, ArrowUpRight
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    title: "Custom Websites",
    desc: "Custom Next.js websites built for speed, SEO, and maximum business conversions.",
    link: "/services/website-development"
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    desc: "Custom online stores with payment integration, inventory management, and zero platform fees.",
    link: "/services/e-commerce"
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile applications for iOS and Android that drive engagement.",
    link: "/services/mobile-apps"
  },
  {
    icon: Megaphone,
    title: "Meta Ads",
    desc: "Facebook and Instagram advertising campaigns designed specifically to generate customers.",
    link: "/services/meta-ads"
  },
  {
    icon: Search,
    title: "Google Ads",
    desc: "Search, Display, and YouTube campaigns configured for measurable return on investment.",
    link: "/services/google-ads"
  },
  {
    icon: Users,
    title: "Lead Generation",
    desc: "High-converting funnels and landing pages that deliver qualified leads to your business.",
    link: "/services/lead-generation"
  },
  {
    icon: Database,
    title: "ERP Systems",
    desc: "Custom ERP systems designed to automate your specific business operations and data reporting.",
    link: "/services/erp-systems"
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Automation",
    desc: "Automated customer messaging flows, order confirmations, and instant lead routing.",
    link: "/services/whatsapp-automation"
  },
  {
    icon: Cpu,
    title: "AI Solutions",
    desc: "Intelligent process automation, AI chatbots, and custom automation flows to reduce overhead.",
    link: "/services/ai-solutions"
  },
  {
    icon: Palette,
    title: "Logo & Branding",
    desc: "Distinctive, high-impact brand identities that make your business stand out from competitors.",
    link: "/services/logo-branding"
  },
  {
    icon: RefreshCw,
    title: "Complete Rebranding",
    desc: "Comprehensive visual and strategic brand refresh from strategy to full deployment.",
    link: "/services/rebranding"
  },
  {
    icon: Sparkles,
    title: "SEO & AI Optimization",
    desc: "Dominate Google search results and get cited by AI engines like ChatGPT, Gemini, and Perplexity.",
    link: "/services/seo"
  }
];

export default function WhatWeOffer() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header reveal
    gsap.fromTo(
      ".offer-reveal-item",
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Cards reveal
    const cards = gridRef.current?.querySelectorAll(".service-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="capabilities"
      className="w-full py-24 md:py-32 bg-[#050505] border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16 md:mb-24 max-w-3xl">
          <span
            className="offer-reveal-item text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Capabilities
          </span>
          <h2
            className="offer-reveal-item text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.0] mb-6"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            What We Do.
          </h2>
          <p
            className="offer-reveal-item text-[#A0A0A0] text-lg font-normal leading-relaxed"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Everything your business needs to attract customers, streamline operations, and increase revenue — engineered custom under one roof.
          </p>
        </div>

        {/* 12 Service Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={index}
                href={service.link}
                className="service-card group block p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308] hover:bg-[#111111] transition-all duration-300 relative overflow-hidden"
                aria-label={service.title}
              >
                {/* Accent light indicator */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#EAB308] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                <div className="flex justify-between items-start mb-6">
                  {/* Icon */}
                  <div className="p-3 bg-[#111111] border border-[#1A1A1A] group-hover:border-[#EAB308]/20 group-hover:bg-[#EAB308]/5 rounded-lg transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-[#A0A0A0] group-hover:text-[#EAB308] transition-colors duration-300" />
                  </div>
                  
                  {/* Arrow Link */}
                  <ArrowUpRight className="w-5 h-5 text-[#666666] group-hover:text-white transition-colors duration-300" />
                </div>

                <h3
                  className="text-white text-xl font-bold tracking-tight mb-3 group-hover:text-[#EAB308] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  {service.title}
                </h3>
                
                <p
                  className="text-[#A0A0A0] text-sm leading-relaxed font-normal"
                  style={{ fontFamily: "var(--font-body), sans-serif" }}
                >
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
