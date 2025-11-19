# Юлия Попова - Психолог, Тьютор, Профориентолог

Современный одностраничный лендинг для психолога, тьютора и профориентолога Юлии Поповой.

🌐 **Сайт:** [popova.cinereo.it](https://popova.cinereo.it)

## ✨ Особенности

- ✅ Современный адаптивный дизайн
- ✅ Плавные анимации и переходы (Framer Motion)
- ✅ Интеграция с Telegram Bot для заявок
- ✅ Docker deployment ready
- ✅ SEO оптимизация
- ✅ Высокая производительность (Vite)

## 🎨 Дизайн

### Цветовая палитра

- **Sage Green** `#8FA677` - Основной цвет бренда
- **Apricot** `#F2AA6B` - Теплый акцент
- **Coral** `#F2856D` - Дополнительный акцент
- **Terracotta** `#D94032` - Сильный акцент для CTA
- **Cream** `#F2E0C9` - Мягкий фоновый оттенок

### Шрифты

- **Outfit** - Современный геометрический шрифт
- Оптимизированная типографика для максимальной читаемости

### Иконки

- **Phosphor Icons** - Современная библиотека иконок

## 🚀 Технологии

- **React 18** - UI библиотека
- **Vite** - Сборщик и dev-сервер
- **Tailwind CSS 3** - Utility-first CSS фреймворк
- **Framer Motion** - Анимации
- **Phosphor Icons** - Иконки
- **Docker** - Контейнеризация для деплоя

## 📦 Установка и запуск

### Локальная разработка

```bash
# Клонировать репозиторий
git clone https://github.com/ungattocinereo/Giulia.git
cd Giulia

# Установить зависимости
npm install

# Создать .env файл (см. .env.example)
cp .env.example .env

# Запустить dev-сервер
npm run dev

# Открыть http://localhost:5173
```

### Production сборка

```bash
# Собрать проект
npm run build

# Предпросмотр production сборки
npm run preview
```

## 🐳 Docker Deployment

Проект готов к деплою в Docker контейнере.

### Быстрый старт

```bash
# Автоматический деплой на сервер
./deploy.sh
```

### Ручной деплой

```bash
# Собрать Docker образ
docker build -t popova-website .

# Запустить контейнер
docker-compose up -d

# Проверить статус
docker-compose ps
```

Подробная инструкция по деплою: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📱 Telegram Bot Integration

Форма обратной связи интегрирована с Telegram Bot.

### Настройка

1. Создайте `.env` файл:

```env
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
VITE_TELEGRAM_CHAT_ID=your_chat_id_here
```

2. Получите токен бота от [@BotFather](https://t.me/BotFather)
3. Получите Chat ID (см. [DEPLOYMENT.md](./DEPLOYMENT.md))

## 📂 Структура проекта

```
Giulia/
├── src/
│   ├── components/          # React компоненты
│   │   ├── Header.jsx      # Навигация
│   │   ├── Hero.jsx        # Главный экран
│   │   ├── About.jsx       # О себе
│   │   ├── Services.jsx    # Услуги
│   │   ├── Pricing.jsx     # Стоимость
│   │   ├── Contact.jsx     # Контакты
│   │   ├── FAQ.jsx         # Вопросы-ответы
│   │   └── Footer.jsx      # Подвал
│   ├── utils/              # Утилиты
│   ├── App.jsx             # Главный компонент
│   ├── main.jsx            # Точка входа
│   └── index.css           # Глобальные стили
├── public/
│   └── images/             # Изображения
├── Dockerfile              # Docker конфигурация
├── docker-compose.yml      # Docker Compose
├── nginx.conf              # Nginx конфигурация
├── deploy.sh               # Скрипт деплоя
├── DEPLOYMENT.md           # Инструкция по деплою
└── package.json
```

## 🎯 Секции сайта

1. **Hero** - Главный экран с фоновым изображением и аватаром
2. **About** - Информация о специалисте
3. **Services** - Три пакета услуг
4. **Pricing** - Прозрачные цены
5. **FAQ** - Часто задаваемые вопросы
6. **Contact** - Форма обратной связи с Telegram интеграцией
7. **Footer** - Контакты и социальные сети

## 🔧 Конфигурация

### Tailwind CSS

Настроенная цветовая палитра и утилиты в `tailwind.config.js`

### Vite

Оптимизированная конфигурация для production в `vite.config.js`

### Environment Variables

```env
VITE_TELEGRAM_BOT_TOKEN=    # Токен Telegram бота
VITE_TELEGRAM_CHAT_ID=      # ID чата для уведомлений
```

## 📝 Обновление контента

### Изображения

Замените изображения в `public/images/`:
- `popova-001.png` - Аватар (рекомендуемый размер: 400x400px)
- `background-pastel.jpg` - Фон hero секции

### Контактная информация

Обновите в соответствующих компонентах:
- Email: `src/components/Contact.jsx`
- Телефон: `src/components/Contact.jsx`
- Социальные сети: `src/components/Hero.jsx`, `src/components/Footer.jsx`

### Цены

Обновите в `src/components/Pricing.jsx`

## 🚢 Deployment

### Требования

- Docker и Docker Compose на сервере
- Nginx для reverse proxy
- SSL сертификат (рекомендуется Let's Encrypt)

### Процесс деплоя

1. Настройте сервер (см. [DEPLOYMENT.md](./DEPLOYMENT.md))
2. Запустите `./deploy.sh`
3. Настройте Nginx reverse proxy
4. Настройте SSL сертификат

Полная инструкция: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🔒 Безопасность

- ✅ Все чувствительные данные в `.env` (не коммитятся)
- ✅ Security headers в nginx
- ✅ HTTPS ready
- ✅ Валидация форм на клиенте

## 📊 Performance

- ✅ Gzip compression
- ✅ Static asset caching
- ✅ Optimized images
- ✅ Code splitting
- ✅ Lazy loading

## 🤝 Contributing

Проект разработан для Юлии Поповой. Для предложений и улучшений создавайте issues.

## 📄 Лицензия

© 2024-2025 Юлия Попова. Все права защищены.

---

**Разработано с ❤️ для помощи людям в поиске своего пути**
