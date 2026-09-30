#!/usr/bin/env bash
# Called by webhook with the complete JSON payload as its first argument.
set -euo pipefail
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${POPOVATALK_ENV_FILE:-$SCRIPT_DIR/../.env}"

fail() {
  printf '{"error":"%s"}\n' "$1"
  exit 1
}

for tool in jq curl awk; do
  command -v "$tool" >/dev/null 2>&1 || fail 'Required server utility is missing'
done
[ -r "$ENV_FILE" ] || fail 'Server configuration is unavailable'

# Read literal values without evaluating the .env as shell code.
read_env() {
  awk -v key="$1" '
    { sub(/\r$/, "") }
    $0 ~ "^[[:space:]]*" key "=" {
      sub("^[[:space:]]*" key "=", "")
      sub(/^[[:space:]]+/, ""); sub(/[[:space:]]+$/, "")
      if (($0 ~ /^"/ && $0 ~ /"$/) || ($0 ~ /^\047/ && $0 ~ /\047$/)) {
        $0 = substr($0, 2, length($0)-2)
      }
      print; exit
    }
  ' "$ENV_FILE"
}
TELEGRAM_BOT_TOKEN="$(read_env TELEGRAM_BOT_TOKEN)"
TELEGRAM_CHAT_ID="$(read_env TELEGRAM_CHAT_ID)"
RECAPTCHA_SECRET_KEY="$(read_env RECAPTCHA_SECRET_KEY)"
[ -n "$TELEGRAM_BOT_TOKEN" ] && [ -n "$TELEGRAM_CHAT_ID" ] && [ -n "$RECAPTCHA_SECRET_KEY" ] || fail 'Server configuration is incomplete'

PAYLOAD="${1:-}"
# jq requires exactly one object, nonempty string fields, and a bounded message.
if ! printf '%s' "$PAYLOAD" | jq -es '
  length == 1 and (.[0] | type == "object" and
  (.message | type == "string" and test("\\S") and length <= 32768) and
  (.recaptchaToken | type == "string" and length > 0))
' >/dev/null 2>&1; then
  fail 'Invalid payload: message and recaptchaToken are required'
fi
MESSAGE="$(printf '%s' "$PAYLOAD" | jq -r '.message')"
RECAPTCHA_TOKEN="$(printf '%s' "$PAYLOAD" | jq -r '.recaptchaToken')"

if ! RECAPTCHA_RESULT="$(curl --silent --show-error --fail --connect-timeout 5 --max-time 15 \
  -X POST 'https://www.google.com/recaptcha/api/siteverify' \
  --data-urlencode "secret=$RECAPTCHA_SECRET_KEY" \
  --data-urlencode "response=$RECAPTCHA_TOKEN" 2>/dev/null)"; then
  fail 'reCAPTCHA verification is unavailable'
fi
if ! printf '%s' "$RECAPTCHA_RESULT" | jq -e '.success == true' >/dev/null 2>&1; then
  fail 'reCAPTCHA verification failed'
fi
# Preserve the existing acceptance policy: score is returned but not used as a gate.
SCORE="$(printf '%s' "$RECAPTCHA_RESULT" | jq -r '.score // 0')"
TG_PAYLOAD="$(jq -n --arg chat "$TELEGRAM_CHAT_ID" --arg text "$MESSAGE" \
  '{chat_id: $chat, text: $text, parse_mode: "HTML"}')"
if ! TG_RESULT="$(curl --silent --show-error --fail --connect-timeout 5 --max-time 20 \
  -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -H 'Content-Type: application/json' --data "$TG_PAYLOAD" 2>/dev/null)"; then
  fail 'Telegram delivery could not be confirmed'
fi
if ! printf '%s' "$TG_RESULT" | jq -e '.ok == true' >/dev/null 2>&1; then
  fail 'Telegram delivery could not be confirmed'
fi
jq -n --argjson score "$SCORE" '{success: true, score: $score}'
