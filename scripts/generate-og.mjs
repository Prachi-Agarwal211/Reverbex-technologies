import sharp from 'sharp';

// Deterministic social card in the approved blue + cream palette.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><linearGradient id="bg" x2="1" y2=".4"><stop stop-color="#07080B"/><stop offset=".55" stop-color="#0A0F2C"/><stop offset="1" stop-color="#0A1A4A"/></linearGradient><radialGradient id="glow"><stop stop-color="#2F6BFF" stop-opacity=".5"/><stop offset="1" stop-color="#2F6BFF" stop-opacity="0"/></radialGradient></defs>
<path fill="url(#bg)" d="M0 0h1200v630H0z"/><ellipse cx="990" cy="250" rx="500" ry="480" fill="url(#glow)"/>
<g font-family="Segoe UI,Arial,sans-serif" fill="#F5F7FA">
<text x="72" y="102" font-size="23" font-weight="600" letter-spacing="1">REVERBEX TECHNOLOGY · JAIPUR</text>
<text x="72" y="244" font-size="66" font-weight="700" letter-spacing="-2">AI agents that do</text>
<text x="72" y="325" font-size="66" font-weight="700" letter-spacing="-2" fill="#FFF3C4">real work</text>
<text x="72" y="406" font-size="66" font-weight="700" letter-spacing="-2">for your business.</text>
<text x="72" y="526" font-size="25" fill="#7FD4FF">Custom AI agents · MCP servers · Web &amp; apps</text>
<text x="72" y="576" font-size="20" fill="#FFF6D6">www.reverbex.in</text></g></svg>`;
const logo = await sharp('public/brand/mark-white.webp').resize({ width: 260 }).tint('#FFF3C4').png().toBuffer();
await sharp(Buffer.from(svg)).composite([{ input: logo, left: 842, top: 172 }]).png().toFile('public/og-default.png');
console.log('Created public/og-default.png (1200 × 630).');
