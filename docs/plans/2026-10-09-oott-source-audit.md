# OOTT 原始來源稽核（指定 Commit）

> 稽核日期：2026-10-09（Asia/Taipei）  
> 來源倉庫：[wally0302/tshirt-web](https://github.com/wally0302/tshirt-web)  
> 鎖定版本：[5b6d93f896cd866c327810a2de834915527dd895](https://github.com/wally0302/tshirt-web/tree/5b6d93f896cd866c327810a2de834915527dd895)  
> 本文件只記錄公開 GitHub 內容；沒有複製或修改原始 OOTT 專案。

## 稽核範圍與結論

已完整閱讀規格指定的 7 份文件，並掃描規格列出的 13 個實作檔案。規格列出的 `components/ExploreTab.tsx` 在此 commit 不存在；實際檔案是 [`app/(app)/wardrobe/components/ExploreTab.tsx`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/%28app%29/wardrobe/components/ExploreTab.tsx)。

指定 commit 的作者時間與提交時間都是 **2026-06-07 00:34:05 +08:00**，標題為 `feat(ai): 加入 Google Search Grounding，AI 推薦可感知即時天氣與地點資訊`。該 commit 只改動 `WebChatView.tsx`、`app/api/wardrobe/chat/route.ts`、`lib/ai/callAI.ts` 和 `openspec/specs/ai-styling/spec.md`，因此它能支持「6 月後迭代加入 Grounding」的時間線，但不能把此能力回寫成 5 月競賽當時已展示的功能。[commit metadata](https://github.com/wally0302/tshirt-web/commit/5b6d93f896cd866c327810a2de834915527dd895)

原始產品是需要 Supabase Auth/RLS、R2、Gemini、Vertex AI 與外部天氣/搜尋服務的純 Web app；作品集 prototype 應維持規格要求的純前端 deterministic mock，不能 iframe 原站，也不能把這些服務帶進作品集頁面。[system overview](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/openspec/specs/system-overview/spec.md)

## 7 份文件的可用事實

| 文件 | 讀到的事實 | 對作品集的使用邊界 |
|---|---|---|
| [`system-overview/spec.md`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/openspec/specs/system-overview/spec.md) | 定位是個人穿搭靈感平台；衣櫃、穿搭、計畫、穿搭牆、Explore、AI 推薦、虛擬試穿整合在 Web；2026-06-01 後 LINE/Telegram/LIFF 已移除。 | 可寫「純 Web 的來源產品」；不要把來源技術棧當成作品集 prototype 的依賴。 |
| [`docs/PRD-wardrobe-v1.md`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/docs/PRD-wardrobe-v1.md) | 2026-02-17 Draft；首版問題是 30 秒上傳、數十件衣物中快速搜尋/篩選、衣櫃內看天氣；首版非目標是推薦演算法與公開社群；KPI 是目標值。 | 可用作「先建資料基礎」的決策證據；所有 KPI 必須標成 target/規劃，不得標成成果。 |
| [`wardrobe/spec.md`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/openspec/specs/wardrobe/spec.md) | 衣物上傳/分類/篩選、Planner、朋友代排分享、Personal Outfit Wall、本人照片與試穿、點數與邀請系統均有規格；批次上傳最多 20 件。 | P0 Demo 只需取衣櫃→推薦→輕量計畫與試穿流程；不要把分享、邀請、完整 CRUD 做成作品集功能清單。 |
| [`ai-styling/spec.md`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/openspec/specs/ai-styling/spec.md) | AI 推薦是意圖解析→HyDE embedding→品類分開向量檢索→縮圖→Gemini 多模態推薦；Grounding 按 `context_query` 觸發；試穿用 Vertex `virtual-try-on-001`，每次扣 5 點。 | 可解釋「先讓衣櫃成為可查找資料，再讓推薦有可執行候選」；Grounding、Embedding、Vertex 全部在 prototype 中以標籤/規則模擬。 |
| [`outfits/spec.md`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/openspec/specs/outfits/spec.md) | 穿搭牆有 Daily/Featured、圖片調整、標籤、描述、hashtag、公開分享與投票；標籤可關聯本人衣物。 | 下半部可把「搭配選擇→真實穿搭記錄」當資料層，但不能把推薦或試穿意圖直接當成真實穿著。 |
| [`explore/spec.md`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/openspec/specs/explore/spec.md) | Explore 是最新/熱門 feed、風格分類預留、cursor 分頁、按讚、分享、詳情 overlay 與試穿入口；第一頁有 session cache，請求用 AbortController。 | 可作為「探索與記錄是後續價值」的來源；P0 不必重建公開社群。 |
| [`docs/ai-recommendation-flow.md`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/docs/ai-recommendation-flow.md) | 上傳後 fire-and-forget 分析圖片，寫入 thickness/description/text_embedding；推薦最多每品類 3 件、最多 9 件，縮圖下載失敗時退為文字推薦。 | 可在 Case Study 寫清楚「資料品質與候選範圍」；不要宣稱推薦品質或留存已被證明。 |

## 實際推薦管線與 Grounding

### 實際推薦順序

1. `POST /api/wardrobe/chat` 先驗證登入、訊息最多 500 字元、`excludedIds` 最多 50 個且必須是 UUID。
2. `parseIntent()` 以 Gemini 2.5 Flash JSON mode 解析 `categories`、`thicknesses`、`search_expansion` 與 `context_query`。JSON 解析失敗時退回 top/bottom、全部厚度，且 `context_query=null`。
3. `search_expansion` 送 `gemini-embedding-001` 768 維 embedding；各品類用 `match_items_by_category` 初始 threshold 0.25，無候選時降到 -1.0 並放寬厚度，排除清單一路傳入。
4. 候選衣物最多每品類 3 件；圖片用 Cloudflare Transformations 384px 縮圖並行下載。至少一張縮圖成功時走 Gemini 多模態；全部失敗時走純文字 prompt。回傳 ID 只接受候選白名單中的 ID。
5. 最終推薦仍是 Gemini 2.5 Flash JSON mode，理由不含 Grounding 時要求 30 字內，有 Grounding 時 50 字內；`WebChatView` 的「換掉這件」會把 ID 加入 `excludedIds` 後重跑原始訊息。

### Grounding 的精確觸發條件

Grounding 不是每次推薦都呼叫。只有 Gemini 意圖解析產生 `context_query`，且該字串通過白名單 regex（漢字/日文/英數/空格/連字號/句點，1–60 字元）時，才在 `Promise.all` 中呼叫 `callGeminiWithSearch()`。Prompt 以 `google_search` tool 查詢具體地點/場所/景點的外部情境，並要求繁中、50 字內、包含具體溫度；結果截斷為 200 字後插入最終推薦 prompt。[route.ts#L46-L96](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/api/wardrobe/chat/route.ts#L46-L96) [route.ts#L163-L180](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/api/wardrobe/chat/route.ts#L163-L180) [callAI.ts#L113-L153](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/lib/ai/callAI.ts#L113-L153)

因此可把「明天去阿里山」作為真實來源的 Grounding 例子，把「下午茶約會」作為不觸發的例子。Prototype 應固定顯示「示範規則推薦」，不能真的查天氣或暗示即時數字。

### 容錯、延遲與成本邊界

- `callGeminiWithSearch()` 失敗、超時或沒有文字時，`.catch(() => null)` 將 `worldContext` 設為 null；主流程繼續使用衣櫃候選，最後理由回到 30 字內。這是 graceful degradation，不是推薦成功率證據。
- Grounding 與 embedding 並行，降低等待時間，但不會消除兩個服務呼叫的費用與失敗面。
- 原始程式碼沒有提供任何美元單價、token 計費、Search Grounding 單次費用或成本上限；`ai_usage_events` 只以 `web_chat` 一次請求計數，沒有分開記 Search、embedding、意圖解析、最終推薦的成本。故「Grounding 成本」只能報告為「額外一次 Gemini Search 呼叫＋可能的搜尋/模型用量」，不能編造金額。[usageService.ts](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/lib/ai/usageService.ts)
- 實際 `web_chat` quota 是 `usageService.ts` 的 5 次/台北日；但 `chat/route.ts` 的錯誤註解與 429 文案寫成 30 次。執行限制以 `AI_DAILY_LIMITS.web_chat = 5` 為準，文案是明確的程式碼矛盾。[usageService.ts#L25-L33](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/lib/ai/usageService.ts#L25-L33) [chat/route.ts#L145-L162](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/api/wardrobe/chat/route.ts#L145-L162)
- `WebChatView` 顯示的「AI 正在查詢即時資訊」是固定 loading 文案，即使模型解析出的 `context_query` 為 null；作品集 prototype 不應複製這個會誤導使用者的狀態。[WebChatView.tsx#L44-L99](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/%28app%29/wardrobe/WebChatView.tsx#L44-L99)

## 試穿與點數

來源 Web 試穿的實際流程是：使用者先上傳本人照片，再從衣櫃選 `itemId` 或直接上傳服裝圖；API 先驗證人像與衣物屬於該使用者，將輸入正規化為 JPEG，再以 DB 原子函式扣 5 點，呼叫 Vertex AI `virtual-try-on-001`（`us-central1`），結果存 R2 並寫入 `tryon_results`。Vertex 失敗會呼叫 `grant_points` 退回 5 點；餘額不足回 HTTP 402。試穿結果歷史最多回傳最近 20 筆，使用者隱藏是 soft delete。[tryon route](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/api/wardrobe/tryon/route.ts#L10-L129) [ai-styling spec](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/openspec/specs/ai-styling/spec.md#L105-L169)

新用戶點數由 `/api/wardrobe/points` 的 `deduct_points(amount=0)` get-or-init 建立，規格與 route 均記為 20 點；按 5 點/次，理論上可開始 4 次。這是原產品的付費/成本機制，作品集 Demo 不應做登入、扣點、付款或真正 Vertex 生成；可在 Case Study 的商業章節標成「來源產品已設計的 C 端點數流程」。[points route](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/api/wardrobe/points/route.ts) [tryon UI](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/%28app%29/wardrobe/WebTryOnView.tsx#L54-L95) [tryon route#L73-L121](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/api/wardrobe/tryon/route.ts#L73-L121)

`WebTryOnView` 若 points API 成功，會先顯示扣點確認；若 points API 失敗，保留一條舊環境 fallback 直接呼叫試穿的分支。指定 commit 的系統定位已是純 Web，作品集不應把這條相容分支解釋成可免點數使用的正式商業規則。[WebTryOnView.tsx#L367-L433](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/%28app%29/wardrobe/WebTryOnView.tsx#L367-L433) [WebTryOnView.tsx#L552-L648](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/%28app%29/wardrobe/WebTryOnView.tsx#L552-L648)

## 指定程式檔掃描摘要

| 檔案 | 實際觀察 |
|---|---|
| [`page.tsx`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/%28app%29/wardrobe/page.tsx) | Supabase session 驗證、items fetch、URL/tab 狀態同步；桌面側欄與行動底部導覽；衣物、Planner、Explore、Wall、Try-on、Chat 六個 tab，含 loading/error。 |
| [`WebWardrobeView.tsx`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/%28app%29/wardrobe/WebWardrobeView.tsx) | category/season/occasion/color filter、note/brand search、newest/oldest sort、10 件一批 IntersectionObserver、圖片 skeleton/error fallback、空結果與清除篩選。 |
| [`WebUploadForm.tsx`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/%28app%29/wardrobe/WebUploadForm.tsx) | 單張 crop+metadata 與批次模式（最多 20 件）；分類 wizard、個別設定、各張狀態與錯誤；實際上傳成功後由 `useWebUploadFlow` fire-and-forget 呼叫 analyze。 |
| [`WebChatView.tsx`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/%28app%29/wardrobe/WebChatView.tsx) | 對話、loading phases、清空、排除單品重推薦、429 dialog；卡片只顯示 API 回傳候選，沒有前端推薦規則。 |
| [`chat/route.ts`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/api/wardrobe/chat/route.ts) | Grounding 觸發/容錯、HyDE、分品類 pgvector 檢索、縮圖多模態/文字 fallback、ID allowlist 與 reserve/finalize quota。 |
| [`itemTagger.ts`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/lib/ai/itemTagger.ts) | Gemini Vision 回傳衣物判斷、category、thickness、30–60 字 description；忽略圖片文字指令。 |
| [`embeddings.ts`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/lib/ai/embeddings.ts) | 實際 endpoint 是 `gemini-embedding-001`、768 維；檔案註解仍提到舊名 `text-embedding-004`。 |
| [`callAI.ts`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/lib/ai/callAI.ts) | Gemini/OpenAI provider switch；Gemini JSON mode；獨立 `callGeminiWithSearch` 使用 `google_search` tool。 |
| [`WebTryOnView.tsx`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/%28app%29/wardrobe/WebTryOnView.tsx) | 本人照管理、衣櫃/直接上傳服裝來源、5 點確認、結果與歷史下載/隱藏；人臉融合在瀏覽器端 best effort。 |
| [`tryon/route.ts`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/api/wardrobe/tryon/route.ts) | 人像/衣物前置驗證、14 MiB base64 guard、原子扣點、Vertex 呼叫、R2 儲存與失敗退款。 |
| [`WebPlannerView.tsx`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/%28app%29/wardrobe/WebPlannerView.tsx) | week/day/month 視圖、slot 對應衣物、天氣 strip、錯誤重試、朋友分享與建議 sheet；會清理找不到的幽靈 item。 |
| [`PersonalOutfitWall.tsx`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/%28app%29/wardrobe/PersonalOutfitWall.tsx) | Daily/Featured tab、日曆與上傳回呼、穿搭預覽多圖滑動、style journal、creator setup、分享；有 reduced-motion 分支。 |
| [`ExploreTab.tsx`](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/app/%28app%29/wardrobe/components/ExploreTab.tsx) | latest/popular、AbortController、sessionStorage 第一頁 cache、cursor load-more、樂觀 like rollback、share sheet；與規格列出的相對路徑不同。 |

## 明確衝突與採用原則

1. **Grounding 時序**：`git show` 顯示功能在 2026-06-07 commit 加入；競賽敘事應固定為 2026/05 展示基礎功能，6 月是後續迭代。
2. **AI chat quota**：`ai-styling/spec.md` 與 `usageService.ts` 是 5 次/日；`chat/route.ts` 429 文案/註解是 30 次。作品集應寫「來源規格/實際 quota 設計為 5 次/日」，並可在來源註記保留此程式碼文案不一致。
3. **上傳 quota**：PRD v1 寫每日 10 件；`wardrobe/spec.md`、`authorize-upload/route.ts`、`items/batch/route.ts` 實作為每日 100 件。這不影響作品集 mock，但若提到原產品應標記「PRD 初版 10、指定 commit 實作 100，需產品確認」。
4. **Embedding 名稱**：`ai-styling/spec.md` 的關鍵檔案段落和 `ai-recommendation-flow.md` 有 `text-embedding-004`/`gemini-embedding-001` 的歷史名稱混用；指定 commit 的程式 endpoint 實際為 `gemini-embedding-001`、768 維，採程式碼為準。
5. **Storage 描述**：`system-overview/spec.md` 的技術棧/部分上傳說明仍寫 Supabase Storage，但指定 commit 的 upload/try-on 路徑與程式碼使用 Cloudflare R2。作品集只需說「原始產品使用受保護的 object storage」，若要精確描述指定 commit，採 R2。
6. **Explore 路徑**：規格要求掃描 `components/ExploreTab.tsx`，實際 commit 路徑包含 `app/(app)/wardrobe/components/`；已依實際檔案完成掃描。
7. **文件與程式的狀態差異**：AI analysis 的文件仍列 3 次/日，但 `items/[id]/analyze/route.ts` 中 quota reserve/finalize 已整段註解，並寫明暫時停用限制；不要在作品集宣稱上傳分析已受 3 次限制。

## PRD v1 非目標（應保留為來源脈絡）

2026-02-17 PRD v1 明列：不做穿搭推薦演算法、不做社交分享/公開衣櫃、不做忘記密碼流程。這正好支持 Case Study 的策略對比：「先驗證上傳、整理、查找與天氣，再擴張推薦與社交」。但這些是當時 PRD scope，後續指定 commit 已加入 AI chat、Planner、Explore、分享與試穿；頁面應把「PRD 規劃」「競賽展示」「6 月實作」分開，不把 PRD 非目標誤寫成整個 OOTT 永久不做。[PRD non-goals](https://github.com/wally0302/tshirt-web/blob/5b6d93f896cd866c327810a2de834915527dd895/docs/PRD-wardrobe-v1.md#L28-L43)

## 給作品集實作的直接建議

- Route A 應保留同一份 owned mock wardrobe，場景只改 deterministic rule、候選與理由；`換掉這件` 使用排除 ID，無候選時顯示明確失敗。
- Route B 應使用 2–3 件 `owned:false` 示範商品。只有拿到同一模特/同視角的合法 Before/After 才顯示比較；否則保留選擇工作流與「待補授權素材」狀態，不拼湊陌生照片。
- Case Study 可引用四種資料層：衣櫃（有什麼）、意圖/計畫（想做什麼）、搭配選擇（怎麼配）、真實打卡（最後穿什麼）。試穿不等於購買，加入計畫不等於實際穿著，註冊數不等於留存。
- Grounding 只能在 Case Study 以「指定 commit 後加入的真實能力」描述；Demo 以 `示範規則推薦；原始產品使用 Gemini + 向量檢索` 標記，避免即時搜尋、天氣數字與 AI 生成假象。
- 商業章節可提來源產品的 C 端點數機制與 B2B2C 構想，但沒有公開的單價、付款、品牌合作或成效證據；統一標成 `implemented design`、`shown in deck`、`planned` 或 `needs verification`。

## 來源檔清單

- `openspec/specs/system-overview/spec.md`
- `docs/PRD-wardrobe-v1.md`
- `openspec/specs/wardrobe/spec.md`
- `openspec/specs/ai-styling/spec.md`
- `openspec/specs/outfits/spec.md`
- `openspec/specs/explore/spec.md`
- `docs/ai-recommendation-flow.md`

稽核過程未把任何 API key、service-account 欄位值、使用者資料或私人內容寫入本文件。
