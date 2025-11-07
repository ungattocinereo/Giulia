# Этап 1: Сборка приложения
FROM node:18-alpine AS builder

# Установка рабочей директории
WORKDIR /app

# Копирование файлов зависимостей
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование остальных файлов проекта
COPY . .

# Сборка приложения
RUN npm run build

# Этап 2: Production образ с nginx
FROM nginx:alpine

# Копирование собранного приложения из builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Копирование кастомной конфигурации nginx для SPA
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Открытие порта
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]
