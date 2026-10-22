export const SITE = 'https://www.reverbex.in';
export const BRAND = 'Reverbex Technology';
export const PHONE = '+91 99299 86743';
export const PHONE_E164 = '+919929986743';
// Existing business number. Public override must contain country code + number, digits only.
export const NEXT_PUBLIC_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || PHONE_E164.replace(/\D/g, '');
// TODO(Anurag): confirm hello@reverbex.in mailbox is live (seo_plan: move off Gmail).
export const EMAIL = 'hello@reverbex.in';
export const AUDIT_MESSAGE = 'Hi Reverbex, I want a free AI audit for my business.';
export const WA = (text = 'Hi Reverbex, I would like to discuss a project for my business.') =>
  `https://wa.me/${NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
// TODO(Anurag): add Calendly/Cal.com link for "Book a call". Falls back to WhatsApp.
export const BOOK_CALL = WA('Hi Anurag, I would like to book a 20-minute call about an AI agent / automation project.');
export const LINKEDIN = 'https://www.linkedin.com/company/reverbex-tech';

export const plans = [
  { id: 'starter', name: 'Launch', price: 15000, tag: 'For one sharp system',
    items: ['Custom Next.js website or web app', 'One AI automation (n8n) or RAG chatbot', 'WhatsApp lead capture + CRM sheet sync', 'SEO + AI-visibility setup (schema, llms.txt, sitemap)', 'Monthly improvements & support'] },
  { id: 'growth', name: 'Grow', price: 30000, tag: 'Most chosen', featured: true,
    items: ['Everything in Launch', 'Android app (Flutter)', 'WhatsApp commerce + WhatsApp AI agent', 'Order / lead workflows automated end-to-end', 'Priority support'] },
  { id: 'scale', name: 'Scale', price: 70000, tag: 'For operating businesses',
    items: ['Everything in Grow', 'Android + iOS apps (Flutter)', 'Custom CRM & financial dashboards', 'AI agents + custom MCP servers on your data', 'Python backends, integrations, monitoring'] },
];

export type Case = { slug: string; client: string; sector: string; metric: string; metricLabel: string; headline: string; summary: string; built: string[]; url?: string; todo?: string };
export const cases: Case[] = [
  { slug: 'maac-animation-jaipur', client: 'MAAC Animation Jaipur', sector: 'Education / animation institute', metric: '500+', metricLabel: 'admission leads',
    headline: '500+ leads for an animation institute', summary: 'A motion-grade institute website built for admissions: course pages, lead capture and AI-readable content (llms.txt + schema) that turned the site into the main enquiry channel.',
    built: ['Next.js site with motion/WebGL-grade design', 'Lead capture wired to follow-up', 'llms.txt + structured data for AI search'], url: 'https://maacanimationjaipur.com',
    todo: 'Add time period for the 500+ leads, screenshots and a named quote from MAAC.' },
  { slug: 'aarya-clothing', client: 'Aarya Clothing', sector: 'D2C fashion e-commerce', metric: '₹4L+', metricLabel: 'revenue in month 1',
    headline: '₹4 lakh+ in the first month of a custom store', summary: 'A production D2C commerce system, not a theme store. FastAPI microservices, Razorpay/UPI payments, inventory locks and Dockerised monitoring.',
    built: ['FastAPI microservices backend', 'Razorpay / UPI payment integrity', 'Inventory concurrency locks + order cycle', 'Docker deployment with monitoring'],
    todo: 'Add store URL (if public), launch month and client quote.' },
  { slug: 'khemji-wire-company', client: 'Khemji Wire Company', sector: 'Industrial B2B manufacturing', metric: '200%', metricLabel: 'increase in B2B inquiries',
    headline: '200% more B2B inquiries for a wire manufacturer', summary: 'An industrial product-catalogue site with deep GI-wire product SEO and a live llms.txt so buyers and AI assistants find the right product.',
    built: ['Next.js product catalogue', 'Product-level SEO', 'llms.txt for AI search'], url: 'https://khemjiwire.in',
    todo: 'Confirm the 200% baseline/period and add before/after screenshots.' },
  { slug: 'psara-consultant-india', client: 'PSARA Consultant India', sector: 'Statutory licensing', metric: '~735', metricLabel: 'URLs in sitemap (programmatic SEO)',
    headline: 'Multi-state programmatic SEO at ~735 URLs', summary: 'A multi-state licensing site with programmatic state and city pages backed by a legal research corpus.',
    built: ['Programmatic state/city pages', 'Legal research corpus', 'Sitemaps at scale'], url: 'https://psaraconsultantindia.com',
    todo: 'Add lead/traffic outcome numbers.' },
  { slug: 'silbar-security', client: 'Silbar Security', sector: 'Security services, PAN-India', metric: '~531', metricLabel: 'URLs in sitemap (GeoScale pages)',
    headline: 'PAN-India GeoScale pages for a security operator', summary: 'State and city landing pages with an ISO/PSARA trust stack for a PAN-India security services company.',
    built: ['State/city GeoScale pages', 'Trust & compliance content'], url: 'https://silbarsecurity.in',
    todo: 'Add lead/traffic outcome numbers.' },
];

export const faqs = [
  { q: 'What is an MCP server and why would my business need one?', a: 'An MCP server implements the Model Context Protocol, an open standard for connecting AI applications to tools and data. A custom server can expose selected CRM records, inventory, orders or documents to an assistant. Permissions, validation and human approval for sensitive actions must be configured for each integration; the protocol alone does not make access safe.' },
  { q: 'Do you build AI agents for small businesses in India?', a: 'Yes. Reverbex Technology builds AI agents and automations for small businesses in India, from Jaipur. We start with a specific workflow such as answering product questions, qualifying enquiries or updating a CRM, and agree on scope, integrations and human hand-off before development.' },
  { q: 'What kind of AI agents do you build?', a: 'WhatsApp AI agents that answer and qualify leads, RAG chatbots trained on your documents, n8n automations that move data between apps, and operations agents connected to your systems through MCP. We built our own internal agents and MCP tools first, and use them in client delivery.' },
  { q: 'How much does it cost?', a: 'Three monthly plans: ₹15,000/month (Launch), ₹30,000/month (Grow, adds an Android app and WhatsApp commerce/AI) and ₹70,000/month (Scale, Android + iOS apps, CRM, financial dashboards and AI agents). Larger custom systems are quoted after a free audit.' },
  { q: 'Do I own the code and data?', a: 'Yes. We build custom-coded systems on open tools, Next.js, Flutter, Python, n8n, so you own what we build. No lock-in to a proprietary builder.' },
  { q: 'Do you only work with businesses in Jaipur?', a: 'We are based in Jaipur, Rajasthan, and work with businesses across India and globally over WhatsApp, calls and video.' },
  { q: 'What happens in the free AI audit?', a: 'You tell us how leads, orders and operations flow today. We point out the manual steps an AI agent or automation can remove, and send a short written plan with the plan tier that fits. No obligation.' },
  { q: 'How long does an AI agent or automation project take?', a: 'The delivery timeline depends on the workflow, integrations, data access and testing needed. We agree on milestones and a delivery schedule in the proposal after the free audit. A single workflow and a system spanning several apps require different amounts of work; there is no fixed delivery promise for every project.' },
];

export type Product = { id: string; n: string; name: string; short: string; desc: string; points: string[]; href: string; visual: 'web' | 'app' | 'agent' | 'mcp' | 'flow' | 'dash' };
export const products: Product[] = [
  { id: 'websites', n: '01', name: 'Custom-coded websites', short: 'Websites', visual: 'web', href: '/services#web-app',
    desc: 'Server-rendered Next.js sites built to rank on Google and get cited by AI search, not templates, not page builders.',
    points: ['Next.js + TypeScript, sub-2s loads', 'SEO, schema & llms.txt built in', 'Lead capture wired to WhatsApp/CRM'] },
  { id: 'mobile-apps', n: '02', name: 'Mobile apps', short: 'Apps', visual: 'app', href: '/services#web-app',
    desc: 'Flutter apps for Android and iOS from one codebase, ordering, bookings, field teams, customer portals.',
    points: ['Flutter for Android + iOS', 'Payments via Razorpay / UPI', 'Push notifications & offline-ready'] },
  { id: 'ai-agents', n: '03', name: 'AI agents', short: 'Agents', visual: 'agent', href: '/services#ai-agents',
    desc: 'WhatsApp AI agents and sales/support agents that answer, qualify, book and update your systems, 24×7.',
    points: ['WhatsApp AI agents', 'Grounded in your catalogue & policies', 'Human hand-off + audit logs'] },
  { id: 'mcp-servers', n: '04', name: 'MCP servers', short: 'MCP', visual: 'mcp', href: '/services#mcp-servers',
    desc: 'Custom Model Context Protocol servers that give AI assistants safe, typed access to your CRM, orders and documents.',
    points: ['Typed tools with permissions', 'Works with MCP-compatible assistants', 'Read vs write, per role'] },
  { id: 'ai-automation', n: '05', name: 'AI automation', short: 'Automation', visual: 'flow', href: '/services#ai-automation',
    desc: 'n8n workflows and RAG chatbots that remove copy-paste between WhatsApp, sheets, CRM, email and payments.',
    points: ['n8n workflows', 'RAG chatbots on your documents', 'Lead routing & follow-ups'] },
  { id: 'crm-dashboards', n: '06', name: 'CRM & dashboards', short: 'CRM', visual: 'dash', href: '/services#web-app',
    desc: 'Custom CRMs and financial dashboards on Python backends, one source of truth instead of Excel + WhatsApp.',
    points: ['Custom CRM for your pipeline', 'Financial & ops dashboards', 'Python / FastAPI backends'] },
];
