"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const CircularGallery = dynamic(() => import("./CircularGallery"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const projectImages = [
  "/aarya clothing.png",
  "/shipbridge.png",
  "/maac animation jaipur.png",
  "/khemji wire.png",
];

const services = [
  "Custom Websites",
  "E-Commerce",
  "Mobile Apps",
  "Meta Ads",
  "Google Ads",
  "Lead Generation",
  "ERP & CRM",
  "WhatsApp",
  "AI Solutions",
  "SEO + AI",
  "Branding",
  "Rebranding",
];

const galleryItems = services.map((name, i) => ({
  image: projectImages[i % projectImages.length],
  text: name,
}));

export default function ServicesGallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      ".gallery-heading",
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden z-20"
      style={{ background: "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 md:pt-28 pb-4">
        <div className="mb-8 md:mb-12">
          <p className="gallery-heading text-[#EAB308]/50 text-[9px] font-bold uppercase tracking-[0.4em] mb-4">
            Capabilities
          </p>
          <div className="overflow-hidden">
            <h2
              className="gallery-heading text-white leading-none tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                fontWeight: 300,
                fontStyle: "italic",
                letterSpacing: "-0.04em",
              }}
            >
              12 services.{" "}
              <span
                className="text-[#EAB308]"
                style={{
                  fontWeight: 600,
                  fontStyle: "normal",
                  textShadow: "0 0 30px rgba(234,179,8,0.2)",
                }}
              >
                All engineered in-house.
              </span>
            </h2>
          </div>
        </div>
      </div>

      <div style={{ height: "500px", position: "relative" }}>
        <CircularGallery
          items={galleryItems}
          bend={1}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.05}
          fontUrl=""
          font="bold 28px Figtree"
          scrollSpeed={2}
        />
      </div>
    </section>
  );
}
