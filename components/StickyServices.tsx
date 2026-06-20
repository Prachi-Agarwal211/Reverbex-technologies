"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    slug: "website-development",
    name: "Custom Websites",
    tagline: "High-performance Next.js websites built to convert.",
    description:
      "Clean, lightweight code. Under 1 second load times. Full code ownership.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    color: "#0A0A0A",
  },
  {
    slug: "e-commerce",
    name: "E-Commerce",
    tagline: "Custom stores. Zero platform fees. Full checkout control.",
    description:
      "Secure payments, inventory management, and sub-second catalog rendering.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    color: "#0D1B2A",
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    tagline: "Facebook & Instagram campaigns that generate customers.",
    description:
      "Full-funnel strategy. Daily optimization. Lead-focused conversion tracking.",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80",
    color: "#1B2838",
  },
  {
    slug: "whatsapp-automation",
    name: "WhatsApp Automation",
    tagline: "Automated messaging. Instant lead routing. 24/7 responses.",
    description:
      "Official Business API. Chatbots, order confirmations, broadcast campaigns.",
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&q=80",
    color: "#162032",
  },
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    tagline: "Intelligent automation. Custom chatbots. Data pipelines.",
    description:
      "Trained on your business data. Reduces overhead. Scales with demand.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    color: "#0F1923",
  },
  {
    slug: "seo",
    name: "SEO & AI Optimization",
    tagline: "Dominate Google. Get cited by ChatGPT, Gemini, Perplexity.",
    description:
      "Technical SEO + AEO/GEO strategy. Structured data. Weekly optimization.",
    image:
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1200&q=80",
    color: "#0A1628",
  },
];

const cardColors = [
  "#0A0A0A",
  "#0D1B2A",
  "#1B2838",
  "#162032",
  "#0F1923",
  "#0A1628",
];

export default function StickyServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const totalCards = services.length;

  useGSAP(() => {
    if (!containerRef.current || cardsRef.current.length === 0) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    const cardOffset = isMobile ? 4 : 6;
    const cardScaleStep = isMobile ? 0.04 : 0.05;
    const segmentSize = 1 / totalCards;

    cards.forEach((card, i) => {
      gsap.set(card, {
        yPercent: -50 + i * cardOffset,
        scale: 1 - i * cardScaleStep,
        zIndex: totalCards - i,
      });
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${window.innerHeight * totalCards}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        let activeIndex = Math.floor(progress / segmentSize);
        activeIndex = Math.min(activeIndex, totalCards - 1);

        const segmentProgress =
          (progress - activeIndex * segmentSize) / segmentSize;

        cards.forEach((card, i) => {
          if (i < activeIndex) {
            gsap.set(card, {
              yPercent: -250,
              rotationX: 35,
              scale: 1,
              opacity: 0,
            });
          } else if (i === activeIndex) {
            gsap.set(card, {
              yPercent: gsap.utils.interpolate(-50, -250, segmentProgress),
              rotationX: gsap.utils.interpolate(0, 35, segmentProgress),
              scale: 1,
              opacity: gsap.utils.interpolate(1, 0, segmentProgress * 2),
            });
          } else {
            const behindIndex = i - activeIndex;
            const currentYOffset =
              behindIndex * cardOffset - segmentProgress * cardOffset;
            const currentScale =
              1 -
              (behindIndex * cardScaleStep -
                segmentProgress * cardScaleStep);

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
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex justify-center items-center bg-[#050505]"
      style={{ perspective: "1000px" }}
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
          ref={(el) => {
            cardsRef.current[index] = el;
          }}
          className="absolute w-[92%] md:w-[70%] max-w-5xl h-[65vh] md:h-[70vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row will-change-transform group"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            transformOrigin: "center bottom",
            backgroundColor: cardColors[index],
          }}
        >
          <Link
            href={`/services/${service.slug}`}
            className="w-full h-full flex flex-col md:flex-row"
          >
            {/* Text Side */}
            <div className="md:w-[55%] p-8 md:p-12 lg:p-16 flex flex-col justify-between h-full relative z-10">
              <div>
                <span
                  className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
                  style={{ fontFamily: "var(--font-body), sans-serif" }}
                >
                  0{index + 1} / 0{totalCards}
                </span>
                <h3
                  className="text-white text-[clamp(1.8rem,4vw,3.5rem)] font-black tracking-tighter leading-[1.05] mb-4 group-hover:text-[#EAB308] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-[#EAB308] text-lg md:text-xl font-medium mb-4"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  {service.tagline}
                </p>
                <p
                  className="text-[#A0A0A0] text-sm md:text-base leading-relaxed max-w-md"
                  style={{ fontFamily: "var(--font-body), sans-serif" }}
                >
                  {service.description}
                </p>
              </div>

              <div className="mt-8 flex items-center text-white font-semibold text-sm uppercase tracking-wider group-hover:text-[#EAB308] transition-colors duration-300">
                Explore Service
                <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </div>
            </div>

            {/* Image Side */}
            <div className="md:w-[45%] h-48 md:h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.6)] via-transparent to-transparent z-10 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.4)] z-10 md:hidden" />
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Bottom Accent Bar */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#EAB308] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
          </Link>
        </div>
      ))}
    </section>
  );
}
