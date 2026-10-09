'use client';

import { useRef, useState } from 'react';
import type { Locale } from '@/lib/types';
import { elapsedDays, buildAppealDraft, exportAppealDraft } from '@/lib/appeal-demo';
import './case-demo.css';

type AwsStage = 1 | 2 | 3 | 4;
const awsCopy = {
  "zh": {
    "source1": "示意規範 · 第 12 條",
    "source1Text": "違規棄置之認定，應記載時間、地點與可辨識的現場資料。",
    "source2": "示意稽查紀錄 · 2026-09-18",
    "source2Text": "紀錄載有地點與照片編號，但未記載可辨識行為人。",
    "source3": "相似案件（比較資料）",
    "source3Text": "另一件虛構案件曾因缺少行為人連結而要求補充調查；此資料僅供比較。",
    "resetNotice": "已重設，請從文件檢查開始。",
    "downloadName": "appeal-review-fictional-draft.txt",
    "downloadDone": "已準備下載",
    "confirm": "確認並前往下一步",
    "label": "04 / 訴願案件助審系統 · AWS Hackathon",
    "intro": "離線互動示範：檢查訴願書、對照雙方主張、挑選資料，再生成可編輯草稿。",
    "reset": "重設示範",
    "status": "工作區狀態",
    "stages": [
      "文件檢查",
      "雙方主張",
      "選擇引用",
      "編輯草稿"
    ],
    "locked": "完成前一步確認後解鎖",
    "stageLabels": [
      "01 CHECK",
      "02 TRACE",
      "03 SELECT",
      "04 DRAFT"
    ],
    "confirmed": "已確認",
    "docTitle": "案件文件",
    "docVariant": "文件類型",
    "rule": "規則檢查",
    "ai": "AI 建議",
    "argument": "雙方主張",
    "support": "訴願人主張",
    "supportText": "未能證明棄置行為與本人有關。",
    "challenge": "機關答辯",
    "challengeText": "照片與稽查紀錄足以連結違規地點。",
    "issueText": "現場照片是否足以支持「可歸責於訴願人」的判斷？",
    "human": "人工確認",
    "sourceHint": "以下均為虛構示意；另有一筆相似案件可供比較，但不是法源。",
    "previewEmpty": "至少選取一筆資料後，這裡會顯示原文預覽。",
    "draftTitle": "可編輯草稿",
    "draftHint": "草稿只會使用你在上一步選取的資料；送出前仍需人工確認。",
    "generate": "產生預編寫草稿",
    "noteLabel": "人工備註（可選）",
    "notePlaceholder": "例如：確認日期與請求事項後再送出。",
    "download": "下載 TXT"
  },
  "en": {
    "source1": "Illustrative rule · Article 12",
    "source1Text": "A disposal finding should record time, place, and identifiable site material.",
    "source2": "Illustrative inspection record · 2026-09-18",
    "source2Text": "The record includes a location and photo number, but does not identify the actor.",
    "source3": "Comparable prior case",
    "source3Text": "Another fictional case required more investigation when the record lacked a link to the actor; this is context only.",
    "resetNotice": "Reset complete. Start with the document check.",
    "downloadName": "appeal-review-fictional-draft.txt",
    "downloadDone": "Download ready",
    "confirm": "Confirm and continue",
    "label": "04 / Appeal Review Assistant · AWS Hackathon",
    "intro": "An offline interactive study: check an appeal, compare both arguments, choose references, then edit a draft.",
    "reset": "Reset demo",
    "status": "Workspace status",
    "stages": [
      "Document check",
      "Both arguments",
      "Select references",
      "Edit draft"
    ],
    "locked": "Unlocks after the previous confirmation",
    "stageLabels": [
      "01 CHECK",
      "02 TRACE",
      "03 SELECT",
      "04 DRAFT"
    ],
    "confirmed": "Confirmed",
    "docTitle": "Case documents",
    "docVariant": "Document type",
    "rule": "RULE CHECK",
    "ai": "AI SUGGESTION",
    "argument": "Paired arguments",
    "support": "Appellant argument",
    "supportText": "The record does not connect the disposal act to the appellant.",
    "challenge": "Agency response",
    "challengeText": "Photos and the inspection record connect the violation to the site.",
    "issueText": "Do the site photos establish that the appellant is responsible for the disposal?",
    "human": "HUMAN CONFIRMATION",
    "sourceHint": "These are fictional illustrations. A comparable prior case is for context, not legal authority.",
    "previewEmpty": "Select at least one reference to preview its original text.",
    "draftTitle": "Editable draft",
    "draftHint": "The draft uses only the references selected above; a person must review it before export.",
    "generate": "Generate pre-written draft",
    "noteLabel": "Human note (optional)",
    "notePlaceholder": "For example: confirm dates and requested relief.",
    "download": "Download TXT"
  }
} as const;

export function AwsCaseDemo({ locale }: { locale: Locale }) {
  const t = awsCopy[locale];
  const zh = locale === 'zh';
  const [stage, setStage] = useState<AwsStage>(1);
  const [documentType, setDocumentType] = useState<'appeal' | 'response'>('appeal');
  const [filedDate, setFiledDate] = useState('2026-10-06');
  const [reviewed, setReviewed] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [draft, setDraft] = useState<string | null>(null);
  const [humanNote, setHumanNote] = useState('');
  const [confirmed, setConfirmed] = useState([false, false, false]);
  const [finalConfirmed, setFinalConfirmed] = useState(false);
  const [notice, setNotice] = useState('');
  const panel = useRef<HTMLDivElement>(null);
  const days = elapsedDays('2026-09-18', filedDate);
  const sources = [
    { id: 'rule', title: t.source1, text: t.source1Text },
    { id: 'record', title: t.source2, text: t.source2Text },
    { id: 'prior', title: t.source3, text: t.source3Text, comparison: true },
  ];
  const appealText = zh
    ? `本人不服城南區環境管理處之廢棄物棄置罰鍰，請求撤銷原處分。現場照片只呈現垃圾與地點，未見本人棄置之影像，無法據此認定本人為行為人。訴願日期：${filedDate || '未填寫'}。`
    : `I request annulment of the waste disposal fine issued by the South City Environmental Office. The photos show waste and the site, but do not show me disposing of it. They do not establish that I am the actor. Filed: ${filedDate || 'missing'}.`;
  const responseText = zh
    ? '本處依稽查紀錄及現場照片認定該地點有廢棄物棄置情形，原處分之時間、地點均有紀錄可稽。附件：稽查紀錄、現場照片二張。'
    : 'The inspection record and site photos establish waste disposal at this location. The time and place are documented. Attachments: inspection record and two site photographs.';
  const invalidate = (from: number) => {
    setConfirmed(current => current.map((value, index) => index < from && value));
    if (from < 2) setSelected([]);
    setDraft(null);
    setFinalConfirmed(false);
    setNotice(zh ? '資料已變更，請重新確認後續步驟。' : 'The inputs changed. Confirm the following steps again.');
  };
  const openStage = (next: AwsStage) => {
    setStage(next);
    requestAnimationFrame(() => {
      panel.current?.focus({ preventScroll: true });
      panel.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
  };
  const confirmStage = (index: number) => {
    setConfirmed(current => current.map((value, i) => i === index ? true : value));
    setNotice(zh ? `步驟 ${index + 1} 已由承辦人確認。` : `Step ${index + 1} confirmed by the case owner.`);
    openStage((index + 2) as AwsStage);
  };
  const reset = () => {
    setStage(1); setDocumentType('appeal'); setFiledDate('2026-10-06'); setReviewed(false);
    setSelected([]); setDraft(null); setHumanNote(''); setConfirmed([false, false, false]);
    setFinalConfirmed(false); setNotice(t.resetNotice);
  };
  const download = () => {
    if (!finalConfirmed || !draft?.trim()) return;
    const url = URL.createObjectURL(new Blob([exportAppealDraft(draft, humanNote, locale)], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = t.downloadName; document.body.append(anchor); anchor.click(); anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice(t.downloadDone);
  };
  const continueButton = (index: number, disabled = false) => <button type="button" className="aws-primary" disabled={disabled} onClick={() => confirmStage(index)}>{t.confirm} <span aria-hidden="true">→</span></button>;
  return <section id="interactive-demo" className="aws-workspace" aria-labelledby="aws-workspace-title">
    <header className="aws-workspace-header"><div><span className="demo-label">{t.label}</span><h2 id="aws-workspace-title">{zh ? 'AI 整理，下一步由你確認。' : 'AI organizes. You decide the next step.'}</h2><p>{t.intro}</p></div><button type="button" className="aws-reset" onClick={reset}>{t.reset}</button></header>
    <p className="aws-fictional-note">{zh ? '互動展示・虛構案件與預編寫 AI 輸出' : 'INTERACTIVE DEMO · Fictional case and pre-written AI outputs'}</p>
    <nav className="aws-stage-nav" aria-label={t.status}>{t.stages.map((name, index) => <button key={name} type="button" disabled={index > 0 && !confirmed[index - 1]} title={index > 0 && !confirmed[index - 1] ? t.locked : undefined} aria-controls="aws-stage-content" aria-current={stage === index + 1 ? 'step' : undefined} onClick={() => openStage((index + 1) as AwsStage)}><span>{t.stageLabels[index]}</span>{name}{confirmed[index] && <b aria-label={t.confirmed}>✓</b>}</button>)}</nav>
    <p className="aws-status" role="status"><span className="aws-status-dot" aria-hidden="true" />{notice || (zh ? '示範案件已載入。完成確認，依序體驗四個重點畫面。' : 'Sample case loaded. Confirm each step to explore four key screens.')}</p>
    <div className="aws-workspace-grid">
      <aside className="aws-document-panel" aria-label={t.docTitle}>
        <span className="micro">DEMO-001 / {zh ? '廢棄物棄置罰鍰' : 'WASTE DISPOSAL FINE'}</span>
        <h3>{zh ? '案件卷證' : 'Case file'}</h3>
        <dl><div><dt>{zh ? '訴願人' : 'APPELLANT'}</dt><dd>{zh ? '林○○（虛構）' : 'Lin (fictional)'}</dd></div><div><dt>{zh ? '機關' : 'AGENCY'}</dt><dd>{zh ? '城南區環境管理處' : 'South City Environmental Office'}</dd></div><div><dt>{zh ? '處分日期' : 'DECISION'}</dt><dd>2026-09-18</dd></div><div><dt>{zh ? '訴願日期' : 'FILED'}</dt><dd>{filedDate || '—'}</dd></div></dl>
        <div className="aws-doc-tabs" role="group" aria-label={t.docVariant}><button type="button" aria-pressed={documentType === 'appeal'} onClick={() => setDocumentType('appeal')}>{zh ? '訴願書' : 'Appeal'}</button><button type="button" aria-pressed={documentType === 'response'} onClick={() => setDocumentType('response')}>{zh ? '答辯書' : 'Response'}</button></div>
        <div className="aws-document-excerpt"><span className="micro">{zh ? '原文節錄・示意' : 'SOURCE EXCERPT · ILLUSTRATION'}</span><p>{documentType === 'appeal' ? appealText : responseText}</p></div>
      </aside>
      <div ref={panel} id="aws-stage-content" className="aws-stage-panel" tabIndex={-1} aria-label={t.stages[stage - 1]}>
        {stage === 1 && <div className="aws-panel-content"><span className="aws-kicker"><b>{t.rule}</b> / 01</span><h3>{zh ? '先把能核對的事算清楚。' : 'Check what can be verified.'}</h3><p className="aws-panel-lead">{zh ? '欄位擷取為預編寫示範；修改日期，可以看到程式如何重新計算。' : 'Field extraction is pre-written. Change the date to see the program recalculate.'}</p>
          <label className="aws-field"><span>{zh ? '訴願日期（可修改）' : 'Filing date (editable)'}</span><input type="date" value={filedDate} onChange={event => { setFiledDate(event.target.value); setReviewed(false); invalidate(0); }}/></label>
          <div className="aws-check-list"><div className="aws-check-result"><span aria-hidden="true">✓</span><span>{zh ? '必要欄位：訴願人、機關及請求事項已具備。' : 'Required fields: appellant, agency and requested relief are present.'}</span></div><div className="aws-check-result"><span aria-hidden="true">{days === null ? '!' : '✓'}</span><span>{days === null ? (zh ? '請填入不早於處分日期的有效日期。' : 'Enter a valid date on or after the decision date.') : (zh ? `日期差：${filedDate} − 2026-09-18 = ${days} 日` : `Date difference: ${filedDate} − 2026-09-18 = ${days} days`)}</span></div></div>
          <p className="aws-panel-lead">{zh ? '此處示範日期差計算；實際法定期間仍須核對送達、在途與例假日等要件。' : 'This illustrates a date difference. Legal timeliness also depends on service and other applicable rules.'}</p>
          <label className="aws-final-confirm"><input type="checkbox" checked={reviewed} onChange={event => { setReviewed(event.target.checked); invalidate(0); }}/><span>{zh ? '我已核對案件欄位，繼續比對雙方主張。' : 'I have reviewed the case fields and am ready to compare arguments.'}</span></label>{continueButton(0, !reviewed || days === null)}</div>}
        {stage === 2 && <div className="aws-panel-content"><span className="aws-kicker"><b>{t.ai} · {zh ? '預編寫' : 'PRE-WRITTEN'}</b> / 02</span><h3>{t.argument}</h3><p className="aws-panel-lead">{zh ? '把主張與答辯放在一起，看見機關回答了什麼、還沒回答什麼。' : 'Pair the claim with the response to see what has—and has not—been addressed.'}</p><div className="aws-argument-grid"><article><span className="micro">{t.support}</span><p>{t.supportText}</p><blockquote>{zh ? '「照片只能證明地點，不能證明行為人。」' : '“The photos establish a location, not the actor.”'}</blockquote></article><article><span className="micro">{t.challenge}</span><p>{t.challengeText}</p><blockquote>{zh ? '「稽查紀錄與現場照片相互對應。」' : '“The record corresponds to the site photos.”'}</blockquote></article></div><p className="aws-unanswered"><b>{zh ? '待釐清' : 'OPEN ISSUE'}</b> {t.issueText}</p>{continueButton(1)}</div>}
        {stage === 3 && <div className="aws-panel-content"><span className="aws-kicker"><b>{t.human}</b> / 03</span><h3>{zh ? '哪些資料，可以進入草稿？' : 'What belongs in the draft?'}</h3><p className="aws-panel-lead">{t.sourceHint}</p><div className="aws-source-list">{sources.map(source => <article key={source.id} className={`aws-source-card${selected.includes(source.id) ? ' is-selected' : ''}`}>
          <div className="aws-source-content">{source.comparison ? <strong>{source.title}</strong> : <label className="aws-source-select"><input type="checkbox" checked={selected.includes(source.id)} onChange={() => { setSelected(current => current.includes(source.id) ? current.filter(id => id !== source.id) : [...current, source.id]); invalidate(2); }}/><strong>{source.title}</strong></label>}
          <small>{source.comparison ? (zh ? '僅供比對，不納入引用依據。' : 'Comparison only; excluded from draft citations.') : (source.id === 'rule' ? (zh ? '示意法規・記錄要件' : 'Illustrative rule · documentation requirements') : (zh ? '案件證據・稽查紀錄' : 'Case evidence · inspection record'))}</small>
          <details><summary>{zh ? '查看原文' : 'View original text'}</summary><p>{source.text}</p></details></div></article>)}</div><div className="aws-preview"><span className="micro">{zh ? `已選 ${selected.length} 筆引用依據` : `${selected.length} REFERENCES SELECTED`}</span><p>{selected.length ? sources.filter(source => selected.includes(source.id)).map(source => source.title).join(' / ') : t.previewEmpty}</p></div>{continueButton(2, !selected.length)}</div>}
        {stage === 4 && <div className="aws-panel-content"><span className="aws-kicker"><b>{t.ai} · {zh ? '預編寫' : 'PRE-WRITTEN'}</b> / 04</span><h3>{t.draftTitle}</h3><p className="aws-panel-lead">{t.draftHint}</p>
          {draft === null ? <button type="button" className="aws-primary" onClick={() => { setDraft(buildAppealDraft({ locale, filedDate, selected, sources })); setFinalConfirmed(false); setNotice(zh ? '草稿已依選取資料組合完成，請編修並確認。' : 'Draft assembled from your selected references. Review and edit it.'); }}>{t.generate} <span aria-hidden="true">→</span></button> : <>
          <textarea className="aws-draft-editor" value={draft} onChange={event => { setDraft(event.target.value); setFinalConfirmed(false); setNotice(zh ? '草稿已修改，匯出前請重新確認。' : 'Draft changed. Confirm your review again before exporting.'); }} aria-label={t.draftTitle} rows={15}/>
          <label className="aws-field"><span>{t.noteLabel}</span><textarea value={humanNote} onChange={event => { setHumanNote(event.target.value); setFinalConfirmed(false); }} placeholder={t.notePlaceholder} rows={2}/></label>
          <label className="aws-final-confirm"><input type="checkbox" checked={finalConfirmed} onChange={event => setFinalConfirmed(event.target.checked)}/><span>{zh ? '我已閱讀草稿，確認由人工決定是否採用。' : 'I have reviewed the draft and will decide whether to use it.'}</span></label><div className="aws-draft-actions"><button type="button" className="aws-primary" disabled={!finalConfirmed || !draft.trim()} onClick={download}>{t.download} <span aria-hidden="true">↓</span></button><span className="micro">{t.human}</span></div></>}
        </div>}
      </div>
    </div>
  </section>;
}
