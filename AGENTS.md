# AGENTS

## Repo Shape
- The functional app now has a tiny local backend: `server.js` serves the root SPA (`index.html` + `app.js` + `styles.css`) and persists shared state in `data/state.json`.
- `data/stands.json` is the editable source of truth for stand names, zones, capacities, and physical map coordinates.
- There is still no `package.json`; run everything with plain `node`.
- `design_references/stitch_feria_de_ciencias_2026/` contains 5 standalone English `Luminous Science` screens.
- `design_references/stitch_rally_de_ciencias_310/` contains 7 standalone Spanish `Feria de Ciencias` screens plus `luminous_frost/DESIGN.md`.
- Each screen lives in its own folder and contains only `code.html` plus a sibling `screen.png` reference image.

## Editing
- The functional app lives only in the root files. Keep feature work there unless the user explicitly asks to edit the original exports.
- `app.js` owns client routing, rendering, and client-side analytics. `server.js` owns shared persistence and backend state seeding/sync.
- If you change stand data, edit `data/stands.json` first. Do not hardcode stand names/positions back into `app.js`.
- `data/state.json` is generated runtime state. If you need a clean reset after changing the catalog, delete `data/state.json` or call `POST /api/reset`.
- The stitched folders are design references now. Treat each export folder as independent and edit its local `code.html` only when you intentionally want to update the reference screens.
- Styling is page-local: each HTML file embeds Tailwind via CDN, an inline `tailwind.config`, Google Fonts, Material Symbols, and custom `<style>` blocks. If a visual token change should apply to multiple screens, you must update each screen's local config manually.
- Do not assume local assets exist. Images and fonts are loaded from remote URLs inside each HTML file.
- Folder names use on-disk underscore substitutions like `inicio_de_sesi_n` and `m_dulo_y_trivia`; use the filesystem names exactly as written unless the user explicitly asks for renames.
- The browser only persists the selected demo session under `feria-ciencias-session-v1`; the real shared app state now comes from the backend.
- Student login is public in the feria app. Teacher access is not: `#/docente` must only be reached through a SASE-issued session, never via a public form again.
- SASE teacher handoff is prepared through `POST /api/session/teacher/sase` with a signed token and requires `SASE_SHARED_SECRET` on the backend.
- QR deep links use hash routes like `#/alumno/stand/12?scan=1`; keep that contract if you touch routing.

## Design Conventions
- Preserve the language/brand split unless asked otherwise: `design_references/stitch_feria_de_ciencias_2026/` is English and branded `Luminous Science`; `design_references/stitch_rally_de_ciencias_310/` is Spanish and branded `Feria de Ciencias`.
- For rally pages, `design_references/stitch_rally_de_ciencias_310/luminous_frost/DESIGN.md` is the only repo-level design spec. Keep its glassmorphism, bright mesh gradients, compact spacing, and no-divider rules in mind when editing those screens.

## Verification
- There is no repo-defined build, lint, typecheck, or test pipeline.
- Start the app with `node server.js`, then open `http://localhost:3000` and verify both student and teacher flows there.
- To test teacher SASE integration locally, start the server with `SASE_SHARED_SECRET=<secret>` and exchange a signed token through `/api/session/teacher/sase` before opening `#/docente`.
- Fast syntax checks: `node --check app.js` and `node --check server.js`.
- For reference screens, verification is still manual and visual: compare the edited `code.html` against its sibling `screen.png`, and preview the HTML directly in a browser or a simple static server if needed.
