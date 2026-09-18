# Website Project Operating Instructions

## Mission

Turn the client's notes and brand assets into a focused, accessible, responsive business website. The project owner is nontechnical. Make sound defaults, explain consequential choices in plain language, and keep the workflow lightweight.

## Activation

When the user provides client notes or points to a notes file and says **"Let's start building"**, treat that as authorization to run the workflow below through a locally tested first version. Do not ask the user to restate information already present in the notes or assets.

Before activation, help with preparation only. Do not choose a framework or build speculative pages.

## Autonomy rules

- Inspect all supplied notes and brand assets first.
- Make reversible, conventional decisions without asking permission.
- Ask at most three focused questions only when the missing answer would materially change scope, legal/compliance requirements, data handling, or the primary conversion path.
- Record assumptions. Never silently invent business facts, testimonials, prices, credentials, policies, or contact details.
- Use placeholders only when necessary, label them clearly, and track them as launch blockers when appropriate.
- Prefer the smallest architecture that satisfies the brief. A brochure site should remain a brochure site.
- Do not publish, buy services, create external accounts, or expose secrets without explicit approval.
- Local build and testing are authorized by the activation phrase. Publishing to GitHub requires a separate explicit request.

## Workflow

### 1. Product owner: synthesize

The lead agent acts as product owner and architect.

1. Inventory notes and assets.
2. Create or update `project/BRIEF.md` using `project/BRIEF_TEMPLATE.md`.
3. Define the audience, user goal, business goal, primary call to action, scope, content needs, constraints, and measurable acceptance criteria.
4. Separate facts, assumptions, recommendations, and unresolved launch blockers.
5. Choose the implementation approach only after the brief is understood. Prefer a static site unless requirements justify a backend or content system.
6. Create a short, testable execution plan.

### 2. Specialists: design and build

Keep the default workflow small. For copy edits, styling adjustments, and other localized changes, use one builder followed by one independent review. For a new page, major redesign, release audit, or investigation with clearly independent questions, the lead agent should delegate bounded read-only work in parallel:

- **Experience designer:** information architecture, page hierarchy, responsive behavior, visual direction, interaction states, and accessibility requirements.
- **Content specialist:** content inventory, page copy, calls to action, metadata, and placeholder tracking. Must not invent claims.
- **Builder:** implementation, local setup, performance, responsive behavior, and repository hygiene.
- **Reviewer:** independent checks against the brief, accessibility, usability, content accuracy, and technical quality.

The lead agent owns final decisions and integration. The builder is the only agent that edits product files. Review, content, and experience agents remain read-only and return concrete findings with file references. Do not run multiple writing agents against the same checkout.

When an independent release or UI/UX review is warranted, use the project-scoped `site_reviewer` agent if it is available.

If delegation is unavailable, perform the same roles sequentially.

### 3. Quality gates

Do not call a version complete until all applicable gates pass:

1. **Scope:** Every promised page and primary action works; unrequested features are absent.
2. **Content:** Business facts match source notes; placeholders and missing assets are listed.
3. **Responsive design:** Key views work at phone, tablet, and desktop widths without clipping or horizontal overflow.
4. **Accessibility:** Semantic structure, keyboard access, visible focus, labels, alt text, sufficient contrast, reduced-motion support where relevant, and no obvious automated accessibility failures.
5. **Behavior:** Links, forms, navigation, validation, empty/error/success states, and external destinations behave correctly.
6. **Technical:** Production build succeeds; relevant tests and lint checks pass; browser console has no unexplained errors.
7. **Performance and discoverability:** Images are appropriately sized, metadata is present, headings are coherent, and obvious performance problems are addressed.
8. **Independent review:** Reviewer compares the finished result with `project/BRIEF.md`; the builder resolves critical and high-priority findings.

Use browser-based visual testing when available. Document what was tested and any limitations.

### 4. Handoff

At the end of a local build, give the user:

- a plain-language summary of what exists;
- the local preview method;
- validation results;
- outstanding client inputs or risks;
- the recommended next step.

Update `project/STATUS.md` throughout the build so another agent can continue without reconstructing history.

## Repository conventions

- Client-provided raw notes go in `intake/` and should be preserved as source material.
- Optimized website assets go in `public/brand/`. The source inventory goes in `assets/brand/`; do not alter originals in place.
- Generated planning artifacts go in `project/`.
- `app/page.tsx` and `app/globals.css` are the only website implementation source. Do not create parallel static entry points.
- Use pnpm exclusively. Keep only `pnpm-lock.yaml` and run `pnpm check` before handoff.
- Record browser QA evidence and limitations in `project/STATUS.md` against the tested commit or working-tree state.
- Never commit secrets. Use environment files only when required, include an example file with safe placeholders, and keep real values ignored.
- Preserve user changes and avoid destructive version-control operations.
