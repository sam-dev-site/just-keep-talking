# Project status

## Starting-point quiz — 1 October 2026

The home page opens a Spanish-directed quiz, “Quiz: tu punto de partida,” from the starting-point section and from beside the beginner question. It does not open on its own, and it does not follow the site’s EN/ES toggle.

An adult sitting asks who it is for, what they want English for, five English questions, and what happens when someone speaks quickly. The five questions are drawn from 24 original items (eight easy, eight mid, eight harder): *do*-support, articles, present and past, phrasal verbs, false friends such as *actual* and *sensible*, dependent prepositions, and which sentence sounds natural. The sentences are not copied from a published exam. The browser remembers the items it has shown (`jkt-quiz-seen`) and prefers unseen ones, so a second sitting is not the same five questions.

The result is one of three pictures: Recién comenzando, Encontrando tu voz, or Listo para ir más lejos. It names three focuses and opens WhatsApp with that picture already written. It does not assign A1–C2 or recommend Essential or Standard. Five items are only a broad picture; the intake conversation still places the student. A parent path asks four unscored questions and does not give the child a level.

This is not published until the branch is merged. The owner should read the 24 items in `app/placement-quiz.tsx` before that.

`pnpm check` passed: ESLint, production build, two server-render tests, nine Playwright tests, and one skipped duplicate mobile accessibility pass.

Browser check at http://localhost:4173/: the quiz opens from the home starting-point section, an adult sitting ends on “Listo para ir más lejos” with three focuses and a Spanish WhatsApp message, and the parent path ends on “Una clase a su medida” without a level. Desktop at 1280px and a 390px-wide phone showed the dialog without horizontal overflow. No WhatsApp message was sent. Chromium only.

## Current state — 1 October 2026

The published site, GitHub `main`, and this checkout started from the same revision: `0e99c96` (“Deploy website correctly to GitHub Pages”, 18 Sep 2026).

Live site: https://sam-dev-site.github.io/just-keep-talking/

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

Pricing options were reloading the static page: updating the address went through the app router and jumped back to the top. They now update the address directly, so the plans change without a refresh.

GitHub repo description and homepage were not changed. GitHub CLI 2.102.0 is installed, and it is not logged in. After `gh auth login`, run:

```text
gh repo edit sam-dev-site/just-keep-talking --description "Bilingual marketing site for Just Keep Talking, an online English academy." --homepage https://sam-dev-site.github.io/just-keep-talking/
```
