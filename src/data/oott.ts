import type { Localized, ProjectCopy } from "../lib/types";

export const OOTT_COMMIT = "5b6d93f896cd866c327810a2de834915527dd895";
export const OOTT_REPO = "https://github.com/wally0302/tshirt-web";
export const oottSource = (path: string) =>
  `${OOTT_REPO}/blob/${OOTT_COMMIT}/${path}`;
export type EvidenceStatus =
  | "shown_in_deck"
  | "implemented"
  | "planned"
  | "hypothesis"
  | "needs_verification";
export const oottEvidence: {
  status: EvidenceStatus;
  zh: string;
  en: string;
  source: string;
  path?: string;
}[] = [
  {
    status: "shown_in_deck",
    zh: "競賽展示",
    en: "Shown in competition",
    source: "2026 NTUE 競賽簡報 P4–P9（使用者規格整理）",
  },
  {
    status: "planned",
    zh: "早期規劃",
    en: "Early plan",
    source: "2026/02 MVP PRD",
    path: "docs/PRD-wardrobe-v1.md",
  },
  {
    status: "implemented",
    zh: "程式實作／預期價值待驗證",
    en: "Implemented / value unvalidated",
    source: "2026/06/07 指定 Commit",
    path: "openspec/specs/ai-styling/spec.md",
  },
  {
    status: "hypothesis",
    zh: "資料價值假設",
    en: "Data value hypothesis",
    source: "2026 NTUE 競賽簡報 P10（使用者規格整理）",
  },
  {
    status: "implemented",
    zh: "分期證據",
    en: "Evidence by stage",
    source: "2026/06/07 推薦 API 實作",
    path: "app/api/wardrobe/chat/route.ts",
  },
  {
    status: "hypothesis",
    zh: "商業構想",
    en: "Business hypothesis",
    source: "2026 NTUE 競賽簡報 P11、P18（使用者規格整理）",
  },
  {
    status: "needs_verification",
    zh: "成效待驗證",
    en: "Outcomes unverified",
    source: "MVP PRD：計畫追蹤指標",
    path: "docs/PRD-wardrobe-v1.md",
  },
  {
    status: "planned",
    zh: "專案回顧／反思提案",
    en: "Retrospective / proposed experiments",
    source: "本次專案回顧；角色依競賽簡報 P19（使用者規格整理）",
  },
];

export const oottCopy: Localized<ProjectCopy> = {
  zh: {
    title: "OOTT",
    question: "你有很多衣服，為什麼每天還是不知道穿什麼？",
    summary:
      "我們從數位衣櫃出發，探索如何把「已擁有的衣服」與「每天的穿搭需求」連接起來，再用 AI 推薦與虛擬試穿，降低搭配與購買前的不確定性。",
    category: "AI Product · Consumer Product · 0→1",
    status: "2026｜NTUE 校園創業競賽＋後續迭代",
    role: "CTO｜產品與系統設計",
    theme: "讓擁有的衣服，變成可執行的選擇",
    insights: [
      "先知道你有什麼，再談要你穿什麼。",
      "計畫是意圖，實際穿著才是行為。",
      "功能能運作，不等於商業假設成立。",
    ],
    takeaway:
      "每做一個功能，我們到底只是增加了操作，還是讓使用者更容易完成一件真正重要的事？",
    sections: [
      {
        id: "oott-problem",
        eyebrow: "THE PROBLEM",
        title: "衣櫃裡有衣服，卻不一定有穿搭答案。",
        body: [
          "團隊切入的是兩種不同的不確定：出門前，不知道已有衣物怎麼搭；購買前，無法想像新衣穿在身上的樣子。因此我們把「完成一次穿搭決定」視為使用者工作，而不是把推薦次數當作價值。",
          "競賽中的故事與情境是團隊觀察及問題假設，不是正式樣本調查。兩種問題是否頻繁、嚴重到值得改變習慣，仍需透過訪談與任務觀察確認。",
        ],
      },
      {
        id: "oott-strategy",
        eyebrow: "THE STRATEGY",
        title: "先知道你有什麼，再談要你穿什麼。",
        body: [
          "通用建議可能很好看，卻不一定穿得出門。因此選擇先把真實單品變成可搜尋、可組合的資料，讓後續推薦有明確候選範圍。早期 PRD 把上傳、分類與搜尋放在首版，明列推薦演算法與公開社群為非目標。",
          "代價是把建檔負擔放在價值出現之前。我們當時假設，管理與找回衣服的價值足以支持這一步；這仍需要用首次建檔完成率、多件上傳流失點與後續回訪驗證。",
        ],
      },
      {
        id: "oott-decisions",
        eyebrow: "THE DECISIONS",
        title: "功能不是愈多愈好，而是要接住下一個問題。",
        body: [
          "衣櫃回答「我有什麼」，情境推薦回答「現在怎麼搭」，試穿探索「穿起來可能如何」，計畫則讓一次建議有機會被再次使用。這條順序是產品策略推論，不是已由營運數據證明的因果鏈。",
          "每新增一個環節都增加操作與維護成本。我們需要觀察使用者是否真的走到下一步，而不是用功能數量替代價值。展開各項決策，可看到它對應的工作、預期價值與失敗風險。",
        ],
      },
      {
        id: "oott-data",
        eyebrow: "THE DATA",
        title: "資料貼近真實生活，個人化才有機會變好。",
        body: [
          "衣櫃是起點，計畫是意圖，搭配是選擇，實際打卡才是行為。這四種資料回答不同問題；把試穿或儲存直接當成喜好與購買，會讓個人化學到錯誤訊號。",
          "資料可能改善推薦，也可能提供商品與內容方向，但不是天然可出售的廣告資產。任何對外分析都需要明確同意、可撤回機制、資料最小化與聚合門檻，也不應推斷敏感身體特徵；資料品質與持續使用仍是前提。",
        ],
      },
      {
        id: "oott-execution",
        eyebrow: "THE EXECUTION",
        title: "MVP 要先回答最重要的不確定性。",
        body: [
          "早期先規劃衣物管理，競賽再展示較完整體驗，後續才擴充外部情境。分期讓每個階段有可檢視的範圍，代價則是無法一次兌現完整願景；功能存在的證據，也不能替代使用者願意留下來的證據。",
          "6 月加入 Google Search Grounding，讓特定地點等情境有機會補足外部資訊。這同時增加 API 成本、等待與失敗風險，因此需檢查觸發條件與降級策略，不能把外部搜尋變成每次推薦都必經的步驟。",
        ],
      },
      {
        id: "oott-business",
        eyebrow: "THE BUSINESS",
        title: "先讓 C 端有理由留下來，才有機會談 B 端價值。",
        body: [
          "競賽提出 C 端點數制，以及連結服飾商家、創作者與模特兒的 B2B2C 構想。原產品有點數流程，不代表已證明付費意願、毛利或商家收入。商業價值必須回到使用頻率、交付成本與可持續需求。",
          "若沒有足夠活躍衣櫃、使用者授權與商家需求，導購或媒合就只是下一階段假設。先驗證 C 端願意重複使用什麼，再以小規模商家訪談與合作試驗檢查付費理由，比直接擴張平台角色更能縮小不確定性。",
        ],
      },
      {
        id: "oott-evidence",
        eyebrow: "THE EVIDENCE",
        title: "能運作的產品，不等於所有假設都成立。",
        body: [
          "競賽簡報展示功能，指定 Commit 提供實作證據；兩者證明做出了什麼，沒有直接證明改善了多少。53 位 Web 註冊用戶是當時簡報的早期里程碑，尚需後台核對，不代表活躍、付費、留存或 PMF。",
          "PRD 的啟用、搜尋使用與 D7 留存是計畫追蹤的目標，不是達成結果。目前未有可供公開驗證的成效數值；下一步要分開測量建檔、採用推薦、實際穿著與付費，找出價值鏈斷在哪裡。",
        ],
      },
      {
        id: "oott-reflection",
        eyebrow: "THE REFLECTION",
        title: "最大的風險，是使用者願不願意先整理衣櫃。",
        body: [
          "如果重做，我會先驗證價值出現之前的成本：使用者是否願意上傳足夠衣物，讓推薦值得使用？先用三件示範單品讓人理解價值，再邀請建檔，是值得測試的優化提案，並不是當時已完成的實驗。",
          "我的競賽分工是 CTO，負責平台架構與系統整合、核心資料庫規劃管理。本頁的定位與商業模式是團隊提出的方向；這裡從參與的產品與技術取捨出發，回顧下一輪應如何衡量與學習。",
        ],
      },
    ],
  },
  en: {
    title: "OOTT",
    question: "A full wardrobe. Why is getting dressed still a question?",
    summary:
      "Starting with a digital wardrobe, we explored how owned clothes and daily context could inform outfit recommendations, while virtual try-on could reduce uncertainty before a purchase.",
    category: "AI Product · Consumer Product · 0→1",
    status: "2026｜NTUE startup competition + iteration",
    role: "CTO｜Product & systems design",
    theme: "Turn owned clothes into actionable choices",
    insights: [
      "Know what someone owns before suggesting what to wear.",
      "A plan is intent; wearing an outfit is behavior.",
      "Working features do not validate a business.",
    ],
    takeaway:
      "Does each new feature add another interaction, or help someone finish a task that matters?",
    sections: [
      {
        id: "oott-problem",
        eyebrow: "THE PROBLEM",
        title: "A wardrobe holds clothes. It does not always hold answers.",
        body: [
          "The team started with two uncertainties: combining existing clothes before going out, and imagining a new garment on oneself before buying. The user’s job is to reach a clothing decision, not to generate more recommendations.",
          "The competition stories represent team observations and problem hypotheses, not a quantified survey. Interviews and observed tasks are still needed to establish frequency, severity and willingness to change habits.",
        ],
      },
      {
        id: "oott-strategy",
        eyebrow: "THE STRATEGY",
        title: "Know what you own before deciding what to wear.",
        body: [
          "Generic inspiration may look good without being wearable today. We prioritized making real garments searchable and reusable so recommendations could operate within an owned inventory. The early PRD explicitly excluded recommendation algorithms and public social features from the first release.",
          "The cost is cataloging effort before the payoff. We assumed retrieval and organization would justify this work; first-item completion, multi-item abandonment and subsequent return visits are needed to test that assumption.",
        ],
      },
      {
        id: "oott-decisions",
        eyebrow: "THE DECISIONS",
        title: "Each feature should earn the next step.",
        body: [
          "The wardrobe answers what I own; recommendations address what fits this context; try-on explores what a garment might look like; planning gives a suggestion another opportunity to be used. This is a strategic hypothesis, not a proven causal chain.",
          "Every step also adds interaction and maintenance costs. We need evidence that users progress through the chain rather than treating feature count as value. Expand each decision to see the job, expected value and failure risk.",
        ],
      },
      {
        id: "oott-data",
        eyebrow: "THE DATA",
        title: "Personalization needs data connected to real life.",
        body: [
          "Inventory is a starting point, planning is intent, combinations are choices, and voluntary outfit logs are behavior. Treating a virtual try-on or a saved plan as a purchase or actual wear would train personalization on the wrong signal.",
          "Data could improve recommendations and inform content direction, but it is not automatically an advertising asset. External analysis requires explicit consent, withdrawal, minimization and aggregation thresholds, without inferring sensitive body traits. Quality and repeat use remain prerequisites.",
        ],
      },
      {
        id: "oott-execution",
        eyebrow: "THE EXECUTION",
        title: "An MVP should answer the most important uncertainty first.",
        body: [
          "Early planning focused on inventory, the competition demonstrated a broader experience, and later work added external context. Staging makes scope inspectable but delays the full vision. Implementation evidence still cannot establish whether people want to keep using the product.",
          "June introduced Google Search Grounding for context such as a specific place. It adds cost, latency and failure modes, so trigger conditions and fallback behavior matter. External search should not become a mandatory dependency for every outfit request.",
        ],
      },
      {
        id: "oott-business",
        eyebrow: "THE BUSINESS",
        title: "Consumer retention comes before a business ecosystem.",
        body: [
          "The competition proposed consumer credits and a B2B2C network of clothing merchants, creators and models. A credit mechanism in the product does not prove willingness to pay, margins or merchant revenue. Those depend on usage frequency, delivery cost and sustained demand.",
          "Without active wardrobes, user permission and demonstrated merchant needs, referrals and matchmaking remain hypotheses. Validate repeated consumer value, then test merchant demand through focused interviews and small partnership experiments.",
        ],
      },
      {
        id: "oott-evidence",
        eyebrow: "THE EVIDENCE",
        title: "A working product does not validate every assumption.",
        body: [
          "The competition deck shows features and the pinned commit shows implementation. Neither establishes impact. The deck’s 53 registered web users are an early milestone requiring backend verification, not active users, payers, retention or product-market fit.",
          "Activation, search usage and D7 retention in the PRD are planned measures, not achieved results. No publicly verifiable outcome values are available. Cataloging, recommendation adoption, actual wear and payment must be measured separately.",
        ],
      },
      {
        id: "oott-reflection",
        eyebrow: "THE REFLECTION",
        title: "The biggest risk is willingness to catalog a wardrobe.",
        body: [
          "If starting again, I would test the effort required before value appears. Letting users try recommendations with three sample garments before creating their own inventory is a proposed experiment, not a completed study.",
          "My documented competition role was CTO: platform architecture, system integration and core database planning. Positioning and business strategy were team directions. This retrospective uses the product and technical trade-offs I participated in to propose what we should measure next.",
        ],
      },
    ],
  },
};

export const decisionRows = [
  {
    zh: [
      "數位衣櫃",
      "單品難管理、找不到",
      "先建檔、分類與篩選",
      "更快找回已有衣物",
      "可檢索的自有衣物資料",
      "上傳摩擦可能阻斷首次體驗；標籤錯誤也會污染推薦。先量建檔流失與找回單品的任務成功率。",
    ],
    en: [
      "Digital wardrobe",
      "Hard to find owned items",
      "Catalog, classify and filter first",
      "Find existing clothes faster",
      "Retrievable owned inventory",
      "Upload friction can prevent activation; bad tags can distort recommendations. Measure abandonment and retrieval task success.",
    ],
  },
  {
    zh: [
      "AI 情境推薦",
      "有衣服卻不知道怎麼搭",
      "以個人衣櫃為候選範圍",
      "有機會真的穿得出門",
      "情境與修改回饋",
      "候選太少時應承認限制；推薦只代表一次建議。用採用率與決策時間驗證，而非 AI 呼叫量。",
    ],
    en: [
      "Contextual recommendations",
      "Unsure how to combine clothes",
      "Constrain candidates to owned items",
      "A suggestion that can be worn today",
      "Context and revision signals",
      "A small inventory limits options. Measure adoption and decision time instead of AI call volume.",
    ],
  },
  {
    zh: [
      "虛擬試穿",
      "難以想像穿起來的樣子",
      "提供有邊界的視覺預覽",
      "降低想像成本",
      "試穿興趣訊號",
      "不是尺寸、垂墜或退貨保證。試穿興趣不等於購買意圖；需檢查猶豫是否下降，也需影像授權。",
    ],
    en: [
      "Virtual try-on",
      "Hard to imagine a garment on oneself",
      "Offer a bounded visual preview",
      "Reduce imagination effort",
      "Try-on interest signals",
      "Not a guarantee of size, drape or returns. Interest is not purchase intent; test hesitation and obtain image permissions.",
    ],
  },
  {
    zh: [
      "週計畫／記錄",
      "看完建議，很快忘記",
      "把搭配接到日常安排",
      "提前準備與重複使用",
      "計畫與自願記錄的行為",
      "多一步操作可能無人使用。排進計畫不等於穿過；觀察回看與自願打卡，不推算不存在的行為。",
    ],
    en: [
      "Planning / outfit logs",
      "Suggestions are easily forgotten",
      "Connect an outfit to daily plans",
      "Prepare and reuse",
      "Plans and voluntary behavior logs",
      "Another step may not be used. Scheduling is not wearing; observe return visits and voluntary logs.",
    ],
  },
];
