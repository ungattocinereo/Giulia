import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getQuizState, getQuizReport, QUIZ_MAX_QUESTIONS, QUIZ_MESSAGE_LIMIT } from '../src/content/consultationQuiz.js';
import { formatTelegramMessage, sendToTelegram } from '../src/utils/telegram.js';

// Expected paths transcribed independently from the supplied flowchart.
const routes = [
    { answers: [true, false], result: 'career', steps: ['age', 'time'] },
    ...[false, true].flatMap(motivation => [
        { answers: [true, true, motivation, false, false], result: 'career', steps: ['age', 'time', 'motivation', 'events', 'interest'] },
        { answers: [true, true, motivation, false, true], result: 'tutoring', steps: ['age', 'time', 'motivation', 'events', 'interest'] },
        { answers: [true, true, motivation, true, false], result: 'psychologist', steps: ['age', 'time', 'motivation', 'events', 'family'] },
        { answers: [true, true, motivation, true, true], result: 'family', steps: ['age', 'time', 'motivation', 'events', 'family'] },
    ]),
    { answers: [false, false, false], result: 'career', steps: ['age', 'events', 'interest'] },
    { answers: [false, false, true], result: 'tutoring', steps: ['age', 'events', 'interest'] },
    { answers: [false, true, false], result: 'psychologist', steps: ['age', 'events', 'family'] },
    { answers: [false, true, true], result: 'family', steps: ['age', 'events', 'family'] },
];

for (const { answers, result, steps } of routes) {
    test(`flowchart: ${answers.map(value => value ? 'yes' : 'no').join(' → ')} gives ${result}`, () => {
        const state = getQuizState(answers);
        assert.equal(state.result.id, result);
        assert.equal(state.question, null);
        assert.deepEqual(state.path.map(step => step.id), steps);
        assert.ok(answers.length <= QUIZ_MAX_QUESTIONS);
        for (let length = 0; length < answers.length; length++) {
            assert.equal(getQuizState(answers.slice(0, length)).questionId, steps[length]);
        }
    });
}

test('going back and changing an answer discards the old branch and its result', () => {
    const oldAnswers = [true, true, true, true, true];
    assert.equal(getQuizState(oldAnswers).result.id, 'family');
    const newAnswers = [...oldAnswers.slice(0, 1), false];
    const report = getQuizReport(newAnswers);
    assert.equal(report.result.id, 'career');
    assert.ok(!report.text.includes('Готова ли семья'));
    assert.ok(!report.text.includes('трудности с мотивацией'));
});

test('incomplete, invalid, or overlong quiz paths cannot become applications', () => {
    for (const answers of [null, {}, ['yes'], [1], [true, false, true], Array(6).fill(true)]) {
        assert.throws(() => getQuizState(answers));
    }
    for (const answers of [[], [true], [false, true]]) assert.throws(() => getQuizReport(answers), /завершите/);
});

const form = { name: 'Родитель < & >', contact: 'parent_test', method: 'telegram', message: '<b>Комментарий</b> & детали', consent: true };
test('quiz application includes result, every answer, contact and escaped comment', () => {
    const message = formatTelegramMessage({ ...form, quizAnswers: [true, true, false, true, false] });
    assert.ok(message.includes('Рекомендация сайта: Индивидуальная работа с психологом'));
    assert.ok(message.includes('трудности с мотивацией? — Нет'));
    assert.ok(message.includes('Готова ли семья участвовать в семейной терапии? — Нет'));
    assert.ok(message.includes('@parent_test'));
    assert.ok(message.includes('Родитель &lt; &amp; &gt;'));
    assert.ok(message.includes('&lt;b&gt;Комментарий&lt;/b&gt; &amp; детали'));
});

test('largest quiz applications fit Telegram after HTML entity parsing', () => {
    for (const route of routes) {
        const message = formatTelegramMessage({ ...form, quizAnswers: route.answers, name: '&'.repeat(100), contact: `${'a'.repeat(90)}@mail.ru`, method: 'email', message: '<&>'.repeat(QUIZ_MESSAGE_LIMIT / 3) });
        const decoded = message.replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        assert.ok(decoded.length <= 4096, `${route.result}: ${decoded.length}`);
    }
    assert.throws(() => formatTelegramMessage({ ...form, quizAnswers: [true, false], message: 'x'.repeat(QUIZ_MESSAGE_LIMIT + 1) }), /1500/);
});

test('completed quiz uses the unchanged webhook contract, with no real network', async () => {
    const originalFetch = globalThis.fetch;
    const originalWindow = globalThis.window;
    let calls = 0;
    try {
        globalThis.window = { grecaptcha: { ready: callback => callback(), execute: async () => 'mock-token' } };
        globalThis.fetch = async (url, options) => {
            calls++;
            assert.equal(url, '/hooks/send-telegram');
            const payload = JSON.parse(options.body);
            assert.deepEqual(Object.keys(payload).sort(), ['message', 'recaptchaToken']);
            assert.equal(payload.recaptchaToken, 'mock-token');
            assert.ok(payload.message.includes('Рекомендация сайта: Семейная терапия'));
            return { ok: true, json: async () => ({ success: true }) };
        };
        await sendToTelegram({ ...form, quizAnswers: [false, true, true] });
        assert.equal(calls, 1);
        await assert.rejects(sendToTelegram({ ...form, quizAnswers: [false] }), /завершите/);
        assert.equal(calls, 1);
    } finally {
        globalThis.fetch = originalFetch;
        if (originalWindow === undefined) delete globalThis.window; else globalThis.window = originalWindow;
    }
});
