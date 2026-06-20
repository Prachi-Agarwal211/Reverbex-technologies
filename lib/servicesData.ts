export const servicesData: Record<
  string,
  {
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
> = {
  "website-development": {
    name: "Custom Website Development",
    tagline: "High-performance custom Next.js websites built to convert visitors into clients.",
    intro: "A slow website costs you customers. We engineer custom Next.js web applications designed for maximum loading speeds (under 1 second), premium UI layout credibility, and technical SEO structure.",
    problem: "Most agencies sell you bloated WordPress themes that take 3-5 seconds to load, depend on unstable plugins, have security holes, and fail to rank on search engines. Every second of delay costs your business 7% in sales conversion.",
    solution: "We write clean, lightweight Next.js and React code from scratch. Our websites are fully server-side rendered (SSR), ensuring search engines and AI engines can index your content instantly. You receive full code ownership, zero license lock-in, and 100/100 PageSpeed scores.",
    comparison: {
      template: ["WordPress template everyone uses", "3.8s average load times", "Plugin vulnerabilities & constant patches", "No structured AEO/GEO indexing"],
      custom: ["Custom Next.js design unique to you", "Under 1 second load times (guaranteed)", "Zero plugin dependencies, safe code", "Full entity & schema structures for AI search"]
    },
    tech: ["Next.js", "React", "Tailwind CSS", "Vercel", "GSAP"],
    faqs: [
      { q: "Why is Next.js better than WordPress?", a: "Next.js pages are pre-rendered on the server and served as static HTML instantly to visitors. WordPress compiles PHP, runs database requests, and executes dozens of plugins on every page load, which slows it down." },
      { q: "Do I own the source code?", a: "Yes, 100%. You own the complete Git repository and code. We set it up on your servers or global edge hosts." }
    ]
  },
  "e-commerce": {
    name: "E-Commerce Development",
    tagline: "Custom online stores built with smooth checkout flows and 0% platform transaction fees.",
    intro: "Own your storefront. We build e-commerce systems designed to process transactions securely and scale without monthly platform subscriptions.",
    problem: "Standard e-commerce builders charge monthly subscription rates plus 2% to 3% transaction cuts on every single sale. They lock you into their templates and payment processors, eating away at your profit margins.",
    solution: "We develop dedicated e-commerce systems built on modern backend APIs and Next.js. We integrate secure UPI, credit cards, and local gateways directly. You pay zero platform fees, keep full client data, and customize checkout experiences to prevent cart abandonment.",
    comparison: {
      template: ["2% to 3% fee on every sale", "Limited checkout customizability", "Slow catalog load times on mobile", "Locked in vendor infrastructure"],
      custom: ["0% transaction fees (standard gateway only)", "Fully custom interactive checkouts", "Sub-second catalog rendering", "Full database control & admin dashboard"]
    },
    tech: ["Next.js", "Tailwind CSS", "Razorpay", "Stripe API", "Node.js"],
    faqs: [
      { q: "How does e-commerce customization improve sales?", a: "We design one-click checkouts, local payment preferences (UPI, net banking), and automated WhatsApp tracking notifications, reducing cart abandonment." },
      { q: "How secure is custom e-commerce?", a: "Our architectures run on serverless security protocols, protecting database instances from injections and utilizing fully-encrypted gateway tokenization." }
    ]
  },
  "mobile-apps": {
    name: "Mobile App Development",
    tagline: "Native and cross-platform mobile applications for iOS and Android that drive engagement.",
    intro: "Reach your customers on the devices they use most. We build mobile apps that feel fast, look premium, and integrate seamlessly with your existing digital systems.",
    problem: "Off-the-shelf app builders charge monthly fees, offer limited customization, and produce generic experiences that don't match your brand. Native development from agencies often costs lakhs and takes months.",
    solution: "We develop cross-platform mobile apps using React Native and Flutter, delivering native performance with a single codebase. Your app integrates with your website, ERP, and WhatsApp systems for a unified customer experience.",
    comparison: {
      template: ["Generic template-based apps", "Monthly subscription fees", "Limited branding control", "Slow, buggy performance"],
      custom: ["Custom UI matching your brand", "One-time development cost", "Full feature flexibility", "Native performance & smooth animations"]
    },
    tech: ["React Native", "Flutter", "TypeScript", "Firebase", "REST APIs"],
    faqs: [
      { q: "React Native or Flutter — which is better?", a: "Both deliver excellent cross-platform results. We recommend React Native for teams familiar with React/web ecosystems, and Flutter for projects needing highly custom UI animations." },
      { q: "Can the app connect to my existing website?", a: "Yes. We build APIs that sync your app with your website, ERP, and CRM systems in real-time." }
    ]
  },
  "meta-ads": {
    name: "Meta Ads Management",
    tagline: "Facebook and Instagram advertising campaigns designed specifically to generate customers.",
    intro: "Stop wasting ad budget on likes and impressions. We run performance-focused Meta advertising campaigns built to generate qualified leads and actual paying customers.",
    problem: "Most businesses burn through ad budgets getting random clicks and page likes that never convert into revenue. Generic agencies run templated campaigns without understanding your specific customer acquisition cost targets.",
    solution: "We architect full-funnel Meta ad campaigns — from audience research and creative strategy to A/B testing and daily optimization. Every campaign is built around your cost-per-lead and return-on-ad-spend targets.",
    comparison: {
      template: ["Random audience targeting", "No creative A/B testing", "Vanity metrics (likes, impressions)", "Set-and-forget campaign management"],
      custom: ["Data-driven audience segmentation", "Weekly creative A/B testing", "Lead-focused conversion tracking", "Daily bid & budget optimization"]
    },
    tech: ["Meta Ads Manager", "Facebook Pixel", "Conversion API", "Creative Studio", "Analytics"],
    faqs: [
      { q: "How fast will I see results?", a: "Most campaigns begin generating qualified leads within the first 3-5 days. Full optimization and cost reduction typically happens within 2-3 weeks of daily management." },
      { q: "What budget do I need?", a: "We recommend a minimum ad spend of ₹30,000/month for effective testing and scaling. We charge a management fee on top of your ad spend." }
    ]
  },
  "google-ads": {
    name: "Google Ads Management",
    tagline: "Search, Display, and YouTube campaigns configured for measurable return on investment.",
    intro: "Capture high-intent customers actively searching for your services. We manage Google Ads campaigns designed to deliver measurable ROI from day one.",
    problem: "Google Ads is complex. Most businesses either overspend on irrelevant keywords or run campaigns that generate clicks but no conversions. Without proper tracking, you can't tell what's working.",
    solution: "We set up and manage Search, Display, and YouTube campaigns with proper conversion tracking, negative keyword filtering, and bid optimization. You get transparent reporting showing exactly which keywords drive revenue.",
    comparison: {
      template: ["Broad keyword targeting", "No negative keyword strategy", "Basic text ads only", "Monthly reporting at best"],
      custom: ["Intent-based keyword research", "Aggressive negative keyword lists", "Responsive search ads + extensions", "Weekly performance optimization"]
    },
    tech: ["Google Ads", "Google Analytics 4", "Google Tag Manager", "Search Console", "Looker Studio"],
    faqs: [
      { q: "How is Google Ads different from SEO?", a: "Google Ads delivers immediate traffic from high-intent searches. SEO builds long-term organic visibility. We recommend running both in parallel for maximum coverage." },
      { q: "What's a good ROAS target?", a: "For service businesses, we typically target 4x-8x ROAS. For e-commerce, 3x-5x is standard. Your specific target depends on your margins." }
    ]
  },
  "lead-generation": {
    name: "Lead Generation Systems",
    tagline: "High-converting funnels and landing pages that deliver qualified leads to your business.",
    intro: "Stop relying on referrals alone. We build automated lead generation systems that capture, qualify, and route leads to your sales team 24/7.",
    problem: "Most businesses have no systematic way to generate leads. They depend on word-of-mouth, sporadic social media posts, and manual outreach — all of which don't scale.",
    solution: "We design and build complete lead generation funnels — from high-converting landing pages and lead magnets to automated email sequences and WhatsApp follow-ups. Every lead is tracked and routed to the right person instantly.",
    comparison: {
      template: ["No systematic lead capture", "Manual follow-up process", "No lead scoring or routing", "Unpredictable pipeline"],
      custom: ["Automated 24/7 lead capture", "Instant WhatsApp + email follow-up", "Lead scoring & CRM integration", "Predictable, scalable pipeline"]
    },
    tech: ["Next.js", "Landing Pages", "WhatsApp Business API", "CRM Integration", "Analytics"],
    faqs: [
      { q: "How many leads can I expect?", a: "Lead volume depends on your ad spend, industry, and offer. We focus on quality over quantity — targeting leads with genuine purchase intent." },
      { q: "Do you build the landing pages too?", a: "Yes. Every lead generation system includes custom-designed, high-converting landing pages built on Next.js for maximum speed." }
    ]
  },
  "erp-systems": {
    name: "ERP System Development",
    tagline: "Custom ERP systems designed to automate your specific business operations and data reporting.",
    intro: "Replace spreadsheets and manual processes with a custom ERP system built around your exact workflow. Automate invoicing, inventory, orders, and reporting.",
    problem: "Generic ERP software forces your business to adapt to rigid workflows. You end up paying for features you don't need while lacking the ones you do. Manual data entry wastes hours every week.",
    solution: "We develop custom ERP systems tailored to your exact business processes. From inventory management and invoicing to employee tracking and financial reporting — everything is built around how your team actually works.",
    comparison: {
      template: ["One-size-fits-all workflows", "Per-user monthly licensing", "Generic dashboards you don't use", "Forced process adaptation"],
      custom: ["Workflows built for your business", "One-time development cost", "Custom dashboards with your KPIs", "System adapts to your process"]
    },
    tech: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "REST APIs"],
    faqs: [
      { q: "How long does ERP development take?", a: "A core ERP module (inventory + invoicing + reporting) typically takes 6-10 weeks. We deploy in phases so you start using features immediately." },
      { q: "Can it integrate with my existing tools?", a: "Yes. We build APIs that connect your ERP with your website, WhatsApp, payment gateways, and accounting software." }
    ]
  },
  "whatsapp-automation": {
    name: "WhatsApp Automation",
    tagline: "Automated customer messaging flows, order confirmations, and instant lead routing.",
    intro: "WhatsApp is where your customers are. We build automation systems that respond instantly, qualify leads, send updates, and close sales — all without manual effort.",
    problem: "Most businesses manually reply to WhatsApp messages, leading to delayed responses, missed leads, and inconsistent customer experience. Scaling requires hiring more people.",
    solution: "We set up WhatsApp Business API integrations with automated greeting flows, lead qualification chatbots, order confirmations, delivery updates, and broadcast campaigns. Every message is tracked and logged.",
    comparison: {
      template: ["Manual message replies", "Delayed response times", "No message tracking", "Personal WhatsApp for business"],
      custom: ["Instant automated responses", "24/7 lead qualification", "Full message analytics", "Official WhatsApp Business API"]
    },
    tech: ["WhatsApp Business API", "Node.js", "Webhooks", "CRM Integration", "Chatbot Framework"],
    faqs: [
      { q: "Is this the official WhatsApp Business API?", a: "Yes. We set up the official Cloud API through Meta, ensuring compliance with WhatsApp's policies and providing reliable message delivery." },
      { q: "Can the bot handle complex queries?", a: "For standard queries (pricing, availability, booking), yes. For complex issues, the bot seamlessly hands off to a human agent with full context." }
    ]
  },
  "ai-solutions": {
    name: "AI Solutions",
    tagline: "Intelligent process automation, AI chatbots, and custom automation flows to reduce overhead.",
    intro: "Leverage artificial intelligence to automate repetitive tasks, analyze data faster, and provide instant customer support — reducing operational costs.",
    problem: "Manual data processing, customer support, and content creation consume thousands of hours annually. Hiring for these roles is expensive and doesn't scale with demand fluctuations.",
    solution: "We build custom AI solutions — from intelligent chatbots and document processors to data analysis pipelines and content generators. Each solution is trained on your specific business data for maximum accuracy.",
    comparison: {
      template: ["Generic chatbot with fixed responses", "Manual data entry & processing", "Expensive per-seat AI tools", "No custom training"],
      custom: ["AI trained on your business data", "Automated document processing", "One-time development cost", "Custom models for your use case"]
    },
    tech: ["Python", "OpenAI API", "LangChain", "FastAPI", "Vector Databases"],
    faqs: [
      { q: "Do I need my own AI training data?", a: "We can work with your existing documents, FAQs, and processes. The AI learns from your specific business context for accurate, relevant responses." },
      { q: "How accurate is the AI?", a: "For structured business queries (pricing, policies, inventory), accuracy exceeds 95%. We set up human-in-the-loop workflows for edge cases." }
    ]
  },
  "logo-branding": {
    name: "Logo & Branding",
    tagline: "Distinctive, high-impact brand identities that make your business stand out from competitors.",
    intro: "Your brand is your first impression. We create distinctive visual identities that communicate professionalism, build trust, and make your business memorable.",
    problem: "Generic logos from template sites look identical to thousands of other businesses. Without consistent branding across your website, ads, and social media, you appear unprofessional and forgettable.",
    solution: "We develop complete brand identities — from logo design and color systems to typography guidelines and brand voice documentation. Every touchpoint of your business communicates a cohesive, premium brand.",
    comparison: {
      template: ["Generic template logos", "Inconsistent brand colors", "No brand guidelines document", "Looks like every competitor"],
      custom: ["Unique, research-driven logo", "Cohesive color & type system", "Complete brand guideline PDF", "Memorable, premium brand identity"]
    },
    tech: ["Figma", "Illustrator", "Brand Strategy", "Style Guides", "Design Systems"],
    faqs: [
      { q: "How many logo concepts do you provide?", a: "We present 3-4 distinct concepts based on your brand research. We then refine your chosen direction through 2-3 revision rounds." },
      { q: "Do I get ownership of the logo?", a: "Yes. You receive full ownership of all brand assets in scalable vector formats (SVG, AI, PDF) along with web-optimized versions." }
    ]
  },
  "rebranding": {
    name: "Complete Rebranding",
    tagline: "Comprehensive visual and strategic brand refresh from strategy to full deployment.",
    intro: "When your brand no longer reflects your business quality, it's time for a complete rebrand. We transform outdated identities into modern, cohesive brand experiences.",
    problem: "Your business has evolved but your brand hasn't kept up. An outdated logo, inconsistent colors, and mismatched messaging make you look smaller and less professional than you actually are.",
    solution: "We handle complete rebranding projects — from brand strategy and new visual identity to website redesign, social media updates, and printed collateral. Every customer touchpoint is transformed.",
    comparison: {
      template: ["Just a new logo", "No strategic foundation", "Inconsistent rollout", "DIY implementation"],
      custom: ["Full brand strategy + identity", "Research-driven decisions", "Consistent cross-platform rollout", "Professional implementation everywhere"]
    },
    tech: ["Brand Strategy", "Figma", "Next.js", "Design Systems", "Asset Libraries"],
    faqs: [
      { q: "How long does a full rebrand take?", a: "A complete rebrand (strategy + identity + website + collateral) typically takes 8-12 weeks depending on scope." },
      { q: "Will rebranding affect my SEO?", a: "We handle URL redirects, brand mention updates, and structured data migration to ensure your search rankings are preserved during the transition." }
    ]
  },
  "seo": {
    name: "SEO & AI Optimization",
    tagline: "Dominate Google search results and get cited by AI engines like ChatGPT, Gemini, and Perplexity.",
    intro: "SEO isn't just about Google anymore. We optimize your digital presence for traditional search engines AND AI-powered answer engines that are reshaping how customers find businesses.",
    problem: "Traditional SEO focuses only on Google rankings. But customers increasingly use AI assistants like ChatGPT and Perplexity to find businesses. If your brand isn't cited in AI responses, you're invisible to a growing audience.",
    solution: "We implement both traditional SEO (technical, on-page, schema markup) and Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) to ensure your business appears in both Google results and AI-generated answers.",
    comparison: {
      template: ["Basic keyword stuffing", "No schema markup", "Ignores AI search engines", "Monthly ranking reports only"],
      custom: ["Technical SEO + AEO/GEO strategy", "Full structured data implementation", "Optimized for ChatGPT, Gemini, Perplexity", "Weekly performance tracking + optimization"]
    },
    tech: ["Google Search Console", "Schema Markup", "AEO/GEO Strategy", "Analytics", "Content Optimization"],
    faqs: [
      { q: "What is AEO and GEO?", a: "AEO (Answer Engine Optimization) optimizes your content for AI assistants that provide direct answers. GEO (Generative Engine Optimization) ensures AI systems cite your brand in generated responses." },
      { q: "How long until I see SEO results?", a: "Technical SEO improvements show impact within 2-4 weeks. Content and authority building typically shows significant results within 3-6 months." }
    ]
  }
};
