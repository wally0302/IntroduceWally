# KeFu demo — implementation and verification

## Delivered

- `src/components/KefuDemo.tsx` and `kefu-demo.css`: bilingual client-only workspace, with fictional customer conversations, editable review drafts, human takeover, simulated sending/discarding, explicit FAQ proposal acceptance/discard, retry and reset.
- KeFu case page shows the workspace before the cover and prose. Homepage adds a direct `#interactive-demo` link. Existing AWS and other project work remains intact.
- The source project was started with Vite at port 5175 and its login page inspected. The authenticated dashboard was studied through source code; no Google login or production backend operation was performed.
- GPT-5.6 Luna produced the initial component and integration, then reached a usage limit. The parent completed the state transitions, UI corrections and verification.

## Product fidelity

Sources and selection rationale are recorded in `2026-10-08-kefu-demo-design.md`. This is a condensed interface inspired by the implemented inbox and FAQ review workflow, not a live embed. Local simulation copies the edited reply into an editable FAQ proposal; it does not perform AI extraction, semantic classification or model training. Accepting the proposal is a separate action. Published success rates or customer counts were not inferred from source marketing copy.

## Verified

- Typecheck, existing Vitest suite (7 tests), production static build and `git diff --check` pass.
- All eight localized case pages exported; each KeFu output contains one interactive demo anchor.
- Chinese: apply delivery example → send → FAQ proposal → edit proposal to 8–10 days → accept → retry shows the exact edited 8–10-day text. The previously sent message remains the original 5–7-day correction.
- Discarding a FAQ proposal retains the old 3–5-day knowledge on retry.
- Empty/whitespace draft and FAQ inputs disable their submit controls.
- Reset removes the proposal and restores initial knowledge and conversation state. Visiting knowledge first gives a working entry point to draft review.
- Switching to the refund conversation exposes human takeover; discarding its draft leaves it unsent.
- English: complete correction, send, FAQ acceptance and retry flow; keyboard Enter opens review.
- Chinese 390px and English 320px layout checks found no horizontal page overflow. English navigation label shortened to Inbox for narrow screens. Language switching retains the demo anchor.
- Browser error/warning log was empty after these interactions.
- Desktop screenshot: `artifacts/kefu-demo-desktop.jpg` (local verification artifact).

No public deployment, real device check or live AI/backend verification was performed. The original project and the portfolio retain separate runtimes.
