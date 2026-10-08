# Wally portfolio

中英雙語的個人作品集，使用 Next.js 靜態輸出。網站以產品案例、互動示意與成長故事，讓訪客快速理解 Wally 的產品判斷方式。

## 開發指令

```bash
npm install       # 安裝依賴
npm run dev       # 啟動 Next.js 開發環境
npm run build     # 建立靜態網站到 out/
node scripts/preview.mjs # 使用 Node 內建伺服器預覽 out/
npm test          # 執行 Vitest
npm run typecheck # 執行 TypeScript 型別檢查
```

`out/` 是 `next.config.ts` 設定的靜態輸出目錄。完成 `npm run build` 後，以不需額外依賴的 Node 預覽器啟動本地預覽：

```bash
node scripts/preview.mjs
# 預設 http://127.0.0.1:3000，可用 PORT=4173 node scripts/preview.mjs 覆蓋連接埠
```

這個預覽器只用於本地查看靜態輸出，不是網站後端，也不負責部署。

## 內容與網址

- 中英文路由為 `/zh/`、`/en/`，作品頁為 `/{locale}/projects/{slug}/`。
- 主要文案與作品內容在 [`src/data/content.ts`](src/data/content.ts)。
- Email、LinkedIn 與履歷連結在 [`src/data/contact.ts`](src/data/contact.ts)；公開上線前請補齊履歷，目前履歷欄位仍待補。
- 正式 canonical、sitemap 與分享網址需要設定 `NEXT_PUBLIC_SITE_URL`；在 Vercel 建置時也可使用 `VERCEL_PROJECT_PRODUCTION_URL` 作為正式網址來源。正式網址未設定前請視為本地預覽。

## 字體授權

字體由 `@fontsource-variable/host-grotesk` 與 `@fontsource-variable/noto-sans-tc` 提供。套件內的 OFL 授權已保留於 [`public/licenses`](public/licenses)：`host-grotesk-OFL.txt` 與 `noto-sans-tc-OFL.txt`。正式發佈前仍請核對授權與 NOTICE 文件，確認部署符合各字體授權條款。
# IntroduceWally
