"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GraduationCap, Factory, ShoppingBag, Truck, Lightbulb, Store, ArrowRight } from "lucide-react";

const industries = [
  {
    icon: GraduationCap,
    name: "Education",
    desc: "Lead capture funnels, automation portals, and marketing platforms for coaching institutes and universities.",
    link: "/industries/education"
  },
  {
    icon: Factory,
    name: "Manufacturing",
    desc: "Digital catalogue displays, custom internal reporting dashboards, and ERP databases for industrial manufacturers.",
    link: "/industries/manufacturing"
  },
  {
    icon: ShoppingBag,
    name: "E-Commerce",
    desc: "Custom high-speed checkouts, storefront designs, and automated inventory flows for clothing and retail brands.",
    link: "/industries/ecommerce"
  },
  {
    icon: Truck,
    name: "Logistics",
    desc: "AI-first routing algorithms, fleet scheduling automations, and tracking systems for transport providers.",
    link: "/industries/logistics"
  },
  {
    icon: Lightbulb,
    name: "Startups",
    desc: "High-performance landing pages, custom SaaS database tools, and conversion-optimized sales channels.",
    link: "/industries/startups"
  },
  {
    icon: Store,
    name: "Retail",
    desc: "Custom inventory management, local SEO architectures, and automated customer notifications on WhatsApp.",
    link: "/industries/retail"
  }
];

export default function IndustriesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".ind-reveal",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    const cards = gridRef.current?.querySelectorAll(".ind-card");
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
      id="industries"
      className="w-full py-24 bg-[#050505] border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-left mb-16 md:mb-20 max-w-2xl">
          <span
            className="ind-reveal text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Target Sectors
          </span>
          <h2
            className="ind-reveal text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.0] mb-6"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Industries We Serve.
          </h2>
          <p
            className="ind-reveal text-[#A0A0A0] text-lg font-normal leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            We deploy specialized systems engineered specifically to solve domain-specific problems.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {industries.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.link}
                className="ind-card group p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308] transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 bg-[#050505] border border-[#1A1A1A] rounded-lg shrink-0 w-max mb-6">
                    <Icon className="w-6 h-6 text-[#A0A0A0] group-hover:text-[#EAB308] transition-colors duration-300" />
                  </div>
                  
                  <h3
                    className="text-white text-xl font-bold tracking-tight mb-3"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    {item.name}
                  </h3>
                  
                  <p
                    className="text-[#A0A0A0] text-sm leading-relaxed mb-6 font-normal"
                    style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#666666] group-hover:text-white transition-colors duration-300 pt-4 border-t border-[#1A1A1A]">
                  <span>Explore industry</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
