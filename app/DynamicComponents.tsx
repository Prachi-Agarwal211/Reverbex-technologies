"use client";

import dynamic from "next/dynamic";

const pulse = <div className="w-full py-24 bg-transparent animate-pulse" />;

export const HeroVideo = dynamic(() => import("../components/HeroVideo"), {
  loading: () => <div className="w-full h-[100dvh] bg-[#050505] animate-pulse" />,
});

export const TrustedBy = dynamic(() => import("../components/TrustedBy"), {
  loading: () => <div className="w-full min-h-screen bg-transparent animate-pulse" />,
});

export const LiveResults = dynamic(() => import("../components/LiveResults"), {
  loading: () => pulse,
});

export const StickyServices = dynamic(() => import("../components/StickyServices"), {
  loading: () => <div className="w-full h-screen bg-transparent animate-pulse" />,
});

export const FeaturedArchitectures = dynamic(
  () => import("../components/FeaturedArchitectures"),
  {
    loading: () => <div className="w-full min-h-screen bg-transparent animate-pulse" />,
  }
);

export const WhyReverbex = dynamic(() => import("../components/WhyReverbex"), {
  loading: () => pulse,
});

export const Testimonials = dynamic(() => import("../components/Testimonials"), {
  loading: () => pulse,
});

export const Methodology = dynamic(() => import("../components/Methodology"), {
  loading: () => pulse,
});

export const FAQSection = dynamic(() => import("../components/FAQSection"), {
  loading: () => pulse,
});

export const ReverbexBond = dynamic(() => import("../components/ReverbexBond"), {
  loading: () => pulse,
});

export const ContactSection = dynamic(
  () => import("../components/ContactSection"),
  {
    loading: () => <div className="w-full min-h-[100dvh] bg-transparent animate-pulse" />,
  }
);

export const Industries = dynamic(() => import("../components/Industries"), {
  loading: () => <div className="w-full py-24 bg-transparent animate-pulse" />,
});
