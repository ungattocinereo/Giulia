import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => entry.isDirectory()
    ? filesIn(path.join(dir, entry.name)) : [path.join(dir, entry.name)]));
  return nested.flat();
}
const files = await filesIn('dist');
const index = await readFile('dist/index.html', 'utf8');
assert.match(index, /https:\/\/popovatalk\.ru\//);
assert.match(index, /www\.google\.com\/recaptcha\/api\.js/);
for (const asset of ['/images/popova-001.png', '/images/background-pastel.jpg', '/images/popova-video.mp4']) {
  assert.ok(files.includes(`dist${asset}`), `Missing ${asset}`);
}
for (const match of index.matchAll(/(?:src|href)="(\/assets\/[^"?]+)"/g)) {
  assert.ok(files.includes(`dist${match[1]}`), `Missing ${match[1]}`);
}
let foundWebhook = false;
for (const file of files.filter(file => /\.(js|html|css)$/.test(file))) {
  const contents = await readFile(file, 'utf8');
  assert.doesNotMatch(contents, /api\.telegram\.org\/bot|VITE_TELEGRAM_BOT_TOKEN|VITE_TELEGRAM_CHAT_ID|RECAPTCHA_SECRET_KEY|\d{8,}:[A-Za-z0-9_-]{30,}/, `Credential or direct Telegram API reference in ${file}`);
  if (contents.includes('/hooks/send-telegram')) foundWebhook = true;
}
assert.ok(foundWebhook, 'Contact webhook is missing from the build');
console.log('Build verified: assets, reCAPTCHA, contact webhook, no Telegram credentials.');
