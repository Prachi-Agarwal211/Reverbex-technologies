"use client";

import dynamic from "next/dynamic";

const pulse = <div className="w-full py-24 bg-transparent animate-pulse" />;

// All GSAP-heavy components use ssr: false to:
// 1. Prevent hydration mismatches (GSAP reads window/document)
// 2. Keep SSR bundle lean (GSAP is client-only)
// 3. Avoid ScrollTrigger initialization errors during SSR

export const HeroVideo = dynamic(() => import("../components/HeroVideo"), {
  ssr: false,
  loading: () => <div className="w-full h-[100dvh] bg-[#050505]" />,
});

export const TrustedBy = dynamic(() => import("../components/TrustedBy"), {
  ssr: false,
  loading: () => <div className="w-full min-h-[40vh] bg-transparent" />,
});

export const StickyServices = dynamic(() => import("../components/StickyServices"), {
  ssr: false,
  loading: () => <div className="w-full min-h-screen bg-transparent animate-pulse" />,
});

export const FeaturedArchitectures = dynamic(
  () => import("../components/FeaturedArchitectures"),
  {
    ssr: false,
    loading: () => <div className="w-full min-h-screen bg-transparent animate-pulse" />,
  }
);

export const WhyReverbex = dynamic(() => import("../components/WhyReverbex"), {
  ssr: false,
  loading: () => pulse,
});

export const Methodology = dynamic(() => import("../components/Methodology"), {
  ssr: false,
  loading: () => pulse,
});

export const FAQSection = dynamic(() => import("../components/FAQSection"), {
  ssr: false,
  loading: () => pulse,
});

export const ReverbexBond = dynamic(() => import("../components/ReverbexBond"), {
  ssr: false,
  loading: () => pulse,
});

export const ContactSection = dynamic(
  () => import("../components/ContactSection"),
  {
    ssr: false,
    loading: () => <div className="w-full min-h-[100dvh] bg-transparent animate-pulse" />,
  }
);


