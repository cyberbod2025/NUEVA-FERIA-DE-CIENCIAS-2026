# Go Live Checklist

This checklist closes the real integration between the deployed SASE runtime and the deployed Feria module.

## 1. Runtime Ready

### SASE runtime

Confirm these variables exist in the real server-side runtime:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SASE_SHARED_SECRET`
- `FERIA_APP_URL`

Confirm the SASE app is really serving HTTP and not only passing local tests.

### Feria runtime

Confirm these variables exist in the deployed Feria runtime:

- `SASE_SHARED_SECRET`
- `PORT`

Confirm Feria is really serving HTTP at the final URL used by `FERIA_APP_URL`.

## 2. Secret Match

The exact same `SASE_SHARED_SECRET` must be configured in both runtimes.

## 3. URLs

Confirm `FERIA_APP_URL` points to the deployed Feria route, for example:

```text
https://feria.midominio.com/#/docente
```

## 4. Access Data

Confirm these exist in SASE production data:

- module `feria` active in `modulos_ecosistema`
- one pilot teacher allowed for `feria`
- one non-authorized user for negative testing

## 5. Feria Receiver Smoke

Run from the Feria repo in the real environment:

```bash
export FERIA_APP_URL="https://feria.midominio.com/#/docente"
export SASE_SHARED_SECRET="the-shared-secret-used-by-sase"
node ops/smoke-sase-feria.js
```

Expected result:

```text
Smoke OK: Feria accepted a valid SASE token and rejected an expired one.
```

## 6. Positive Manual Flow

1. Sign in to SASE with an authorized pilot teacher.
2. Open Feria from Home or Sidebar.
3. Confirm SASE generates a URL with `?sase_token=...#/docente`.
4. Confirm Feria opens the teacher dashboard.
5. Confirm SASE records `MODULO_LAUNCH_OK`.

## 7. Negative Manual Flow

1. Sign in to SASE with a user not authorized for Feria.
2. Try to open Feria.
3. Confirm access is rejected.
4. Confirm Feria does not open the teacher dashboard.
5. Confirm SASE records `MODULO_LAUNCH_DENIED`.

## 8. Evidence To Capture

Collect these artifacts:

- effective value of `FERIA_APP_URL`
- HTTP status from `POST /api/modules/launch`
- final generated redirect URL
- evidence of `MODULO_LAUNCH_OK`
- evidence of `MODULO_LAUNCH_DENIED`
- output of `node ops/smoke-sase-feria.js`

## 9. Exit Criteria

The integration is complete when all of these are true:

- SASE runtime is live with real variables
- Feria runtime is live and reachable
- both sides share the same secret
- valid handoff opens `#/docente`
- unauthorized access is rejected
- audit events exist for both outcomes
