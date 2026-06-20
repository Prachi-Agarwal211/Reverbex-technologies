import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import ContactSection from "../../components/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | Reverbex Technologies",
  description: "Get in touch with Reverbex Technologies to discuss your next custom engineering or digital marketing project.",
  openGraph: {
    title: "Contact Us | Reverbex Technologies",
    description: "Get in touch with Reverbex Technologies.",
    type: "website",
    url: "https://reverbex.in/contact",
  }
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Reverbex Technologies",
            "provider": {
              "@type": "Organization",
              "name": "Reverbex Technologies",
              "telephone": "+91-9929986743",
              "email": "15anuragsingh2003@gmail.com",
              "url": "https://reverbex.in"
            }
          })
        }}
      />
      <main className="w-full bg-[#050505] text-white min-h-screen pt-32 selection:bg-[#EAB308]/30">
        <Navbar />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
          <span className="text-[#EAB308] text-sm font-semibold tracking-widest uppercase block mb-6">
            Start a Conversation
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-8" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
            Let's build something.
          </h1>
          <p className="text-[#A0A0A0] text-xl font-light leading-relaxed max-w-2xl">
            Whether you need a massive enterprise ERP, a blazing fast Next.js e-commerce site, or a performance marketing engine—our team of senior engineers is ready.
          </p>
        </div>

        {/* Re-use the extremely well built ContactSection from the homepage */}
        <ContactSection />
      </main>
    </>
  );
}
