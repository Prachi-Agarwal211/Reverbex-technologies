"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function PageCTA() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(ref.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      }
    );
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className="border-t border-[#1A1A1A] pt-24 pb-12 flex flex-col items-center text-center"
    >
      <h2 className="text-3xl md:text-5xl font-black text-white mb-6 max-w-2xl leading-tight text-heading-lift">
        Ready to grow your business?
      </h2>
      <p className="text-[#A0A0A0] text-lg mb-10 max-w-xl text-shadow-body">
        Every project includes direct WhatsApp support, zero hidden fees, and full ownership of your digital assets.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <a
          href="https://wa.me/919929986743"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-[#EAB308] text-black font-bold text-sm rounded-xl hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(234,179,8,0.3)]"
        >
          WhatsApp Us <ArrowUpRight className="w-4 h-4" />
        </a>
        <Link
          href="/contact"
          className="px-8 py-4 bg-transparent border border-[#333] text-white font-bold text-sm rounded-xl hover:bg-white/5 transition-colors duration-300 flex items-center justify-center"
        >
          Send a Message
        </Link>
      </div>
    </div>
  );
}
