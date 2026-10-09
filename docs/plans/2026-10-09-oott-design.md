# OOTT — implementation design, 2026-10-09

The user supplied and authorized the complete four-phase specification. Implement directly within the existing portfolio. Existing uncommitted restaurant/beachcomber work must be preserved.

## Chosen approach
Use the existing localized dynamic project route, with a dedicated OottProject server component and OottDemo client island. This retains navigation, typography and metadata. A generic article-only route would lose the decision frameworks; copying the original app would introduce unnecessary infrastructure and sensitive data. The dedicated feature balances narrative control with existing architecture.

The demo is an editorial wardrobe workbench, with two independently navigable paths sharing a session-only wardrobe. Deterministic selection, exclusions, scenarios and immutable weekly-plan snapshots are pure TypeScript. No AI/weather/network calls. Product illustrations are original inline SVG, not user photographs. Try-on products use an explicit asset lookup; unavailable licensed pairs are an honest media blocker.

Eight chapters are the primary deliverable: problem/jobs, wardrobe-first trade-off, feature decision matrix, four data layers, dated execution timeline, business assumptions, evidence board, reflection/next experiments. Source status is maintained independently from narrative. Original CTO contribution and team decisions are distinguished. English route uses translated case-study copy; demo can be explicitly marked as a Traditional Chinese product walkthrough if needed.

## Verification
Vitest tests deterministic recommendation/state invariants and content contract; TypeScript and production export; browser desktop/mobile flow, keyboard focus, navigation, console and overflow. No lint script exists. Record missing try-on media as incomplete visual acceptance, never a completed generated result.
