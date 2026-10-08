import type { Localized, Project, ProjectCopy, SiteCopy } from '../lib/types';

export const siteCopy: Localized<SiteCopy> = {
  zh: {
    nav: {
      work: '作品',
      journey: '成長',
      about: '關於',
      contact: '聯絡',
      menu: '開啟選單',
      close: '關閉選單',
      skip: '跳到主要內容',
    },
    hero: {
      title: ['把問題看清楚，', '讓產品往前走。'],
      description: '我是 Wally，一位探索 AI 產品的 Product Manager。從釐清問題、拆解取捨，到讓想法接受真實驗證。',
      explore: '探索作品',
      growth: '看我的成長',
    },
    work: {
      eyebrow: 'Selected work',
      title: '每個作品，都是一個值得回答的問題。',
      read: '看案例',
      product: '產品',
      thinking: '判斷',
      illustration: '概念示意',
      hint: '互動是理解入口，不是閱讀門檻。',
    },
    journey: {
      eyebrow: 'Career journey',
      title: '從把事情做清楚，到提出更好的問題。',
      intro: '從 2024 年至今，我逐漸從執行需求，走向理解動機、比較選項，並對結果負責。',
      items: [
        { year: '2024', title: '把事情做清楚', body: '從需求、SPEC、測試與驗收開始，學會讓不同職能對齊同一件事。', keywords: 'Requirements · QA · Collaboration' },
        { year: '2025', title: '開始提出判斷', body: '先問為什麼，再提出選項、說明取捨，讓模糊問題變成可以往前走的決定。', keywords: 'Discovery · Options · Ownership' },
        { year: '2026', title: '用 AI 拓展產品可能', body: '探索 AI workflow 與 Agent，把重複工作交給工具，把注意力留給產品判斷。', keywords: 'Product × AI · Workflow · Strategy' },
      ],
    },
    principles: {
      eyebrow: 'How I work',
      title: '我如何讓決定往前走。',
      intro: '產品工作不只是傳遞資訊，也是在不確定裡建立共同理解。',
      items: [
        { number: '01', title: '先理解，再說不', body: '分開提案的解法與真正的需求，先理解對方想完成什麼。' },
        { number: '02', title: '帶著選項來', body: '比較方案的成本、風險與影響，提出明確建議，而不是只帶問題。' },
        { number: '03', title: '讓取捨可見', body: '把時間、產品體驗與工程限制放在同一張決策桌上。', project: 'kefu' },
        { number: '04', title: '對結果負責', body: '決定之後持續追蹤，讓團隊知道方向為何改變、下一步是什麼。', project: 'voting-system' },
        { number: '05', title: '把 AI 當槓桿', body: '讓 AI 加速研究與整理，但把最後的產品判斷留在人手上。', project: 'pitchcue' },
      ],
      evidence: '相關案例',
    },
    contact: {
      eyebrow: 'Keep in touch',
      title: ['下一個值得解決的問題，', '我們一起聊。'],
      body: '如果你正在做 AI 產品、0→1 探索，或想把模糊方向變成可執行的產品，歡迎聯絡我。',
      location: 'Taiwan · Open to overseas opportunities',
      resume: '履歷',
      email: 'Email',
      linkedin: 'LinkedIn',
    },
    footer: { note: 'Product Manager exploring Product × AI × 0→1.', top: '回到頂端' },
    caseStudy: { back: '回到作品', overview: '案例摘要', role: '我的角色', status: '狀態', context: '故事', takeaway: '帶走的觀點', next: '下一個案例', illustration: '概念示意', contents: '本頁內容' },
  },
  en: {
    nav: {
      work: 'Work',
      journey: 'Journey',
      about: 'About',
      contact: 'Contact',
      menu: 'Open menu',
      close: 'Close menu',
      skip: 'Skip to main content',
    },
    hero: {
      title: ['Clearer questions.', 'Products that move forward.'],
      description: "I'm Wally, a Product Manager exploring AI products—from clarifying problems and weighing trade-offs to testing ideas in practice.",
      explore: 'Explore the work',
      growth: 'See the journey',
    },
    work: {
      eyebrow: 'Selected work',
      title: 'Every project starts with a question worth answering.',
      read: 'Read the case',
      product: 'Product',
      thinking: 'Thinking',
      illustration: 'Illustrative scene',
      hint: 'Interaction is an entry point, never a reading requirement.',
    },
    journey: {
      eyebrow: 'Career journey',
      title: 'From getting the work clear to asking better questions.',
      intro: 'Since 2024, I have moved from executing requests toward understanding motivation, comparing options, and owning outcomes.',
      items: [
        { year: '2024', title: 'Make the work clear', body: 'I started with requirements, specs, testing, and acceptance, learning to align different functions around one thing.', keywords: 'Requirements · QA · Collaboration' },
        { year: '2025', title: 'Start making judgments', body: 'I learned to ask why, compare options, explain trade-offs, and turn ambiguous questions into decisions.', keywords: 'Discovery · Options · Ownership' },
        { year: '2026', title: 'Use AI to widen the possible', body: 'I am exploring AI workflows and Agents: giving repetitive work to tools while keeping product judgment human.', keywords: 'Product × AI · Workflow · Strategy' },
      ],
    },
    principles: {
      eyebrow: 'How I work',
      title: 'How I help decisions move forward.',
      intro: 'Product work is more than passing information along. It is building shared understanding under uncertainty.',
      items: [
        { number: '01', title: 'Understand before saying no', body: 'Separate the proposed solution from the real need before responding to the request.' },
        { number: '02', title: 'Bring options', body: 'Compare cost, risk, and impact, then make a clear recommendation.' },
        { number: '03', title: 'Make trade-offs visible', body: 'Put time, product experience, and engineering constraints on the same table.', project: 'kefu' },
        { number: '04', title: 'Own the outcome', body: 'Keep following up after a decision so the next step stays understandable.', project: 'voting-system' },
        { number: '05', title: 'Use AI as leverage', body: 'Let AI accelerate research and organization while people own the final judgment.', project: 'pitchcue' },
      ],
      evidence: 'Related case',
    },
    contact: {
      eyebrow: 'Keep in touch',
      title: ['The next useful problem', 'might be ours to explore.'],
      body: 'If you are building an AI product, exploring 0→1, or turning an ambiguous direction into something executable, I would be glad to talk.',
      location: 'Taiwan · Open to overseas opportunities',
      resume: 'Resume',
      email: 'Email',
      linkedin: 'LinkedIn',
    },
    footer: { note: 'Product Manager exploring Product × AI × 0→1.', top: 'Back to top' },
    caseStudy: { back: 'Back to work', overview: 'Case overview', role: 'My role', status: 'Status', context: 'The story', takeaway: 'The takeaway', next: 'Next case', illustration: 'Illustrative scene', contents: 'On this page' },
  },
};

const copy = (zh: ProjectCopy, en: ProjectCopy): Localized<ProjectCopy> => ({ zh, en });

const pitchCue: Localized<ProjectCopy> = copy(
  {
    title: 'PitchCue', question: '台上被問到時，完整答案一定最有用嗎？', summary: '一個即時 pitch／Q&A assistant，協助講者在壓力下找到有上下文的回答。', category: 'AI Product · 0→1', status: 'MVP／Demo', role: '產品概念與 MVP 方向', theme: '時間壓力下的資訊選擇',
    insights: ['回答要快，也要理解整個專案脈絡。', '重點提示與口語回答服務不同的現場需要。', 'MVP 先聚焦 context preparation，不過度堆疊 RAG。'], takeaway: '好的即時 AI 體驗，不是塞進更多資訊，而是在正確時刻給出可用的下一步。',
    sections: [
      { id: 'context', eyebrow: 'Context', title: '把專案脈絡帶上台', body: ['PitchCue 面向大學簡報、黑客松與 pitch competition 等需要即時回應的情境。', '使用者先上傳材料，系統整理專案 context，讓後續回答不只依賴單一句問題。'] },
      { id: 'tension', eyebrow: 'Tension', title: '完整，不一定等於有用', body: ['問答現場同時需要速度與理解度。過度詳細的回答可能來不及使用，過度簡短又可能失去重點。'], points: ['速度優先', '回答要有脈絡', '資訊密度要能被講出來'] },
      { id: 'direction', eyebrow: 'Direction', title: '讓輸出貼近講者下一步', body: ['MVP 可產生 3–5 個 talking points，以及約 30–60 秒的口語回答。', '兩種輸出並存，分別支援快速掃讀與直接說出口的需要。'] },
      { id: 'boundary', eyebrow: 'Boundary', title: '目前的學習邊界', body: ['目前重點是驗證即時情境中的資訊層次，以及速度與細節之間的取捨。', '這個 MVP／Demo 方向仍在累積產品與使用情境的理解。'] },
    ],
  },
  {
    title: 'PitchCue', question: 'When you are challenged on stage, is the fullest answer always the most useful?', summary: 'A real-time pitch and Q&A assistant for finding a contextual answer under pressure.', category: 'AI Product · 0→1', status: 'MVP / Demo', role: 'Product concept and MVP direction', theme: 'Choosing information under time pressure',
    insights: ['An answer must be fast and grounded in the whole project context.', 'Talking points and spoken answers serve different moments on stage.', 'The MVP focuses on context preparation instead of overbuilding RAG.'], takeaway: 'A useful real-time AI experience gives the next actionable step at the right moment, rather than simply adding more information.',
    sections: [
      { id: 'context', eyebrow: 'Context', title: 'Bring the project context on stage', body: ['PitchCue is shaped for university presentations, hackathons, and pitch competitions where questions arrive live.', 'The presenter uploads project material first, so later answers can use more than the wording of one question.'] },
      { id: 'tension', eyebrow: 'Tension', title: 'Complete does not always mean useful', body: ['A live answer needs both speed and understanding. Too much detail may arrive too late; too little may lose the point.'], points: ['Speed matters', 'Context matters', 'The answer must be speakable'] },
      { id: 'direction', eyebrow: 'Direction', title: 'Match the output to the next move', body: ['The MVP can produce 3–5 talking points and a roughly 30–60 second spoken answer.', 'Both outputs can coexist: one supports scanning, the other supports saying the answer out loud.'] },
      { id: 'boundary', eyebrow: 'Boundary', title: 'What remains to learn', body: ['The current focus is the information hierarchy of live answers and the trade-off between speed and detail.', 'This MVP / Demo direction is still building understanding of the product and its use contexts.'] },
    ],
  },
);

const kefu: Localized<ProjectCopy> = copy(
  {
    title: 'KeFu', question: 'AI 什麼時候，應該先停下來？', summary: '為微型商家與一人公司探索的 24 小時數位營運夥伴，重點是知識、信心與真人交接。', category: 'AI Product · AI Agent · 0→1', status: '已有第一位客戶／持續探索', role: '產品方向與 AI workflow 探索', theme: '設計 AI 的邊界',
    insights: ['小型商家需要的是少一點重複營運，而不是更多工具複雜度。', '知識設計與品牌語氣會影響回答能否被信任。', '資訊不足時，真人交接是產品能力的一部分。'], takeaway: 'AI 產品的責任不只在回答，也在知道何時需要更多資訊、何時應該交還控制權。',
    sections: [
      { id: 'context', eyebrow: 'Context', title: '從重複訊息開始', body: ['KeFu 面向微型商家、個人事業與小型服務業，探索如何處理重複客戶問題。', '方向包含 FAQ、商品知識、AI 對話與每週分析，讓營運者少花時間在反覆整理上。'] },
      { id: 'tension', eyebrow: 'Tension', title: '回答與信任之間', body: ['自動化不代表所有問題都該由 AI 自己完成。資訊不足、風險升高或語氣不確定時，系統需要承認邊界。'], points: ['知識是否足夠', '回答是否可信', '何時交給真人'] },
      { id: 'direction', eyebrow: 'Direction', title: '把交接設計進流程', body: ['產品方向探索 confidence／risk-based handoff、Root Agent tone 與 forbidden words。', '重點是讓回答範圍、待確認資訊與真人接手成為同一個流程。'] },
      { id: 'boundary', eyebrow: 'Boundary', title: '持續面對的問題', body: ['KeFu 目前已有第一位客戶並持續探索，案例聚焦知識設計、AI 可靠性與小型商家營運。', '同時仍要面對差異化、AI 平台吸收功能與可累積護城河的問題。'] },
    ],
  },
  {
    title: 'KeFu', question: 'When should an AI stop and ask for help?', summary: 'A 24-hour digital operations partner explored for micro-businesses and solo founders, built around knowledge, confidence, and human handoff.', category: 'AI Product · AI Agent · 0→1', status: 'First customer / ongoing exploration', role: 'Product direction and AI workflow exploration', theme: 'Designing the boundary of AI',
    insights: ['Small businesses need less repetitive operations, not more tool complexity.', 'Knowledge design and brand tone shape whether an answer can be trusted.', 'When context is missing, human handoff is part of the product.'], takeaway: 'An AI product is responsible for knowing when it needs more context and when control should return to a person.',
    sections: [
      { id: 'context', eyebrow: 'Context', title: 'Start with repetitive conversations', body: ['KeFu is explored for micro-businesses, solo founders, and small service businesses facing repeated customer questions.', 'The direction includes FAQ and product knowledge, AI conversations, and weekly analysis to reduce routine operations.'] },
      { id: 'tension', eyebrow: 'Tension', title: 'Between an answer and trust', body: ['Automation does not mean every question should be completed by AI. Missing context, higher risk, or uncertain tone should expose the boundary.'], points: ['Is the knowledge enough?', 'Can the answer be trusted?', 'When should a person take over?'] },
      { id: 'direction', eyebrow: 'Direction', title: 'Design handoff into the flow', body: ['The product exploration considers confidence- and risk-based handoff, Root Agent tone, and forbidden words.', 'The focus is to make answer boundaries, missing context, and human takeover part of one flow.'] },
      { id: 'boundary', eyebrow: 'Boundary', title: 'Questions still open', body: ['KeFu has a first customer and remains in exploration, with the case focused on knowledge design, AI reliability, and small-business operations.', 'The work still faces questions about differentiation, platform absorption, and a compounding moat.'] },
    ],
  },
);

const voting: Localized<ProjectCopy> = copy(
  {
    title: 'Voting System Revamp', question: '功能交付了，營運就能獨立使用嗎？', summary: '一個匿名的職場案例：重新整理投票與彙整流程，並把操作手冊視為產品交付的一部分。', category: 'Professional · Product Operations', status: '已完成／匿名', role: '產品管理、需求定義、跨職能協作與文件', theme: '交付之後的可用性',
    insights: ['功能完成不等於工作流程完成。', '營運團隊能否理解與使用，是交付品質的一部分。', '文件可以降低跨團隊溝通時的摩擦。'], takeaway: '產品交付的最後一哩，不只是把功能送出去，而是讓接手的人有足夠 context 把它用起來。',
    sections: [
      { id: 'context', eyebrow: 'Context', title: '從投票流程重新整理', body: ['這個匿名職場案例聚焦投票系統改版，以及投票收集與彙整頁的需求整理。', '除了功能本身，工作也包含把操作方式整理成營運團隊可使用的文件。'] },
      { id: 'tension', eyebrow: 'Tension', title: '交付不是終點', body: ['若功能只有開發團隊理解，營運仍要反覆詢問。產品需要同時處理流程、溝通與交接。'], points: ['需求是否清楚', '功能是否可理解', '交接是否可延續'] },
      { id: 'direction', eyebrow: 'Direction', title: '把操作手冊納入產品', body: ['我參與需求定義、跨職能協作與操作手冊整理，讓功能和使用脈絡放在一起。', '案例以高階流程與責任呈現，保留匿名與機密邊界。'] },
      { id: 'boundary', eyebrow: 'Boundary', title: '可公開的成果', body: ['已完成的改版包含投票彙整頁與操作手冊，呈現交付後如何讓營運接手。', '這次經驗讓我把「接手的人能否理解」也放進交付的思考裡。'] },
    ],
  },
  {
    title: 'Voting System Revamp', question: 'Once a feature ships, can operations use it independently?', summary: 'An anonymized professional case about reshaping a voting and aggregation flow, with the operating guide treated as part of delivery.', category: 'Professional · Product Operations', status: 'Completed / anonymized', role: 'Product management, requirements, cross-functional coordination, and documentation', theme: 'Usability after delivery',
    insights: ['A finished feature is not the same as a finished workflow.', 'Whether operations can understand and use it is part of delivery quality.', 'Documentation can reduce friction between teams.'], takeaway: 'The last mile of product delivery is giving the people who take over enough context to use the work well.',
    sections: [
      { id: 'context', eyebrow: 'Context', title: 'Reshape the voting flow', body: ['This anonymized professional case focuses on a voting system revamp and its collection and aggregation page.', 'The work also included turning the operating approach into documentation that an operations team could use.'] },
      { id: 'tension', eyebrow: 'Tension', title: 'Delivery is not the finish line', body: ['If only the development team understands a feature, operations still has to ask what to do next. Product work must include flow, communication, and handoff.'], points: ['Are the requirements clear?', 'Can the feature be understood?', 'Can the handoff continue?'] },
      { id: 'direction', eyebrow: 'Direction', title: 'Make the operating guide part of the product', body: ['I worked across requirements, coordination, and operating documentation so the feature and its context stayed connected.', 'The case uses high-level flows and responsibilities while preserving anonymization and confidentiality.'] },
      { id: 'boundary', eyebrow: 'Boundary', title: 'Evidence we can share', body: ['The completed revamp includes an aggregation page and an operating guide, showing how operations can take over after delivery.', 'The experience made me consider the understanding of the next person in the workflow as part of delivery.'] },
    ],
  },
);

export const projects: Project[] = [
  { slug: 'pitchcue', number: '01', visibility: 'public', accent: '#2848dd', copy: pitchCue },
  { slug: 'kefu', number: '02', visibility: 'public', accent: '#28584c', copy: kefu },
  { slug: 'voting-system', number: '03', visibility: 'anonymized', accent: '#a34b32', copy: voting },
];

export const getProject = (slug: string): Project | undefined => projects.find((project) => project.slug === slug);
