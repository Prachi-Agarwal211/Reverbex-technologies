import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Reverbex Technologies | Engineering Without Compromise",
  description: "We are a 100% in-house engineering team based in Jaipur. Custom websites, Meta & Google Ads, ERP systems, WhatsApp automation, and AI solutions. Zero templates. Zero outsourcing.",
  openGraph: {
    title: "About Reverbex Technologies | Engineering Without Compromise",
    description: "100% in-house engineering team. Custom websites, ads, automation. Based in Jaipur, serving globally.",
    url: "https://reverbex.in/about",
  },
  alternates: { canonical: "https://reverbex.in/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
