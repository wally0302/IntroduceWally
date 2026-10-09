# AI restaurant picker — portfolio distillation

The user explicitly requested research followed by implementation in the existing portfolio, and delegated product/UX choices. They confirmed involvement across the project but prefer no personal-role emphasis. No outcome metrics or customer evidence will be invented.

## Evidence and distinction

Original: https://github.com/That-is-so-sweet/That-is-so-sweet (main, inspected 2026-10-09).
- README: 揪甘心 is a static gathering-coordination demo, not a production AI service.
- src/lib/aiRecommendDemo.ts: event-derived party size; optional relationship/location/budget/diet/context preferences; authored recommendation reasons; five fixed fictional candidates; cosmetic refresh shuffle, no Places or LLM calls.
- src/mobile/AIRecommend/PreferenceFormStep.tsx: preference tags and default path.
- Local doc/PROFILE_DATA.md: AI recommendation follows confirmed gathering intent.

## Decision

Considered: open-ended chat (suggests capabilities this demo cannot support), full scheduling flow (too long), focused post-confirmation selection (chosen). KeFu's multi-workspace loop needs substantial navigation. This case leads with one short task, progressive disclosure, visible consequences, and a definite ending.

Start with six friends, Friday 18:30, Zhongshan station. Inherit context rather than ask visitors to create an event. Adjust budget, party size, vegetarian and long-stay needs. Show up to three fictional restaurants, exact matching facts and reservation caveats. Pick one to form a local decision card; return to compare or reset. No actual reservation or messaging.

Portfolio adaptation: deterministic hard filtering and walking-distance ordering make changed conditions consequential. These are authored demonstration rules, not claims about the source model. No invented confidence scores, ratings, live availability or real-business addresses. No matches gives an explicit recovery action, never silently relaxes a constraint.

## Implementation

Dedicated bilingual client component and scoped stylesheet using existing paper/ink/green tokens. New ai-restaurant project in data-driven static routes/homepage/sitemap; compact introduction, demo before prose, no duplicate conceptual cover on the case page. Keep other projects unchanged. Local state only; no additional packages. Focus management on step transitions, accessible form controls/status, reduced-motion support, responsive one-column mobile layout.

## Acceptance

Meaningful happy path in 3 actions; preset and edited conditions; explicit empty state/recovery; pick/reselect/reset; zh/en; keyboard focus; 320px and desktop widths; deterministic engine tests, existing suite, typecheck, static build, diff check. No deployment required.
