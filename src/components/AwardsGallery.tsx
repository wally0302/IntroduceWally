'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { Locale } from '@/lib/types';
import { awardLabels, awards, type AwardRecord } from '@/data/awards';

const focusableSelector = 'button, a[href]';
const imageSize = (record: AwardRecord) => record.imageSize ?? { width: 1930, height: 1364 };

function AwardDialog({ locale, record, onClose }: { locale: Locale; record: AwardRecord; onClose: () => void }) {
  const size = imageSize(record);
  const portrait = size.height > size.width;
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const t = (value: Record<Locale, string>) => value[locale];

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    returnFocus.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const focusable = [...element.querySelectorAll<HTMLElement>(focusableSelector)];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    element.addEventListener('keydown', onKeyDown);
    return () => {
      element.removeEventListener('keydown', onKeyDown);
      element.close();
      document.body.style.overflow = previousOverflow;
      returnFocus.current?.focus({ preventScroll: true });
    };
  }, []);

  return <dialog ref={dialog} className={`award-dialog${portrait ? ' award-dialog-portrait' : ''}`} aria-labelledby="award-dialog-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <button className="award-dialog-close" type="button" onClick={onClose} aria-label={locale === 'zh' ? '關閉詳細資料' : 'Close details'}>×</button>
    <div className="award-dialog-inner">
      <div className="award-dialog-image"><img src={record.image} width={size.width} height={size.height} alt={record.placeholder ? (locale === 'zh' ? '暫代圖片：FUTUREMODE × SITCON 參賽證明' : 'Placeholder: FUTUREMODE × SITCON participation certificate') : t(record.event)} /></div>
      <div className="award-dialog-copy">
        <span className="micro">{awardLabels[locale][record.category]} · {record.year}.{record.month}</span>
        <h2 id="award-dialog-title">{t(record.title)}</h2>
        <p className="award-dialog-event">{t(record.event)}</p>
        <p className={`award-result ${record.category === 'award' ? 'is-award' : ''}`}>{t(record.result)}</p>
        {(record.issuer || record.projectName) && <dl>
          {record.issuer && <><dt>{locale === 'zh' ? '主辦／發證' : 'Issuer'}</dt><dd>{t(record.issuer)}</dd></>}
          {record.projectName && <><dt>{locale === 'zh' ? '相關專案' : 'Related project'}</dt><dd>{record.projectName}</dd></>}
        </dl>}
        <p className="award-context">{t(record.context)}</p>
        {record.placeholder && <p className="award-placeholder">{locale === 'zh' ? '暫用示意圖；正式證書素材待補。' : 'Placeholder image; official certificate asset pending.'}</p>}
      </div>
    </div>
  </dialog>;
}

function AwardCard({ record, locale, clone, onOpen, onImageHover }: {
  record: AwardRecord;
  locale: Locale;
  clone: boolean;
  onOpen: () => void;
  onImageHover: (hovered: boolean) => void;
}) {
  const size = imageSize(record);
  const portrait = size.height > size.width;
  return <li className={`award-item${portrait ? ' award-item-portrait' : ''}`} style={{ '--award-aspect': size.width / size.height } as CSSProperties}>
    <button className="award-card" type="button" tabIndex={clone ? -1 : 0}
      aria-haspopup="dialog" onMouseDown={clone ? event => event.preventDefault() : undefined}
      onClick={onOpen}>
      <span className="award-image" onMouseEnter={() => onImageHover(true)} onMouseLeave={() => onImageHover(false)}>
        <img src={record.image} alt="" loading="lazy" width={size.width} height={size.height} />
        {record.placeholder && <span className="award-image-badge">{locale === 'zh' ? '暫用示意圖' : 'Placeholder image'}</span>}
      </span>
      <span className="award-card-meta">
        <span className="micro">{record.year} · {awardLabels[locale][record.category]}</span>
        <strong>{record.event[locale]}</strong>
        <span className={`award-result ${record.category === 'award' ? 'is-award' : ''}`}>{record.result[locale]}</span>
        <span className="award-card-hint">{locale === 'zh' ? '查看紀錄 ↗' : 'View record ↗'}</span>
      </span>
    </button>
  </li>;
}

export function AwardsGallery({ locale }: { locale: Locale }) {
  const strip = useRef<HTMLDivElement>(null);
  const originalGroup = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<AwardRecord | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [inView, setInView] = useState(false);
  const isPaused = userPaused || hoverPaused || focusPaused || Boolean(active) || !documentVisible;

  useEffect(() => {
    const node = strip.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine)');
    const updateMotion = () => {
      const allowed = desktop.matches && !reduce.matches;
      // Return a visible clone to its original before hiding the duplicate group.
      if (!allowed && strip.current && originalGroup.current) {
        const width = originalGroup.current.getBoundingClientRect().width;
        if (width && strip.current.scrollLeft >= width) strip.current.scrollLeft %= width;
      }
      setReducedMotion(reduce.matches);
      setMotionAllowed(allowed);
    };
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    reduce.addEventListener('change', updateMotion);
    desktop.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      reduce.removeEventListener('change', updateMotion);
      desktop.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    const node = strip.current;
    if (!node || isPaused || !inView || !motionAllowed) return;
    let frame = 0;
    let lastTime = 0;
    let position = node.scrollLeft;
    const advance = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 0;
      lastTime = time;
      const width = originalGroup.current?.getBoundingClientRect().width ?? 0;
      position += elapsed * .028;
      if (width && position >= width) position %= width;
      node.scrollLeft = position;
      frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frame);
  }, [inView, isPaused, motionAllowed]);

  const move = (direction: number) => {
    const node = strip.current;
    if (!node) return;
    setUserPaused(true);
    const first = originalGroup.current?.firstElementChild;
    if (!first) return;
    const origin = first.getBoundingClientRect().left;
    const stops = [...node.querySelectorAll<HTMLElement>('.award-item')]
      .map(item => item.getBoundingClientRect().left - origin);
    const target = direction > 0
      ? stops.find(left => left > node.scrollLeft + 2) ?? node.scrollWidth - node.clientWidth
      : stops.findLast(left => left < node.scrollLeft - 2) ?? 0;
    node.scrollTo({ left: target, behavior: reducedMotion ? 'instant' : 'smooth' });
  };
  const open = (record: AwardRecord) => setActive(record);
  const label = locale === 'zh' ? '獎項與參與紀錄' : 'Awards and recognition records';

  return <section id="awards" className="awards-section" aria-labelledby="awards-heading"
    onFocus={() => setFocusPaused(true)}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusPaused(false); }}>
    <div className="page-width">
      <div className="section-label micro"><span>( 04 — {locale === 'zh' ? '獎項與參與紀錄' : 'Awards & Recognition'} )</span><span>2022 — 2026</span></div>
      <div className="awards-heading-row">
        <div><h2 id="awards-heading">{locale === 'zh' ? '獎項與參與紀錄' : 'Awards & Recognition'}</h2><p className="awards-intro">{locale === 'zh' ? '從競賽、分享，到持續學習。' : 'Competitions, knowledge sharing, and continued learning.'}</p></div>
        <div className="awards-controls">
          <button type="button" onClick={() => move(-1)} aria-label={locale === 'zh' ? '上一筆' : 'Previous'}>←</button>
          <button type="button" onClick={() => move(1)} aria-label={locale === 'zh' ? '下一筆' : 'Next'}>→</button>
          {motionAllowed && <button type="button" onClick={() => setUserPaused(value => !value)} aria-pressed={userPaused}>{userPaused ? (locale === 'zh' ? '繼續播放' : 'Resume') : (locale === 'zh' ? '暫停播放' : 'Pause')}</button>}
        </div>
      </div>
    </div>
    <div ref={strip} className="awards-strip" onWheel={event => { if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey) setUserPaused(true); }} onTouchStart={() => setUserPaused(true)}>
      <ul ref={originalGroup} className="awards-group" aria-label={label}>
        {awards.map(record => <AwardCard key={record.id} record={record} locale={locale} clone={false} onOpen={() => open(record)} onImageHover={setHoverPaused} />)}
      </ul>
      {motionAllowed && <ul className="awards-group" aria-hidden="true">
        {awards.map(record => <AwardCard key={record.id} record={record} locale={locale} clone onOpen={() => open(record)} onImageHover={setHoverPaused} />)}
      </ul>}
    </div>
    {active && <AwardDialog locale={locale} record={active} onClose={() => setActive(null)} />}
  </section>;
}
