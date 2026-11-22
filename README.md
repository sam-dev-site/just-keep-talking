# Just Keep Talking website

Bilingual marketing site for Just Keep Talking, a private online English academy. It is a static brochure with no database, sign-in, or private runtime data.

Live site: https://www.justkeeptalkingcr.com

GitHub: https://github.com/sam-dev-site/just-keep-talking

## Source of truth

- **Claude onboarding (primary):** `CLAUDE.md` and `project/CLAUDE_HANDOFF.md`
- Accepted facts: `project/BRIEF.md`
- Voice: `project/VOICE.md`
- Current work: `project/STATUS.md`
- Shared agent instructions: `AGENTS.md`
- Prices and portraits: `intake/2027-program-update/owner-confirmed-pricing-and-portraits.md`
- Website: `app/`
- Optimized images: `public/brand/`

The parent directory of this repo is a local archive of original client files. Do not publish it. Older planning notes in `project/history/` are not instructions for new work.

## Local workflow

Prerequisite: Node.js 22.13 or newer and pnpm 11.19 (`packageManager` in `package.json`; lockfile is `pnpm-lock.yaml`).

```text
pnpm install
pnpm dev
```

Before handoff, run:

```text
pnpm check
```

That check lints, builds, checks rendered content, runs responsive browser journeys, and scans for serious accessibility failures.

## Publishing

Do not push or deploy unless the owner asks.

**Important:** GitHub Pages may still be set to **Deploy from a branch** (`main` `/`). In that mode the committed root files (`index.html`, root `assets/`, `brand/`, `policies/`) are what the custom domain serves. The Quality workflow on `main` also builds a Pages artifact for when Source is **GitHub Actions**. See `project/CLAUDE_HANDOFF.md` §5 before deleting any root publish files.

The Cloudflare worker in this repo is unused starter code. It is not the live host.
