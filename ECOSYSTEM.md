# SASE Ecosystem Blueprint

## Goal

Run `SASE` as the central portal and keep each product as an independent module:

- `SASE`: auth, roles, feature flags, navigation, handoff
- `Feria`: teacher pilot module with local backend and shared state
- `Diagnostico Colectivo`: permanent evaluation module
- `Mate`: student exercise module

This keeps the user experience unified without coupling all code into one app.

## Recommended Deployment Shape

Use Ubuntu for all services so runtime, deployment, logs, and process management stay consistent.

- `sase.midominio.com`
- `feria.midominio.com`
- `diagnostico.midominio.com`
- `mate.midominio.com`

Recommended base stack:

- Ubuntu 22.04 or 24.04
- Nginx as reverse proxy
- Node LTS per app
- PostgreSQL shared across apps with separate schemas
- `systemd` for long-running services

## Ownership Boundaries

### SASE owns

- login and identity
- role checks
- module catalog
- pilot access checks
- short-lived handoff token generation
- ecosystem navigation

### Each module owns

- its own UI
- business rules
- domain tables
- local session created after handoff
- deployment lifecycle

## Data Model Recommendation

Use one PostgreSQL instance initially, but separate schemas:

- `sase`
- `feria`
- `diagnostico`
- `mate`

Keep these tables in `sase`:

- `modules`
- `module_access_rules`
- `module_user_access`
- `institutions`
- `user_roles`
- `feria_pilotos` if pilot access stays explicit

## Module Registry Example

```sql
create table sase.modules (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  name text not null,
  base_url text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table sase.module_user_access (
  module_id uuid not null references sase.modules(id) on delete cascade,
  user_id uuid not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  primary key (module_id, user_id)
);
```

Suggested module keys:

- `feria`
- `diagnostico`
- `mate`

## Standard Handoff Contract

Every module should converge on this payload:

```json
{
  "sub": "user-id",
  "email": "usuario@institucion.mx",
  "role": "teacher",
  "name": "Nombre Apellido",
  "module": "feria",
  "institutionId": "inst-123",
  "groupId": "2A",
  "iat": 1713463200,
  "exp": 1713463500
}
```

Rules:

- token lifetime: 5 minutes or less
- sign the already encoded payload
- use the same `SASE_SHARED_SECRET` on emitter and receiver
- reject expired tokens and invalid roles

## Current Feria Compatibility

This repo currently accepts teacher handoff tokens with:

- identifier in `sub`, `uid`, `teacherId`, or `email`
- signature in `base64url` or `hex`

Recommended future standard:

- always send `sub`
- always sign with `base64url`

## Recommended Launch Flow

1. User signs in to `SASE`.
2. `SASE` checks role and module access.
3. `SASE` signs a short-lived handoff token.
4. `SASE` redirects to the target module URL with `?sase_token=...`.
5. The module validates the token and creates its local session.
6. The module shows its own app shell and provides a way back to `SASE`.

## Suggested Rollout Strategy

1. Keep `Diagnostico Colectivo` and `Mate` as permanent modules.
2. Keep `Feria` behind pilot access or feature flags.
3. Control visibility from `SASE`, not from hardcoded frontend conditions in each module.
4. If a temporary module ends, disable it in `SASE` without deleting the app immediately.

## Decision Summary

- one ecosystem: yes
- one giant codebase: no
- one Ubuntu-based operational model: yes
- one auth source in `SASE`: yes
- one deployable app per module: yes
