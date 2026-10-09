# KeFu portfolio demonstration

The user authorized reading `/Users/oaowally123/Downloads/kefuall`, planning an interactive portfolio demo, and delegating implementation to GPT-5.6 Luna. This request is interpreted as KeFu based on the source folder and prior conversation; the mention of AWS is treated as a reference to the existing interactive case format.

## Selection and evidence

Prefer a compact working product slice over screenshots alone or importing the full authenticated dashboard. Screenshots cannot show consequences of a visitor's decision; the full application requires authentication, APIs and a lengthy onboarding flow.

Demonstrate the loop: customer question → knowledge-backed response / human review → edit and simulate sending → proposed FAQ correction → explicit acceptance → retry with updated knowledge.

Source evidence (relative to kefuall):
- `kefu_frontend/src/components/InboxView.jsx`: conversation selection, human mode, editable pending-review drafts, sending and discarding.
- `kefu_frontend/src/components/ConversationAnalystView.jsx`: FAQ suggestions, old/new values, editing and acceptance.
- `kefu_backend/app/services/evolution_service.py`: edited-draft feedback and Track A factual corrections; style evolution is a separate process.
- `kefu_backend/doc/openspec/ai-reply-review/spec.md` and `ai-evolution/spec.md`: contextual documentation. Code is authoritative when docs differ.

## Experience

Place a full-width demo directly after the KeFu case introduction, before long prose. Use a compact shop dashboard with deep green accents, a conversation list, customer/AI bubbles, knowledge source and state chips. Three freely navigable views: customer conversations, draft review, FAQ improvement. Use fictional shop and customer labels, preset questions, an editable draft, accept/discard controls, retry and reset. Every visible action produces a meaningful state change. State survives view switches; reset restores all initial values. Empty drafts cannot be sent. Accepted knowledge affects the retry answer; discarded suggestions do not. Mark the demo as fictional data and locally simulated responses, without implying real customer messaging or measured production outcomes. Do not imply a single edit automatically retrains the model.

## Implementation and acceptance

Dedicated client component and scoped stylesheet, localized zh/en content, no dependencies or backend calls. Preserve all existing dirty changes, especially AWS case work. Keep verified project status and personal role; concise source-backed copy only. Native buttons/labels, visible focus, status announcements, 320px/mobile support, reduced-motion respect. Run typecheck, existing tests and production build, then exercise state transitions and mobile layout in browser. No deployment or unrelated source-project modifications.

## Reusable implementation brief

Read the original KeFu UI and pipeline code above and distill the product into an interactive portfolio demonstration that an interviewer can understand within 60–90 seconds. Implement a fictional small-business customer-support workspace inside the existing bilingual Next.js portfolio. Show how a knowledge-backed answer, human draft review and explicitly approved FAQ correction connect. Use local React state and deterministic sample data; make draft editing, simulated sending, suggestion acceptance/discard, answer retry and reset functional. Keep the original project's implemented behavior distinct from simplified presentation. Do not copy customer data, secrets, production integrations or unsupported impact metrics. Read this repository's AGENTS.md and installed Next.js documentation before coding. Preserve other work. Verify both languages, mobile layout, empty/duplicate actions and static export.
