# Полная инструкция по установке проекта на локальный компьютер

## Содержание
1. [Системные требования](#системные-требования)
2. [Установка необходимого ПО](#установка-необходимого-по)
3. [Клонирование проекта](#клонирование-проекта)
4. [Запуск без Docker](#запуск-без-docker)
5. [Запуск с Docker](#запуск-с-docker)
6. [Проверка работы](#проверка-работы)
7. [Возможные проблемы и решения](#возможные-проблемы-и-решения)

---

## Системные требования

- **Операционная система**: Windows 10/11, macOS, или Linux
- **Свободное место на диске**: минимум 500 МБ
- **Оперативная память**: минимум 4 ГБ (рекомендуется 8 ГБ)

---

## Установка необходимого ПО

### Вариант 1: Запуск без Docker (рекомендуется для разработки)

#### Шаг 1: Установка Node.js

**Windows:**
1. Перейдите на https://nodejs.org/
2. Скачайте LTS версию (рекомендуется версия 18.x или выше)
3. Запустите установщик и следуйте инструкциям
4. Проверьте установку, открыв командную строку (Win + R → cmd) и введите:
   ```cmd
   node --version
   npm --version
   ```

**macOS:**
```bash
# Через Homebrew (если установлен)
brew install node

# Или скачайте с https://nodejs.org/
```

**Linux (Ubuntu/Debian):**
```bash
# Обновите пакеты
sudo apt update

# Установите Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Проверьте установку
node --version
npm --version
```

#### Шаг 2: Установка Git

**Windows:**
1. Скачайте Git с https://git-scm.com/download/win
2. Запустите установщик
3. Следуйте инструкциям (можно оставить настройки по умолчанию)

**macOS:**
```bash
# Git обычно уже установлен, но можно обновить через Homebrew
brew install git
```

**Linux:**
```bash
sudo apt install git
```

Проверьте установку:
```bash
git --version
```

---

### Вариант 2: Запуск с Docker (рекомендуется для продакшена)

#### Установка Docker

**Windows:**
1. Скачайте Docker Desktop с https://www.docker.com/products/docker-desktop
2. Запустите установщик
3. Перезагрузите компьютер после установки
4. Запустите Docker Desktop

**macOS:**
1. Скачайте Docker Desktop с https://www.docker.com/products/docker-desktop
2. Перетащите Docker.app в папку Applications
3. Запустите Docker Desktop

**Linux (Ubuntu):**
```bash
# Удалите старые версии
sudo apt remove docker docker-engine docker.io containerd runc

# Установите зависимости
sudo apt update
sudo apt install ca-certificates curl gnupg lsb-release

# Добавьте официальный GPG ключ Docker
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Добавьте репозиторий
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Установите Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Добавьте пользователя в группу docker
sudo usermod -aG docker $USER
newgrp docker
```

Проверьте установку:
```bash
docker --version
docker compose version
```

---

## Клонирование проекта

### Через HTTPS (рекомендуется)

Откройте терминал (или командную строку) и выполните:

```bash
# Перейдите в папку, где хотите разместить проект
cd ~/Documents  # Linux/macOS
# или
cd C:\Users\ВашеИмя\Documents  # Windows

# Клонируйте репозиторий
git clone https://github.com/ungattocinereo/Giulia.git

# Перейдите в папку проекта
cd Giulia
```

### Через SSH (если настроен SSH-ключ)

```bash
git clone git@github.com:ungattocinereo/Giulia.git
cd Giulia
```

### Скачать архивом (без Git)

1. Перейдите на https://github.com/ungattocinereo/Giulia
2. Нажмите зелёную кнопку "Code"
3. Выберите "Download ZIP"
4. Распакуйте архив в нужную папку
5. Откройте терминал в этой папке

---

## Запуск без Docker

### Шаг 1: Установка зависимостей

В терминале, находясь в папке проекта, выполните:

```bash
npm install
```

Это займёт несколько минут. Будут установлены все необходимые библиотеки.

### Шаг 2: Запуск в режиме разработки

```bash
npm run dev
```

Вы увидите вывод примерно такого вида:
```
  VITE v5.0.0  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Шаг 3: Открытие в браузере

Откройте браузер и перейдите по адресу:
```
http://localhost:5173
```

Вы должны увидеть работающий лендинг Юлии Поповой!

### Остановка сервера разработки

Нажмите `Ctrl + C` в терминале

---

## Запуск с Docker

Docker позволяет запустить приложение в изолированном окружении без установки Node.js.

### Способ 1: Production режим (с Nginx)

```bash
# Находясь в папке проекта, выполните:
docker compose up -d
```

При первом запуске Docker:
1. Скачает необходимые образы (Node.js, Nginx)
2. Соберёт приложение
3. Запустит контейнер

Это может занять 5-10 минут при первом запуске.

Откройте браузер:
```
http://localhost:8080
```

**Просмотр логов:**
```bash
docker compose logs -f
```

**Остановка:**
```bash
docker compose down
```

### Способ 2: Development режим (с hot-reload)

```bash
docker compose --profile dev up dev
```

Откройте браузер:
```
http://localhost:5173
```

---

## Запуск с Docker (прямые команды)

Если предпочитаете использовать Docker напрямую:

```bash
# Сборка образа
docker build -t yulia-popova-landing .

# Запуск контейнера
docker run -d -p 8080:80 --name yulia-site yulia-popova-landing

# Остановка
docker stop yulia-site

# Удаление контейнера
docker rm yulia-site
```

---

## Проверка работы

После запуска проекта (любым способом) вы должны увидеть:

✅ Главную страницу с фото и заголовком
✅ Навигационное меню вверху
✅ Секции: О себе, Услуги, Цены, FAQ, Контакты
✅ Плавную прокрутку при клике на пункты меню
✅ Адаптивный дизайн (попробуйте изменить размер окна)

---

## Сборка для продакшена (без Docker)

Если хотите создать оптимизированную версию для размещения на хостинге:

```bash
# Соберите проект
npm run build

# Папка dist/ будет содержать готовые файлы
```

Содержимое папки `dist/` можно загрузить на любой хостинг.

**Предпросмотр production сборки:**
```bash
npm run preview
```

---

## Возможные проблемы и решения

### Проблема 1: `npm install` выдаёт ошибку

**Решение:**
```bash
# Очистите кэш npm
npm cache clean --force

# Удалите node_modules и package-lock.json
rm -rf node_modules package-lock.json  # Linux/macOS
# или
rmdir /s node_modules & del package-lock.json  # Windows

# Переустановите зависимости
npm install
```

### Проблема 2: Порт 5173 уже занят

**Решение:**
```bash
# Запустите на другом порту
npm run dev -- --port 3000
```

### Проблема 3: Docker выдаёт ошибку "Cannot connect to Docker daemon"

**Решение (Linux):**
```bash
# Убедитесь, что Docker запущен
sudo systemctl start docker

# Добавьте пользователя в группу docker
sudo usermod -aG docker $USER
newgrp docker
```

**Решение (Windows/macOS):**
- Запустите Docker Desktop
- Дождитесь, пока в трее появится зелёный индикатор

### Проблема 4: Не открывается в браузере

**Решение:**
1. Убедитесь, что сервер запущен (смотрите вывод в терминале)
2. Попробуйте другой браузер
3. Очистите кэш браузера (Ctrl + Shift + Delete)
4. Попробуйте `http://127.0.0.1:5173` вместо `localhost`

### Проблема 5: Изменения не применяются

**Решение (без Docker):**
- Проверьте, что сервер запущен через `npm run dev`
- Сохраните файл (Ctrl + S)
- Подождите несколько секунд
- Обновите страницу в браузере (F5)

**Решение (с Docker):**
- Убедитесь, что используете dev режим: `docker compose --profile dev up dev`
- Для production режима нужна пересборка: `docker compose build && docker compose up -d`

### Проблема 6: Ошибка "EACCES" при установке (Linux/macOS)

**Решение:**
```bash
# НЕ используйте sudo для npm install!
# Вместо этого настройте npm:
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

## Быстрый старт для нетерпеливых

```bash
# 1. Клонируйте проект
git clone https://github.com/ungattocinereo/Giulia.git
cd Giulia

# 2. Установите зависимости
npm install

# 3. Запустите
npm run dev

# 4. Откройте http://localhost:5173
```

Или с Docker в одну команду:
```bash
git clone https://github.com/ungattocinereo/Giulia.git && cd Giulia && docker compose up -d
# Откройте http://localhost:8080
```

---

## Дополнительная помощь

Если возникли проблемы:

1. Проверьте версии:
   ```bash
   node --version  # должно быть 18.x или выше
   npm --version   # должно быть 9.x или выше
   ```

2. Убедитесь, что вы в правильной папке:
   ```bash
   ls -la  # Linux/macOS
   dir     # Windows
   # Должны видеть файлы: package.json, index.html, src/
   ```

3. Откройте issue на GitHub: https://github.com/ungattocinereo/Giulia/issues

---

**Готово! Приятной работы с проектом! 🎉**
