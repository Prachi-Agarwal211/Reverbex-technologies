// Centralized configuration for Reverbex Technologies website

export const CONTACT = {
  email: "15anuragsingh2003@gmail.com",
  emailDisplay: "15anuragsingh2003@gmail.com",
  phone: "+91 99299 86743",
  phoneHref: "tel:+919929986743",
  location: "Jaipur, India / Remote-First",
};

export const SOCIALS = {
  linkedin: "https://linkedin.com/company/reverbex",
  twitter: "https://twitter.com/reverbex",
};

// Nav items: "to" values are used as section IDs on homepage,
// and mapped to real routes via NAV_ROUTE_MAP for menu links.
export const MOBILE_NAV_ITEMS = [
  { label: "Home", to: "hero" as const },
  { label: "Services", to: "capabilities" as const },
  { label: "Work", to: "architectures" as const },
  { label: "Industries", to: "industries" as const },
  { label: "About", to: "reverbexbond" as const },
];

export const DESKTOP_NAV_ITEMS = [
  { label: "Home", to: "hero" as const },
  { label: "Services", to: "capabilities" as const },
  { label: "Work", to: "architectures" as const },
  { label: "Industries", to: "industries" as const },
  { label: "About", to: "reverbexbond" as const },
  { label: "Contact", to: "contact" as const },
];

// Maps section IDs → actual page routes (used in MorphingMenu & MobileBottomNav)
export const NAV_ROUTE_MAP: Record<string, string> = {
  hero: "/",
  capabilities: "/services",
  architectures: "/work",
  industries: "/industries",
  reverbexbond: "/about",
  contact: "/#contact",
};

export const COMPANY = {
  name: "Reverbex Technologies",
  foundingYear: 2024,
};

