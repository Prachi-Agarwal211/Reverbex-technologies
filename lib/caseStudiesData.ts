export const caseStudiesData: Record<
  string,
  {
    client: string;
    resultTitle: string;
    tags: string[];
    problem: string;
    research: string;
    solution: string;
    features?: { title: string; desc: string; color: string }[];
    techStack: { name: string; category: string }[];
    metrics: { value: string; label: string; prefix?: string; suffix?: string }[];
    testimonial: {
      quote: string;
      name: string;
      title: string;
      company: string;
    };
    accentColor?: string;
    image?: string;
  }
> = {
  "maac-animation-jaipur": {
    client: "MAAC Animation Jaipur",
    resultTitle: "200+ Leads in the First Month Alone",
    tags: ["Education", "Lead Generation", "Meta Ads", "SSR", "GEO/SEO"],
    accentColor: "#3B82F6",
    image: "/maac animation jaipur.png",
    problem:
      "MAAC Animation Jaipur relied on offline marketing and referrals. Previous digital campaigns run by generic agencies generated junk leads with zero intent to enroll, wasting lakhs in ad spend with no admission conversions.",
    research:
      "We analyzed competitor ad libraries, student search behavior, and the parent-student decision-making journey. We discovered that generic 'Apply Now' ads failed because education requires high trust signals — faculty portfolios, placement records, and course outcomes before any commitment is made.",
    solution:
      "We built a blazing-fast Next.js SSR website with a 100/100 PageSpeed score, deep GEO optimization so MAAC appears in ChatGPT and Gemini search results, and stunning GSAP animations. We paired it with precision-targeted Meta Ads and an automated WhatsApp sequence that nurtured every lead instantly — turning interest into bookings 24/7.",
    features: [
      { title: "Next.js SSR", desc: "Server-side rendered pages for instant load and Google-crawlable content", color: "#3B82F6" },
      { title: "GEO / AEO", desc: "Optimized for ChatGPT, Gemini, and Perplexity AI engine citations", color: "#EAB308" },
      { title: "GSAP Animations", desc: "Award-worthy micro-animations and scroll-triggered reveals", color: "#10B981" },
      { title: "Meta Ads Engine", desc: "Hyper-targeted Facebook & Instagram campaigns with A/B testing", color: "#A78BFA" },
      { title: "WhatsApp Automation", desc: "Instant lead nurturing — admission queries handled automatically", color: "#0EA5E9" },
      { title: "SEO Optimized", desc: "Schema markup, structured data, and technical SEO for top rankings", color: "#F472B6" },
    ],
    techStack: [
      { name: "Next.js", category: "Frontend" },
      { name: "TypeScript", category: "Language" },
      { name: "GSAP", category: "Animations" },
      { name: "Meta Ads", category: "Advertising" },
      { name: "WhatsApp API", category: "Automation" },
      { name: "Vercel", category: "Hosting" },
    ],
    metrics: [
      { value: "500", label: "Total Leads Generated", suffix: "+" },
      { value: "200", label: "Leads in Month 1", suffix: "+" },
      { value: "45", label: "Reduction in Cost Per Lead", suffix: "%" },
    ],
    testimonial: {
      quote:
        "The quality of leads changed overnight. Reverbex didn't just run ads — they built an entire automated admission engine for our institute. Our counselors now spend time on genuine inquiries, not cold follow-ups.",
      name: "Center Director",
      title: "Director",
      company: "MAAC Animation Jaipur",
    },
  },

  "aarya-clothing": {
    client: "Aarya Clothing",
    resultTitle: "₹4 Lakh+ Revenue in Just the First Month",
    tags: ["E-Commerce", "Full Stack", "CRM", "Payments", "WhatsApp OTP"],
    accentColor: "#EAB308",
    image: "/aarya clothing.png",
    problem:
      "Their Shopify store was slow, bloated with expensive plugins, and bleeding customers at checkout. Mobile users abandoned carts due to 4-second load times and clunky payment flows. They had no CRM, no admin control, and no way to scale without paying heavy platform and transaction fees.",
    research:
      "Deep analytics revealed an 82% mobile drop-off at the cart stage. Their target customers strongly preferred UPI, but the Shopify checkout was adding unnecessary friction. They also had no visibility into which customers ordered what, and could not manage their product catalog without a developer.",
    solution:
      "We built a completely custom e-commerce platform with Next.js and FastAPI — with a sub-second mobile experience, unlimited product support, and zero transaction fees. We integrated Razorpay for instant UPI checkout, built a full admin dashboard for managing customers, orders, and products, added WhatsApp + SMS + Email OTP for authentication, and automated invoice generation. We even added Excel export support for order reporting.",
    features: [
      { title: "Unlimited Products", desc: "No product limits, no variants limits — scale without restrictions", color: "#EAB308" },
      { title: "Full CRM System", desc: "Complete customer relationship management — order history, loyalty, communication", color: "#3B82F6" },
      { title: "Admin Dashboard", desc: "Manage customers, orders, products, and even UI customizations from one place", color: "#10B981" },
      { title: "Razorpay Payments", desc: "Secure UPI, card, and net banking — 1-click checkout, 0% platform fees", color: "#A78BFA" },
      { title: "OTP Authentication", desc: "WhatsApp + SMS + Email OTP login for maximum security and accessibility", color: "#0EA5E9" },
      { title: "Auto Invoice + Excel", desc: "Automatic PDF invoice generation and Excel export for all orders", color: "#F472B6" },
    ],
    techStack: [
      { name: "Next.js", category: "Frontend" },
      { name: "FastAPI", category: "Backend" },
      { name: "Razorpay", category: "Payments" },
      { name: "PostgreSQL", category: "Database" },
      { name: "WhatsApp API", category: "Automation" },
      { name: "Redis", category: "Cache/OTP" },
    ],
    metrics: [
      { value: "4", label: "Lakh Revenue in Month 1", prefix: "₹", suffix: "L+" },
      { value: "500", label: "Orders Delivered", suffix: "+" },
      { value: "2500", label: "Happy Customers", suffix: "+" },
    ],
    testimonial: {
      quote:
        "Moving away from Shopify to a custom Reverbex platform was the best business decision we made. Our site is lightning fast, we own everything, and the admin dashboard makes managing our entire store effortless. ₹4 lakh in the first month was beyond what we expected.",
      name: "Founder",
      title: "CEO",
      company: "Aarya Clothing",
    },
  },

  "khemji-wire-company": {
    client: "Khemji Wire Company",
    resultTitle: "Complete B2B Digital Transformation",
    tags: ["Corporate", "B2B", "Rebranding", "Parallax", "Web Design"],
    accentColor: "#10B981",
    image: "/khemji wire.png",
    problem:
      "A major manufacturing player with decades of history, but a digital presence stuck in 2005. They were losing large B2B contracts to newer competitors simply because their website didn't reflect their actual scale, certifications, and industrial capabilities.",
    research:
      "B2B buyers conduct extensive online research before making contact. We found that Khemji's certifications, manufacturing scale, and technical product specifications were buried or missing entirely online — making it impossible for enterprise buyers to trust and verify their capabilities.",
    solution:
      "We executed a complete digital overhaul with Next.js, parallax scroll effects, and rich product catalog pages. The new site showcases their manufacturing infrastructure, technical specs, and certifications with cinematic visual storytelling. We added GSAP-powered parallax animations, improved their SEO significantly, and built a proper B2B inquiry system that routes leads directly to the right sales contacts.",
    features: [
      { title: "Parallax Animations", desc: "Cinematic scroll-driven visuals showcasing manufacturing scale", color: "#10B981" },
      { title: "Product Catalog", desc: "Rich technical spec pages for every product category with downloads", color: "#3B82F6" },
      { title: "B2B Inquiry System", desc: "Smart routing of enterprise leads to the right department contacts", color: "#EAB308" },
      { title: "SEO & Local Rankings", desc: "Ranked for all major industrial keywords in Rajasthan and nationally", color: "#A78BFA" },
    ],
    techStack: [
      { name: "Next.js", category: "Frontend" },
      { name: "GSAP", category: "Animations" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Figma", category: "Design" },
      { name: "Vercel", category: "Hosting" },
    ],
    metrics: [
      { value: "200", label: "Increase in B2B Inquiries", suffix: "%" },
      { value: "100", label: "PageSpeed Score" },
      { value: "1", label: "Unified Brand Identity" },
    ],
    testimonial: {
      quote:
        "Our website finally reflects the scale of our manufacturing plants. The B2B leads we now receive are from enterprise clients who previously overlooked us. Reverbex transformed our entire digital identity.",
      name: "Managing Director",
      title: "MD",
      company: "Khemji Wire Company",
    },
  },

  "shipbridge": {
    client: "Shipbridge",
    resultTitle: "India's First AI-Powered Logistics ERP Platform",
    tags: ["Logistics", "ERP", "AI/ML", "Full Stack", "Real-time"],
    accentColor: "#0EA5E9",
    image: "/shipbridge.png",
    problem:
      "India's logistics industry runs on WhatsApp messages, Excel sheets, and phone calls. Shipbridge needed a platform that could digitize the entire dispatch and tracking workflow — connecting shippers, drivers, and recipients in real-time without the overhead of legacy ERP systems.",
    research:
      "We studied existing logistics platforms and found a massive gap: existing systems were either too expensive for mid-market logistics companies, or too simplistic to handle the complexity of Indian multi-stop deliveries. Most had no AI-powered route optimization or predictive delivery times.",
    solution:
      "We built Shipbridge — an AI-first logistics ERP platform with a beautiful Next.js interface and a Node.js API backend. The platform features real-time shipment tracking, automated dispatch assignment using AI route optimization, driver apps, customer notification flows, and a command center dashboard for operations teams. It's fast, mobile-first, and designed for scale.",
    features: [
      { title: "AI Route Optimization", desc: "ML-powered dispatch assignment and route planning for maximum efficiency", color: "#0EA5E9" },
      { title: "Real-time Tracking", desc: "Live shipment tracking visible to shippers, drivers, and recipients", color: "#3B82F6" },
      { title: "Driver Mobile App", desc: "React Native app for drivers — delivery confirmation, POD, navigation", color: "#EAB308" },
      { title: "Operations Dashboard", desc: "Command center for logistics teams — fleet, dispatch, analytics in one view", color: "#10B981" },
      { title: "Automated Notifications", desc: "SMS + WhatsApp updates sent automatically at every shipment milestone", color: "#A78BFA" },
      { title: "Analytics & Reports", desc: "Deep performance insights — on-time delivery rates, route efficiency, costs", color: "#F472B6" },
    ],
    techStack: [
      { name: "Next.js", category: "Frontend" },
      { name: "Node.js API", category: "Backend" },
      { name: "React Native", category: "Mobile" },
      { name: "PostgreSQL", category: "Database" },
      { name: "AI/ML Models", category: "Intelligence" },
      { name: "WhatsApp API", category: "Notifications" },
    ],
    metrics: [
      { value: "60", label: "Faster Dispatch Processing", suffix: "%" },
      { value: "99", label: "Delivery Tracking Accuracy", suffix: "%" },
      { value: "40", label: "Reduction in Manual Work", suffix: "%" },
    ],
    testimonial: {
      quote:
        "Reverbex built exactly what the Indian logistics market was missing. The AI dispatch system alone saves us hours every day. Our operations team finally has the visibility they need to run at scale.",
      name: "Operations Head",
      title: "COO",
      company: "Shipbridge",
    },
  },

  // Backward compat aliases
  "maac-animation": {
    client: "MAAC Animation Jaipur",
    resultTitle: "200+ Leads in the First Month",
    tags: ["Education", "Lead Generation", "Meta Ads", "Landing Page"],
    accentColor: "#3B82F6",
    image: "/maac animation jaipur.png",
    problem: "The institute relied heavily on offline marketing and referrals. Previous digital campaigns generated junk leads with zero enrollment intent.",
    research: "We analyzed competitor ads and student decision-making journeys, finding that education needs high trust signals before commitment.",
    solution: "High-converting Next.js landing page, targeted Meta Ads, and automated WhatsApp nurturing sequence.",
    techStack: [
      { name: "Next.js", category: "Frontend" },
      { name: "Meta Ads", category: "Advertising" },
      { name: "WhatsApp API", category: "Automation" },
      { name: "Vercel", category: "Hosting" },
    ],
    metrics: [
      { value: "500", label: "Qualified Leads", suffix: "+" },
      { value: "45", label: "Reduction in CPL", suffix: "%" },
      { value: "14", label: "Days to Launch" },
    ],
    testimonial: {
      quote: "The quality of leads changed overnight. Reverbex built an entire automated admission engine for our institute.",
      name: "Center Director",
      title: "Director",
      company: "MAAC Animation Jaipur",
    },
  },
  "khemji-wire": {
    client: "Khemji Wire Company",
    resultTitle: "Complete Corporate Digital Transformation",
    tags: ["Corporate", "B2B", "Rebranding", "Web Design"],
    accentColor: "#10B981",
    image: "/khemji wire.png",
    problem: "A major manufacturing player with a digital presence stuck in 2005, losing B2B contracts to newer competitors.",
    research: "B2B buyers research extensively online. Khemji's certifications and technical specs were missing, making enterprise trust impossible.",
    solution: "Complete digital overhaul with premium B2B catalog site, technical specs, and certifications showcased with visual storytelling.",
    techStack: [
      { name: "Next.js", category: "Frontend" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Figma", category: "Design" },
      { name: "GSAP", category: "Animations" },
    ],
    metrics: [
      { value: "200", label: "Increase in B2B Inquiries", suffix: "%" },
      { value: "100", label: "PageSpeed Score" },
      { value: "1", label: "Unified Brand Identity" },
    ],
    testimonial: {
      quote: "Our website finally matches the scale of our manufacturing plants. The B2B leads we get now are from enterprise clients who previously overlooked us.",
      name: "Managing Director",
      title: "MD",
      company: "Khemji Wire Company",
    },
  },
};
