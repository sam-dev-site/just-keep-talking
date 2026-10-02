# Just Keep Talking website

Bilingual marketing site for Just Keep Talking, a private online English academy. It is a static brochure with no database, sign-in, or private runtime data.

Live site: https://www.justkeeptalkingcr.com

GitHub: https://github.com/sam-dev-site/just-keep-talking

## Source of truth

- Accepted facts: `project/BRIEF.md`
- Current work: `project/STATUS.md`
- Agent instructions: `AGENTS.md`
- Prices and portraits: `intake/2027-program-update/owner-confirmed-pricing-and-portraits.md`
- Website: `app/`
- Optimized images: `public/brand/`

The parent directory of this repo is a local archive of original client files. Do not publish it. Older planning notes in `project/history/` are not instructions for new work.

## Local workflow

Prerequisite: Node.js 22.13 or newer and pnpm 11.19.

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

A push to `main` runs the quality workflow and deploys the static export to GitHub Pages. Do not push or deploy unless the owner asks. The Cloudflare worker in this repo is unused starter code. The live site is the GitHub Pages export.
