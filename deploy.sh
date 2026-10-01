#!/usr/bin/env bash
# Read-only preflight for the current Caddy deployment.
set -euo pipefail
if [ "${1:---check}" != '--check' ] || [ "$#" -gt 1 ]; then
  printf '%s\n' 'Usage: ./deploy.sh [--check]' 'See DEPLOYMENT.md for the production update procedure.' >&2
  exit 2
fi
SERVER_HOST="${POPOVATALK_SSH_HOST:-sweden}"
SERVER_PATH="${POPOVATALK_SERVER_PATH:-/srv/Giulia}"
printf -v REMOTE_PATH '%q' "$SERVER_PATH"
ssh -o BatchMode=yes -o ConnectTimeout=10 "$SERVER_HOST" "bash -s -- $REMOTE_PATH" <<'REMOTE'
set -euo pipefail
cd -- "$1"
printf '%s\n' 'Repository:'
git remote get-url origin
git status --short --branch
printf '%s\n' 'Runtime:'
node --version
npm --version
for tool in jq curl awk; do command -v "$tool" >/dev/null; done
bash -n redeploy.sh
bash -n scripts/send-telegram.sh
[ -r .env ]
[ -r /usr/local/lib/deploy-lib.sh ]
[ -s dist/index.html ]
# This payload cannot send a message, even with valid server credentials.
if result="$(bash scripts/send-telegram.sh '{}' 2>/dev/null)"; then
  printf '%s\n' 'Unexpected acceptance of an empty contact payload' >&2
  exit 1
fi
printf '%s' "$result" | jq -e '.error | startswith("Invalid payload") or startswith("Missing message")' >/dev/null
curl --silent --show-error --fail --max-time 15 -I https://popovatalk.ru/ >/dev/null
systemctl is-active caddy webhook
printf '%s\n' 'Preflight passed. Server files and services were not changed.'
REMOTE
