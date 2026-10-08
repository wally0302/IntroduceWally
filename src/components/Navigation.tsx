'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { localizedPath, localeStorageKey } from '@/lib/i18n';
import type { Locale, SiteCopy } from '@/lib/types';
import { Arrow } from './Arrow';

export function Navigation({ locale, copy }: { locale: Locale; copy: SiteCopy['nav'] }) {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const sections = [['work', copy.work], ['journey', copy.journey], ['about', copy.about]];
  const closeMenu = () => { if (menu.current) menu.current.open = false; };
  return <>
    <a className="skip-link" href="#main">{copy.skip}</a>
    <header className="site-header">
      <div className="header-inner">
        <Link href={`/${locale}/`} className="wordmark" aria-label="Wally Huang — home">w<span>/</span>h<span>.</span></Link>
        <nav className="desktop-nav" aria-label={locale === 'zh' ? '主要導覽' : 'Main navigation'}>
          {sections.map(([id, label]) => <Link key={id} href={`/${locale}/#${id}`}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <nav className="language-switch" aria-label={locale === 'zh' ? '語言' : 'Language'}>
            {(['zh', 'en'] as const).map((lang, i) => <span key={lang}>{i === 1 && <span className="language-divider" aria-hidden="true">/</span>}<a href={localizedPath(lang, pathname)} hrefLang={lang === 'zh' ? 'zh-Hant' : 'en'} lang={lang === 'zh' ? 'zh-Hant' : 'en'} aria-current={locale === lang ? 'true' : undefined} onClick={(event) => {
              try { localStorage.setItem(localeStorageKey, lang); } catch { /* Storage is optional. */ }
              if (window.location.hash) event.currentTarget.href = `${localizedPath(lang, pathname)}${window.location.hash}`;
            }}>{lang === 'zh' ? '中文' : 'EN'}</a></span>)}
          </nav>
          <Link className="header-contact" href={`/${locale}/#contact`}>{copy.contact}<Arrow /></Link>
          <details className="mobile-menu" ref={menu} onKeyDown={e => { if (e.key === 'Escape') { closeMenu(); menu.current?.querySelector('summary')?.focus(); } }}>
            <summary aria-label={copy.menu}><span /><span /></summary>
            <nav aria-label={copy.menu}>{sections.map(([id, label]) => <Link onClick={closeMenu} key={id} href={`/${locale}/#${id}`}>{label}<Arrow /></Link>)}<Link onClick={closeMenu} href={`/${locale}/#contact`}>{copy.contact}<Arrow /></Link></nav>
          </details>
        </div>
      </div>
    </header>
  </>;
}
