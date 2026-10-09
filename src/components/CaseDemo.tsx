'use client';

import { useState } from 'react';
import type { Locale, ProjectSlug } from '../lib/types';
import './case-demo.css';
import { AwsCaseDemo } from './AwsCaseDemo';

type PitchMode = 'signals' | 'spoken';
type KefuMode = 'faq' | 'handoff';
type VotingStep = 'need' | 'feature' | 'handoff';

const copy = {
  zh: {
    demo: '互動示意',
    pitch: {
      label: '01 / PitchCue',
      prompt: '「遠端工作讓團隊更有效率嗎？」',
      hint: '同一個問題，兩種輸出方式。重點不是答案更長，而是當下更好用。',
      signals: '重點提示',
      spoken: '口語回答',
      signalText: ['先定義「效率」：速度、品質，還是協作成本？', '遠端能減少通勤與打斷，但需要更清楚的非同步節奏。', '先用一個小範圍團隊測試，再決定是否擴大。'],
      spokenText: '我會先問大家說的效率是哪一種。如果是減少打斷，遠端可能有幫助；但如果是協作速度，就需要更清楚的非同步節奏。我會先用小範圍測試，而不是直接把它當成普遍答案。',
      note: '內容為預編寫示意，不是真實 AI 回覆。',
    },
    kefu: {
      label: '02 / KeFu',
      promptFaq: '客戶問：「這件商品適合送給長輩嗎？」',
      promptHandoff: '客戶問：「收到的商品和預期不同，可以怎麼處理？」',
      hint: '先回答能確定的事；資訊不足時，讓真人接手變成體驗的一部分。',
      faq: '一般商品問題',
      handoff: '資訊不足的客訴',
      faqTitle: '可以先從使用情境判斷',
      faqText: '如果長輩偏好簡單操作，可以先查看商品的主要功能、使用方式與支援資訊，再決定是否適合。若你告訴我使用者的需求，我可以協助整理比較方向。',
      handoffTitle: '這裡先交給真人處理',
      handoffText: '目前資訊不足，無法替你判斷責任或承諾處理方式。我會整理這段對話與待確認事項，請客服人員接續了解你的狀況。',
      handoffMeta: '需要確認：商品、訂單情境、期待的協助',
      note: '情境為產品設計示意，不代表既有服務規格。',
    },
    voting: {
      label: '03 / Voting system',
      prompt: '功能交付了，營運就能獨立使用嗎？',
      hint: '把「完成」往後看一步：需求、功能、操作手冊要一起交付。',
      need: '需求',
      feature: '功能',
      handoff: '操作手冊',
      needTitle: '先把問題說清楚',
      needText: '整理使用情境、目標與需要被解決的問題，讓團隊知道為什麼做。',
      featureTitle: '再把決定做出來',
      featureText: '把需求轉成可討論、可操作的投票與彙整體驗，對齊不同角色的期待。',
      handoffTitle: '最後讓它能被接住',
      handoffText: '用清楚的操作手冊整理入口、步驟與常見情境，降低交付後的理解成本。',
      note: '內容為高階概念示意，不代表公司內部流程。',
    },
  },
  en: {
    demo: 'Interactive study',
    pitch: {
      label: '01 / PitchCue',
      prompt: '“Does remote work make teams more effective?”',
      hint: 'One question, two ways to respond. The point is not a longer answer, but a more useful one in the moment.',
      signals: 'Key signals',
      spoken: 'Spoken answer',
      signalText: ['Define “effective” first: speed, quality, or coordination cost?', 'Remote work can reduce commuting and interruptions, but needs a clearer async rhythm.', 'Test it with a small team before treating it as a universal answer.'],
      spokenText: 'I would start by asking what kind of effectiveness we mean. Remote work may reduce interruptions, but collaboration speed needs a clearer async rhythm. I would test it with a small team before treating it as a universal answer.',
      note: 'Pre-written concept content, not a live AI response.',
    },
    kefu: {
      label: '02 / KeFu',
      promptFaq: 'A customer asks: “Would this be a good gift for an older parent?”',
      promptHandoff: 'A customer asks: “The product I received is different from what I expected. What can I do?”',
      hint: 'Answer what is knowable first. When context is missing, make human handoff part of the experience.',
      faq: 'General product question',
      handoff: 'Context missing / complaint',
      faqTitle: 'Start with the use case',
      faqText: 'If the recipient prefers simple interactions, start by reviewing the product’s main features, usage, and support information. Their needs can then guide the comparison.',
      handoffTitle: 'A person should take this from here',
      handoffText: 'There is not enough context to judge responsibility or promise a resolution. I would pass along the conversation and open questions for a support person to understand the situation.',
      handoffMeta: 'To clarify: product, order context, and desired help',
      note: 'Product design concept only; it does not describe an existing service specification.',
    },
    voting: {
      label: '03 / Voting system',
      prompt: 'A feature is shipped. Can operations use it independently?',
      hint: 'Look one step past “done”: the need, the feature, and the handoff guide ship together.',
      need: 'The need',
      feature: 'The feature',
      handoff: 'The guide',
      needTitle: 'Make the problem clear first',
      needText: 'Frame the context, goal, and problem to solve so the team understands why the work matters.',
      featureTitle: 'Then make the decision usable',
      featureText: 'Turn the need into a discussable voting and aggregation experience that aligns different roles.',
      handoffTitle: 'Finally, make it easy to pick up',
      handoffText: 'Document entry points, steps, and common situations so the cost of understanding stays low after delivery.',
      note: 'High-level concept only; it does not represent an internal company process.',
    },
  },
} as const;

export function CaseDemo({ slug, locale }: { slug: ProjectSlug; locale: Locale }) {
  const t = copy[locale];
  const [pitchMode, setPitchMode] = useState<PitchMode>('signals');
  const [kefuMode, setKefuMode] = useState<KefuMode>('faq');
  const [votingStep, setVotingStep] = useState<VotingStep>('need');

  if (slug === 'pitchcue') {
    const isSignals = pitchMode === 'signals';
    return (
      <section className={`demo-shell demo-locale-${locale}`} aria-labelledby="demo-pitch-title">
        <div className="demo-heading"><span className="demo-label">{t.demo} · {t.pitch.label}</span><span className="demo-index">01</span></div>
        <h2 id="demo-pitch-title" className="demo-prompt">{t.pitch.prompt}</h2>
        <p className="demo-hint">{t.pitch.hint}</p>
        <div className="demo-switch" role="group" aria-label={locale === 'zh' ? '回答方式' : 'Answer format'}>
          <button type="button" className={isSignals ? 'demo-tab is-active' : 'demo-tab'} aria-pressed={isSignals} onClick={() => setPitchMode('signals')}>{t.pitch.signals}</button>
          <button type="button" className={!isSignals ? 'demo-tab is-active' : 'demo-tab'} aria-pressed={!isSignals} onClick={() => setPitchMode('spoken')}>{t.pitch.spoken}</button>
        </div>
        <div className="demo-answer" aria-live="polite">
          {isSignals ? <ul className="demo-list">{t.pitch.signalText.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="demo-spoken">{t.pitch.spokenText}</p>}
        </div>
        <p className="demo-note">↳ {t.pitch.note}</p>
      </section>
    );
  }

  if (slug === 'kefu') {
    const isFaq = kefuMode === 'faq';
    return (
      <section className={`demo-shell demo-locale-${locale}`} aria-labelledby="demo-kefu-title">
        <div className="demo-heading"><span className="demo-label">{t.demo} · {t.kefu.label}</span><span className="demo-index">02</span></div>
        <h2 id="demo-kefu-title" className="demo-prompt">{isFaq ? t.kefu.promptFaq : t.kefu.promptHandoff}</h2>
        <p className="demo-hint">{t.kefu.hint}</p>
        <div className="demo-switch" role="group" aria-label={locale === 'zh' ? '對話情境' : 'Conversation context'}>
          <button type="button" className={isFaq ? 'demo-tab is-active' : 'demo-tab'} aria-pressed={isFaq} onClick={() => setKefuMode('faq')}>{t.kefu.faq}</button>
          <button type="button" className={!isFaq ? 'demo-tab is-active' : 'demo-tab'} aria-pressed={!isFaq} onClick={() => setKefuMode('handoff')}>{t.kefu.handoff}</button>
        </div>
        <div className={`demo-answer demo-chat ${isFaq ? 'is-faq' : 'is-handoff'}`} aria-live="polite">
          <span className="demo-chat-tag">{isFaq ? 'AI' : locale === 'zh' ? '真人接手' : 'HUMAN HANDOFF'}</span>
          <h3>{isFaq ? t.kefu.faqTitle : t.kefu.handoffTitle}</h3>
          <p>{isFaq ? t.kefu.faqText : t.kefu.handoffText}</p>
          {!isFaq && <small>{t.kefu.handoffMeta}</small>}
        </div>
        <p className="demo-note">↳ {t.kefu.note}</p>
      </section>
    );
  }

  if (slug === 'aws-hackathon') return <AwsCaseDemo locale={locale}/>;

  const steps: VotingStep[] = ['need', 'feature', 'handoff'];
  const stepIndex = steps.indexOf(votingStep);
  const votingContent = {
    need: [t.voting.needTitle, t.voting.needText],
    feature: [t.voting.featureTitle, t.voting.featureText],
    handoff: [t.voting.handoffTitle, t.voting.handoffText],
  }[votingStep];
  return (
    <section className={`demo-shell demo-locale-${locale}`} aria-labelledby="demo-voting-title">
      <div className="demo-heading"><span className="demo-label">{t.demo} · {t.voting.label}</span><span className="demo-index">03</span></div>
      <h2 id="demo-voting-title" className="demo-prompt">{t.voting.prompt}</h2>
      <p className="demo-hint">{t.voting.hint}</p>
      <div className="demo-steps" role="group" aria-label={locale === 'zh' ? '案例步驟' : 'Case steps'}>
        {steps.map((step, index) => <button key={step} type="button" className={step === votingStep ? 'demo-step is-active' : 'demo-step'} aria-pressed={step === votingStep} aria-controls="demo-voting-panel" onClick={() => setVotingStep(step)}><span>0{index + 1}</span>{t.voting[step]}</button>)}
      </div>
      <div id="demo-voting-panel" className="demo-answer demo-voting-answer" aria-live="polite">
        <span className="demo-progress">{String(stepIndex + 1).padStart(2, '0')} / 03</span>
        <h3>{votingContent[0]}</h3><p>{votingContent[1]}</p>
      </div>
      <p className="demo-note">↳ {t.voting.note}</p>
    </section>
  );
}
