# Лендинг Юлии Поповой

Современный одностраничный лендинг для психолога, тьютора и профориентолога Юлии Поповой.

> 📖 **[Подробная инструкция по установке на локальный компьютер →](INSTALLATION.md)**

## Быстрый старт

```bash
# Клонировать проект
git clone https://github.com/ungattocinereo/Giulia.git
cd Giulia

# Установить зависимости и запустить
npm install && npm run dev

# Или запустить в Docker
docker compose up -d
```

## Технологии

- React 18
- Vite
- Tailwind CSS
- Lucide Icons

## Установка и запуск

### Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр production сборки
npm run preview
```

### Запуск в Docker

#### Production режим (с nginx)

```bash
# Сборка и запуск через docker-compose
docker-compose up -d

# Или напрямую через docker
docker build -t yulia-popova-landing .
docker run -d -p 8080:80 yulia-popova-landing

# Приложение будет доступно по адресу http://localhost:8080
```

#### Development режим (с hot-reload)

```bash
# Запуск dev-сервера в Docker с автоперезагрузкой
docker-compose --profile dev up dev

# Приложение будет доступно по адресу http://localhost:5173
```

#### Управление контейнерами

```bash
# Остановить контейнеры
docker-compose down

# Пересобрать образ
docker-compose build

# Просмотр логов
docker-compose logs -f
```

## Структура проекта

- `/src/App.jsx` - Основной компонент со всеми секциями
- `/src/index.css` - Глобальные стили и Tailwind
- `/src/main.jsx` - Точка входа React
- `/index.html` - HTML-шаблон

## Секции лендинга

1. **Header** - Навигация с плавным скроллом
2. **Hero** - Главный экран с CTA кнопками
3. **О себе** - Информация о специалисте
4. **Кому я могу помочь** - Целевая аудитория (дети, взрослые, родители)
5. **Мои услуги** - 3 пакета услуг с описанием
6. **Стоимость** - Pricing карточки
7. **FAQ** - Часто задаваемые вопросы
8. **Контакты** - Форма связи и контакты
9. **Footer** - Подвал с ссылками

## Что нужно заменить

После развёртывания замените следующие placeholder'ы на реальные данные:

- [ ] Логотип в header
- [ ] Фото в секции "О себе"
- [ ] Ссылки на соцсети:
  - Telegram: `https://t.me/username`
  - WhatsApp: `https://wa.me/79XXXXXXXXX`
  - VK: `https://vk.com/username`
  - Instagram: `https://instagram.com/username`
- [ ] Email: `julia@example.com`
- [ ] Телефон: `+7 XXX XXX XX XX`
- [ ] Реальные цены на услуги
- [ ] Интеграция с Telegram Bot API для формы (опционально)

## Особенности

- ✅ Полностью адаптивная вёрстка
- ✅ Плавный скролл к секциям
- ✅ Модальные окна для дополнительной информации
- ✅ Аккордеон в FAQ
- ✅ Валидация формы
- ✅ Hover-эффекты и анимации
- ✅ Accessibility (a11y)

## Цветовая схема

- Primary: `#6366F1` (Indigo)
- Secondary: `#8B5CF6` (Purple)
- Accent: `#10B981` (Green)

## Лицензия

© 2024 Юлия Попова. Все права защищены.
