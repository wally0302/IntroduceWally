# 揪甘心 — full coordination story and PM case study

## Authorization and scope

The user's complete specification authorizes direct restructuring of the existing case. Both the interactive prototype and eight-chapter PM case study are P0. The previous preference to avoid a standalone personal-role pitch is retained; specific personal execution claims remain unverified. Existing AI restaurant work is preserved as reference, and unrelated Beachcomber/OOTT changes are not reverted. Keep the existing `/[lang]/projects/ai-restaurant/` URL stable, rename the displayed project to 揪甘心 / GatherTime, and broaden the homepage cover.

## Product judgment

Use the entire job of getting a small dinner group to a decision as the narrative. Restaurant selection is downstream of scheduling. Do not position polling or guest access as unique: LINE already has date polls and Doodle has guest voting, response tracking and time confirmation. The proposition to test is continuity across coordination and a group's venue decision.

Considered: expand the old restaurant widget (insufficient coordination evidence); embed the whole original app (authentication/long setup/local-storage misconceptions); build a focused shared-state lifecycle (chosen). A compact prefilled event plus five fictional votes reduces setup while keeping a meaningful sixth response and host decision.

## Prototype contract

Intro chat → editable prefilled event with three future slots → local demo room with host/friend role switch → three-state vote submission and editable response → scored heatmap → host chooses any valid slot → inherited date/area/confirmed attendees inform conditional restaurant candidates → complete gathering card and copyable Demo notification.

Shared reducer/state guards keep every output consistent. Five seed respondents + one visitor; the host is a manager and is not silently added to attendance. Confirmed attendance includes available only, with tentative people separately visible. Score equals available*2 + if_needed, never called attendance. Changing upstream choices invalidates the downstream restaurant/summary. Reopening clears finalization; a participant cannot finalize or edit locked votes. New dates use Asia/Taipei at runtime, not build-time constants. Clipboard text contains no fake shared-room URL. No tracking, external transmission, login or paid API.

## Case study contract

Eight chapters: Problem (before/after journey + JTBD); Users (target hypothesis and asymmetric roles); Decisions (five expandable WHY/user/platform/trade-off/validation matrices); Data (six feature-demand-value rows and four-stage conditional data flow, retention limits); Business (gated roadmap, sponsored vs verified conversion, unit-economic illustration and unvalidated growth loop); Execution (user-reported 9/23 constraint, observable repo outcome distinguished from historical delivery); Validation (four falsifiable hypotheses and candidate north star with definitions/denominators/windows); Reflection (five decisions mapped to lessons), followed by six concrete transferable capabilities.

Native details support progressive disclosure. Semantic lists, accessible diagrams and responsive layouts keep content readable without animation. Neutral evidence labels distinguish code from Demo, proposal and measured results. There are no verified real-user results to publish.

## Sources and evidence

Internal matrix: `2026-10-09-gathertime-evidence.md`. No 21-page deck found in the workspace or source repository; do not claim it was read. 9/23 staffing and commercial examples come from the user's supplied specification.

Official sources checked 2026-10-09:
- LINE https://help-o.line.me/line/smartphone/pc?contentId=20003458&lang=zh-Hant — text/date polls and results.
- Doodle https://doodle.com/en/product/polls/ — shared link, no participant account required, response tracking and confirmed time.
- Doodle https://doodle.com/en/state-of-meetings-report-2023/ — primarily professional users in North America/Europe; background only, not Taiwan social-dinner evidence.
- Taiwan PDPA https://law.pdpc.gov.tw/LawContent.aspx?id=FL010627 — design reference for purpose, notice and rights; page warns some 2025 amendments are not yet effective. Do not claim this prototype is a legal compliance implementation.

## Acceptance

Reducer tests cover voting/upsert/rank/roles/finalization/invalidation/derived summary/filtering. Browser checks cover editable creation, votes, role switches, arbitrary host selection, conditional restaurant results, complete/copy/reset/reopen, keyboard and mobile. Verify eight chapters, expandable decisions and source links. Run full Vitest suite, typecheck, build and diff check. There is no lint script configured. Preserve unrelated work; no deployment or commits requested.
