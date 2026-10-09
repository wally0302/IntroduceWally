import type { Locale } from '@/lib/types';
import {
  gatherBeforeFlow,
  gatherBring,
  gatherChapters,
  gatherDataRows,
  gatherDataStages,
  gatherDecisions,
  gatherFlow,
  gatherLessons,
  gatherMetrics,
  gatherPrivacyRows,
  gatherRoadmap,
  gatherText,
  gatherTimeline,
  gatherUsers,
  type GatherChapter,
} from '@/data/gathertime';
import './gather-case-study.css';

function SourceLinks({ chapter, locale }: { chapter: GatherChapter; locale: Locale }) {
  if (!chapter.sources?.length) return null;
  return <div className="gather-sources">
    <span className="gather-source-label">{locale === 'zh' ? '參考來源' : 'Sources'}</span>
    {chapter.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{gatherText(source.label, locale)} ↗</a>)}
  </div>;
}

function EvidenceLabel({ chapter, locale }: { chapter: GatherChapter; locale: Locale }) {
  return <span className={`gather-evidence gather-evidence-${chapter.status}`}>
    <span aria-hidden="true" className="gather-evidence-dot" />{gatherText(chapter.statusLabel, locale)}
  </span>;
}

function Flow({ steps, locale, className = '' }: { steps: typeof gatherFlow; locale: Locale; className?: string }) {
  return <ol className={`gather-flow ${className}`}>
    {steps.map((step, index) => <li key={gatherText(step.label, locale)}>
      <span className="gather-flow-index">0{index + 1}</span>
      <strong>{gatherText(step.label, locale)}</strong>
      <span>{gatherText(step.detail, locale)}</span>
      {index < steps.length - 1 && <i aria-hidden="true">→</i>}
    </li>)}
  </ol>;
}

function ProblemVisual({ locale }: { locale: Locale }) {
  const zh = locale === 'zh';
  return <div className="gather-problem-visual" aria-label={zh ? '聚會流程轉換比較' : 'Meeting workflow comparison'}>
    <div className="gather-visual-heading"><span className="micro">BEFORE / AFTER</span><span>{zh ? '轉換成本在哪裡？' : 'Where does the handoff cost sit?'}</span></div>
    <blockquote className="gather-jtbd">{zh ? '「當我想約朋友聚餐，我希望快速收齊可行時間並敲定安排，讓我不用反覆傳訊息、人工統計，再重新討論去哪裡。」' : '“When I invite friends to dinner, I want to collect availability and confirm a plan without repeated messages, manual counts and a fresh debate about where to go.”'}</blockquote><div className="gather-before-after">
      <div className="gather-flow-side gather-flow-before"><span className="gather-visual-label">{zh ? '原本分散' : 'SCATTERED'}</span><Flow steps={gatherBeforeFlow} locale={locale} className="is-compact" /><p>{zh ? '每個斷點都把確認工作交回主揪。' : 'Every break sends the confirmation work back to the host.'}</p></div>
      <div className="gather-flow-arrow" aria-hidden="true">↘</div>
      <div className="gather-flow-side gather-flow-after"><span className="gather-visual-label">{zh ? '整合後的主線' : 'CONNECTED LOOP'}</span><Flow steps={gatherFlow} locale={locale} className="is-compact" /><p>{zh ? '一條從建立到完成的連續流程。' : 'One traceable path from create to final.'}</p></div>
    </div>
  </div>;
}

function UsersVisual({ locale }: { locale: Locale }) {
  const zh = locale === 'zh';
  return <div className="gather-users-visual" role="table" aria-label={zh ? '主揪與參與者的任務差異' : 'Host and guest role differences'}>
    <div className="gather-role-head" role="row"><span role="columnheader">{zh ? '觀察面向' : 'DIMENSION'}</span><strong role="columnheader">{zh ? '主揪' : 'HOST'}</strong><strong role="columnheader">{zh ? '參與者' : 'GUEST'}</strong></div>
    {gatherUsers.map((row) => <div className="gather-role-row" role="row" key={gatherText(row.label, locale)}><span role="rowheader">{gatherText(row.label, locale)}</span><p role="cell" data-column-label={zh ? '主揪' : 'HOST'}>{gatherText(row.host, locale)}</p><p role="cell" data-column-label={zh ? '參與者' : 'GUEST'}>{gatherText(row.guest, locale)}</p></div>)}
    <div className="gather-role-foot"><span>{zh ? '觀察方式' : 'OBSERVE'}</span><p>{zh ? '把角色假設轉成漏斗：建立→分享→回覆→定案。' : 'Turn role assumptions into a funnel: create → share → respond → finalize.'}</p></div>
  </div>;
}

function DecisionsVisual({ locale }: { locale: Locale }) {
  const zh = locale === 'zh';
  const labels = zh ? ['WHY', 'USER VALUE', 'PRODUCT VALUE', 'TRADE-OFF', 'VALIDATION'] : ['WHY', 'USER VALUE', 'PRODUCT VALUE', 'TRADE-OFF', 'VALIDATION'];
  return <div className="gather-decisions-visual">{gatherDecisions.map((decision, index) => <details key={gatherText(decision.title, locale)} open={index === 0}><summary><span className="gather-decision-no">0{index + 1}</span><strong>{gatherText(decision.title, locale)}</strong><span className="gather-decision-short">{gatherText(decision.short, locale)}</span><span className="gather-details-icon" aria-hidden="true">＋</span></summary><div className="gather-decision-body"><dl>{[decision.why, decision.userValue, decision.productValue, decision.tradeoff, decision.validation].map((value, valueIndex) => <div key={labels[valueIndex]}><dt>{labels[valueIndex]}</dt><dd>{gatherText(value, locale)}</dd></div>)}</dl></div></details>)}</div>;
}

function DataVisual({ locale }: { locale: Locale }) {
  const zh = locale === 'zh';
  const columns = zh ? ['功能', '資料', '用途', '界線'] : ['Feature', 'Data', 'Value', 'Boundary'];
  return <div className="gather-data-visual"><div className="gather-data-stages" aria-label={zh ? '資料轉換流程' : 'Data transformation flow'}>{gatherDataStages.map((stage, index) => <div key={gatherText(stage.label, locale)}><span className="gather-data-stage-no">0{index + 1}</span><strong>{gatherText(stage.label, locale)}</strong><p>{gatherText(stage.detail, locale)}</p><small>{gatherText(stage.condition, locale)}</small>{index < gatherDataStages.length - 1 && <i aria-hidden="true">→</i>}</div>)}</div><div className="gather-data-table" role="table" aria-label={zh ? '功能資料價值邊界' : 'Feature data value boundary'}><div className="gather-data-row gather-data-head" role="row">{columns.map((column) => <span role="columnheader" key={column}>{column}</span>)}</div>{gatherDataRows.map((row) => <div className="gather-data-row" role="row" key={gatherText(row.feature, locale)}><strong role="rowheader" data-column-label={columns[0]}>{gatherText(row.feature, locale)}</strong><span role="cell" data-column-label={columns[1]}>{gatherText(row.data, locale)}</span><span role="cell" data-column-label={columns[2]}>{gatherText(row.value, locale)}</span><small role="cell" data-column-label={columns[3]}>{gatherText(row.boundary, locale)}</small></div>)}</div><div className="gather-privacy"><div><span className="micro">{zh ? '資料治理' : 'PRIVACY QUESTIONS'}</span><h3>{zh ? '資料要有目的，也要有退場。' : 'Data needs a purpose and an exit.'}</h3></div><div className="gather-privacy-rows">{gatherPrivacyRows.map((row) => <div key={gatherText(row.label, locale)}><strong>{gatherText(row.label, locale)}</strong><p>{gatherText(row.value, locale)}</p></div>)}</div></div><p className="gather-retention-note"><strong>{zh ? '目前原始碼行為：' : 'Current source behavior: '}</strong>{zh ? '已定案活動的最終日期過去超過 7 個曆日後，公開連結失效；「我揪的團」則在建立逾 7 天後隱藏項目。隱藏與失效都不代表資料已刪除，正式保存與清除政策仍待治理設計。本作品集不送出事件分析，也不保存參與者資料；若未來成為正式平台，才討論長期資料保存。' : 'A public link expires more than seven calendar days after a finalized meetup date has passed. Host history hides entries more than seven days after creation. Hiding or expiring does not mean data is deleted; production retention and cleanup need a governance decision. This portfolio sends no event analytics and stores no participant data; long-term retention belongs to a future production platform discussion.'}</p></div>;
}

function BusinessVisual({ locale }: { locale: Locale }) {
  const zh = locale === 'zh';
  const steps = zh ? ['主揪建立', '分享給朋友', '朋友參與投票', '部分朋友成為新主揪', '再次分享'] : ['Host creates', 'Shares with friends', 'Friends vote', 'Some friends become hosts', 'Share again'];
  return <div className="gather-business-visual"><div className="gather-roadmap">{gatherRoadmap.map((row, index) => <article key={gatherText(row.phase, locale)}><span className="micro">{gatherText(row.phase, locale)}</span><h3>{gatherText(row.gate, locale)}</h3><p>{gatherText(row.next, locale)}</p>{index < gatherRoadmap.length - 1 && <i aria-hidden="true">↓</i>}</article>)}</div><div className="gather-business-lower"><div className="gather-growth"><span className="micro">{zh ? '成長循環／待驗證' : 'GROWTH LOOP / TO TEST'}</span><div>{steps.map((step, index) => <span className="gather-growth-step" key={step}><b>{step}</b><i aria-hidden="true">{index === steps.length - 1 ? '↺' : '→'}</i></span>)}</div><small>{zh ? '衡量：連結帶來的新主揪數、參與者轉為主揪比例、重複建立率與各渠道有效參與數。' : 'Measure new hosts per link, guest-to-host conversion, repeat creation and valid participants by channel.'}</small></div><div className="gather-economics"><span className="micro">{zh ? '示意試算／非營收' : 'ILLUSTRATION / NOT REVENUE'}</span><strong>{zh ? '8 人 × 每人 NT$800 ＝ NT$6,400' : '8 people × NT$800 = NT$6,400'}</strong><p><b>5%</b> = NT$320　·　<b>10%</b> = NT$640</p><small>{zh ? '僅為 8 人、每人消費 800 元的情境試算；不是營收、合約或成交證據。' : 'A scenario for eight people spending NT$800 each; it is not revenue, a contract or deal evidence.'}</small></div></div><div className="gather-costs"><span>{zh ? '需扣除成本' : 'COSTS TO SUBTRACT'}</span>{(zh ? ['獲客', '介接', '客服', '商家維護', '優惠核銷'] : ['Acquisition', 'Integration', 'Support', 'Merchant maintenance', 'Redemption']).map((cost) => <b key={cost}>{cost}</b>)}</div><div className="gather-business-models"><article><h3>{zh ? 'A／曝光贊助' : 'A / Sponsored visibility'}</h3><p>{zh ? '以曝光版位或推薦露出收費；清楚標示贊助，且不得覆蓋地區、預算、飲食等條件。' : 'Charge for labeled visibility while preserving area, budget and dietary constraints.'}</p></article><article><h3>{zh ? 'B／成交合作' : 'B / Verified conversion'}</h3><p>{zh ? '以商家專屬連結、優惠碼或現場核銷追蹤成交；需有商家合作、歸因與退款規則，並驗證分潤或固定費能覆蓋成本。' : 'Track sales through merchant-specific links, codes or redemption, then validate attribution, refunds and contribution margin.'}</p></article></div></div>;
}

function ExecutionVisual({ locale }: { locale: Locale }) {
  return <div className="gather-execution-visual"><div className="gather-execution-line">{gatherTimeline.map((row, index) => <article key={gatherText(row.date, locale)}><span className="gather-execution-date">{gatherText(row.date, locale)}</span><div><h3>{gatherText(row.title, locale)}</h3><p>{gatherText(row.detail, locale)}</p></div>{index < gatherTimeline.length - 1 && <i aria-hidden="true">→</i>}</article>)}</div><div className="gather-boundary-box"><span className="micro">{locale === 'zh' ? '資料範圍' : 'EVIDENCE SCOPE'}</span><p>{locale === 'zh' ? '9 月 23 日與簡報內容依專案提供者轉述；簡報原檔未納入本次資料。此處對照目前程式可見流程，當時交付時程與個人分工仍待可公開紀錄。' : 'The September 23 account comes from the project provider; the original deck was unavailable. Repository evidence establishes the present demo scope, not historical delivery speed or usage outcomes.'}</p></div></div>;
}

function ValidationVisual({ locale }: { locale: Locale }) {
  const zh = locale === 'zh';
  const columns = zh ? ['假設', '問題與指標', '分母與觀察期間', '反證'] : ['Hypothesis', 'Question and metric', 'Denominator and window', 'Disconfirm'];
  return <div className="gather-validation-visual"><div className="gather-metric-table" role="table" aria-label={zh ? '驗證指標矩陣' : 'Validation metric matrix'}><div className="gather-metric-row gather-metric-head" role="row">{columns.map((column) => <span role="columnheader" key={column}>{column}</span>)}</div>{gatherMetrics.map((row) => <div className="gather-metric-row" role="row" key={gatherText(row.layer, locale)}><strong role="rowheader" data-column-label={columns[0]}>{gatherText(row.layer, locale)}</strong><div role="cell" data-column-label={columns[1]}><b>{gatherText(row.question, locale)}</b><p>{gatherText(row.metric, locale)}</p></div><p role="cell" data-column-label={columns[2]}>{gatherText(row.denominator, locale)}</p><small role="cell" data-column-label={columns[3]}>{gatherText(row.disconfirm, locale)}</small></div>)}</div><div className="gather-north-star"><span className="micro">{zh ? '北極星指標候選' : 'NORTH STAR CANDIDATE'}</span><strong>{zh ? '有效完成定案的聚會數量' : 'Number of valid finalized gatherings'}</strong><p>{zh ? '擬議口徑：至少 3 位不同參與者送出有效回覆，且主揪完成定案；仍待定義異常回覆排除方式，尚無實際驗證資料。' : 'Draft definition: at least three distinct participants submit valid replies and the host finalizes. Anomaly exclusions remain to be specified; no measured results yet.'}</p></div></div>;
}

function ReflectionVisual({ locale }: { locale: Locale }) {
  return <div className="gather-reflection-visual"><div className="gather-lessons">{gatherLessons.map((item, index) => <article key={gatherText(item.lesson, locale)}><span className="gather-lesson-number">0{index + 1}</span><div><h3>{gatherText(item.lesson, locale)}</h3><p>{gatherText(item.link, locale)}</p></div></article>)}</div><div className="gather-bring"><div className="gather-bring-head"><span className="micro">WHAT I BRING</span><p>{locale === 'zh' ? '把本案例中的判斷方法整理成可帶往下一個產品的工作方式。' : 'Carry the judgment into the next context as evidence of transferable practice.'}</p></div>{gatherBring.map((row) => <div className="gather-bring-row" key={gatherText(row.lesson, locale)}><strong>{gatherText(row.lesson, locale)}</strong><p>{gatherText(row.future, locale)}</p></div>)}</div></div>;
}

function ChapterVisual({ index, locale }: { index: number; locale: Locale }) {
  if (index === 0) return <ProblemVisual locale={locale} />;
  if (index === 1) return <UsersVisual locale={locale} />;
  if (index === 2) return <DecisionsVisual locale={locale} />;
  if (index === 3) return <DataVisual locale={locale} />;
  if (index === 4) return <BusinessVisual locale={locale} />;
  if (index === 5) return <ExecutionVisual locale={locale} />;
  if (index === 6) return <ValidationVisual locale={locale} />;
  return <ReflectionVisual locale={locale} />;
}

export function GatherCaseStudy({ locale }: { locale: Locale }) {
  const zh = locale === 'zh';
  return <section className={`gather-case-study locale-${locale}`} id="product-thinking" aria-labelledby="gather-case-title">
    <header className="gcs-intro page-width"><div className="gcs-intro-label"><span className="micro">GATHERTIME / PRODUCT THINKING</span><span className="micro">01—08 / PM CASE STUDY</span></div><div className="gcs-intro-content"><div><h2 id="gather-case-title">{zh ? '產品背後，八個需要回答的問題。' : 'Eight questions behind the product.'}</h2><p>{zh ? '沿著一場聚會的旅程，檢視使用者、資料、商業與交付取捨。' : 'Follow one gathering through its user, data, business and delivery decisions.'}</p></div><p className="gcs-intro-lead">{zh ? '每一章都說明判斷的理由、它對使用者的影響，以及目前能拿出什麼證據。尚未量到的結果，會明確標成待驗證。' : 'Each chapter explains the reasoning, its effect on users and the evidence currently available. Unmeasured outcomes remain labeled as hypotheses.'}</p></div><div className="gcs-evidence-legend" aria-label={zh ? '證據標示說明' : 'Evidence legend'}><span className="micro">{zh ? '證據標示' : 'EVIDENCE KEY'}</span><span><i className="gather-evidence-dot gather-dot-implemented" />{zh ? '已實作：原始碼可見' : 'Implemented: visible in source'}</span><span><i className="gather-evidence-dot gather-dot-demo" />{zh ? '展示稿：靜態或模擬流程' : 'Demo: static or mocked flow'}</span><span><i className="gather-evidence-dot gather-dot-proposed" />{zh ? '提案：尚待產品驗證' : 'Proposed: needs product validation'}</span><span><i className="gather-evidence-dot gather-dot-validated" />{zh ? '已驗證：需有結果與方法' : 'Validated: requires results and method'}</span></div></header>
    <div className="gather-reading-intro page-width"><span className="micro">FROM PRODUCT FLOW TO EVIDENCE</span><p>{zh ? '先走完一場聚會。\n再問每個決定值不值得。' : 'Let one gathering finish.\nThen ask what each decision proves.'}</p><span aria-hidden="true">↓</span></div>
    <div className="gather-case-body page-width"><aside className="gather-toc"><span className="micro">{zh ? '本頁八章' : 'EIGHT CHAPTERS'}</span><nav aria-label={zh ? '揪甘心 case study 章節' : 'GatherTime case study chapters'}>{gatherChapters.map((chapter) => <a key={chapter.id} href={`#${chapter.id}`}><span>{chapter.number}</span>{gatherText(chapter.eyebrow, locale).replace('THE ', '').replace('／問題', '').replace('／使用者', '').replace('／取捨', '').replace('／資料', '').replace('／商業', '').replace('／執行', '').replace('／驗證', '').replace('／反思', '')}</a>)}</nav><p className="gather-toc-note">{zh ? '功能讓人看見可能，證據決定下一步。' : 'Features show possibilities. Evidence informs the next step.'}</p></aside><div className="gather-sections">{gatherChapters.map((chapter, index) => <article className="gather-chapter" id={chapter.id} key={chapter.id}><div className="gather-chapter-heading"><div><span className="micro">{chapter.number} / {gatherText(chapter.eyebrow, locale)}</span><h2>{gatherText(chapter.title, locale)}</h2></div><EvidenceLabel chapter={chapter} locale={locale} /></div><p className="gather-chapter-claim">{gatherText(chapter.claim, locale)}</p>{gatherText(chapter.body, locale).map((paragraph) => <p className="gather-chapter-body" key={paragraph}>{paragraph}</p>)}<ChapterVisual index={index} locale={locale} /><SourceLinks chapter={chapter} locale={locale} /></article>)}<section className="gather-end-note"><span className="micro">CASE BOUNDARY / {zh ? '公開版本' : 'PUBLIC VERSION'}</span><p>{zh ? '下一步，是讓真實主揪帶著自己的朋友走完這條流程。先確認能否順利定案、是否願意再次使用，再探索推薦與商家合作。' : 'Next, let real hosts bring their own friends through the workflow. Establish whether they can finalize and want to return before expanding recommendations and merchant partnerships.'}</p></section></div></div>
  </section>;
}

export default GatherCaseStudy;
