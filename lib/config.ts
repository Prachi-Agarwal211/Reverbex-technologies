// Centralized configuration for Reverbex Technologies website

export const CONTACT = {
  email: "15anuragsingh2003@gmail.com",
  emailDisplay: "15anuragsingh2003@gmail.com",
  phone: "+91 99299 86743",
  phoneHref: "tel:+919929986743",
  location: "India / Remote-First",
};

export const SOCIALS = {
  linkedin: "https://linkedin.com/company/reverbex",
  twitter: "https://twitter.com/reverbex",
};

export const SECTIONS = [
  "hero",
  "trustedby",
  "capabilities", // What We Do
  "results", // Results Dashboard
  "architectures", // Case Studies Preview
  "whyreverbex", // Why choose custom
  "premiumpositioning", // Premium beats cheap
  "reverbexbond", // Reverbex Bond
  "methodology", // Process + Next.js
  "industries", // Industries Serve
  "testimonials", // Client Reviews
  "faq", // FAQs
  "founders", // Team/Founders
  "contact",
] as const;

export const MOBILE_NAV_ITEMS = [
  { label: "Home", to: "hero" as const },
  { label: "Services", to: "capabilities" as const },
  { label: "Work", to: "architectures" as const },
  { label: "About", to: "reverbexbond" as const },
  { label: "Contact", to: "contact" as const },
];

export const DESKTOP_NAV_ITEMS = [
  { label: "Home", to: "hero" as const },
  { label: "Services", to: "capabilities" as const },
  { label: "Work", to: "architectures" as const },
  { label: "About", to: "reverbexbond" as const },
  { label: "Contact", to: "contact" as const },
];

export const COMPANY = {
  name: "Reverbex Technologies",
  tagline: "Websites. Ads. Automation. Built To Grow Businesses.",
  url: "https://reverbex.com",
  foundingYear: 2024,
};

