export const industriesData: Record<
  string,
  {
    name: string;
    tagline: string;
    heroImage?: string;
    challenges: string[];
    solutions: string[];
    metrics: { value: string; label: string }[];
    relatedCaseStudySlug?: string;
    relatedCaseStudyName?: string;
  }
> = {
  "education": {
    name: "Education & Coaching",
    tagline: "Student acquisition funnels and digital infrastructure for modern institutes.",
    challenges: [
      "High competition for student admissions in local markets.",
      "Wasting ad spend on low-intent, unqualified leads.",
      "Slow response times causing students to enroll elsewhere."
    ],
    solutions: [
      "High-converting landing pages tailored to specific courses.",
      "Meta Ads campaigns targeting parents and relevant student demographics.",
      "Automated WhatsApp lead nurturing systems."
    ],
    metrics: [
      { value: "40%", label: "Lower Cost Per Lead" },
      { value: "3x", label: "Faster Lead Response" }
    ],
    relatedCaseStudySlug: "maac-animation",
    relatedCaseStudyName: "MAAC Animation Jaipur"
  },
  "manufacturing": {
    name: "Manufacturing & B2B",
    tagline: "Enterprise-grade digital positioning and automated inventory systems.",
    challenges: [
      "Outdated corporate websites that look unprofessional.",
      "Manual inventory and supply chain tracking via spreadsheets.",
      "Lack of international B2B digital visibility."
    ],
    solutions: [
      "Premium B2B catalog websites that build immediate corporate trust.",
      "Custom ERP systems for real-time inventory and order tracking.",
      "Global Search Engine Optimization (SEO) for B2B keywords."
    ],
    metrics: [
      { value: "200%", label: "Increase in B2B Trust" },
      { value: "Zero", label: "Manual Data Entry Errors" }
    ],
    relatedCaseStudySlug: "khemji-wire",
    relatedCaseStudyName: "Khemji Wire Company"
  },
  "ecommerce": {
    name: "E-Commerce & Retail",
    tagline: "High-speed custom storefronts built to maximize cart conversions.",
    challenges: [
      "Losing 2-5% of every sale to platform transaction fees.",
      "Slow mobile loading times causing cart abandonment.",
      "Generic templates that don't reflect the brand."
    ],
    solutions: [
      "Custom Next.js e-commerce with zero platform transaction fees.",
      "Sub-second page loads optimized heavily for mobile shoppers.",
      "Integrated UPI gateways and WhatsApp order tracking."
    ],
    metrics: [
      { value: "0%", label: "Platform Transaction Fees" },
      { value: "100", label: "Mobile PageSpeed Score" }
    ],
    relatedCaseStudySlug: "aarya-clothing",
    relatedCaseStudyName: "Aarya Clothing"
  },
  "logistics": {
    name: "Logistics & Supply Chain",
    tagline: "AI-driven tracking and operational portals for modern fleets.",
    challenges: [
      "Manual document processing and physical form filling.",
      "Inefficient route planning leading to high fuel costs.",
      "Poor real-time visibility for clients tracking shipments."
    ],
    solutions: [
      "Automated customer portals with real-time tracking.",
      "Custom ERP dashboards for fleet and warehouse management.",
      "AI-driven automated document extraction."
    ],
    metrics: [
      { value: "50%", label: "Reduction in Paperwork" },
      { value: "24/7", label: "Client Visibility" }
    ],
  },
  "startups": {
    name: "Tech Startups",
    tagline: "Scalable web applications and rapid go-to-market funnels.",
    challenges: [
      "Need to build MVP fast without sacrificing long-term scalability.",
      "Standing out to investors with a premium digital presence.",
      "Acquiring early adopters efficiently."
    ],
    solutions: [
      "Next.js web applications built on scalable cloud architecture.",
      "Premium, dark-editorial branding that screams high-tech.",
      "Performance marketing campaigns to drive initial user growth."
    ],
    metrics: [
      { value: "100%", label: "Code Ownership" },
      { value: "Rapid", label: "Go-To-Market Execution" }
    ]
  },
  "retail": {
    name: "Local Retail",
    tagline: "Omnichannel digital strategies driving foot traffic and local sales.",
    challenges: [
      "Competing with giant e-commerce platforms.",
      "Invisible in local Google search results.",
      "No direct communication channel with regular customers."
    ],
    solutions: [
      "Local SEO and Answer Engine Optimization to dominate local searches.",
      "WhatsApp Business API to broadcast offers to loyal customers.",
      "Local Meta Ads targeting specific geographic radiuses."
    ],
    metrics: [
      { value: "#1", label: "Local Search Rankings" },
      { value: "90%", label: "WhatsApp Open Rates" }
    ]
  }
};
