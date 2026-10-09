import type { Localized, ProjectCopy } from '../lib/types';

export const beachcomberCopy: Localized<ProjectCopy> = {
  zh: {
    title: 'Beachcomber', question: '還沒問清楚，怎麼做對產品？',
    summary: '在訪談當下找出漏問的需求，再把同一份理解轉成可操作原型與團隊規格。',
    category: 'AI Product · Hackathon MVP', status: '黑客松團隊 MVP',
    role: '需求整合、訪談情境與 Demo 腳本、產出驗收、評選影片',
    theme: '從模糊需求，到共同理解',
    insights: ['在客戶還在場時，找出值得追問的問題。', '讓口頭需求變成可以一起操作、討論的原型。', '四種角色共用需求依據，保留未確認事項。'],
    takeaway: '好的 AI 產品，不只產出更多內容，也讓團隊更早發現彼此理解的差異。',
    sections: [
      { id: 'context', eyebrow: 'The problem', title: '會議記下來了，需求卻可能沒問清楚。', body: ['對 PM、SA 與顧問而言，逐字稿只能留下說過的話。尚未問出口的付款、取消或容量規則，仍會在設計與開發階段變成不同的假設。Beachcomber 把追問放在訪談當下，再用可操作原型協助對齊理解。', '這是 FUTUREMODE 的 BUILDMODE 黑客松團隊專案。官方活動於 2026 年 9 月 4–6 日舉行，鼓勵跨領域團隊把 AI 想法做成產品；本案回應了改善團隊工作與協作的方向。此為主題連結，不代表已確認的參賽組別。'] },
      { id: 'decisions', eyebrow: 'Product decisions', title: '先證明一條有價值的流程。', body: ['從程式碼可見，前端在聆聽時每 30 秒同步逐字稿，將追問放在側邊卡片；Prototype 則在使用者觸發後生成。這支持一個產品選擇：讓 PM 決定何時接住建議，減少對談被工具打斷的機會。這是對實作的解讀，並非已測得的體驗成效。', 'AI 服務先建立含來源與需求編號的共同基線，再產出四種角色規格，並保留「已確認、提案、未決、衝突」狀態。格式檢查不等於需求事實已被驗證。'], points: ['團隊已實作：語音逐字稿串接、AI 追問、HTML 原型與四角色規格的生成路徑；目前線上服務未能重驗。', '原始模擬／限制：Session 僅存前端狀態，歷史還原與部分匯出為 stub；後端預設可使用 mock。', '後續方向：持久化、可靠的事實核對與正式服務權限；不描述為既有成果。'] },
      { id: 'contribution', eyebrow: 'My contribution', title: '把團隊的能力，串成能被理解與驗收的體驗。', body: ['我的分工是需求整合、訪談情境與 Demo 腳本設計、產出內容驗收，以及評選影片製作；依據團隊 README 的黃郁庭分工記錄。前端、後端、AI 提示詞與部署是團隊其他成員的成果。', '這次作品集把完整工作台收斂為三個需求決策，保留原型與規格的連動，省去錄音、登入與雲端等待。陶藝情境、回答選項及即時規則映射皆為本頁改編，並非原產品已有的功能或真實客戶案例。'] },
    ],
  },
  en: {
    title: 'Beachcomber', question: 'Ask the missing question. Build the right product.',
    summary: 'Surface missing requirements during the interview, then turn shared understanding into an interactive prototype and team specifications.',
    category: 'AI Product · Hackathon MVP', status: 'Hackathon team MVP',
    role: 'Requirements integration, interview scenarios and demo script, output review, judging video',
    theme: 'From vague requests to shared understanding',
    insights: ['Find the missing question while the client is still there.', 'Turn spoken requirements into a prototype people can test together.', 'Give four roles the same evidence, with open questions intact.'],
    takeaway: 'A useful AI product helps teams discover differences in understanding earlier, not just produce more content.',
    sections: [
      { id: 'context', eyebrow: 'The problem', title: 'The meeting is recorded. The requirement may still be missing.', body: ['For PMs, systems analysts and consultants, a transcript captures what was said. Unasked questions about payments, cancellations or capacity can still become competing assumptions during design and development. Beachcomber surfaces questions during the interview and uses a clickable prototype to help align understanding.', 'A team project from BUILDMODE at FUTUREMODE, held September 4–6, 2026. The official brief encouraged multidisciplinary teams to turn AI ideas into products. This project connects to improving teamwork and collaboration; that is a thematic interpretation, not a verified competition track.'] },
      { id: 'decisions', eyebrow: 'Product decisions', title: 'Prove one useful workflow first.', body: ['The frontend syncs the transcript every 30 seconds while listening and displays follow-ups in side cards. Prototype generation is user-triggered. This supports a product choice: let the PM decide when to act on a suggestion, reducing opportunities for interruption. This is a reading of the implementation, not a measured usability outcome.', 'The AI service creates one baseline with source and requirement IDs before generating four role-specific specs. It preserves confirmed, proposed, unresolved and conflicting requirements. Structural checks do not establish factual accuracy.'], points: ['Implemented by the team: speech transcription integration, AI follow-ups, HTML prototype and four-role spec generation paths. Current deployed operation could not be reverified.', 'Original mocks and limits: frontend-only session state, stubbed history restoration and some exports; the backend can default to mock responses.', 'Future work: persistent storage, reliable factual verification and production access controls. These are not claimed as delivered outcomes.'] },
      { id: 'contribution', eyebrow: 'My contribution', title: 'Make the team’s work understandable and reviewable.', body: ['My role covered requirements integration, interview scenarios and demo scripting, output review, and judging video production, as credited to 黃郁庭 in the team README. Frontend, backend, AI prompts and deployment were delivered by other team members.', 'This portfolio condenses the workbench into three requirements decisions, keeping the connection to a prototype and specs while removing recording, login and cloud waits. The ceramics scenario, answer choices and immediate rule mapping are authored adaptations, not original features or a real customer case.'] },
    ],
  },
};
