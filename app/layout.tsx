import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";
import SmoothScroll from "../components/SmoothScroll";
import CustomCursor from "../components/CustomCursor";
import WhatsAppButton from "../components/shared/WhatsAppButton";
import MorphingMenu from "../components/MorphingMenu";
import { CONTACT, COMPANY, SOCIALS } from "@/lib/config";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://reverbex.in'),
  title: {
    default: "Reverbex Technologies | Websites, Ads & Automation",
    template: "%s | Reverbex Technologies",
  },
  description: "Websites. Ads. Automation. Built To Grow Businesses. We build custom Next.js websites, run performance Meta/Google Ads, and engineer operations automation systems.",
  keywords: ["custom website development", "nextjs development", "meta ads management", "facebook ads agency", "google ads expert", "lead generation company", "custom erp software", "whatsapp automation", "business automation", "rebranding services"],
  authors: [{ name: "Reverbex Technologies" }],
  creator: "Reverbex Technologies",
  publisher: "Reverbex Technologies",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://reverbex.in',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reverbex.in",
    siteName: "Reverbex Technologies",
    title: "Reverbex Technologies | Websites, Ads & Automation for Business Growth",
    description: "Websites. Ads. Automation. Built To Grow Businesses. High-performance custom web systems, advertising campaigns, and operational automations.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Reverbex Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reverbex Technologies | Custom Web Systems, Ads & Automation",
    description: "Websites. Ads. Automation. Built To Grow Businesses. High-performance custom websites, Meta/Google ads management, and process automation.",
    images: ["/twitter-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  other: {
    'geo.region': 'IN',
    'geo.placename': 'India',
    'geo.position': '20.5937;78.9629',
    'ICBM': '20.5937, 78.9629',
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preload" as="video" href="/hero-video-mobile.mp4" type="video/mp4" fetchPriority="high" media="(max-width: 768px)" />
        <link rel="preload" as="image" href="/hero-poster.jpg" fetchPriority="high" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": COMPANY.name,
              "url": "https://reverbex.in",
              "logo": `https://reverbex.in/logo.PNG`,
              "description": "Websites. Ads. Automation. Built To Grow Businesses. We build custom Next.js websites, run performance Meta/Google Ads, and engineer operations automation systems.",
              "foundingDate": String(COMPANY.foundingYear),
              "founders": [
                {
                  "@type": "Person",
                  "name": "Anurag Singh",
                  "jobTitle": "Founder & Lead Developer"
                },
                {
                  "@type": "Person",
                  "name": "Prachi Agarwal",
                  "jobTitle": "Co-Founder & Strategy Lead"
                }
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "email": CONTACT.email,
                  "contactType": "customer service",
                  "availableLanguage": "English"
                }
              ],
              "telephone": CONTACT.phone.replace(/\s/g, ""),
              "areaServed": {
                "@type": "Country",
                "name": "India"
              },
              "sameAs": [
                SOCIALS.linkedin,
                SOCIALS.twitter
              ],
              "knowsAbout": [
                "Custom Website Development",
                "E-Commerce Development",
                "Meta Ads Management",
                "Google Ads Management",
                "Lead Generation",
                "ERP System Development",
                "Mobile App Development",
                "AI Solutions",
                "WhatsApp Automation",
                "Logo Design & Branding",
                "Complete Rebranding",
                "SEO Services"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden antialiased bg-black text-white`}>
        {/* Skip to Content Link for Accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <CustomCursor />
        <MorphingMenu />
        <main id="main-content" tabIndex={-1}>
          <SmoothScroll>{children}</SmoothScroll>
        </main>
        <WhatsAppButton />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
