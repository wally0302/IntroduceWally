# Development notes

更新日期：2026-10-08（Asia/Taipei）

這份文件保存第一版完成後最重要的產品與開發決策，讓後續修改延續同一套判斷。

## 網站要完成的工作

網站的第一任務是讓海外招聘者在短時間內理解三件事：Wally 是 Product Manager、關注 Product × AI × 0→1，以及他如何思考產品取捨。首頁提供快速辨識；完整案例負責建立可信度。視覺吸睛必須服務這個理解順序。

## 已確立的設計語言

- 使用骨白、墨黑與鈷藍，以大字、留白、細線和局部網點形成編輯式質感。
- 不加入通用 SaaS 卡片、霓虹漸層、生成式人像或無意義的漂浮裝飾。
- 核心互動是「揭開產品，看見判斷」：封面先吸引注意，使用者可用滑鼠、觸控按鈕或鍵盤查看產品背後的三項思考。
- 動畫採少量、短時、可降級的方式。即使 JavaScript、指標跟隨或動畫失效，內容與案例連結仍必須完整可讀。
- 中文與英文共用結構與資料模型，但文案依語言調整節奏，不做逐字硬譯。

## 內容邊界

- `src/data/content.ts` 是網站文案的主要來源；`doc/PROFILE_DATA.md` 保存事實依據與尚缺資料。
- PitchCue 是 MVP／Demo；KeFu 已有第一位客戶、仍在探索；Voting System Revamp 是已完成但匿名的職場案例。後續不可擅自提高成熟度。
- 互動示範是預編寫情境，不是真實 AI 回覆、客戶對話或公司內部流程。
- 不加入無來源的成長數字、獎項、客戶名稱、商業成果或個人貢獻。
- Email 與 LinkedIn 已可公開。履歷、GitHub、獎項和更多作品素材必須在取得正確來源後才顯示。

## 架構與修改位置

- 網站使用 Next.js 靜態輸出；中文路由為 `/zh/`，英文為 `/en/`，案例為 `/{locale}/projects/{slug}/`。
- 文字與案例資料在 `src/data/content.ts`，聯絡資料在 `src/data/contact.ts`。
- 首頁組合在 `src/components/Home.tsx`；案例頁在 `src/app/(site)/[lang]/projects/[slug]/page.tsx`。
- 揭露互動在 `src/components/DecisionReveal.tsx`，案例內示範在 `src/components/CaseDemo.tsx`，滾動效果在 `src/components/Motion.tsx`。
- 全站視覺與 responsive 規則主要在 `src/app/globals.css`；案例示範的樣式在 `src/components/case-demo.css`。
- 正式部署時設定 `NEXT_PUBLIC_SITE_URL`，讓 canonical、sitemap、robots 與分享圖使用正式網域。

## 每次修改後的最低檢查

1. 執行 `npm run typecheck`、`npm test` 與 `npm run build`。
2. 檢查 `/zh/`、`/en/` 與六個案例路由。
3. 在桌面與至少 320px、390px 手機寬度確認沒有橫向溢出或文字裁切。
4. 用鍵盤操作手機選單、產品／判斷切換與三個案例示範。
5. 從案例頁切換語言，確認 slug 與目前的章節錨點保留。
6. 確認瀏覽器 console 沒有 error／warning，且 `prefers-reduced-motion` 下仍能閱讀全部內容。
7. 若改動聯絡資料、作品成熟度或成果敘述，回頭核對 `doc/PROFILE_DATA.md`，避免把概念寫成已發生事實。

## 下一步優先順序

1. 取得正式履歷檔案或公開網址，接上目前隱藏的履歷入口。
2. 決定正式網域與部署環境，設定 `NEXT_PUBLIC_SITE_URL` 後再公開。
3. 以真機完成中英文、鍵盤、200% 縮放與 reduced-motion 驗證。
4. 正式網域穩定後量測 Lighthouse 與 Core Web Vitals，再依實際瓶頸調整。
5. 未來加入真實產品截圖時，維持匿名與機密邊界，並讓圖片補充故事，而不是取代文字證據。

已完成的驗證紀錄見 `doc/IMPLEMENTATION_CHECK.md`；視覺決策與研究理由見 `doc/DESIGN_DIRECTION.md`。

## Awards gallery

首頁的 `Awards & Recognition` 位於 How I Work 之後、聯絡區之前，資料在 `src/data/awards.ts`。圖片目前集中使用 `public/awards/futuremode-sitcon-hackathon.jpeg` 作為暫用示意圖；替換正式素材時，更新對應 record 的 `image` 路徑，並將 `placeholder` 設為 `false`。FUTUREMODE X SITCON 已連接真實參賽證明，因此其 `placeholder` 為 `false`；其餘十筆維持 `true` 並在詳細資料中提示正式證書待補。不要為 OOTT 建立不存在的案例連結。


替換素材的範例：將新檔案放到 `public/awards/ntue-2026.jpg`，在該筆資料改成 `image: '/awards/ntue-2026.jpg', placeholder: false`。圖片框和彈窗使用 `object-fit: contain`，不需依直橫方向修改樣式。現有圖片為橫式；未提供的直式原始獎狀仍待日後素材到齊時實際檢查。

桌面動畫使用 requestAnimationFrame，以約 28px/s 移動，僅在桌面細指標、未啟用 reduced-motion、區塊可見且分頁可見時播放。使用者暫停、指標移入獎狀圖片（不含標題、文字與留白）、鍵盤焦點及彈窗開啟各自控制停止條件；手機僅手動滑動。循環副本從無障礙樹與 Tab 次序排除。

## AWS hackathon interactive case

新增作品 `aws-hackathon` 的來源為使用者提供的 https://github.com/wally0302/Aws_Hackathon 。作品集展示的是從原作抽出的互動導覽，以虛構案件和預編寫結果示範文件檢核、爭點比對、引用選擇與草稿編輯。不要把此版本描述成正在呼叫 Bedrock、檢索真實法規或提供法律判斷；不要補寫未確認的個人分工、競賽名次或使用成效。

保留 Next.js 靜態輸出、中英路由與原有獎項修改。原作環境另在暫存副本啟動供參考，不將原作 node_modules、環境變數或後端依賴加入作品集。新增案例後，最低路由檢查擴充為八個案例頁。


### 直式獎狀更新（2026-10-08）

南投縣 2023 山城數位黑客松競賽「銀獎」已換成使用者提供的正式 JPEG：`public/awards/nantou-digital-hackathon-2023-silver.jpeg`（906 × 1280），並移除該筆 placeholder 標記。現在有 2 筆正式圖片、9 筆暫代圖片；此更新取代前述素材待補數量與直式素材尚缺的描述。

圖片資料可加上 `imageSize: { width: 906, height: 1280 }`；沒有指定時使用既有橫式暫代圖的 1930 × 1364。桌面採同高、依比例調整寬度的直橫混排；手機卡片固定可閱讀的寬度，直式圖片按原比例增高。直式彈窗在桌面為圖片／文字雙欄，手機為上下堆疊與內部捲動，關閉按鈕固定在彈窗外框內。前後控制依實際卡片位置移動，支援不同寬度。

AWS demo 的主要畫面在 `src/components/AwsCaseDemo.tsx`；日期計算、引用過濾與 TXT 輸出在 `src/lib/appeal-demo.ts`，資料邊界測試在 `src/lib/appeal-demo.test.ts`。本頁的相似前例僅供比對，不允許當作引用依據。修改日期會重設後續步驟；修改引用會清除草稿；編輯草稿或備註會要求重新確認匯出。首頁及案例內容仍由 `src/data/content.ts` 管理。
