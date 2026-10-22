import { createRequire } from 'node:module';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// Reuse the installed browser tooling; the application gains no dependencies.
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require(process.env.PLAYWRIGHT_MODULE || 'playwright'); }
catch { playwright = require(path.join(os.homedir(), 'AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules/playwright')); }
const origin = process.env.SITE_TEST_URL || 'http://localhost:3123';
const out = process.env.OUT || 'shots/v10';
fs.mkdirSync(out, { recursive: true });
const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
const routes = process.env.P ? process.env.P.split(',') : [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const widths = process.env.VERIFY_ONLY ? [] : (process.env.W || '360,390,768,1440').split(',').map(Number);
const browser = await playwright.chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const report = process.env.VERIFY_ONLY ? JSON.parse(fs.readFileSync(`${out}/audit-progress.json`, 'utf8')) : [];
const links = new Set(), assets = new Set(), errors = [];

function scan() {
  const visible = (el) => {
    for (let e = el; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) < .15) return false;
    }
    return true;
  };
  const boxes = [], hits = [];
  const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
  for (let node; (node = walker.nextNode());) {
    const el = node.parentElement;
    if (!node.textContent.trim() || !el.checkVisibility() || !visible(el) || el.closest('script,style,[aria-hidden="true"],.sr-only')) continue;
    const owner = el.closest('p,h1,h2,h3,h4,li,a,button,label,summary,text,th,td') || el;
    const range = document.createRange(); range.selectNodeContents(node);
    for (const r of range.getClientRects()) {
      if (r.width < 2 || r.height < 2 || r.bottom < 0 || r.top > innerHeight) continue;
      boxes.push({ owner, text: node.textContent.trim().slice(0, 55), l: r.left, r: r.right, t: r.top + r.height * .15, b: r.bottom - r.height * .15 });
    }
  }
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
    const a = boxes[i], b = boxes[j];
    if (a.owner === b.owner || a.owner.contains(b.owner) || b.owner.contains(a.owner)) continue;
    if (Math.min(a.r, b.r) - Math.max(a.l, b.l) > 2 && Math.min(a.b, b.b) - Math.max(a.t, b.t) > 2) hits.push(`${a.text} / ${b.text}`);
  }
  const header = ['header a[aria-label]', 'header nav[aria-label="Primary"]', 'header div > a[target="_blank"]'].map((s) => document.querySelector(s)).filter((el) => el && visible(el)).map((el) => el.getBoundingClientRect());
  const headerOverlap = header.some((a, i) => header.slice(i + 1).some((b) => Math.min(a.right, b.right) > Math.max(a.left, b.left) && Math.min(a.bottom, b.bottom) > Math.max(a.top, b.top)));
  return { hits: [...new Set(hits)], overflow: document.documentElement.scrollWidth > innerWidth + 1, headerOverlap };
}

for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 900 }, isMobile: width < 768, hasTouch: width < 1024 });
  await context.addInitScript(() => {
    window.__cls = 0;
    window.__shifts = [];
    new PerformanceObserver((list) => { for (const e of list.getEntries()) if (!e.hadRecentInput) { window.__cls += e.value; window.__shifts.push({ value: e.value, time: e.startTime, sources: (e.sources || []).map((s) => ({ tag: s.node?.tagName, text: s.node?.textContent?.slice(0, 100), previous: s.previousRect.toJSON(), current: s.currentRect.toJSON() })) }); } }).observe({ type: 'layout-shift', buffered: true });
  });
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (['error', 'warning'].includes(message.type())) errors.push(message.text()); });
  page.on('response', (response) => { if (response.url().startsWith(origin) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  for (const route of routes) {
    await page.goto(origin + route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1600);
    if (route === '/' && await page.locator('[data-scene="services"] video source').count()) errors.push('Offscreen service videos loaded before scrolling');
    const result = { route, width, hits: [], overflow: false, headerOverlap: false };
    const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    for (let y = 0; y <= max + 500; y += 500) {
      await page.evaluate((y) => window.scrollTo(0, y), Math.min(y, max));
      await page.waitForTimeout(width >= 1024 ? 850 : 250);
      const current = await page.evaluate(scan);
      result.hits.push(...current.hits.map((hit) => `y=${y}: ${hit}`));
      result.overflow ||= current.overflow; result.headerOverlap ||= current.headerOverlap;
    }
    const state = await page.evaluate(() => ({
      cls: window.__cls, shifts: window.__shifts,
      links: [...document.querySelectorAll('a[href]')].map((a) => ({ href: a.getAttribute('href'), target: a.target, rel: a.rel, text: a.textContent.trim() })),
      assets: [...document.images].map((i) => i.currentSrc || i.src).concat([...document.querySelectorAll('video')].map((v) => v.poster)),
      imageIssues: [...document.images].filter((i) => !i.hasAttribute('alt') || (i.complete && i.naturalWidth === 0)).map((i) => i.src),
      headings: [...document.querySelectorAll('main h1,main h2,main h3,main h4')].map((h) => Number(h.tagName[1])),
    }));
    result.cls = state.cls; result.shifts = state.shifts; result.imageIssues = state.imageIssues;
    result.headingOrder = state.headings.every((level, i) => i === 0 ? level === 1 : level <= state.headings[i - 1] + 1);
    for (const link of state.links) {
      if (link.href?.startsWith('/') || link.href?.startsWith('#')) links.add(link.href.startsWith('#') ? route + link.href : link.href);
      if (link.href?.startsWith('https://wa.me/')) {
        const url = new URL(link.href);
        if (url.pathname !== '/919929986743' || !url.searchParams.get('text') || link.target !== '_blank' || !link.rel.includes('noopener')) errors.push(`Bad WhatsApp CTA ${route}: ${link.text}`);
      }
    }
    state.assets.filter(Boolean).forEach((asset) => assets.add(asset));
    if (route === '/' || route === '/services' || route === '/contact' || route === '/pricing') {
      await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(1200);
      await page.screenshot({ path: `${out}/${route === '/' ? 'home' : route.slice(1)}-${width}.png`, fullPage: true });
    }
    report.push(result);
    fs.writeFileSync(`${out}/audit-progress.json`, JSON.stringify(report, null, 2));
    console.log(route, width, `overlap=${result.hits.length}`, `overflow=${result.overflow}`, `header=${result.headerOverlap}`, `CLS=${result.cls.toFixed(4)}`);
  }
  if (width < 768) {
    await page.goto(`${origin}/contact`);
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    if (!await page.locator('#mnav').isVisible()) errors.push('Mobile menu did not open');
    await page.keyboard.press('Escape');
    if (await page.locator('#mnav').count()) errors.push('Escape did not close mobile menu');
  }
  await context.close();
}

// Every unique internal navigation/anchor and loaded image/poster must resolve.
const context = await browser.newContext();
const page = await context.newPage();
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => { if (['error', 'warning'].includes(message.type())) errors.push(message.text()); });
if (process.env.VERIFY_ONLY) for (const route of routes) {
  await page.goto(origin + route, { waitUntil: 'networkidle' });
  const state = await page.evaluate(() => ({ links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')), assets: [...document.images].map((i) => i.currentSrc || i.src).concat([...document.querySelectorAll('video')].map((v) => v.poster)) }));
  state.links.filter((href) => href.startsWith('/') || href.startsWith('#')).forEach((href) => links.add(href.startsWith('#') ? route + href : href));
  state.assets.filter(Boolean).forEach((asset) => assets.add(asset));
}
for (const href of links) {
  const url = new URL(href, origin);
  const response = await page.goto(`${url.origin}${url.pathname}${url.search}`);
  if (response?.status() !== 200) errors.push(`Broken link ${href}: ${response?.status()}`);
  if (url.hash && !await page.evaluate((id) => !!document.getElementById(id), decodeURIComponent(url.hash.slice(1)))) errors.push(`Missing anchor ${href}`);
}
for (const url of assets) {
  const response = await context.request.get(url);
  if (response.status() !== 200) errors.push(`Broken asset ${url}: ${response.status()}`);
}
// Inspect the real POST response, replacing only the external navigation.
// Playwright URL routes do not intercept the subsequent URL in a redirect chain.
let auditDestination;
await context.route('**/api/audit', async (route) => {
  const response = await route.fetch({ maxRedirects: 0 });
  if (response.status() !== 303) errors.push('Form did not return a 303 redirect');
  auditDestination = new URL(response.headers().location);
  await route.fulfill({ status: 200, contentType: 'text/html', body: '<p>WhatsApp destination verified</p>' });
});
await page.goto(`${origin}/contact`);
await page.locator('[name="name"]').fill('QA test');
await page.locator('[name="phone"]').fill('+919999999999');
await page.locator('[name="business"]').fill('A & B / QA');
const popupPromise = context.waitForEvent('page');
await page.locator('#audit-form button').click();
const popup = await popupPromise;
await popup.getByText('WhatsApp destination verified').waitFor();
if (auditDestination?.origin !== 'https://wa.me' || !auditDestination.searchParams.get('text').includes('A & B / QA')) errors.push('Form lost enquiry context');
if (!await popup.evaluate(() => window.opener === null)) errors.push('Form popup retains opener');
await context.close();
const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
const reducedPage = await reduced.newPage();
await reducedPage.goto(origin, { waitUntil: 'networkidle' });
if (await reducedPage.locator('video source').count()) errors.push('Reduced motion loaded videos');
if (!await reducedPage.locator('h1').isVisible()) errors.push('Reduced motion hid the heading');
await reducedPage.locator('summary').first().click();
if (!await reducedPage.locator('details').first().evaluate((el) => el.open)) errors.push('FAQ did not expand');
await reducedPage.screenshot({ path: `${out}/faq-reduced-motion-390.png`, fullPage: true });
await reduced.close();
await browser.close();
const failed = report.filter((r) => r.hits.length || r.overflow || r.headerOverlap || r.imageIssues.length || !r.headingOrder || r.cls > .1);
fs.writeFileSync(`${out}/audit.json`, JSON.stringify({ report, errors: [...new Set(errors)], internalLinks: links.size, assets: assets.size }, null, 2));
console.log(`Audited ${report.length} page/viewport combinations, ${links.size} internal links and ${assets.size} assets.`);
if (failed.length || errors.length) { console.error(JSON.stringify({ failed, errors: [...new Set(errors)] }, null, 2)); process.exitCode = 1; }
