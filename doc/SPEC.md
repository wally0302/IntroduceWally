# SPEC.md — Wally Personal Portfolio Website

> Updated: 2026-10-08 (Asia/Taipei). This revision incorporates the portfolio discussion and the Voyager, Onda, and GetLayers Kimi references.
>
> Read [DESIGN_DIRECTION.md](DESIGN_DIRECTION.md) for the current visual direction, case-study choreography, research rationale, and motion acceptance criteria. This file owns product requirements; `PROFILE_DATA.md` owns factual career/project content. Visual prototypes are design studies, not evidence of shipped products or approved final artwork.

## 0. Document Purpose

This file defines the required information architecture, fields, interaction rules, technical constraints, and content boundaries for Wally's personal career / portfolio website.

This file is intended to be read directly by Codex / GPT-6.

The goal is **not** to hard-code every creative decision.
The goal is to make sure Codex knows:

- which sections must exist
- what data each section needs
- what interactions are required
- what content must remain recruiter-friendly
- what information must remain private / anonymized
- what technical constraints apply

Creative execution such as layout, typography, exact color palette, animation style, visual composition, and detailed component architecture should be decided by Codex / GPT-6.

---

# 1. Product Goal

Build a memorable personal career website for Wally, primarily to start conversations with overseas recruiters and hiring managers for AI Product Manager opportunities. Relocation and international remote work remain open possibilities; do not invent availability or immigration status.

Primary audiences:

- HR
- Recruiters / Headhunters
- Hiring Managers
- Product Leads
- Potential collaborators
- People interested in Product / AI

Primary success criteria:

- Recruiter understands who Wally is within 30 seconds
- Recruiter understands Wally's strengths within 2 minutes
- Recruiter can find concrete evidence through projects within 5 minutes
- Recruiter can easily contact Wally or access his resume

Core story:

> Notice Wally → Become curious about a product problem → Explore a decision → See evidence and limits → Understand his growth → Start a conversation.

The website must succeed both as a quick recruiter scan and as an optional interactive story. Attention is the entry point; accurate understanding and remembered product judgment are the desired outcomes.

---

# 2. Technical Scope

## 2.1 Architecture

Frontend only.

Do NOT add:

- backend
- database
- authentication
- CMS
- admin panel
- API server

Unless explicitly requested later.

## 2.1.1 Current implementation status

The current implementation is a Next.js static-export bilingual site with `/zh`, `/en`, and three project routes: PitchCue, KeFu, and the voting-system case. It includes the approved editorial prototype direction, the product/decision reveal interaction, GSAP/ScrollTrigger journey motion, and the three case demos: PitchCue answer formats, KeFu AI-to-human handoff scenarios, and voting-system need/feature/guide steps.

The contact section currently reads the email and LinkedIn values from `src/data/contact.ts`. The resume value is still empty and must be supplied before public launch. The site has not been deployed; browser, device, and performance validation remain pending and must not be treated as completed acceptance checks.

## 2.2 Recommended Stack

Preferred:

- Next.js
- React
- TypeScript
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- Vercel

Use static generation/export and one shared set of page templates. Use CSS/SVG for layout and simple motion. A single progressively loaded Three.js/GLSL enhancement is permitted for the signature reveal only if the prototype demonstrates a worthwhile visual improvement within the performance budget. It is not required for the site to work.

## 2.3 Content Storage

All website content should live in local static files.

Recommended locations:

```txt
src/data/profile.ts
src/data/career.ts
src/data/projects.ts
src/data/awards.ts
src/data/principles.ts
```

Alternative static JSON / TS / MDX structures are acceptable if they improve maintainability.

## 2.3.1 Required Bilingual Content

- Traditional Chinese (`zh`, HTML language `zh-Hant`) is the first-visit default; English (`en`) is complete, including case studies and metadata.
- Use `/zh`, `/en`, and `/{lang}/projects/{slug}`. Explicit locale URLs take precedence over saved preference. The root entry uses the saved preference when available and otherwise Chinese; Chinese remains usable without client JavaScript.
- Switching languages preserves the project and section anchor; remember the visitor's manual choice locally. Do not infer language from location or browser language.
- Maintain one set of components and one record per project. Localized text fields contain both `zh` and `en`; IDs, status, factual links, and visibility are shared.
- Use a `Locale` union and a shared localized-content type. Do not duplicate the entire site or translate visitor-visible copy at runtime through an AI API.
- Each language has its own editorial line breaks; never split Chinese text using English word-splitting assumptions.

## 2.4 Future Writing Content

If a writing section is added later, prefer MDX.

Example:

```txt
content/
└── writing/
    ├── two-years-as-a-pm.mdx
    ├── ai-pm-workflow.mdx
    └── stakeholder-communication.mdx
```

---

# 3. Design Intent

The website should feel:

- personal
- editorial
- professional
- warm
- cinematic
- product-focused
- interactive
- memorable

Avoid:

- generic SaaS template
- generic AI landing page
- excessive glassmorphism
- full-page neon gradients
- excessive 3D for no reason
- overly corporate resume template
- LinkedIn clone

The visual style should help people remember Wally as a thoughtful Product Manager rather than remember only the website effects.

Current direction: an editorial personal exhibition with strong typography, generous space, restrained color, and a coherent print/halftone treatment. Wally is the visual protagonist. No real or generated portrait is required or desired.

The initial warm-white/orange sticky-note collage was rejected as too AI-looking. Do not revive it, fake dashboard collages, or a three-column feature-card homepage. The later black/bone-white/cobalt prototype is a direction study to refine, not a pixel-perfect specification.

---

# 4. Core UX Principle

Every design decision should first answer:

> Does this earn attention, make Wally easier to understand, or give a reason to remember his judgment?

Priority order:

1. Who is Wally?
2. What can Wally do?
3. What has Wally built?
4. How did Wally grow?
5. How does Wally think?
6. What evidence supports his claims?
7. How can someone contact him?
8. A coherent visual signature that makes this particular person memorable

Visual impact is an intentional entry point, not leftover decoration. Content truth, readability, accessibility, and performance remain constraints on every effect. A striking first impression and a clear first impression must be designed together.

---

# 5. Homepage Information Architecture

Required homepage order:

```txt
Navigation

Hero

Compact identity / capability summary (integrated into Hero)

Selected Work — three story chapters

Career Journey

How I Work — concise principles linked to evidence

Contact / Resume

Footer
```

Optional future sections:

- All Projects / filters
- Awards & Recognition (only after entries are verified)
- About
- Writing
- Playground
- Full Resume page
- Full Awards page

---

# 6. Navigation

## Required Fields

```ts
NavigationItem {
  label
  href
  order
  external?
}
```

V1 items:

- Work
- Journey
- Resume
- Contact
- 中文 / EN (required)

Optional:

- Writing
- Playground

## Required Behavior

- sticky or fixed navigation
- smooth anchor navigation where appropriate
- active section state is optional
- external links must open appropriately
- mobile navigation must be simple and accessible

---

# 7. Hero

## Purpose

The first screen must immediately communicate:

- Wally's name
- Product Manager identity
- Product × AI positioning
- Wally's product mindset
- primary call to action

## Required Fields

```ts
Profile {
  name
  preferredName
  role
  location
  tagline
  shortDescription
  portrait? // unused in v1: no portraits
  linkedinUrl
  resumeUrl
  email
}
```

## Recommended Copy Fields

```txt
name
role
tagline
shortDescription
```

Suggested direction only:

- Wally Huang
- Product Manager
- Product × AI × 0→1
- Turning ambiguous problems into products people can actually use.

## Required CTA Fields

```ts
HeroCTA {
  label
  href
  type
}
```

Minimum CTA:

- View My Work
- Resume (only when a real file/link is available)

Optional:

- LinkedIn
- Contact Me

## Hero Visual Fields

```ts
HeroVisual {
  portrait? // unused in v1: no real or generated portraits
  backgroundVisual?
  workspaceImage?
  decorativeElements?
}
```

Visual implementation is left to Codex.

---

# 8. Quick Snapshot

V1 presentation: integrate the capability summary into the hero and case-study metadata. Do not build a standalone row of four generic capability cards. The fields below remain available for structured content.

## Purpose

Allow a recruiter to understand Wally's strengths within 10 seconds.

## Required Capability Fields

```ts
Capability {
  id
  title
  description
  icon?
  order
}
```

Required capability themes:

1. Product Discovery
2. 0 → 1 Product
3. Cross-functional Execution
4. AI × Product

Optional:

- Product Strategy
- Stakeholder Management
- Product Communication
- Data-informed Decision Making

## Optional Quick Stats Fields

```ts
QuickStat {
  label
  value
  note?
}
```

Only use verified data.

Never invent metrics.

---

# 9. Career Journey

## Purpose

Show career growth as a story, not as a traditional resume list.

## Mandatory UI Pattern

Career Journey must use a **vertical timeline**.

Desktop:

- central or near-central vertical line
- year nodes on the line
- image / text can alternate left and right
- current year / milestone may highlight during scroll

Mobile:

- single-column vertical timeline

## Required Data Model

```ts
CareerItem {
  id
  year
  dateRange
  title
  subtitle?
  description
  image?
  highlights[]
  skills[]
  quote?
  link?
  order
}
```

## Required Timeline States

Each milestone should support:

- inactive
- entering viewport
- active
- passed

## Required Scroll Behavior

Preferred storytelling flow:

```txt
scroll
↓
year node activates
↓
timeline line progresses
↓
image reveals
↓
text reveals
↓
next milestone
```

Possible effects:

- line growth
- year highlight
- subtle node glow
- image reveal
- parallax
- text reveal

Do not over-animate.

## Career Content Source

Use `PROFILE_DATA.md` for actual career content.

---

# 10. Featured Projects

## Purpose

Show the strongest evidence of product ability without forcing recruiters to browse everything.

## Required Behavior

Homepage shows three curated projects in order: PitchCue, KeFu, Voting System Revamp (anonymized). Present them as generous editorial chapters, not three equal cards squeezed into the hero.

Each chapter exposes a short product question, verified project status and contribution, an optional interaction, and a direct case-study link. The content structure remains extensible for future projects.

## Required Project Card Fields

```ts
ProjectCard {
  id
  slug
  title
  subtitle?
  coverImage
  shortDescription
  startDate?
  endDate?
  status?
  category[]
  tags[]
  role[]
  featured
  order?
}
```

## Required Card Actions

At least one of:

- View Case Study
- Open Project Detail
- Live Demo
- Website

---

# 11. All Projects

Deferred beyond v1. Do not show View All Projects or empty filters until a real expanded library exists. Requirements below describe that future expansion.

## Purpose

Allow Wally to include a large number of projects while keeping the homepage curated.

## Future Release Behavior (Not V1)

When an expanded project library is introduced, the Featured Projects section should contain:

```txt
View All Projects
```

Implementation may be:

- dedicated `/projects` page
- expandable project library

Codex may decide based on UX quality.

## Future Filtering Support (Not V1)

At minimum:

- All
- Professional
- AI Product
- 0→1
- Side Project
- Hackathon
- Prototype

Optional filters:

- Automation
- SaaS
- Platform
- Mobile
- Data
- E-commerce
- UX
- Developer Tool

---

# 12. Project Data Model

All projects should use one consistent structure.

```ts
Project {
  id
  slug

  title
  subtitle?

  coverImage
  gallery[]

  startDate?
  endDate?
  status?

  category[]
  tags[]

  featured
  order?

  shortDescription

  background?
  problem

  targetUsers?

  myRole[]

  responsibilities[]

  solution

  features[]

  decisions[]

  constraints[]

  challenges[]

  techStack[]

  result?

  metrics[]

  whatILearned?

  websiteUrl?
  demoUrl?
  githubUrl?

  isProfessional
  isConfidential

  visibility
}
```

Suggested `visibility` values:

```txt
public
anonymized
private
```

---

# 13. Project Detail Experience

Use independent, full-page case studies on desktop and mobile. Cards/chapters navigate internally; external demos are secondary links. V1 does not require route-intercepting modals.

At the top, show a concise readable summary: problem, known role, current status, and available evidence. Follow with the story: context → tension → options / trade-off → documented direction → result or current learning boundary. Place related visuals beside the explanation.

Show additional fields from the project model only when content exists; do not generate a long chain of empty or repetitive headings. Interactive demonstrations are optional, predefined, clearly labeled, and skippable. Do not make the visitor answer a quiz to read the case.

Provide a stable back-to-work link, normal browser history behavior, and visible keyboard focus. Navigation restores the relevant homepage chapter. Do not run a blocking transition before navigation.

---

# 14. Project URL Requirement

Each of the three featured projects must support an independent URL in both languages.

Example:

```txt
/zh/projects/pitchcue
/en/projects/pitchcue
/zh/projects/kefu
/en/projects/kefu
/zh/projects/voting-system
/en/projects/voting-system
```

Direct URLs must render the complete case study without requiring a prior homepage visit.

Reason:

A recruiter may receive a direct case-study link.

---

# 15. Professional Project Privacy Rules

Professional projects may involve sensitive company information.

Each project must support:

```ts
isProfessional: boolean
isConfidential: boolean
visibility: "public" | "anonymized" | "private"
```

If `isConfidential = true` or `visibility = anonymized`, do NOT expose:

- confidential screenshots
- exact internal data
- internal dashboards
- unreleased features
- internal documents
- confidential KPI
- confidential workflows
- product strategy details not meant for public release

Use instead:

- anonymized product name
- recreated flow diagram
- recreated wireframe
- generic UI
- simplified decision framework
- product process illustration
- generic platform terminology

Public website should focus on Wally's role, reasoning, collaboration, decisions, and lessons rather than confidential company details.

---

# 16. Awards & Recognition

The homepage now includes a bilingual image-led Awards & Recognition strip sourced from the verified records in `src/data/awards.ts`. There is no standalone awards page. Records retain their category distinction, and temporary image placeholders are labeled in the card detail dialog until official certificate assets are supplied.

## Purpose

Show evidence of initiative, external recognition, competitions, hackathons, demo days, and other achievements.

## Required Data Model

```ts
Award {
  id
  title
  eventName
  awardName?
  ranking?
  date
  description?
  projectName?
  role[]
  teamSize?
  image?
  certificateImage?
  projectLink?
  externalUrl?
  featured?
  order?
}
```

## Homepage gallery (approved 2026-10-08)

Show all 11 supplied records in one image-led gallery; the three competitive awards appear first. There is no separate awards page or View All destination. See `docs/plans/2026-10-08-awards-design.md` for the approved interaction design; `src/data/awards.ts` defines the implemented `AwardRecord` type.

Cards retain event name, year, category and exact result. Clicking opens a certificate/detail dialog with known issuer, project and brief context. Unknown roles, rankings and other fields are omitted. Nine temporary images have visible placeholder labels; FUTUREMODE and the Nantou Silver Award use their actual certificate images.

---

# 17. How I Work

## Purpose

Answer:

> If Wally joins the team, how does he work?

## Required Principles

### 01 Understand before saying no

Meaning:

- understand stakeholder motivation
- understand the actual problem
- do not reject a request only because the proposed solution is difficult

### 02 Bring options, not just problems

Meaning:

- prepare alternatives
- explain pros / cons
- state a recommendation
- turn open-ended problems into decision-ready options

### 03 Make trade-offs visible

Meaning:

- make cost visible
- make risk visible
- make timing visible
- make product / engineering constraints visible

### 04 Own the outcome

Meaning:

- do not only pass information
- explain why the team is doing something
- help move the decision forward
- continue owning execution and follow-up

### 05 Use AI as leverage

Meaning:

- use AI to research
- explore alternatives
- organize information
- prototype faster
- improve PM workflow
- keep human judgment responsible for the final recommendation

## Required Data Model

```ts
Principle {
  id
  title
  description
  icon?
  order
}
```

## UI

Use a concise typographic list on desktop and mobile. Link principles to the relevant case-study evidence or clearly identify them as personal working principles. Avoid another row of decorative cards or generic slogans.

---

# 18. Contact / Resume

## Purpose

Make it easy for recruiters to take action.

## Required Fields

```ts
Contact {
  email
  linkedinUrl
  resumeUrl
  githubUrl?
  location?
  preferredRoles?
  availability?
}
```

## Required CTA

- LinkedIn
- Email
- Resume

Only render verified destinations. Missing fields stay in the internal content checklist. Public launch requires a working contact method and resume; preview builds must not invent links or ship dead buttons.

Optional:

- GitHub
- Portfolio PDF
- Other social links

---

# 19. Footer

Required fields:

```ts
Footer {
  name
  role
  linkedinUrl
  email
  resumeUrl
  githubUrl?
  copyright?
}
```

Optional:

- Built with Next.js
- current year

---

# 20. About Section / About Page

Optional for MVP homepage, but the system should allow expansion.

Potential fields:

```ts
About {
  shortBio
  longBio?
  currentFocus[]
  interests[]
  workingStyle?
  personalNotes?
  portrait? // unused in v1: no real or generated portraits
}
```

Keep recruiter relevance high.

Do not turn this into a long autobiography.

---

# 21. Writing Section

Not required for MVP.

If implemented later:

```ts
Article {
  slug
  title
  excerpt
  publishedAt
  tags[]
  coverImage?
  content
}
```

Potential topics:

- PM career growth
- Product × AI
- PM communication
- stakeholder management
- product thinking
- AI workflow
- project retrospectives

---

# 22. Creative Technology

The website may use:

- Three.js
- GLSL
- GSAP
- GSAP ScrollTrigger

Concept:

> Three.js 建立世界 → GLSL 決定畫面怎麼呈現 → GSAP 讓整個世界動起來。

Use these as storytelling tools, not as decoration for every section.

---

# 23. Three.js Recommended Areas

Current candidate: one localized two-layer reveal inspired by GetLayers Kimi, adapted from portrait/helmet reveal into product-surface / reasoning reveal. See `DESIGN_DIRECTION.md`, section 5.

Start with SVG/CSS masking. Three.js/GLSL is an optional refinement only for a demonstrably better dissolve edge and short pointer trail. Do not build a 3D world, a canvas timeline, or one WebGL renderer per project.

All text, navigation, and case-study explanations stay in semantic HTML. The effect must have a static equivalent and must not carry exclusive information.

---

# 24. GLSL Recommended Effects

If used, limit shader work to a restrained halftone/noise mask revealing two aligned illustrations. No liquid distortion of text, chromatic aberration, or permanent particle field. The mask is a storytelling transition, not a filter applied across the whole page.

---

# 25. GSAP Recommended Areas

Use GSAP / ScrollTrigger for a short hero accent, three compact case-study cover transitions, and the career line/year progression. Keep long case content outside sticky/stacked cover regions. No portrait reveals or modal transitions are required in v1.

For motion timings, keyboard/touch equivalents, pause conditions, and fallbacks, follow `DESIGN_DIRECTION.md`.

---

# 26. Motion Hierarchy

Motion priority:

```txt
1. One signature reveal tied to product thinking
2. Project chapter transitions / decision feedback
3. Career Journey progression
4. Quiet supporting interface feedback
```

Most cinematic treatment should be concentrated in a few memorable sections.

Use the Kimi reference for the cause-and-effect of reveals and chapter overlap, not for portraits, racing imagery, branded assets, or a copy of its page.

---

# 27. Animation Constraints

Avoid:

- everything moving at once
- constant particle backgrounds
- excessive cursor effects
- long loading screens
- animation that blocks content
- expensive effects on every card
- scroll-jacking that makes navigation frustrating

Animation should support the story.

---

# 28. Higgsfield.ai Usage

Codex / GPT-6 may use Higgsfield if visual assets would meaningfully improve the website.

Tool:

[https://higgsfield.ai/](https://higgsfield.ai/)

Potential uses:

- personal brand visuals
- cinematic hero assets
- background footage
- stylized product visual
- subtle motion asset
- image-to-video
- creative visual transitions
- visual storytelling assets

Important:

Do not use Higgsfield simply to fill empty space.

Any generated visual must:

- match Wally's personal brand
- remain professional
- support the story
- avoid generic AI-looking imagery
- avoid exposing confidential company information

User permits Higgsfield image generation when it materially improves a specific asset. Write the asset's narrative purpose, placement, composition, and fallback first. Keep typography/UI in code. Do not generate fake product screenshots, client evidence, portraits, or whole pages as production assets. Existing prototype images are review artifacts only. See the asset briefs in `DESIGN_DIRECTION.md`.

Codex may decide whether an effect is better implemented with:

- CSS
- GSAP
- Three.js
- GLSL
- Higgsfield asset
- normal image / video

Choose the simplest option that produces the best result.

---

# 29. Performance Requirements

Even if Three.js / GLSL is used:

Mobile should support:

- reduced particle counts
- simplified shader
- lower DPR
- disabled expensive effects where needed

Support:

```css
prefers-reduced-motion
```

Low-performance devices should gracefully fall back to:

- static image
- lightweight animation
- no shader

The content must remain fully usable without WebGL.

---

# 30. SEO Requirement

Important recruiter-facing content must remain semantic HTML.

Do NOT put important text only inside WebGL / Canvas.

Must remain normal HTML:

- name
- role
- descriptions
- career items
- project titles
- project descriptions
- awards
- CTA
- case study content

Three.js / GLSL should be visual enhancement only.

---

# 31. Metadata

Provide localized title, description, OG text, canonical URLs, language alternates, and sitemap entries for both languages. Set `html lang` to `zh-Hant` or `en`. Shared links must resolve to the requested language, independent of saved preference.

Homepage:

```txt
title
description
og:title
og:description
og:image
```

Project pages:

```txt
title
description
og:image
canonical URL
```

Suggested homepage direction:

```txt
Wally Huang — Product Manager
Product Manager focused on Product × AI × 0→1.
```

---

# 32. Responsive Requirement

Required breakpoints / experiences:

- desktop
- tablet
- mobile

Career Journey:

```txt
desktop → alternating vertical timeline
mobile → single-column timeline
```

Project Detail:

```txt
desktop → independent full-page case study
mobile → independent full-page case study, stacked explanation/visual
```

No desktop-only interaction may block mobile users.

---

# 33. Accessibility

At minimum:

- semantic HTML
- keyboard navigation
- visible focus states
- alt text
- accessible buttons
- color contrast
- reduced motion
- keyboard/touch controls for reveal and decision demonstrations
- focus is not obscured by sticky chapter covers
- no content hidden exclusively behind hover

---

# 34. Static Frontend Deployment

Deployment target:

```txt
Vercel
```

Update workflow:

```txt
Edit local content
↓
Git Commit
↓
Push GitHub
↓
Vercel Auto Deploy
```

No backend deployment workflow is needed.

---

# 35. Suggested Folder Structure

```txt
app/
├── page.tsx                 # default entry
└── [lang]/
    ├── page.tsx             # shared bilingual homepage template
    └── projects/[slug]/
        └── page.tsx         # shared bilingual case-study template

components/
├── Navigation/
├── Hero/
├── DecisionReveal/
├── ProjectChapter/
├── CaseStudy/
├── CareerTimeline/
├── HowIWork/
├── Contact/
└── Footer/

data/
├── profile.ts
├── career.ts
├── projects.ts
└── principles.ts

public/
├── projects/
├── artwork/
└── resume/

lib/
├── i18n/
└── animations/
```

Exact architecture is left to Codex.

---

# 36. Data Source

Actual profile, career, project, award, and personal work-style content should be loaded from:

```txt
PROFILE_DATA.md
```

Codex should treat `PROFILE_DATA.md` as the source of truth for available content.

If a field is not present in `PROFILE_DATA.md`, do not invent it.

Unknown content should use:

```txt
TODO
```

in internal files only, or be omitted. Do not expose TODOs or empty sections on the public site. Creative scene-setting must be labeled as an illustrative scenario; it is not a source of biographical facts.

---

# 37. Privacy / Accuracy Rule

Do not invent:

- metrics
- user counts
- revenue
- conversion rates
- team sizes
- awards
- responsibilities
- job titles
- launch status
- project status

Do not exaggerate shared engineering resources as direct reports.

Do not imply Wally managed people unless explicitly stated.

Use wording such as:

- collaborated with
- worked with
- coordinated with
- drove alignment across

instead of:

- managed
- led X engineers

unless supported by source data.

---

# 38. Codex / GPT-6 Creative Freedom

This document defines:

- required sections
- required fields
- required data
- required interactions
- privacy constraints
- frontend-only architecture
- recruiter UX priorities

Codex / GPT-6 is free to decide:

- exact page layout
- typography
- color palette
- grid
- spacing
- component structure
- animation timing
- animation style
- Three.js implementation
- GLSL shader implementation
- GSAP timeline implementation
- transition design
- case-study presentation
- routing strategy
- static generation strategy
- asset treatment
- responsive details
- creative storytelling

Do not ask for unnecessary clarification if a strong product / design decision can be made autonomously.

---

# 39. Final Instruction

This is not a traditional résumé website.

Build it as an interactive product story about Wally.

The website should make it easy for a recruiter to understand:

1. Who Wally is
2. What Wally is good at
3. How Wally grew
4. What Wally has built
5. How Wally approaches product problems
6. Why Wally is worth contacting

Design the experience as:

```txt
attention → curiosity → understanding → evidence → memory → contact
```

This is a design hypothesis to validate, not a psychological guarantee. Accuracy, accessibility, responsiveness, and performance apply at every stage. Follow the research-to-design mapping and evaluation checklist in `DESIGN_DIRECTION.md`.

Use Three.js, GLSL, GSAP, and Higgsfield only when they strengthen the experience.

The final output should feel like a thoughtful Product Manager built it, not like an AI-generated portfolio template.
