"use client";

import { useRef, useState } from "react";
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
    stat: "< 1s",
    statLabel: "Load Time",
  },
  {
    slug: "e-commerce",
    name: "E-Commerce",
    tagline: "Custom stores. Zero platform fees. Full checkout control.",
    description: "Secure payments, inventory management, and sub-second catalog rendering.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
    stat: "0%",
    statLabel: "Platform Fees",
  },
  {
    slug: "mobile-apps",
    name: "Mobile Apps",
    tagline: "Native & cross-platform apps for iOS and Android.",
    description: "React Native & Flutter apps that feel native, load fast, and integrate seamlessly.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80",
    stat: "2×",
    statLabel: "Platforms",
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    tagline: "Facebook & Instagram campaigns that generate customers.",
    description: "Full-funnel strategy. Daily optimization. Lead-focused conversion tracking.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80",
    stat: "500+",
    statLabel: "Leads Generated",
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    tagline: "Search, Display & YouTube campaigns configured for ROI.",
    description: "Intent-based keywords, conversion tracking, negative filtering, weekly bid optimization.",
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=1600&q=80",
    stat: "ROI",
    statLabel: "Focused Bidding",
  },
  {
    slug: "lead-generation",
    name: "Lead Generation",
    tagline: "High-converting funnels that deliver qualified leads 24/7.",
    description: "Landing pages, lead magnets, automated email & WhatsApp follow-ups.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=80",
    stat: "24/7",
    statLabel: "Active Funnels",
  },
  {
    slug: "erp-systems",
    name: "ERP & CRM Systems",
    tagline: "Custom ERP & CRM to automate operations.",
    description: "Inventory, invoicing, lead tracking, sales pipelines, financial reporting — one unified system.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
    stat: "1",
    statLabel: "Unified Platform",
  },
  {
    slug: "whatsapp-automation",
    name: "WhatsApp Automation",
    tagline: "Automated messaging. Instant lead routing. 24/7 responses.",
    description: "Official Business API. Chatbots, order confirmations, broadcast campaigns.",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1600&q=80",
    stat: "API",
    statLabel: "Official BA",
  },
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    tagline: "Intelligent automation. Custom chatbots. Data pipelines.",
    description: "Trained on your business data. Reduces overhead. Scales with demand.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80",
    stat: "LLM",
    statLabel: "Powered",
  },
  {
    slug: "seo",
    name: "SEO & AI Optimization",
    tagline: "Dominate Google. Get cited by ChatGPT, Gemini, Perplexity.",
    description: "Technical SEO + AEO/GEO strategy. Structured data. Weekly optimization.",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1600&q=80",
    stat: "#1",
    statLabel: "Rankings",
  },
  {
    slug: "logo-branding",
    name: "Logo & Branding",
    tagline: "Distinctive visual identities that make you stand out.",
    description: "Logo design, color systems, typography, and complete brand guidelines.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80",
    stat: "∞",
    statLabel: "Brand Depth",
  },
  {
    slug: "rebranding",
    name: "Complete Rebranding",
    tagline: "Full brand refresh from strategy to deployment.",
    description: "Strategy, visual identity, website redesign, social media — every touchpoint transformed.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1600&q=80",
    stat: "360°",
    statLabel: "Transformation",
  },
];

// ===== DESKTOP: Scroll-pinned active panel (Awwwards-style) =====
function DesktopServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    if (!containerRef.current || !listRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // Section header entrance
      const header = containerRef.current!.querySelector(".services-header");
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
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (prefersReducedMotion) return;

      // Pin the entire section and scrub through services
      const items = listRef.current!.querySelectorAll(".service-list-item");
      const totalItems = items.length;
      const scrollHeight = totalItems * 150; // 150px scroll per service

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollHeight}px`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const rawIndex = Math.floor(self.progress * totalItems);
          const newIndex = Math.min(rawIndex, totalItems - 1);
          if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex;
            setActiveIndex(newIndex);

            // Highlight the active list item
            items.forEach((item, i) => {
              if (i === newIndex) {
                gsap.to(item, { color: "#EAB308", x: 8, duration: 0.3, ease: "power2.out" });
              } else {
                gsap.to(item, { color: "rgba(255,255,255,0.35)", x: 0, duration: 0.3, ease: "power2.out" });
              }
            });

            // Crossfade image
            if (imageRef.current) {
              const imgs = imageRef.current.querySelectorAll(".service-img");
              gsap.to(imgs, { opacity: 0, duration: 0.25, ease: "power2.in" });
              gsap.to(imgs[newIndex], { opacity: 1, duration: 0.35, ease: "power2.out", delay: 0.15 });
            }
          }
        },
      });

      // Initial state: first item highlighted
      if (items.length > 0) {
        gsap.set(items[0], { color: "#EAB308", x: 8 });
      }

    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="hidden md:block relative w-full">
      {/* Header */}
      <div className="services-header w-full max-w-7xl mx-auto px-12 pt-32 pb-16">
        <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
          What We Build
        </span>
        <div className="flex items-end justify-between">
          <h2 className="text-white text-[clamp(2.5rem,5vw,5rem)] font-black tracking-[-0.04em] leading-[1.0]">
            Systems That<br />
            <span className="text-[#EAB308]">Generate Revenue.</span>
          </h2>
          <p className="text-[#A0A0A0] text-base font-normal leading-relaxed max-w-xs text-right pb-2">
            Twelve services. Each one engineered to move a specific business metric.
          </p>
        </div>
      </div>

      {/* Two-column pinned layout */}
      <div className="flex items-start w-full max-w-7xl mx-auto px-12 pb-16 gap-20">
        {/* Left: Service list */}
        <div ref={listRef} className="flex-1 flex flex-col gap-0 pt-4">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="service-list-item group flex items-center gap-4 py-4 border-b border-white/5 cursor-pointer"
              style={{ color: i === 0 ? "#EAB308" : "rgba(255,255,255,0.35)" }}
            >
              <span className="text-[10px] font-mono opacity-50 shrink-0 w-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-xl lg:text-2xl font-bold tracking-tight">
                {service.name}
              </span>
              <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-200" />
            </Link>
          ))}
        </div>

        {/* Right: Active service image + info */}
        <div className="w-[45%] shrink-0 sticky top-24">
          {/* Image stack */}
          <div
            ref={imageRef}
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/10 mb-6"
          >
            {services.map((service, i) => (
              <div
                key={service.slug}
                className="service-img absolute inset-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="45vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent" />
              </div>
            ))}

            {/* Active stat overlay */}
            <div className="absolute bottom-5 left-5 z-10">
              <div className="inline-flex items-baseline gap-2 bg-[#050505]/80 backdrop-blur-sm border border-[#EAB308]/30 rounded-lg px-4 py-2">
                <span className="text-[#EAB308] text-2xl font-black">
                  {services[activeIndex].stat}
                </span>
                <span className="text-white/60 text-xs uppercase tracking-wider">
                  {services[activeIndex].statLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Active service info */}
          <div className="flex flex-col gap-2">
            <h3 className="text-white text-xl font-bold tracking-tight">
              {services[activeIndex].name}
            </h3>
            <p className="text-[#A0A0A0] text-sm leading-relaxed">
              {services[activeIndex].description}
            </p>
            <Link
              href={`/services/${services[activeIndex].slug}`}
              className="mt-3 inline-flex items-center gap-2 text-[#EAB308] text-xs font-semibold uppercase tracking-wider group"
            >
              <span className="w-6 h-[1px] bg-[#EAB308] group-hover:w-10 transition-all duration-300" />
              Explore
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== MOBILE: Card grid (simple, performance-friendly) =====
function MobileServices() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = containerRef.current!.querySelectorAll(".mobile-service-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="md:hidden w-full px-5 py-16">
      {/* Header */}
      <div className="mb-10">
        <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-3 block">
          What We Build
        </span>
        <h2 className="text-white text-[clamp(2rem,8vw,3rem)] font-black tracking-[-0.03em] leading-[1.05] mb-3">
          Systems That<br />
          <span className="text-[#EAB308]">Generate Revenue.</span>
        </h2>
        <p className="text-[#A0A0A0] text-sm leading-relaxed">
          Twelve services. Each one engineered to move a specific business metric.
        </p>
      </div>

      {/* Service cards grid */}
      <div className="grid grid-cols-1 gap-3">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="mobile-service-card block rounded-xl overflow-hidden border border-[#1A1A1A] bg-[#0A0A0A] hover:border-[#EAB308]/40 transition-colors duration-300 group"
          >
            {/* Image */}
            <div className="relative w-full aspect-[16/8] overflow-hidden">
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-500 group-active:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4">
                <div className="inline-flex items-baseline gap-1.5 bg-[#050505]/80 backdrop-blur-sm border border-[#EAB308]/30 rounded-md px-2.5 py-1">
                  <span className="text-[#EAB308] text-sm font-black">{service.stat}</span>
                  <span className="text-white/50 text-[9px] uppercase tracking-wide">{service.statLabel}</span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-base font-bold tracking-tight group-hover:text-[#EAB308] transition-colors duration-200">
                  {service.name}
                </h3>
                <ArrowRight className="w-4 h-4 text-[#EAB308]/60 shrink-0" />
              </div>
              <p className="text-white/50 text-xs leading-relaxed mt-1">
                {service.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function StickyServices() {
  return (
    <section
      id="capabilities"
      className="relative w-full bg-transparent"
      aria-label="Our services"
    >
      <DesktopServices />
      <MobileServices />
    </section>
  );
}
