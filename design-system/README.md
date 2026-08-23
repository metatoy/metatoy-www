# metatoy studio — design system

Approved direction (2026-08-22): **Direction B's visual language (light editorial) on Direction A's
layout.** Source of truth = `tokens.json`; run `npm run tokens` to regenerate `app/tokens.css`
(59 CSS custom properties) + `lib/tokens.js`. Do not hand-edit the generated files.

## Palette (warm-neutral, one accent)
- **Grounds:** `--color-paper #f4f3ef` (page) · `--color-surface #faf9f6` (cards) · `--color-surface-2` (insets)
- **Text:** `--color-ink #17160f` (headings) · `--color-fg` (body) · `--color-dim` (secondary) · `--color-faint` (labels)
- **Lines:** `--color-line` · `--color-line-strong`
- **Accent (only one):** `--color-accent #2438c9` (cobalt) + `-hover`, on `--color-accent-ink`.
- **Status:** `beta` (cobalt), `testflight` (teal `#1f6f8b`), `soon` (faint) — each with a `-bg` tint.
  Semantic only; never used as decorative accent.

## Type (three voices)
- **Display — Archivo** (800/900): hero, section titles, project names. `--tracking-tight`, `--leading-tight`.
- **Serif — Newsreader** (400/500 + italic): lead paragraphs, body prose, the italic accent word in the hero.
- **Mono — IBM Plex Mono** (400/500): nav, labels, kickers, code/tool snippet, stat-row, package chips.
- Scale: `--size-hero` (clamp) · `-h2` · `-h3` · `-lead` · `-body` (18) · `-sm` · `-label` (12, `--tracking-label`, uppercase).
- Fonts loaded via `next/font/google` in P8 (self-hosted, no layout shift) — not `<link>`.

## Primitives (P8 implements these as React components, token-driven)
| Primitive | Notes |
|---|---|
| **Nav** | flat 5 items (Studio · Projects · Open Source · Writing · Contact), mono, `--color-dim`→`--color-ink` on hover; wordmark "metatoy" in Archivo 900. |
| **Hero** | Archivo 900 headline (`Build the tool, ship the toy.` — "ship the toy." in Newsreader italic `--color-accent`); Newsreader lead; dual CTA (primary + ghost). Optional mono tool line from Direction A. |
| **Button** | `.btn` mono `--size-sm`, `--radius-sm`, 1px `--color-ink` border; `.btn.primary` = `--color-ink` bg / `--color-on-ink`; hover → `--color-accent`. |
| **Section header** | Archivo-800 uppercase title (left) + mono `--color-faint` label (right), `--color-line` rule under. |
| **Triad cell** | 3-up: mono index (`--color-accent`) + Archivo h3 + dim body. |
| **Project card / row** | name (Archivo 800) + **status badge** + description + `why-it-matters` (mono `--color-faint`). Layout = A's card grid; type = B. |
| **Status badge** | mono `--size-label`, `--radius-pill`, `status-*` fg on `status-*-bg`. Values: Beta · TestFlight alpha · Coming soon · In development. |
| **OSS stat-row** | 4 mono stats + install one-liner (`$ npx -y @sorb/tap`, copy-on-click) + package chips (`@sorb/*`, `@metatoy/bootstrap-styled`). |
| **Recently-shipped** | mono date + fg one-liner rows, `--color-line` separators. |
| **Contact footer** | Archivo statement + mono mailto (`--color-accent`) + social row. |

## Layout / spacing / motion / a11y
- `--layout-maxw 1080px`, `--layout-gutter 32px`. Space scale `--space-1..9` (4→96). Radii deliberately
  small (`--radius-sm 2px`) — editorial squareness.
- Motion: `--motion-fast/base` + `--motion-ease`; all transitions wrapped in
  `@media (prefers-reduced-motion: no-preference)`.
- Budget: WCAG AA (cobalt `#2438c9` on paper passes AA for text), visible focus rings, keyboard-nav,
  Lighthouse ≥ 90, fully crawlable text.

## How the blend works
- **From B (design):** palette, the Archivo+Newsreader+mono pairing, cobalt accent, restraint, whitespace.
- **From A (layout):** section order + composition (nav → hero w/ tool moment → Tools/Toys/OSS triad →
  project-card **grid** w/ status tags → OSS stat-row + install + chips → recently-shipped → contact).
