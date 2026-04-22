# Smoke SASE -> Feria

Use this script once the real Ubuntu environment is ready to confirm that the deployed Feria receiver accepts a valid SASE handoff and rejects an invalid one.

## Required Environment

```bash
export FERIA_APP_URL="https://feria.midominio.com/#/docente"
export SASE_SHARED_SECRET="the-shared-secret-used-by-sase"
```

Optional values:

```bash
export SMOKE_TEACHER_EMAIL="docente@sase.mx"
export SMOKE_TEACHER_NAME="Docente Piloto"
export SMOKE_TEACHER_ID="teacher-sase-001"
export SMOKE_INSTITUTION_ID="09DES4310M"
export SMOKE_GROUP_ID="2A"
```

## Run

```bash
node ops/smoke-sase-feria.js
```

## What It Verifies

1. Builds a launch URL preserving the Feria hash route.
2. Sends a valid signed token to `POST /api/session/teacher/sase`.
3. Confirms Feria returns a teacher session with provider `sase`.
4. Sends an expired token.
5. Confirms Feria rejects the expired token.

## Expected Output

- prints the final launch URL with `?sase_token=...#/docente`
- ends with:

```text
Smoke OK: Feria accepted a valid SASE token and rejected an expired one.
```

## If It Fails

Check these first:

1. `FERIA_APP_URL` points to the deployed Feria receiver.
2. `SASE_SHARED_SECRET` is identical in SASE and Feria.
3. Feria is running the compatible receiver version.
4. `#/docente` still depends on a SASE-issued session.
