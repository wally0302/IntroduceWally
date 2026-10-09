import type { Locale, Localized } from '@/lib/types';

export type GatherEvidenceStatus = 'implemented' | 'demo' | 'proposed' | 'validated';

export interface GatherSource {
  label: Localized<string>;
  href: string;
}

export interface GatherChapter {
  id: string;
  number: string;
  eyebrow: Localized<string>;
  title: Localized<string>;
  claim: Localized<string>;
  body: Localized<string[]>;
  status: GatherEvidenceStatus;
  statusLabel: Localized<string>;
  sources?: GatherSource[];
}

export interface GatherFlowStep {
  label: Localized<string>;
  detail: Localized<string>;
}

export interface GatherDecision {
  title: Localized<string>;
  short: Localized<string>;
  why: Localized<string>;
  userValue: Localized<string>;
  productValue: Localized<string>;
  tradeoff: Localized<string>;
  validation: Localized<string>;
}

export interface GatherDataRow {
  feature: Localized<string>;
  data: Localized<string>;
  value: Localized<string>;
  boundary: Localized<string>;
}

export interface GatherMetricRow {
  layer: Localized<string>;
  question: Localized<string>;
  metric: Localized<string>;
  denominator: Localized<string>;
  disconfirm: Localized<string>;
}

export interface GatherBringRow {
  lesson: Localized<string>;
  future: Localized<string>;
}

export const gatherSources = {
  linePoll: 'https://help-o.line.me/line/smartphone/pc?contentId=20003458&lang=zh-Hant',
  doodlePoll: 'https://doodle.com/en/product/polls/',
  doodleReport: 'https://doodle.com/en/state-of-meetings-report-2023/',
  privacyLaw: 'https://law.pdpc.gov.tw/LawContent.aspx?id=FL010627',
} as const;

export const gatherFlow: GatherFlowStep[] = [
  { label: { zh: '建立', en: 'Create' }, detail: { zh: '活動與候選時段', en: 'Meetup + candidate slots' } },
  { label: { zh: '分享', en: 'Share' }, detail: { zh: '丟進既有群組', en: 'Send to the existing group' } },
  { label: { zh: '投票', en: 'Vote' }, detail: { zh: '朋友快速回覆', en: 'Friends respond quickly' } },
  { label: { zh: '統計', en: 'Stats' }, detail: { zh: '主揪查看可行時段', en: 'Host sees availability' } },
  { label: { zh: '拍板', en: 'Host decides' }, detail: { zh: '選定時間與人數', en: 'Choose time + attendance' } },
  { label: { zh: '選餐廳', en: 'Restaurant' }, detail: { zh: '成團後才接手', en: 'Only after the group forms' } },
  { label: { zh: '完成', en: 'Final' }, detail: { zh: '分享已確認的安排', en: 'Share the confirmed plan' } },
];

export const gatherBeforeFlow: GatherFlowStep[] = [
  { label: { zh: '聊天', en: 'Chat' }, detail: { zh: '有人提議日期', en: 'Someone suggests a date' } },
  { label: { zh: '日期投票', en: 'Date poll' }, detail: { zh: '回覆散在群組', en: 'Replies live in a thread' } },
  { label: { zh: '人工確認', en: 'Manual check' }, detail: { zh: '主揪逐一追問', en: 'Host follows up one by one' } },
  { label: { zh: '搜餐廳', en: 'Search' }, detail: { zh: '再開一輪討論', en: 'Another discussion begins' } },
];

export const gatherUsers: { label: Localized<string>; host: Localized<string>; guest: Localized<string> }[] = [
  { label: { zh: '主要任務', en: 'Primary job' }, host: { zh: '收斂選項、提醒、拍板', en: 'Narrow options, remind, decide' }, guest: { zh: '看懂問題、快速回覆', en: 'Understand and respond quickly' } },
  { label: { zh: '摩擦容忍度', en: 'Friction tolerance' }, host: { zh: '可承擔較多設定', en: 'Can carry more setup' }, guest: { zh: '一個多餘欄位就可能離開', en: 'One unnecessary field may lose them' } },
  { label: { zh: '身分需求', en: 'Identity assumption' }, host: { zh: '需要可持續管理的權限', en: 'Needs durable management access' }, guest: { zh: '免登入可降低首次回覆阻力', en: 'No login lowers first-use friction' } },
  { label: { zh: '待驗證訊號', en: 'Signals to test' }, host: { zh: '建立至定案所需時間、再次揪團比例', en: 'Time to finalize, repeat hosting' }, guest: { zh: '投票轉換率、回覆時間、中途離開比例', en: 'Vote conversion, response time, drop-off' } },
];

export const gatherDecisions: GatherDecision[] = [
  {
    title: { zh: '聚焦朋友聚餐', en: 'Focus on friends’ meals' }, short: { zh: '先做好一種聚會任務', en: 'Solve one gathering job well' },
    why: { zh: '若一開始就支援所有活動，欄位、規則和例外會迅速增加。先聚焦朋友聚餐，才能圍繞同一個清楚任務收斂需求。', en: 'Supporting every event type expands fields, rules and exceptions. A friends’ meal gives the team one bounded job to solve.' },
    userValue: { zh: '主揪和參與者能沿著同一條聚餐流程完成安排，不必先判斷這是哪一類活動。', en: 'Hosts and guests can complete one meal-planning flow without first classifying a broad event type.' },
    productValue: { zh: '用同一聚餐情境定義欄位與完成條件，有機會累積可比較的需求與使用行為。', en: 'A shared meal context defines required fields and completion criteria, making demand and behavior more comparable.' },
    tradeoff: { zh: '其他活動類型暫不支援；若目標客群實際需要的是泛用行程工具，聚焦聚餐就會限制採用。', en: 'Other event types stay out of scope; if people need a general planner, this focus will limit adoption.' },
    validation: { zh: '先觀察建立、投票與定案的完成率，再以訪談比較其他活動需求；若聚餐流程仍無法完成，先修正而不急著擴張。', en: 'Compare real meal-planning tasks with other event types; reconsider the focus if meal groups do not complete the flow.' },
  },
  {
    title: { zh: '參與者免登入', en: 'Guests do not log in' }, short: { zh: '讓被揪的人先回覆', en: 'Let invitees respond first' },
    why: { zh: '參與者從群組連結進來，不應先付出註冊成本才能回答一個簡單問題。', en: 'Invitees arrive from a group link; a simple answer should not begin with account creation.' },
    userValue: { zh: '暱稱與少量識別即可送出回覆。', en: 'A nickname and lightweight identity are enough to respond.' },
    productValue: { zh: '降低投票入口成本，讓主揪更快看到完整分布。', en: 'Lowering entry cost can give the host a fuller availability picture sooner.' },
    tradeoff: { zh: '仍須處理身分辨識、重複回覆、惡意操作、跨裝置修改與權限問題。', en: 'Duplicate identities, abuse, cross-device continuity and edit permissions remain open problems.' },
    validation: { zh: '衡量投票轉換率與重複回覆比例；若異常回覆增加且轉換沒有改善，免登入的效益便不成立。', en: 'Measure vote conversion and duplicate replies; rising anomalies would challenge the choice.' },
  },
  {
    title: { zh: '系統統計，主揪拍板', en: 'System stats, host decision' }, short: { zh: '系統整理，主揪拍板', en: 'System summarizes; host decides' },
    why: { zh: '熱門時段可以被計算，但誰要承擔群組協調的最後責任，仍是主揪。', en: 'The system can calculate popular slots, but the host still owns the group’s final coordination decision.' },
    userValue: { zh: '主揪快速看懂分布，並能考量重要成員的限制後做決定。', en: 'The host can compare availability and account for key members before deciding.' },
    productValue: { zh: '把排序規則變成可解釋的協助，而非假裝替人做決定。', en: 'Turn ranking into explainable assistance instead of pretending to decide for people.' },
    tradeoff: { zh: '最高分不必然是最合適；少數關鍵人的不可行可能被總分掩蓋。', en: 'The highest score is not always right; one key person’s absence can be hidden by the total score.' },
    validation: { zh: '檢查主揪是否採納統計建議、改選或重新開放投票。', en: 'Track whether hosts accept, override, or reopen after seeing the summary.' },
  },
  {
    title: { zh: '定案後再用 AI 選餐廳', en: 'AI after finalization' }, short: { zh: '成團後才問去哪裡', en: 'Ask where to eat after the group forms' },
    why: { zh: '餐廳需求要依據確定人數、區域與聚餐情境；在前面插入只會增加中途變動。', en: 'Restaurant needs depend on confirmed attendance, area and context; adding it earlier creates avoidable churn.' },
    userValue: { zh: '直接帶入已確定的時間、人數與地點，只補充預算與飲食偏好，少填一次資料、少做一次搜尋。', en: 'Carry over confirmed time, attendance and area; add only budget and preferences, avoiding repeated input and another search.' },
    productValue: { zh: '讓 AI 出現在意圖較清楚的節點，輸入與輸出更能對上。', en: 'Place AI where intent is clearer, so inputs and outputs correspond better.' },
    tradeoff: { zh: 'AI 介入較晚；推薦仍有查詢成本、店家資料過期與未知條件的風險。若定案後仍無人使用，就要重新評估需求。', en: 'AI enters later; query costs, stale venue data and unknown requirements remain. Low use after finalization would challenge the need.' },
    validation: { zh: '以定案活動為分母，觀察推薦啟動、查看候選與選定的漏斗。', en: 'Use finalized events as the denominator and observe start, view and selection.' },
  },
  {
    title: { zh: '第一階段免費', en: 'Free first phase' }, short: { zh: '先驗證重複價值', en: 'Test repeat value first' },
    why: { zh: '早期最重要的不確定性是人們是否願意再次使用，而不是先設計收費牆。', en: 'The early uncertainty is repeat use, not the shape of a paywall.' },
    userValue: { zh: '不用在還沒感受價值前先理解方案與付費。', en: 'People can feel the value before learning a pricing model.' },
    productValue: { zh: '保留足夠樣本觀察定案、重複揪團與商家轉換。', en: 'Keep enough room to observe finalization, repeat hosting and merchant conversion.' },
    tradeoff: { zh: '早期沒有收入，仍須負擔維護成本；免費使用也可能吸引非目標流量，無法直接證明付費意願。', en: 'Early maintenance costs have no revenue to offset them. Free use may attract non-target traffic and does not prove willingness to pay.' },
    validation: { zh: '在有重複使用證據後，才做小規模贊助或付費意願試驗。', en: 'Run a small sponsorship or willingness-to-pay test only after repeat use appears.' },
  },
];

export const gatherDataRows: GatherDataRow[] = [
  { feature: { zh: '建立活動', en: 'create / event type' }, data: { zh: '聚餐類型、日期、時段、區域', en: 'Meal, dates, slots, area' }, value: { zh: '看出哪些聚會與時段值得優先協助', en: 'Demand distribution: which gatherings and slots deserve help' }, boundary: { zh: '活動建立不等於實際出席或聚會已發生', en: 'Not proof of attendance or a meal that happened' } },
  { feature: { zh: '參與者回覆', en: 'votes / responses' }, data: { zh: '有空、可以配合、無法參加', en: 'available, if needed, unavailable' }, value: { zh: '判斷時段可行性，以及是否減少來回確認', en: 'Feasibility and friction: which slots reduce back-and-forth' }, boundary: { zh: '分享出去不等於對方收到；收到回覆也不等於本人會到', en: 'copy ≠ received; a reply is not attendance' } },
  { feature: { zh: '活動定案', en: 'finalize' }, data: { zh: '確定時段、預計出席人數', en: 'Confirmed slot and count' }, value: { zh: '觀察主揪是否能把聚會收斂成明確安排', en: 'Intent signal: whether the host can close the loop' }, boundary: { zh: '定案不等於聚餐實際舉行；取消與改期須另行追蹤', en: 'finalized ≠ actual meal; cancellation and rescheduling need separate evidence' } },
  { feature: { zh: '餐廳偏好', en: 'restaurant prefs' }, data: { zh: '預算、料理、情境、距離', en: 'Budget, cuisine, context, distance' }, value: { zh: '整理成團後的選餐方向', en: 'Demand framing: the post-finalization restaurant direction' }, boundary: { zh: '提供偏好不等於完成交易或訂位', en: 'Preferences are not a restaurant deal or reservation' } },
  { feature: { zh: '查看與選定', en: 'selection' }, data: { zh: '查看候選餐廳、主揪選擇', en: 'Candidate viewed and host selection' }, value: { zh: '了解推薦是否協助團體做出下一步決定', en: 'Decision friction: whether recommendations help the next step' }, boundary: { zh: '選定不等於訂位；點擊不等於成交', en: 'selected ≠ booked; click ≠ deal' } },
  { feature: { zh: '再次使用', en: 'reuse' }, data: { zh: '同一主揪再次建立聚會', en: 'The same host creates again' }, value: { zh: '衡量主揪是否有理由再次回來', en: 'Host retention: whether there is a reason to return' }, boundary: { zh: '排除展示用資料、重複事件與自動重試', en: 'Exclude demo duplicates and automatic retries' } },
];

export const gatherDataStages = [
  { label: { zh: '原始事件', en: 'Raw events' }, detail: { zh: '建立、分享、回覆、定案', en: 'create, share, vote, finalize' }, condition: { zh: '先定義事件與取得必要同意', en: 'Define events and consent first' } },
  { label: { zh: '結構化需求', en: 'Structured demand' }, detail: { zh: '時間、區域、預算、料理、角色', en: 'Time, area, budget, cuisine, role' }, condition: { zh: '去除重複，保留來源與品質註記', en: 'Deduplicate and retain provenance and quality notes' } },
  { label: { zh: '決策訊號', en: 'Decision signals' }, detail: { zh: '定案、選定、重新開放、取消', en: 'Finalize, select, reopen, cancel' }, condition: { zh: '清楚定義狀態，不把意圖當成結果', en: 'Define states; do not call intent an outcome' } },
  { label: { zh: '商業機會', en: 'Business opportunity' }, detail: { zh: '再次使用、贊助試驗、可核實成交', en: 'Repeat use, sponsorship trial, verified conversion' }, condition: { zh: '需先定義分母、觀察期間與授權', en: 'Requires denominator, window and consent' } },
];

export const gatherPrivacyRows = [
  { label: { zh: '必要且短暫', en: 'Necessary and ephemeral' }, value: { zh: '展示流程只用暱稱、回覆與活動狀態完成本次協調', en: 'Nickname, vote and event state for this coordination' } },
  { label: { zh: '可選資料', en: 'Optional' }, value: { zh: 'Email 或聚合偏好；應分開說明用途，不默認用於行銷', en: 'Email or aggregate preference; purpose must be separate from marketing' } },
  { label: { zh: '治理責任', en: 'Design responsibility' }, value: { zh: '說明使用目的、取得授權、限制保存，並提供刪除或撤回管道', en: 'Purpose notice, authorization, minimal retention, deletion and withdrawal' } },
];

export const gatherRoadmap = [
  { phase: { zh: '01／免費驗證', en: '01 / free validation' }, gate: { zh: '看見重複建立與有效定案', en: 'Repeat creation and finalized gatherings' }, next: { zh: '確認使用者是否需要這段聚會協調流程', en: 'Learn whether people need the workflow at all' } },
  { phase: { zh: '02／曝光贊助', en: '02 / sponsored trial' }, gate: { zh: '使用意圖足夠，且可追蹤後續轉換', en: 'Enough intent with traceable conversion' }, next: { zh: '明確標示商家贊助，並遵守地區、預算等條件', en: 'Merchant visibility, clearly labeled and bounded by hard filters' } },
  { phase: { zh: '03／驗算單位經濟', en: '03 / unit economics' }, gate: { zh: '獲客、支援、維護與核銷成本可計算', en: 'Acquisition, support, maintenance and redemption are measurable' }, next: { zh: '確認每筆成交有正貢獻，再評估提高客單或擴張', en: 'Only then consider higher ticket or expansion' } },
];

export const gatherMetrics: GatherMetricRow[] = [
  { layer: { zh: '痛點假設', en: 'Pain' }, question: { zh: '現有流程在哪裡中斷？', en: 'Where does the current workflow break?' }, metric: { zh: '訪談中提到協調困難的比例、完成任務所需時間', en: 'Pain frequency in interviews; observed task time' }, denominator: { zh: '每位符合條件的受訪者各完成一次訪談與一次任務觀察；只納入 30 天招募期內的真實聚餐協調，不計只看展示稿者', en: 'Per participant / task; exclude demo-only viewers' }, disconfirm: { zh: '多數人不覺得協調麻煩，或既有流程已足以完成', en: 'Most people do not experience coordination as a problem' } },
  { layer: { zh: '採用假設', en: 'Adoption' }, question: { zh: '主揪建立後，有人開始回覆嗎？', en: 'Does anyone actually start a gathering?' }, metric: { zh: '建立至首次回覆比例、有效回覆比例、中途離開比例', en: 'create → first vote, vote conversion, drop-off' }, denominator: { zh: '連續 30 天內建立的有效聚會為群組，自各場建立日起觀察 7 天；排除測試、重複與展示資料', en: 'Events created in a 30-day cohort, observed for seven days each; exclude tests and duplicates' }, disconfirm: { zh: '建立後沒有分享或參與者回覆率低於原有做法', en: 'No sharing after creation or conversion below the current alternative' } },
  { layer: { zh: '成團假設', en: 'Outcome' }, question: { zh: '聚會是否真的形成明確安排？', en: 'Does the group reach a decision?' }, metric: { zh: '有效定案聚會數、建立至定案時間、重新開放與取消比例', en: 'Valid finalized gatherings, time to finalize, reopen / cancel' }, denominator: { zh: '同一 30 天建立群組，各場觀察 7 天；每場須有至少 3 位不同參與者有效回覆且主揪定案', en: 'Same 30-day cohort, observed for seven days; valid outcome requires ≥3 independent replies and host finalization' }, disconfirm: { zh: '定案後常取消，或定案僅由主揪測試回覆構成', en: 'High cancellation after finalization or host-only fake completion' } },
  { layer: { zh: '商業假設', en: 'Business' }, question: { zh: '商家願為哪種可核實結果付費？', en: 'Who pays for which outcome?' }, metric: { zh: '商家訪談、曝光贊助試用、專屬連結或優惠碼帶來的核銷、續約意願', en: 'Merchant interviews, sponsored trial, verified codes, renewal intent' }, denominator: { zh: '30 天招募試驗；以每家商家、每次試驗及每筆可歸因消費為分母，再追蹤 30 天核銷', en: '30-day trial recruitment, plus 30 days for redemption; report per merchant, trial and attributable purchase' }, disconfirm: { zh: '商家只要曝光、不願負擔成本，或無法核實帶來的成交', en: 'Merchants want exposure only, reject cost, or cannot verify conversion' } },
  { layer: { zh: '留存觀察', en: 'Repeat' }, question: { zh: '主揪會再次建立聚會嗎？', en: 'Do hosts return?' }, metric: { zh: '首次有效定案後 30／60 天內再次建立聚會的主揪比例', en: 'Same host creates again within 30 / 60 days' }, denominator: { zh: '分別追蹤首次定案後 30 天與 60 天；分母為曾完成一次有效定案的主揪，真實活動與展示資料分開計算', en: 'Hosts with one valid event; separate demo from real activity' }, disconfirm: { zh: '主揪只使用一次，或回訪全部來自研究人員與測試者', en: 'No return after one use or returns come only from testers' } },
];

export const gatherTimeline = [
  { date: { zh: 'BEFORE／範圍', en: 'BEFORE / Scope' }, title: { zh: '協調到餐廳決策的完整構想', en: 'Coordination through restaurant choice' }, detail: { zh: '希望串起建立活動、參與投票、主揪定案與 AI 選餐廳。', en: 'Connect event creation, guest voting, host finalization and AI restaurant choice.' } },
  { date: { zh: '09 / 23／限制', en: '09 / 23 / Constraint' }, title: { zh: '前端人力臨時退出', en: 'A frontend contributor leaves' }, detail: { zh: '依專案提供者說明，人力減少後需要重新分工並調整工程優先級。', en: 'The supplied project account describes reduced capacity, reassigned work and revised priorities.' } },
  { date: { zh: 'DECISION／取捨', en: 'DECISION / Scope cut' }, title: { zh: '保住建立到定案的核心流程', en: 'Protect creation through finalization' }, detail: { zh: '建立、投票、統計與拍板優先；AI 降為次要開發項目。沒有成團，後續選餐也難以提供價值。', en: 'Prioritize creation, voting, statistics and a decision; lower AI’s development priority. Restaurant choice needs a group first.' } },
  { date: { zh: 'OBSERVABLE／可確認', en: 'OBSERVABLE / Repository' }, title: { zh: '目前可操作的靜態展示稿', en: 'An operable static demo today' }, detail: { zh: '原始碼可見完整協調流程與餐廳模擬資料；這能支持功能範圍，不能直接證明當時交付速度或成效。', en: 'Source code contains the coordination flow and restaurant mocks. It establishes scope, not historical delivery speed or outcomes.' } },
];

export const gatherLessons: { lesson: Localized<string>; link: Localized<string> }[] = [
  { lesson: { zh: '先找到阻礙任務完成的環節。', en: 'Find the obstacle to completing the job.' }, link: { zh: '餐廳推薦只處理旅程的一段；若時間始終喬不攏，再多餐廳選項也無法成團。因此先把分散的回覆收斂成可拍板的時段。', en: 'Restaurant choice solves only one part of the journey. If the group cannot agree on a time, more venues do not help; first turn replies into a workable decision.' } },
  { lesson: { zh: '先問使用者價值，再定義資料。', en: 'Ask for user value before defining data.' }, link: { zh: '資料章把回覆、定案、選店拆開，因為各自代表不同意圖；混用會把一次點擊誤當成成交。', en: 'Separate replies, finalization and restaurant selection because each signals a different intent.' } },
  { lesson: { zh: '最小可行產品代表優先順序，不是功能清單。', en: 'An MVP is a priority order, not a feature list.' }, link: { zh: '執行章把有限資源集中在建立至定案，因為少了這段，後續選餐沒有明確人數與時間可承接。', en: 'The execution chapter prioritizes create to finalization because restaurant selection needs a confirmed time and group.' } },
  { lesson: { zh: '功能完成不等於假設已獲驗證。', en: 'A feature is not a validated assumption.' }, link: { zh: '驗證章要求真實參與者、明確分母與觀察期間；展示稿中的完成流程不能替代使用結果。', en: 'The validation chapter requires real participants, denominators and observation windows.' } },
  { lesson: { zh: '讓 AI 在能減少決策摩擦的時刻出現。', en: 'AI should appear when it can reduce decision friction.' }, link: { zh: '餐廳推薦放在聚會定案後，因為此時才有較可靠的日期、人數與區域條件。', en: 'Restaurant selection follows finalization because time, attendance and area are clearer.' } },
];

export const gatherBring: GatherBringRow[] = [
  { lesson: { zh: '旅程拆解', en: 'Journey mapping' }, future: { zh: '把「建立→回覆→定案」翻成產品漏斗，找到斷點而非只看功能。', en: 'Translate create → respond → finalize into a product funnel and find the break, not just the feature.' } },
  { lesson: { zh: '非對稱角色', en: 'Asymmetric roles' }, future: { zh: '在協作軟體中先列出管理者與參與者各自要完成的任務，再據此決定入口、可見資訊與修改權限。', en: 'Carry host / guest responsibilities into B2B SaaS, multi-role collaboration and permissions.' } },
  { lesson: { zh: '核心優先', en: 'Core before expansion' }, future: { zh: '在資源有限時先交付能完成任務的 MVP，再安排延伸功能。', en: 'With limited resources, ship the task-completing MVP before extensions.' } },
  { lesson: { zh: '資料邊界', en: 'Data boundaries' }, future: { zh: '規劃個人化前先定義事件、目的與同意方式，並分開記錄點擊、選擇和實際成交，避免錯把意圖當成結果。', en: 'Ground personalization and recommendations in event definitions and consent, not every click as preference.' } },
  { lesson: { zh: '雙邊價值', en: 'Dual-sided value' }, future: { zh: '設計雙邊服務時，分開衡量使用者節省的時間與商家可核實的成交，再檢查收入能否負擔獲客和服務成本。', en: 'Separate host efficiency from verifiable merchant conversion as a starting point for marketplace / B2B2C.' } },
  { lesson: { zh: '假設迭代', en: 'Hypothesis iteration' }, future: { zh: '在成長實驗開始前，先寫下什麼結果會推翻假設，讓迭代有明確的調整依據。', en: 'Write disconfirming results into growth experiments so each iteration reduces uncertainty.' } },
];

export const gatherChapters: GatherChapter[] = [
  {
    id: 'gather-problem', number: '01', eyebrow: { zh: 'THE PROBLEM／問題', en: 'THE PROBLEM' },
    title: { zh: '我們不是缺少聚會工具，而是缺少一條順利成團的流程。', en: 'We have gathering tools. The missing piece is a connected path to a plan.' },
    claim: { zh: '我們要降低的，是讓聚會停在「改天再約」的多人協調成本。', en: 'Reduce the coordination cost that turns “let’s meet” into “some other time.”' },
    body: {
      zh: ['主揪要找出大家可行的時段、確認是否成團，再通知下一步。聊天、日期投票、人工追問、找餐廳與最後通知分散在不同地方；每次切換都讓主揪重新整理資訊、補問缺口。', 'LINE 已提供日期投票；Doodle Polls 也支援分享連結、免登入回覆、追蹤回覆與確認時段。這個案例要驗證的是：朋友聚餐是否需要把「選時間到成團後選餐」接成連續旅程。Doodle 的會議報告以北美與歐洲職場使用情境為主，僅作背景參考，不能直接推論台灣朋友聚餐的需求。'],
      en: ['The host’s job is not to collect more messages. It is to find a workable time and make the next step clear. Chat, date polls, manual follow-up, restaurant search and the final notice often live in different places, sending the cost of every handoff back to the host.', 'This does not claim that LINE or Doodle are weak: LINE already has polls, and Doodle offers no-login polls, response management and confirmed time slots. The case hypothesis is narrower: a friends’ meal may benefit from carrying the post-formation decision into the same journey. That hypothesis still needs real workflow evidence.'],
    }, status: 'demo', statusLabel: { zh: '原始專案：靜態展示稿', en: 'Source project: static demo' },
    sources: [{ label: { zh: 'LINE 日期投票說明', en: 'LINE poll help' }, href: gatherSources.linePoll }, { label: { zh: 'Doodle 投票功能', en: 'Doodle Polls' }, href: gatherSources.doodlePoll }, { label: { zh: 'Doodle 會議報告（背景）', en: 'Doodle meeting report (context)' }, href: gatherSources.doodleReport }],
  },
  {
    id: 'gather-users', number: '02', eyebrow: { zh: 'THE USERS／使用者', en: 'THE USERS' },
    title: { zh: '主揪負責推進，參與者只想快速回覆。', en: 'Hosts drive the process; guests want to respond quickly.' },
    claim: { zh: '把目標使用者假設拆成不同任務，再找證據檢驗。', en: 'Treat the target as a hypothesis, then make role differences measurable.' },
    body: { zh: ['團隊提出的目標使用者假設是：20 至 39 歲、常替朋友揪團的主揪，以及 3 至 8 人的朋友聚餐。這是待驗證的範圍，不是研究結論。主揪要管理、提醒與定案；參與者需要看懂問題並快速回覆。', '原始 PRD 採主揪登入、參與者免登入的非對稱設計；目前登入仍為模擬 UI，作品集則直接切換角色以展示差異。免登入可能降低第一次回覆的阻力，也帶來身分辨識、重複回覆、惡意操作、跨裝置修改與權限問題。是否值得，應同時看投票轉換率、回覆時間、中途離開比例及異常回覆，而非把免登入本身當成果。'], en: ['Frequent hosts aged 20–39 and friend groups of 3–8 are a team target hypothesis, not research evidence. Hosts manage, remind and decide; guests only need to understand the question and respond quickly.', 'The PRD proposes host sign-in with no-login guests. Sign-in is mocked in the source; this portfolio uses a role switch to demonstrate the difference. Guest access shortens the first step, while leaving identity, duplicate, abuse and cross-device trade-offs. Test the choice with vote conversion, response time, drop-off and anomalous replies rather than treating no-login as success by itself.'] }, status: 'proposed', statusLabel: { zh: '目標使用者假設／待驗證', en: 'Target hypothesis / proposed' },
  },
  {
    id: 'gather-decisions', number: '03', eyebrow: { zh: 'THE DECISIONS／取捨', en: 'THE DECISIONS' },
    title: { zh: '少做一些功能，才能讓最重要的流程真正完成。', en: 'Do less so the most important workflow can finish.' },
    claim: { zh: '每個選擇都有受益者，也有必須承擔的代價。', en: 'Keep the why, value, trade-off and test beside every decision.' },
    body: { zh: ['五張決策卡依序討論：聚焦朋友聚餐、讓參與者免登入回覆、由系統整理時段而讓主揪拍板、定案後才接上選餐，以及第一階段免費驗證重複價值。每個選擇都列出使用者價值、產品影響、代價與待驗證訊號。', '最高分時段不一定最適合整團；關鍵成員無法出席，可能比多數人的偏好更重要。要追蹤主揪採納建議、改選、重新開放或取消的情況，也要確認團員是否各自完成回覆。'], en: ['Meal first, no-login guests, system stats with host decisions, AI after finalization and a free first phase form a chain from the core job to business exploration.', 'The highest system score does not have to be accepted; it is explainable assistance. What matters is whether hosts accept, override, reopen or cancel, and whether guests complete their responses.'] }, status: 'proposed', statusLabel: { zh: '產品判斷／待驗證', en: 'Decision matrix / product judgment' },
  },
  {
    id: 'gather-data', number: '04', eyebrow: { zh: 'THE DATA／資料', en: 'THE DATA' },
    title: { zh: '資料的價值來自正確的轉換，不是事件越多越好。', en: 'Data earns value through correct transformations, not through more events.' },
    claim: { zh: '把資料轉成需求與決策時，先保留每個事件代表什麼的界線。', en: 'Transform raw events into explainable demand and decisions while keeping semantic boundaries visible.' },
    body: { zh: ['建立、回覆、定案、輸入餐廳偏好、選定餐廳與再次使用各自回答不同問題。分享連結不等於對方收到；選定餐廳不等於訂位；定案不等於聚餐已舉行。若混成單一漏斗，推薦與商業判斷就會依賴錯誤訊號。', '長期想理解的是：什麼樣的群體，在什麼時間、地點，形成了具體的消費需求？先幫一群確定要出門的人完成安排，才可能在他們選場所時提供相關建議。這是未來正式平台的能力假設，目前 Demo 沒有累積這些營運資料。', '隱私也是資料流程的一部分：只收集完成協調所需的暱稱與回覆；電子郵件及彙整偏好應採選擇提供，且與行銷用途分開說明。統計需求應與個人識別資料分開，活動過期後也不應默認永久保留個人歷史。目的告知、授權、保存期限與刪除或撤回方式仍待治理設計。法規頁僅作設計參考；部分 2025 年修法尚未生效，本頁不代表已完成法律遵循。'], en: ['create, votes, finalize, restaurant preferences, selection and reuse answer different questions. copy ≠ received, selected ≠ booked, finalized ≠ actual meal. If they collapse into one funnel, later recommendation and business decisions inherit the wrong signal.', 'The long-term question is which groups are forming concrete demand, when and where. A group that already plans to go out may benefit from relevant venue suggestions. This is a future platform hypothesis; the demo has not accumulated such operational data.', 'Privacy is part of the design: nicknames and votes may be ephemeral necessities, while email and aggregate preferences should be optional, with purpose notice, authorization, marketing separation, minimal retention and deletion or withdrawal rights. Aggregate demand should be separated from personal identity; expired events do not justify retaining a permanent personal history. The law page is a design reference; parts of the 2025 amendment are not yet in force, so this is not a compliance claim.'] }, status: 'demo', statusLabel: { zh: '資料流程／展示稿邊界', en: 'Data map / demo boundary' },
    sources: [{ label: { zh: '個資法法規資料庫', en: 'Taiwan PDPA database' }, href: gatherSources.privacyLaw }],
  },
  {
    id: 'gather-business', number: '05', eyebrow: { zh: 'THE BUSINESS／商業', en: 'THE BUSINESS' },
    title: { zh: '先證明聚會流程有重複價值，再驗算商業模式。', en: 'Prove repeat value before testing the business model.' },
    claim: { zh: '先免費驗證使用價值，之後分開測曝光與可歸因成交。', en: 'Validate user value first, then test visibility and attributable conversion.' },
    body: { zh: ['第一階段免費觀察重複建立與有效定案；達到明確的使用意圖後，才小規模測試曝光贊助。曝光收費要清楚標示，且推薦仍須符合地區、預算與飲食條件。若要依成交分潤，須以商家專屬連結、優惠碼或現場核銷驗證歸因，不能把點擊當成交。', '成長循環的假設是：主揪建立後分享連結，參與者完成聚會後也成為新主揪。需追蹤每個渠道帶來的新主揪、參與者轉成主揪比例、重複建立與有效參與。試算還要扣除獲客、服務介接、客服、商家維護與優惠核銷成本；正貢獻尚未驗證。'], en: ['The roadmap moves from free validation of repeat use and finalization, to merchant sponsorship once intent is sufficient, and then to higher-ticket expansion after unit economics are understood. Sponsorship must be labeled and cannot override hard constraints such as area, budget or cuisine; a click is not a deal.', 'The growth loop is host create → share → friend vote → some new host → repeat. It is a mechanism to test, not an outcome. Business trials need acquisition, API, support, merchant maintenance and redemption rate in view; no positive contribution means no business claim.'] }, status: 'proposed', statusLabel: { zh: '商業假設／待驗證', en: 'Gated roadmap / business hypothesis' },
  },
  {
    id: 'gather-execution', number: '06', eyebrow: { zh: 'THE EXECUTION／執行', en: 'THE EXECUTION' },
    title: { zh: '限制先決定範圍，範圍再決定這一版要學什麼。', en: 'Constraints set scope; scope sets what this version can learn.' },
    claim: { zh: '當工程資源減少，優先保住能驗證核心價值的成團流程。', en: 'When engineering capacity shrinks, protect the flow that can test the core value.' },
    body: { zh: ['專案提供者表示，9 月 23 日前端人力退出後，團隊將開發優先級放在建立、分享、回覆、統計與定案等核心流程，AI 是較後順位的開發項目。這與另一項產品旅程判斷分開：餐廳推薦安排在聚會定案之後。21 頁簡報原檔未取得，前述時間線僅依提供者說明。', '目前程式庫保留了建立、投票、統計與定案的靜態流程，以及餐廳推薦示範。這能確認可展示的功能範圍；當時交付時間與實際使用成效，仍需另外的紀錄支持。'], en: ['According to the supplied project account, the frontend contributor left on September 23. The team prioritized creation, voting, statistics and finalization, lowering AI’s development priority. Separately, the product flow places restaurant assistance after time confirmation.', 'The current repository preserves a static creation, voting, statistics and finalization flow, plus mocked restaurant recommendations. It establishes the demonstrable scope; historical delivery dates and usage outcomes need separate records.'] }, status: 'demo', statusLabel: { zh: '展示稿與提供者說明', en: 'Repo evidence / supplied-account boundary' },
  },
  {
    id: 'gather-validation', number: '07', eyebrow: { zh: 'THE VALIDATION／驗證', en: 'THE VALIDATION' },
    title: { zh: '做出產品，不代表我們已經證明問題被解決。', en: 'A funnel is useful only when its evidence can disconfirm the story.' },
    claim: { zh: '從痛點、採用、結果、留存到商業，每一層都先寫分母、期間與失敗條件。', en: 'For pain, adoption, outcome, repeat and business, define denominator, window and failure condition first.' },
    body: { zh: ['北極星指標候選是「有效完成定案的聚會數」。擬議口徑為：至少 3 位不同參與者各自送出有效回覆，且主揪完成定案；展示資料、測試流量與重複事件排除。這個定義仍待資料與研究團隊共同確認，尚無實際結果。', '四項核心假設分別檢驗痛點、採用、成團與商家付費；主揪留存另作觀察。採用與成團指標以連續 30 天內建立的聚會為群組，再從各場建立日起觀察 7 天的分享、回覆、定案、重新開放與取消。商業試驗則分開計算曝光與可歸因核銷。若資料不支持假設，就調整目標使用者或流程。'], en: ['The candidate north star is the number of valid finalized gatherings: a draft rule of at least three real independent replies and a host finalization. That is a proposed definition, not a proven outcome.', 'There is no validated real outcome yet. Track reopen, cancel, time to finalize, repeat and actual held, excluding demo duplicates, automatic retries and test traffic. If the evidence disagrees, narrow the target or change the flow instead of rewriting the number.'] }, status: 'proposed', statusLabel: { zh: '擬議指標／尚無實測', en: 'Proposed metrics / no real data' },
  },
  {
    id: 'gather-reflection', number: '08', eyebrow: { zh: 'THE REFLECTION／反思', en: 'THE REFLECTION' },
    title: { zh: '我帶走的不是一個功能清單，而是一套縮小不確定性的順序。', en: 'I take away an order for reducing uncertainty, not a feature list.' },
    claim: { zh: '把前面的取捨，轉成下一次可以使用的工作方法。', en: 'Five lessons point back to the decisions and become a method for the next product.' },
    body: { zh: ['這個案例讓我確認工作順序：先走完整段使用者旅程，再決定 AI 的位置；先釐清每項資料代表的使用者價值，再定義保存方式；把最小可行產品當成取捨順序；把功能完成與假設驗證分開。前七章呈現這些選擇如何影響流程、權限、資料和商業測量。', '帶到下一個產品時，我會先把旅程拆成可觀察的轉換，據角色需求設計權限，並為每個事件標明目的和結果界線。若產品連結使用者與商家，我也會把使用者效率、可歸因成交與服務成本分開衡量，再依反證結果調整假設。'], en: ['Start with the journey before AI; ask for user value before defining data; treat an MVP as a priority order; admit that a feature is not validation; place AI where it reduces decision friction. These are concrete choices from the first seven chapters, not decorative conclusions.', 'What I Bring turns them into transferable capabilities: journey to funnel, asymmetric roles into B2B SaaS and multi-role work, core MVPs for resource decisions, data boundaries for personalization, dual-sided value for marketplace / B2B2C, and hypotheses for growth iteration.'] }, status: 'proposed', statusLabel: { zh: '可遷移的工作方法', en: 'Transferable practice' },
  },
];

export function gatherText<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
