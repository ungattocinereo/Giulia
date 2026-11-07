// One-time browser setup: npx playwright install chromium webkit
// Run with npm run test:mobile-diplomas. The suite starts its own local preview.
import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { chromium, devices, webkit } from 'playwright';
import { preview } from 'vite';
import { documents } from '../../src/content/credentials.js';

let server;
let origin;

before(async () => {
    server = await preview({ preview: { host: '127.0.0.1', port: 0, open: false }, logLevel: 'error' });
    origin = `http://127.0.0.1:${server.httpServer.address().port}`;
});
after(async () => { await server?.close(); });

async function tapScan(page, xFraction, yFraction) {
    // Use the painted scan, accounting for object-fit letterboxing on portrait phones.
    const point = await page.locator('.document-scan img').evaluate(async (img, [fx, fy]) => {
        await img.decode();
        const box = img.getBoundingClientRect();
        const scale = Math.min(box.width / img.naturalWidth, box.height / img.naturalHeight);
        return {
            x: box.x + box.width / 2 + (fx - 0.5) * img.naturalWidth * scale,
            y: box.y + box.height / 2 + (fy - 0.5) * img.naturalHeight * scale,
        };
    }, [xFraction, yFraction]);
    await page.touchscreen.tap(point.x, point.y);
}

for (const [engine, deviceName] of [[webkit, 'iPhone 13'], [chromium, 'Pixel 7']]) {
    test(`${deviceName} · ${engine.name()} · fullscreen diploma viewer`, async t => {
        const browser = await engine.launch();
        t.after(() => browser.close());
        const page = await browser.newPage({ ...devices[deviceName] });
        page.setDefaultTimeout(6000);
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.route('**/*', route => route.request().url().startsWith(origin + '/') ? route.continue() : route.abort());
        await page.goto(origin + '/#education');
        const dialog = page.getByRole('dialog');
        const slide = page.locator('.credential-sheet[data-offset="0"]');
        const enlarge = page.getByRole('button', { name: 'Увеличить', exact: true });
        const next = page.getByRole('button', { name: 'Следующий документ' });

        await t.test('all scans open and close by touch without changing slide, scroll or focus', async () => {
            const points = [[0.5, 0.5], [0.02, 0.02], [0.98, 0.02], [0.02, 0.98], [0.98, 0.98]];
            for (const [index, doc] of documents.entries()) {
                const opener = index % 2 === 0 ? slide : enlarge;
                await opener.scrollIntoViewIfNeeded();
                const beforeY = await page.evaluate(() => scrollY);
                await opener.tap();
                await dialog.waitFor();
                assert.equal(await dialog.locator('img').getAttribute('src'), doc.src);
                assert.equal(await dialog.getByRole('heading').textContent(), doc.title);
                assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
                const bounds = await dialog.boundingBox();
                assert.equal(bounds.x, 0);
                assert.equal(bounds.y, 0);
                assert.equal(Math.round(bounds.height), page.viewportSize().height);
                assert.equal(Math.round(bounds.width), page.viewportSize().width);
                await tapScan(page, ...points[index % points.length]);
                await dialog.waitFor({ state: 'detached' });
                assert.equal(await slide.locator('img').getAttribute('src'), doc.src);
                assert.equal(await opener.evaluate(el => el === document.activeElement), true);
                assert.ok(Math.abs(await page.evaluate(() => scrollY) - beforeY) <= 2);
                assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden');
                await next.tap();
            }
        });

        await t.test('a second tap during opening dismisses the viewer and it can be reopened', async () => {
            await slide.scrollIntoViewIfNeeded();
            const box = await slide.boundingBox();
            const x = box.x + box.width / 2;
            const y = box.y + box.height / 2;
            for (let attempt = 0; attempt < 3; attempt++) {
                await page.touchscreen.tap(x, y);
                await dialog.waitFor();
                await page.touchscreen.tap(x, y);
                await dialog.waitFor({ state: 'detached' });
                assert.equal(await slide.locator('img').getAttribute('src'), documents[0].src);
            }
        });

        await t.test('rotation, close button, keyboard and reduced motion', async () => {
            await page.emulateMedia({ reducedMotion: 'reduce' });
            await page.setViewportSize({ width: 320, height: 568 });
            await page.getByRole('button', { name: 'Предыдущий документ' }).tap();
            await enlarge.tap();
            await dialog.waitFor();
            await page.setViewportSize({ width: 568, height: 320 });
            const close = dialog.getByRole('button', { name: 'Закрыть документ', exact: true });
            const box = await close.boundingBox();
            assert.ok(box.width >= 44 && box.height >= 44 && box.x + box.width <= 568);
            await page.keyboard.press('ArrowRight');
            assert.equal(await dialog.locator('img').getAttribute('src'), documents.at(-1).src);
            await close.tap();
            await dialog.waitFor({ state: 'detached' });
            await slide.tap();
            await dialog.waitFor();
            await page.keyboard.press('Escape');
            await dialog.waitFor({ state: 'detached' });
            assert.equal(await slide.evaluate(el => el === document.activeElement), true);
        });
        assert.deepEqual(errors, []);
    });
}
