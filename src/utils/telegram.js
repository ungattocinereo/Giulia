const RECAPTCHA_SITE_KEY = '6LcMs18sAAAAAOhd3sYSLVgPxEhmUFVJOw59lJrh';

export async function sendToTelegram(formData) {
  const methodEmoji = {
    telegram: '📱',
    whatsapp: '💚',
    email: '📧',
    phone: '☎️',
  };

  const message = `
🎯 <b>Новая заявка с сайта popovatalk.ru!</b>

👤 <b>Имя:</b> ${formData.name}
${methodEmoji[formData.method] || '📞'} <b>Контакт:</b> ${formData.contact}
💬 <b>Способ связи:</b> ${getMethodName(formData.method)}
${formData.message ? `\n📝 <b>Сообщение:</b>\n${formData.message}` : ''}

⏰ <b>Дата:</b> ${new Date().toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })}
`.trim();

  try {
    const recaptchaToken = await new Promise((resolve, reject) => {
      if (!window.grecaptcha) {
        reject(new Error('reCAPTCHA не загружен. Обновите страницу.'));
        return;
      }

      grecaptcha.ready(() => {
        grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit_form' })
          .then(resolve)
          .catch(err => reject(new Error('Ошибка проверки reCAPTCHA: ' + err)));
      });
    });

    const response = await fetch('/hooks/send-telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        recaptchaToken: recaptchaToken
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Webhook error:', data);
      throw new Error(data.error || 'Ошибка при отправке заявки');
    }

    return data;
  } catch (error) {
    console.error('Failed to send message:', error);
    throw error;
  }
}

function getMethodName(method) {
  const names = {
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    email: 'Email',
    phone: 'Телефон',
  };
  return names[method] || method;
}
