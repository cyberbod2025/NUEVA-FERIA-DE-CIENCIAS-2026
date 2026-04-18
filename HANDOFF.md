# HANDOFF

## Current State
- Repo: `nueva feria de ciencias`
- Branch: `master`
- Remote: `origin = https://github.com/cyberbod2025/NUEVA-FERIA-DE-CIENCIAS-2026.git`
- Last pushed commit: `4bd9d89` `Build functional science fair app`

## Local Changes Not Yet Committed
- `app.js`
- `server.js`
- `AGENTS.md`
- Runtime file present but not meant for commit: `data/state.json`
- Untracked dependency folder present: `node_modules/`

## App Shape
- Root app files:
  - `index.html`
  - `app.js`
  - `styles.css`
  - `server.js`
- Shared editable stand catalog:
  - `data/stands.json`
- Shared runtime state:
  - `data/state.json`

## Auth Rules
- Students log in publicly inside the feria app with:
  - `nombre`
  - `apellido`
  - `grupo`
- Teachers must NOT log in publicly in the feria app anymore.
- `#/docente` is now protected and should only open through a valid SASE-issued session.

## SASE Integration Prepared
- Frontend consumes teacher handoff from URL query param:
  - `?sase_token=...`
- Backend endpoint prepared for SASE teacher handoff:
  - `POST /api/session/teacher/sase`
- Backend requires environment variable:
  - `SASE_SHARED_SECRET`
- Expected token format:
  - `<payloadBase64Url>.<signatureBase64Url>`
- Signature algorithm:
  - `HMAC-SHA256(payloadBase64Url, SASE_SHARED_SECRET)`
- Payload minimum fields:
  - `sub`
  - `name`
  - `email`
  - `role` = `teacher` or `docente` or `maestro`
  - `iat`
  - `exp`

## What Was Changed After The Last Push
- Removed public teacher login from the feria login screen.
- Added teacher gate screen for `#/docente` when no SASE session exists.
- Added SASE teacher session exchange endpoint in `server.js`.
- Session sanitization now rejects old local teacher sessions that do not come from SASE.
- `AGENTS.md` updated so future sessions do not reintroduce public teacher login.

## Verified Already
- `node --check app.js`
- `node --check server.js`
- Student login flow works.
- Teacher SASE session endpoint works with a signed test token.
- Public login page no longer exposes teacher access.
- `#/docente` shows protected-access gate unless SASE session is present.

## Run Locally
- Start server:
  - `node server.js`
- Open:
  - `http://localhost:3000`
- Note:
  - a server process was running on port `3000` in the previous session, but after changing Windows user it may need to be started again.

## Next Recommended Step
- In the SASE repo, add a teacher-only launch route that:
  - checks the logged-in user is a teacher
  - optionally checks pilot-invite eligibility
  - signs a short-lived token with `SASE_SHARED_SECRET`
  - redirects to:
    - `http://localhost:3000/?sase_token=TOKEN#/docente`

## Important Guardrails
- Do not re-add public teacher login.
- Keep students outside SASE.
- Keep teachers inside SASE.
- If stand names or positions change, edit `data/stands.json`, not hardcoded arrays in `app.js`.
