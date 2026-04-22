#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="${REPO_DIR:-$(pwd)}"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run this script as root or with sudo." >&2
  exit 1
fi

apt update
apt install -y nginx rsync

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Install Node LTS first, then rerun this script." >&2
  exit 1
fi

bash "$REPO_DIR/ops/ubuntu/deploy-feria.sh"

echo
echo "Bootstrap complete."
echo "Edit /etc/feria/feria.env with real values, then run:"
echo "  sudo systemctl restart feria.service"
echo "  sudo systemctl status feria.service"
