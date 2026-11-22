# Claude suite handoff — Just Keep Talking

Prepared **22 November 2026** (America/Guatemala) for moving day-to-day work from Cursor Cloud Agents to a Claude suite (Claude Code / Claude Desktop / Cowork or equivalent).

**Priority of this document:** smooth continuity. Read this once at onboarding, then keep `CLAUDE.md` (repo root) as the always-on contract.

---

## 1. What you are inheriting

| Item | Value |
|---|---|
| Product | Bilingual (EN/ES) static brochure for Just Keep Talking, a private online language academy |
| Owner | Audrey (nontechnical). Founder; primary voice authority |
| Live site | https://www.justkeeptalkingcr.com |
| Repo | https://github.com/sam-dev-site/just-keep-talking |
| Default branch | `main` |
| Last published tip (as of handoff) | `f39cc23` — 4 November 2026 UTC — Shay portrait crop fix |
| Hosting | GitHub Pages custom domain `www.justkeeptalkingcr.com` |
| Stack | React 19 + Next 16 App Router surface via **vinext** 0.0.50 + Vite 8; pnpm 11.19; Node ≥ 22.13 |
| Auth / DB / CMS | None. Static brochure only |
| Primary conversion | WhatsApp `https://wa.me/50686858056` (+506 8685 8056) |
| Also | Email `justkeeptalkingcr@gmail.com`, Instagram `@justkeeptalkingcr` |

There is **no** sign-in, no form backend, no analytics product requirement beyond normal static hosting, and no second site implementation.

---

## 2. Locked product state (do not “rediscover” or reverse)

These decisions are already implemented and owner-aligned. Treat them as frozen unless Audrey asks otherwise.

### Offer and pricing

- **Four adult plans:** Essential, Standard, Intensive, Immersion — 1 / 2 / 3 / 4 hours weekly (CRC and USD same weekly time).
- **Four kids plans:** Explorer, Builder, Achiever, Fluent.
- **Kids group weekly time:** 30 min / 1 hr / **1.5 hr** / 4 hr (CRC Achiever graphic prints `1. hours`; site correctly uses 1.5).
- **Kids private weekly time differs by currency:** CRC 30 min / 1 / 1.5 / 4; USD 1 / 2 / 3 / 4.
- Exact monthly amounts: `intake/2027-program-update/owner-confirmed-pricing-and-portraits.md` and the `tuition` object in `app/page.tsx`.
- Enrollment fees (one-time): adults CRC 15 000 / USD 35; kids CRC 10 000 / USD 25.
- **Do not label** group prices as per-student or whole-group until she decides.
- **Phase 1 / Phase 2** graphics are existing-student migration only — never on the public site.

### Site map (query-param SPA)

Single route `app/page.tsx`. Views via `?page=`:

| `page` | Purpose |
|---|---|
| `home` (default) | Hero “Build the confidence to speak.”; Language for you (Adults / Kids); Our approach teaser; founder band; community preview; WhatsApp |
| `classes` | “Explore our plans.”; audience / format / currency / size; four plans; enrollment fee; contextual WhatsApp |
| `approach` | H1 “Learn a language by using it.”; six method bubbles (incl. certified teachers); three learning-plan steps |
| `about` | “Our story” + “How it all started”; six teacher cards in home order |
| `faq` | Levels, ages, online vs immersion, private/group, getting started, methodology, languages |
| `policies` | PDF links only (EN + ES 2027 enrollment/payment/attendance) |
| `teach` | Recruiting benefits / expectations / application contact |
| `curriculum` | Low-profile A1–C2 curriculum inquiry for teachers; WhatsApp + email; **no** public curriculum price |

Also: `lang=en|es` (stored in URL). Classes-only: `audience`, `format`, `currency`, `size`.

### Team and portraits

Order everywhere: **Audrey, Monique, Cristian, Charlie, Shay, Iain**.

All six have WebP portraits under `public/brand/`. Audrey has separate founder vs teacher images; home founder band uses `audrey-home-founder.webp`; Our story uses `audrey-founder.webp`.

Shay portrait: clean 4:5 crop; source already clips the hat crown — do not invent pixels or reintroduce a cream pad above the hat.

### Voice

- Living guide: `project/VOICE.md`
- Primary source: `intake/owner-voice/2026-10-23-brand-voice-and-communication-guide.md`
- Our Story: third-person owner paste `intake/owner-voice/2026-10-23-audrey-our-story.md`
- Nov 2026 copy/portraits/policies paste: `intake/owner-voice/2026-11-03-copy-portraits-policies.md`
- Central message: **Learn a language by using it.**
- Spanish public UI: **usted**
- Ban AI polish habits listed in `VOICE.md` (em dashes as pivots, antithesis formulas, hype verbs, etc.)

### Explicitly not on the public home

- Placement quiz UI (code remains in `app/placement-quiz.tsx` for possible restore)
- Testimonials (none confirmed)
- Kids age range (not confirmed)
- Per-hour savings callouts / Phase language (tests assert these stay out of HTML)

---

## 3. Open owner decisions (block or ask — never invent)

1. **GitHub Pages source → GitHub Actions** (see §5). Highest operational risk if ignored.
2. Group price billing label: per student vs whole group.
3. Cristian bio: whether the public card should state he teaches English here (supplied copy is Spanish-focused).
4. Testimonials: only with real quotes + permission (first name + role/city). Placement when ready: approach page after learning plan, two or three short lines.
5. Restore placement quiz on home? Owner should re-read the 24 items in `app/placement-quiz.tsx` first.
6. Any HTML policy summary beyond PDF links.
7. Optional: delete or archive stale remote `cursor/*` branches after confirming nothing useful remains unmerged (all numbered PRs #1–#14 are merged).

---

## 4. Repository map

```text
CLAUDE.md                 ← always-on Claude contract (this suite)
AGENTS.md                 ← human + agent instructions (kept; aligned with CLAUDE.md)
README.md                 ← short human entry
LOCAL_PREVIEW.md          ← one-screen preview note
project/
  BRIEF.md                ← accepted product facts
  VOICE.md                ← living voice guide
  STATUS.md               ← chronological work log (newest first)
  CLAUDE_HANDOFF.md       ← this file
  2027_PROGRAM_CONTEXT.md ← consolidated Sep 2026 program notes (reference; pricing superseded by owner-confirmed file)
  history/                ← superseded planning — do not implement from here
intake/
  CLIENT_NOTES.md         ← Aug 2026 interview (prices outdated)
  owner-voice/            ← dated owner pastes (authority for wording)
  owner-drop/photos/      ← recent portrait/photo sources
  2027-program-update/    ← pricing authority, website-information.txt, policy DOCX/PDF archive
app/
  page.tsx                ← almost all UI, copy, tuition, team, routing
  layout.tsx
  globals.css
  placement-quiz.tsx      ← unwired from home
public/brand/             ← optimized logos + WebPs (source of truth for assets in app)
public/policies/          ← served PDFs
tests/
  rendered-html.test.mjs  ← server-render smoke after build
  e2e/home.spec.ts        ← Playwright journeys + axe
.github/workflows/quality.yml  ← lint/test; on main push also Pages artifact + deploy
.cursor/rules/project.mdc ← Cursor-era rule (kept for reference; CLAUDE.md is primary)
worker/, .openai/         ← unused Cloudflare starter leftovers
Root index.html, assets/, brand/, policies/, .nojekyll, 404.html
                          ← TEMPORARY live publish under legacy branch Pages (§5)
```

Parent folder of the git repo on the owner’s machine may hold original Drive/brand archives. **Do not publish or edit those.** Cloud agents often lack that tree; use `intake/` and `public/brand/` in-repo.

---

## 5. Deploy — read carefully

### Current reality (verified 22 November 2026)

GitHub Pages API reports:

- **Source:** branch `main`, path `/` (legacy “Deploy from a branch”)
- **CNAME:** `www.justkeeptalkingcr.com`
- **Status:** built

So the **files committed at the repo root** are what the public domain serves today.

Separately, `.github/workflows/quality.yml`:

- On every PR and push: `pnpm check`
- On push to `main` only: `STATIC_EXPORT=true pnpm build`, copy `CNAME` into `dist/client`, upload Pages artifact, `deploy-pages` job
- Concurrency group is deliberately named `quality-pages` so GitHub’s built-in `pages-build-deployment` job cannot cancel it

Until Settings → Pages → Source is switched to **GitHub Actions**:

1. Visitors depend on root `index.html` + hashed `assets/*` + root `brand/` + root `policies/`.
2. Changing only `app/` and pushing `main` updates the Actions artifact path, but **branch Pages will keep serving the old root export** unless you also refresh those root files.
3. **Do not delete** the root publish tree “to tidy” while branch Pages is active — that breaks the live site (this already happened once when Pages showed the README).

### Owner action (document and remind)

1. Repo **Settings → Pages → Source → GitHub Actions**.
2. Confirm https://www.justkeeptalkingcr.com still loads after a green Quality deploy.
3. Then remove temporary root publish files (`index.html`, `index.rsc`, `404.html`, root hashed `assets/*.js|*.css`, root `brand/`, root `policies/`, keep `.nojekyll` only if still useful; keep `CNAME`). Relax ESLint ignores in `eslint.config.mjs` that exist only for those bundles.
4. After that, publish = merge/push to `main` with owner approval; Actions owns `dist/client`.

### If you must publish under branch Pages before the switch

1. Get explicit owner approval to push `main`.
2. Make the `app/` (and `public/`) change.
3. `STATIC_EXPORT=true pnpm build`.
4. Sync `dist/client` contents into the repo root publish layout (same pattern as commit `3ba5408` / later portrait updates).
5. Run `pnpm check`.
6. Commit source + root publish together; push `main`.

---

## 6. Local development and quality

```text
pnpm install          # respect pnpm-lock.yaml; packageManager pnpm@11.19.0
pnpm dev              # vinext dev — use the printed local URL
pnpm check            # lint + build + render tests + Playwright
```

Playwright uses Chromium only (`playwright.config.ts`). One mobile accessibility pass may skip as duplicate — that is expected.

ESLint ignores temporary root `assets/*.js|*.css`, `index.html`, `index.rsc`, `404.html` so minified publish output does not fail lint.

### What `pnpm check` must keep asserting (high level)

- No Phase 1/2, no “per hour” / savings class leakage in rendered HTML
- Exactly one `<h1>` in the server shell
- Home hero copy, no quiz callout on home
- Classes: four plans, independent currency, inquiry context in WhatsApp links
- Approach: six method bubbles, three learning steps, “intake meeting” / “reunión de entrevista” language
- Spanish `lang` flip and no horizontal overflow on key journeys

---

## 7. How to change copy and prices safely

1. Confirm the fact against `BRIEF.md` + owner-confirmed pricing file + latest `intake/owner-voice/` paste.
2. If it is voice/tone: update `VOICE.md` **before or while** editing `app/page.tsx` strings; save raw paste under `intake/owner-voice/`.
3. Edit `app/page.tsx` (and CSS in `globals.css` if needed). Prefer minimal diff.
4. Update `project/STATUS.md` with date, what changed, check results, publish intent.
5. Run `pnpm check`.
6. **Do not push `main`** unless Audrey asked to publish. Prefer a PR for review.

Never invent testimonials, credentials, or contact changes.

---

## 8. Cursor-era artifacts (what to keep vs ignore)

| Path | Keep? | Notes |
|---|---|---|
| `.cursor/rules/project.mdc` | Keep | Short Cursor rule; superseded as primary by `CLAUDE.md` but still accurate |
| Remote branches `origin/cursor/*` | Historical | PRs #1–#14 merged; safe to leave; delete only with owner OK |
| `AGENTS.md` | Keep | Same operating rules; update if Claude workflow diverges |
| Cloud Agent / Cursor license | Dropping | No dependency on Cursor-specific runtime for the site itself |

Claude Code will auto-read root `CLAUDE.md`. Point project knowledge / custom instructions at `project/CLAUDE_HANDOFF.md` + `CLAUDE.md` if the suite supports pinned docs.

---

## 9. Leftovers that look important but are not the live host

- `worker/index.ts` — vinext/Cloudflare starter worker
- `.openai/hosting.json` — `{ "d1": null, "r2": null }`
- Cloudflare plugin in `vite.config.ts` — local tooling for vinext; **not** production hosting
- `project/history/*` — September 2026 and earlier planning
- `intake/CLIENT_NOTES.md` pricing tables — superseded
- Unwired quiz — intentional

Do not migrate the site to Cloudflare Pages “because the worker exists.”

---

## 10. Brand and design notes (preserve, don’t redesign casually)

Colors sampled from the logo (see `assets/brand/ASSET_INVENTORY.md`):

- Light blue `#1AC1F1`
- Dark blue `#005CA8`
- Lime `#D5DF65`
- Green `#8DC549`

Header/footer use speech-bubble marks `mark.png` / `mark-white.png`, not the full wordmark in chrome. Design language is already established in `globals.css`; when editing UI, **preserve the existing system** (see frontend design exception for established sites).

Photography: prefer real academy photos already in `public/brand/`. Do not replace with stock or generative faces without owner supply.

---

## 11. Suggested first Claude sessions

1. **Read-only orientation:** `CLAUDE.md`, this handoff, `BRIEF.md`, top of `STATUS.md`, skim `app/page.tsx` structure.
2. **Verify environment:** `pnpm install` → `pnpm check` → note any drift.
3. **Owner ops:** walk her through switching Pages to GitHub Actions; after confirm, PR that removes temporary root publish files and ESLint ignores.
4. Only then take content tickets (voice pastes, bio tweaks, quiz restore, testimonials).

---

## 12. Communication with the owner

- She is nontechnical. Explain publish risk (especially Pages source) in plain language.
- Recommended next step after handoff: switch Pages to Actions, then one clean publish path.
- Always say what was tested and what is still waiting on her.
- Timezone for status notes: **America/Guatemala** when dating owner-facing entries.

---

## 13. Checklist for the human transferring the Cursor license

- [ ] Claude suite has access to this GitHub repo (`sam-dev-site/just-keep-talking`)
- [ ] Claude can run Node 22.13+ and pnpm 11.19 locally or in its cloud VM
- [ ] Pinned docs: `CLAUDE.md` + `project/CLAUDE_HANDOFF.md`
- [ ] Owner reminded: do not delete root Pages files until Actions is the Pages source
- [ ] Optional: export any Cursor chat threads that contain unpublished owner decisions not already in `intake/` or `STATUS.md`
- [ ] Optional: confirm local parent archive of original brand files still exists on her/sam machine (not in git)
- [ ] After Claude is productive: cancel Cursor seat

---

## 14. Handoff verification (this PR)

Documented locks and maps above match repo state as of branch `cursor/claude-handoff-lock-23c6`.

`pnpm check` passed on that branch (22 November 2026, America/Guatemala): ESLint, production build, two server-render tests, seven Playwright tests (one mobile accessibility skip). Chromium only. Docs/lock only; no visitor-facing copy or asset changes in the handoff commit.

If anything in this file disagrees with a newer `STATUS.md` section, **STATUS wins for chronology**; then update this handoff in the same task so Claude onboarding does not drift.
