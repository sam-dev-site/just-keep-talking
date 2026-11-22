# Just Keep Talking — Claude operating guide

This repo is a bilingual brochure site for a private online English academy (Costa Rica). The project owner (Audrey) is nontechnical. Prefer sound defaults, plain-language explanations of consequential choices, and a lightweight workflow.

**Full handover context:** `project/CLAUDE_HANDOFF.md` (read that first when starting a new Claude session or after a long gap).

**This file is the always-on agent contract.** Cursor’s `.cursor/rules/` and `AGENTS.md` remain for history and dual tooling; prefer this file and the handoff when instructions conflict.

## Authority (read in this order)

1. `project/BRIEF.md` — accepted product facts and page inventory
2. `project/VOICE.md` — visitor-facing voice (living guide)
3. `intake/2027-program-update/owner-confirmed-pricing-and-portraits.md` — prices, weekly times, portraits
4. `project/STATUS.md` — work record; newest section wins
5. Raw owner pastes under `intake/owner-voice/` and `intake/2027-program-update/`

Do **not** implement from `project/history/` or from outdated prices in `intake/CLIENT_NOTES.md`.

## Hard locks (do not reopen without the owner)

- **One site** under `app/`. Do not add a second static implementation.
- **Live host:** GitHub Pages at https://www.justkeeptalkingcr.com — not Cloudflare, not the unused worker.
- **Do not push or merge to `main`** unless the owner explicitly asks to publish.
- **Do not invent** prices, billing-unit labels (per student vs whole group), testimonials, credentials, policies, or contact details.
- **Group prices:** show the owner’s exact monthly amounts; do **not** add “per student” / “per group” until she says which.
- **Phase 1 / Phase 2** pricing stays off the public site.
- **Placement quiz** (`app/placement-quiz.tsx`) stays unwired from the home page until she asks to restore it.
- **Owner wording wins.** Do not LLM-polish. No em dashes as sentence pivots, no “not X but Y” antithesis, no clever From/to headlines. See `project/VOICE.md`.
- **Spanish:** public site generally uses **usted**.
- **pnpm only.** Keep `pnpm-lock.yaml`. Node ≥ 22.13, pnpm 11.19.
- **Four plans are live** (adults Essential–Immersion; kids Explorer–Fluent). Do not collapse back to two plans from old notes.

## Critical deploy fact (as of 22 November 2026)

GitHub Pages is still **Deploy from a branch** (`main` `/`), not GitHub Actions.

- Root publish files (`index.html`, `.nojekyll`, `404.html`, root `assets/*` bundles, root `brand/`, root `policies/`) are what visitors currently get.
- `.github/workflows/quality.yml` still builds/deploys on push to `main` when Actions Pages is enabled; until the owner switches Settings → Pages → Source → **GitHub Actions**, treat the root files as the live site.
- **Do not delete** those root files until Pages is switched and Actions deploy is confirmed.
- After an `app/` change that must go live under branch Pages, regenerate the root static export (or copy from `dist/client` after `STATIC_EXPORT=true pnpm build`) so root and source stay aligned, then commit both. Prefer switching Pages to Actions so this dual publish stops.

`CNAME` must stay `www.justkeeptalkingcr.com`.

## Stack and layout

- **App:** Next.js App Router surface via **vinext** + Vite (`pnpm dev` → `vinext dev`). Source: `app/page.tsx` (almost all UI), `app/layout.tsx`, `app/globals.css`, unused-on-home `app/placement-quiz.tsx`.
- **Routing:** query params on one page — `page`, `lang`, and on classes also `audience`, `format`, `currency`, `size`.
- **Pages:** `home` | `classes` | `approach` | `about` | `faq` | `policies` | `teach` | `curriculum`
- **Images:** optimized WebPs in `public/brand/` (also mirrored at repo-root `brand/` for legacy Pages).
- **Policies:** PDFs in `public/policies/` (mirrored at root `policies/`).
- **Unused leftovers (do not revive as the live host):** `worker/`, `.openai/hosting.json`, Cloudflare Vite plugin wiring in `vite.config.ts` (kept for local vinext/dev only).

## Everyday commands

```text
pnpm install
pnpm dev
pnpm check
```

`pnpm check` = ESLint + production build + rendered-html tests + Playwright (Chromium; desktop + mobile). Run before every handoff.

Static Pages artifact (CI / when regenerating root publish):

```text
STATIC_EXPORT=true pnpm build
# output: dist/client
```

## Voice and content workflow

When Audrey (or someone forwarding her words) supplies new copy or tone feedback:

1. Save the raw source under `intake/owner-voice/` (dated filename).
2. Refine `project/VOICE.md` in the **same** task.
3. Note it in `project/STATUS.md`.
4. Then update site strings. Keep her words.

## Quality gates

Before calling work done: scope, content vs brief, responsive, accessibility, behavior, build/tests, performance/metadata, review against `project/BRIEF.md`. Record tests and limits in `project/STATUS.md`.

## Open owner decisions (do not guess)

- Switch Pages source to **GitHub Actions**, then remove temporary root publish files.
- Whether group prices are per student or for the whole group.
- Whether Cristian’s public bio should say he teaches English here (supplied bio is Spanish-focused).
- Testimonials and kids age range (only publish when she supplies real quotes + permission).
- Whether to restore the placement quiz on the home page.
- Deeper policy HTML beyond PDF links (only if she asks).

## Contacts (confirmed)

- WhatsApp: +506 8685 8056 → `https://wa.me/50686858056`
- Email: `justkeeptalkingcr@gmail.com`
- Instagram: `@justkeeptalkingcr`
- Live: https://www.justkeeptalkingcr.com
- GitHub: https://github.com/sam-dev-site/just-keep-talking

## Parent archive

The directory above this git repo may hold original client files on the owner’s machine. Do not publish, commit, or edit those originals unless she explicitly asks. Cloud checkouts may not include that archive; use `intake/` and `public/brand/` here instead.

## Handoff habit

Update `project/STATUS.md` as work changes. At the end of a task: what exists, how to preview, what checks showed, open client inputs, recommended next step. Never commit secrets. Do not force-push or rewrite published history.
