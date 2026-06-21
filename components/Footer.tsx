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
    { label: "Custom Websites", href: "/services/website-development" },
    { label: "E-Commerce", href: "/services/e-commerce" },
    { label: "Meta Ads", href: "/services/meta-ads" },
    { label: "Google Ads", href: "/services/google-ads" },
    { label: "AI Solutions", href: "/services/ai-solutions" },
    { label: "SEO & AI Optimization", href: "/services/seo" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Pricing", href: "/pricing" },
    { label: "Industries", href: "/industries" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to pause video when out of viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.playbackRate = 0.7;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      // CTA section: scale up from 0.95 + fade in
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Links section: stagger columns in from bottom
      if (linksRef.current) {
        const columns = linksRef.current.querySelectorAll(":scope > div");
        gsap.fromTo(
          columns,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: linksRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, { scope: containerRef });

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={containerRef} className="relative w-full bg-[#050505]">
      {/* Video CTA Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          aria-hidden="true"
        >
          <source src="/hero-video-desktop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/60 to-[#050505]" />

        {/* CTA overlay — GSAP animates this */}
        <div ref={ctaRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-white text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            Ready to Grow?
          </span>
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-black tracking-[-0.04em] leading-[0.9] text-white max-w-4xl">
            Let&apos;s Build
            <br />
            Something Great.
          </h2>
          <a
            href="https://wa.me/919929986743"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 bg-[#EAB308] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#d4a007] transition-colors duration-300"
          >
            Message Us on WhatsApp
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Footer Links — GSAP animates columns */}
      <div ref={linksRef} className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/reverbex logo.png"
                alt="Reverbex"
                width={120}
                height={36}
                className="h-7 w-auto object-contain"
              />
              <span className="text-base text-white font-semibold tracking-tight">
                REVERBEX
              </span>
            </Link>
            <p className="text-[#666666] text-sm leading-relaxed max-w-xs">
              Websites. Ads. Automation. Built to grow businesses. Based in Jaipur, serving globally.
            </p>
            <div className="flex gap-4">
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-[#EAB308] transition-colors text-xs uppercase tracking-[0.15em]"
              >
                LinkedIn
              </a>
              <a
                href={SOCIALS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-[#EAB308] transition-colors text-xs uppercase tracking-[0.15em]"
              >
                Twitter
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="col-span-1 md:col-span-2 md:col-start-6">
            <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#666666] text-sm hover:text-[#EAB308] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#666666] text-sm hover:text-[#EAB308] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3">
            <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Get in Touch
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-[#666666] text-sm hover:text-[#EAB308] transition-colors break-all"
                >
                  {CONTACT.emailDisplay}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="text-[#666666] text-sm hover:text-[#EAB308] transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <span className="text-[#666666] text-sm">
                  {CONTACT.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
            <p className="text-[#444] text-[10px] md:text-xs tracking-[0.15em] uppercase">
              &copy; {new Date().getFullYear()} Reverbex Technologies
            </p>
            <div className="flex gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#444] text-[10px] md:text-xs tracking-[0.15em] uppercase hover:text-[#EAB308] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <button
            onClick={handleBackToTop}
            className="text-[#444] hover:text-white text-[10px] md:text-xs tracking-[0.15em] uppercase transition-colors cursor-pointer flex items-center gap-2"
          >
            Back to Top
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
