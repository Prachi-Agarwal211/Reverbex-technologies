import Navbar from "../components/Navbar";
import {
  HeroVideo,
  TrustedBy,
  StickyServices,
  LiveResults,
  FeaturedArchitectures,
  WhyReverbex,
  PremiumPositioning,
  ReverbexBond,
  Methodology,
  WhyNextJs,
  Industries,
  Testimonials,
  FAQSection,
  ContactSection,
} from "./DynamicComponents";

export default function Home() {
  return (
    <main className="w-full relative text-white selection:bg-[#EAB308]/30 min-h-screen">
      <Navbar />
      <HeroVideo />
      <TrustedBy />
      <StickyServices />
      <LiveResults />
      <FeaturedArchitectures />
      <WhyReverbex />
      <PremiumPositioning />
      <ReverbexBond />
      <Methodology />
      <WhyNextJs />
      <Industries />
      <Testimonials />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
