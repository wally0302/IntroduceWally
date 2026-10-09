import Link from 'next/link';
import type { Locale, Project } from '@/lib/types';
import { siteCopy } from '@/data/content';
import { Navigation } from './Navigation';
import { Contact, Footer } from './Footer';
import { Arrow } from './Arrow';
import { GatherDemo } from './GatherDemo';
import { GatherCaseStudy } from './GatherCaseStudy';
import './gather-project.css';

export function GatherProject({ locale, project, next }: { locale: Locale; project: Project; next: Project }) {
  const zh = locale === 'zh';
  const t = siteCopy[locale];
  return <div id="top" className={`site case-page gather-project locale-${locale}`}>
    <Navigation locale={locale} copy={t.nav}/>
    <main id="main">
      <header className="gather-hero page-width">
        <Link className="text-link case-back" href={`/${locale}/#ai-restaurant`}><Arrow direction="left"/>{t.caseStudy.back}</Link>
        <div className="section-label micro"><span>CASE STUDY / {project.number}</span><span>GROUP PLANNING & COORDINATION</span></div>
        <div className="gather-hero-grid"><div><h1>{zh ? '揪甘心' : 'GatherTime'}</h1><p className="gather-hero-tagline">{zh ? '從「想揪」到「成團」，一次搞定。' : 'From “let’s meet” to a confirmed plan.'}</p></div><div className="gather-hero-intro"><p>{zh ? '把聊天裡分散的回覆，變成大家看得懂的聚會計畫。從協調時間開始，讓 AI 在真正需要選擇的時候出場。' : 'Turn scattered replies into a shared gathering plan. Coordinate the time first; bring in AI when there is a decision to support.'}</p><div className="gather-hero-links"><a className="text-link" href="#interactive-demo">{zh ? '體驗完整流程' : 'Try the workflow'}<Arrow direction="down"/></a><a className="text-link" href="#product-thinking">{zh ? '看產品判斷' : 'Explore the decisions'}<Arrow direction="down"/></a></div></div></div>
        <div className="gather-page-map"><span><b>A</b>{zh ? '60–90 秒互動原型' : '60–90 second prototype'}</span><span><b>B</b>{zh ? '8 個角度，看見產品判斷' : '8 chapters of product reasoning'}</span><span>{zh ? '前端 Demo · 產品與商業假設尚待實測' : 'Frontend demo · Product and business hypotheses remain unvalidated'}</span></div>
      </header>
      <div className="page-width"><GatherDemo locale={locale}/></div>
      <GatherCaseStudy locale={locale}/>
      <div className="gather-source-strip page-width"><span className="micro">SOURCE PROJECT / DEMO</span><a className="text-link" href="https://github.com/That-is-so-sweet/That-is-so-sweet" target="_blank" rel="noopener noreferrer">{zh ? '查看程式與原始規格' : 'Code and original specifications'}<Arrow/></a><a className="text-link" href="https://that-is-so-sweet.github.io/That-is-so-sweet/" target="_blank" rel="noopener noreferrer">{zh ? '原始揪甘心 Demo' : 'Original GatherTime demo'}<Arrow/></a></div>
      <div className="next-case page-width"><span className="micro">{t.caseStudy.next}</span><Link href={`/${locale}/projects/${next.slug}/`}><span>{next.copy[locale].title}</span><Arrow/></Link></div>
      <Contact locale={locale}/>
    </main><Footer locale={locale}/>
  </div>;
}
