import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { formatTelegramMessage, sendToTelegram } from '../src/utils/telegram.js';
import { getContactError } from '../src/utils/validation.js';

const form = { name: ' Тест < & > ', contact: ' example_user ', method: 'telegram', message: 'Строка 1\n<b>Строка 2</b> &', consent: true };
const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; delete globalThis.window; });
function recaptcha(execute = async () => 'test-token') {
  globalThis.window = { grecaptcha: { ready: callback => callback(), execute } };
}
function response(body, ok = true) {
  return { ok, json: async () => body };
}

test('preserves newlines, escapes user HTML, and normalizes the Telegram contact', () => {
  const message = formatTelegramMessage(form);
  assert.ok(message.includes('Тест &lt; &amp; &gt;'));
  assert.ok(message.includes('@example_user'));
  assert.ok(message.includes('Строка 1\n&lt;b&gt;Строка 2&lt;/b&gt; &amp;'));
  assert.ok(message.includes('<b>Новая заявка с сайта popovatalk.ru!</b>'));
});
for (const [method, contact] of [['telegram', '@example_user'], ['whatsapp', '+7 (968) 827-44-47'], ['phone', '89688274447'], ['email', 'example@example.com']]) {
  test(`accepts ${method} contacts`, () => assert.equal(getContactError(method, contact), ''));
}
for (const [method, contact] of [['telegram', '@bad'], ['phone', 'invalid'], ['email', 'broken@'], ['unknown', '@example_user']]) {
  test(`rejects invalid ${method} contact`, () => assert.ok(getContactError(method, contact)));
}
test('rejects whitespace name and oversized enquiry before making a request', () => {
  assert.throws(() => formatTelegramMessage({ ...form, name: '   ' }));
  assert.throws(() => formatTelegramMessage({ ...form, message: 'x'.repeat(3001) }));
});
test('uses the existing webhook contract and accepts confirmed delivery', async () => {
  recaptcha(async (key, options) => { assert.equal(options.action, 'submit_form'); assert.ok(key); return 'test-token'; });
  globalThis.fetch = async (url, options) => {
    assert.equal(url, '/hooks/send-telegram');
    assert.equal(options.method, 'POST');
    const payload = JSON.parse(options.body);
    assert.deepEqual(Object.keys(payload).sort(), ['message', 'recaptchaToken']);
    assert.equal(payload.recaptchaToken, 'test-token');
    assert.ok(payload.message.includes('@example_user'));
    return response({ success: true, score: 0.9 });
  };
  assert.deepEqual(await sendToTelegram(form), { success: true, score: 0.9 });
});
for (const body of [{ error: 'failure' }, { success: false }, {}, null]) {
  test(`does not report success for HTTP 200 with ${JSON.stringify(body)}`, async () => {
    recaptcha(); globalThis.fetch = async () => response(body);
    await assert.rejects(sendToTelegram(form), /Не удалось отправить/);
  });
}
test('handles a non-JSON webhook failure', async () => {
  recaptcha(); globalThis.fetch = async () => ({ ok: false, json: async () => { throw new SyntaxError(); } });
  await assert.rejects(sendToTelegram(form), /Сервер не подтвердил/);
});
test('handles an HTTP error even when its body claims success', async () => {
  recaptcha(); globalThis.fetch = async () => response({ success: true }, false);
  await assert.rejects(sendToTelegram(form));
});
test('does not call the webhook when reCAPTCHA is missing or rejects', async () => {
  let calls = 0; globalThis.fetch = async () => { calls++; };
  globalThis.window = {};
  await assert.rejects(sendToTelegram(form), /reCAPTCHA/);
  recaptcha(async () => { throw new Error('rejected'); });
  await assert.rejects(sendToTelegram(form), /reCAPTCHA/);
  assert.equal(calls, 0);
});
test('does not call the webhook with an empty reCAPTCHA token', async () => {
  recaptcha(async () => '');
  globalThis.fetch = async () => assert.fail('Webhook must not be called');
  await assert.rejects(sendToTelegram(form), /reCAPTCHA/);
});
test('stops waiting when reCAPTCHA never becomes ready', async () => {
  globalThis.window = { grecaptcha: { ready() {}, execute() {} } };
  await assert.rejects(sendToTelegram(form, { recaptchaTimeoutMs: 5 }), /не ответила/);
});
test('aborts a stalled request without retrying it', async () => {
  recaptcha(); let calls = 0;
  globalThis.fetch = (url, { signal }) => {
    calls++;
    return new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError'))));
  };
  await assert.rejects(sendToTelegram(form, { requestTimeoutMs: 5 }), /не ответил вовремя/);
  assert.equal(calls, 1);
});
