'use client';

import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import type { Locale, Project } from '@/lib/types';

export function DecisionReveal({ project, locale }: { project: Project; locale: Locale }) {
  const [mode, setMode] = useState<'preview' | 'product' | 'thinking'>('preview');
  const frame = useRef<number>(0);
  const stage = useRef<HTMLDivElement>(null);
  const modeRef = useRef(mode);
  const id = useId();
  const p = project.copy[locale];
  modeRef.current = mode;
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || modeRef.current !== 'preview' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => { stage.current?.style.setProperty('--reveal-x', `${x}%`); stage.current?.style.setProperty('--reveal-y', `${y}%`); });
  };
  return <div className={`decision-reveal reveal-${project.slug}`} style={{ '--project-accent': project.accent } as CSSProperties}>
    <div ref={stage} id={id} className={`reveal-stage mode-${mode}`} onPointerMove={move} onPointerLeave={() => {
      cancelAnimationFrame(frame.current);
      stage.current?.style.removeProperty('--reveal-x');
      stage.current?.style.removeProperty('--reveal-y');
    }}>
      <div className="reveal-thinking">
        <span className="micro">{locale === 'zh' ? 'BEHIND THE PRODUCT / 產品背後' : 'BEHIND THE PRODUCT'}</span>
        <ol>{p.insights.map((insight, i) => <li key={insight}><span className="micro">0{i + 1}</span><p>{insight}</p></li>)}</ol>
      </div>
      <div className="reveal-cover" aria-hidden="true">
        <span className="micro cover-category">{project.slug === 'pitchcue' ? 'REAL-TIME Q&A' : project.slug === 'kefu' ? 'AI × HUMAN COLLABORATION' : project.slug === 'aws-hackathon' ? 'AWS HACKATHON / HUMAN-IN-THE-LOOP' : 'FROM DELIVERY TO EVERYDAY USE'}</span>
        <span className={`cover-title ${project.slug === 'voting-system' || project.slug === 'aws-hackathon' ? 'cover-title-small' : ''}`}>{project.slug === 'voting-system' ? <>{locale === 'zh' ? '交付' : 'Beyond'}<br />{locale === 'zh' ? '之後。' : 'delivery.'}</> : project.slug === 'aws-hackathon' ? <>{locale === 'zh' ? 'AI 助審，' : 'AI assists.'}<br/>{locale === 'zh' ? '人做決定。' : 'People decide.'}</> : p.title}</span>
        {project.slug === 'pitchcue' ? <svg className="waveform" viewBox="0 0 650 100" fill="none">{Array.from({ length: 71 }, (_, i) => { const h = (Math.sin(i * 1.73) ** 2 * Math.sin(i * .107 + .5) ** 2) * 88 + 4; return <path key={i} d={`M${i * 9 + 5} ${(50 - h / 2).toFixed(3)}v${h.toFixed(3)}`} stroke="currentColor" strokeWidth="2"/>; })}</svg> : project.slug === 'kefu' ? <svg className="handoff-art" viewBox="0 0 400 110" fill="none"><path d="M5 55h115c75 0 75-45 160-45h90M120 55c75 0 75 45 160 45h90" stroke="currentColor" strokeWidth="1.5"/><circle cx="120" cy="55" r="8" fill="currentColor"/><circle cx="373" cy="10" r="6" stroke="currentColor"/><circle cx="373" cy="100" r="6" stroke="currentColor"/></svg> : project.slug === 'aws-hackathon' ? <div className="cover-steps"><span>01 — CHECK</span><span>02 — TRACE</span><span>03 — DRAFT</span></div> : <div className="cover-steps"><span>01 — DEFINE</span><span>02 — DELIVER</span><span>03 — ENABLE</span></div>}
        <span className="cover-number">{project.number}</span>
      </div>
    </div>
    <div className="reveal-toolbar">
      <div role="group" aria-label={locale === 'zh' ? `${p.title} 展示方式` : `${p.title} view`}>
        <button type="button" aria-controls={id} aria-pressed={mode === 'product'} onClick={() => setMode('product')}>{locale === 'zh' ? '看產品' : 'The product'}</button>
        <button type="button" aria-controls={id} aria-pressed={mode === 'thinking'} onClick={() => setMode('thinking')}>{locale === 'zh' ? '看判斷' : 'The thinking'}<span aria-hidden="true">↗</span></button>
      </div>
      <span className="illustration-label">{locale === 'zh' ? '互動示意' : 'Illustrative interaction'}</span>
    </div>
  </div>;
}
