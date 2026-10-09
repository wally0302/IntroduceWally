'use client';

import { useRef, useState } from 'react';
import type { Locale } from '@/lib/types';
import { canCancel, defaultAnswers, deriveRules, emptyAnswers, questions, specFor, type Answers, type QuestionKey, type Role } from '@/lib/beachcomber-demo';
import './beachcomber-demo.css';

const roles: { id: Role; name: string }[] = [{ id: 'pm', name: 'PM' }, { id: 'ui', name: 'UI' }, { id: 'eng', name: 'Engineering' }, { id: 'qa', name: 'QA' }];

export function BeachcomberDemo({ locale }: { locale: Locale }) {
  const t = (zh: string, en: string) => locale === 'zh' ? zh : en;
  const [answers, setAnswers] = useState<Answers>({ ...emptyAnswers });
  const [active, setActive] = useState<QuestionKey>('payment');
  const [built, setBuilt] = useState(false);
  const [previewVersion, setPreviewVersion] = useState(0);
  const [role, setRole] = useState<Role>('pm');
  const [showSpecs, setShowSpecs] = useState(false);
  const [notice, setNotice] = useState('');
  const output = useRef<HTMLElement>(null);
  const question = questions.find(item => item.id === active)!;
  const choice = answers[active];
  const rules = deriveRules(answers);
  const focusOutput = () => requestAnimationFrame(() => {
    output.current?.focus({ preventScroll: true });
    output.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
  });

  function choose(value: 0 | 1) {
    setAnswers(current => ({ ...current, [active]: value }));
    setBuilt(false);
    setNotice(t(`${question.requirementId} 已確認：${question.options[value].rule.zh}`, `${question.requirementId} confirmed: ${question.options[value].rule.en}`));
  }
  function build(sample = false) {
    if (sample) {
      setAnswers(current => ({ payment: current.payment ?? defaultAnswers.payment, cancellation: current.cancellation ?? defaultAnswers.cancellation, capacity: current.capacity ?? defaultAnswers.capacity }));
    }
    setPreviewVersion(current => current + 1);
    setBuilt(true);
    setNotice(sample ? t('已用範例回答補齊未確認項目，並載入模擬原型。', 'Unanswered questions filled with sample answers. Authored prototype loaded.') : t('已依三項需求組合模擬原型，可以開始預約。', 'Authored prototype assembled from your three decisions. Try a booking.'));
    focusOutput();
  }
  function reset() {
    setAnswers({ ...emptyAnswers }); setActive('payment'); setBuilt(false); setShowSpecs(false); setRole('pm');
    setNotice(t('已重設，三項需求等待釐清。', 'Reset. Three requirements remain open.'));
  }

  return <section id="interactive-demo" className="beach-demo" aria-labelledby="beach-title">
    <div className="bc-intro">
      <div><span className="micro">BEACHCOMBER / INTERACTIVE FIELD NOTES</span><h2 id="beach-title">{t('把「我想要」，變成「原來是這樣」。', 'Turn “I want” into “now I see.”')}</h2><p>{t('你是訪談中的 PM。選一個追問，讓模糊需求長出可以操作的樣子。', 'You’re the PM. Ask a missing question. See the answer become a working interface.')}</p></div>
      <span className="bc-duration">~45<span>{t('秒體驗', 'SECOND DEMO')}</span></span>
    </div>
    <div className="bc-disclosure"><span className="bc-dot"/>{t('作品集模擬體驗・預寫情境與原型，非即時 AI 生成', 'Portfolio simulation · authored scenario and prototype, no live AI')}<span>{t('不需登入或麥克風', 'No login or microphone')}</span></div>
    <div className="bc-workbench">
      <div className="bc-interview">
        <div className="bc-panel-label"><span className="micro">01 / {t('先問對問題', 'ASK WHAT’S MISSING')}</span><span className="bc-live-label">{t('模擬訪談', 'SCRIPTED INTERVIEW')}</span></div>
        <div className="bc-transcript"><span className="micro">S-001 / {t('陶藝工作室・店主', 'CERAMICS STUDIO · OWNER')}</span><blockquote>「{t('我想做一個線上預約系統。', 'I want an online booking system.')}」</blockquote><p>{t('每次 90 分鐘、每人 NT$1,200，讓客人自己預約，不用來回傳訊息。', '90 minutes, NT$1,200 per person. Let guests book without all the back-and-forth.')}</p></div>
        <div className="bc-gap-heading"><span className="bc-spark" aria-hidden="true">✳</span><strong>{t('AI 建議追問', 'AI follow-up suggestions')}</strong><span>{t('示意', 'SIMULATED')}</span></div>
        <div className="bc-question-tabs" role="group" aria-label={t('選擇要釐清的需求', 'Choose a requirement to clarify')}>
          {questions.map((item, i) => <button type="button" key={item.id} aria-pressed={active === item.id} onClick={() => setActive(item.id)}><span>{answers[item.id] === null ? `0${i + 1}` : '✓'}</span>{item.label[locale]}<small>{answers[item.id] === null ? t('待釐清', 'OPEN') : t('已確認', 'SET')}</small></button>)}
        </div>
        <div className="bc-question-detail" key={active}>
          <h3>{question.question[locale]}</h3><p>{question.why[locale]}</p>
          <fieldset><legend>{t('選擇店主的模擬回答', 'Choose the owner’s scripted answer')}</legend>{question.options.map((option, i) => <button key={i} type="button" aria-pressed={choice === i} onClick={() => choose(i as 0 | 1)}><span aria-hidden="true" className="bc-radio">{choice === i ? '●' : '○'}</span>{option.answer[locale]}<span aria-hidden="true">↗</span></button>)}</fieldset>
          {choice !== null && <div className="bc-answer-impact"><span className="micro">{question.sourceId} → {question.requirementId}</span><p>{question.options[choice].impact[locale]}</p></div>}
        </div>
        <div className="bc-build-actions"><div className="bc-progress"><span>{t('需求清晰度', 'DECISIONS CONFIRMED')}</span><strong>{rules.confirmedCount}<span> / 3</span></strong></div><div className="bc-progress-track" aria-hidden="true"><i style={{ width: `${rules.confirmedCount / 3 * 100}%` }}/></div>
          <button type="button" className="bc-primary" disabled={rules.confirmedCount !== 3} onClick={() => build()}>{t('將需求變成原型', 'Turn decisions into a prototype')}<span aria-hidden="true">↗</span></button>
          <div className="bc-secondary-actions"><button type="button" onClick={() => build(true)}>{t('補齊範例，直接試用', 'Fill sample answers & try it')}</button><button type="button" onClick={reset}>{t('全部重設', 'Reset all')} ↺</button></div>
        </div>
      </div>
      <section ref={output} tabIndex={-1} className={`bc-output ${built ? 'is-built' : ''}`} aria-label={t('需求轉化成果', 'Requirements translated into an interface')}>
        <div className="bc-panel-label"><span className="micro">02 / {t('讓理解看得見', 'MAKE UNDERSTANDING VISIBLE')}</span><span className="bc-live-label">{built ? t('可操作原型', 'PLAYABLE PROTOTYPE') : t('需求藍圖', 'REQUIREMENT BLUEPRINT')}</span></div>
        {!built ? <div className="bc-blueprint">
          <div className="bc-blueprint-heading"><span className="bc-outline-mark" aria-hidden="true">↗</span><h3>{t('同一句話，', 'Same request.')}<br/>{t('可能是不同的產品。', 'Different products.')}</h3><p>{t('補上三個答案，才知道該做出什麼。', 'Three missing answers decide what we should build.')}</p></div>
          <div className="bc-blueprint-rules">{questions.map(item => {
            const answer = answers[item.id];
            return <div key={item.id} className={answer === null ? '' : 'is-confirmed'}><span className="micro">{item.requirementId}</span><div><strong>{item.label[locale]}</strong><p>{answer === null ? t('還沒問清楚', 'Not yet clarified') : item.options[answer].rule[locale]}</p></div><span aria-hidden="true">{answer === null ? '?' : '✓'}</span></div>;
          })}</div>
          <p className="bc-blueprint-note">{t('不把 AI 猜測，當成客戶已確認的需求。', 'An AI guess is not a confirmed requirement.')}</p>
        </div> : <BookingPreview key={`${previewVersion}-${JSON.stringify(answers)}`} answers={answers} locale={locale}/>}
        <div className="bc-output-footer"><span className="micro">{t('一句需求 → 三個決策 → 一個可討論的產品', 'ONE REQUEST → THREE DECISIONS → SOMETHING TO DISCUSS')}</span>{built && <button type="button" onClick={() => { setBuilt(false); setNotice(t('返回需求藍圖；可以調整回答後重新產生。', 'Back to the blueprint. Edit answers and rebuild.')); }}>{t('返回需求藍圖', 'Back to blueprint')} ↖</button>}</div>
      </section>
    </div>
    <div className="bc-spec-section"><button className="bc-spec-toggle" type="button" aria-expanded={showSpecs} aria-controls="beach-spec-content" onClick={() => setShowSpecs(!showSpecs)}><div><span className="micro">03 / {t('帶走同一份理解', 'SHARE THE SAME UNDERSTANDING')}</span><strong>{t('同一份需求，四種角色視角。', 'One set of decisions. Four team perspectives.')}</strong></div><span>{showSpecs ? '−' : '+'}</span></button>
      {showSpecs && <div id="beach-spec-content" className="bc-spec-content"><div role="group" className="bc-role-buttons" aria-label={t('規格角色', 'Specification role')}>{roles.map(item => <button key={item.id} type="button" aria-pressed={role === item.id} onClick={() => setRole(item.id)}>{item.name}</button>)}</div><p>{t('精簡模擬規格・保留相同需求與來源編號，切換角色不改寫事實。', 'Authored spec excerpts · the same requirement and source IDs across roles.')}</p><div className="bc-spec-lines">{specFor(role, answers, locale).map(line => <div key={line.id}><span className="micro">{line.id}<br/>{line.source}</span><p>{line.text}</p><small>{line.status === 'confirmed' ? t('模擬已確認', 'SCRIPTED / SET') : t('待釐清', 'UNRESOLVED')}</small></div>)}</div><p className="bc-open-questions">{t('仍待釐清：訂金退還、通知方式、店家時段管理。三個答案足以討論原型，還不是完整上線規格。', 'Still open: deposit refunds, notifications and studio schedule management. Three answers enable discussion, not a production-ready specification.')}</p></div>}
    </div>
    <p className="sr-only" role="status" aria-live="polite">{notice}</p>
  </section>;
}

function BookingPreview({ answers, locale }: { answers: Answers; locale: Locale }) {
  const t = (zh: string, en: string) => locale === 'zh' ? zh : en;
  const rules = deriveRules(answers);
  const [slot, setSlot] = useState('');
  const [people, setPeople] = useState(1);
  const [booked, setBooked] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [hours, setHours] = useState(48);
  const [contact, setContact] = useState(false);
  const confirmation = useRef<HTMLHeadingElement>(null);
  const firstSlot = useRef<HTMLButtonElement>(null);
  const capacity = rules.capacity ?? 1;
  return <div className="bc-preview">
    <div className="bc-preview-bar"><span className="bc-preview-dots" aria-hidden="true">● ● ●</span><span>clay.studio / {t('預約體驗', 'book a workshop')}</span><span>{t('模擬', 'DEMO')}</span></div>
    <div className="bc-studio"><div className="bc-studio-brand"><span>土日<span>CLAY / STUDIO</span></span><svg aria-hidden="true" viewBox="0 0 84 72" fill="none"><ellipse cx="42" cy="18" rx="22" ry="7"/><path d="M20 18c-2 12-8 24-6 34 2 17 54 17 56 0 2-10-4-22-6-34M14 47c8 13 48 13 56 0M16 37c8 12 44 12 52 0M19 27c8 10 38 10 46 0"/></svg></div>
      <h3>{t('留一點時間，給雙手。', 'Make time. Make something.')}</h3><p className="bc-studio-sub">{t('手捏陶體驗 / 90 分鐘 / NT$1,200・人', 'Hand-building / 90 minutes / NT$1,200 per person')}</p>
      {!booked ? <>
        {cancelled && <div className="bc-booking-notice" role="status">{t('模擬預約已取消，名額已釋出。訂金退還規則仍待確認。', 'Simulated booking cancelled; seats released. Deposit refund policy is still unresolved.')}</div>}
        <fieldset className="bc-slots"><legend><span className="bc-rule-tag">R-003</span>{t('體驗日 A・示範日期', 'Workshop day A · sample date')}</legend>{['10:00', '14:00', '16:00'].map(time => <button ref={time === '10:00' ? firstSlot : undefined} type="button" key={time} aria-pressed={slot === time} onClick={() => { setSlot(time); setCancelled(false); }}><strong>{time}</strong><span>{t(`剩 ${capacity} 位`, `${capacity} ${capacity === 1 ? 'seat' : 'seats'} left`)}</span></button>)}</fieldset>
        <div className="bc-people"><span>{t('預約人數', 'Guests')}</span><div><button type="button" aria-label={t('減少人數', 'Fewer guests')} disabled={people === 1} onClick={() => setPeople(people - 1)}>−</button><output aria-live="polite">{people}</output><button type="button" aria-label={t('增加人數', 'More guests')} disabled={people === capacity} onClick={() => setPeople(people + 1)}>+</button></div></div>
        <div className="bc-payment"><div><span className="bc-rule-tag">R-001</span>{rules.payment === 'deposit' ? t('本次模擬訂金', 'Simulated deposit') : t('預約時付款', 'Due at booking')}</div><strong>NT${rules.payment === 'deposit' ? (300 * people).toLocaleString() : '0'}</strong></div>
        <p className="bc-payment-note">{rules.payment === 'deposit' ? t(`總額 NT$${(1200 * people).toLocaleString()}；餘款收取與退費方式待確認。`, `Total NT$${(1200 * people).toLocaleString()}; balance collection and refunds unresolved.`) : t(`到場支付 NT$${(1200 * people).toLocaleString()}。`, `Pay NT$${(1200 * people).toLocaleString()} on arrival.`)}</p>
        <button type="button" className="bc-book-button" disabled={!slot} onClick={() => { setBooked(true); setContact(false); requestAnimationFrame(() => confirmation.current?.focus()); }}>{!slot ? t('先選一個時段', 'Choose a time first') : rules.payment === 'deposit' ? t('模擬付訂金並預約', 'Simulate deposit & book') : t('確認模擬預約', 'Confirm simulated booking')}<span aria-hidden="true">↗</span></button>
        <p className="bc-cancel-policy"><span className="bc-rule-tag">R-002</span>{rules.cancellation === 'self' ? t('開始前至少 24 小時可自行取消', 'Self-cancel at least 24 hours before start') : t('取消需聯絡工作室，不會自動取消', 'Contact the studio to cancel; no automatic cancellation')}</p>
      </> : <div className="bc-confirmation">
        <span className="bc-success-icon" aria-hidden="true">✓</span><h4 ref={confirmation} tabIndex={-1}>{t('想像，現在可以被驗證。', 'Now there’s something to test.')}</h4><p>{t('模擬預約成功', 'Simulated booking confirmed')} · {slot} · {people}{t(' 人', people === 1 ? ' guest' : ' guests')}</p><p>{rules.payment === 'deposit' ? t(`已模擬支付訂金 NT$${people * 300}`, `Simulated deposit: NT$${people * 300}`) : t(`到場付款 NT$${people * 1200}`, `Pay NT$${people * 1200} on arrival`)} · {t(`剩 ${capacity - people} 位`, `${capacity - people} ${capacity - people === 1 ? 'seat' : 'seats'} left`)}</p>
        <div className="bc-policy-test"><span className="bc-rule-tag">R-002</span><strong>{t('試一下取消規則', 'Test the cancellation rule')}</strong><div className="bc-clock-buttons" role="group" aria-label={t('模擬距離開始的時間', 'Simulate time before workshop')}>{[48, 12].map(value => <button type="button" key={value} aria-pressed={hours === value} onClick={() => { setHours(value); setContact(false); }}>{t(`開始前 ${value} 小時`, `${value}h before start`)}</button>)}</div>
          {canCancel(rules, hours) ? <button type="button" className="bc-cancel-button" onClick={() => { setBooked(false); setCancelled(true); setSlot(''); requestAnimationFrame(() => firstSlot.current?.focus()); }}>{t('取消這筆模擬預約', 'Cancel this simulated booking')}</button> : rules.cancellation === 'contact' ? <button type="button" className="bc-cancel-button" onClick={() => setContact(true)}>{t('查看聯絡處理方式', 'View contact handling')}</button> : <p role="status">{t('距開始不足 24 小時，不能自行取消。後續處理方式待確認。', 'Less than 24 hours remain. Self-cancellation is blocked; further handling is unresolved.')}</p>}
          {contact && <p role="status">{t('依目前需求，需由工作室處理。聯絡管道、處理時限仍待確認；未送出任何訊息。', 'The studio must handle this. Contact channel and response time are unresolved; no message was sent.')}</p>}
        </div><button className="bc-try-again" type="button" onClick={() => { setBooked(false); setSlot(''); setPeople(1); setHours(48); setContact(false); setCancelled(false); requestAnimationFrame(() => firstSlot.current?.focus()); }}>{t('重試預約模擬', 'Restart booking simulation')} ↺</button>
      </div>}
      <div className="bc-prototype-note">{t('預設版型與示範資料・僅在本頁操作，不會實際預約或付款', 'Authored layout and sample data · no real bookings or payments')}</div>
    </div>
  </div>;
}
