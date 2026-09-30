import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { site, faqs } from '../../src/content/site.js';

// Read-only: never call the message or redeployment endpoints.
async function request(path, options = {}) {
    const response = await fetch(new URL(path, site.url), {
        redirect: 'manual', signal: AbortSignal.timeout(15000), ...options,
    });
    assert.equal(response.status, 200, `${path}: expected HTTP 200, got ${response.status}`);
    return response;
}

const home = await request('/');
assert.match(home.headers.get('content-type') || '', /text\/html/);
assert.match(home.headers.get('cache-control') || '', /no-cache/);
assert.ok(!home.headers.get('x-robots-tag')?.includes('noindex'), 'Server blocks indexing');
const html = await home.text();
assert.ok(html.includes(site.title) && html.includes('20 минут') && html.includes('Москве'), 'Published content is outdated');
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert.match(html, /rel="canonical" href="https:\/\/popovatalk\.ru\/"/);
assert.match(html, /name="twitter:card" content="summary_large_image"/);
const graph = JSON.parse(html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] || '{}')['@graph'];
assert.equal(graph?.find(node => node['@type'] === 'FAQPage')?.mainEntity.length, faqs.length, 'Published structured data missing');

for (const file of ['robots.txt', 'sitemap.xml', 'llms.txt', 'llms-full.txt']) {
    const response = await request(`/${file}`);
    assert.ok(!/text\/html/.test(response.headers.get('content-type') || ''), `${file} incorrectly returns the homepage`);
    assert.match(response.headers.get('cache-control') || '', /no-cache/);
    const text = await response.text();
    assert.ok(!text.includes('<!DOCTYPE html>'), `${file} incorrectly returns HTML`);
    if (file === 'robots.txt') assert.match(text, /User-agent: \*\s+Allow: \//);
    if (file === 'sitemap.xml') assert.ok(text.includes(`<loc>${site.url}</loc>`));
    if (file.startsWith('llms')) assert.ok(text.includes(site.name) && text.includes('20 минут'));
}

const manifest = JSON.parse(await readFile(new URL('../../public/images/social/manifest.json', import.meta.url), 'utf8'));
for (const image of Object.values(manifest)) {
    const response = await request(`/images/social/${image.file}`);
    assert.match(response.headers.get('content-type') || '', /image\/png/);
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.equal(createHash('sha256').update(bytes).digest('hex'), image.sha256, `Published card differs: ${image.file}`);
}

for (const path of ['/', '/robots.txt', '/images/social/popovatalk-og.png?preview=1']) {
    const response = await fetch(`https://www.popovatalk.ru${path}`, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, 308, `www${path}: canonical redirect missing`);
    assert.equal(response.headers.get('location'), `https://popovatalk.ru${path}`, 'Redirect loses the path or query');
}
const missing = await fetch(new URL('/seo-check-missing-file-20260930.txt', site.url), { signal: AbortSignal.timeout(15000) });
assert.equal(missing.status, 404, 'Missing resources must return 404');

// Check response consistency for crawler user agents; this is not an indexing test.
for (const agent of ['Googlebot', 'OAI-SearchBot', 'ChatGPT-User', 'facebookexternalhit/1.1', 'Twitterbot/1.0', 'TelegramBot']) {
    const response = await request('/', { headers: { 'user-agent': agent } });
    const text = await response.text();
    assert.ok(text.includes('id="structured-data"') && text.includes('<h1'), `Content missing for ${agent}`);
}
console.log('Live site verified: static content, canonical redirect, SEO/discovery/social cards, 404 and crawler responses. No messages sent.');
