#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/srv/feria-app/current}"
SERVICE_NAME="${SERVICE_NAME:-feria.service}"
SYSTEMD_PATH="/etc/systemd/system/${SERVICE_NAME}"
NGINX_AVAILABLE="/etc/nginx/sites-available/feria.conf"
NGINX_ENABLED="/etc/nginx/sites-enabled/feria.conf"
ENV_DIR="${ENV_DIR:-/etc/feria}"
ENV_FILE="${ENV_DIR}/feria.env"
REPO_DIR="${REPO_DIR:-$(pwd)}"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run this script as root or with sudo." >&2
  exit 1
fi

mkdir -p "$APP_DIR" "$ENV_DIR"
rsync -a --delete \
  --exclude '.git/' \
  --exclude 'node_modules/' \
  --exclude 'data/state.json' \
  "$REPO_DIR/" "$APP_DIR/"

chmod +x "$APP_DIR/ops/ubuntu/start-feria.sh"

install -m 0644 "$REPO_DIR/ops/systemd/feria.service.example" "$SYSTEMD_PATH"
install -m 0644 "$REPO_DIR/ops/nginx/feria.conf.example" "$NGINX_AVAILABLE"

if [[ ! -e "$NGINX_ENABLED" ]]; then
  ln -s "$NGINX_AVAILABLE" "$NGINX_ENABLED"
fi

if [[ ! -f "$ENV_FILE" ]]; then
  install -m 0640 "$REPO_DIR/.env.example" "$ENV_FILE"
  echo "Created $ENV_FILE from .env.example. Fill real values before exposing the service." >&2
fi

systemctl daemon-reload
systemctl enable "$SERVICE_NAME"
systemctl restart "$SERVICE_NAME"
nginx -t
systemctl reload nginx

echo "Deployment complete."
echo "Service status: systemctl status ${SERVICE_NAME}"
echo "Logs: journalctl -u ${SERVICE_NAME} -f"
