## Latest change — homepage image

Replaced the homepage hero with the owner-selected `students-talking.jpg`, optimized as `public/brand/students-talking.webp`. The original is preserved. Updated bilingual alt text and used a centered 3:2 frame so both people remain visible inside the existing arch.

Validation: `pnpm check` passes (lint, production build, three render groups, seven browser tests; one duplicate mobile Axe test intentionally skipped). Independent reviewer found no issues. Visual inspection at the normal preview width and 390×844 confirms both subjects remain visible. Git whitespace check passes. Tested uncommitted page hash `A7D8DD8EB5FADC650F76970AAEE5C7C3573C4EF484B29D3884CBDDEBF7B32499`, CSS hash `6300A33A21EB37D334CA0699B77622122B7B67BD6D45B6AEC7F4F673AC990F54`.

Preview remains http://localhost:4173/. Nothing published.

# Current status — portraits and final two-plan pricing

The latest owner-specified photo and pricing changes are implemented and locally validated. No commit, push, or deployment was performed. Earlier first-pass notes below are historical and superseded by this section.

## Completed

- Added Audrey founder portrait to founder story and homepage founder preview.
- Added Audrey teacher, Cristian, and Monique portraits to their team cards. Iain, Shay, and Charlie have clearly labelled matching-size placeholders.
- Preserved originals outside `site/`; optimized four WebP assets at 900×1350, approximately 99–144 KB each.
- Replaced every pricing view with exactly two plans. Kids groups: Explorer 30 minutes/week, Builder 1 hour/week. Kids private and all adult classes: Essential 1 hour/week, Standard 2 hours/week.
- All group-size and currency combinations use the latest direct owner prices in `intake/2027-program-update/owner-confirmed-pricing-and-portraits.md`.
- Removed earlier higher-duration plans and inquiry-only pricing fallbacks. Existing one-time enrollment amounts remain separate. No invented per-student/group-total billing label is added.
- WhatsApp messages include the correct selected audience, format, group size, currency, plan, weekly time and monthly price.

## Validation

`pnpm check` passes: ESLint, production build, three server-render test groups, seven browser tests (one intentionally skipped duplicate mobile accessibility pass).

- Server-render checks exercise all eight offer combinations, both currencies and both languages, all 32 supplied price amounts, correct plan names/durations, and portrait/placeholder presence.
- Browser checks cover desktop/mobile pricing changes, language/reload persistence, WhatsApp context, image loading, no horizontal overflow, navigation and all page/language accessibility scans.
- No serious or critical Axe findings.
- Independent read-only site reviewer found no source-level defects or pricing mismatches.
- Manual visual QA in the in-app browser: 1440×1000 team portraits/placeholders, 390×844 Spanish kids group 4+ pricing. Faces remain visible, frames align, and phone prices stack cleanly.
- Git whitespace check passes. No external messages were sent.
- Tested uncommitted working tree; page SHA256 `F3B85A454CB51D4A50317A8DF107614E36E9872434CF3D2E15EC71878AE4B271`, CSS SHA256 `7C1977332BE93AF48D72EC0E0B58AA6800E1CD2017970F7ABB98F7C30B54FF25`. The only post-build source adjustment was trailing whitespace cleanup.

## Remaining / next

Only the three remaining teacher portraits are needed to replace the requested placeholders. Policy details remain deferred. Local preview remains `http://localhost:4173/`; restart from `site/` with `pnpm dev --host localhost --port 4173` if needed. Publishing requires a separate explicit request under workspace instructions.

---

## Historical first-pass status

# Project status

## Current state — September 17, 2026

The approved website expansion is implemented and locally tested. Nothing was committed, pushed, or published in this task. Existing uncommitted consolidation work and original asset archives were preserved.

## Implemented

- Inclusive bilingual academy homepage for adults and kids: two audience paths, three teaching principles, founder preview, revised three-step intake, team preview, FAQs, and WhatsApp.
- Separate server-rendered views for classes/pricing, story/team, upcoming policy overview, and teacher recruitment. Query URLs preserve language, audience, format, group size and currency on direct visits, reload, and navigation.
- Current adult-private monthly pricing: Essential ₡65,000/$150, Standard ₡125,000/$285, Intensive ₡183,000/$420, Immersion ₡238,000/$545. One-time adult enrollment ₡15,000/$35.
- Independent CRC/USD controls, conditional group-size control, four neutral adult-private cards, contextual WhatsApp inquiries. Removed old class counts, hourly rates and savings claims.
- Inquiry-only kids and group views while source pricing units/durations remain unresolved. Confirmed kids-private enrollment is shown as ₡10,000/$25. Kids plan names omitted per user direction.
- Founder story and six equivalent, source-grounded biographies. No profile photographs, per the user's instruction to identify photos after this first pass.
- Brief upcoming-policy overview explicitly dated January 4, 2027. Detailed policy reconciliation deferred at the user's request. No disputed terms or contradictory policy downloads exposed.
- Recruitment benefits, expectations, application-specific WhatsApp message and email action.
- Footer email, Instagram, policies and recruitment links; accessible mobile menu with Escape focus return.
- Titles and description/social metadata now follow the selected page and language, including server-rendered direct URLs.
- Established navy, blue, cyan, lime, warm background and genuine teaching photographs retained; denser responsive layouts and visible keyboard focus.

## Source checks and owner decisions

- Inspected `Kids Private Colones.jpg`, `Kids Private USD.jpg`, and the kids group graphic directly. Only newest matching non-phase sources are used. No Phase 1/Phase 2 material appears publicly.
- Downloads archives match the preserved kids archives byte-for-byte. Kids Private ZIP SHA256: `16FA1A4CBBEB4252972A190A05AD1748BB0690EBD5295A02A92A4686DFFA33FD`; Kids Group ZIP: `98B76D72290E78A3D48A39EB55396D005975040B38B5B60852866BF1F54A1F7D`.
- User confirmed: kids plan names unnecessary; omit profile photos until identification; do not pursue policy detail this pass; exclude anything called phase.

## Validation evidence

Tested September 17, 2026 against the uncommitted working tree based on HEAD `7e5db5cb2941979e450c12bcc480f362ee49d51a`.

Tested product-file SHA256 values:

- `app/page.tsx`: `E8ADCC4153AB0A5B72C1A599CBACB44BECB05CDCD164C0414C88D58D7D4C2991`
- `app/globals.css`: `F60757F27BF9129DB385D012B2A3D3553360AD348CFFB90965EBB04F745BDBAB`
- `app/layout.tsx`: `54239183663B2D0DFDA5E2B69F21E6DF218CF51D434A1F9029A352219039CA1D`

`pnpm check` passes:

- ESLint: passes.
- Production Vinext build: passes.
- Three server-render test groups: all ten page/language combinations, single h1/title, current adult prices and fees, no outdated pricing or phase content, inquiry-only unresolved combinations.
- Playwright: seven passing tests, one intentionally skipped duplicate mobile Axe pass. Desktop Chromium and iPhone 13-sized Chromium cover language switching, adult/child entry paths, FAQ, mobile keyboard menu and Escape focus return, currency controls, rapid pricing changes, selection preservation across translation/reload, contextual WhatsApp links, recruitment contact, image loading, and horizontal overflow.
- Axe: no serious or critical findings on all five views in both languages.
- Browser console/page-error checks pass for the bilingual home/parent journey.
- Manual in-app visual review: desktop homepage and adult pricing at 1440×1000; Spanish story at 768×1024; Spanish pricing controls at 390×844. Layouts readable with no observed clipping.
- `git diff --check`: passes; only repository line-ending conversion notices.
- Independent read-only `site_reviewer` review: no critical/high-priority findings. Its stale-status finding is resolved here; English-only metadata finding was fixed and server-render checks rerun.
- Browser testing caught an overlapping route-update timing issue on rapid selections. Pricing controls now synchronously update the current query state; the complete pricing journey passes after the fix.

Limitations: browser checks use Chromium, not physical devices, WebKit, or screen-reader usability testing. Automated accessibility checks do not establish full accessibility conformance. No external WhatsApp or email message was sent; destinations and message payloads were inspected locally.

## Remaining content inputs

- Kids private CRC/USD graphics disagree on weekly time; several graphics print `1. hours weekly`; the four-hour kids entry also remains flagged in the proposal. Corrected durations are needed before a unified price selector can be shown.
- Group graphics distinguish group size but do not specify whether prices are per learner or for the whole group, nor enrollment allocation. Group formation/placement is also unconfirmed. Group views therefore offer tailored inquiries.
- Photo-to-teacher mapping can be added after owner review.
- Detailed policy alignment, active Spanish offering, and curriculum inquiry/product scope remain deferred. Time-sensitive student counts and unconfirmed offers are not displayed.
- Pretty path-based language URLs are not added: the canonical project rule restricts implementation to `app/page.tsx` and `app/globals.css`. Dedicated query URLs render each destination and language on the server and can be shared independently.

## Preview and next step

Current retained local preview: `http://localhost:4173/`.

From `site/`, restart with `pnpm dev --host localhost --port 4173` when needed. Examples: `/?page=classes&lang=en`, `/?page=about&lang=es`, `/?page=teach&lang=en`.

Owner first-pass review is next. Resolve pricing source details and identify portraits when ready. Publishing still requires a separate explicit request under the workspace instructions.


