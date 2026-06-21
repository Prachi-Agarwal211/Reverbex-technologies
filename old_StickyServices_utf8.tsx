"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const services = [
  {
    slug: "website-development",
    name: "Custom Websites",
    tagline: "High-performance Next.js websites built to convert.",
    description: "Clean, lightweight code. Under 1 second load times. Full code ownership.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
  },
  {
    slug: "e-commerce",
    name: "E-Commerce",
    tagline: "Custom stores. Zero platform fees. Full checkout control.",
    description: "Secure payments, inventory management, and sub-second catalog rendering.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
  },
  {
    slug: "mobile-apps",
    name: "Mobile Apps",
    tagline: "Native & cross-platform apps for iOS and Android.",
    description: "React Native & Flutter apps that feel native, load fast, and integrate with your existing systems.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80",
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    tagline: "Facebook & Instagram campaigns that generate customers.",
    description: "Full-funnel strategy. Daily optimization. Lead-focused conversion tracking.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80",
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    tagline: "Search, Display & YouTube campaigns configured for ROI.",
    description: "Intent-based keywords, conversion tracking, negative filtering, and weekly bid optimization.",
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=1600&q=80",
  },
  {
    slug: "lead-generation",
    name: "Lead Generation",
    tagline: "High-converting funnels that deliver qualified leads 24/7.",
    description: "Landing pages, lead magnets, automated email & WhatsApp follow-ups ΓÇö every lead tracked and routed instantly.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=80",
  },
  {
    slug: "erp-systems",
    name: "ERP & CRM Systems",
    tagline: "Custom ERP & CRM to automate operations and manage customer relationships.",
    description: "Inventory, invoicing, lead tracking, sales pipelines, financial reporting ΓÇö one unified system.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
  },
  {
    slug: "whatsapp-automation",
    name: "WhatsApp Automation",
    tagline: "Automated messaging. Instant lead routing. 24/7 responses.",
    description: "Official Business API. Chatbots, order confirmations, broadcast campaigns.",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1600&q=80",
  },
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    tagline: "Intelligent automation. Custom chatbots. Data pipelines.",
    description: "Trained on your business data. Reduces overhead. Scales with demand.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80",
  },
  {
    slug: "seo",
    name: "SEO & AI Optimization",
    tagline: "Dominate Google. Get cited by ChatGPT, Gemini, Perplexity.",
    description: "Technical SEO + AEO/GEO strategy. Structured data. Weekly optimization.",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1600&q=80",
  },
  {
    slug: "logo-branding",
    name: "Logo & Branding",
    tagline: "Distinctive visual identities that make you stand out.",
    description: "Logo design, color systems, typography, and complete brand guidelines.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80",
  },
  {
    slug: "rebranding",
    name: "Complete Rebranding",
    tagline: "Full brand refresh from strategy to deployment.",
    description: "Strategy, visual identity, website redesign, social media ΓÇö every touchpoint transformed.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&q=80",
  },
];

const totalCards = services.length;

export default function StickyServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const isMobile = window.innerWidth < 768;

      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      // Section header entrance
      const header = containerRef.current!.querySelector(".services-header");
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: header,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (isMobile) {
        // Mobile: simple staggered reveal
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      } else {
        // Desktop: each card enters with scroll-linked transform
        // Card 1: slides from left + rotates slightly
        // Card 2: slides from right + rotates opposite
        // Alternating pattern creates visual variety
        cards.forEach((card, i) => {
          const fromLeft = i % 2 === 0;
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: fromLeft ? -60 : 60,
              rotateY: fromLeft ? -3 : 3,
              scale: 0.97,
            },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-transparent"
      aria-label="Our services"
      style={{ perspective: "1200px" }}
    >
      {/* Section header */}
      <div className="services-header w-full max-w-6xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-8 md:pb-12">
        <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
          What We Build
        </span>
        <h2 className="text-white text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-[-0.04em] leading-[1.0] mb-4">
          Systems That
          <br />
          <span className="text-[#EAB308]">Generate Revenue.</span>
        </h2>
        <p className="text-[#A0A0A0] text-base md:text-lg font-normal leading-relaxed max-w-xl">
          Twelve services. Each one engineered to move a specific business metric.
        </p>
      </div>

      {/* Cards ΓÇö 2-column editorial grid, no pin */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {services.map((service, index) => (
            <div
              key={service.slug}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="w-full group"
            >
              <Link
                href={`/services/${service.slug}`}
                className="block relative rounded-2xl overflow-hidden border border-[#1A1A1A] bg-[#0A0A0A] hover:border-[#EAB308]/40 transition-all duration-500"
                aria-label={service.name}
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[16/10] bg-[#050505] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={index < 4}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />

                  {/* Service number */}
                  <span className="absolute top-4 left-4 text-[#EAB308] text-[10px] font-bold tracking-[0.3em] uppercase bg-[#050505]/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#EAB308]/20">
                    {String(index + 1).padStart(2, "0")} / {totalCards}
                  </span>
                </div>

                {/* Text */}
                <div className="p-5 md:p-6">
                  <h3 className="text-white text-xl md:text-2xl font-bold tracking-[-0.02em] mb-2 group-hover:text-[#EAB308] transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-3">
                    {service.tagline}
                  </p>
                  <div className="inline-flex items-center gap-2 text-[#EAB308] text-xs font-semibold uppercase tracking-wider opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                    <span className="w-6 h-[1px] bg-[#EAB308]" />
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
