import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const source = readFileSync(new URL('../scripts/send-telegram.sh', import.meta.url), 'utf8');
const validPayload = { message: '<b>Заявка</b>\nКавычки " и &amp; текст', recaptchaToken: 'fake-captcha-token' };
function run(payload, options = {}) {
  const dir = mkdtempSync(path.join(tmpdir(), 'popovatalk-test-'));
  try {
    mkdirSync(path.join(dir, 'scripts'));
    mkdirSync(path.join(dir, 'bin'));
    const script = path.join(dir, 'scripts/send-telegram.sh');
    writeFileSync(script, source);
    const log = path.join(dir, 'calls.jsonl');
    if (!options.missingEnv) {
      writeFileSync(path.join(dir, '.env'), options.envText ?? 'TELEGRAM_BOT_TOKEN="fake-bot-token"\nTELEGRAM_CHAT_ID=\'-12345\'\nRECAPTCHA_SECRET_KEY=fake-secret&value\n');
    }
    writeFileSync(path.join(dir, 'bin/curl'), `#!/usr/bin/env node
const fs = require('node:fs');
const args = process.argv.slice(2);
fs.appendFileSync(process.env.MOCK_LOG, JSON.stringify(args) + '\\n');
if (args.includes('https://www.google.com/recaptcha/api/siteverify')) {
  if (process.env.MOCK_RECAPTCHA_EXIT) process.exit(Number(process.env.MOCK_RECAPTCHA_EXIT));
  process.stdout.write(process.env.MOCK_RECAPTCHA_RESULT || '{"success":true,"score":0.9}');
} else if (args.includes('https://api.telegram.org/botfake-bot-token/sendMessage')) {
  if (process.env.MOCK_TELEGRAM_EXIT) process.exit(Number(process.env.MOCK_TELEGRAM_EXIT));
  process.stdout.write(process.env.MOCK_TELEGRAM_RESULT || '{"ok":true,"result":{"message_id":1}}');
} else {
  process.exit(99);
}
`, { mode: 0o755 });
    const env = { ...process.env, PATH: `${dir}/bin:${process.env.PATH}`, MOCK_LOG: log, ...options.mock };
    delete env.POPOVATALK_ENV_FILE;
    const result = spawnSync('bash', [script, typeof payload === 'string' ? payload : JSON.stringify(payload)], { env, encoding: 'utf8', timeout: 10000 });
    assert.ifError(result.error);
    const calls = (() => { try { return readFileSync(log, 'utf8').trim().split('\n').map(JSON.parse); } catch { return []; } })();
    assert.equal(result.stderr, '');
    return { status: result.status, body: JSON.parse(result.stdout), calls };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
test('server reads configuration relative to its own directory and keeps webhook contract', () => {
  const result = run(validPayload);
  assert.equal(result.status, 0);
  assert.deepEqual(result.body, { success: true, score: 0.9 });
  assert.equal(result.calls.length, 2);
  assert.ok(result.calls[0].includes('secret=fake-secret&value'));
  const telegram = result.calls[1];
  const body = JSON.parse(telegram[telegram.indexOf('--data') + 1]);
  assert.deepEqual(body, { chat_id: '-12345', text: validPayload.message, parse_mode: 'HTML' });
  assert.ok(result.calls.every(args => args.includes('--max-time')));
});
for (const payload of ['', '{bad-json', '{}', '[]', '{} {}', '{"message":7,"recaptchaToken":"x"}', '{"message":"x","recaptchaToken":true}', '{"message":"   ","recaptchaToken":"x"}', { ...validPayload, message: 'x'.repeat(32769) }]) {
  test(`server rejects malformed payload (${typeof payload === 'string' ? payload.slice(0, 35) : 'oversize'}) before any outbound request`, () => {
    const result = run(payload);
    assert.equal(result.status, 1);
    assert.match(result.body.error, /Invalid payload/);
    assert.equal(result.calls.length, 0);
  });
}
test('server rejects missing configuration before making a request', () => {
  const result = run(validPayload, { missingEnv: true });
  assert.equal(result.status, 1);
  assert.equal(result.calls.length, 0);
});
test('server rejects incomplete configuration', () => {
  const result = run(validPayload, { envText: 'TELEGRAM_BOT_TOKEN=fake-bot-token\n' });
  assert.equal(result.status, 1);
  assert.equal(result.calls.length, 0);
});
for (const mock of [{ MOCK_RECAPTCHA_RESULT: '{"success":false}' }, { MOCK_RECAPTCHA_RESULT: 'invalid' }, { MOCK_RECAPTCHA_EXIT: '28' }]) {
  test(`server rejects failed reCAPTCHA and never calls Telegram (${JSON.stringify(mock)})`, () => {
    const result = run(validPayload, { mock });
    assert.equal(result.status, 1);
    assert.equal(result.calls.length, 1);
    assert.equal(result.body.success, undefined);
  });
}
for (const mock of [{ MOCK_TELEGRAM_RESULT: '{"ok":false,"description":"do not expose fake-bot-token"}' }, { MOCK_TELEGRAM_RESULT: 'invalid' }, { MOCK_TELEGRAM_EXIT: '22' }]) {
  test(`server reports failed Telegram delivery without leaking response or credentials (${JSON.stringify(mock)})`, () => {
    const result = run(validPayload, { mock });
    assert.equal(result.status, 1);
    assert.equal(result.calls.length, 2);
    assert.deepEqual(result.body, { error: 'Telegram delivery could not be confirmed' });
  });
}
test('server handles quoted values with CRLF line endings', () => {
  const result = run(validPayload, { envText: 'TELEGRAM_BOT_TOKEN="fake-bot-token"\r\nTELEGRAM_CHAT_ID="-12345"\r\nRECAPTCHA_SECRET_KEY="fake-secret"\r\n' });
  assert.equal(result.status, 0);
});
test('deployment and message scripts have valid shell syntax', () => {
  for (const script of ['deploy.sh', 'redeploy.sh', 'scripts/send-telegram.sh']) {
    const result = spawnSync('bash', ['-n', script], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
  }
});
