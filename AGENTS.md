# Website project instructions

Just Keep Talking is a bilingual brochure site for a private online English academy. The project owner is nontechnical. Make sound defaults, explain consequential choices in plain language, and keep the workflow lightweight.

## Where things live

This directory is the git repo and the Cursor project. The parent folder is a local archive of original client notes and brand files. Read it when a task needs source material. Do not publish, commit, or modify those originals unless the owner explicitly asks.

- Accepted product facts: `project/BRIEF.md`
- Work record: `project/STATUS.md`
- Client notes: `intake/`
- Price and portrait authority: `intake/2027-program-update/owner-confirmed-pricing-and-portraits.md`
- Website: `app/`. Components may live under `app/`. Do not add a second static site.
- Optimized images: `public/brand/`. Source inventory: `assets/brand/`.
- Superseded planning notes: `project/history/`. Do not implement from them.

## Running and publishing

Use pnpm only. Keep `pnpm-lock.yaml`. Node.js 22.13 or newer and pnpm 11.19.

```text
pnpm install
pnpm dev
pnpm check
```

`pnpm check` lints, builds, checks rendered content, runs responsive browser journeys, and scans for serious accessibility failures. Run it before handoff.

The live host is GitHub Pages: https://www.justkeeptalkingcr.com

Pushing `main` runs `.github/workflows/quality.yml` and deploys the static export. Do not push, deploy, or change the audience unless the owner explicitly asks. The Cloudflare worker and `.openai/hosting.json` are leftover starter files and are not the live host.

## Facts you must not invent

Never silently invent business facts, testimonials, prices, billing-unit labels, credentials, policies, or contact details. Record assumptions. Use a clearly labeled placeholder only when necessary, and track it in `project/STATUS.md` when it blocks launch.

Group prices are the owner’s exact monthly amounts. Do not label them per student or per group until the owner says which. Phase 1 and Phase 2 material stays off the public site.

## Quality gates

Do not call a version complete until the applicable gates pass:

1. **Scope:** Every promised page and primary action works. Unrequested features are absent.
2. **Content:** Business facts match the source notes. Placeholders and missing assets are listed.
3. **Responsive design:** Key views work at phone, tablet, and desktop widths without clipping or horizontal overflow.
4. **Accessibility:** Semantic structure, keyboard access, visible focus, labels, alt text, sufficient contrast, reduced-motion support where relevant, and no obvious automated accessibility failures.
5. **Behavior:** Links, navigation, validation, empty and error states, and external destinations behave correctly.
6. **Technical:** The production build succeeds, relevant tests and lint checks pass, and the browser console has no unexplained errors.
7. **Performance and discoverability:** Images are appropriately sized, metadata is present, headings are coherent, and obvious performance problems are addressed.
8. **Review:** Compare the result with `project/BRIEF.md` and resolve critical and high-priority findings.

Use browser-based visual testing when available. Record what was tested, and any limits, in `project/STATUS.md`.

## Handoff

Update `project/STATUS.md` as the work changes. At the end, tell the owner what exists, how to preview it, what the checks showed, which client inputs are still open, and the recommended next step.

Never commit secrets. Preserve user changes and avoid destructive version-control operations.
