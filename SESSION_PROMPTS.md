# SESSION PROMPTS

## Continue In This Feria Repo
```text
Lee `HANDOFF.md` y `AGENTS.md`, revisa el estado actual del repo y continúa exactamente desde ahí. Mantén alumnos con login local de feria y docentes solo por SASE. Si hace falta probar la app, arranca `node server.js` y usa `http://localhost:3000`.
```

## Work In The SASE Repo
```text
Voy a conectar SASE con la feria. Toma como contrato el `HANDOFF.md` del repo de la feria: los docentes deben entrar solo desde SASE mediante un token firmado que la feria valida en `POST /api/session/teacher/sase`. Implementa en este repo de SASE una ruta de lanzamiento del modulo feria solo para maestros piloto: valida la sesion actual, valida que el maestro este invitado al piloto, genera un token HMAC-SHA256 con `SASE_SHARED_SECRET` y redirige a `http://localhost:3000/?sase_token=TOKEN#/docente`.

Payload minimo del token:
- `sub`
- `name`
- `email`
- `role` = `teacher` o `docente` o `maestro`
- `iat`
- `exp`

Formato del token:
- `<payloadBase64Url>.<signatureBase64Url>`

Firma esperada por la feria:
- `HMAC-SHA256(payloadBase64Url, SASE_SHARED_SECRET)`

No reabras login docente publico en la feria. Los alumnos siguen entrando solo desde la app de feria con nombre, apellido y grupo.
```

## Local Reminder
```text
Si `http://localhost:3000` no responde, vuelve a arrancar la feria con `node server.js`.
```
