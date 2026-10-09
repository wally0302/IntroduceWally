'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/types';
import { defaultPreferences, recommendRestaurants, type Restaurant, type RestaurantPreferences } from '@/lib/restaurant-demo';
import './restaurant-demo.css';

const copy = {
  zh: {
    title: '人約好了，今晚吃哪？', intro: '替這場聚餐選一家，試著照顧每個人的需要。', demo: 'DEMO · 虛構餐廳 / 本地規則模擬，非即時 AI', reset: '重新體驗', steps: ['帶入需求', '比較推薦', '主揪拍板'],
    context: '揪甘心 / 已成團', gathering: '好久不見的週五晚餐', time: '週五 18:30', place: '台北・中山站附近', people: '位朋友已約好', inherited: '時間、地點與人數先帶入，不必再填一次。', formTitle: '這一餐，需要照顧什麼？', budget: '每人預算上限', size: '用餐人數', dietary: '聚餐需求', vegetarian: '有人吃素', longStay: '想坐久一點', hint: '試試「有人吃素」，看看哪些餐廳會留下來。', submit: '看看適合的餐廳', unit: '人',
    resultsTitle: '把選項變少，把理由說清楚。', rules: '示範規則：先篩預算、人數與需求，再依步行時間排序。', edit: '修改條件', top: '優先看看', alternative: '另一個選擇', each: '每人約', walk: '步行', minutes: '分鐘', capacity: '可容納', vegYes: '有素食選項', stayYes: '可久坐', reason: '為什麼適合這一團', reasonBudget: '符合預算', reasonSize: '坐得下整團', caveat: '決定前再確認', pick: '就選這家',
    emptyTitle: '這次沒有全部符合的餐廳。', empty: '保留你的條件，不用不合適的選項湊數。可以調整預算、人數或聚餐需求再試一次。', recover: '回到 6 人聚餐範例', resultCount: '間符合，展示', shown: '間', excluded: '間因條件不符排除',
    doneTitle: '少一輪「都可以」，多一個決定。', done: '主揪已選定 · Demo', decision: '這次聚餐就選', reminder: '下一步：向餐廳確認座位與飲食需求，再告訴朋友。這裡沒有建立訂位或傳送訊息。', again: '回去比較其他家', takeaway: 'AI 協助縮小選擇，主揪保留最後決定。', note: '價格、步行時間與設施均為示範資料；不代表真實店家、營業狀態或訂位保證。',
  },
  en: {
    title: 'Everyone’s in. Where do we eat?', intro: 'Choose a place for this gathering, with everyone’s needs in mind.', demo: 'DEMO · Fictional places / local rules, not live AI', reset: 'Start again', steps: ['Bring the context', 'Compare matches', 'Make the call'],
    context: 'GatherTime / Group confirmed', gathering: 'A long-overdue Friday dinner', time: 'Friday, 6:30 PM', place: 'Near Zhongshan Station, Taipei', people: 'friends are coming', inherited: 'Time, area and party size carry over. No need to enter them again.', formTitle: 'What does this dinner need?', budget: 'Budget ceiling per person', size: 'Party size', dietary: 'Group needs', vegetarian: 'Vegetarian options', longStay: 'Time to linger', hint: 'Try “Vegetarian options” and see which places remain.', submit: 'Find places that fit', unit: 'people',
    resultsTitle: 'Fewer options. Clearer reasons.', rules: 'Demo rules: filter budget, capacity and needs, then sort by walking time.', edit: 'Edit preferences', top: 'Start here', alternative: 'Another option', each: 'About', walk: 'Walk', minutes: 'min', capacity: 'Seats up to', vegYes: 'Vegetarian options', stayYes: 'Long stays welcome', reason: 'Why it fits this group', reasonBudget: 'Within budget', reasonSize: 'Room for everyone', caveat: 'Check before deciding', pick: 'Choose this place',
    emptyTitle: 'No place meets every requirement.', empty: 'Your conditions stay intact. Try adjusting the budget, party size or group needs instead of settling for a false match.', recover: 'Restore the 6-person example', resultCount: 'match; showing', shown: '', excluded: 'excluded by your conditions',
    doneTitle: 'One less “anything is fine.” One decision made.', done: 'Host’s choice · Demo', decision: 'Dinner is at', reminder: 'Next: confirm seating and dietary needs with the restaurant, then let your friends know. No booking or message has been sent.', again: 'Compare other places', takeaway: 'AI narrows the options. The host makes the call.', note: 'Prices, walking times and amenities are fictional demo data, not real listings, live availability or guaranteed bookings.',
  },
} as const;

type Step = 'preferences' | 'results' | 'decision';

export function RestaurantDemo({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [preferences, setPreferences] = useState<RestaurantPreferences>({ ...defaultPreferences });
  const [step, setStep] = useState<Step>('preferences');
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const focusNext = useRef(false);
  const result = recommendRestaurants(preferences);
  const stepIndex = step === 'preferences' ? 0 : step === 'results' ? 1 : 2;
  const moveTo = (next: Step) => { focusNext.current = true; setStep(next); };
  useEffect(() => {
    if (focusNext.current) { heading.current?.focus({ preventScroll: true }); heading.current?.scrollIntoView({ block: 'start', behavior: 'instant' }); focusNext.current = false; }
  }, [step]);
  const update = (patch: Partial<RestaurantPreferences>) => { setPreferences(current => ({ ...current, ...patch })); setSelected(null); };
  const reset = () => { setPreferences({ ...defaultPreferences }); setSelected(null); moveTo('preferences'); };
  const summary = `${preferences.partySize} ${t.unit} · ≤ NT$${preferences.budget}${preferences.vegetarian ? ` · ${t.vegetarian}` : ''}${preferences.longStay ? ` · ${t.longStay}` : ''}`;

  return <section id="interactive-demo" className="restaurant-demo" aria-labelledby="restaurant-title">
    <header className="rd-header"><div><span className="rd-eyebrow">TRY THE PRODUCT / 30–60 SEC</span><h2 id="restaurant-title">{t.title}</h2><p>{t.intro}</p></div><button className="rd-text-button" type="button" onClick={reset}>{t.reset} ↺</button></header>
    <div className="rd-demo-label"><span aria-hidden="true"/>{t.demo}</div>
    <ol className="rd-progress" aria-label={locale === 'zh' ? '體驗進度' : 'Demo progress'}>{t.steps.map((label, i) => <li key={label} aria-current={i === stepIndex ? 'step' : undefined} className={i <= stepIndex ? 'is-active' : ''}><span>{i < stepIndex ? '✓' : `0${i + 1}`}</span>{label}</li>)}</ol>
    <div className="rd-stage">
      {step === 'preferences' ? <div className="rd-entry">
        <aside className="rd-context"><span className="rd-eyebrow">{t.context}</span><div className="rd-party" aria-hidden="true">{Array.from({ length: 6 }, (_, i) => <span key={i}>{['W', 'Y', 'J', 'S', 'L', 'H'][i]}</span>)}</div><h3>{t.gathering}</h3><p className="rd-context-count"><strong>{preferences.partySize}</strong> {t.people}</p><div className="rd-context-details"><p>◷ {t.time}</p><p>⌖ {t.place}</p></div><p className="rd-inherited">↳ {t.inherited}</p></aside>
        <form className="rd-form" onSubmit={event => { event.preventDefault(); moveTo('results'); }}>
          <h3 ref={heading} tabIndex={-1}>{t.formTitle}</h3>
          <fieldset><legend>{t.budget}</legend><div className="rd-options">{([400, 600, 800] as const).map(value => <label key={value}><input type="radio" name="restaurant-budget" value={value} checked={preferences.budget === value} onChange={() => update({ budget: value })}/><span>NT${value}</span></label>)}</div></fieldset>
          <fieldset><legend>{t.size}</legend><div className="rd-options">{([4, 6, 10] as const).map(value => <label key={value}><input type="radio" name="restaurant-size" value={value} checked={preferences.partySize === value} onChange={() => update({ partySize: value })}/><span>{value} {t.unit}</span></label>)}</div></fieldset>
          <fieldset><legend>{t.dietary}</legend><div className="rd-needs"><label><input type="checkbox" checked={preferences.vegetarian} onChange={event => update({ vegetarian: event.target.checked })}/>{t.vegetarian}</label><label><input type="checkbox" checked={preferences.longStay} onChange={event => update({ longStay: event.target.checked })}/>{t.longStay}</label></div></fieldset>
          <p className="rd-hint">{t.hint}</p><button type="submit" className="rd-primary">{t.submit}<span aria-hidden="true">↗</span></button>
        </form>
      </div> : step === 'results' ? <>
        <div className="rd-results-heading"><div><h3 ref={heading} tabIndex={-1}>{t.resultsTitle}</h3><p>{summary}</p></div><button className="rd-text-button" type="button" onClick={() => moveTo('preferences')}>{t.edit} ↗</button></div>
        <div className="rd-filter-summary" role="status"><span>{result.eligibleCount} {t.resultCount} {result.matches.length} {t.shown}</span><span>{result.excludedCount} {t.excluded}</span></div>
        {result.matches.length ? <div className="rd-cards">{result.matches.map((restaurant, index) => <article className={`rd-card ${index === 0 ? 'rd-first' : ''}`} key={restaurant.id}>
          <div className="rd-card-top"><span>{index === 0 ? t.top : t.alternative}</span><span>0{index + 1}</span></div><div className="rd-plate" aria-hidden="true"><span>{restaurant.cuisine[locale]}</span></div><h4>{restaurant.name[locale]}</h4><p className="rd-card-meta">{t.each} NT${restaurant.price} / {locale === 'zh' ? '人' : 'person'} <span>· {t.walk} {restaurant.walkMinutes} {t.minutes}</span></p>
          <div className="rd-reasons"><h5>{t.reason}</h5><p>✓ {t.reasonBudget} · ≤ NT${preferences.budget}</p><p>✓ {t.reasonSize} · {t.capacity} {restaurant.capacity} {t.unit}</p>{preferences.vegetarian && <p>✓ {t.vegYes}</p>}{preferences.longStay && <p>✓ {t.stayYes}</p>}</div>
          <p className="rd-caveat"><strong>{t.caveat}</strong>{restaurant.note[locale]}</p><button className={index === 0 ? 'rd-primary' : 'rd-secondary'} type="button" onClick={() => { setSelected(restaurant); moveTo('decision'); }} aria-label={`${t.pick}：${restaurant.name[locale]}`}>{t.pick}<span aria-hidden="true">→</span></button>
        </article>)}</div> : <div className="rd-empty"><span aria-hidden="true">∅</span><h4>{t.emptyTitle}</h4><p>{t.empty}</p><button className="rd-primary" type="button" onClick={() => { setPreferences({ ...defaultPreferences }); setSelected(null); }}>{t.recover} ↗</button></div>}
        <p className="rd-rules">↳ {t.rules}</p>
      </> : selected && <div className="rd-complete">
        <div className="rd-complete-intro"><span className="rd-check" aria-hidden="true">✓</span><h3 ref={heading} tabIndex={-1}>{t.doneTitle}</h3><p>{t.takeaway}</p></div>
        <div className="rd-decision"><span className="rd-eyebrow">{t.done}</span><p>{t.decision}</p><h4>{selected.name[locale]}</h4><p>{t.time} · {preferences.partySize} {t.unit}</p><p>{t.place} · NT${selected.price} / {locale === 'zh' ? '人' : 'person'}</p><div className="rd-decision-needs">{summary}</div><p className="rd-reminder">{t.reminder}</p><button className="rd-secondary" type="button" onClick={() => moveTo('results')}>{t.again} ↗</button></div>
      </div>}
    </div>
    <footer className="rd-footer">{t.note}</footer>
  </section>;
}
