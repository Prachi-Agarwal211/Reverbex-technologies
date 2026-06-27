"use client";

import dynamic from "next/dynamic";

const WalkingLoader = dynamic(() => import("../components/WalkingLoader"), { ssr: false });

const loader = () => <WalkingLoader />;

export const HeroVideo = dynamic(() => import("../components/HeroVideo"), {
  ssr: false,
  loading: loader,
});

export const FeaturedArchitectures = dynamic(
  () => import("../components/FeaturedArchitectures"),
  { ssr: false, loading: loader }
);

export const ServicesGallery = dynamic(() => import("../components/ServicesGallery"), {
  ssr: false,
  loading: loader,
});

export const WhyReverbex = dynamic(() => import("../components/WhyReverbex"), {
  ssr: false,
  loading: loader,
});

export const Methodology = dynamic(() => import("../components/Methodology"), {
  ssr: false,
  loading: loader,
});

export const ReverbexBond = dynamic(() => import("../components/ReverbexBond"), {
  ssr: false,
  loading: loader,
});

export const FAQSection = dynamic(() => import("../components/FAQSection"), {
  ssr: false,
  loading: loader,
});

export const ContactSection = dynamic(
  () => import("../components/ContactSection"),
  { ssr: false, loading: loader }
);
