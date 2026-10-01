# Implementation brief

Current as of the published site at commit `0e99c96` (18 Sep 2026). Older layered notes are in `project/history/`.

## Authority

Accepted prices, plan names, weekly time, enrollment fees, and portrait assignments come from `intake/2027-program-update/owner-confirmed-pricing-and-portraits.md`. That file supersedes the four-plan prices and the inquiry-only kids and group limitation in `project/history/`.

Do not invent prices, billing-unit labels, testimonials, credentials, policies, or contact details. Phase 1 and Phase 2 pricing stays in the archive and off the public site.

## Audience and outcome

Adults and parents should understand the online English offer, choose an audience and format, review the two confirmed monthly plans, meet the team, and start a WhatsApp inquiry at +506 8685 8056 (`https://wa.me/50686858056`). Email is `justkeeptalkingcr@gmail.com`. Instagram is `@justkeeptalkingcr`.

## What the site contains

- Home: hero, adult and child paths, three teaching principles, founder preview, three enrollment steps, team preview, FAQs, and WhatsApp.
- Classes and pricing: audience, private or group, group size when needed, independent CRC and USD controls, exactly two plans, a separate one-time enrollment fee, and a contextual WhatsApp inquiry.
- Story and team: founder history and six biographies. Audrey, Cristian, and Monique have portraits. Iain, Shay, and Charlie use equal placeholders until photos arrive.
- Policies: a short upcoming overview effective 4 January 2027. Detailed policy reconciliation is still deferred.
- Teach with us: supplied benefits, expectations, and a separate application contact.
- English and Spanish, with the choice stored in the `lang` query parameter.

Kids groups use Explorer (30 minutes weekly) and Builder (1 hour weekly). Every other combination uses Essential (1 hour weekly) and Standard (2 hours weekly).

## Architecture

One static brochure. The live host is GitHub Pages at `https://sam-dev-site.github.io/just-keep-talking/`. A push to `main` runs `.github/workflows/quality.yml`, which builds with `NEXT_PUBLIC_BASE_PATH=/just-keep-talking` and `STATIC_EXPORT=true`, then deploys `dist/client`. Do not push unless the owner asks.

Views are query parameters on `app/page.tsx` (`page`, `lang`, and on the classes view `audience`, `format`, `currency`, `size`). Components may live under `app/`. Do not add a second static site. The Cloudflare worker and `.openai/hosting.json` are leftover starter files and are not the live host.

## Still open

- Photos for Iain, Shay, and Charlie.
- Whether group prices are per student or for the whole group. Do not add a label until the owner says which.
- Detailed current cancellation and attendance terms.
- Whether Cristian’s public bio should state that he teaches English here. The supplied bio describes teaching Spanish.
- Testimonials, a kids age range, and a custom domain are not in the confirmed notes.
