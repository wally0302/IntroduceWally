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
