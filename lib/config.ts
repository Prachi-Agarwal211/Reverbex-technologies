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
  "capabilities",
  "story",
  "services",
  "architectures",
  "methodology",
  "techstream",
  "founders",
  "contact",
] as const;

export const MOBILE_NAV_ITEMS = [
  { label: "Home", to: "hero" as const },
  { label: "Story", to: "story" as const },
  { label: "Offerings", to: "capabilities" as const },
  { label: "Services", to: "services" as const },
  { label: "Work", to: "architectures" as const },
  { label: "Founders", to: "founders" as const },
  { label: "Contact", to: "contact" as const },
];

export const DESKTOP_NAV_ITEMS = [
  { label: "Home", to: "hero" as const },
  { label: "Capabilities", to: "capabilities" as const },
  { label: "Services", to: "services" as const },
  { label: "Work", to: "architectures" as const },
  { label: "Founders", to: "founders" as const },
  { label: "Contact", to: "contact" as const },
];

export const COMPANY = {
  name: "Reverbex Technologies",
  tagline: "Intelligent Architecture for Modern Enterprises",
  url: "https://reverbex.com",
  foundingYear: 2024,
};
