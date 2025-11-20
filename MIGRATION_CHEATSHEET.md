# 🚀 Быстрая шпаргалка по миграции

## На сервере (185.250.36.158)

### 1. Остановка старого проекта
```bash
ssh root@185.250.36.158

# Остановить и удалить старый контейнер
cd /var/www/popova.cinereo.it
docker-compose down

# Удалить Nginx конфиг
rm /etc/nginx/sites-enabled/popova.cinereo.it
rm /etc/nginx/sites-available/popova.cinereo.it
nginx -t && systemctl reload nginx
```

### 2. Создать конфиг Nginx для нового домена
```bash
nano /etc/nginx/sites-available/popovatalk.ru
```

Вставить:
```nginx
server {
    listen 80;
    server_name popovatalk.ru www.popovatalk.ru;
    access_log /var/log/nginx/popovatalk.ru.access.log;
    error_log /var/log/nginx/popovatalk.ru.error.log;

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
    client_max_body_size 10M;
}
```

Активировать:
```bash
ln -s /etc/nginx/sites-available/popovatalk.ru /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

## На локальном компьютере

### 3. Деплой на новый домен
```bash
cd /Users/greg/Documents/Programming/Giulia
./deploy.sh
```

## Снова на сервере

### 4. Получить SSL сертификат
```bash
ssh root@185.250.36.158
certbot --nginx -d popovatalk.ru -d www.popovatalk.ru
```

### 5. Проверка
```bash
# Проверить контейнер
docker ps | grep popova

# Проверить сайт
curl -I https://popovatalk.ru

# Проверить логи
cd /var/www/popovatalk.ru
docker-compose logs
```

## Очистка (опционально)

```bash
# Создать бэкап
tar -czf /root/popova-cinereo-backup.tar.gz /var/www/popova.cinereo.it

# Удалить старую директорию
rm -rf /var/www/popova.cinereo.it
```

---

**Готово! Сайт работает на https://popovatalk.ru** 🎉
