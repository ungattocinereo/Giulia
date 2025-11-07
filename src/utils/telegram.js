/**
 * Отправка сообщения в Telegram через Bot API
 */
export async function sendToTelegram(formData) {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram configuration is missing');
    throw new Error('Telegram не настроен. Проверьте файл .env');
  }

  // Определяем эмодзи для способа связи
  const methodEmoji = {
    telegram: '📱',
    whatsapp: '💚',
    email: '📧',
    phone: '☎️',
  };

  // Форматируем красивое сообщение с эмодзи
  const message = `
🎯 <b>Новая заявка с сайта!</b>

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

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      console.error('Telegram API error:', data);
      throw new Error(data.description || 'Ошибка при отправке в Telegram');
    }

    return data;
  } catch (error) {
    console.error('Failed to send message to Telegram:', error);
    throw error;
  }
}

/**
 * Получить человекочитаемое название способа связи
 */
function getMethodName(method) {
  const names = {
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    email: 'Email',
    phone: 'Телефон',
  };
  return names[method] || method;
}
