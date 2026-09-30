import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Exact block audited on 2026-09-30. Refuse to overwrite later server changes.
export const previousBlock = `popovatalk.ru, www.popovatalk.ru {
\timport common
\timport hooks
\thandle {
\t\troot * /srv/Giulia/dist

\t\t@hashedAssets path_regexp \\.[a-f0-9]+\\.(js|css|svg|png|jpg|woff2)$
\t\theader @hashedAssets Cache-Control "public, max-age=31536000, immutable"
\t\theader Cache-Control "public, max-age=604800, must-revalidate"

\t\ttry_files {path} /index.html
\t\tfile_server {
\t\t\tprecompressed br gzip
\t\t}
\t}
}`;

export async function prepareCaddy(source) {
    assert.equal(source.split(previousBlock).length - 1, 1,
        'The audited PopovaTalk block changed or is not unique. Review the current configuration before preparing an update.');
    const replacement = (await readFile(new URL('../../ops/Caddyfile.popovatalk', import.meta.url), 'utf8')).trimEnd();
    return source.replace(previousBlock, replacement);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    const args = process.argv.slice(2);
    assert.equal(args.length, 4, 'Usage: node scripts/seo/prepare-caddy.js --input SOURCE --output NEW_FILE');
    assert.equal(args[0], '--input');
    assert.equal(args[2], '--output');
    assert.notEqual(path.resolve(args[1]), path.resolve(args[3]), 'Output must be a separate file');
    const original = await readFile(args[1]);
    const source = original.toString('utf8');
    assert.deepEqual(Buffer.from(source), original, 'Configuration must be valid UTF-8');
    const prepared = await prepareCaddy(source);
    await writeFile(args[3], prepared, { flag: 'wx', mode: 0o600 });
    console.log('Prepared a separate Caddyfile. Validate the complete file before applying it.');
}
