"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GraduationCap, Factory, ShoppingBag, Truck, Rocket, Store, ArrowUpRight } from "lucide-react";

const industries = [
  { name: "Education", link: "/industries/education", icon: GraduationCap },
  { name: "Manufacturing", link: "/industries/manufacturing", icon: Factory },
  { name: "E-Commerce", link: "/industries/ecommerce", icon: ShoppingBag },
  { name: "Logistics", link: "/industries/logistics", icon: Truck },
  { name: "Startups", link: "/industries/startups", icon: Rocket },
  { name: "Retail", link: "/industries/retail", icon: Store },
];

export default function Industries() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".industry-reveal",
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

    const cards = gridRef.current?.querySelectorAll(".industry-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
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
      className="w-full py-24 md:py-32 bg-[#0A0A0A] border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 md:mb-24 mx-auto md:mx-0 max-w-3xl">
          <span
            className="industry-reveal text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Sectors
          </span>
          <h2
            className="industry-reveal text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.0] mb-6"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Industries We Serve.
          </h2>
          <p
            className="industry-reveal text-[#A0A0A0] text-lg font-normal leading-relaxed mx-auto md:mx-0"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            We've built digital solutions, automated workflows, and generated leads for businesses across multiple sectors.
          </p>
        </div>

        {/* Industries Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <a
                key={index}
                href={industry.link}
                className="industry-card group flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between p-6 md:p-8 bg-[#050505] border border-[#1A1A1A] rounded-xl hover:border-[#EAB308]/50 hover:bg-[#111111] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-4 md:mb-0">
                  <div className="p-3 bg-[#111111] rounded-lg border border-[#1A1A1A] group-hover:bg-[#EAB308]/10 group-hover:border-[#EAB308]/30 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-[#A0A0A0] group-hover:text-[#EAB308] transition-colors duration-300" />
                  </div>
                  <h3
                    className="text-white text-lg md:text-xl font-bold tracking-tight text-center md:text-left group-hover:text-white transition-colors duration-300"
                    style={{ fontFamily: "var(--font-heading), sans-serif" }}
                  >
                    {industry.name}
                  </h3>
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#666666] hidden md:block group-hover:text-[#EAB308] transition-colors duration-300" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
