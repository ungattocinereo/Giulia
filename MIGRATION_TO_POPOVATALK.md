# 🚀 Миграция на popovatalk.ru

Подробная инструкция по переносу проекта с временного домена `popova.cinereo.it` на основной домен `popovatalk.ru`.

> [!IMPORTANT]
> На сервере работают другие проекты в Docker. Будьте внимательны и удаляйте только контейнеры, связанные с этим проектом!

---

## 📋 План миграции

1. ✅ Остановить старый контейнер на `popova.cinereo.it`
2. ✅ Удалить старый контейнер и конфигурацию Nginx
3. ✅ Развернуть проект в новой директории `/var/www/popovatalk.ru`
4. ✅ Настроить Nginx для нового домена
5. ✅ Получить SSL сертификат для `popovatalk.ru`
6. ✅ Проверить работоспособность

---

## 🔴 ШАГ 1: Остановка и удаление старого проекта

### 1.1. Подключитесь к серверу

```bash
ssh root@185.250.36.158
```

### 1.2. Проверьте текущие контейнеры

```bash
# Посмотреть все запущенные контейнеры
docker ps

# Найти контейнер popova-website
docker ps | grep popova
```

### 1.3. Остановите и удалите старый контейнер

```bash
# Перейти в старую директорию
cd /var/www/popova.cinereo.it

# Остановить и удалить контейнер через docker-compose
docker-compose down

# Проверить, что контейнер удален
docker ps -a | grep popova
```

> [!NOTE]
> Команда `docker-compose down` остановит и удалит только контейнеры, определенные в `docker-compose.yml` этой директории. Другие проекты не будут затронуты.

### 1.4. Удалите конфигурацию Nginx для старого домена

```bash
# Удалить символическую ссылку из sites-enabled
rm /etc/nginx/sites-enabled/popova.cinereo.it

# Удалить конфигурационный файл (опционально, можно оставить как бэкап)
rm /etc/nginx/sites-available/popova.cinereo.it

# Проверить конфигурацию Nginx
nginx -t

# Перезагрузить Nginx
systemctl reload nginx
```

### 1.5. Проверьте, что старый контейнер полностью удален

```bash
# Проверить контейнеры
docker ps -a | grep popova

# Проверить образы (опционально можно удалить старый образ)
docker images | grep popova

# Удалить старый образ (опционально)
docker rmi popova-website:latest
```

---

## 🟢 ШАГ 2: Развертывание на новом домене

### 2.1. Создайте новую директорию (уже создана)

```bash
# Проверить, что директория существует
ls -la /var/www/popovatalk.ru

# Если не существует, создать
mkdir -p /var/www/popovatalk.ru
```

### 2.2. Обновите скрипт деплоя на локальном компьютере

На вашем **локальном компьютере** откройте файл `deploy.sh` и измените:

```bash
# Было:
SERVER_PATH="/var/www/popova.cinereo.it"

# Стало:
SERVER_PATH="/var/www/popovatalk.ru"
```

### 2.3. Обновите docker-compose.yml (опционально)

Можно изменить имя контейнера для ясности:

```yaml
services:
  popova-website:
    build: .
    container_name: popovatalk-website  # Изменено
    ports:
      - "3001:80"
    restart: unless-stopped
    volumes:
      - ./public/images:/usr/share/nginx/html/images:ro
    environment:
      - NODE_ENV=production
```

### 2.4. Запустите деплой с локального компьютера

```bash
# На локальном компьютере
cd /Users/greg/Documents/Programming/Giulia

# Сделать скрипт исполняемым
chmod +x deploy.sh

# Запустить деплой
./deploy.sh
```

Скрипт автоматически:
- Соберет Docker образ
- Загрузит файлы в `/var/www/popovatalk.ru`
- Запустит контейнер на порту 3001

---

## 🌐 ШАГ 3: Настройка Nginx для popovatalk.ru

### 3.1. Создайте конфигурацию Nginx

На **сервере** создайте новый конфигурационный файл:

```bash
nano /etc/nginx/sites-available/popovatalk.ru
```

### 3.2. Вставьте следующую конфигурацию

```nginx
server {
    listen 80;
    server_name popovatalk.ru www.popovatalk.ru;

    # Логи
    access_log /var/log/nginx/popovatalk.ru.access.log;
    error_log /var/log/nginx/popovatalk.ru.error.log;

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
        
        # Дополнительные заголовки безопасности
        proxy_set_header X-Frame-Options "SAMEORIGIN";
        proxy_set_header X-Content-Type-Options "nosniff";
        proxy_set_header X-XSS-Protection "1; mode=block";
    }

    # Увеличенный размер загружаемых файлов (если нужно)
    client_max_body_size 10M;
}
```

### 3.3. Активируйте конфигурацию

```bash
# Создать символическую ссылку
ln -s /etc/nginx/sites-available/popovatalk.ru /etc/nginx/sites-enabled/

# Проверить конфигурацию Nginx
nginx -t

# Если всё OK, перезагрузить Nginx
systemctl reload nginx
```

### 3.4. Проверьте доступность сайта

```bash
# Проверить, что контейнер работает
docker ps | grep popovatalk

# Проверить локально на сервере
curl http://localhost:3001

# Проверить через Nginx
curl -I http://popovatalk.ru
```

Теперь сайт должен быть доступен по адресу: **http://popovatalk.ru**

---

## 🔒 ШАГ 4: Настройка SSL сертификата

### 4.1. Получите SSL сертификат через Certbot

```bash
# Получить сертификат для popovatalk.ru
certbot --nginx -d popovatalk.ru -d www.popovatalk.ru
```

Certbot автоматически:
- Получит сертификат от Let's Encrypt
- Обновит конфигурацию Nginx
- Настроит редирект с HTTP на HTTPS

### 4.2. Проверьте SSL

```bash
# Проверить статус сертификата
certbot certificates

# Проверить сайт через HTTPS
curl -I https://popovatalk.ru
```

### 4.3. Проверьте автообновление сертификата

```bash
# Проверить таймер автообновления
systemctl status certbot.timer

# Тестовое обновление (dry-run)
certbot renew --dry-run
```

---

## ✅ ШАГ 5: Финальная проверка

### 5.1. Проверьте работу контейнера

```bash
# Статус контейнера
docker ps | grep popovatalk

# Логи контейнера
docker logs popovatalk-website

# Или через docker-compose
cd /var/www/popovatalk.ru
docker-compose logs
```

### 5.2. Проверьте сайт в браузере

Откройте в браузере:
- ✅ https://popovatalk.ru
- ✅ https://www.popovatalk.ru
- ✅ Проверьте, что SSL работает (замочек в адресной строке)
- ✅ Проверьте все секции сайта
- ✅ Проверьте форму обратной связи

### 5.3. Проверьте SEO meta-теги

```bash
# Проверить meta-теги
curl -s https://popovatalk.ru | grep -i "og:image"
curl -s https://popovatalk.ru | grep -i "twitter:card"
```

---

## 🔧 Управление новым проектом

### Просмотр логов

```bash
ssh root@185.250.36.158
cd /var/www/popovatalk.ru
docker-compose logs -f
```

### Перезапуск контейнера

```bash
ssh root@185.250.36.158
cd /var/www/popovatalk.ru
docker-compose restart
```

### Обновление сайта

На локальном компьютере:

```bash
cd /Users/greg/Documents/Programming/Giulia
./deploy.sh
```

### Остановка контейнера

```bash
ssh root@185.250.36.158
cd /var/www/popovatalk.ru
docker-compose down
```

---

## 🗑️ Очистка старых файлов (опционально)

После успешной миграции можно удалить старую директорию:

```bash
# НА СЕРВЕРЕ
# Создать бэкап на всякий случай
tar -czf /root/popova.cinereo.it-backup-$(date +%Y%m%d).tar.gz /var/www/popova.cinereo.it

# Удалить старую директорию
rm -rf /var/www/popova.cinereo.it
```

---

## 📝 Обновление meta-тегов

Не забудьте обновить URL в `index.html`:

```html
<!-- Было -->
<meta property="og:url" content="https://popova.cinereo.it/" />
<meta name="twitter:url" content="https://popova.cinereo.it/" />
<link rel="canonical" href="https://popova.cinereo.it/" />

<!-- Стало -->
<meta property="og:url" content="https://popovatalk.ru/" />
<meta name="twitter:url" content="https://popovatalk.ru/" />
<link rel="canonical" href="https://popovatalk.ru/" />
```

И обновите изображение для социальных сетей:

```html
<!-- Было -->
<meta property="og:image" content="https://popova.cinereo.it/images/popova-001.png" />
<meta name="twitter:image" content="https://popova.cinereo.it/images/popova-001.png" />

<!-- Стало -->
<meta property="og:image" content="https://popovatalk.ru/images/popova-001.png" />
<meta name="twitter:image" content="https://popovatalk.ru/images/popova-001.png" />
```

---

## 🚨 Проверка безопасности

### Убедитесь, что затронуты только нужные контейнеры

```bash
# Посмотреть ВСЕ контейнеры на сервере
docker ps -a

# Посмотреть только запущенные
docker ps

# Посмотреть используемые порты
netstat -tlnp | grep docker
```

> [!CAUTION]
> Перед выполнением команд `docker-compose down` ВСЕГДА проверяйте, что вы находитесь в правильной директории проекта!

---

## 📊 Мониторинг

### Проверка ресурсов

```bash
# Использование ресурсов контейнером
docker stats popovatalk-website

# Дисковое пространство
df -h

# Размер образов Docker
docker images
```

---

## ❓ Устранение неполадок

### Контейнер не запускается

```bash
cd /var/www/popovatalk.ru
docker-compose logs
docker-compose down
docker-compose up -d --build --force-recreate
```

### Порт 3001 занят

```bash
# Проверить, что использует порт 3001
netstat -tlnp | grep 3001

# Если это старый контейнер, остановить его
docker stop <container_id>
```

### Nginx не может подключиться к контейнеру

```bash
# Проверить, что контейнер слушает на 3001
docker ps | grep 3001

# Проверить локально
curl http://localhost:3001

# Проверить логи Nginx
tail -f /var/log/nginx/popovatalk.ru.error.log
```

---

## ✅ Чеклист миграции

- [ ] Остановлен старый контейнер `popova-website`
- [ ] Удалена конфигурация Nginx для `popova.cinereo.it`
- [ ] Обновлен `deploy.sh` с новым путем
- [ ] Проект развернут в `/var/www/popovatalk.ru`
- [ ] Создана конфигурация Nginx для `popovatalk.ru`
- [ ] Получен SSL сертификат
- [ ] Сайт доступен по HTTPS
- [ ] Обновлены meta-теги в `index.html`
- [ ] Проверена форма обратной связи
- [ ] Создан бэкап старой директории
- [ ] Удалена старая директория (опционально)

---

**Успешной миграции! 🚀**

Если возникнут вопросы, проверьте логи:
```bash
docker-compose logs -f
tail -f /var/log/nginx/popovatalk.ru.error.log
```
