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
    test(`${deviceName} · ${engine.name()} · diploma detail card`, async t => {
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
                // The browser may scroll the opener into view before delivering a tap.
                await opener.evaluate(el => el.addEventListener('touchstart', () => {
                    el.dataset.tapScrollY = String(window.scrollY);
                }, { once: true, passive: true }));
                await opener.tap();
                await dialog.waitFor();
                assert.equal(await dialog.locator('img').getAttribute('src'), doc.src);
                assert.equal(await dialog.getByRole('heading').textContent(), doc.shortTitle);
                assert.equal(await dialog.locator('.document-description').innerText(), doc.description);
                assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
                const bounds = await dialog.locator('.document-viewer').boundingBox();
                const viewport = page.viewportSize();
                assert.ok(bounds.x >= 8 && bounds.width <= viewport.width - 16);
                assert.ok(bounds.height < viewport.height * 0.9 && bounds.y > 0);
                const caption = await dialog.locator('.document-description').boundingBox();
                assert.ok(caption.y >= bounds.y - 2 && caption.y + caption.height <= bounds.y + bounds.height);
                await tapScan(page, ...points[index % points.length]);
                await dialog.waitFor({ state: 'detached' });
                assert.equal(await slide.locator('img').getAttribute('src'), doc.src);
                assert.equal(await opener.evaluate(el => el === document.activeElement), true);
                const beforeY = Number(await opener.getAttribute('data-tap-scroll-y'));
                const afterY = await page.evaluate(() => scrollY);
                assert.ok(Math.abs(afterY - beforeY) <= 2, `${doc.title}: scroll ${beforeY} → ${afterY}`);
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
                await tapScan(page, 0.5, 0.5);
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
            const card = await dialog.locator('.document-viewer').boundingBox();
            const description = await dialog.locator('.document-description').boundingBox();
            assert.ok(description.y + description.height <= card.y + card.height && card.height < 320);
            await page.keyboard.press('ArrowRight');
            assert.equal(await dialog.locator('img').getAttribute('src'), documents.at(-1).src);
            await page.touchscreen.tap(3, 3);
            await dialog.waitFor({ state: 'detached' });
            await enlarge.tap();
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

for (const engine of [webkit, chromium]) {
    test(`${engine.name()} · classic scrollbar does not shift the page or fixed header`, async t => {
        const browser = await engine.launch({ ignoreDefaultArgs: ['--hide-scrollbars'] });
        t.after(() => browser.close());
        const page = await browser.newPage({ viewport: { width: 1512, height: 854 }, reducedMotion: 'reduce' });
        page.setDefaultTimeout(6000);
        await page.route('**/*', route => route.request().url().startsWith(origin + '/') ? route.continue() : route.abort());
        await page.goto(origin + '/#education');
        await page.addStyleTag({ content: 'html::-webkit-scrollbar { width: 18px; } html::-webkit-scrollbar-thumb { background: #999; }' });
        await page.evaluate(() => document.fonts.ready);
        const enlarge = page.getByRole('button', { name: 'Увеличить', exact: true });
        const dialog = page.getByRole('dialog');

        const measure = () => page.evaluate(() => Object.fromEntries(
            ['header > div', '#education > .page-container', '.credential-gallery'].map(selector => {
                const rect = document.querySelector(selector).getBoundingClientRect();
                return [selector, { x: rect.x, width: rect.width }];
            }),
        ));

        // WebKit updates custom viewport scrollbar metrics after the first scroll-lock cycle.
        await enlarge.click();
        await dialog.waitFor();
        await page.keyboard.press('Escape');
        await dialog.waitFor({ state: 'detached' });

        for (const width of [1512, 1024]) {
            await page.setViewportSize({ width, height: 854 });
            await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
            await enlarge.scrollIntoViewIfNeeded();
            const scrollbar = await page.evaluate(() => innerWidth - document.documentElement.clientWidth);
            assert.ok(scrollbar > 0, 'The regression must exercise a classic scrollbar that takes up space.');
            const before = await measure();
            for (let cycle = 0; cycle < 2; cycle++) {
                await enlarge.click();
                await dialog.waitFor();
                assert.deepEqual(await measure(), before, `Layout shifted on open at ${width}px`);
                await page.keyboard.press('Escape');
                await dialog.waitFor({ state: 'detached' });
                assert.deepEqual(await measure(), before, `Layout shifted on close at ${width}px`);
            }
        }

        await page.setViewportSize({ width: 1000, height: 854 });
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const beforeMenu = await measure();
        await page.getByRole('button', { name: 'Открыть меню', exact: true }).click();
        await page.locator('#mobile-navigation[open]').waitFor();
        assert.deepEqual(await measure(), beforeMenu, 'Layout shifted on menu open');
        await page.getByRole('button', { name: 'Закрыть меню', exact: true }).click();
        await page.locator('#mobile-navigation[open]').waitFor({ state: 'hidden' });
        assert.deepEqual(await measure(), beforeMenu, 'Layout shifted on menu close');

        const startQuiz = page.getByRole('button', { name: 'Узнать, какая консультация нужна', exact: true });
        await startQuiz.scrollIntoViewIfNeeded();
        const beforeQuiz = await measure();
        await startQuiz.click();
        const quiz = page.locator('.quiz-dialog[open]');
        await quiz.getByRole('button', { name: 'Да', exact: true }).click();
        await quiz.getByRole('button', { name: 'Нет, нужно определиться скорее', exact: true }).click();
        await quiz.getByRole('button', { name: 'политикой конфиденциальности', exact: true }).click();
        const privacy = page.locator('.privacy-dialog[open]');
        await privacy.waitFor();
        assert.deepEqual(await measure(), beforeQuiz, 'Nested dialog shifted the page');
        await privacy.getByRole('button', { name: 'Закрыть', exact: true }).first().click();
        await privacy.waitFor({ state: 'detached' });
        assert.equal(await page.evaluate(() => document.body.style.position), 'fixed');
        assert.deepEqual(await measure(), beforeQuiz, 'Closing the nested dialog unlocked the page');
        await quiz.getByRole('button', { name: 'Закрыть тест', exact: true }).click();
        await quiz.waitFor({ state: 'hidden' });
        assert.notEqual(await page.evaluate(() => document.body.style.position), 'fixed');
        assert.deepEqual(await measure(), beforeQuiz, 'Closing the final dialog shifted the page');
    });
}
