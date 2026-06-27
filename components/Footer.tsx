"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { CONTACT, SOCIALS } from "@/lib/config";
import BackgroundBeams from "./BackgroundBeams";
import DotGrid from "./DotGrid";

const footerLinks = {
  services: [
    { label: "Custom Websites",    href: "/services/website-development" },
    { label: "E-Commerce",         href: "/services/e-commerce" },
    { label: "Meta Ads",           href: "/services/meta-ads" },
    { label: "Google Ads",         href: "/services/google-ads" },
    { label: "AI Solutions",       href: "/services/ai-solutions" },
    { label: "SEO & AI Ranking",   href: "/services/seo" },
    { label: "WhatsApp Automation",href: "/services/whatsapp-automation" },
  ],
  company: [
    { label: "About",    href: "/about" },
    { label: "Work",     href: "/work" },
    { label: "Contact",  href: "/contact" },
    { label: "Pricing",  href: "/pricing" },
  ],
  legal: [
    { label: "Privacy Policy",  href: "/privacy-policy" },
    { label: "Terms of Service",href: "/terms-of-service" },
  ],
};

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (linksRef.current) {
        const cols = linksRef.current.querySelectorAll(":scope > div");
        gsap.fromTo(cols,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: linksRef.current, start: "top 95%", toggleActions: "play none none none" }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, { scope: containerRef });

  return (
    <footer
      ref={containerRef}
      className="relative w-full"
      style={{
        background: "#03050F",
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 50% 0%, rgba(234,179,8,0.12) 0%, transparent 50%),
          radial-gradient(ellipse 60% 60% at 10% 60%, rgba(59,130,246,0.08) 0%, transparent 50%),
          radial-gradient(ellipse 40% 40% at 80% 30%, rgba(29,78,216,0.06) 0%, transparent 45%)
        `,
        borderTop: "1px solid rgba(234,179,8,0.08)",
      }}
    >
      {/* DotGrid background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DotGrid
          dotSize={3}
          gap={20}
          baseColor="#1A1A1A"
          activeColor="#EAB308"
          proximity={100}
          shockRadius={200}
          shockStrength={3}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Background beams */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        <BackgroundBeams />
      </div>

      {/* Footer links grid */}
      <div ref={linksRef} className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 group mb-5">
              <div className="relative w-6 h-6">
                <Image
                  src="/reverbex logo.png"
                  alt="Reverbex"
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                  sizes="24px"
                />
              </div>
              <span className="text-xs font-bold tracking-[0.15em] text-white uppercase">
                Reverbex Technologies
              </span>
            </Link>
            <p className="text-xs text-white/50 leading-relaxed max-w-xs mb-5 text-shadow-body">
              Websites. Ads. Automation. ERP systems. Built to grow businesses.
              Based in Jaipur, serving globally.
            </p>
            <div className="flex gap-4">
              {[
                { label: "LinkedIn", href: SOCIALS.linkedin },
                { label: "Twitter", href: SOCIALS.twitter },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 hover:text-yellow-400 transition-colors duration-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="col-span-1 md:col-span-3 md:col-start-6">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 mb-4">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/50 hover:text-yellow-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 mb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/50 hover:text-yellow-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 mb-4">
              Get in Touch
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-xs text-white/50 hover:text-yellow-400 transition-colors break-all"
                >
                  {CONTACT.emailDisplay}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="text-xs text-white/50 hover:text-yellow-400 transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <span className="text-xs text-white/35">{CONTACT.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <p className="text-[10px] text-white/40 tracking-[0.15em] uppercase">
              &copy; {new Date().getFullYear()} Reverbex Technologies. All rights reserved.
            </p>
            <div className="flex gap-5">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[10px] text-white/40 tracking-[0.12em] uppercase hover:text-white/70 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 text-[10px] text-white/40 uppercase tracking-[0.15em] hover:text-yellow-400 transition-colors duration-200"
          >
            Back to Top
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
