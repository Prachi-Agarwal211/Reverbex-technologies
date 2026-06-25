"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { CONTACT, SOCIALS } from "@/lib/config";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? video.play().catch(() => {}) : video.pause(); },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => { observer.disconnect(); video.pause(); };
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 92%", toggleActions: "play none none none" }
          }
        );
      }
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
        background: "#020408",
        borderTop: "1px solid rgba(59,130,246,0.10)",
      }}
    >
      {/* CTA Video Banner */}
      <div className="relative w-full h-[38vh] md:h-[48vh] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay loop muted playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.3 }}
          aria-hidden="true"
        >
          <source src="/hero-video-desktop.mp4" type="video/mp4" />
        </video>

        {/* Video overlays */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #020408 0%, rgba(2,4,8,0.5) 40%, rgba(2,4,8,0.5) 60%, #020408 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(59,130,246,0.10) 0%, transparent 60%)" }}
        />

        {/* CTA Content */}
        <div ref={ctaRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-4 h-[1.5px] rounded bg-yellow-400" />
            <span className="section-label text-yellow-400">Ready to Grow?</span>
            <div className="w-4 h-[1.5px] rounded bg-yellow-400" />
          </div>
          <h2
            className="text-white font-black leading-[0.95] tracking-tight mb-7"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", letterSpacing: "-0.035em" }}
          >
            Let's build something{" "}
            <span className="text-gradient-gold">great</span>.
          </h2>
          <a
            href="https://wa.me/919929986743"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #EAB308, #D97706)",
              color: "#020408",
              boxShadow: "0 6px 24px rgba(234,179,8,0.35)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 35px rgba(234,179,8,0.5)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(234,179,8,0.35)"; }}
          >
            Message us on WhatsApp
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Footer links grid */}
      <div ref={linksRef} className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-16">
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
            <p className="text-xs text-white/30 leading-relaxed max-w-xs mb-5">
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
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25 hover:text-blue-400 transition-colors duration-200"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="col-span-1 md:col-span-3 md:col-start-6">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-4">
              Services
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/30 hover:text-yellow-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/30 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3">
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-4">
              Get in Touch
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-xs text-white/30 hover:text-yellow-400 transition-colors break-all"
                >
                  {CONTACT.emailDisplay}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="text-xs text-white/30 hover:text-yellow-400 transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <span className="text-xs text-white/20">{CONTACT.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <p className="text-[10px] text-white/20 tracking-[0.15em] uppercase">
              © {new Date().getFullYear()} Reverbex Technologies
            </p>
            <div className="flex gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[10px] text-white/20 tracking-[0.12em] uppercase hover:text-white/50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 text-[10px] text-white/20 uppercase tracking-[0.15em] hover:text-blue-400 transition-colors duration-200"
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
