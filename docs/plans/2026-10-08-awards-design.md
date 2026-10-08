# Awards gallery — approved design

Approved 2026-10-08 (Asia/Taipei). The user accepted the proposed defaults, delegated remaining design decisions, and explicitly rejected a standalone awards page.

## Scope and hierarchy

Add one bilingual homepage section before Contact, after How I Work. Include all 11 supplied records from `/Users/oaowally123/Downloads/AWARDS_DATA.md`, treated as source data. Order the three competitive awards first, then the remaining records by descending date. Label awards, participation, completion, and recognition accurately. Unknown fields are omitted. OOTT is a known project name but has no existing public case-study route, so show its name without inventing a link.

## Visual and interaction design

Use the site's paper, ink, cobalt, fine rules, and large editorial typography. Section title: 獎項與參與紀錄 / Awards & Recognition. One full-width horizontal strip of substantial certificate cards, with consistent image frames using object-fit: contain. Keep year, event title and result visible below the image. Award results get a restrained cobalt emphasis; other credentials remain neutral.

Desktop fine-pointer devices slowly advance the strip in a continuous loop. Provide pause/resume and manual previous/next controls. Pause during hover, focus, open dialog, hidden document, or offscreen section. Touch/mobile and reduced-motion users get manually scrollable content. Never hijack page scrolling. Preserve keyboard access to all 11 distinct records; any visual clones are hidden from accessibility and never add keyboard stops. Avoid resetting user position when closing a detail.

Clicking a card opens a native modal dialog with visible close control, Escape/backdrop dismissal, focus containment and focus restoration. Show full certificate, exact result, category, month/year, and known issuer/project/short context. Desktop can use image/details columns; small screens stack and allow vertical scrolling. Portrait and landscape assets retain their full proportions.

## Assets and data

Create `src/data/awards.ts` with typed bilingual records and an independently replaceable image per record. Copy the supplied JPEG into `public/awards/`. It is the real participation certificate for FUTUREMODE, and a temporary preview for the other ten records. Those ten cards and dialogs visibly say 暫用示意圖 / Placeholder image and clarify that the official certificate is pending. Do not imply that the placeholder image proves a different award. Document how to replace the image and placeholder flag. No remote asset fetching or image generation is needed.

## Validation

Run existing typecheck, tests and production build. Inspect desktop and mobile layouts in the browser, both languages, all 11 records, motion pause/resume/manual controls, keyboard dialog open/close/focus return, reduced-motion, and image containment. Verify awards remain differentiated from participation/completion. Check no OOTT link points at a nonexistent route.
