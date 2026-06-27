"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  {
    name: "AARYA CLOTHING",
    full: "Aarya Clothing",
    image: "/aarya clothing.png",
    logo: "/aarya clothing logo.png",
    result: "₹4L+ Revenue, Month 1",
    role: "Luxury Fashion · E-Commerce",
  },
  {
    name: "SHIPBRIDGE",
    full: "Shipbridge",
    image: "/shipbridge.png",
    logo: "/shipbridge logo.png",
    result: "AI-First Logistics ERP",
    role: "Logistics SaaS · ERP & Automation",
  },
  {
    name: "MAAC ANIMATION",
    full: "MAAC Animation",
    image: "/maac animation jaipur.png",
    logo: "/maac logo.png",
    result: "500+ Leads Generated",
    role: "Education · Lead Generation",
  },
  {
    name: "KHEMJI WIRE CO.",
    full: "Khemji Wire Co.",
    image: "/khemji wire.png",
    logo: "/khemji logo.png",
    result: "200% B2B Inquiry Surge",
    role: "Manufacturing · Digital Transformation",
  },
];

export default function TrustedBy() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Clip-path reveal for each card
    const cards = sectionRef.current.querySelectorAll<HTMLElement>(".client-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    });

    // Heading lines
    const lines = sectionRef.current.querySelectorAll<HTMLElement>(".heading-line");
    gsap.fromTo(
      lines,
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-24 md:py-36"
      aria-label="Clients we have worked with"
    >
      {/* Ghost background label — reduced opacity */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(7rem, 20vw, 20rem)",
          fontWeight: 300,
          letterSpacing: "-0.06em",
          color: "rgba(255,255,255,0.01)",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        OUR WORK
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">

        {/* Section header */}
        <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#EAB308]/50 mb-4">
              Selected Partnerships
            </p>
            <div className="overflow-hidden">
              <h2
                className="heading-line block"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95,
                  color: "#F5F5F0",
                }}
              >
                Brands that
              </h2>
            </div>
            <div className="overflow-hidden">
              <h2
                className="heading-line block"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95,
                  color: "#EAB308",
                }}
              >
                demand excellence.
              </h2>
            </div>
          </div>
          <p
            className="text-white/30 font-light max-w-[220px] text-right leading-relaxed"
            style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
          >
            Every project is a complete system — not a template.
          </p>
        </div>

        {/* 2-column grid — each image shown at full 16:9 ratio, no cropping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {clients.map((client) => (
            <div
              key={client.name}
              className="client-card group relative bg-[#0A0A0A]"
              style={{ clipPath: "inset(100% 0% 0% 0%)" }}
            >
              {/* Full 16:9 image — object-contain so nothing is cropped */}
              <div className="relative w-full" style={{ aspectRatio: "16/9", background: "#080810" }}>
                <Image
                  src={client.image}
                  alt={`${client.full} — Reverbex project`}
                  fill
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  style={{ filter: "brightness(0.92) saturate(1.1)" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Very subtle vignette — not a full black overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "linear-gradient(to top, rgba(234,179,8,0.08) 0%, transparent 50%)" }}
                />
              </div>

              {/* Meta bar below the image */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center gap-4">
                  {/* Logo */}
                  <div className="relative w-16 h-6 flex-shrink-0">
                    <Image
                      src={client.logo}
                      alt={client.full}
                      fill
                      className="object-contain object-left opacity-50 group-hover:opacity-90 transition-opacity duration-500"
                    />
                  </div>
                  <div className="w-[1px] h-4 bg-white/10" />
                  <div>
                    <p
                      className="font-black tracking-tight text-white leading-none"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(0.7rem, 1.3vw, 0.9rem)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {client.name}
                    </p>
                    <p
                      className="text-white/30 font-medium uppercase tracking-[0.15em] mt-0.5"
                      style={{ fontSize: "8px" }}
                    >
                      {client.role}
                    </p>
                  </div>
                </div>

                {/* Result badge — always visible */}
                <p
                  className="text-[#EAB308] font-bold uppercase tracking-widest text-right"
                  style={{ fontSize: "8px", maxWidth: "120px" }}
                >
                  {client.result}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom meta line */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-white/10" />
            <span className="text-white/20 text-[9px] uppercase tracking-[0.3em] font-semibold">
              04 Projects
            </span>
          </div>
          <Link
            href="/work"
            className="text-[10px] font-bold uppercase tracking-widest text-[#EAB308]/40 hover:text-[#EAB308] transition-colors duration-300 flex items-center gap-2"
          >
            View all case studies
            <span className="w-6 h-[1px] bg-current inline-block" />
          </Link>
        </div>

      </div>
    </section>
  );
}
