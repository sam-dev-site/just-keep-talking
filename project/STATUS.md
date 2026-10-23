# Project status

## Brand voice guide ingested — 23 October 2026

Saved `intake/owner-voice/2026-10-23-brand-voice-and-communication-guide.md` and rebuilt `project/VOICE.md` from it.

Guide now covers personality, central message (“Learn a language by using it”), writing do/don’t with her examples, website vs Instagram vs WhatsApp, founder vs academy voice, Spanish generally with usted, and the three feelings (understood, confident in expertise, comfortable).

Site pass from that guide:

- Approach H1 uses the central message; intro and FAQ methodology stress conversation plus structure (not grammar as the enemy, not chat-only).
- Classes adult line uses her preferred “understand a lot… when it's time to speak…” example.
- Public Spanish shifted toward usted on home, FAQ, story address to the reader, policies, teach, and closing (Classes/Approach were already usted). First-person bios and founder story stay in yo.

`pnpm check` after this pass: ESLint, production build, two server-render tests, seven Playwright tests (one mobile accessibility skip). Chromium only. No WhatsApp or email sent.

## Owner voice grounding — 23 October 2026

Grounded visitor-facing copy in Audrey’s voice and locked the rule for future edits.

- Added `project/VOICE.md`: keep owner wording, ban em dashes and “not X but Y” / From-to polish, prefer first-person bios and story from `intake/2027-program-update/website-information.txt`.
- Pointed `AGENTS.md`, `.cursor/rules/project.mdc`, and `project/BRIEF.md` at that guide.
- Rewrote AI-smoothed site strings in `app/page.tsx`: founder story restored to her first person, teacher bios restored to supplied first person (Monique typo `hope` → `hop`), approach/home/teach headlines and method lead stripped of antithesis and em dashes, teach lists aligned to her supplied benefits and expectations.
- Made the guide a living document: any new Audrey copy or voice feedback must be saved under `intake/owner-voice/`, used to refine `project/VOICE.md`, noted here, then applied to the site in the same task.

Do not push `main` unless she asks.

## Classes & Approach four-plan refresh — 23 October 2026

Scope: Classes & pricing and Our approach only. Home was left for the parallel home-page agent.

- Classes show four plans. Adults: Essential / Standard / Intensive / Immersion (1–4 hours). Kids: Explorer / Builder / Achiever / Fluent. Kids private weekly times differ by currency (CRC 30 min / 1 / 1.5 / 4; USD 1 / 2 / 3 / 4). Kids group uses 30 min / 1 / 1.5 / 4 in both currencies. CRC Achiever “1. hours” is published as 1.5 hours.
- Removed the classes-page policy overview line. Classes and Approach Spanish use usted; “one-to-one” → “intake meeting” / “reunión de entrevista” on those pages only.
- Approach: dropped “Conversation, with a plan behind it” and the Getting started section. Visual methodology bubbles + three learning-plan steps. Photos: `approach-2508.webp` (primary), `approach-2602.webp` (plan section). `approach-7780.webp` optimized and reserved.

`pnpm check` passed: ESLint, production build, two server-render tests, seven Playwright tests (one mobile accessibility skip). Browser screenshots at 1280px and 390px for classes and approach EN/ES. Home hero still “Build the confidence.” Chromium only. No WhatsApp or email sent.

## Home page updates — 23 October 2026

Owner-directed home pass. Merged to `main` on 23 October 2026 (America/Guatemala) at the owner’s request so GitHub Pages can publish:

- Hero support and proof lines updated; closing CTA says “language”; footer tagline removed; policy links say “Policy overview.”
- Second scroll is adults-by-need (work, travel, personal interest, school) plus a kids path; placement quiz removed from the home UI (file kept unwired).
- Approach teaser is a single “Our approach” heading with the intake-meeting copy. Founder band is “How Just Keep Talking started” with the updated Audrey preview bio.
- Community section is “Meet our community” / “See more,” with a Teacher role under every team card (Founder & teacher for Audrey).
- FAQ moved to `?page=faq` with rewritten questions, immersion-activities answer, methodology, and languages (English all ages; Spanish for adults).
- Photo swaps applied from owner uploads: hero `dch_2644`, Audrey teacher/bio `dch_7238` (corrected from `dch_7245`), home founder band `DCH_2554-Editar` → `audrey-home-founder.webp` (Our story still uses `audrey-founder.webp`), Monique `DCH_2425`.

`pnpm check` passed after the photo pass: ESLint, production build, two server-render tests, seven Playwright tests (one mobile accessibility skip as usual). Chromium only. No WhatsApp or email message was sent.

## Photos applied — 23 October 2026

Optimized WebPs written under `public/brand/` and wired on `cursor/home-page-updates-c604`. Audrey bio uses `dch_7238`, not `dch_7245`.

## Quiz callout — 2 October 2026

The home-page quiz is a navy card under the adult and kids paths, with a short invitation and a button: “Start the quiz” / “Empieza el quiz.” The quiz itself is still in Spanish. A text link remains beside the beginner question. This card is not on the live site until this branch is merged.

`pnpm check` passed: ESLint, production build, two server-render tests, nine Playwright tests, and one skipped duplicate mobile accessibility pass. Browser check at http://localhost:4173/: the card on a 1280px desktop, a 390px phone, and the Spanish page. No horizontal overflow. The quiz still opens from that button. Chromium only.

## Starting-point quiz — 1 October 2026

The home page opens a Spanish-directed quiz from the starting-point section and from beside the beginner question. It does not open on its own, and it does not follow the site’s EN/ES toggle.

An adult sitting asks who it is for, what they want English for, five English questions, and what happens when someone speaks quickly. The five questions are drawn from 24 original items (eight easy, eight mid, eight harder): *do*-support, articles, present and past, phrasal verbs, false friends such as *actual* and *sensible*, dependent prepositions, and which sentence sounds natural. The sentences are not copied from a published exam. The browser remembers the items it has shown (`jkt-quiz-seen`) and prefers unseen ones, so a second sitting is not the same five questions.

The result is one of three pictures: Recién comenzando, Encontrando tu voz, or Listo para ir más lejos. It names three focuses and opens WhatsApp with that picture already written. It does not assign A1–C2 or recommend Essential or Standard. Five items are only a broad picture; the intake conversation still places the student. A parent path asks four unscored questions and does not give the child a level.

This is not published until the branch is merged. The owner should read the 24 items in `app/placement-quiz.tsx` before that.

`pnpm check` passed: ESLint, production build, two server-render tests, nine Playwright tests, and one skipped duplicate mobile accessibility pass.

Browser check at http://localhost:4173/: the quiz opens from the home starting-point section, an adult sitting ends on “Listo para ir más lejos” with three focuses and a Spanish WhatsApp message, and the parent path ends on “Una clase a su medida” without a level. Desktop at 1280px and a 390px-wide phone showed the dialog without horizontal overflow. No WhatsApp message was sent. Chromium only.

## Current state — 2 October 2026

Live site: https://www.justkeeptalkingcr.com

GoDaddy DNS for `justkeeptalkingcr.com` points at GitHub Pages. The custom domain in the repository Pages settings is `www.justkeeptalkingcr.com`. The Pages build no longer sets `NEXT_PUBLIC_BASE_PATH=/just-keep-talking`, so styles, images, and links are served from the domain root. `justkeeptalking.com` is a different site and is not part of this project.

Local preview: from this directory, `pnpm dev`, then open the address the dev server prints. `pnpm check` is the handoff check.

The September status that said the two-plan pricing and portraits were uncommitted and unpublished is archived in `project/history/STATUS-2026-09.md`. Those changes are what `0e99c96` deployed.

## What is live

- Bilingual home, classes and pricing, story and team, upcoming 2027 policy overview, and teacher recruitment.
- Two plans for every audience, format, group size, and currency, using the amounts in `intake/2027-program-update/owner-confirmed-pricing-and-portraits.md`.
- Portraits for Audrey (founder and teacher), Cristian, and Monique. Placeholders for Iain, Shay, and Charlie.
- WhatsApp as the primary inquiry, with the selected plan included from the classes page.

## Remaining inputs

- Photos for Iain, Shay, and Charlie.
- A group-price billing unit, if the owner wants one shown.
- Detailed policy text. The public page stays a short overview effective 4 January 2027 until that is requested.
- Real student testimonials. Do not invent them. When quotes arrive, use two or three short lines from adult professionals, with permission for a first name and a role or city, after the learning-plan section, in both languages.
- Whether 3-hour and 4-hour plans should return. Audrey asked for four plans on 18 September 2026. The prices confirmed after that are still the two published plans. Older graphics are not being restored.
- Optional clarifications listed in `project/BRIEF.md`. Do not invent them.

## Approach page — 1 October 2026

“Our approach” is its own page. The homepage keeps a short invitation and a link. The page explains how conversation is guided, how the learning plan is built, and the four steps for getting started. It is not published until this branch is merged.

`pnpm check` passed: ESLint, production build, two server-render tests, seven Playwright tests, and one skipped duplicate mobile accessibility pass.

Browser check at http://localhost:4173/: from a scrolled English homepage, “Our approach” opens `?page=approach` at the top, with the nav item marked current. Spanish shows the same page. A 390px-wide view has no horizontal overflow. No WhatsApp or email message was sent. Chromium only.

## Credibility pass — 1 October 2026

The homepage now speaks to adult professionals without dropping the kids path or the conversational tone.

- Hero support line and proof line use Audrey’s wording: personalized instruction around level, goals, and the conversations that matter; certified native teachers, personalized learning, real conversation, online across the Americas.
- A “How your learning is planned” section covers the one-to-one meeting, brief oral evaluation, personal learning plan, developed lesson library, and progress reports. It does not state a report schedule, a year count, a certification body, or a lesson count.
- Getting started is Audrey’s four steps, beginning with a WhatsApp message and the one-to-one meeting.
- Visible “JKT” is now “Just Keep Talking.” Teacher bios are unchanged.
- Header and footer use the speech-bubble mark beside the name. The tall wordmark is no longer in the header.
- Classes still show exactly two plans. Testimonials are not on the site.
- This pass is not published. Do not push `main` unless the owner asks.

`pnpm check` passed on this branch: ESLint, production build, two server-render tests, seven Playwright tests, and one intentionally skipped duplicate mobile accessibility pass.

Browser check at http://localhost:4173/: English and Spanish home, including the four intake steps and the learning-plan list; classes for adult private in colones (Essential ₡65,000, Standard ₡125,000) and a Spanish kids group of 4+ in dollars (Explorer $42, Builder $80); header and footer lockup; mobile menu at 390px. No horizontal overflow and no console errors. Chromium only. No WhatsApp or email message was sent.

## This working tree — 1 October 2026

Cursor now uses this directory as the project root. Superseded planning notes are in `project/history/`. The current brief is `project/BRIEF.md`.

UI pass, using only facts already on the site:

- Hash targets scroll into view after the client view loads.
- `audience`, `format`, `currency`, and `size` stay on classes links only.
- Plan inquiries use the same button treatment as the main WhatsApp action.
- The home team preview shows Audrey, Monique, and Cristian. The full team page keeps its original order.
- The footer policy link says “Upcoming 2027 policy overview” / “Resumen de la próxima política de 2027”.

`pnpm check` passed on this working tree: ESLint, production build, two server-render tests, seven Playwright tests, and one intentionally skipped duplicate mobile accessibility pass. An earlier desktop run failed two hydration waits while the dev server was still starting; the same suite passed on the next run and in the full check.

Browser check at http://localhost:4173/: desktop home, “Our approach” landing on `#approach`, direct `#team` on the story page, classes controls for group size and USD, Spanish with the same selection kept, and a 390px-wide Spanish kids group of 4+ (Explorer $42, Builder $80, no horizontal overflow, mobile menu opens). Chromium only. No WhatsApp or email message was sent.

Pushed to `main` as `e720567` on 1 October 2026. That push starts the GitHub Pages deploy.

On 2 October 2026 the Pages artifact build stopped setting `NEXT_PUBLIC_BASE_PATH`. A local static export wrote stylesheet, image, and page links at `/`, with no `/just-keep-talking` prefix. After rebasing onto the quiz and approach-page commits, ESLint passed, both server-render tests passed, and Playwright passed 9 tests with the usual mobile accessibility check skipped.

Pricing options were reloading the static page: updating the address went through the app router and jumped back to the top. They now update the address directly, so the plans change without a refresh.

GitHub repo description and homepage were not changed. GitHub CLI 2.102.0 is installed, and it is not logged in. After `gh auth login`, run:

```text
gh repo edit sam-dev-site/just-keep-talking --description "Bilingual marketing site for Just Keep Talking, an online English academy." --homepage https://www.justkeeptalkingcr.com
```
