import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";
import SmoothScroll from "../components/SmoothScroll";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Reverbex Technologies",
    template: "%s | Reverbex Technologies",
  },
  description: "We architect autonomous systems. Premium AI automation, web development, and intelligent solutions for modern enterprises.",
  keywords: ["AI automation", "web development", "mobile apps", "AI agents", "digital transformation", "enterprise solutions"],
  authors: [{ name: "Reverbex Technologies" }],
  creator: "Reverbex Technologies",
  publisher: "Reverbex Technologies",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reverbex.com",
    siteName: "Reverbex Technologies",
    title: "Reverbex Technologies - Intelligent Architecture for Modern Enterprises",
    description: "We architect autonomous systems. Premium AI automation, web development, and intelligent solutions for modern enterprises.",
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
    title: "Reverbex Technologies - Intelligent Architecture",
    description: "We architect autonomous systems. Premium AI automation, web development, and intelligent solutions.",
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
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="/" />
        <link rel="preload" as="video" href="/hero-video.mp4" type="video/mp4" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} overflow-x-hidden antialiased bg-black text-white`}>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <main id="main-content" tabIndex={-1}>
          <SmoothScroll>{children}</SmoothScroll>
        </main>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}