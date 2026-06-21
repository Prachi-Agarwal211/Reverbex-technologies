# Website Content Map — Reverbex Technologies

Full inventory of every page, section, component, and piece of content currently in the codebase.

---

## Site-Wide Elements

### Navbar (`components/Navbar.tsx`)
- Fixed top navbar
- Logo image (`/logo for menu.png`)
- Desktop nav items: Home, Services, Work, Industries, About, Contact
- Mobile: bottom bar navigation

### MorphingMenu (`components/MorphingMenu.tsx`)
- Full-screen morphing SVG overlay menu
- Desktop: left column (logo + contact info + socials), right column (nav links)
- Mobile: logo top, nav links center, contact info bottom
- GSAP morph animation (SVG path morphing)
- SplitType character-by-character link reveal
- Gold (#EAB308) accent, dark (#050505) background

### WhatsAppButton (`components/shared/WhatsAppButton.tsx`)
- Floating WhatsApp button on all pages
- Links to wa.me/919929986743

### SmoothScroll (`components/SmoothScroll.tsx`)
- Lenis smooth scroll (desktop only)
- GSAP ScrollTrigger integration

### CustomCursor (`components/CustomCursor.tsx`)
- Custom cursor dot + outline (desktop only)
- Hidden on touch devices

### Grain Overlay (in `app/layout.tsx`)
- Fixed full-screen grain texture at 2% opacity
- CSS animation for film grain effect

---

## Homepage (`/`) — `app/page.tsx`

15 sections, in order:

### 1. HeroVideo (`components/HeroVideo.tsx`)
- Full viewport video background (separate mobile/desktop mp4)
- **Heading:** "We Turn Your Business Into A Brand." (gold accent on "Business Into A Brand")
- **Subtitle:** "Websites, ads, AI, and automation — everything your business needs to grow."
- **CTAs:** "Start Your Project" (gold) + "See Our Work" (ghost)
- **Marquee:** scrolling text strip — WEBSITES, E-COMMERCE, META ADS, GOOGLE ADS, LEAD GENERATION, ERP SYSTEMS, MOBILE APPS, AI SOLUTIONS, WHATSAPP AUTOMATION, SEO
- GSAP entrance animation (staggered lines + subtext + CTAs)

### 2. TrustedBy (`components/TrustedBy.tsx`)
- **Label:** "Partnerships"
- **Heading:** "Trusted By Growing Brands"
- 4 partner cards (name + role):
  - MAAC Animation — Education Partner
  - Aarya Clothing — E-Commerce Brand
  - Khemji Wire — Industrial Manufacturer
  - Shipbridge — Logistics Partner
- GSAP slit-reveal animation (vertical slit → full screen → cards cascade → doors split)
- Dark (#050505) background, gold accent

### 3. StickyServices (`components/StickyServices.tsx`)
- Scroll-pinned stacked cards (perspective 3D effect)
- 6 services with Unsplash images:
  1. Custom Websites — `/services/website-development`
  2. E-Commerce — `/services/e-commerce`
  3. Meta Ads — `/services/meta-ads`
  4. WhatsApp Automation — `/services/whatsapp-automation`
  5. AI Solutions — `/services/ai-solutions`
  6. SEO & AI Optimization — `/services/seo`
- Each card: service number, name, tagline, description, "Explore Service →" link
- GSAP ScrollTrigger scrub animation

### 4. LiveResults (`components/LiveResults.tsx`)
- **Label:** "Proof"
- **Heading:** "Real Results. Real Numbers."
- Dashboard layout:
  - Hero stat (2-col span): **500+** Leads Generated — For MAAC Animation Jaipur
  - ₹3,00,000+ Revenue Generated — For Aarya Clothing
  - ₹10,00,000+ Ad Spend Managed — Across Meta & Google Ads
  - **100%** PageSpeed Scores
  - **24/7** WhatsApp Support
  - **Complete** Digital Transformation — For Khemji Wire Company
- Counter animation (IntersectionObserver)

### 5. FeaturedArchitectures (`components/FeaturedArchitectures.tsx`)
- **Label:** "Case Studies"
- **Heading:** "Our Work."
- Horizontal scroll cards (desktop), vertical scroll (mobile)
- 3 case study previews:
  1. MAAC Animation Jaipur — Education • Web Design • Ads — 500+ leads
  2. Aarya Clothing — E-Commerce • Full Stack • Payments — ₹3L+ revenue
  3. Khemji Wire Company — Corporate • Catalogue • Rebranding — Complete transformation
- Each card: tagline, title, challenge vs result, tech stack pills
- GSAP pin + horizontal scroll animation
- Unsplash stock images

### 6. WhyReverbex (`components/WhyReverbex.tsx`)
- **Label:** "The Difference"
- **Heading:** "Why Businesses Choose Reverbex."
- Editorial 2-column layout (cards 0, 3 span full width):
  1. **FASTER WEBSITES** (full width) — 100/100 PageSpeed guaranteed
  2. **BETTER SEO** — AEO + GEO optimized
  3. **HIGHER CONVERSIONS** — Built for business results
  4. **NO TEMPLATE LIMITATIONS** (full width) — Your vision, not a theme
  5. **ZERO TRANSACTION FEES** — You keep more of your revenue
  6. **LONG-TERM PARTNER** — Ongoing support and growth

### 7. PremiumPositioning (`components/PremiumPositioning.tsx`)
- **Label:** "The Math"
- **Heading:** "Why Premium Beats Cheap."
- Two-column comparison:
  - Left (dimmed): "The Template Agency" — ₹20,000 — 58/100 PageSpeed, 3.8s load, 5 leads/mo
  - Right (highlighted): "The Reverbex Standard" — ₹2,00,000 — 100/100 PageSpeed, 0.8s load, 25 leads/mo
- Bottom line: "We don't build cheap websites. We build websites that make money."

### 8. ReverbexBond (`components/ReverbexBond.tsx`)
- **Label:** "The Reverbex Bond"
- **Heading:** "We Don't Disappear After Launch."
- Numbered vertical list:
  1. DAILY AVAILABILITY — WhatsApp response within hours
  2. PROACTIVE OPTIMIZATION — Weekly monitoring, suggestions before you ask
  3. GROWTH PARTNERSHIP — New features, pages, campaigns as you grow
  4. FAST PROBLEM SOLVING — Fixed within hours, not weeks
- Trust line: "Every project includes the Reverbex Bond: Daily availability • Proactive monitoring • Fast problem solving • Long-term partnership • No surprise charges"

### 9. Methodology (`components/Methodology.tsx`)
- **Label:** "Process"
- **Heading:** "How We Work."
- 5-step vertical timeline:
  1. Discovery — Audience, metrics, opportunities
  2. Strategy — Roadmap, content hierarchy, tech selection
  3. Build — Next.js code, custom visuals, ad sequences
  4. Launch — Edge deployment, campaign triggers, lead tracking
  5. Grow — Daily monitoring, A/B tests, ROI optimization

### 10. WhyNextJs (`components/WhyNextJs.tsx`)
- **Label:** "Technology"
- **Heading:** "Why We Build With Next.js."
- Bento grid (cards 0, 2 span full width):
  1. **FASTER LOADING** (full width) — 100/100 PageSpeed guaranteed
  2. **BETTER GOOGLE RANKINGS** — SEO advantage built-in
  3. **BETTER AI VISIBILITY** (full width) — Optimized for ChatGPT, Gemini, Perplexity
  4. **BETTER SECURITY** — Zero vulnerabilities
  5. **HIGHER CONVERSIONS** — Built for business results
  6. **LOWER LONG-TERM COST** — Save ₹50,000-1,00,000/year vs templates
- Explanation block with code snippet showing SSR concept

### 11. Industries (`components/Industries.tsx`)
- **Label:** "Sectors"
- **Heading:** "Industries We Serve."
- Staggered masonry grid (cards 0, 3 span full width):
  1. Education — `/industries/education`
  2. Manufacturing — `/industries/manufacturing`
  3. E-Commerce — `/industries/ecommerce`
  4. Logistics (full width) — `/industries/logistics`
  5. Startups — `/industries/startups`
  6. Retail — `/industries/retail`

### 12. Testimonials (`components/Testimonials.tsx`)
- **Label:** "Client Success"
- **Heading:** "What Our Clients Say."
- Hero quote (large): "Reverbex transformed our online presence. We went from zero leads to 500+ in just weeks." — Marketing Director, MAAC Animation Jaipur
- 2 supporting cards:
  - "The e-commerce platform they built generates revenue while we sleep." — Founder, Aarya Clothing
  - "Professional, fast, and they understood our business perfectly." — Operations Head, Khemji Wire Company

### 13. FAQSection (`components/FAQSection.tsx`)
- **Heading:** "Frequently Asked Questions."
- 8 FAQ items (accordion with CSS grid animation):
  1. What does Reverbex do?
  2. Why choose Reverbex over template-based agency?
  3. How much does a website cost?
  4. Can you run ads for my business?
  5. Do you provide WhatsApp automation?
  6. Do you work outside Jaipur?
  7. How long does a project take?
  8. What industries do you work with?

### 14. ContactSection (`components/ContactSection.tsx`)
- Video background (desktop), static image (mobile)
- **Heading:** "Ready to scale?" (massive text)
- **Subtitle:** "Partner with us to deploy high-performance custom websites, Meta/Google ads campaigns, and operational automations built to grow your business."
- Left column:
  - WhatsApp CTA button (gold) → wa.me/919929986743
  - Email: 15anuragsingh2003@gmail.com
  - Location: India / Remote-First
- Right column:
  - Contact form: Name, Phone, Business URL, Message, Submit button
- Footer: © 2026 Reverbex Technologies | Made in Jaipur, Built for the World | Back to Top

---

## Services Index (`/services`) — `app/services/page.tsx`

- **Heading:** "Our Services."
- **Label:** "Capabilities Catalog"
- 12-card grid linking to individual service pages:
  1. Custom Website Development
  2. E-Commerce Development
  3. Mobile App Development
  4. Meta Ads Management
  5. Google Ads Management
  6. Lead Generation
  7. ERP System Development
  8. WhatsApp Automation
  9. AI Solutions & Automation
  10. Logo Design & Branding
  11. Complete Rebranding
  12. SEO Services

## Service Detail (`/services/[slug]`) — `app/services/[slug]/page.tsx`

Each service page (via `ServiceClient`) contains:
- Breadcrumb navigation
- Service name + tagline
- Intro paragraph
- Problem statement
- Solution description
- Template vs Custom comparison table (4 items each)
- Tech stack pills
- 2 FAQs
- WhatsApp CTA

**Data source:** `lib/servicesData.ts` — 12 services with full content

---

## Work Index (`/work`) — `app/work/page.tsx`

- **Label:** "The Portfolio"
- **Heading:** "Results That Speak."
- **Subtitle:** "We don't count visitors or lines of code. We count leads generated, costs reduced, and revenue increased."
- StickyProjects component (3D peeling card scroll)
- "End of Portfolio" outro section

## Case Study Detail (`/work/[slug]`) — `app/work/[slug]/page.tsx`

Each case study (via `CaseStudyClient`) contains:
- Breadcrumb navigation
- Client name + result title
- Tags
- Problem statement
- Research/analysis
- Solution description
- Tech stack with categories
- Metrics (3 per study)
- Testimonial quote

**Data source:** `lib/caseStudiesData.ts` — 3 case studies:

1. **MAAC Animation Jaipur** — 500+ Qualified Student Leads Generated
   - Tags: Education, Lead Generation, Meta Ads, Landing Page
   - Metrics: 500+ leads, 45% CPL reduction, 14 days to launch
   - Tech: Next.js, Meta Ads, WhatsApp API, Vercel

2. **Aarya Clothing** — ₹3L+ Revenue Generated via Custom E-Commerce
   - Tags: E-Commerce, Next.js, Payment Gateway, Performance
   - Metrics: ₹3L+ revenue, 85% faster checkout, 0% platform fees
   - Tech: Next.js, Node.js, Razorpay, PostgreSQL

3. **Khemji Wire Company** — Complete Corporate Digital Transformation
   - Tags: Corporate, B2B, Rebranding, Web Design
   - Metrics: 200% B2B inquiry increase, 100 PageSpeed, 1 unified brand
   - Tech: Next.js, Tailwind CSS, Figma, GSAP

---

## Industries Index (`/industries`) — `app/industries/page.tsx`

- **Label:** "Industry Sectors"
- **Heading:** "Built for Your Vertical."
- 6-card grid linking to industry pages

## Industry Detail (`/industries/[slug]`) — `app/industries/[slug]/page.tsx`

Each industry page (via `IndustryClient`) contains:
- Breadcrumb navigation
- Industry name + tagline
- Hero image
- 3 challenges
- 3 solutions
- 2-3 metrics
- Related case study link

**Data source:** `lib/industriesData.ts` — 6 industries:

1. **Education & Coaching** — Student acquisition funnels
   - Metrics: 40% lower CPL, 3x faster response
   - Related: MAAC Animation Jaipur

2. **Manufacturing & B2B** — Enterprise digital positioning
   - Metrics: 200% B2B trust increase, zero data errors
   - Related: Khemji Wire Company

3. **E-Commerce & Retail** — High-speed storefronts
   - Metrics: 0% transaction fees, 100 mobile PageSpeed
   - Related: Aarya Clothing

4. **Logistics & Supply Chain** — AI-driven tracking
   - Metrics: 50% paperwork reduction, 24/7 client visibility

5. **Tech Startups** — Scalable web apps
   - Metrics: 100% code ownership, rapid go-to-market

6. **Local Retail** — Omnichannel strategies
   - Metrics: #1 local search, 90% WhatsApp open rates

---

## About (`/about`) — `app/about/page.tsx`

- **Heading:** "Engineering Without Compromise."
- Philosophy text (broken agency model, Reverbex as antithesis)
- Quote: "We don't use templates. We don't farm work out to junior developers. We don't hide behind account managers."
- **"The Reverbex Standard"** section — 4 bullet points:
  - Direct access to senior engineers
  - 100% custom codebase ownership
  - Zero template usage
  - Transparent, data-driven marketing
- **100% In-House Engineering** stat card
- ReverbexBond component (reused)
- CTA: "Work with the best." → Get in Touch

---

## Pricing (`/pricing`) — `app/pricing/page.tsx`

- **Heading:** "Transparent Value."
- 3 pricing tiers (all "Custom Quote"):

  1. **Foundational Infrastructure** — Web presence + SEO
     - Custom Next.js, sub-second load, technical SEO, code ownership, analytics

  2. **The Growth Engine** (highlighted) — Lead generation + automation
     - Everything in Foundational + landing pages, Meta/Google Ads, WhatsApp API, CRM routing, weekly reporting

  3. **Enterprise Engineering** — Complex systems
     - Custom ERP, B2B e-commerce, zero transaction fees, custom APIs, serverless, SLA support

- ReverbexBond component (reused)

---

## Contact (`/contact`) — `app/contact/page.tsx`

- **Heading:** "Let's build something."
- **Subtitle:** Enterprise ERP, Next.js e-commerce, or performance marketing — senior engineers ready.
- Reuses ContactSection component from homepage

---

## Legal Pages

### Privacy Policy (`/privacy-policy`)
- Standard privacy policy (information collection, usage, log files, contact)

### Terms of Service (`/terms-of-service`)
- Terms of service (acceptance, services, code ownership, user content, governing law)

---

## Global Config (`lib/config.ts`)

- **CONTACT:** email, phone, location
- **SOCIALS:** LinkedIn, Twitter
- **MOBILE_NAV_ITEMS:** Home, Services, Work, Industries, About
- **DESKTOP_NAV_ITEMS:** Home, Services, Work, Industries, About, Contact
- **COMPANY:** name "Reverbex Technologies", founded 2024

---

## Components Not Used on Homepage

| Component | Used Where |
|---|---|
| `WhatWeOffer.tsx` | Exported but NOT imported anywhere |
| `OurStory.tsx` | DELETED — was dead code |
| `StickyProjects.tsx` | `/work` page |
| `ServiceClient.tsx` | `/services/[slug]` pages |
| `CaseStudyClient.tsx` | `/work/[slug]` pages |
| `IndustryClient.tsx` | `/industries/[slug]` pages |
| `FractalGlassBackground.tsx` | Used inside FeaturedArchitectures |
| `Navbar.tsx` | All pages |
| `Preloader.tsx` | In layout (loading state) |

---

## Data Files

| File | Content |
|---|---|
| `lib/config.ts` | Contact info, nav items, company info |
| `lib/servicesData.ts` | 12 services (name, tagline, intro, problem, solution, comparison, tech, FAQs) |
| `lib/industriesData.ts` | 6 industries (name, tagline, challenges, solutions, metrics) |
| `lib/caseStudiesData.ts` | 3 case studies (client, problem, research, solution, tech, metrics, testimonial) |
| `lib/scrollToSection.ts` | Smooth scroll utility |

---

## Total Page Count

| Type | Count | Pages |
|---|---|---|
| Static pages | 8 | /, /about, /contact, /services, /work, /industries, /pricing, /privacy-policy, /terms-of-service |
| Dynamic pages | 3 | /services/[slug], /work/[slug], /industries/[slug] |
| **Total routes** | **11** | |

## Total Dynamic Content Items

| Type | Count |
|---|---|
| Services | 12 |
| Case Studies | 3 |
| Industries | 6 |
| FAQ items | 8 |
| Testimonials | 3 |
| **Total content items** | **32** |
