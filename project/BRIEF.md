## Latest owner update — two-plan pricing and identified portraits

The current authoritative amendment is `intake/2027-program-update/owner-confirmed-pricing-and-portraits.md`. It supersedes the earlier four-plan prices, inquiry-only kids/group limitation, and instruction to omit all profile photos.

All eight audience/format/group-size combinations now show two plans with confirmed schedules in CRC and USD. No Intensive, Immersion, Achiever, or Fluent plans remain. Monthly billing and one-time enrollment fees are separate. Group prices use the owner's exact amounts without an invented billing-unit label.

Audrey's founder portrait appears in the story and homepage founder preview. Audrey's teacher portrait, Cristian, and Monique appear in the team grids. Iain, Shay, and Charlie use equal-aspect-ratio placeholders. Originals are preserved; WebP derivatives are used on the site.

## Previous first-pass brief (superseded where noted above)

# Implementation brief — September 17, 2026

## Sources and authority

The approved update is `project/WEBSITE_UPDATE_PROPOSAL.md`, supported by `project/2027_PROGRAM_CONTEXT.md`, `intake/2027-program-update/website-information.txt`, and the newest non-phase pricing graphics. Preserve original assets and all prior working-tree changes. No publishing is authorized.

## Audience and outcome

Adults and parents should understand the online English offer, choose an audience and format, review confirmed monthly tuition, meet the team, and begin a contextual WhatsApp inquiry at +506 8685 8056. Students of all levels throughout the Americas are supported by the supplied academy copy.

## Scope and architecture

- Home: inclusive hero, adult/child paths, three teaching principles, founder preview, three enrollment steps, team preview, FAQs, contact.
- Classes and pricing: audience, private/group, conditional group size, independent CRC/USD controls, four confirmed adult-private plans, one-time enrollment, contextual inquiries for other combinations.
- Story and team: founder history and six factual, photo-free profiles.
- Policies: brief upcoming-policy overview, effective January 4, 2027, and direct contact. User explicitly deferred policy detail.
- Teach with us: supplied benefits, expectations, and separate application contact.
- Equivalent English and Spanish; accessible mobile navigation; footer email, Instagram, policies and recruitment.
- Keep implementation in `app/page.tsx` and `app/globals.css`, with metadata in the existing layout. Use server-rendered query URLs for independent destinations and language/selection persistence without adding parallel entry points. Pretty path URLs can be introduced if that project constraint changes.
- No accounts, checkout, booking, curriculum sales, student counts, or unsupported Spanish course offer.

## Confirmed prices

Adult private: Essential 1h/week ₡65,000/$150; Standard 2h ₡125,000/$285; Intensive 3h ₡183,000/$420; Immersion 4h ₡238,000/$545. Enrollment ₡15,000/$35. Kids enrollment ₡10,000/$25. No hourly billing, fixed monthly class counts, savings, or default highlighted plan.

## User decisions this pass

- Omit profile photographs until the owner identifies them after this first pass.
- Kids plan names are unnecessary. Read pricing graphics from supplied ZIPs.
- Do not pursue detailed policy reconciliation now.

## Source limitations

The Downloads kids ZIPs are byte-identical to the preserved archives. Visual inspection confirms conflicting private weekly schedules in CRC/USD and malformed `1. hours` labels. Kids pricing remains inquiry-only until durations are corrected. Group price billing unit and enrollment allocation are not stated; use group inquiries without ambiguous prices or group-placement guarantees. Photo identities remain unknown. These limitations do not block the rest of the update.

## Execution and acceptance

1. Implement source-grounded bilingual content, navigation, pricing and contact journeys.
2. Verify direct URLs and state persistence; exercise keyboard, mobile, tablet and desktop views.
3. Run `pnpm check`, independent read-only review, and resolve significant findings.
4. Record evidence and limitations in `project/STATUS.md`; deliver a local preview without publishing.


Latest hero amendment: replace the homepage main image with owner-supplied students-talking.jpg, preserving the curved treatment and both subjects in a landscape crop. No other page content changes requested.
