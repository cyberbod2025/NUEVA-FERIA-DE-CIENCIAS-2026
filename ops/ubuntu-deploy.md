# Ubuntu Deployment Notes

## Feria On Ubuntu

This app is a standalone Node service. Deploy it as its own process and front it with Nginx.

Recommended path layout:

- app root: `/srv/feria-app/current`
- env file: `/etc/feria/feria.env`
- logs: `journalctl -u feria.service`

## Install Base Packages

```bash
sudo apt update
sudo apt install -y nginx nodejs npm
```

If you need a pinned Node LTS, install it from NodeSource or `nvm` before enabling the service.

For a one-command bootstrap on Ubuntu after Node is already installed:

```bash
sudo bash ops/ubuntu/bootstrap-feria.sh
```

That bootstrap installs base OS packages used by this repo and then runs the deploy helper.

## Environment File

Create `/etc/feria/feria.env`:

```bash
PORT=3100
SASE_SHARED_SECRET=the-same-secret-used-by-sase
ALLOWED_ORIGIN=https://sase.midominio.com
```

If you want to use the repo's deployment helper, copy the app to the Ubuntu server and run:

```bash
sudo bash ops/ubuntu/deploy-feria.sh
```

That script:

- syncs the repo into `/srv/feria-app/current`
- installs the `systemd` unit
- installs the Nginx vhost
- creates `/etc/feria/feria.env` from `.env.example` if missing
- restarts the service and reloads Nginx

## systemd Service

Use the template in `ops/systemd/feria.service.example`.

```bash
sudo cp ops/systemd/feria.service.example /etc/systemd/system/feria.service
sudo systemctl daemon-reload
sudo systemctl enable --now feria.service
sudo systemctl status feria.service
```

The service runs through `ops/ubuntu/start-feria.sh`, which loads `/etc/feria/feria.env` and starts `server.js`.

## Nginx Reverse Proxy

Use the template in `ops/nginx/feria.conf.example`.

```bash
sudo cp ops/nginx/feria.conf.example /etc/nginx/sites-available/feria.conf
sudo ln -s /etc/nginx/sites-available/feria.conf /etc/nginx/sites-enabled/feria.conf
sudo nginx -t
sudo systemctl reload nginx
```

## TLS

After DNS points to the Ubuntu server:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d feria.midominio.com
```

## Validation Checklist

1. `node --check app.js`
2. `node --check server.js`
3. `systemctl status feria.service`
4. `curl http://127.0.0.1:3100/api/state`
5. Launch from `SASE` using a valid `sase_token`
6. Verify `#/docente` only opens after successful handoff
7. `node ops/smoke-sase-feria.js`

## Same Pattern For Other Modules

Repeat the same structure for:

- `/srv/diagnostico-app/current`
- `/srv/mate-app/current`
- matching env files in `/etc/<module>/`
- matching `systemd` services
- matching Nginx vhosts
