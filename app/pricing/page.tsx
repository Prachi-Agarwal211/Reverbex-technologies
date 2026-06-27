"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import ReverbexBond from "../../components/ReverbexBond";
import PageCTA from "../../components/PageCTA";

const tiers = [
  {
    name: "Foundational Infrastructure",
    price: "Custom Quote",
    description: "Perfect for businesses needing a high-performance digital presence to build trust and capture search intent.",
    features: [
      "Custom Next.js Web Development",
      "Sub-second Load Times Guarantee",
      "Technical SEO & Schema Markup",
      "100% Code Ownership",
      "Analytics & Tag Setup"
    ]
  },
  {
    name: "The Growth Engine",
    price: "Custom Quote",
    description: "For established businesses looking to actively generate leads, automate follow-ups, and scale revenue.",
    features: [
      "Everything in Foundational",
      "High-Converting Landing Pages",
      "Meta & Google Ads Management",
      "WhatsApp Business API Automation",
      "CRM Lead Routing Integration",
      "Weekly Performance Reporting"
    ],
    highlight: true
  },
  {
    name: "Enterprise Engineering",
    price: "Custom Quote",
    description: "Complex system architecture for manufacturing, e-commerce, and corporate operations.",
    features: [
      "Custom ERP System Development",
      "Full B2B E-Commerce Portals",
      "Zero Platform Transaction Fees",
      "Custom Backend APIs (Node/PostgreSQL)",
      "Serverless Scalable Infrastructure",
      "SLA-Backed 24/7 Support"
    ]
  }
];

export default function PricingPage() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Header reveal
    gsap.fromTo(
      ".pricing-header > *",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
    );

    // Cards stagger in
    gsap.fromTo(
      ".pricing-card",
      { y: 100, opacity: 0, rotationX: 10 },
      { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.15, ease: "back.out(1.2)", delay: 0.3 }
    );

  }, { scope: containerRef });

  // 3D Hover Effect
  useEffect(() => {
    const cards = document.querySelectorAll(".pricing-card");
    if (!cards || window.matchMedia("(max-width: 1024px)").matches) return;

    cards.forEach((card) => {
      const el = card as HTMLElement;
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate rotation based on cursor position relative to card center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        gsap.to(el, {
          rotateX,
          rotateY,
          transformPerspective: 1000,
          ease: "power2.out",
          duration: 0.4
        });
      };

      const handleMouseLeave = () => {
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          ease: "power3.out",
          duration: 0.6
        });
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
      
      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  return (
    <main ref={containerRef} className="w-full text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30 overflow-hidden relative bg-[#050505]">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[#EAB308]/5 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="pricing-header mb-32 text-center max-w-4xl mx-auto pt-16">
          <span className="text-[#EAB308] text-sm font-semibold tracking-widest uppercase block mb-6">
            Investment
          </span>
          <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-black tracking-tighter leading-[0.95] mb-8">
            Transparent Value.
          </h1>
          <p className="text-[#D0D0D0] text-xl font-medium leading-relaxed max-w-2xl mx-auto text-shadow-body">
            We don't charge per-user licenses. We don't take transaction cuts on your e-commerce store. You pay for premium engineering and performance management.
          </p>
        </div>

        {/* 3D Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-40 perspective-[2000px]">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`pricing-card p-10 flex flex-col bg-[#0A0A0A] rounded-[2rem] transform-gpu will-change-transform ${
                tier.highlight 
                  ? 'border border-[#EAB308]/40 shadow-[0_0_50px_rgba(234,179,8,0.1)] relative z-10 scale-105' 
                  : 'border border-[#1A1A1A] hover:border-[#333]'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#EAB308] text-black text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                  Most Requested
                </div>
              )}
              
              <h3 className="text-3xl font-black text-white mb-4">
                {tier.name}
              </h3>
              <p className="text-[#D0D0D0] text-sm leading-relaxed mb-8 h-20 text-shadow-body">{tier.description}</p>
              
              <div className="text-4xl font-black text-[#EAB308] mb-8 pb-8 border-b border-[#1A1A1A]">
                {tier.price}
              </div>
              
              <ul className="space-y-6 mb-12 flex-grow">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-4 text-white text-sm">
                    <span className="text-[#EAB308] font-bold">✓</span>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href="/contact"
                className={`w-full py-5 rounded-xl text-center font-bold transition-all duration-300 transform hover:scale-[1.02] ${
                  tier.highlight 
                    ? 'bg-[#EAB308] text-black hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]' 
                    : 'bg-[#1A1A1A] text-white hover:bg-[#333333]'
                }`}
              >
                Request Quote
              </Link>
            </div>
          ))}
        </div>

        <div className="mb-40">
          <ReverbexBond />
        </div>

        <PageCTA />

      </div>
    </main>
  );
}
