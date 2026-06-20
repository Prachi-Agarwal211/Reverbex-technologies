"use client";

import dynamic from "next/dynamic";

export const HeroVideo = dynamic(() => import("../components/HeroVideo"), {
  loading: () => (
    <div className="w-full h-[100dvh] bg-[#000000] animate-pulse" />
  ),
});

export const TrustedBy = dynamic(() => import("../components/TrustedBy"), {
  loading: () => (
    <div className="w-full py-16 bg-[#050505] animate-pulse" />
  ),
});

export const WhatWeOffer = dynamic(() => import("../components/WhatWeOffer"), {
  loading: () => (
    <div className="w-full py-24 md:py-32 bg-[#050505] animate-pulse" />
  ),
});

export const StickyServices = dynamic(() => import("../components/StickyServices"), {
  loading: () => (
    <div className="w-full h-screen bg-[#050505] animate-pulse" />
  ),
});

export const LiveResults = dynamic(() => import("../components/LiveResults").then((mod) => mod.default || mod), {
  loading: () => (
    <div className="w-full py-24 bg-[#050505] animate-pulse" />
  ),
});

export const FeaturedArchitectures = dynamic(
  () => import("../components/FeaturedArchitectures"),
  {
    loading: () => (
      <div className="w-full min-h-screen bg-[#050505] animate-pulse" />
    ),
  }
);

export const OurStory = dynamic(() => import("../components/OurStory"), {
  loading: () => (
    <div className="w-full py-24 md:py-32 bg-[#050505] animate-pulse" />
  ),
});

export const Methodology = dynamic(() => import("../components/Methodology"), {
  loading: () => (
    <div className="w-full py-24 md:py-32 bg-[#050505] animate-pulse" />
  ),
});

export const FAQSection = dynamic(() => import("../components/FAQSection"), {
  loading: () => (
    <div className="w-full py-24 bg-[#050505] animate-pulse" />
  ),
});

export const ContactSection = dynamic(
  () => import("../components/ContactSection"),
  {
    loading: () => (
      <div className="w-full min-h-[100dvh] bg-black animate-pulse" />
    ),
  }
);

export const WhyReverbex = dynamic(() => import("../components/WhyReverbex"), {
  loading: () => <div className="w-full py-24 bg-[#0A0A0A] animate-pulse" />,
});

export const PremiumPositioning = dynamic(() => import("../components/PremiumPositioning"), {
  loading: () => <div className="w-full py-24 bg-[#050505] animate-pulse" />,
});

export const ReverbexBond = dynamic(() => import("../components/ReverbexBond"), {
  loading: () => <div className="w-full py-24 bg-[#0A0A0A] animate-pulse" />,
});

export const WhyNextJs = dynamic(() => import("../components/WhyNextJs"), {
  loading: () => <div className="w-full py-24 bg-[#050505] animate-pulse" />,
});

export const Industries = dynamic(() => import("../components/Industries"), {
  loading: () => <div className="w-full py-24 bg-[#0A0A0A] animate-pulse" />,
});

export const Testimonials = dynamic(() => import("../components/Testimonials"), {
  loading: () => <div className="w-full py-24 bg-[#050505] animate-pulse" />,
});
