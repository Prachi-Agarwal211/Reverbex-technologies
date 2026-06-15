"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function TrustedBy() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".trusted-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  const clients = [
    { name: "MAAC Animation Jaipur", role: "Education Partner" },
    { name: "Aarya Clothing", role: "E-Commerce Brand" },
    { name: "Khemji Wire Company", role: "Industrial Manufacturer" },
  ];

  return (
    <section
      ref={containerRef}
      id="trustedby"
      className="w-full py-16 bg-[#050505] border-b border-[#1A1A1A] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-8">
        {/* Title/Label */}
        <div className="trusted-item flex flex-col items-start gap-1 shrink-0">
          <span
            className="text-[#EAB308] text-[10px] tracking-[0.25em] uppercase font-bold"
            style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            Partnerships
          </span>
          <h4
            className="text-white text-lg font-bold tracking-tight"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
          >
            Trusted By Growing Brands
          </h4>
        </div>

        {/* Client Row */}
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-8 md:gap-16">
          {clients.map((client, idx) => (
            <div
              key={idx}
              className="trusted-item flex flex-col items-start group cursor-default"
            >
              <span
                className="text-[#F5F5F0]/65 text-xl font-extrabold tracking-tight group-hover:text-white transition-colors duration-300"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                {client.name}
              </span>
              <span
                className="text-[#666666] text-xs font-medium tracking-wider"
                style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
              >
                {client.role}
              </span>
            </div>
          ))}
          <div className="trusted-item flex items-center justify-center">
            <span
              className="text-[#666666] text-sm italic tracking-wider"
              style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              More coming soon...
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
