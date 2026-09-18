# Just Keep Talking website

This is the tracked source for the Just Keep Talking bilingual marketing website. It is a single-page Sites application with no database, sign-in, or private runtime data.

## Source of truth

- Product requirements and accepted facts: `project/BRIEF.md`
- Current work and validation record: `project/STATUS.md`
- Agent workflow and quality gates: `AGENTS.md`
- Client notes: `intake/CLIENT_NOTES.md`
- Website implementation: `app/page.tsx` and `app/globals.css`
- Optimized website assets: `public/brand/`

Do not create a second static implementation beside `app/`.

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

That single check performs linting, a production build, rendered-content assertions, responsive browser journeys, and an automated accessibility scan.

## Publishing

Publishing is a separate owner-approved step. Do not deploy, create accounts, or change the audience without explicit approval.
