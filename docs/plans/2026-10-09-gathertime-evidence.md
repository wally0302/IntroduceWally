# 揪甘心／GatherTime evidence matrix

日期：2026-10-09

本次核對範圍是目前作品集 repo、原始快照 `/tmp/that-is-so-sweet-research` 的 README、指定 PRD／Perplexity 文件、指定 mobile 元件與 lib，以及目前 repo 的相關作品集筆記。原始快照的 README 明確把產品定義為純靜態前端 Demo；因此下面把「原始碼存在」標為 `Implemented` 或 `Demo`，不把它推論成正式後端、真實 OAuth、真實 AI 串接或使用成效。沒有執行瀏覽器、API、訪談或成效實測；`Validated` 不代表已由本次研究驗證。

來源路徑中的行號均以本次快照的 `nl -ba` 讀值為準。`Public?` 指該證據是否位於本次允許的 repo／doc／public／原 repo 範圍內，不代表我已重新驗證外部發布狀態。

## Evidence Matrix

| Claim / finding | Source, precise file lines | Evidence type | Status | Public? / pending |
|---|---|---|---|---|
| 揪甘心的定位是免登入參與投票、熱點圖、LINE 分享、主揪拍板的聚會時間協調工具。 | 原始快照 `README.md:5-7,17-23` | README statement | Demo | Repo source: yes; production scope pending |
| 原專案是純靜態頁面 Demo，不是真實後端或第三方服務；Google OAuth 與 AI 服務可以是假畫面／mock。 | 原始快照 `README.md:9-15` | README boundary | Demo | Repo source: yes; no production backend evidence |
| 產品策略把範疇收斂到「成團後由主揪手動發起的 AI 選餐廳」；不介入前期投票。 | `docs/auth-&-AI-feature-2026-0901/登入權限與路由控制 & AI 聚餐選餐廳 產品修改規格書 (PRD).md:8-19` | PRD proposal | Proposed | Repo doc: yes; product decision execution only partly present |
| PRD 要求主揪入口使用 Google SSO，登入後首頁採「建立活動」＋「我揪的團」。 | 同上 `:23-56` | PRD proposal | Proposed | Repo doc: yes; actual OAuth pending |
| 實作的 Google 登入是固定 demo user 寫入 localStorage；沒有 OAuth redirect、ID token 或驗證。 | `src/lib/fakeAuth.ts:1-4,14-35`; `src/mobile/LoginScreen.tsx:27-38` | Source code + UI copy | Demo | Repo source: yes; real authentication pending |
| 無 `#event=` 時 mobile app 未登入顯示登入頁；有活動 hash 時直接顯示活動頁，參與者不必登入。 | `src/mobile/MobileApp.tsx:79-84,118-153`; `src/App.tsx:109-136` | Source code | Implemented | Repo source: yes; no runtime validation |
| 主揪身份由「已登入 user」＋本機保存的 host token 比對而來；登出會立即移除 host-only UI。 | `src/mobile/MobileApp.tsx:79-84`; `src/App.tsx:53-60`; `src/lib/api.ts:85-105` | Source code | Implemented | Repo source: yes; browser behavior pending |
| 建立、拍板、重新開放、取消、編輯等 store 操作會檢查 host token。 | `src/lib/localEventStore.ts:424-475,518-581`; 對應 app handlers `src/App.tsx:185-243` | Source code | Implemented | Repo source: yes; no backend security guarantee |
| 參與者投票 UI 支援有空／可能／不行；需暱稱與手機末三碼，Email 可空白；已有回覆可用暱稱＋末三碼更新。 | `src/mobile/VoteTab.tsx:36-38,91-166,225-241,428-495,687-730`; `src/lib/localEventStore.ts:350-421` | Source code | Implemented | Repo source: yes; no runtime validation |
| PRD 的參與者免登入與 Email 選填設計在投票頁有對應，但通知本身沒有真正 email 發送實作。 | PRD `:58-73,155-162`; vote UI `src/mobile/VoteTab.tsx:441-460`; local store `:400-408` | PRD vs source comparison | Demo | Repo docs/source: yes; delivery service pending |
| 建立流程要求活動名稱、截止時間、至少一個日期／時段；支援只選日期或日期＋時段，並把 date-only 轉為空時間 slot。 | `src/mobile/CreateWizard.tsx:33-47,98-112,148-166,244-285,288-452`; `src/lib/localEventStore.ts:302-347` | Source code | Implemented | Repo source: yes; no runtime validation |
| 投票分數是 `score = availableCount * 2 + ifNeededCount`；缺少回覆的 slot status 預設為 unavailable；`percentage` 只計確定有空比例。 | `src/lib/slots.ts:64-100` | Source code / exact algorithm | Implemented | Repo source: yes; no empirical validation |
| 熱點圖只取 `available + if_needed > 0` 的 slot，按上述 score 降冪排列，預設顯示前三名；bar 仍分別呈現三種狀態比例。 | `src/mobile/HeatmapTab.tsx:125-186,212-228,489-541` | Source code | Implemented | Repo source: yes; no tie-break rule beyond stable sort behavior documented |
| 主揪可在熱點圖選 slot、填備註並拍板；定案後停止新投票，仍可重新開放或取消。 | `src/mobile/HeatmapTab.tsx:621-745`; `src/lib/localEventStore.ts:424-475`; `src/mobile/FinalizedView.tsx:237-275` | Source code | Implemented | Repo source: yes; no runtime validation |
| 活動生命週期有 collecting、voting_closed、finalized_upcoming、finalized_ended、cancelled；分享文字也依狀態分支。 | `src/lib/eventStatus.ts:79-125`; `src/lib/shareText.ts:6-9,51-101` | Source code | Implemented | Repo source: yes; no runtime validation |
| PRD 明訂最多顯示五家、核心推薦 3–5 家，暫不做適合度百分比。 | PRD `:139-147` | PRD proposal | Proposed | Repo doc: yes; no live AI evidence |
| AI 偏好表單有地點、關係、預算、人數、飲食、情境與自由文字；人數可由已出席人數預填。 | `src/lib/aiRecommendDemo.ts:15-79`; `src/mobile/AIRecommend/PreferenceFormStep.tsx:27-132`; `src/mobile/AIRecommend/AIRecommendFlow.tsx:23-40` | Source code | Demo | Repo source: yes; geo-range taxonomy differs from PRD and live mapping pending |
| PRD 期待「重述需求」用來確認理解；目前程式把 `buildRestateSummary` 顯示在結果頁，沒有獨立的確認步驟。 | PRD `:141-143`; `src/lib/aiRecommendDemo.ts:82-100`; `src/mobile/AIRecommend/RecommendResultsStep.tsx:65-70`; flow `src/mobile/AIRecommend/AIRecommendFlow.tsx:11-12,162-188` | PRD vs source comparison | Demo | Repo docs/source: yes; separate confirmation UX pending |
| AI 候選是五筆手寫固定資料，`getCandidates` 只取前五筆；重新整理只是 shuffle，不是重新查詢。 | `src/lib/aiRecommendDemo.ts:1-13,136-235` | Source code comments/data | Demo | Repo source: yes; no live data |
| AI Demo 沒有 Google Places、Perplexity 或 LLM call；候選的 rating、price、address、distance、reason 都是手寫內容。 | `src/lib/aiRecommendDemo.ts:1-7,107-129,136-217` | Source code boundary | Demo | Repo source: yes; real API pending |
| 候選的 Maps URL 由前端把店名＋地址 URL encode 後自行組成；這與 Perplexity 計畫要求由 `citations`／`search_results` 帶回真實連結不一致。 | `src/lib/aiRecommendDemo.ts:107-112`; Perplexity plan `:33-48` | Source vs execution plan | Demo | Repo source/docs: yes; citation matching pending |
| Perplexity 路線提議 Agent API `Create Agent Response`、strict `json_schema`、先取得無 URL 的 restaurants，再以 citations 比對真實網址。 | `docs/auth-&-AI-feature-2026-0901/AI選餐廳_Perplexity串接執行計畫書.md:7-25,27-49,50-102` | Engineering plan | Proposed | Repo doc: yes; not implemented |
| Perplexity 計畫的三到五筆結果、null 缺值、營業狀態、容錯與至少五組 API 測試仍是後續工程步驟。 | 同上 `:104-156` | Engineering plan | Proposed | Repo doc: yes; no tests/results in this research |
| AI Flow 僅在已 finalized 的畫面上由 host UI 觸發；已選餐廳會對所有 viewer 顯示唯讀結果。 | `src/mobile/FinalizedView.tsx:29-36,110-173,278-285`; `src/mobile/EventScreen.tsx:104-116` | Source code | Demo | Repo source: yes; host flow pending runtime validation |
| Flow 選餐廳後，離開 flow 即持久化選擇；沒有另一個 confirm step。 | `src/mobile/AIRecommend/AIRecommendFlow.tsx:56-73`; `src/lib/localEventStore.ts:584-597` | Source code | Demo | Repo source: yes; persistence is local only |
| AI UI 是 host-only，但 `setAiSelectedRestaurant` store function 本身不檢查 host token；依賴 UI／上層流程門禁，不是資料層權限。 | `src/lib/localEventStore.ts:584-597`; `src/mobile/FinalizedView.tsx:110-117,162-171`; `src/App.tsx:255-263` | Source code security comparison | Implemented | Repo source: yes; backend authorization pending |
| 活動資料只存在當前 browser 的 localStorage，裝置／瀏覽器之間不同步，沒有後端資料庫。 | `src/lib/localEventStore.ts:1-6,69-99`; 原始快照 `README.md:9-15` | Source code + README boundary | Demo | Repo source: yes; production persistence pending |
| Host history 以建立時間超過七天的項目在讀取時隱藏；缺少 createdAt 的舊項目保留；清單最多保留 20 筆。 | `src/lib/eventStatus.ts:7-12`; `src/lib/api.ts:135-189` | Source code | Implemented | Repo source: yes; no runtime validation |
| PRD 的「我的聚會」過期隱藏基準是建立時間＋7 天；這一小段列表規則已對應，但 `getVisitedEvents` 是讀取時 filter，沒有從 localStorage 實體移除。 | PRD `:75-83`; `src/lib/api.ts:178-188` | PRD vs source comparison | Implemented | Repo docs/source: yes; permanent cleanup pending |
| 活動連結失效實作不是建立後七天，而是 finalized 且最終 slot 日期過去超過七個曆日；active、未 finalized 活動不會由 `isLinkExpired` 失效。 | `src/lib/eventStatus.ts:52-77`; `src/lib/localEventStore.ts:284-300,486-490`; seed example `:241-255` | Source code exact lifecycle | Implemented | Repo source: yes; differs from PRD global 7-day rule |
| 過期連結會在 `getEvent` 拋錯、留言也會拒絕；資料仍留在 `gathertime_events_db`，沒有 `deletedAt`、expired flag 或清運函式。 | `src/lib/localEventStore.ts:69-99,284-300,478-516` | Source code negative evidence | Demo | Repo source: yes; soft-delete/cleanup pending |
| PRD 建議 soft delete 以保留 roomId 佔用紀錄；原始快照沒有實作該欄位／狀態，也沒有硬刪除或封存流程。 | PRD `:89-97`; local store `:21-67,69-99,284-300` | PRD vs source comparison | Proposed | Repo docs/source: yes; soft-delete design pending |
| room ID 是 16 位隨機字串、host token 是 32 位隨機字串；create 會產生並保存 host token。 | `src/lib/localEventStore.ts:44-67,302-347`; `src/lib/api.ts:30-35,96-105` | Source code | Implemented | Repo source: yes; no security audit |
| cancelled 活動仍可留在 event store，Host Home 將真實主揪的 cancelled 活動濾掉；示範 cancelled 項目只在 demo 分頁顯示。 | `src/lib/localEventStore.ts:257-273`; `src/mobile/HostHome.tsx:23-38,92-115`; `src/components/HostDashboard.tsx:17-32,86-109` | Source code | Demo | Repo source: yes; policy is code comment, not product measurement |
| 使用者提供的 spec 另述「9/23 前端退出」與「優先保成團流程」；本次允許來源沒有相應的 21 頁簡報或可公開逐頁證據，因此只能標為使用者供述。 | 本次任務訊息（user-supplied statement）；目前 repo／原快照搜尋未找到對應 deck | User statement / negative search | Proposed | Public? no deck located; needs source artifact |
| 21 頁競賽簡報：在目前 repo、其 `doc`／`docs`／`public` 與原始快照 repo／docs／public 內未找到 `.ppt/.pptx/.pdf/.key/.pages` 或「21頁」揪甘心簡報；不可宣稱已親閱。 | 允許範圍檔案清單與文字搜尋結果；目前 repo 只找到 `docs/plans/2026-10-09-restaurant-demo-design.md:7-19` 對原 repo 的研究筆記 | Negative repository search | pending | No deck found; pending user/source artifact |
| 作品集目前 repo 是 Wally portfolio 靜態輸出專案，並非揪甘心原始 app；其餐廳頁的 plan 說明原始專案是 static demo、固定 fictional candidates、no Places/LLM。 | 目前 repo `README.md:1-16`; `docs/plans/2026-10-09-restaurant-demo-design.md:1-19` | Current repo context | Implemented | Repo source/doc: yes; adaptation must remain labelled |
| 沒有可在本次研究中主張的真實成效、使用者研究或 API 實測結果；Perplexity 文件的「已完成實測」只是文件內描述，未在本次重新執行。 | Perplexity plan `:133-150`; 本次研究限制 | Source boundary | pending | No independent validation; do not present as current experiment |

## 核對結論

- 投票排序的可重現規則只有 `available×2 + if_needed`；它不是 PRD 所說的 AI 餐廳「地點／預算／評價 100% 加權」模型。後者只在 PRD `:145-147` 被描述，原始 source 沒有對應實作。
- 角色流程的 Demo 表現大致符合「主揪登入、參與者免登入、成團後主揪才看 AI」的 UI 故事，但登入是 fake auth、本機 token 才是操作門檻，資料層與 AI 選擇保存沒有真正的後端授權。
- 過期規則必須拆成兩件事描述：host history 依建立時間七天隱藏；公開連結則只對 finalized meetup end 後超過七天失效。這不等同 PRD 所寫的所有活動自建立後七天失效。
- AI 餐廳部分可以稱為已完成的前端 Demo：偏好表單、結果卡、最多五家、選擇與通知文案都有；不能稱為 Perplexity／Google Places 串接、即時營業查核、真實 citations URL 或已驗證推薦品質。
- 21 頁競賽簡報與 9/23 的使用者供述目前沒有可引用的簡報檔；除非取得來源，不可把該供述改寫為「簡報顯示」或「已親閱簡報」。

