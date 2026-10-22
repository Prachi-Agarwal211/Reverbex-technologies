import assert from 'node:assert/strict';

// Verify the production server without adding a test dependency.
const origin = process.env.SITE_TEST_URL || 'http://localhost:3123';
const site = 'https://www.reverbex.in';
const failures = [];
function check(name, fn) {
  try { fn(); } catch (error) { failures.push(`${name}: ${error.message}`); }
}
const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
assert.equal(routes.length, 13, 'All thirteen public pages belong in the sitemap');
for (const path of routes) {
  const response = await fetch(origin + path);
  const html = await response.text();
  const meta = (key) => html.match(new RegExp(`<meta (?:name|property)="${key}" content="([^"]*)"`))?.[1];
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].flatMap((m) => {
    const data = JSON.parse(m[1]); return data['@graph'] || [data];
  });
  check(path, () => {
    assert.equal(response.status, 200);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, 'Exactly one h1');
    assert.ok(html.includes(`rel="canonical" href="${site}${path === '/' ? '' : path}`));
    assert.equal(meta('og:url')?.replace(/\/$/, ''), `${site}${path === '/' ? '' : path}`, 'Page-specific OG URL');
    for (const field of ['description', 'og:title', 'og:description', 'og:image', 'twitter:title', 'twitter:description', 'twitter:image']) assert.ok(meta(field), field);
    assert.ok(!/lorem ipsum|___UPDATE___|coming soon/i.test(html), 'No placeholder copy');
    assert.ok(schemas.some((s) => s['@type'] === 'WebSite'), 'WebSite schema');
    const org = schemas.find((s) => [s['@type']].flat().includes('ProfessionalService'));
    assert.equal(org.email, 'hello@reverbex.in');
    assert.deepEqual(org.makesOffer.map((o) => o.priceSpecification.price), [15000, 30000, 70000]);
    for (const offer of org.makesOffer) {
      assert.equal(offer.priceSpecification.priceCurrency, 'INR');
      assert.equal(offer.priceSpecification.billingDuration, 'P1M');
    }
    if (path !== '/') assert.ok(schemas.some((s) => s['@type'] === 'BreadcrumbList'));
    if (path === '/' || path === '/pricing') {
      const faq = schemas.find((s) => s['@type'] === 'FAQPage');
      assert.ok(faq, 'FAQ schema');
      assert.equal(faq.mainEntity.length, (html.match(/<details[\s>]/g) || []).length, 'FAQ schema matches visible answers');
    }
    if (path === '/services') assert.ok(schemas.filter((s) => s['@type'] === 'Service').length >= 4);
  });
}
for (const path of ['/not-a-real-page', '/work/not-a-real-project']) {
  const response = await fetch(origin + path);
  const html = await response.text();
  check(path, () => { assert.equal(response.status, 404); assert.ok(html.includes('Find your next step')); });
}
for (const path of ['/robots.txt', '/llms.txt', '/og-default.png', '/logo.png']) {
  const response = await fetch(origin + path);
  check(path, () => assert.equal(response.status, 200));
}
const valid = await fetch(`${origin}/api/audit`, { method: 'POST', redirect: 'manual', body: new URLSearchParams({ name: 'QA test', phone: '+919999999999', business: 'A & B', pain: 'CRM / orders?' }) });
check('Audit form redirect', () => {
  assert.equal(valid.status, 303);
  const url = new URL(valid.headers.get('location'));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/919929986743');
  assert.ok(url.searchParams.get('text').includes('A & B'));
});
for (const body of [new URLSearchParams(), 'not-form-data']) {
  const response = await fetch(`${origin}/api/audit`, { method: 'POST', redirect: 'manual', body });
  check('Incomplete/malformed form fallback', () => {
    assert.equal(response.status, 303);
    const url = new URL(response.headers.get('location'));
    assert.equal(url.origin, 'https://wa.me');
    assert.ok(url.searchParams.get('text').includes('help completing'));
  });
}
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`PASS: ${routes.length} pages, metadata/schema, custom 404s, public assets and form redirect.`);
