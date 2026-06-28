import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Reverbex Technologies",
  description: "Transparent pricing for custom websites, ads, and automation. No per-user fees. No transaction cuts. Custom quotes based on your exact needs.",
  openGraph: {
    title: "Pricing | Reverbex Technologies",
    description: "Transparent value. No hidden fees. Custom quotes for premium engineering.",
    url: "https://reverbex.in/pricing",
  },
  alternates: { canonical: "https://reverbex.in/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
