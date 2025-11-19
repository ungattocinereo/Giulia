# 🚀 Deployment Guide - Popova Website

Полное руководство по развертыванию сайта Юлии Поповой на Ubuntu сервере с использованием Docker.

## 📋 Содержание

- [Предварительные требования](#предварительные-требования)
- [Быстрый старт](#быстрый-старт)
- [Подробная инструкция](#подробная-инструкция)
- [Настройка Nginx на сервере](#настройка-nginx-на-сервере)
- [Управление контейнером](#управление-контейнером)
- [Обновление сайта](#обновление-сайта)
- [Устранение неполадок](#устранение-неполадок)

---

## Предварительные требования

### На вашем локальном компьютере:

- ✅ Docker Desktop установлен и запущен
- ✅ SSH доступ к серверу (root@185.250.36.158)
- ✅ rsync установлен (обычно предустановлен на macOS)

### На сервере Ubuntu (185.250.36.158):

- ✅ Docker и Docker Compose установлены
- ✅ Nginx установлен и настроен
- ✅ Директория `/var/www/popova.cinereo.it` создана

> [!NOTE]
> Если Docker не установлен на сервере, см. раздел [Установка Docker](#установка-docker-на-сервере)

---

## Быстрый старт

Если у вас уже всё настроено, просто выполните:

```bash
cd /Users/greg/Documents/Programming/Giulia
chmod +x deploy.sh
./deploy.sh
```

Скрипт автоматически:
1. Соберет Docker образ
2. Предложит протестировать локально
3. Загрузит файлы на сервер
4. Запустит контейнер
5. Проверит работоспособность

После этого переходите к [настройке Nginx](#настройка-nginx-на-сервере).

---

## Подробная инструкция

### Шаг 1: Подготовка проекта

Убедитесь, что все файлы на месте:

```bash
cd /Users/greg/Documents/Programming/Giulia
ls -la
```

Должны быть файлы:
- `Dockerfile`
- `docker-compose.yml`
- `nginx.conf`
- `.dockerignore`
- `deploy.sh`

### Шаг 2: Локальное тестирование (опционально)

Перед деплоем на сервер, протестируйте локально:

```bash
# Собрать образ
docker build -t popova-website .

# Запустить контейнер
docker run -d --name popova-test -p 3001:80 popova-website

# Открыть в браузере
open http://localhost:3001

# Проверить логи
docker logs popova-test

# Остановить и удалить
docker stop popova-test
docker rm popova-test
```

### Шаг 3: Деплой на сервер

#### Автоматический деплой (рекомендуется):

```bash
chmod +x deploy.sh
./deploy.sh
```

#### Ручной деплой:

```bash
# 1. Загрузить файлы на сервер
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude 'dist' \
    ./ root@185.250.36.158:/var/www/popova.cinereo.it/

# 2. Подключиться к серверу
ssh root@185.250.36.158

# 3. Перейти в директорию проекта
cd /var/www/popova.cinereo.it

# 4. Собрать и запустить контейнер
docker-compose up -d --build

# 5. Проверить статус
docker-compose ps

# 6. Проверить логи
docker-compose logs

# 7. Проверить health endpoint
curl http://localhost:3001/health
```

---

## Настройка Nginx на сервере

После успешного запуска контейнера, настройте Nginx для проксирования запросов.

### Создание конфигурации Nginx

```bash
# Подключиться к серверу
ssh root@185.250.36.158

# Создать конфигурационный файл
nano /etc/nginx/sites-available/popova.cinereo.it
```

Вставьте следующую конфигурацию:

```nginx
server {
    listen 80;
    server_name popova.cinereo.it www.popova.cinereo.it;

    # Логи
    access_log /var/log/nginx/popova.cinereo.it.access.log;
    error_log /var/log/nginx/popova.cinereo.it.error.log;

    # Проксирование к Docker контейнеру
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Активация конфигурации

```bash
# Создать символическую ссылку
ln -s /etc/nginx/sites-available/popova.cinereo.it /etc/nginx/sites-enabled/

# Проверить конфигурацию
nginx -t

# Перезагрузить Nginx
systemctl reload nginx
```

### Настройка SSL (HTTPS)

Если у вас уже настроен Certbot:

```bash
# Получить SSL сертификат
certbot --nginx -d popova.cinereo.it -d www.popova.cinereo.it

# Certbot автоматически обновит конфигурацию Nginx
```

Если Certbot не установлен:

```bash
# Установить Certbot
apt update
apt install certbot python3-certbot-nginx

# Получить сертификат
certbot --nginx -d popova.cinereo.it -d www.popova.cinereo.it
```

---

## Управление контейнером

Все команды выполняются на сервере в директории `/var/www/popova.cinereo.it`:

### Просмотр статуса

```bash
docker-compose ps
```

### Просмотр логов

```bash
# Все логи
docker-compose logs

# Последние 100 строк
docker-compose logs --tail=100

# Следить за логами в реальном времени
docker-compose logs -f
```

### Перезапуск контейнера

```bash
docker-compose restart
```

### Остановка контейнера

```bash
docker-compose stop
```

### Запуск контейнера

```bash
docker-compose start
```

### Полная остановка и удаление

```bash
docker-compose down
```

### Пересборка контейнера

```bash
docker-compose up -d --build
```

---

## Обновление сайта

### Обновление кода

Когда вы внесли изменения в код:

```bash
# На локальном компьютере
cd /Users/greg/Documents/Programming/Giulia
./deploy.sh
```

Скрипт автоматически:
1. Соберет новый образ
2. Загрузит изменения на сервер
3. Пересоберет и перезапустит контейнер

### Обновление только изображений

Изображения монтируются как volume, поэтому их можно обновлять без пересборки:

```bash
# Загрузить новые изображения
rsync -avz ./public/images/ root@185.250.36.158:/var/www/popova.cinereo.it/public/images/

# Перезапустить контейнер (опционально)
ssh root@185.250.36.158 "cd /var/www/popova.cinereo.it && docker-compose restart"
```

---

## Устранение неполадок

### Контейнер не запускается

```bash
# Проверить логи
docker-compose logs

# Проверить, не занят ли порт 3001
netstat -tlnp | grep 3001

# Пересобрать с нуля
docker-compose down
docker-compose up -d --build --force-recreate
```

### Сайт не открывается

```bash
# 1. Проверить, работает ли контейнер
docker-compose ps

# 2. Проверить health endpoint
curl http://localhost:3001/health

# 3. Проверить конфигурацию Nginx
nginx -t

# 4. Проверить логи Nginx
tail -f /var/log/nginx/popova.cinereo.it.error.log

# 5. Проверить, слушает ли Nginx на 80/443
netstat -tlnp | grep nginx
```

### Изображения не отображаются

```bash
# Проверить, что директория images существует
ls -la /var/www/popova.cinereo.it/public/images/

# Проверить права доступа
chmod -R 755 /var/www/popova.cinereo.it/public/images/

# Проверить монтирование volume
docker-compose exec popova-website ls -la /usr/share/nginx/html/images/
```

### Проблемы с SSL

```bash
# Проверить статус сертификата
certbot certificates

# Обновить сертификат
certbot renew

# Проверить автообновление
systemctl status certbot.timer
```

### Очистка Docker (освобождение места)

```bash
# Удалить неиспользуемые образы
docker image prune -a

# Удалить неиспользуемые контейнеры
docker container prune

# Полная очистка (осторожно!)
docker system prune -a
```

---

## Установка Docker на сервере

Если Docker еще не установлен на сервере:

```bash
# Подключиться к серверу
ssh root@185.250.36.158

# Обновить пакеты
apt update
apt upgrade -y

# Установить зависимости
apt install -y apt-transport-https ca-certificates curl software-properties-common

# Добавить GPG ключ Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Добавить репозиторий Docker
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Установить Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io

# Установить Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Проверить установку
docker --version
docker-compose --version

# Запустить Docker
systemctl start docker
systemctl enable docker
```

---

## Полезные команды

### Мониторинг

```bash
# Использование ресурсов контейнером
docker stats popova-website

# Проверка дискового пространства
df -h

# Размер Docker образов
docker images
```

### Бэкап

```bash
# Создать бэкап директории проекта
tar -czf popova-backup-$(date +%Y%m%d).tar.gz /var/www/popova.cinereo.it

# Скачать бэкап на локальный компьютер
scp root@185.250.36.158:/root/popova-backup-*.tar.gz ~/Downloads/
```

### Быстрый доступ к серверу

Добавьте в `~/.ssh/config` на локальном компьютере:

```
Host popova
    HostName 185.250.36.158
    User root
    IdentityFile ~/.ssh/id_rsa
```

Теперь можно подключаться просто: `ssh popova`

---

## Контакты и поддержка

Если возникли проблемы:

1. Проверьте раздел [Устранение неполадок](#устранение-неполадок)
2. Посмотрите логи: `docker-compose logs`
3. Проверьте статус: `docker-compose ps`

---

## Структура проекта на сервере

```
/var/www/popova.cinereo.it/
├── Dockerfile              # Конфигурация Docker образа
├── docker-compose.yml      # Конфигурация Docker Compose
├── nginx.conf             # Конфигурация Nginx для контейнера
├── package.json           # Зависимости Node.js
├── vite.config.js         # Конфигурация Vite
├── tailwind.config.js     # Конфигурация Tailwind CSS
├── src/                   # Исходный код React
├── public/
│   └── images/           # Изображения (монтируется как volume)
└── dist/                 # Собранные файлы (создается при сборке)
```

---

**Успешного деплоя! 🚀**
