# Implementation brief

Current as of the published site at commit `0e99c96` (18 Sep 2026). Older layered notes are in `project/history/`.

## Authority

Accepted prices, plan names, weekly time, enrollment fees, and portrait assignments come from `intake/2027-program-update/owner-confirmed-pricing-and-portraits.md`. That file supersedes the four-plan prices and the inquiry-only kids and group limitation in `project/history/`.

Do not invent prices, billing-unit labels, testimonials, credentials, policies, or contact details. Phase 1 and Phase 2 pricing stays in the archive and off the public site.

## Audience and outcome

Adults and parents should understand the online language offer (English for all ages; Spanish for adults), choose an audience and format, review the two confirmed monthly plans, meet the team, and start a WhatsApp inquiry at +506 8685 8056 (`https://wa.me/50686858056`). Email is `justkeeptalkingcr@gmail.com`. Instagram is `@justkeeptalkingcr`.

## What the site contains

- Home: hero aimed at adults, a second-scroll “Language for you” grid of adult needs (work, travel, personal interest, school), a kids path (“English for your child”), a short Our approach invitation, founder preview, community preview, and WhatsApp. The hero line is “Build the confidence to speak.” The support line is personalized language instruction built around level, goals, and needs. The proof line names certified native teachers, personalized learning, and authentic conversation. The placement quiz is not on the public home page.
- Our approach: its own page, not a homepage scroll. It explains guided conversation, the five-part learning plan, the four-step start, and that classes are led by certified native teachers. Individual teacher bios stay on the story page.
- FAQ: its own nav tab (`?page=faq`), covering levels, ages, online vs in-person immersion activities, private or group, getting started, methodology, and languages offered.
- Classes and pricing: audience, private or group, group size when needed, independent CRC and USD controls, exactly two plans, a separate one-time enrollment fee, and a contextual WhatsApp inquiry.
- Story and team: founder history and six biographies. Every card shows a role (Founder & teacher for Audrey; Teacher for others). Audrey, Cristian, and Monique have portraits. Iain, Shay, and Charlie use equal placeholders until photos arrive.
- Policies: a short policy overview effective 4 January 2027. Detailed policy reconciliation is still deferred. Footer and classes links say “Policy overview.”
- Teach with us: supplied benefits, expectations, and a separate application contact.
- English and Spanish UI, with the choice stored in the `lang` query parameter. Classes offered: English for all ages and Spanish for adults.

Kids groups use Explorer (30 minutes weekly) and Builder (1 hour weekly). Every other combination uses Essential (1 hour weekly) and Standard (2 hours weekly).

## Architecture

One static brochure. The live host is GitHub Pages at `https://www.justkeeptalkingcr.com`. A push to `main` runs `.github/workflows/quality.yml`, which builds with `STATIC_EXPORT=true` and deploys `dist/client` at the domain root. Do not push unless the owner asks.

Views are query parameters on `app/page.tsx` (`page`, `lang`, and on the classes view `audience`, `format`, `currency`, `size`). Components may live under `app/`. Do not add a second static site. The Cloudflare worker and `.openai/hosting.json` are leftover starter files and are not the live host.

## Still open

- Photo swaps applied: home hero `dch_2644`, Audrey teacher card `dch_7238` (not `dch_7245`), home founder band `DCH_2554-Editar` (Our story keeps current founder portrait), Monique teacher card `DCH_2425` (home and Meet Us).
- Photos for Iain, Shay, and Charlie.
- Whether group prices are per student or for the whole group. Do not add a label until the owner says which.
- Detailed current cancellation and attendance terms.
- Whether Cristian’s public bio should state that he teaches English here. The supplied bio describes teaching Spanish.
- Testimonials and a kids age range are not in the confirmed notes. Do not publish testimonials until the owner supplies real quotes, with permission to use a first name and a role or city. When they arrive, place two or three short lines on the approach page after the learning plan.
- Audrey asked on 18 September 2026 for four plans on every audience. The prices confirmed after that are still the two plans above. Do not restore Intensive, Immersion, Achiever, or Fluent from older graphics. Ask whether the longer plans should return, and for current prices if they should. Kids third-plan durations in those graphics are still unresolved.
- Placement quiz remains in `app/placement-quiz.tsx` but is unwired from the home page until the owner asks to restore it.
