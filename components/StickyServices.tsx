"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    slug: "website-development",
    name: "Custom Websites",
    tagline: "High-performance Next.js websites built to convert.",
    description:
      "Clean, lightweight code. Under 1 second load times. Full code ownership.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  },
  {
    slug: "e-commerce",
    name: "E-Commerce",
    tagline: "Custom stores. Zero platform fees. Full checkout control.",
    description:
      "Secure payments, inventory management, and sub-second catalog rendering.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
  },
  {
    slug: "mobile-apps",
    name: "Mobile Apps",
    tagline: "Native & cross-platform apps for iOS and Android.",
    description:
      "React Native & Flutter apps that feel native, load fast, and integrate with your existing systems.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    tagline: "Facebook & Instagram campaigns that generate customers.",
    description:
      "Full-funnel strategy. Daily optimization. Lead-focused conversion tracking.",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80",
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    tagline: "Search, Display & YouTube campaigns configured for ROI.",
    description:
      "Intent-based keywords, conversion tracking, negative filtering, and weekly bid optimization.",
    image:
      "https://images.unsplash.com/photo-1574169208507-84376144848b?w=1200&q=80",
  },
  {
    slug: "lead-generation",
    name: "Lead Generation",
    tagline: "High-converting funnels that deliver qualified leads 24/7.",
    description:
      "Landing pages, lead magnets, automated email & WhatsApp follow-ups — every lead tracked and routed instantly.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80",
  },
  {
    slug: "erp-systems",
    name: "ERP & CRM Systems",
    tagline: "Custom ERP & CRM to automate operations and manage customer relationships.",
    description:
      "Inventory, invoicing, lead tracking, sales pipelines, financial reporting — one unified system.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
  },
  {
    slug: "whatsapp-automation",
    name: "WhatsApp Automation",
    tagline: "Automated messaging. Instant lead routing. 24/7 responses.",
    description:
      "Official Business API. Chatbots, order confirmations, broadcast campaigns.",
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&q=80",
  },
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    tagline: "Intelligent automation. Custom chatbots. Data pipelines.",
    description:
      "Trained on your business data. Reduces overhead. Scales with demand.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
  },
  {
    slug: "seo",
    name: "SEO & AI Optimization",
    tagline: "Dominate Google. Get cited by ChatGPT, Gemini, Perplexity.",
    description:
      "Technical SEO + AEO/GEO strategy. Structured data. Weekly optimization.",
    image:
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1200&q=80",
  },
  {
    slug: "logo-branding",
    name: "Logo & Branding",
    tagline: "Distinctive visual identities that make you stand out.",
    description:
      "Logo design, color systems, typography, and complete brand guidelines.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
  },
  {
    slug: "rebranding",
    name: "Complete Rebranding",
    tagline: "Full brand refresh from strategy to deployment.",
    description:
      "Strategy, visual identity, website redesign, social media — every touchpoint transformed.",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80",
  },
];

export default function StickyServices() {
  const containerRef = useRef<HTMLElement>(null);
  const totalCards = services.length;

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const cards = gsap.utils.toArray<HTMLElement>(".stacked-card");
      if (!cards.length) return;

      const isMobile = window.innerWidth < 768;
      const cardOffset = isMobile ? 4 : 6;
      const cardScaleStep = isMobile ? 0.04 : 0.05;

      // FIX: Apply xPercent and yPercent exclusively via GSAP to prevent inline transform conflicts.
      // The cards are absolutely positioned at left: 50%, top: 50%.
      cards.forEach((card, i) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50 + i * cardOffset,
          scale: 1 - i * cardScaleStep,
          zIndex: totalCards - i,
          opacity: 1,
        });
      });

      // We need (totalCards - 1) scroll segments for all cards to peel away except the last one.
      const totalSegments = totalCards - 1;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * totalSegments}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Determine which segment (0 to totalSegments - 1) we are in
          let activeIndex = Math.floor(progress * totalSegments);
          activeIndex = Math.min(activeIndex, totalSegments - 1);

          // Progress within the current segment (0.0 to 1.0)
          const segmentProgress = progress * totalSegments - activeIndex;

          cards.forEach((card, i) => {
            if (i < activeIndex) {
              // Cards that have already peeled away
              gsap.set(card, {
                yPercent: -250,
                rotationX: 35,
                scale: 1,
                opacity: 0,
              });
            } else if (i === activeIndex) {
              // The card currently peeling away
              gsap.set(card, {
                yPercent: gsap.utils.interpolate(-50, -250, segmentProgress),
                rotationX: gsap.utils.interpolate(0, 35, segmentProgress),
                scale: 1,
                // Fade out rapidly in the first half of the segment
                opacity: gsap.utils.interpolate(1, 0, segmentProgress * 2),
              });
            } else {
              // Cards waiting behind, moving forward
              const behindIndex = i - activeIndex;
              const currentYOffset =
                behindIndex * cardOffset - segmentProgress * cardOffset;
              const currentScale =
                1 - (behindIndex * cardScaleStep - segmentProgress * cardScaleStep);

              gsap.set(card, {
                yPercent: -50 + currentYOffset,
                rotationX: 0,
                scale: currentScale,
                opacity: 1,
              });
            }
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="capabilities"
      className="relative w-full h-screen overflow-hidden flex justify-center items-center bg-transparent"
      style={{ perspective: "1000px" }}
      aria-label="Our services"
    >
      <div className="absolute top-12 text-center w-full z-0 opacity-50 pointer-events-none">
        <h2
          className="text-[#A0A0A0] text-sm uppercase tracking-[0.3em]"
          style={{ fontFamily: "var(--font-body), sans-serif" }}
        >
          Scroll to explore
        </h2>
      </div>

      {services.map((service, index) => (
        <div
          key={service.slug}
          className="stacked-card absolute w-[95%] md:w-[85%] max-w-6xl h-[70vh] md:h-[75vh] overflow-hidden shadow-2xl will-change-transform group border border-white/10"
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: "center bottom",
          }}
        >
          <Link
            href={`/services/${service.slug}`}
            className="w-full h-full block relative"
          >
            {/* Full Bleed Image Background */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                priority={index < 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-black/20 z-10" />
            </div>

            {/* Overlay Text Content */}
            <div className="relative z-20 w-full h-full p-8 md:p-16 flex flex-col justify-end">
              <div className="max-w-3xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <span
                  className="text-[#EAB308] text-xs font-bold tracking-[0.3em] uppercase mb-4 md:mb-6 block"
                  style={{ fontFamily: "var(--font-body), sans-serif" }}
                >
                  {String(index + 1).padStart(2, "0")} / {String(totalCards).padStart(2, "0")}
                </span>
                <h3
                  className="text-white text-[clamp(2.5rem,6vw,5rem)] font-black tracking-[-0.03em] leading-[1.0] mb-4 group-hover:text-[#EAB308] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-white text-lg md:text-2xl font-semibold tracking-tight mb-3"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  {service.tagline}
                </p>
                <p
                  className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mb-8"
                  style={{ fontFamily: "var(--font-body), sans-serif" }}
                >
                  {service.description}
                </p>
              </div>

              <div className="inline-flex items-center text-white font-bold text-sm uppercase tracking-widest group-hover:text-[#EAB308] transition-colors duration-300">
                Explore Service
                <span className="ml-3 transform group-hover:translate-x-3 transition-transform duration-300">
                  →
                </span>
              </div>
            </div>

            {/* Bottom Accent Bar */}
            <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#EAB308] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left z-30" />
          </Link>
        </div>
      ))}
    </section>
  );
}
