# Project status

## Audrey Our Story update — 23 October 2026

Owner supplied a new Our Story for Audrey (third person). Saved as `intake/owner-voice/2026-10-23-audrey-our-story.md`. Updated `project/VOICE.md` so the living guide points at that paste. Replaced the previous first-person story block on `?page=about` with her four paragraphs (EN exact; ES natural adaptation). Homepage founder preview left unchanged.

Removed the large story headline (“From learning the rules to finding a voice.” / “How this project began.”). The page keeps a single heading: the existing “Our story” / “Nuestra historia” label (styled as the eyebrow, marked up as `h1` for accessibility).

`pnpm check` passed: ESLint, production build, two server-render tests, seven Playwright tests (one mobile accessibility skip). Chromium only. Not merged to `main` unless the owner asks to publish.

## Updates round 2 + voice guide — 23 October 2026

Merged owner voice grounding (`cursor/owner-voice-grounding-64a9` / PR #7) into `cursor/updates-round-2-5ed6` (PR #8).

### Round 2
- Home audience wall is two boxes (Adults / Kids). Founder band is a single white heading “How Just Keep Talking started.” Closing eyebrow is lime.
- Classes title is “Explore our plans.” with a Costa Rica / Americas reach line; intake meeting is not restated there.
- Approach method bubbles in a plainer voice; learning-plan pill tags and the “Three steps…” lead removed.
- New `?page=curriculum`: Curriculum for teachers (A1–C2), Ask for more info → WhatsApp + email. Footer “Curriculum inquiries.” No curriculum prices.

### Voice (ingested and applied)
- Saved `intake/owner-voice/2026-10-23-brand-voice-and-communication-guide.md` and rebuilt `project/VOICE.md` (personality, “Learn a language by using it,” do/don’t examples, platforms, founder vs academy, Spanish usted, three feelings).
- Approach H1 uses the central message; classes adult line uses her preferred “understand a lot… when it's time to speak…” example.
- Public Spanish shifted to usted; first-person bios and founder story kept.
- Living-guide workflow noted in `AGENTS.md` and `.cursor/rules/project.mdc`.

`pnpm check` passed after the merge: ESLint, production build, two server-render tests, seven Playwright tests (one mobile accessibility skip). Chromium only. No WhatsApp or email sent. Branch pushed; not merged to `main` unless the owner asks to publish.

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

See newer sections above for the live four-plan and home status.
