# Reverbex website — v9

22 October 2026. Blue/cream theme retained; smooth scrolling, particles, parallax and static result numbers preserved.

| File | Change |
| --- | --- |
| `components/home/Sections.tsx` | Reframed the final CTA with a fully visible centered logo, compact spacing and blue/cream glow; removed the ghost logo and muddy background layers. Aligned MCP diagram colours. |
| `app/globals.css` | Clean CTA gradients, responsive logo sizing, consistent dark surfaces, readable muted copy, focus outlines and reduced-motion handling. Confined card borders to their own frames. |
| `tailwind.config.ts` | Replaced legacy surface/colour tokens with the approved palette. |
| `components/Motion.tsx` | Bounded CTA logo reveal; gradient headings wrap word by word; content remains visible if motion imports fail. |
| `components/Chrome.tsx` | Company footer with vector logo/name, tagline, Jaipur, email, existing WhatsApp number, services/company/legal columns, existing LinkedIn and 2026 copyright. |
| `components/Header.tsx` | Direct Services link, active navigation, route-change reset and Escape-to-close mobile menu. Audit link targets the form. |
| `components/MobileBar.tsx` | Safe-area spacing, approved background and direct audit-form link. |
| `components/PageHead.tsx` | Shared blue-gradient page header, breadcrumbs, responsive title/copy columns and section reveals. |
| `components/ui.tsx` | Audit buttons reach the contact form; removed purple pricing-button colour; improved input sizing/contrast and added privacy link. |
| `components/LoopVideo.tsx` | Uses supplied MP4s instead of requesting missing WebMs; cleans up video sources. |
| `components/CaseStack.tsx` | Responsive blue/cream case cards, readable metrics, correctly framed borders and reveals. |
| `components/CaseVisual.tsx` | Approved midnight-blue chart background. |
| `app/services/page.tsx` | Responsive service panels, spacing, anchor targets and restrained reveals. |
| `app/work/page.tsx` | Consistent case-list spacing and presentation. |
| `app/work/[slug]/page.tsx` | Responsive case details, static result panels and clearer navigation. |
| `app/pricing/page.tsx` | Comparison table fits mobile without horizontal scrolling; accessible inclusion markers and clearer scope copy. Existing prices retained. |
| `app/about/page.tsx` | Replaced public founder-photo TODO with a branded profile; refined timeline and responsive layout. |
| `app/contact/page.tsx` | Responsive contact/form panels and accurate explanation of the WhatsApp enquiry flow. |
| `components/LegalPage.tsx` | Shared responsive legal-page layout. |
| `app/privacy/page.tsx` | Added privacy policy matching the existing enquiry handler. |
| `app/terms/page.tsx` | Added simple website and project-enquiry terms. |
| `app/sitemap.ts` | Added legal pages and updated revision date. |

## Verification

- `npm run build` passed, including TypeScript validation and static generation.
- All 13 public page routes returned HTTP 200, including all five case studies.
- Production scroll checks at 390px and 1440px found no text overlap or horizontal overflow; tablet header checks passed at 768px and 1024px.
- All 31 unique internal links/anchors resolved; all 18 checked image/poster assets returned 200.
- Checked mobile menu/Escape, audit-form navigation, expanded FAQ, reduced motion and a touch-enabled 390px viewport. No production browser console errors observed.
- Visual evidence saved in `shots/v9/`. No commit or push performed.
