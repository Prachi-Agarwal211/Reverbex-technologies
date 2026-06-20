"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: "MAAC Animation", role: "Education Partner" },
  { name: "Aarya Clothing", role: "E-Commerce Brand" },
  { name: "Khemji Wire", role: "Industrial Manufacturer" },
  { name: "Shipbridge", role: "Logistics Partner" },
];

const BLUE = "#0A2540";

export default function TrustedBy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    // Set initial states
    gsap.set(revealerRef.current, {
      clipPath: "polygon(49.8% 0%, 50.2% 0%, 50.2% 100%, 49.8% 100%)",
      scaleY: 0,
      transformOrigin: "center center",
    });
    gsap.set(contentRef.current, { opacity: 0, pointerEvents: "none" });
    gsap.set(titleRef.current, { y: 50, opacity: 0 });
    gsap.set(cards, { scale: 0, opacity: 0 });
    gsap.set([doorLeftRef.current, doorRightRef.current], {
      scaleY: 0,
      transformOrigin: "bottom center",
    });

    // THE FIX: start: "top 95%" — animation begins while hero is still 5% visible
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",
        end: "+=4000",
        pin: true,
        scrub: 1,
      },
    });

    // MOMENT 1: The slit grows vertically
    tl.to(revealerRef.current, {
      scaleY: 1,
      duration: 1,
      ease: "power2.inOut",
    })

      // MOMENT 2: The slit expands horizontally to fill screen
      .to(revealerRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "power3.inOut",
      })

      // Make content visible
      .set(contentRef.current, { opacity: 1, pointerEvents: "auto" })

      // MOMENT 3: Title slides up
      .to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      })

      // MOMENT 3: Cards cascade in with bounce
      .to(
        cards,
        {
          scale: 1,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "back.out(1.5)",
        },
        "-=0.3"
      )

      // MOMENT 4: Hold
      .to({}, { duration: 1.5 })

      // MOMENT 5: Blue doors sweep up from bottom
      .to(
        [doorLeftRef.current, doorRightRef.current],
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.inOut",
        },
        "sweep"
      )

      // MOMENT 6: Doors split apart — reveal next section
      .to(
        doorLeftRef.current,
        {
          xPercent: -100,
          duration: 1.5,
          ease: "power3.inOut",
        },
        "split"
      )
      .to(
        doorRightRef.current,
        {
          xPercent: 100,
          duration: 1.5,
          ease: "power3.inOut",
        },
        "split"
      );

    return () => {
      tl.kill();
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#050505]"
    >
      {/* Layer 1: The Blue Revealer */}
      <div
        ref={revealerRef}
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: BLUE }}
      />

      {/* Layer 2: Partner Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-[2] flex flex-col items-center justify-center gap-10 md:gap-14 px-6"
      >
        <div className="text-center">
          <span
            className="text-[#60A5FA] text-xs font-semibold tracking-[0.3em] uppercase mb-3 block"
            style={{ fontFamily: "var(--font-body), sans-serif" }}
          >
            Partnerships
          </span>
          <h2
            ref={titleRef}
            className="text-white text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tighter"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            Trusted By Growing Brands
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 max-w-5xl w-full">
          {partners.map((partner, i) => (
            <div
              key={partner.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center gap-3 hover:border-[#60A5FA]/40 transition-colors duration-300 group"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#60A5FA]/10 border border-[#60A5FA]/20 flex items-center justify-center group-hover:bg-[#60A5FA]/20 transition-colors duration-300">
                <span
                  className="text-[#60A5FA] text-xl md:text-2xl font-black"
                  style={{ fontFamily: "var(--font-heading), sans-serif" }}
                >
                  {partner.name.charAt(0)}
                </span>
              </div>
              <h3
                className="text-white text-sm md:text-base font-bold tracking-tight group-hover:text-[#60A5FA] transition-colors duration-300"
                style={{ fontFamily: "var(--font-heading), sans-serif" }}
              >
                {partner.name}
              </h3>
              <span
                className="text-[#A0A0A0] text-[10px] md:text-xs tracking-wider uppercase"
                style={{ fontFamily: "var(--font-body), sans-serif" }}
              >
                {partner.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Layer 3: Blue Outro Doors */}
      <div
        ref={doorLeftRef}
        className="absolute top-0 left-0 w-1/2 h-full z-[3]"
        style={{ backgroundColor: BLUE, transformOrigin: "bottom center" }}
      />
      <div
        ref={doorRightRef}
        className="absolute top-0 right-0 w-1/2 h-full z-[3]"
        style={{ backgroundColor: BLUE, transformOrigin: "bottom center" }}
      />
    </section>
  );
}
