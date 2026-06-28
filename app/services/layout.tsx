import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Reverbex Technologies",
  description: "12 engineering capabilities: Custom websites, E-commerce, Mobile apps, Meta Ads, Google Ads, Lead generation, ERP systems, WhatsApp automation, AI solutions, SEO, Branding, and Rebranding. All built in-house.",
  openGraph: {
    title: "Our Services | Reverbex Technologies",
    description: "Custom websites, ads, automation, ERP, AI solutions — all engineered in-house. No templates. No outsourcing.",
    url: "https://reverbex.in/services",
  },
  alternates: { canonical: "https://reverbex.in/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
