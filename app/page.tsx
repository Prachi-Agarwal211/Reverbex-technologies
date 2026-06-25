import {
  HeroVideo,
  StickyServices,
  WhyReverbex,
  Methodology,
  FeaturedArchitectures,
  FAQSection,
  ContactSection,
} from "./DynamicComponents";

export default function Home() {
  return (
    <main className="w-full relative text-white selection:bg-blue-500/30 min-h-screen">
      <HeroVideo />
      <StickyServices />
      <WhyReverbex />
      <Methodology />
      <FeaturedArchitectures />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
