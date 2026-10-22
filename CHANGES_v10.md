# Reverbex website — v10

22 October 2026. Second pass on Next.js 15. The v9 design, blue/cream palette, smooth scrolling, particles, parallax, existing project content and monthly prices are preserved. No commit or push performed.

## Changes by file

| File | Change |
| --- | --- |
| `lib/site.ts` | Reuses the existing `+91 99299 86743` number, exposes the optional `NEXT_PUBLIC_WHATSAPP_NUMBER` override, keeps one URL-encoding WhatsApp helper, and separates audit/project/call messages. Adds factual small-business and timeline FAQ answers; clarifies MCP permissions. |
| `lib/seo.ts` | Shared typed page metadata: canonical URLs on `https://www.reverbex.in`, page-specific Open Graph/Twitter titles, descriptions, URLs and the shared 1200×630 OG image. |
| `.env.example` | Documents the existing public WhatsApp number and optional server-only enquiry webhook. Contains no credentials. |
| `app/layout.tsx` | Preserves preloaded Sora/Inter via `next/font`, shared chrome and motion. Uses optional font display to prevent late font swaps rewrapping the hero. Adds the Organization/ProfessionalService + WebSite graph, existing LinkedIn only, business contact/location, and three Offer/UnitPriceSpecification entries at INR 15,000 / 30,000 / 70,000 with monthly billing duration. Retains the requested title template. |
| `app/page.tsx` | Explicit homepage metadata, Service schema for all six displayed offerings, and a dimensioned `next/image` reduced-motion logo. Removes FAQ schema that previously had no matching visible FAQ. |
| `app/services/page.tsx` | Uses page-specific SEO/social metadata; preserves all four detailed service panels, matching Service schema and contextual WhatsApp enquiries. |
| `app/pricing/page.tsx` | Uses page-specific SEO/social metadata and adds the plans section's accessible h2 so h3 plan headings follow the correct hierarchy. Existing plan comparison and INR fees retained. |
| `app/work/page.tsx` | Uses concise, page-specific SEO/social metadata; preserves existing case studies and results. |
| `app/work/[slug]/page.tsx` | Adds case-specific social previews/canonicals and uses `notFound()` for missing metadata/content. Allows unknown slugs to reach the custom 404 without Next 15's `NoFallbackError`; known case studies remain statically generated. |
| `app/about/page.tsx` | Uses concise page-specific SEO/social metadata; retains founder content and Person schema. |
| `app/contact/page.tsx` | Uses concise page-specific SEO/social metadata; retains the detailed audit form, actual phone/email and contextual enquiry/call links. |
| `app/privacy/page.tsx` | Adds complete social metadata and aligns enquiry handling copy with the removal of application logs containing enquiry contents. |
| `app/terms/page.tsx` | Adds complete social metadata; preserves existing website/project terms. |
| `app/not-found.tsx` | Adds a branded, noindex 404 with one h1, useful navigation and a contextual WhatsApp enquiry. |
| `app/robots.ts` | Uses the canonical site constant, allows public pages and named AI/search crawlers, excludes API/admin paths, and advertises the sitemap. Rendering assets remain crawlable. |
| `components/Header.tsx` | Free audit CTA now opens the shared WhatsApp URL in a new tab with `noopener`; logo uses `next/image`. Existing navigation/menu behavior retained. |
| `components/MobileBar.tsx` | Enhances the existing mobile floating rail with a WhatsApp icon and correct audit link; adds a compact blue/cream floating WhatsApp icon button on desktop, keeping it clear of pricing-card text. Keeps safe-area placement and avoids duplicate visible mobile/desktop controls. |
| `components/ui.tsx` | Direct WhatsApp audit/plan/call/project CTAs, distinct plan messages and stable plan anchors. Visible FAQ and its FAQPage schema share the same data on every page that renders them. Audit form opens a new tab, limits field lengths, explains the handoff and offers a direct WhatsApp fallback. |
| `components/home/Sections.tsx` | Adds the visible question-style FAQ matching its schema. Uses `next/image` for technology marks; retains videos, parallax and the v9 final CTA. |
| `components/PageHead.tsx` | Semantic breadcrumb navigation and BreadcrumbList schema; case pages include the intermediate Work breadcrumb. |
| `components/JsonLd.tsx` | Escapes `<` before inserting JSON-LD in a script element. |
| `components/LoopVideo.tsx` | Attaches video sources only when the video enters the viewport. Preserves posters, source cleanup, offscreen pause, mobile/save-data/reduced-motion behavior and reserved media frames. |
| `app/api/audit/route.ts` | Preserves the no-JavaScript POST→303 WhatsApp handoff. Bounds input lengths, validates required fields, routes incomplete/malformed submissions to a contextual WhatsApp fallback, removes enquiry-content logs and bounds optional webhook forwarding to 2.5 seconds. |
| `public/llms.txt` | Factual company, service, INR monthly pricing, scope/timeline, location and contact summary, with canonical page links. Does not add client statistics. |
| `public/og-default.png` | Replaces the old purple-tinted background with approved midnight/navy/blue and cream/white typography and the existing brand mark. |
| `scripts/generate-og.mjs` | Reproducible 1200×630 OG image generator using the installed Sharp package. |
| `scripts/v10-seo.mjs` | Production regression checks for every sitemap page, metadata, one h1, structured data, FAQ parity, 404s, public assets and valid/incomplete/malformed form handoffs. |
| `scripts/v10-browser.mjs` | Browser audit at 360/390/768/1440px: scroll-position text intersections, overflow, header collisions, headings, images, internal links/anchors, WhatsApp URLs, menu/Escape, reduced motion, FAQ and new-tab form behavior. Saves screenshots and JSON evidence. Uses installed Playwright tooling without adding application dependencies. |
| `DEBUG.md` | Records the font-swap layout-shift reproduction, source evidence, controlled experiment and fix. |

`app/sitemap.ts` already enumerates all 13 public pages, including five case studies and both legal pages, with a stable revision date. It was verified and retained. Shared footer, global palette/style tokens and GSAP/Lenis motion remain in place. No displayed lorem/coming-soon copy or missing internal destinations were found.

## Verification

- `npm run build`: passed, including type checking and static generation; no warnings.
- `node scripts/v10-seo.mjs`: passed for all 13 public pages, two custom 404 paths, metadata/schema, public assets, and valid/incomplete/malformed form redirects.
- All four existing linked client websites and the existing LinkedIn URL returned HTTP 200, following redirects.
- Production browser audit: all 52 combinations (13 public pages × 360/390/768/1440px) passed the scroll-position text-intersection, horizontal-overflow, header-collision, heading-order and image checks. No browser console errors or warnings were observed.
- All 30 unique internal links/anchors and 19 image/poster URLs resolved successfully.
- Mobile menu/Escape, FAQ expansion, reduced motion, deferred offscreen video sources and the form's new-tab/no-opener behavior passed. The real form POST and its encoded WhatsApp redirect were inspected without launching the external WhatsApp app or sending a message.
- Homepage font-swap shifts were reproduced, traced and fixed. The final 52 lab checks recorded a maximum layout-shift sum of 0; this is local browser evidence, not field Core Web Vitals data.
- After reducing the desktop floating control to an icon button, four focused pricing/contact checks at 768/1440px passed again, alongside the final build and full SEO/link/form checks.
- Evidence: `shots/v10/audit.json`, `shots/v10/floating/audit.json`, screenshots in `shots/v10/`, and the font diagnosis in `DEBUG.md`.

To repeat checks, start the production build on port 3123, then run the scripts above. `SITE_TEST_URL` changes the target origin. For browser checks, `PLAYWRIGHT_MODULE` and `PLAYWRIGHT_CHROMIUM_EXECUTABLE` select installed browser tooling; this machine used its installed headless Chromium 1228 executable. `P` and `W` narrow routes and widths, and `OUT` selects an evidence directory. `VERIFY_ONLY=1` retains an existing viewport report and repeats link/asset/interaction verification. Evidence is saved under `shots/v10/` by default.

## Remaining owner TODOs

- The WhatsApp number was found in the existing source and reused; no number was invented. Update `NEXT_PUBLIC_WHATSAPP_NUMBER` only if the business number changes, then rebuild.
- The existing TODO to confirm the `hello@reverbex.in` mailbox remains; sending/receiving email was not tested.
- An optional Calendly/Cal.com link can replace the existing WhatsApp call-request fallback when supplied.
- Existing case-study evidence TODOs remain in `lib/site.ts`: measurement periods/baselines, client quotes, screenshots and Aarya's public storefront URL. Existing figures were preserved; no new outcome claims were added.
- Configure `AUDIT_WEBHOOK_URL` only if CRM/n8n forwarding is wanted. The WhatsApp handoff works without it; no live CRM delivery was claimed or tested.
