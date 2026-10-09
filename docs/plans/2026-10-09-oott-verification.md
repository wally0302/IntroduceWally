# OOTT implementation and acceptance — 2026-10-09

## Delivery

New portfolio identity `oott`, number 07; localized detail routes `/zh/projects/oott/` and `/en/projects/oott/`. The index includes category, period, role, case-study and direct demo links. Existing project records were not replaced by OOTT. The original OOTT repository was researched read-only at `5b6d93f896cd866c327810a2de834915527dd895` and was not modified or deployed.

Latest source preview: http://127.0.0.1:3000/zh/projects/oott/ (`npm run dev -- --port 3000`). The production preview on 4188 is an earlier successful build; use port 3000 for latest source. No deployment performed.

## Implemented scope

- Intro, source commit, role and explicit competition/iteration dates.
- Two independent demo paths sharing a 12-item owned wardrobe; 3 optional additions; 3 separate non-owned products.
- Category filtering, item detail, truthful preset tags, deterministic scenario recommendation, strict exclusions, changing reasons, missing-candidate recovery.
- Weekly plan saves exact IDs and snapshots; move swaps occupied days, removal works; incomplete outfits cannot be saved.
- Product selection and same-model/item asset lookup. Empty lookup renders an honest missing-media state. An authorized-pair component supports side-by-side comparison, lazy load, loading/error states and retry when valid media is provided.
- Full reset and refresh reset; A/B switching preserves the wardrobe and existing plans.
- Eight substantive chapters in Chinese and English: problem, strategy, decisions, data, execution, business, evidence, reflection. The embedded product walkthrough is intentionally Traditional Chinese, explicitly labeled in the English route with `lang=zh-Hant`.
- Problem/job cards, wardrobe-first trade-off, expandable decision matrix, four-layer data map, evidence timeline, business gate, three-column evidence board and proposed experiments.
- Desktop sticky TOC with active chapter; collapsible tablet/mobile TOC; accessible controls, focus restoration and reduced-motion CSS.

## Source boundaries

- February PRD is planning evidence, May NTUE is competition demonstration, June 7 is code iteration.
- 53 means the May deck's registered Web users, requiring backend verification. It does not mean DAU, paid users, retention, PMF or proven business results.
- CTO responsibilities are separated from team strategy. No competition award is invented.
- Business, data commercialization and sustainability claims remain hypotheses/plans.
- Grounding evidence cites its actual code and conditional query/fallback behavior. Source discrepancies are recorded separately in `2026-10-09-oott-source-audit.md`.
- Competition references derive from the supplied spec. The original 30-page PDF and speech were not available here.

## Browser acceptance actually performed

Using the built-in browser against the production export and then the latest source preview:

| Check | Result |
| --- | --- |
| Homepage OOTT card, role/tags, case link, demo link and return | Pass; latest card verified on port 3000 |
| 1440 × 1000 desktop | No horizontal overflow; sticky TOC and active strategy chapter correct |
| 820 × 1000 tablet | No horizontal overflow |
| 390 × 844 mobile | No horizontal overflow across wardrobe, results, try-on and case study |
| Eight chapters and internal anchors | Eight sections; no broken hash targets |
| Add sand overshirt + filter tops | Wardrobe increases to 13; top filter shows 4 |
| Outdoor → client meeting | Four selected items change logically |
| Replace meeting blazer | Missing outerwear message; planner disabled; clear exclusions recovers |
| Replace meeting shirt using Enter | Changes to navy knit; reasons update |
| Save Wednesday → move Friday → remove | Correct day and actual four-item snapshot; remove clears it |
| A → B switch | 13-item wardrobe preserved |
| Select blue shirt, preview, change to burgundy knit | Missing-pair text follows selected product; no fake generated image |
| Reset / reload | Reset reports 12-item baseline and clears plan/selections; reload is session-local |
| Mobile TOC / decision matrix via keyboard | Navigation works; Enter expands native details |
| Focus | After advancing, focus is on the new stage heading |
| English detail metadata | Correct title/OG title, translated eight chapters, Chinese demo labeled |
| Console | No warning or error observed in production or latest OOTT source flow |
| Reduced motion | CSS inspection: global smooth scrolling disabled and OOTT animations/transitions disabled; OS preference was not changed |

Screenshots in `docs/plans/oott-verification/`: desktop prototype, desktop strategy, mobile wardrobe, mobile decisions.

## Executed engineering checks

- `npm test -- src/lib/oott-demo.test.ts src/lib/content.test.ts`: **16 passed** (12 OOTT rules/state, 4 portfolio contracts).
- `npx tsc -p artifacts/oott-tsconfig.json`: **passed**. The ignored temporary config extends the actual project config and checks OOTT component/data/engine files and their imports without the unrelated route implementation.
- `git diff --check`: **passed**.
- Earlier full `npm test` and `npm run build` passed (41 tests; 21 exported pages) before additional, unrelated GatherTime edits appeared in the shared workspace.
- **Final full `npm test`: 40 passed / 1 failed.** `src/lib/gather-demo.test.ts:27` expects a guest response that is absent. This file was created/changed by separate work during this task and was not edited for OOTT.
- **Final full `npm run typecheck` and `npm run build`: blocked by `src/components/GatherDemo.tsx:79`**, `t.room` does not exist in the localized copy type. Build compiles, then fails that TypeScript check. OOTT does not import this component. Preserved the unrelated work instead of changing another existing project.
- No lint script or lint configuration is provided in `package.json`; no lint pass is claimed.

## Incomplete acceptance / inputs required

**Try-on visual demonstration is not fully accepted.** Missing: one licensed frontal full-body model before image and matching same-model/view after images for Forest Green Parka, Relaxed Blue Shirt and Burgundy Knit Top. One valid pair can enable that product; the other products must remain unavailable. Record provenance, usage permission and model consent. See `2026-10-09-oott-assets.md`.

Registered-user count and competition source material still require original deck/backend confirmation. No live AI requests, generated try-on, real weather, sign-in, payments or private data are used.

## Files

New feature: `src/data/oott.ts`, `src/data/oott-demo.ts`, `src/lib/oott-demo.ts`, `src/lib/oott-demo.test.ts`, `src/components/OottProject.tsx`, `OottDemo.tsx`, `OottGarment.tsx`, `OottNav.tsx`, `OottTryOnMedia.tsx`, `oott.css`.

Small integration additions: existing project route, `src/data/content.ts`, `src/lib/types.ts`, `src/components/Home.tsx`, `src/components/DecisionReveal.tsx`, `src/lib/content.test.ts`. These files also contain pre-existing or concurrent changes; the entire working-tree diff is not attributable to OOTT.
