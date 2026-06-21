"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Factory, ShoppingBag, Truck, Rocket, Store, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Header entrance
    const header = containerRef.current.querySelector(".ind-header");
    if (header) {
      gsap.fromTo(
        header.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Items stagger from alternating sides
    const items = containerRef.current.querySelectorAll(".ind-item");
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="industries"
      className="w-full py-24 md:py-32 bg-transparent border-b border-[#1A1A1A] relative"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header — left-aligned */}
        <div className="ind-header text-left mb-16 md:mb-24 max-w-3xl">
          <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            Sectors
          </span>
          <h2 className="text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-[-0.04em] leading-[1.0] mb-6">
            Industries We
            <br />
            <span className="text-[#EAB308]">Build For.</span>
          </h2>
          <p className="text-[#A0A0A0] text-lg font-normal leading-relaxed">
            We&apos;ve built digital solutions, automated workflows, and generated leads across multiple sectors.
          </p>
        </div>

        {/* Editorial list layout — not card grid */}
        <div className="flex flex-col">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <a
                key={index}
                href={industry.link}
                className="ind-item group flex items-center gap-6 md:gap-10 py-7 md:py-9 border-t border-[#1A1A1A] last:border-b hover:bg-white/[0.01] transition-colors duration-300"
              >
                {/* Icon */}
                <div className="p-3 bg-[#0A0A0A] rounded-lg border border-[#1A1A1A] group-hover:bg-[#EAB308]/10 group-hover:border-[#EAB308]/30 transition-colors duration-300 shrink-0">
                  <IconComponent className="w-6 h-6 text-[#A0A0A0] group-hover:text-[#EAB308] transition-colors duration-300" />
                </div>

                {/* Name */}
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight flex-1 group-hover:text-[#EAB308] transition-colors duration-300">
                  {industry.name}
                </h3>

                {/* Arrow */}
                <ArrowUpRight className="w-5 h-5 text-[#666666] group-hover:text-[#EAB308] transition-all duration-300 shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
