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


## Awards gallery — 2026-10-08

- 新增 11 筆雙語紀錄；3 筆競賽獲獎，其他參賽、結業與感謝狀分別標示。10 筆圖片暫代，FUTUREMODE 使用正式參賽證明。
- `npm run typecheck`、`npm test`（4 tests）、`npm run build` 通過；`git diff --check` 通過。
- 瀏覽器確認桌面圖片橫列、原始紀錄共 11 個鍵盤可操作按鈕。手機模式只保留一組紀錄；手動下一筆有效。
- 中文 390px 與英文 320px 頁面／彈窗未出現整頁橫向溢出；英文長活動名稱可換行。
- Native dialog 可由點擊／Enter 開啟，Tab 保持在彈窗內，Escape 與背景點擊可關閉；關閉後焦點回原卡片，body 捲動恢復。
- 主動暫停後移開滑鼠仍保持停止，恢復播放後位置會持續前進。
- 依使用者追加要求：只在獎狀圖片上 hover 暫停；標題、文字、留白不觸發 hover 暫停。瀏覽器觀察圖片 hover 期間 scrollLeft 維持 288.5，移開到標題後持續增加。
- 最後瀏覽器 error / warning 紀錄為空。桌面截圖：`artifacts/awards-desktop.jpg`。
- reduced-motion 與背景／離開視窗的停止條件已實作並檢查程式；本輪未實際切換作業系統 reduced-motion 偏好或完成真機測試。未收到直式正式獎狀，直式呈現目前以 contain 版型支援，待素材補齊再驗證。


## Portrait certificate — 2026-10-08

- 南投銀獎正式圖片（906 × 1280）已加入，該筆不再顯示暫代標記。
- `typecheck`、4 個既有 tests、production build 通過。
- 1440px 桌面：直、橫圖片高度均為 324.5px；寬度分別約 229.7px／460.8px，保留原圖、不裁切。
- 桌面彈窗完整顯示直式獎狀；Escape 正常關閉。
- 390px 手機彈窗圖片約 315 × 445px，保留 906:1280 比例；頁面無橫向溢出。
- 桌面截圖：`artifacts/awards-portrait-dialog.jpg`。此輪已使用正式直式素材驗證，取代前述尚待直式素材的狀態。
