import Link from 'next/link';
import { projects, siteCopy } from '@/data/content';
import type { Locale } from '@/lib/types';
import { Arrow } from './Arrow';
import { BranchArt } from './BranchArt';
import { DecisionReveal } from './DecisionReveal';
import { Contact, Footer } from './Footer';
import { Motion } from './Motion';
import { Navigation } from './Navigation';

export function Home({ locale }: { locale: Locale }) {
  const t = siteCopy[locale];
  return <div id="top" className={`site locale-${locale}`}>
    <Navigation locale={locale} copy={t.nav}/>
    <main id="main">
      <section className="hero page-width" aria-labelledby="hero-heading">
        <div className="hero-meta micro"><span>WALLY HUANG — PRODUCT MANAGER</span><span>TAIWAN / PORTFOLIO 2026</span></div>
        <div className="hero-grid"><div className="hero-identity"><h1 id="hero-heading" className="hero-name">WALLY<span className="sr-only"> Huang — Product Manager</span></h1><h2 className="hero-statement">{t.hero.title[0]}<br/>{t.hero.title[1]}</h2></div>
          <div className="hero-intro"><BranchArt/><div className="hero-intro-copy"><span className="micro">PRODUCT × AI × 0→1</span><p>{t.hero.description}</p><div className="hero-ctas"><Link className="pill-link" href="#work">{t.hero.explore}<Arrow/></Link><Link className="text-link" href="#journey">{t.hero.growth}<Arrow direction="down"/></Link></div></div></div>
        </div>
      </section>
      <section className="work-section page-width" id="work" aria-labelledby="work-heading">
        <div className="section-label work-label"><h2 id="work-heading" className="micro">( SELECTED WORK / 01—03 )</h2><span>{locale === 'zh' ? '揭開產品，看見判斷。' : 'Behind the product. Inside the thinking.'}</span></div>
        {projects.map(project => { const p = project.copy[locale]; return <article className={`project-chapter chapter-${project.slug}`} key={project.slug} id={project.slug}>
          <DecisionReveal project={project} locale={locale}/>
          <div className="project-story"><div className="micro project-caption"><span>{project.number} / {project.slug === 'voting-system' ? 'VOTING SYSTEM' : p.title}</span><span>{p.status}</span></div><span className="project-theme micro">{p.theme}</span><h3>{p.question}</h3><p className="project-summary">{p.summary}</p><Link className="text-link project-link" href={`/${locale}/projects/${project.slug}/`}>{t.work.read}<Arrow/></Link><span className="micro project-category">{p.category}</span></div>
        </article>; })}
      </section>
      <section id="journey" className="journey-section page-width" aria-labelledby="journey-heading">
        <div className="section-label micro"><span>( 02 — {t.journey.eyebrow} )</span><span>2024 — NOW</span></div>
        <div className="journey-grid"><div className="journey-intro"><h2 id="journey-heading">{t.journey.title}</h2><p>{t.journey.intro}</p><span className="journey-monogram" aria-hidden="true">w<span>/</span>h.</span></div><div className="journey-list"><div className="timeline-track" aria-hidden="true"><div className="timeline-progress"/></div>{t.journey.items.map((item,i) => <article className="journey-item" key={item.year}><span className="timeline-node" aria-hidden="true"/><div className="journey-year">{item.year}<span className="micro">0{i+1}</span></div><h3>{item.title}</h3><p>{item.body}</p><span className="micro journey-keywords">{item.keywords}</span></article>)}</div></div>
      </section>
      <section className="principles-section" id="about" aria-labelledby="principles-heading"><div className="page-width"><div className="section-label micro"><span>( 03 — {t.principles.eyebrow} )</span><span>THE WAY I WORK</span></div><div className="principles-grid"><div><h2 id="principles-heading">{t.principles.title}</h2><p className="principles-intro">{t.principles.intro}</p><div className="principles-art" aria-hidden="true">?<span>→</span>!</div></div><div className="principles-list">{t.principles.items.map(item => <article className="principle" key={item.number}><span className="micro">{item.number}</span><div><h3>{item.title}</h3><p>{item.body}</p>{item.project && <Link href={`/${locale}/projects/${item.project}/`} className="principle-link">{t.principles.evidence}<Arrow/></Link>}</div></article>)}</div></div></div></section>
      <Contact locale={locale}/>
    </main>
    <Footer locale={locale}/>
    <Motion/>
  </div>;
}
