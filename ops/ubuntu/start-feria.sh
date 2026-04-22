#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/srv/feria-app/current}"
ENV_FILE="${ENV_FILE:-/etc/feria/feria.env}"
NODE_BIN="${NODE_BIN:-/usr/bin/node}"

if [[ ! -x "$NODE_BIN" ]]; then
  echo "Node binary not found at $NODE_BIN" >&2
  exit 1
fi

if [[ ! -f "$APP_DIR/server.js" ]]; then
  echo "server.js not found under $APP_DIR" >&2
  exit 1
fi

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

cd "$APP_DIR"
exec "$NODE_BIN" server.js
