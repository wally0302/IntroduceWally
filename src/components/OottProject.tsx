import Link from "next/link";
import type { Locale, Project } from "@/lib/types";
import {
  OOTT_COMMIT,
  OOTT_REPO,
  decisionRows,
  oottCopy,
  oottEvidence,
  oottSource,
} from "@/data/oott";
import { siteCopy } from "@/data/content";
import { Navigation } from "./Navigation";
import { Footer, Contact } from "./Footer";
import { Arrow } from "./Arrow";
import { OottDemo } from "./OottDemo";
import { OottNav } from "./OottNav";
import "./oott.css";

function Framework({ index, locale }: { index: number; locale: Locale }) {
  const zh = locale === "zh";
  if (index === 0)
    return (
      <div className="oott-jobs">
        {(zh
          ? [
              [
                "01 / BEFORE GOING OUT",
                "搭配焦慮",
                "用已有衣物，完成符合今天情境的搭配。",
                "選情境 → 比較與替換",
                "觀察：能否選定一套？花多久？",
              ],
              [
                "02 / BEFORE BUYING",
                "想像與實穿落差",
                "購買前，理解一件衣服穿起來可能是什麼樣子。",
                "選單品 → 檢視視覺預覽",
                "觀察：猶豫有沒有減少？",
              ],
            ]
          : [
              [
                "01 / BEFORE GOING OUT",
                "Outfit uncertainty",
                "Combine owned clothes into an outfit for today’s context.",
                "Choose context → compare and replace",
                "Observe: a decision reached? Time required?",
              ],
              [
                "02 / BEFORE BUYING",
                "The imagination gap",
                "Understand what a garment might look like before buying.",
                "Choose a garment → inspect a preview",
                "Observe: has hesitation decreased?",
              ],
            ]
        ).map((row) => (
          <article key={row[0]}>
            <span className="micro">{row[0]}</span>
            <h3>{row[1]}</h3>
            <p>{row[2]}</p>
            <div>{row[3]}</div>
            <small>{row[4]}</small>
          </article>
        ))}
      </div>
    );
  if (index === 1)
    return (
      <div className="oott-tradeoff">
        <div>
          <span className="micro">
            {zh ? "選擇 / WARDROBE FIRST" : "CHOSEN / WARDROBE FIRST"}
          </span>
          <h3>
            {zh ? "先建立可靠的候選範圍" : "Establish an owned inventory"}
          </h3>
          <p>
            {zh
              ? "上傳 → 分類 → 找回 → 組合"
              : "Upload → classify → retrieve → combine"}
          </p>
          <small>
            {zh
              ? "獲得：可落地的推薦基礎。代價：建檔摩擦、價值延後出現。"
              : "Gain: actionable candidates. Cost: cataloging friction and delayed value."}
          </small>
        </div>
        <div>
          <span className="micro">
            {zh ? "暫緩 / CHAT FIRST" : "DEFERRED / CHAT FIRST"}
          </span>
          <h3>
            {zh ? "先提供通用穿搭建議" : "Start with generic inspiration"}
          </h3>
          <p>
            {zh
              ? "輸入需求 → 立即獲得建議"
              : "Describe a need → get an immediate answer"}
          </p>
          <small>
            {zh
              ? "獲得：更快開始。代價：推薦未必是自己有的衣服。"
              : "Gain: faster onboarding. Cost: suggestions may require clothes you do not own."}
          </small>
        </div>
      </div>
    );
  if (index === 2)
    return (
      <div className="oott-decisions">
        {decisionRows.map((row, i) => {
          const r = row[locale];
          return (
            <details key={r[0]} open={i === 0}>
              <summary>
                <span className="micro">0{i + 1}</span>
                <strong>{r[0]}</strong>
                <span className="oott-decision-job">{r[1]}</span>
                <span aria-hidden="true">＋</span>
              </summary>
              <div className="oott-decision-body">
                <dl>
                  {[
                    zh ? "選擇" : "Decision",
                    zh ? "使用者預期價值" : "Expected user value",
                    zh ? "產品潛在價值" : "Potential product value",
                  ].map((label, j) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{r[j + 2]}</dd>
                    </div>
                  ))}
                </dl>
                <p>
                  <strong>
                    {zh ? "代價與驗證 / " : "Trade-off & measurement / "}
                  </strong>
                  {r[5]}
                </p>
              </div>
            </details>
          );
        })}
      </div>
    );
  if (index === 3)
    return (
      <div className="oott-data-map">
        {(zh
          ? [
              [
                "真實衣櫃",
                "有什麼",
                "品類、顏色、現有單品",
                "用途：限制候選",
                "前提：建檔完整且標籤可信",
              ],
              [
                "未來意圖",
                "準備做什麼",
                "使用者主動輸入的情境與計畫",
                "用途：連結當下需求",
                "前提：計畫可能改變",
              ],
              [
                "穿搭實踐",
                "如何搭配",
                "選擇、排除與調整",
                "用途：理解選擇偏好",
                "前提：選擇不一定被採用",
              ],
              [
                "真實穿搭",
                "最後穿了什麼",
                "使用者主動記錄的穿著",
                "用途：驗證實際採用",
                "前提：自願記錄有樣本偏差",
              ],
            ]
          : [
              [
                "Owned inventory",
                "What I have",
                "Categories, colors, existing items",
                "Use: bound the candidates",
                "Condition: accurate and complete tags",
              ],
              [
                "Future intent",
                "What I plan to do",
                "Voluntarily entered context and plans",
                "Use: connect to current needs",
                "Condition: plans may change",
              ],
              [
                "Outfit choices",
                "How I combine",
                "Selections, exclusions and revisions",
                "Use: understand preferences",
                "Condition: selection is not adoption",
              ],
              [
                "Actual wear",
                "What I finally wore",
                "Voluntary outfit logs",
                "Use: verify adoption",
                "Condition: reporting has selection bias",
              ],
            ]
        ).map((row, i) => (
          <article key={row[0]}>
            <span className="oott-data-number">0{i + 1}</span>
            <div>
              <h3>
                {row[0]} <small>{row[1]}</small>
              </h3>
              <p>{row[2]}</p>
              <span>{row[3]}</span>
              <small>{row[4]}</small>
            </div>
          </article>
        ))}
        <p className="oott-equation">
          {zh
            ? "試穿 ≠ 購買　／　計畫 ≠ 穿著　／　註冊 ≠ 留存"
            : "Try-on ≠ purchase / planned ≠ worn / registered ≠ retained"}
        </p>
      </div>
    );
  if (index === 4)
    return (
      <>
        <div className="oott-timeline">
          {(zh
            ? [
                [
                  "2026 / 02",
                  "PRD · 規劃",
                  "上傳、分類、搜尋、天氣；先驗證啟用與衣物管理，推薦與公開社群列為首版非目標。",
                ],
                [
                  "2026 / 05",
                  "NTUE · 競賽展示",
                  "衣櫃、穿搭計畫、虛擬試穿、個人專區；簡報列 53 位 Web 註冊用戶，需後台核對。",
                ],
                [
                  "2026 / 06 / 07",
                  "COMMIT · 後續實作",
                  "Google Search Grounding 加入情境推薦。這是競賽之後的迭代，不回填為 5 月成果。",
                ],
              ]
            : [
                [
                  "2026 / 02",
                  "PRD · Planned",
                  "Upload, classify, search and weather. Activation and inventory first; recommendations and public social features excluded.",
                ],
                [
                  "2026 / 05",
                  "NTUE · Demonstrated",
                  "Wardrobe, plans, try-on and a personal area. The deck lists 53 registered web users, pending backend verification.",
                ],
                [
                  "2026 / 06 / 07",
                  "COMMIT · Implemented later",
                  "Google Search Grounding added to contextual recommendations. This is post-competition iteration, not a May result.",
                ],
              ]
          ).map((row) => (
            <article key={row[0]}>
              <span className="micro">{row[0]}</span>
              <h3>{row[1]}</h3>
              <p>{row[2]}</p>
            </article>
          ))}
        </div>
        <div className="oott-note">
          <strong>
            {zh
              ? "外部情境 vs. 成本與可靠性"
              : "External context vs. cost and reliability"}
          </strong>
          <p>
            {zh
              ? "推薦的主體仍是衣櫃。程式只在意圖解析提供有效情境查詢時啟動 Grounding，並與向量化並行；查詢失敗回傳空情境，仍繼續衣櫃推薦。這降低等待與外部依賴，但額外 API 成本仍存在，尚無成本效益數據。"
              : "The wardrobe remains the foundation. The code searches only when intent parsing supplies a valid context query, in parallel with embedding. Search errors return null context while wardrobe recommendations continue. Extra API cost remains, without cost-effectiveness evidence."}
          </p>
        </div>
      </>
    );
  if (index === 5)
    return (
      <div className="oott-business">
        <article>
          <span className="micro">NOW / CAPABILITY</span>
          <h3>{zh ? "C 端能力" : "Consumer capabilities"}</h3>
          <p>
            {zh
              ? "衣櫃 · 搭配 · 試穿 · 點數流程"
              : "Wardrobe · outfits · try-on · credit flow"}
          </p>
          <small>
            {zh
              ? "能力存在；付費與留存未驗證。"
              : "Capabilities exist; payment and retention remain unvalidated."}
          </small>
        </article>
        <div className="oott-business-gate">
          {zh
            ? "需先驗證：重複價值 + 授權 + 付費意願"
            : "Required: repeat value + consent + willingness to pay"}
          <span>↓</span>
        </div>
        <article>
          <span className="micro">POTENTIAL NEXT / HYPOTHESIS</span>
          <h3>
            {zh ? "商家 × 創作者 × 模特兒" : "Merchants × creators × models"}
          </h3>
          <p>
            {zh
              ? "平台費、導購分潤、授權與媒合抽成"
              : "Platform fees, referrals, licensing and matchmaking fees"}
          </p>
          <small>
            {zh
              ? "均為商業構想；預估營收與 EBIT 不是實際營運數據。永續與捐贈也屬未來構想。"
              : "All are proposals. Forecast revenue and EBIT are not actual results. Sustainability and donations are future ideas too."}
          </small>
        </article>
      </div>
    );
  if (index === 6)
    return (
      <>
        <div className="oott-evidence-board">
          {(zh
            ? [
                [
                  "已完成／已知",
                  "產品與程式",
                  "競賽功能展示、指定 Commit 的 AI 情境整合。",
                  "53 位 Web 註冊用戶",
                  "2026/05 當時簡報數字；尚需後台核對。",
                ],
                [
                  "計畫指標",
                  "原 PRD 的目標",
                  "24 小時內上傳一件、搜尋篩選使用、衣物累積、D7 留存、上傳失敗率。",
                  "目標 ≠ 達成",
                  "不把目標百分比當成成效。",
                ],
                [
                  "待驗證",
                  "真實價值",
                  "建檔流失、推薦採用與決策時間、試穿猶豫、計畫回訪、商家付費意願。",
                  "成效數值未公開驗證",
                  "購買轉換、退貨改善與收入皆無實證可主張。",
                ],
              ]
            : [
                [
                  "Known / completed",
                  "Product and code",
                  "Competition feature demos and contextual AI implementation in the pinned commit.",
                  "53 registered web users",
                  "May 2026 deck figure; backend verification required.",
                ],
                [
                  "Planned measures",
                  "PRD targets",
                  "An item uploaded within 24 hours, search/filter use, item count, D7 retention and upload failure rate.",
                  "Target ≠ result",
                  "Target percentages are not achieved outcomes.",
                ],
                [
                  "Unvalidated",
                  "Real value",
                  "Cataloging drop-off, adoption, decision time, hesitation, planner returns and merchant willingness to pay.",
                  "No verifiable outcome values",
                  "No substantiated conversion, return-rate or revenue improvements.",
                ],
              ]
          ).map((row) => (
            <article key={row[0]}>
              <span className="micro">{row[0]}</span>
              <h3>{row[1]}</h3>
              <p>{row[2]}</p>
              <strong>{row[3]}</strong>
              <small>{row[4]}</small>
            </article>
          ))}
        </div>
      </>
    );
  return (
    <div className="oott-experiments">
      {(zh
        ? [
            [
              "先讓價值出現",
              "先試三件示範衣物，再邀請建檔。",
              "量：開始體驗 → 第一件上傳 → 多件完成。比較直接建檔流程。",
            ],
            [
              "分開點擊與採用",
              "把推薦接到計畫與自願穿著記錄。",
              "量：採用搭配 → 加入計畫 → 主動記錄；同時觀察實際決策時間。",
            ],
            [
              "把信任當成前提",
              "將影像與資料用途說清楚，允許撤回。",
              "檢查：使用者能否理解資料用途，以及找到刪除／撤回入口。",
            ],
          ]
        : [
            [
              "Show value sooner",
              "Try three sample items, then invite cataloging.",
              "Measure: start → first upload → several items. Compare with direct cataloging.",
            ],
            [
              "Separate clicks from adoption",
              "Connect recommendations to plans and voluntary wear logs.",
              "Measure: adopt → schedule → record; also observe real decision time.",
            ],
            [
              "Treat trust as a prerequisite",
              "Explain image and data uses and allow withdrawal.",
              "Check: can users understand data uses and find deletion or withdrawal?",
            ],
          ]
      ).map((row, i) => (
        <article key={row[0]}>
          <span className="micro">
            EXPERIMENT 0{i + 1} / {zh ? "提案，未執行" : "PROPOSED, NOT RUN"}
          </span>
          <h3>{row[0]}</h3>
          <p>{row[1]}</p>
          <small>{row[2]}</small>
        </article>
      ))}
    </div>
  );
}

export function OottProject({
  locale,
  next,
}: {
  locale: Locale;
  next: Project;
}) {
  const zh = locale === "zh";
  const p = oottCopy[locale];
  return (
    <div id="top" className={`site case-page oott-page locale-${locale}`}>
      <Navigation locale={locale} copy={siteCopy[locale].nav} />
      <main id="main">
        <header className="oott-hero page-width">
          <Link className="text-link case-back" href={`/${locale}/#oott`}>
            <Arrow direction="left" />
            {siteCopy[locale].caseStudy.back}
          </Link>
          <div className="section-label micro">
            <span>OOTT / OUTFIT OF THE TREND</span>
            <span>07 — PRODUCT CASE STUDY</span>
          </div>
          <div className="oott-hero-grid">
            <h1>{p.question}</h1>
            <div>
              <p>{p.summary}</p>
              <div className="oott-hero-actions">
                <a className="oott-primary" href="#interactive-demo">
                  {zh ? "直接體驗產品 ↓" : "Try the product ↓"}
                </a>
                <a className="text-link" href="#oott-problem">
                  {zh ? "看我的產品判斷 ↓" : "Explore the decisions ↓"}
                </a>
              </div>
            </div>
          </div>
          <div className="oott-meta">
            <span>{p.role}</span>
            <span>{p.status}</span>
            <span>
              {zh ? "0→1 產品｜作品集示範" : "0→1 product｜Portfolio demo"}
            </span>
            <a
              href={`${OOTT_REPO}/tree/${OOTT_COMMIT}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub · {zh ? "指定 Commit" : "Pinned commit"} ↗
            </a>
          </div>
        </header>
        <div className="page-width">
          <OottDemo locale={locale} />
        </div>
        <div className="oott-reading-intro page-width">
          <span className="micro">FROM EXPERIENCE TO PRODUCT JUDGMENT</span>
          <p>
            {zh
              ? "體驗只需要一分鐘。\n為什麼這樣做，值得多問幾個問題。"
              : "A minute to experience it.\nA closer look at the decisions behind it."}
          </p>
          <span>↓</span>
        </div>
        <div className="case-body page-width">
          <OottNav sections={p.sections} locale={locale} />
          <div className="case-sections">
            {p.sections.map((section, i) => (
              <section
                className="story-section"
                id={section.id}
                key={section.id}
              >
                <div className="oott-section-label">
                  <span className="micro">
                    0{i + 1} / {section.eyebrow}
                  </span>
                  <span
                    className={`oott-evidence-tag status-${oottEvidence[i].status}`}
                  >
                    {oottEvidence[i][locale]}
                  </span>
                </div>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <Framework index={i} locale={locale} />
                <div className="oott-source">
                  {i === 4 && (
                    <>
                      <a
                        href={oottSource("docs/PRD-wardrobe-v1.md")}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        2026/02 PRD ↗
                      </a>
                      <br />
                      {zh
                        ? "2026/05 NTUE 競賽簡報 P6–P9、P13（使用者規格整理）"
                        : "May NTUE slides 6–9, 13 (user-provided specification)"}
                      <br />
                    </>
                  )}
                  {i === 6 && (
                    <>
                      {zh
                        ? "2026/05 NTUE 競賽簡報 P13（使用者規格整理）"
                        : "May NTUE slide 13 (user-provided specification)"}
                      <br />
                    </>
                  )}
                  {zh ? "來源：" : "Source: "}
                  {oottEvidence[i].path ? (
                    <a
                      href={oottSource(oottEvidence[i].path!)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {oottEvidence[i].source} ↗
                    </a>
                  ) : (
                    oottEvidence[i].source
                  )}
                </div>
              </section>
            ))}
            <section className="takeaway">
              <span className="micro">
                {zh ? "專案回顧／反思" : "RETROSPECTIVE"}
              </span>
              <p>{p.takeaway}</p>
            </section>
            <section className="oott-sources" id="oott-sources">
              <span className="micro">SOURCES & BOUNDARIES</span>
              <h2>
                {zh
                  ? "讓來源與限制一起被看見。"
                  : "Keep sources and limits visible."}
              </h2>
              <p>
                {zh
                  ? "競賽內容依使用者提供的規格書整理，包含簡報頁碼；本次未直接取得原始 30 頁 PDF 或講稿。註冊數與分工仍以原始簡報及後台核對為準。0→1 指早期產品建立，不代表已驗證 PMF。"
                  : "Competition facts follow the user-provided specification and its slide references. The original 30-page PDF and script were not directly available. Registration and role claims require source/backend confirmation. 0→1 describes an early build, not validated PMF."}
              </p>
              <p>
                {zh
                  ? "Demo 使用本地虛構衣物、原創 SVG 插畫與固定推薦規則；重新整理即恢復初始狀態。未連接 AI、天氣、帳號、付款或私人資料。缺少合法同模特 Before/After，試穿視覺效果尚未達完整示範驗收。"
                  : "The demo uses fictional local clothes, original SVG illustrations and deterministic rules. Refresh resets it. No AI, weather, accounts, payments or private data are connected. Licensed same-model before/after pairs are missing; try-on visual acceptance remains incomplete."}
              </p>
              <div className="oott-note">
                <strong>{zh ? "試穿素材缺口" : "Try-on media required"}</strong>
                <p>
                  {zh
                    ? "1 張授權模特兒正面全身 Before；森林綠機能外套、淺藍寬版襯衫、酒紅針織上衣各 1 張同模特兒、同視角 After。每一對都需附來源與使用權證明；先取得一組即可開放該商品預覽，其餘保留素材缺失狀態。"
                    : "One licensed full-body before image; a paired after image for each of the Forest Green Parka, Relaxed Blue Shirt and Burgundy Knit Top. Each pair needs provenance and usage permission. One complete pair can enable that product while others remain unavailable."}
                </p>
              </div>
              <div className="oott-source-links">
                {[
                  [
                    "產品範疇 / Scope",
                    "openspec/specs/system-overview/spec.md",
                  ],
                  ["初期 PRD", "docs/PRD-wardrobe-v1.md"],
                  [
                    "推薦流程 / Recommendation",
                    "docs/ai-recommendation-flow.md",
                  ],
                  ["試穿實作 / Try-on", "app/api/wardrobe/tryon/route.ts"],
                ].map(([label, path]) => (
                  <a
                    className="text-link"
                    key={path}
                    href={oottSource(path)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label} ↗
                  </a>
                ))}
              </div>
              <code>{OOTT_COMMIT}</code>
            </section>
          </div>
        </div>
        <div className="next-case page-width">
          <span className="micro">{siteCopy[locale].caseStudy.next}</span>
          <Link href={`/${locale}/projects/${next.slug}/`}>
            <span>{next.copy[locale].title}</span>
            <Arrow />
          </Link>
        </div>
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
