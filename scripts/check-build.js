import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { brotliDecompressSync, gunzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { site, services, faqs } from '../src/content/site.js';

async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => entry.isDirectory()
    ? filesIn(path.join(dir, entry.name)) : [path.join(dir, entry.name)]));
  return nested.flat();
}
export async function verifyBuild(output = 'dist') {
  const files = await filesIn(output);
  const index = await readFile(path.join(output, 'index.html'), 'utf8');
  assert.match(index, /https:\/\/popovatalk\.ru\//);
  assert.match(index, /www\.google\.com\/recaptcha\/api\.js/);
  for (const asset of ['/images/popova-001.png', '/images/background-pastel.jpg', '/images/popova-video.mp4']) {
    assert.ok(files.includes(path.join(output, asset)), `Missing ${asset}`);
  }
  for (const match of index.matchAll(/(?:src|href)="(\/assets\/[^"?]+)"/g)) {
    assert.ok(files.includes(path.join(output, match[1])), `Missing ${match[1]}`);
  }
  let foundWebhook = false;
  for (const file of files.filter(file => /\.(js|html|css)$/.test(file))) {
    const contents = await readFile(file, 'utf8');
    assert.ok(!/api\.telegram\.org\/bot|VITE_TELEGRAM_BOT_TOKEN|VITE_TELEGRAM_CHAT_ID|RECAPTCHA_SECRET_KEY|\d{8,}:[A-Za-z0-9_-]{30,}/.test(contents), `Credential or direct Telegram API reference in ${file}`);
    if (contents.includes('/hooks/send-telegram')) foundWebhook = true;
  }
  assert.ok(foundWebhook, 'Contact webhook is missing from the build');

  // Check the emitted HTML, not the source template or client-only metadata.
  assert.equal((index.match(/<h1\b/g) || []).length, 1, 'Exactly one visible H1 is required');
  assert.match(index, /<main\b/, 'Main content must exist before JavaScript');
  assert.ok(!/style="[^"]*opacity:\s*0[;"]/.test(index), 'Prerendered sections must be visible');
  assert.match(index, /<fieldset[^>]*disabled/, 'No-JS form must not submit personal data as a URL query');
  assert.ok(index.includes(site.title), 'SEO title is missing');
  assert.match(index, /rel="canonical" href="https:\/\/popovatalk\.ru\/"/);
  assert.match(index, /max-image-preview:large/);
  assert.ok(!/<meta[^>]+content="[^"]*noindex/.test(index), 'Published homepage must be indexable');
  assert.match(index, /Москве/, 'Confirmed in-person location must be visible');
  assert.ok(!index.includes('30-40 минут') && !index.includes('30–40 минут'), 'Outdated intro duration');
  for (const service of services) assert.ok(index.includes(service.price), `Missing visible price: ${service.title}`);

  const schemaText = index.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(schemaText, 'JSON-LD must be in static HTML');
  const graph = JSON.parse(schemaText)['@graph'];
  for (const type of ['Person', 'WebSite', 'WebPage', 'Service', 'FAQPage']) {
    assert.ok(graph.some(node => node['@type'] === type), `Missing schema entity: ${type}`);
  }
  const faqPage = graph.find(node => node['@type'] === 'FAQPage');
  assert.equal(faqPage.mainEntity.length, faqs.length, 'FAQ schema and visible questions diverged');
  for (const faq of faqPage.mainEntity) assert.ok(index.includes(faq.name), 'Schema question is not visible');
  assert.ok(!schemaText.includes('aggregateRating') && !schemaText.includes('streetAddress'), 'Do not invent reviews or an office address');

  const images = JSON.parse(await readFile(path.join(output, 'images/social/manifest.json'), 'utf8'));
  for (const [name, image] of Object.entries(images)) {
    const bytes = await readFile(path.join(output, 'images/social', image.file));
    assert.equal(bytes.toString('hex', 0, 8), '89504e470d0a1a0a', `${name} must be a PNG`);
    assert.equal(bytes.readUInt32BE(16), image.width, `${name} width metadata mismatch`);
    assert.equal(bytes.readUInt32BE(20), image.height, `${name} height metadata mismatch`);
    assert.equal(bytes.length, image.bytes, `${name} file size mismatch`);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), image.sha256, `${name} checksum mismatch`);
    assert.ok(bytes.length < 5 * 1024 * 1024, `${name} exceeds social preview size limits`);
  }
  assert.ok(index.includes(`content="${images.og.width}"`) && index.includes(`content="${images.og.height}"`), 'OG dimensions are incorrect');
  assert.ok(Math.abs(images.twitter.width / images.twitter.height - 2) < 0.01, 'Twitter large card should be 2:1');
  assert.equal(images.square.width, images.square.height, 'Square card dimensions');

  const ids = new Set([...index.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const match of index.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(match[1]), `Broken section link: #${match[1]}`);
  const robots = await readFile(path.join(output, 'robots.txt'), 'utf8');
  assert.match(robots, /User-agent: \*\s+Allow: \//);
  assert.ok(!/^Disallow: \/$/m.test(robots), 'Public crawlers must not be blocked');
  assert.ok(robots.includes('https://popovatalk.ru/sitemap.xml'), 'Sitemap discovery missing');
  const sitemap = await readFile(path.join(output, 'sitemap.xml'), 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, 1, 'Only real documents belong in this single-page sitemap');
  assert.ok(sitemap.includes(`<loc>${site.url}</loc>`));
  assert.ok(!sitemap.includes('#') && !sitemap.includes('localhost'), 'Invalid sitemap URLs');
  for (const file of ['index.html', 'robots.txt', 'sitemap.xml', 'llms.txt', 'llms-full.txt']) {
    const original = await readFile(path.join(output, file));
    assert.deepEqual(brotliDecompressSync(await readFile(path.join(output, `${file}.br`))), original, `Stale Brotli: ${file}`);
    assert.deepEqual(gunzipSync(await readFile(path.join(output, `${file}.gz`))), original, `Stale gzip: ${file}`);
  }
  console.log('Build verified: visible static HTML, SEO/schema/social cards/discovery, contact webhook, no Telegram credentials.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await verifyBuild(process.argv[2] || 'dist');
}
