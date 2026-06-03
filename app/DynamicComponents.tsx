"use client";

import dynamic from "next/dynamic";

export const HeroVideo = dynamic(() => import("../components/HeroVideo"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[100dvh] bg-[#020202] animate-pulse" />
  ),
});

export const WhatWeOffer = dynamic(() => import("../components/WhatWeOffer"), {
  ssr: false,
  loading: () => (
    <div className="w-full py-24 md:py-32 bg-[#020202] animate-pulse" />
  ),
});

export const OurStory = dynamic(() => import("../components/OurStory"), {
  ssr: false,
  loading: () => (
    <div className="w-full py-32 bg-[#020202] animate-pulse" />
  ),
});

export const ServicesSection = dynamic(
  () => import("../components/ServicesSection"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[100vh] bg-[#020202] animate-pulse" />
    ),
  }
);

export const FeaturedArchitectures = dynamic(
  () => import("../components/FeaturedArchitectures"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-screen bg-[#050505] animate-pulse" />
    ),
  }
);

export const Methodology = dynamic(() => import("../components/Methodology"), {
  ssr: false,
  loading: () => (
    <div className="w-full py-40 bg-[#050505] animate-pulse" />
  ),
});

export const TechStream = dynamic(() => import("../components/TechStream"), {
  ssr: false,
  loading: () => (
    <div className="w-full py-32 bg-gradient-to-b from-[#050505] via-[#050a15] to-[#050505] animate-pulse" />
  ),
});

export const Founders = dynamic(() => import("../components/Founders"), {
  ssr: false,
  loading: () => (
    <div className="w-full pt-40 pb-40 bg-[#020202] animate-pulse" />
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