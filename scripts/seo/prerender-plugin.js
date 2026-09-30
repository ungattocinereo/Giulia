import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { mkdir, mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { brotliCompressSync, gzipSync, constants } from 'node:zlib';
import { metaHead, robots, sitemap, llmsSummary, llmsFull } from './metadata.js';
import { verifyBuild } from '../check-build.js';

export default function seoPrerender() {
    let config;
    return {
        name: 'popovatalk-seo-prerender',
        configResolved(resolved) { config = resolved; },
        async transformIndexHtml(html) {
            const manifest = JSON.parse(await readFile(path.join(config.root, 'public/images/social/manifest.json'), 'utf8'));
            return html.replace('<!--seo:head-->', metaHead(manifest));
        },
        // Run after compression, then regenerate compressed HTML from final markup.
        closeBundle: {
            order: 'post', sequential: true,
            async handler() {
                if (config.command !== 'build' || config.build.ssr) return;
                const cacheRoot = path.join(config.root, '.cache.local');
                await mkdir(cacheRoot, { recursive: true });
                const temporary = await mkdtemp(path.join(cacheRoot, 'seo-ssr-'));
                try {
                    await build({
                        configFile: false, root: config.root, publicDir: false,
                        mode: config.mode, logLevel: 'warn', plugins: [react()],
                        resolve: { alias: config.resolve.alias },
                        build: { ssr: 'src/entry-server.jsx', outDir: temporary, emptyOutDir: true, minify: false },
                    });
                    const { render } = await import(pathToFileURL(path.join(temporary, 'entry-server.js')).href);
                    const output = path.resolve(config.root, config.build.outDir);
                    const indexPath = path.join(output, 'index.html');
                    const template = await readFile(indexPath, 'utf8');
                    const outlet = '<div id="root"></div>';
                    if (!template.includes(outlet)) throw new Error('Prerender root outlet is missing');
                    const html = template.replace(outlet, `<div id="root">${render()}</div>`);
                    const artifacts = { 'index.html': html, 'robots.txt': robots(), 'sitemap.xml': sitemap(), 'llms.txt': llmsSummary(), 'llms-full.txt': llmsFull() };
                    for (const [name, content] of Object.entries(artifacts)) {
                        await writeFile(path.join(output, name), content);
                        await writeFile(path.join(output, `${name}.br`), brotliCompressSync(content, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }));
                        await writeFile(path.join(output, `${name}.gz`), gzipSync(content));
                    }
                    await verifyBuild(output);
                    config.logger.info('SEO: static HTML, structured data, social metadata and discovery files generated.');
                } finally {
                    await rm(temporary, { recursive: true, force: true });
                }
            },
        },
    };
}
