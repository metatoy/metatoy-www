# metatoy-www

The **Metatoy studio landing** at **`metatoy.com`** / `www.metatoy.com` — the
one-page terminal/monospace intro to the workshop-of-one (Sorb + woords).

> **Split out 2026-08-05.** This landing used to live at the root of `sorb-www`.
> When the Sorb marketing site moved to its own domain (`www.sorbcloud.com`), the
> studio landing was extracted here so `sorb-www` could become Sorb-only. This repo
> **308-redirects** all the old `/sorb/*` (and `/legal/*`) paths to `www.sorbcloud.com`
> (see `next.config.mjs`).

- **Next.js (App Router), JS-only** (no TypeScript; `scripts/check-no-ts.mjs`
  guards `prebuild`/`prelint`/`pretest`). Standalone output for Docker.
- Hosted on **Coolify** (Dockerfile build, port 3000). GA4 `G-DNW50VHNVC`.
- `animation-clips/` + `assets-design-reference/` are local design source, kept
  out of git and the image (`.gitignore` / `.dockerignore`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # JS-only guard + next build (standalone)
```
