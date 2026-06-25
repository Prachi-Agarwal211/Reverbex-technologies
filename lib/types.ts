export interface Service {
  name: string;
  tagline: string;
  intro: string;
  problem: string;
  solution: string;
  comparison: {
    template: string[];
    custom: string[];
  };
  tech: string[];
  faqs: { q: string; a: string }[];
}

export interface CaseStudy {
  client: string;
  resultTitle: string;
  tags: string[];
  problem: string;
  research: string;
  solution: string;
  techStack: { name: string; category: string }[];
  metrics: { value: string; label: string; prefix?: string; suffix?: string }[];
  testimonial: {
    quote: string;
    name: string;
    title: string;
    company: string;
  };
}

export interface Industry {
  name: string;
  tagline: string;
  heroImage?: string;
  challenges: string[];
  solutions: string[];
  metrics: { value: string; label: string }[];
  relatedCaseStudySlug?: string;
  relatedCaseStudyName?: string;
}
