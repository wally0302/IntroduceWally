# AI Restaurant Picker — delivery and verification

## Delivered

Bilingual `ai-restaurant` project, homepage cover and direct demo link, compact case introduction, local preference filtering and selection card. The demo starts after the gathering is confirmed, with six people, Friday 18:30 and Zhongshan as a fictional context. Four editable requirements affect the candidate list: budget, party size, vegetarian options and long stays. Up to three candidates expose matching facts and specific uncertainties. No eligible candidate produces an explicit recovery flow. The host selects a place and may return to compare or reset.

Source continuity: the original `src/mobile/AIRecommend/AIRecommendFlow.tsx` pre-fills party size from attendees; `PreferenceFormStep.tsx` presents optional tags; `RecommendResultsStep.tsx` lets the host choose directly. Original `src/lib/aiRecommendDemo.ts` uses a fixed list and authored reasons; this portfolio's strict filtering is a documented adaptation. No personal contribution claims or impact metrics were added. Per user steering, the case does not emphasize My Role.

## Checks

- `npm test`: 15/15 passed, including eight new rule tests (budget, capacity, dietary need, long stay, empty combination, max-three stable results, immutability).
- `npm run typecheck`: passed.
- `npm run build`: passed; bilingual restaurant routes included in static export.
- `git diff --check`: passed.
- No lint script is configured; none was added.
- Desktop 1440px: default candidates → choose → return to compare → edit preferences.
- Vegetarian toggle reduces default three candidates to Green Hour, with the vegetarian condition in its reasons and final decision.
- NT$400 + 10 people + vegetarian + long stay: zero results. Recovery explicitly resets to the six-person example and restores three candidates.
- Chinese 390px: selection, decision and reset; no horizontal overflow. Adjusted step focus/scroll so the result heading remains below sticky navigation.
- English 320px: vegetarian preference → Enter submits → Enter selects Green Hour → correct decision summary. No horizontal overflow; focus moves to the new heading.
- Browser warning/error log empty for the checked interactions.
- Screenshots: `artifacts/restaurant-demo-desktop.jpg`, `artifacts/restaurant-demo-mobile.jpg`.

## Boundaries and follow-up

No new dependency, backend, paid API, sign-in, booking or messaging. UI testing uses desktop browser viewport emulation, not physical phones. The 30–60 second path is a design target, not a measured interview study. Next useful validation: ask a few unfamiliar readers to try it for one minute, then describe the problem and the decision they made. Expand source-backed scenarios only if that test reveals a comprehension gap.
