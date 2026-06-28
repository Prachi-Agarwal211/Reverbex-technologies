import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Reverbex Technologies | Get in Touch",
  description: "Contact Reverbex Technologies for custom website development, Meta & Google Ads, ERP systems, and automation. WhatsApp: +91 9929986743. Based in Jaipur, serving globally.",
  openGraph: {
    title: "Contact Reverbex Technologies | Get in Touch",
    description: "Custom websites, ads, automation. WhatsApp us at +91 9929986743 or fill out the contact form.",
    url: "https://reverbex.in/contact",
  },
  alternates: { canonical: "https://reverbex.in/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
