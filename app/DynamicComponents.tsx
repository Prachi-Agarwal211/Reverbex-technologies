"use client";

import dynamic from "next/dynamic";

export const HeroVideo = dynamic(() => import("../components/HeroVideo"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[100dvh] bg-[#000000] animate-pulse" />
  ),
});

export const TrustedBy = dynamic(() => import("../components/TrustedBy"), {
  ssr: false,
  loading: () => (
    <div className="w-full py-16 bg-[#050505] animate-pulse" />
  ),
});

export const WhatWeOffer = dynamic(() => import("../components/WhatWeOffer"), {
  ssr: false,
  loading: () => (
    <div className="w-full py-24 md:py-32 bg-[#050505] animate-pulse" />
  ),
});

export const LiveResults = dynamic(() => import("../components/LiveResults").then((mod) => mod.default || mod), {
  ssr: false,
  loading: () => (
    <div className="w-full py-24 bg-[#050505] animate-pulse" />
  ),
});

export const FeaturedArchitectures = dynamic(
  () => import("../components/FeaturedArchitectures"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-screen bg-[#050505] animate-pulse" />
    ),
  }
);

export const WhyReverbex = dynamic(() => import("../components/WhyReverbex"), {
  ssr: false,
  loading: () => (
    <div className="w-full py-24 bg-[#050505] animate-pulse" />
  ),
});

export const PremiumPositioning = dynamic(
  () => import("../components/PremiumPositioning"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full py-24 bg-[#0A0A0A] animate-pulse" />
    ),
  }
);

export const OurStory = dynamic(() => import("../components/OurStory"), {
  ssr: false,
  loading: () => (
    <div className="w-full py-24 md:py-32 bg-[#050505] animate-pulse" />
  ),
});

export const Methodology = dynamic(() => import("../components/Methodology"), {
  ssr: false,
  loading: () => (
    <div className="w-full py-24 md:py-32 bg-[#050505] animate-pulse" />
  ),
});

export const IndustriesSection = dynamic(
  () => import("../components/IndustriesSection"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full py-24 bg-[#050505] animate-pulse" />
    ),
  }
);

export const TestimonialsSection = dynamic(
  () => import("../components/TestimonialsSection"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full py-24 bg-[#0A0A0A] animate-pulse" />
    ),
  }
);

export const FAQSection = dynamic(() => import("../components/FAQSection"), {
  ssr: false,
  loading: () => (
    <div className="w-full py-24 bg-[#050505] animate-pulse" />
  ),
});

export const Founders = dynamic(() => import("../components/Founders"), {
  ssr: false,
  loading: () => (
    <div className="w-full pt-24 pb-40 bg-[#020202] animate-pulse" />
  ),
});

export const ContactSection = dynamic(
  () => import("../components/ContactSection"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[100dvh] bg-black animate-pulse" />
    ),
  }
);