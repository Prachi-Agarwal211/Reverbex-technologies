"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    title: "MAAC Animation",
    tagline: "Education • Web Design",
    result: "500+ leads in weeks",
    image: "/maac animation jaipur.png",
    url: "https://maacanimationjaipur.com",
    stack: ["Next.js", "Meta Ads"],
  },
  {
    title: "Aarya Clothing",
    tagline: "E-Commerce • Full Stack",
    result: "₹3+ lakh revenue generated",
    image: "/aarya clothing.png",
    url: "https://aaryaclothing.in",
    stack: ["Custom Commerce", "Stripe API"],
  },
  {
    title: "Khemji Wire Co.",
    tagline: "Corporate • Rebranding",
    result: "Complete transformation",
    image: "/khemji wire.png",
    url: "https://khemjiwire.in",
    stack: ["Next.js", "SEO Services"],
  },
  {
    title: "Shipbridge",
    tagline: "Logistics • Platform",
    result: "Automated dispatch system",
    image: "/shipbridge.png",
    url: "https://shipbridge.in",
    stack: ["Next.js", "Node API"],
  },
];

export default function FeaturedArchitectures() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Header entrance animation
      const header = sectionRef.current?.querySelector(".work-header");
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
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (prefersReducedMotion) return;

      const isMobile = window.innerWidth < 768;

      if (!isMobile && trackRef.current && sectionRef.current) {
        const track = trackRef.current;
        const images = gsap.utils.toArray<HTMLElement>(".work-card-img");

        // Calculate how far to scroll the track
        const getScrollAmount = () => {
          const trackWidth = track.scrollWidth;
          const viewportWidth = window.innerWidth;
          // We scroll enough so the right edge of the track touches the right edge of the viewport,
          // plus some padding.
          return -(trackWidth - viewportWidth + 100);
        };

        const tween = gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true,
        });

        // Add subtle horizontal parallax to images
        images.forEach((img) => {
          gsap.to(img, {
            xPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${getScrollAmount() * -1}`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        });
      } else if (isMobile) {
        // Mobile fallback: fade-up
        const cards = gsap.utils.toArray<HTMLElement>(".work-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="architectures"
      className="relative w-full bg-[#050505] overflow-hidden"
      aria-label="Our work"
    >
      <div className="w-full h-auto md:h-screen flex flex-col justify-center py-24 md:py-0">
        
        {/* Header */}
        <div className="work-header w-full px-6 md:px-12 mb-12 md:mb-16 shrink-0 md:absolute md:top-24 md:left-0 z-10 pointer-events-none">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
                Featured Work
              </span>
              <h2 className="text-white text-[clamp(2.5rem,6vw,5rem)] font-black tracking-[-0.03em] leading-[1.0]">
                Real Results.
              </h2>
            </div>
          </div>
        </div>

        {/* Track Container */}
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-12 md:gap-16 px-6 md:px-[10vw] w-full md:w-max md:pt-32 items-start will-change-transform"
        >
          {cases.map((item, i) => (
            <div
              key={i}
              className="work-card group flex flex-col w-full md:w-[45vw] lg:w-[40vw] max-w-[700px] shrink-0"
            >
              {/* Top: Image Container */}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full aspect-[4/3] rounded-2xl overflow-hidden relative mb-8 bg-[#0A0A0A] block"
                aria-label={`Visit ${item.title}`}
              >
                <div className="absolute inset-0 w-[110%] h-full -left-[5%]">
                  <Image
                    src={item.image}
                    alt={`${item.title} — Reverbex project`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="work-card-img object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority={i < 2}
                  />
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                
                {/* Hover CTA Button */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out pointer-events-none">
                  <div className="bg-[#EAB308] text-black font-bold px-6 py-3 rounded-full flex items-center gap-2">
                    Visit Site <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </a>

              {/* Bottom: Content Area */}
              <div className="flex flex-col w-full px-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.stack.map((tech, j) => (
                      <span
                        key={j}
                        className="px-3 py-1.5 rounded-full bg-[#1A1A1A] text-white/70 text-[10px] md:text-xs font-semibold tracking-wider uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between gap-4 md:items-end border-t border-[#1A1A1A] pt-4">
                  <div>
                    <span className="text-[#EAB308] text-xs font-semibold tracking-[0.15em] uppercase block mb-1">
                      {item.tagline}
                    </span>
                    <p className="text-[#A0A0A0] text-sm md:text-base font-medium">
                      {item.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
