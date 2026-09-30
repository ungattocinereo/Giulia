# PopovaTalk — сайт Юлии Поповой

Сайт: [popovatalk.ru](https://popovatalk.ru). Репозиторий: [ungattocinereo/Giulia](https://github.com/ungattocinereo/Giulia).
Рабочая ветка: `popovatalk_ru_alpha`. Локальная папка может называться `PopovaTalk`; это тот же проект.

На VPS сайт обслуживает **Caddy из `/srv/Giulia/dist`**. Заявки принимает отдельный webhook и отправляет их в Telegram после проверки reCAPTCHA. Docker-файлы сохранились от прежнего способа развёртывания; действующий сайт обновляется через `redeploy.sh`.

## Локальный запуск

Нужен Node.js, совместимый с Vite 7: `^20.19.0 || >=22.12.0`.

```bash
npm ci
test -f .env || cp .env.example .env
npm run dev
```

Открыть `http://localhost:5173`. Для проверки production-сборки: `npm run build`, затем `npm run preview -- --host 127.0.0.1 --port 4174 --strictPort`. Локальный просмотр доступен на `http://127.0.0.1:4174/`.

Токен Telegram и секрет reCAPTCHA для просмотра сайта **не нужны**. `.env.example` описывает только необязательный `POPOVATALK_WEBHOOK_TARGET` для локального прокси. По умолчанию он выключен. Прокси разрешает только `/hooks/send-telegram`, а не webhook обновления сайта.

При подключении к рабочему обработчику заявки действительно уходят в рабочий канал. reCAPTCHA должна разрешать домен, с которого открыта форма; если `localhost` не разрешён в настройках ключа, локальная отправка будет отклонена. Для автоматических проверок используются подменённые сервисы.

## Проверки перед изменениями

```bash
npm run check
./deploy.sh --check
```

`npm run check` проверяет форматирование и валидацию заявки, обработку ошибок, таймауты, серверный обработчик с подменённым `curl`, production-сборку и наличие её ресурсов. Проверяется также отсутствие токена Telegram в клиентском коде. Для тестов обработчика нужны `bash`, `jq`, `awk` и `curl`; реальные сообщения тесты не отправляют.

`deploy.sh` выполняет только чтение состояния VPS через SSH-алиас `hostup`: код, службы, настройки и доступность сайта. Другой сервер можно указать через `POPOVATALK_SSH_HOST`, другую папку — через `POPOVATALK_SERVER_PATH`.

## Как работают заявки

1. Форма проверяет имя, контакт и согласие; доступны Telegram, WhatsApp, телефон и email.
2. reCAPTCHA создаёт токен для действия `submit_form`.
3. Браузер отправляет JSON `{ message, recaptchaToken }` на `/hooks/send-telegram` того же сайта.
4. Caddy передаёт запрос службе `webhook`; она запускает `scripts/send-telegram.sh` и передаёт JSON первым аргументом.
5. Обработчик читает **серверный** `.env` рядом с проектом, проверяет reCAPTCHA и вызывает Telegram.
6. Успех формы требует HTTP-успеха и JSON `{ "success": true }`. При ошибке введённые данные сохраняются; при неопределённом результате запрос автоматически не повторяется.

На сервере используются `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `RECAPTCHA_SECRET_KEY`. Их нельзя переименовывать в `VITE_*`: такой префикс делает переменную доступной в браузере. Секреты исключены из Git и Docker-контекста. Публичный ключ reCAPTCHA уже находится в `index.html` и `src/utils/telegram.js`; при замене ключа менять нужно оба места.

Обработчик сохраняет действующую политику reCAPTCHA: проверяет `success`, возвращает `score`, но не вводит новый порог оценки. Изменение антиспам-политики требует отдельной проверки.

## Где менять содержимое

- `src/components/` — разделы страницы; контакты в `Contact.jsx`, `Hero.jsx`, `Footer.jsx`, `PrivacyPolicy.jsx`.
- `src/utils/telegram.js` — текст заявки и клиентский вызов обработчика.
- `src/utils/validation.js` — проверки контактов и пределы длины полей.
- `public/images/` — фото, фон и видео.
- `index.html` — SEO, favicon и загрузка reCAPTCHA.

## Оформление

Цвета и шрифты задаются в `tailwind.config.js`, общие кнопки, поля и анимации — в `src/index.css`. Manrope и Cormorant Garamond с кириллицей поставляются вместе с сайтом. Все иконки подключаются по отдельности из Font Awesome через `src/components/ui/icons.jsx`.

`AnimatedRays` и `FaqAccordion` установлены через shadcn из VengeanceUI и адаптированы к светлой теме. Исходники находятся в `src/components/ui/`, лицензия — в [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Фоновая анимация и переходы учитывают настройку уменьшения движения. Мобильная навигация использует стандартный диалог браузера с удержанием фокуса и закрытием по Escape.

Текущий порядок безопасного обновления описан в [DEPLOYMENT.md](DEPLOYMENT.md). Результаты сверки локальной копии, GitHub и VPS — в [PROJECT_STATUS.md](PROJECT_STATUS.md).
