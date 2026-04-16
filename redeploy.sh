#!/bin/bash
# Deploy script for popovatalk.ru
# Triggered by github webhook: /hooks/redeploy-popovatalk-ru
# Uses shared library at /usr/local/lib/deploy-lib.sh
source /usr/local/lib/deploy-lib.sh

deploy::init /home/greg/Giulia
deploy::fetch popovatalk_ru_alpha
deploy::npm_ci
deploy::build_atomic 'npx vite build --outDir' dist
deploy::healthcheck https://popovatalk.ru/
deploy::cleanup_old dist 3
