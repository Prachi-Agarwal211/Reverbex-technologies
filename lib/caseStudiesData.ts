export const caseStudiesData: Record<
  string,
  {
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
> = {
  "maac-animation": {
    client: "MAAC Animation Jaipur",
    resultTitle: "500+ Qualified Student Leads Generated",
    tags: ["Education", "Lead Generation", "Meta Ads", "Landing Page"],
    problem: "The institute relied heavily on offline marketing and referrals. Previous digital campaigns run by generic agencies generated junk leads with zero intent to enroll, wasting lakhs in ad spend.",
    research: "We analyzed competitor ad libraries, student search intent, and the decision-making process of parents. We discovered that generic 'Apply Now' ads failed because education requires high trust and detailed course information before a commitment.",
    solution: "We engineered a high-converting Next.js landing page that detailed course outcomes, faculty portfolios, and placement records. We paired this with highly targeted Meta Ads and a WhatsApp automation sequence that nurtured leads instantly upon form submission.",
    techStack: [
      { name: "Next.js", category: "Frontend" },
      { name: "Meta Ads", category: "Advertising" },
      { name: "WhatsApp API", category: "Automation" },
      { name: "Vercel", category: "Hosting" }
    ],
    metrics: [
      { value: "500", label: "Qualified Leads", suffix: "+" },
      { value: "45", label: "Reduction in CPL", suffix: "%" },
      { value: "14", label: "Days to Launch" }
    ],
    testimonial: {
      quote: "The quality of leads changed overnight. Reverbex didn't just run ads; they built an entire automated admission engine for our institute.",
      name: "Center Director",
      title: "Director",
      company: "MAAC Animation"
    }
  },
  "aarya-clothing": {
    client: "Aarya Clothing",
    resultTitle: "₹3L+ Revenue Generated via Custom E-Commerce",
    tags: ["E-Commerce", "Next.js", "Payment Gateway", "Performance"],
    problem: "Their existing Shopify store was slow, bloated with expensive plugins, and losing customers at checkout. Mobile users were abandoning carts because of 4-second load times and complicated payment options.",
    research: "A deep dive into their analytics revealed an 82% mobile drop-off rate at the cart stage. The target demographic strongly preferred UPI payments, which their old theme didn't seamlessly support without extra steps.",
    solution: "We built a bespoke Next.js e-commerce platform with a sub-second load time. We integrated Razorpay for instant 1-click UPI checkouts and eliminated all monthly platform fees. The new site was visually stunning, fast, and built specifically for mobile commerce.",
    techStack: [
      { name: "Next.js", category: "Frontend" },
      { name: "Node.js", category: "Backend" },
      { name: "Razorpay", category: "Payments" },
      { name: "PostgreSQL", category: "Database" }
    ],
    metrics: [
      { value: "3", label: "Lakhs in Revenue", prefix: "₹", suffix: "+" },
      { value: "85", label: "Faster Checkout", suffix: "%" },
      { value: "0", label: "Platform Fees", suffix: "%" }
    ],
    testimonial: {
      quote: "Moving away from Shopify templates to a custom Reverbex store was the best decision. Our conversions skyrocketed because the site is unbelievably fast.",
      name: "Founder",
      title: "CEO",
      company: "Aarya Clothing"
    }
  },
  "khemji-wire": {
    client: "Khemji Wire Company",
    resultTitle: "Complete Corporate Digital Transformation",
    tags: ["Corporate", "B2B", "Rebranding", "Web Design"],
    problem: "A major manufacturing player with decades of history, but a digital presence stuck in 2005. They were losing massive B2B contracts to newer competitors simply because their website didn't reflect their actual scale and capability.",
    research: "B2B buyers conduct extensive research before engaging. We found that Khemji's certifications, manufacturing scale, and product technical specifications were buried or missing online.",
    solution: "We executed a complete digital overhaul. We created a premium, dark-editorial B2B catalog site that showcased their massive infrastructure, technical specs, and certifications with high-resolution visual storytelling. The new platform positioned them as the industry leader they are.",
    techStack: [
      { name: "Next.js", category: "Frontend" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Figma", category: "Design" },
      { name: "GSAP", category: "Animations" }
    ],
    metrics: [
      { value: "200", label: "Increase in B2B Inquiries", suffix: "%" },
      { value: "100", label: "PageSpeed Score" },
      { value: "1", label: "Unified Brand Identity" }
    ],
    testimonial: {
      quote: "Our website finally matches the scale of our manufacturing plants. The B2B leads we are getting now are from top-tier enterprise clients who previously overlooked us.",
      name: "Managing Director",
      title: "MD",
      company: "Khemji Wire"
    }
  }
};
