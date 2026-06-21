"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "../../components/Navbar";

const services = [
  { slug: "website-development", name: "Custom Website Development", image: "/ambient-bg.png" },
  { slug: "e-commerce", name: "E-Commerce Development", image: "/ambient-bg.png" },
  { slug: "mobile-apps", name: "Mobile App Development", image: "/ambient-bg.png" },
  { slug: "meta-ads", name: "Meta Ads Management", image: "/ambient-bg.png" },
  { slug: "google-ads", name: "Google Ads Management", image: "/ambient-bg.png" },
  { slug: "lead-generation", name: "Lead Generation", image: "/ambient-bg.png" },
  { slug: "erp-systems", name: "ERP System Development", image: "/ambient-bg.png" },
  { slug: "whatsapp-automation", name: "WhatsApp Automation", image: "/ambient-bg.png" },
  { slug: "ai-solutions", name: "AI Solutions & Automation", image: "/ambient-bg.png" },
  { slug: "logo-branding", name: "Logo Design & Branding", image: "/ambient-bg.png" },
  { slug: "rebranding", name: "Complete Rebranding", image: "/ambient-bg.png" },
  { slug: "seo", name: "SEO Services", image: "/ambient-bg.png" }
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Entrance Animation
    gsap.fromTo(
      ".service-header > *",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
    );

    gsap.fromTo(
      ".service-row",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power3.out", delay: 0.5 }
    );

  }, { scope: containerRef });

  // Floating Mouse Follower Effect
  useEffect(() => {
    if (!imageRef.current || window.matchMedia("(max-width: 1024px)").matches) return;

    // Use gsap.quickTo for high-performance mouse tracking
    const xTo = gsap.quickTo(imageRef.current, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(imageRef.current, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the image size so it centers on the cursor
      xTo(e.clientX - 150);
      yTo(e.clientY - 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main ref={containerRef} className="w-full text-white min-h-screen pt-32 pb-24 selection:bg-[#EAB308]/30 overflow-hidden relative">
      <Navbar />
      
      {/* Global Background Fix */}
      <div className="fixed inset-0 bg-[#030303] -z-20" />
      
      {/* Floating Image Container (Desktop Only) */}
      <div 
        ref={imageRef}
        className="fixed top-0 left-0 w-[300px] h-[400px] pointer-events-none z-0 hidden lg:block overflow-hidden rounded-2xl transition-all duration-500 ease-out"
        style={{
          opacity: activeImage ? 0.7 : 0,
          transform: `scale(${activeImage ? 1 : 0.8})`,
        }}
      >
        <div 
          className="w-full h-full bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${activeImage})` }}
        />
        <div className="absolute inset-0 bg-[#EAB308] mix-blend-overlay opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="service-header mb-24">
          <span className="text-[#EAB308] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            Capabilities Catalog
          </span>
          <h1 className="text-white text-[clamp(3rem,8vw,7rem)] font-black tracking-tighter leading-none max-w-4xl">
            Everything You Need To Scale.
          </h1>
        </div>

        {/* List of Services (Full Width Rows) */}
        <div className="border-t border-[#1A1A1A]">
          {services.map((service, idx) => (
            <a
              key={idx}
              href={`/services/${service.slug}`}
              className="service-row group flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-[#1A1A1A] hover:bg-[#0A0A0A]/80 transition-colors duration-500 px-4 md:px-8 -mx-4 md:-mx-8 cursor-pointer relative overflow-hidden"
              onMouseEnter={() => setActiveImage(service.image)}
              onMouseLeave={() => setActiveImage(null)}
            >
              {/* Animated Background Slide */}
              <div className="absolute inset-0 bg-[#111] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out -z-10" />

              <div className="flex items-center gap-8 mb-4 md:mb-0">
                <span className="text-[#666666] text-sm font-semibold tracking-widest uppercase md:w-16">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="text-white text-3xl md:text-5xl font-black group-hover:text-[#EAB308] group-hover:translate-x-4 transition-all duration-500">
                  {service.name}
                </h3>
              </div>

              <div className="text-[#666666] group-hover:text-white transition-colors duration-500 text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
                Explore <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
