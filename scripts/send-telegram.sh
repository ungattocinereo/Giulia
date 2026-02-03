#!/bin/bash
# ВСЕ ошибки перенаправляем в stdout (чтобы webhook отправил их в браузер)
exec 2>&1

# Абсолютный путь к .env (важно!)
ENV_FILE="/home/greg/Giulia/.env"

# Проверяем, что файл существует и читается
if [ ! -f "$ENV_FILE" ]; then
  echo '{"error":"ENV file not found at /home/greg/Giulia/.env"}'
  exit 1
fi

# Загружаем переменные вручную (без xargs, который может падать)
TELEGRAM_BOT_TOKEN=$(grep "^TELEGRAM_BOT_TOKEN=" "$ENV_FILE" | cut -d'=' -f2- | tr -d '"')
TELEGRAM_CHAT_ID=$(grep "^TELEGRAM_CHAT_ID=" "$ENV_FILE" | cut -d'=' -f2- | tr -d '"')
RECAPTCHA_SECRET_KEY=$(grep "^RECAPTCHA_SECRET_KEY=" "$ENV_FILE" | cut -d'=' -f2- | tr -d '"')

# Проверяем, что переменные загрузились
if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
  echo '{"error":"TELEGRAM_BOT_TOKEN is empty or not found in .env"}'
  exit 1
fi

if [ -z "$TELEGRAM_CHAT_ID" ]; then
  echo '{"error":"TELEGRAM_CHAT_ID is empty or not found in .env"}'
  exit 1
fi

if [ -z "$RECAPTCHA_SECRET_KEY" ]; then
  echo '{"error":"RECAPTCHA_SECRET_KEY is empty or not found in .env"}'
  exit 1
fi

# Получаем payload из аргументов ($1)
PAYLOAD="$1"

if [ -z "$PAYLOAD" ]; then
  echo '{"error":"No payload received (empty $1)"}'
  exit 1
fi

# Парсим JSON (проверяем, что jq работает)
if ! command -v jq >/dev/null 2>&1; then
  echo '{"error":"jq not installed"}'
  exit 1
fi

MESSAGE=$(echo "$PAYLOAD" | jq -r '.message // empty')
RECAPTCHA_TOKEN=$(echo "$PAYLOAD" | jq -r '.recaptchaToken // empty')

if [ -z "$MESSAGE" ]; then
  echo '{"error":"Missing message in JSON payload"}'
  exit 1
fi

if [ -z "$RECAPTCHA_TOKEN" ]; then
  echo '{"error":"Missing recaptchaToken in JSON payload"}'
  exit 1
fi

# Проверяем reCAPTCHA
RECAPTCHA_RESULT=$(curl -s -X POST \
  "https://www.google.com/recaptcha/api/siteverify" \
  -d "secret=${RECAPTCHA_SECRET_KEY}" \
  -d "response=${RECAPTCHA_TOKEN}")

SUCCESS=$(echo "$RECAPTCHA_RESULT" | jq -r '.success // false')

if [ "$SUCCESS" != "true" ]; then
  ERROR_CODE=$(echo "$RECAPTCHA_RESULT" | jq -r '.["error-codes"][0] // "unknown"')
  echo "{\"error\":\"Recaptcha failed\", \"code\":\"$ERROR_CODE\"}"
  exit 1
fi

SCORE=$(echo "$RECAPTCHA_RESULT" | jq -r '.score // 0')

# Отправляем в Telegram
TG_RESULT=$(curl -s -X POST \
  "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{\"chat_id\":\"${TELEGRAM_CHAT_ID}\",\"text\":$(echo "$MESSAGE" | jq -Rs .),\"parse_mode\":\"HTML\"}")

if echo "$TG_RESULT" | jq -e '.ok' >/dev/null 2>&1; then
  echo "{\"success\":true, \"score\":$SCORE}"
else
  echo "{\"error\":\"Telegram API error\", \"response\":$(echo "$TG_RESULT" | jq -R .)}"
  exit 1
fi
