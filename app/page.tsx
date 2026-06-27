import {
  HeroVideo,
  FeaturedArchitectures,
  ServicesGallery,
  WhyReverbex,
  Methodology,
  ReverbexBond,
  FAQSection,
  ContactSection,
} from "./DynamicComponents";

export default function Home() {
  return (
    <div className="w-full relative text-white selection:bg-[#EAB308]/30 min-h-screen">
      <HeroVideo />
      <FeaturedArchitectures />
      <ServicesGallery />
      <WhyReverbex />
      <Methodology />
      <ReverbexBond />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
