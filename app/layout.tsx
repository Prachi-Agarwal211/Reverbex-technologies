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
  title: "Reverbex Technologies",
  description: "We architect autonomous systems.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="/" />
        <link rel="preload" as="video" href="/hero-video.mp4" type="video/mp4" />
      </head>
      <body className={`${inter.className} overflow-x-hidden antialiased bg-black text-white`}>
        <SmoothScroll>{children}</SmoothScroll>
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}