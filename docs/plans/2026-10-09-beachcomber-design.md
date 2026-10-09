# Beachcomber portfolio exhibit — 2026-10-09

## Intent and chosen design
User explicitly authorizes design choices and direct implementation after research. Proceed without an extra approval gate. Brainstorming applied to context, alternatives, scope and plan; no writing-plans skill is installed. Preserve existing dirty restaurant work. No dependencies, secrets, remote AI calls or deployment.

Considered: (1) guided four-step slideshow (clear but passive); (2) a miniature original workbench (faithful but dense, like KeFu); (3) a focused requirements workbench (chosen). One fictional ceramics booking scenario, three gaps, two possible authored answers per gap. No preliminary scenario chooser; it adds a click without demonstrating value. Answers visibly become rules, then an actual booking interaction. Specs are optional, share requirement/source IDs and reflect the same answers. This portfolio adds deterministic answer selection and requirement-to-UI mapping; these are not claimed as existing original product features.

Happy path: understand premise 0–5s; choose a follow-up and see its business consequence by 15s; confirm three answers, build preview, choose slot and simulate deposit/reservation by 30–60s. No timed gates. Jump-to-sample explicitly fills missing answers; unconfirmed rules remain unknown until answered. Edit choices invalidates the result and resets booking state. Reset clears all choices. Cancellation and capacity rules work inside the preview. Only fictional dates/slots, no real booking/payment.

Editorial paper/ink/blue palette, restrained linework, requirement numbers repeated on preview and specs. Large quotation on left, output blueprint on right; filled answers transition from unresolved to confirmed. Reveal motion helps show translation; reduced-motion honored. Responsive stack, native buttons, fieldsets, focus handling and live status.

## Research evidence
Reviewed 2026-10-09, repository snapshots fetched by agents.
- FE: https://github.com/The-Beachcomber/beachcomber-fe README, app/page.tsx, VoiceInput, FollowupCards, PrototypeModal, lib/api/{meetings,prototype,spec,session}. Next/React workbench; live STT wiring; transcript sent while listening every 30s; AI questions; HTML preview; role specs. Session API and archive restoration/export are stubs. FollowupCards does not expose passed adoption callbacks. README latency numbers are team reports, not independently measured; not used as portfolio results.
- BE: https://github.com/The-Beachcomber/beachcomber-be main.py and hermes.py. FastAPI three endpoints, process-local meeting memory, previous response ID; mock is default via USE_MOCK_HERMES. verified_count hardcoded 0, not semantic verification. Dedicated calls for prototypes/specs, four specs generated then selected roles returned. Single-instance memory limits.
- AI: https://github.com/The-Beachcomber/hackathon-hermes public_startup.py, prototype_prompt.txt, spec_baseline_prompt.txt, spec_role_prompt.txt. Self-contained HTML generation with mock disclosure; one fact baseline with S-/R- IDs and confirmed/proposal/unresolved/conflict status; role-specific generation, structure validation/retry, GCS upload/readback. Structural consistency does not prove factual correctness. Model and upload unit tests use patches.
- Official https://www.futuremode.xyz/hackathon retrieved with HTTP 200 after web reader/browser timed out. BUILDMODE at FUTUREMODE, Sept 4–6 2026, collaborative AI product building; Future of Work and AI Agents & Automation briefs are thematically aligned (inference, not verified entered track). No results found proving award/ranking. No award claim added.
- Live supplied demo https://beachcomber-fe-1021189182492.asia-east1.run.app/ returns visible 404. No live backend calls attempted.
- Video https://www.youtube.com/watch?v=ZvLAx_R2K0A titled 乘風破prompt-趕海人號_SyncFrame, Wally channel, duration 1:36; no supplied captions or description. Opening frame observed: shallow questions lose pain points; differing mental images derail discussion. Further visual review recorded in verification document if available.
- FE README team table attributes 黃郁庭: requirements integration, interview scenarios/demo script, output acceptance, judging video; Fangyu Kung frontend, other members backend/AI/deployment. User confirmed in chat that 黃郁庭 is their attribution; display the credited scope as personal contribution. Do not infer PM leadership, exact decisions or award.

## KeFu assessment
Preserve localized routing, honest mock boundaries, native UI interactions and existing visual palette. KeFu convincingly demonstrates human handoff, but its multi-pane workflow and four actions before retrial need more reading; cover repeats below live demo and long narrative pushes value away. Beachcomber moves directly to the demo, removes duplicate cover from detail, gives sample shortcut, shows causal answer-to-result links, and limits deeper narrative to three short sections.

## Scope
Keep: questions, editable confirmed rules, clickable prototype, optional PM/UI/Engineering/QA snippets, source links, concise team story. Simplify: transcript to short scripted answers; generation to immediate authored state; specs to 3 rows. Omit: mic/login/session/archive/full document export/cloud/wait simulation. Existing source implements integrations but deployed operation unverified; local session/archive/export stubs distinguished from future durable storage/semantic checking. No impact/time-saving metric claimed.

## Implementation / acceptance
1. Typed local answer model + rule/spec derivation, meaningful branching tests.
2. Client BeachcomberDemo with locally scoped CSS, responsive preview, reduced motion.
3. New localized case data and project identity; custom case branch, home demo link and cover.
4. Unit suite/typecheck/build; browser happy path, alternate rules, edit/reset/sample, role switch, keyboard and 390px/desktop widths. No existing lint script or ESLint dependency: report honestly, avoid adding tooling solely for this.
