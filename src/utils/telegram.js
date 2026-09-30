import { CONTACT_LIMITS, formatTelegram, getContactError } from './validation.js';

const RECAPTCHA_SITE_KEY = '6LcMs18sAAAAAOhd3sYSLVgPxEhmUFVJOw59lJrh';

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function formatTelegramMessage(formData) {
  const name = formData.name.trim();
  const contact = formData.contact.trim();
  const message = (formData.message || '').trim();
  if (!name || name.length > CONTACT_LIMITS.name) {
    throw new Error('Укажите имя (до 100 символов)');
  }
  const contactError = getContactError(formData.method, contact);
  if (contactError) throw new Error(contactError);
  if (message.length > CONTACT_LIMITS.message) {
    throw new Error('Сообщение должно содержать не более 3000 символов');
  }
  const methods = {
    telegram: { emoji: '📱', name: 'Telegram' },
    whatsapp: { emoji: '💚', name: 'WhatsApp' },
    email: { emoji: '📧', name: 'Email' },
    phone: { emoji: '☎️', name: 'Телефон' },
  };
  const method = methods[formData.method];
  const normalizedContact = formData.method === 'telegram' ? formatTelegram(contact) : contact;
  return `
🎯 <b>Новая заявка с сайта popovatalk.ru!</b>

👤 <b>Имя:</b> ${escapeHtml(name)}
${method.emoji} <b>Контакт:</b> ${escapeHtml(normalizedContact)}
💬 <b>Способ связи:</b> ${method.name}
${message ? `\n📝 <b>Сообщение:</b>\n${escapeHtml(message)}` : ''}

⏰ <b>Дата:</b> ${new Date().toLocaleString('ru-RU', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })}
`.trim();
}

function getRecaptchaToken(timeoutMs) {
  return new Promise((resolve, reject) => {
    const recaptcha = window.grecaptcha;
    if (!recaptcha?.ready || !recaptcha?.execute) {
      reject(new Error('Не удалось загрузить проверку reCAPTCHA. Обновите страницу и попробуйте ещё раз.'));
      return;
    }
    const timeout = setTimeout(() => reject(new Error('Проверка reCAPTCHA не ответила. Попробуйте ещё раз.')), timeoutMs);
    const fail = () => {
      clearTimeout(timeout);
      reject(new Error('Не удалось пройти проверку reCAPTCHA. Попробуйте ещё раз.'));
    };
    try {
      recaptcha.ready(() => {
        try {
          Promise.resolve(recaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit_form' }))
            .then(token => {
              clearTimeout(timeout);
              if (typeof token !== 'string' || !token) {
                fail();
                return;
              }
              resolve(token);
            }, fail);
        } catch {
          fail();
        }
      });
    } catch {
      fail();
    }
  });
}

export async function sendToTelegram(formData, { recaptchaTimeoutMs = 15000, requestTimeoutMs = 45000 } = {}) {
  const message = formatTelegramMessage(formData);
  const recaptchaToken = await getRecaptchaToken(recaptchaTimeoutMs);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
  try {
    const response = await fetch('/hooks/send-telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, recaptchaToken }),
      signal: controller.signal,
    });
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error('Сервер не подтвердил отправку заявки. Свяжитесь со мной через Telegram или WhatsApp.');
    }
    if (!response.ok || data?.success !== true) {
      throw new Error('Не удалось отправить заявку. Попробуйте позже или свяжитесь со мной через Telegram или WhatsApp.');
    }
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Сервер не ответил вовремя. Проверьте отправку, связавшись со мной через Telegram или WhatsApp.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
