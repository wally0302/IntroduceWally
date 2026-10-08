# Implementation check

更新日期：2026-10-08（Asia/Taipei）

這份紀錄只記載目前實際完成的檢查，不代表已部署或完成所有真機驗證。

## 已通過

- `npm run build`：production build 通過。
- `npm run typecheck`：TypeScript 型別檢查通過。
- `npm test`：4 tests passed。
- 320px 與 390px 手機尺寸：中文與英文頁面無橫向溢出。
- 導覽：可展開，按 Escape 可關閉。
- 「看判斷」：可展開揭露內容。
- PitchCue：按 Enter 可切換回答形式。
- KeFu：可切換至真人接手情境。
- Voting system：按 Enter 可操作至「操作手冊」。
- 案例中英切換：保留 `#direction` 錨點。
- 瀏覽器 console：error／warning 為空。

## 尚待量測或完成

- 正式部署尚未進行。
- 真機驗證尚未完成。
- Lighthouse、Core Web Vitals 尚未量測。
- 200% 縮放尚未完成實機驗證。
- `prefers-reduced-motion` 尚未完成實機驗證。

上述項目完成前，不將效能、無障礙或動態降級目標寫成已通過結果。

## 靜態輸出檢查

2026-10-08 最後建置後，以本地 HTTP 預覽器驗證根入口、雙語首頁與六個案例，共 9 個路徑均回應 HTTP 200；HTML 語言正確且各頁 ID 無重複。22 個頁面內引用路徑／資源，以及 OG 圖、icon、robots 與 sitemap 可取得；不存在的路徑回應 404。

畫面紀錄位於 `artifacts/home-desktop.jpg` 與 `artifacts/home-mobile.jpg`（本地檢查產物，未列入網站輸出）。
