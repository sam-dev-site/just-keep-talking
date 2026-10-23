# Implementation brief

Current as of the published site at commit `0e99c96` (18 Sep 2026). Older layered notes are in `project/history/`.

## Authority

Accepted prices, plan names, weekly time, enrollment fees, and portrait assignments come from `intake/2027-program-update/owner-confirmed-pricing-and-portraits.md`. That file supersedes the four-plan prices and the inquiry-only kids and group limitation in `project/history/`.

Visitor-facing voice follows `project/VOICE.md`, which is distilled from `intake/owner-voice/2026-10-23-brand-voice-and-communication-guide.md` and earlier samples such as `intake/2027-program-update/website-information.txt`. Do not LLM-polish owner wording into antithesis headlines, em dashes, or sales hype. When new owner voice input arrives, refine `project/VOICE.md` in the same task (save the source under `intake/owner-voice/`, update the guide, note it in `project/STATUS.md`), then apply it to the site. Spanish on the public site generally uses usted.

Do not invent prices, billing-unit labels, testimonials, credentials, policies, or contact details. Phase 1 and Phase 2 pricing stays in the archive and off the public site.

## Audience and outcome

Adults and parents should understand the online language offer (English for all ages; Spanish for adults), choose an audience and format, review the four confirmed monthly plans, meet the team, and start a WhatsApp inquiry at +506 8685 8056 (`https://wa.me/50686858056`). Email is `justkeeptalkingcr@gmail.com`. Instagram is `@justkeeptalkingcr`.

## What the site contains

- Home: hero aimed at adults, a second-scroll “Language for you” with two paths (Adults and Kids), a short Our approach invitation, founder preview (“How Just Keep Talking started”), community preview, and WhatsApp. The hero line is “Build the confidence to speak.” The support line is personalized language instruction built around level, goals, and needs. The proof line names certified native teachers, personalized learning, and authentic conversation. The placement quiz is not on the public home page.
- Our approach: its own page, not a homepage scroll. The H1 is the central message “Learn a language by using it.” It presents conversational methodology visually (speech-bubble skills), including a full-width certified native teachers bubble with a Meet the team link, plus a three-step learning plan (intake meeting, start classes, measure progress). Individual teacher bios stay on the story page.
- FAQ: its own nav tab (`?page=faq`), covering levels, ages, online vs in-person immersion activities, private or group, getting started, methodology, and languages offered.
- Classes and pricing: title “Explore our plans,” a Costa Rica / Americas reach line, audience, private or group, group size when needed, independent CRC and USD controls, four plans, a separate one-time enrollment fee, and a contextual WhatsApp inquiry. No policy overview line on this page.
- Story and team: founder history from `intake/owner-voice/2026-10-23-audrey-our-story.md` (third person) and six biographies. Every card shows a role (Founder & teacher for Audrey; Teacher for others). Audrey, Cristian, and Monique have portraits. Iain, Shay, and Charlie use equal placeholders until photos arrive.
- Policies: a short policy overview effective 4 January 2027. Detailed policy reconciliation is still deferred. Footer and classes links say “Policy overview.”
- Teach with us: supplied benefits, expectations, and a separate application contact.
- Curriculum inquiries (`?page=curriculum`): low-profile page for teachers interested in the packaged A1–C2 curriculum. Footer link under Teach with us; WhatsApp and email inquiry only; no public curriculum pricing.
- English and Spanish UI, with the choice stored in the `lang` query parameter. Classes offered: English for all ages and Spanish for adults.

Adults use Essential, Standard, Intensive, and Immersion (1 / 2 / 3 / 4 hours weekly). Kids use Explorer, Builder, Achiever, and Fluent. Kids group weekly times are 30 min / 1 hr / 1.5 hr / 4 hr. Kids private weekly times follow the CRC and USD graphics separately (CRC: 30 min / 1 / 1.5 / 4; USD: 1 / 2 / 3 / 4).

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
- Four plans are live again from the 2027 graphics and owner Kids Private screenshots. CRC Achiever “1. hours” is published as 1.5 hours.
- Placement quiz remains in `app/placement-quiz.tsx` but is unwired from the home page until the owner asks to restore it.
