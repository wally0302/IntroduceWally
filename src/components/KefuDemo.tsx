'use client';

import { useState } from 'react';
import type { Locale } from '../lib/types';
import './kefu-demo.css';

type DemoView = 'inbox' | 'review' | 'knowledge';
type ConversationId = 'delivery' | 'refund';

const copy = {
  zh: {
    label: '互動示範 · KeFu', title: '讓 AI 回答，也讓人保留判斷。', intro: '用一個虛構商店的對話，走過知識回答、草稿審核與 FAQ 修正。', fictional: '虛構商店資料 · 瀏覽器內模擬 · 不會傳送真實訊息', inbox: '對話', review: '草稿審核', knowledge: '知識改善', reset: '重設示範', workspace: 'KeFu workspace', online: 'LOCAL DEMO', conversations: '對話列表', empty: '選一則對話開始審核。', customer: '顧客', ai: 'AI 草稿', human: '真人', source: '知識來源', sourceFaq: 'FAQ · 配送時程', sourceOrder: '訂單情境', deliveryQ: '請問這件商品大概多久會送到？', deliveryA: '目前 FAQ 寫的是：一般訂單約 3–5 個工作天送達。若有特殊配送需求，客服可以再協助確認。', deliveryAUpdated: '依最新 FAQ：一般訂單約 5–7 個工作天送達。若有特殊配送需求，客服可以再協助確認。', refundQ: '商品有瑕疵，可以直接退款嗎？', refundA: '這需要先確認訂單、瑕疵照片與購買時間。我先把對話交給真人客服，避免在資訊不足時承諾處理方式。', deliveryName: '林小姐', refundName: '陳先生', deliveryMeta: '今天 10:24 · 待審核', refundMeta: '昨天 16:08 · 已交接', reviewTitle: '編輯 AI 草稿，再決定是否送出', reviewHint: '這裡模擬 Inbox 的人工審核：可以修改文字、模擬送出，或捨棄草稿。', draftLabel: '可編輯草稿', editPlaceholder: '輸入要送給顧客的內容…', send: '模擬送出', discard: '捨棄草稿', sent: '已模擬送出', discarded: '已捨棄；顧客不會收到。', noDraft: '這則對話目前沒有待審核草稿。', knowledgeTitle: '把一次修正變成可確認的知識提案', knowledgeHint: '修正後先提出 FAQ 變更，只有明確接受才會影響下一次回答。', current: '目前 FAQ', proposed: '建議 FAQ', currentText: '一般訂單約 3–5 個工作天送達。', proposedText: '一般訂單約 5–7 個工作天送達。', editProposal: '編輯建議', accept: '接受 FAQ 修正', discardSuggestion: '捨棄建議', accepted: '已接受 FAQ 修正', suggestionDiscarded: '已捨棄建議，原 FAQ 保留。', retry: '用更新後知識重試', retryBefore: '先接受 FAQ 修正，再重試這則問題。', retryAnswer: '依更新後 FAQ：一般訂單約 5–7 個工作天送達。', pending: '待確認', changed: '已更新', resetNote: '已重設示範，所有對話與知識回到初始狀態。', workflow: '回答 → 審核 → 知識改善', openReview: '前往草稿審核', openKnowledge: '查看知識改善', noSelection: '目前沒有選取對話。', note: '這是產品流程示意，不代表真實客戶訊息、模型訓練或服務成效。'
  },
  en: {
    label: 'Interactive study · KeFu', title: 'Let AI answer, while people keep judgment.', intro: 'Walk through knowledge-backed replies, draft review, and an explicit FAQ correction in one fictional shop.', fictional: 'FICTIONAL SHOP DATA · LOCAL SIMULATION · NO REAL MESSAGES SENT', inbox: 'Conversations', review: 'Draft review', knowledge: 'Knowledge', reset: 'Reset demo', workspace: 'KeFu workspace', online: 'LOCAL DEMO', conversations: 'Conversations', empty: 'Choose a conversation to review.', customer: 'CUSTOMER', ai: 'AI DRAFT', human: 'HUMAN', source: 'Knowledge source', sourceFaq: 'FAQ · Delivery time', sourceOrder: 'Order context', deliveryQ: 'How long will this item take to arrive?', deliveryA: 'The current FAQ says: standard orders arrive in about 3–5 business days. A support person can confirm special delivery needs.', deliveryAUpdated: 'According to the updated FAQ: standard orders arrive in about 5–7 business days. A support person can confirm special delivery needs.', refundQ: 'The item is damaged. Can I get a refund directly?', refundA: 'That needs the order, photos of the damage, and purchase date checked first. I would hand this to a support person rather than promise a resolution with missing context.', deliveryName: 'Lin', refundName: 'Chen', deliveryMeta: 'Today 10:24 · Needs review', refundMeta: 'Yesterday 16:08 · Handed off', reviewTitle: 'Edit the AI draft, then decide whether to send it', reviewHint: 'This simulates Inbox review: edit the text, simulate sending, or discard the draft.', draftLabel: 'Editable draft', editPlaceholder: 'Write the message to send…', send: 'Simulate send', discard: 'Discard draft', sent: 'Simulated as sent', discarded: 'Discarded; the customer will not receive it.', noDraft: 'This conversation has no pending draft.', knowledgeTitle: 'Turn one correction into a confirmable knowledge proposal', knowledgeHint: 'Propose the FAQ change first. Only an explicit acceptance affects the next answer.', current: 'Current FAQ', proposed: 'Proposed FAQ', currentText: 'Standard orders arrive in about 3–5 business days.', proposedText: 'Standard orders arrive in about 5–7 business days.', editProposal: 'Edit proposal', accept: 'Accept FAQ correction', discardSuggestion: 'Discard suggestion', accepted: 'FAQ correction accepted', suggestionDiscarded: 'Suggestion discarded; the original FAQ remains.', retry: 'Retry with updated knowledge', retryBefore: 'Accept the FAQ correction before retrying this question.', retryAnswer: 'According to the updated FAQ: standard orders arrive in about 5–7 business days.', pending: 'Needs confirmation', changed: 'Updated', resetNote: 'Demo reset. Conversations and knowledge are back to their initial state.', workflow: 'Answer → review → knowledge improvement', openReview: 'Open draft review', openKnowledge: 'View knowledge improvement', noSelection: 'No conversation selected.', note: 'Product flow illustration only; it does not represent real customer messages, model training, or service outcomes.'
  }
} as const;

const flowCopy = {
  zh: {
    shop: '山日選物 / 示範商店', guide: '試試看：修正配送時間 → 送出草稿 → 採納 FAQ → 重試回答',
    reviewHint: '商家通知：配送時間已改為 5–7 個工作天，舊 FAQ 還沒更新。你可以套用範例，也可以自行編輯。',
    example: '套用 5–7 天修正範例', corrected: '您好，一般訂單目前約 5–7 個工作天送達。有特殊配送需求的話，歡迎告訴我們！',
    awaiting: 'AI 草稿待審', handed: '等待真人確認', takeover: '真人接手並回覆', taken: '真人已接手',
    held: '尚未送給顧客', sentMessage: '真人確認 · 已模擬送出',
    missing: '尚無 FAQ 修正提案', missingHint: '先到配送對話，修改 AI 草稿並模擬送出；再回來確認要保留的知識。',
    goDelivery: '修正配送草稿', proposalHint: '示範將你送出的修正版帶入提案。請整理成通用 FAQ，再決定是否採納；這裡沒有使用 AI 抽取。',
    same: '回覆已模擬送出；內容沒有修改，因此沒有新增 FAQ 提案。',
    proposalReady: '修正版已送出；可以接著確認 FAQ 提案。', after: '查看 FAQ 修正提案',
    discardedState: '已捨棄', before: '原 FAQ', active: '目前使用的 FAQ',
    tryOriginal: '以目前 FAQ 重試', retryLabel: '新一輪回答 · 前端模擬', retryHint: '採納後，再問一次相同問題，看看回答如何改變。',
    restore: '重新準備草稿', safe: '缺少訂單與照片，先由真人確認，暫不承諾退款。',
    source: 'FAQ #01 / 配送時程', takeaway: '產品重點：回覆可以由人修正，知識更新也有獨立的確認關卡。',
    draftSent: '已送出', draftDiscarded: '草稿已捨棄', knowledgeNone: '尚無提案', max: '最多 1,000 字',
  },
  en: {
    shop: 'Sunridge Goods / Demo shop', guide: 'Try it: correct delivery time → send draft → accept FAQ → retry',
    reviewHint: 'The shop now delivers in 5–7 business days, but the FAQ is outdated. Apply the example or write your own correction.',
    example: 'Apply the 5–7 day example', corrected: 'Hello! Standard orders now arrive in about 5–7 business days. Let us know if you have any special delivery needs!',
    awaiting: 'Draft needs review', handed: 'Needs a person', takeover: 'Take over and reply', taken: 'Human has taken over',
    held: 'Not sent to the customer', sentMessage: 'Human approved · Simulated as sent',
    missing: 'No FAQ proposal yet', missingHint: 'Edit and simulate sending the delivery draft first. Then review the knowledge you want to keep.',
    goDelivery: 'Correct the delivery draft', proposalHint: 'This demo copies your sent correction into a proposal. Edit it into a general FAQ before accepting. No AI extraction runs here.',
    same: 'Reply simulated as sent. With no edit, no FAQ proposal was created.',
    proposalReady: 'Correction sent. You can now review the FAQ proposal.', after: 'Review FAQ proposal',
    discardedState: 'Discarded', before: 'Previous FAQ', active: 'Active FAQ',
    tryOriginal: 'Retry with current FAQ', retryLabel: 'New answer · Local simulation', retryHint: 'After accepting, ask the same question again to see the difference.',
    restore: 'Prepare another draft', safe: 'The order and damage photos are missing. A person checks them before promising a refund.',
    source: 'FAQ #01 / Delivery time', takeaway: 'Product decision: people can correct replies, and knowledge changes have a separate approval step.',
    draftSent: 'Sent', draftDiscarded: 'Draft discarded', knowledgeNone: 'No proposal', max: 'Up to 1,000 characters',
  },
} as const;

export function KefuDemo({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const f = flowCopy[locale];
  const [view, setView] = useState<DemoView>('inbox');
  const [selected, setSelected] = useState<ConversationId>('delivery');
  const [drafts, setDrafts] = useState<Record<ConversationId, string>>({ delivery: t.deliveryA, refund: t.refundA });
  const [status, setStatus] = useState<Record<ConversationId, 'pending' | 'sent' | 'discarded'>>({ delivery: 'pending', refund: 'pending' });
  const [proposal, setProposal] = useState('');
  const [knowledge, setKnowledge] = useState<'none' | 'pending' | 'accepted' | 'discarded'>('none');
  const [activeFaq, setActiveFaq] = useState<string>(t.currentText);
  const [previousFaq, setPreviousFaq] = useState<string>(t.currentText);
  const [retryAnswer, setRetryAnswer] = useState('');
  const [takenOver, setTakenOver] = useState(false);
  const [notice, setNotice] = useState('');
  const isDelivery = selected === 'delivery';
  const name = isDelivery ? t.deliveryName : t.refundName;
  const question = isDelivery ? t.deliveryQ : t.refundQ;

  const reset = () => {
    setView('inbox'); setSelected('delivery');
    setDrafts({ delivery: t.deliveryA, refund: t.refundA });
    setStatus({ delivery: 'pending', refund: 'pending' });
    setProposal(''); setKnowledge('none'); setActiveFaq(t.currentText);
    setPreviousFaq(t.currentText); setRetryAnswer(''); setTakenOver(false); setNotice(t.resetNote);
  };
  const updateDraft = (value: string) => setDrafts((current) => ({ ...current, [selected]: value }));
  const send = () => {
    const message = drafts[selected].trim();
    if (!message || status[selected] !== 'pending') return;
    if (!isDelivery) setTakenOver(true);
    setDrafts((current) => ({ ...current, [selected]: message }));
    setStatus((current) => ({ ...current, [selected]: 'sent' }));
    if (isDelivery && message !== t.deliveryA) {
      setProposal(message); setPreviousFaq(activeFaq); setKnowledge('pending');
      setNotice(f.proposalReady);
    } else setNotice(isDelivery ? f.same : t.sent);
  };
  const discard = () => { setStatus((current) => ({ ...current, [selected]: 'discarded' })); setNotice(t.discarded); };
  const accept = () => {
    if (knowledge !== 'pending' || !proposal.trim()) return;
    setActiveFaq(proposal.trim()); setProposal(proposal.trim());
    setKnowledge('accepted'); setRetryAnswer(''); setNotice(t.accepted);
  };
  const discardSuggestion = () => { setKnowledge('discarded'); setNotice(t.suggestionDiscarded); };
  const selectView = (next: DemoView) => { setView(next); setNotice(''); };
  const openDelivery = () => {
    setSelected('delivery');
    if (status.delivery !== 'pending') {
      setDrafts((current) => ({ ...current, delivery: t.deliveryA }));
      setStatus((current) => ({ ...current, delivery: 'pending' }));
    }
    selectView('review');
  };
  const retry = () => {
    setRetryAnswer(activeFaq); setSelected('delivery'); setView('inbox'); setNotice(f.retryLabel);
  };

  return (
    <section id="interactive-demo" className="kefu-demo" aria-labelledby="kefu-demo-title">
      <header className="kefu-demo-header">
        <div><span className="kefu-demo-label">{t.label}</span><h2 id="kefu-demo-title">{t.title}</h2><p>{t.intro}</p></div>
        <button type="button" className="kefu-reset" onClick={reset}>{t.reset}</button>
      </header>
      <p className="kefu-fictional">↳ {t.fictional}</p>
      <div className="kefu-demo-bar"><span className="kefu-workspace-name">{f.shop}</span><span className="kefu-online"><i aria-hidden="true" />{t.online}</span></div>
      <div className="kefu-tabs" aria-label={t.workflow} role="group">
        {([['inbox', t.inbox], ['review', t.review], ['knowledge', t.knowledge]] as const).map(([key, label], index) => (
          <button key={key} type="button" aria-pressed={view === key} aria-controls="kefu-panel" className={view === key ? 'is-active' : ''} onClick={() => selectView(key)}><span className="kefu-step-number">0{index + 1}</span>{locale === 'en' && key === 'inbox' ? 'Inbox' : label}</button>
        ))}
      </div>
      <p className="kefu-status" role="status" aria-live="polite">{notice || f.guide}</p>
      <div id="kefu-panel">
        {view === 'inbox' && (
          <div className="kefu-inbox">
            <aside className="kefu-conversations">
              <span className="kefu-overline">{t.conversations}</span>
              {(['delivery', 'refund'] as ConversationId[]).map((id) => (
                <button type="button" key={id} aria-pressed={selected === id} className={`kefu-conversation ${selected === id ? 'is-selected' : ''}`} onClick={() => { setSelected(id); setNotice(''); }}>
                  <span className="kefu-avatar" aria-hidden="true">{locale === 'zh' ? (id === 'delivery' ? '林' : '陳') : (id === 'delivery' ? 'L' : 'C')}</span>
                  <span><strong>{id === 'delivery' ? t.deliveryName : t.refundName}</strong><small>{id === 'delivery' ? t.deliveryQ : t.refundQ}</small><em>{status[id] === 'sent' ? f.draftSent : status[id] === 'discarded' ? f.draftDiscarded : id === 'delivery' ? f.awaiting : takenOver ? f.taken : f.handed}</em></span>
                </button>
              ))}
              <div className="kefu-sidebar-note"><span className="kefu-overline">{f.active}</span><p>{activeFaq}</p></div>
            </aside>
            <div className="kefu-thread">
              <div className="kefu-thread-top"><span className="kefu-overline">{name}</span><span className="kefu-chip">{isDelivery ? t.sourceFaq : takenOver ? f.taken : f.handed}</span></div>
              <div className="kefu-message customer"><span className="kefu-message-label">{t.customer}</span><p>{question}</p></div>
              {status[selected] !== 'discarded' ? (
                <div className={`kefu-message ai ${status[selected] === 'pending' ? 'is-draft' : ''}`}>
                  <span className="kefu-message-label">{status[selected] === 'sent' ? f.sentMessage : `${t.ai} · ${f.held}`}</span>
                  <p>{drafts[selected]}</p>
                  <small>{isDelivery ? f.source : f.safe}</small>
                </div>
              ) : <p className="kefu-outcome">{t.discarded}</p>}
              {isDelivery && retryAnswer && <div className="kefu-message ai kefu-retried"><span className="kefu-message-label">{f.retryLabel}</span><p>{retryAnswer}</p><small>{f.source}</small></div>}
              <div className="kefu-thread-actions">
                <button type="button" className="kefu-primary" onClick={() => { if (!isDelivery) setTakenOver(true); selectView('review'); }}>{isDelivery || takenOver ? t.openReview : f.takeover}<span aria-hidden="true"> →</span></button>
                <button type="button" className="kefu-secondary" onClick={() => selectView('knowledge')}>{t.openKnowledge}</button>
              </div>
            </div>
          </div>
        )}
        {view === 'review' && (
          <div className="kefu-review">
            <div className="kefu-review-heading"><div><span className="kefu-overline">{t.review}</span><h3>{t.reviewTitle}</h3><p>{isDelivery ? f.reviewHint : f.safe}</p></div></div>
            <div className="kefu-review-grid">
              <div className="kefu-review-context"><span className="kefu-message-label">{t.customer} · {name}</span><p>{question}</p><span className="kefu-source-pill">{isDelivery ? f.source : f.handed}</span>{isDelivery && <p className="kefu-source-content">{activeFaq}</p>}</div>
              <div className="kefu-editor">
                <label htmlFor="kefu-draft"><span className="kefu-message-label">{t.draftLabel} · {f.max}</span><textarea id="kefu-draft" value={drafts[selected]} onChange={(event) => updateDraft(event.target.value)} placeholder={t.editPlaceholder} rows={4} maxLength={1000} disabled={status[selected] !== 'pending'} /></label>
                {status[selected] === 'pending' ? (
                  <><div className="kefu-actions">{isDelivery && <button type="button" className="kefu-example" onClick={() => updateDraft(f.corrected)}>{f.example} ↗</button>}</div><div className="kefu-actions"><button type="button" className="kefu-primary" disabled={!drafts[selected].trim()} onClick={send}>{t.send} →</button><button type="button" className="kefu-danger" onClick={discard}>{t.discard}</button></div></>
                ) : (
                  <><p className="kefu-outcome">{status[selected] === 'sent' ? t.sent : t.discarded}</p><div className="kefu-actions">{isDelivery && knowledge === 'pending' ? <button type="button" className="kefu-primary" onClick={() => selectView('knowledge')}>{f.after} →</button> : isDelivery && <button type="button" className="kefu-secondary" onClick={openDelivery}>{f.restore}</button>}<button type="button" className="kefu-secondary" onClick={() => selectView('inbox')}>{t.inbox}</button></div></>
                )}
              </div>
            </div>
          </div>
        )}
        {view === 'knowledge' && (
          <div className="kefu-knowledge">
            <div className="kefu-review-heading"><div><span className="kefu-overline">{t.knowledge}</span><h3>{t.knowledgeTitle}</h3><p>{t.knowledgeHint}</p></div><span className={`kefu-state ${knowledge === 'accepted' ? 'is-accepted' : ''}`}>{knowledge === 'accepted' ? t.changed : knowledge === 'discarded' ? f.discardedState : knowledge === 'none' ? f.knowledgeNone : t.pending}</span></div>
            {knowledge === 'none' ? (
              <div className="kefu-empty"><h4>{f.missing}</h4><p>{f.missingHint}</p><button type="button" className="kefu-primary" onClick={openDelivery}>{f.goDelivery} →</button></div>
            ) : (
              <>
                <div className="kefu-faq-grid">
                  <article><span className="kefu-message-label">{knowledge === 'accepted' ? f.before : f.active}</span><p>{knowledge === 'accepted' ? previousFaq : activeFaq}</p></article>
                  <article className={knowledge === 'accepted' ? 'is-accepted' : ''}><label htmlFor="kefu-proposal"><span className="kefu-message-label">{knowledge === 'accepted' ? f.active : t.proposed}</span><textarea id="kefu-proposal" value={proposal} onChange={(event) => setProposal(event.target.value)} rows={3} maxLength={1000} disabled={knowledge !== 'pending'} /></label></article>
                </div>
                {knowledge === 'pending' && <><p className="kefu-retry-note">{f.proposalHint}</p><div className="kefu-actions"><button type="button" className="kefu-primary" disabled={!proposal.trim()} onClick={accept}>{t.accept}</button><button type="button" className="kefu-danger" onClick={discardSuggestion}>{t.discardSuggestion}</button></div></>}
                {knowledge === 'discarded' && <p className="kefu-outcome">{t.suggestionDiscarded}</p>}
                {knowledge !== 'pending' && <div className="kefu-retry"><p>{knowledge === 'accepted' ? f.retryHint : activeFaq}</p><button type="button" className="kefu-primary" onClick={retry}>{knowledge === 'accepted' ? t.retry : f.tryOriginal} →</button></div>}
              </>
            )}
          </div>
        )}
      </div>
      <p className="kefu-note">{f.takeaway}</p>
    </section>
  );
}
