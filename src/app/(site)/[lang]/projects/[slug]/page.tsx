import { OottProject } from '@/components/OottProject';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, siteCopy, getProject } from '@/data/content';
import { isLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';
import { Navigation } from '@/components/Navigation';
import { Contact, Footer } from '@/components/Footer';
import { Arrow } from '@/components/Arrow';
import { DecisionReveal } from '@/components/DecisionReveal';
import { CaseDemo } from '@/components/CaseDemo';
import { KefuDemo } from '@/components/KefuDemo';
import { BeachcomberDemo } from '@/components/BeachcomberDemo';
import { GatherProject } from '@/components/GatherProject';

export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(lang) || !project) notFound();
  const p = project.copy[lang];
  return pageMetadata(lang, `${p.title} — Wally Huang`, p.summary, `projects/${slug}/`);
}

export default async function CasePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(lang) || !project) notFound();
  const p = project.copy[lang];
  const isAws = project.slug === 'aws-hackathon';
  const isKefu = project.slug === 'kefu';
  const isBeachcomber = project.slug === 'beachcomber';
  const t = siteCopy[lang];
  const next = projects[(projects.findIndex(item => item.slug === slug) + 1) % projects.length];
  if (slug === 'ai-restaurant') return <GatherProject locale={lang} project={project} next={next}/>;
  if (slug === 'oott') return <OottProject locale={lang} next={next}/>;
  return <div id="top" className={`site case-page locale-${lang}${isBeachcomber ? ' case-beachcomber' : ''}`}>
    <Navigation locale={lang} copy={t.nav}/>
    <main id="main">
      <header className="case-header page-width"><Link className="text-link case-back" href={`/${lang}/#${slug}`}><Arrow direction="left"/>{t.caseStudy.back}</Link><div className="section-label micro"><span>CASE STUDY / {project.number}</span><span>{p.category}</span></div><h1>{p.title}</h1><p className="case-question">{p.question}</p>{!isBeachcomber && <div className="case-summary-grid"><div><span className="micro">{t.caseStudy.overview}</span><p>{p.summary}</p></div><dl><div><dt className="micro">{t.caseStudy.status}</dt><dd>{p.status}</dd></div><div><dt className="micro">{t.caseStudy.role}</dt><dd>{p.role}</dd></div></dl></div>}</header>
      {isBeachcomber ? <div className="case-live-demo page-width"><BeachcomberDemo locale={lang}/><p className="bc-contribution"><strong>{lang === 'zh' ? '我的分工 / ' : 'MY CONTRIBUTION / '}</strong>{p.role}{lang === 'zh' ? '。前後端與 AI 服務由團隊協作完成。' : '. Frontend, backend and AI services are team work.'}</p><div className="bc-source-links">{[['https://github.com/The-Beachcomber/beachcomber-fe', lang === 'zh' ? '產品與團隊分工' : 'Product & team credits'], ['https://github.com/The-Beachcomber/beachcomber-be', 'Backend'], ['https://github.com/The-Beachcomber/hackathon-hermes', 'AI service'], ['https://youtu.be/ZvLAx_R2K0A', lang === 'zh' ? '評選影片' : 'Judging video'], ['https://www.futuremode.xyz/hackathon', lang === 'zh' ? '黑客松背景' : 'Hackathon brief']].map(([href, label]) => <a key={href} className="text-link" href={href} target="_blank" rel="noopener noreferrer">{label}<Arrow/></a>)}</div></div> : isAws ? <div className="case-live-demo page-width">
        <div className="case-demo-intro"><div><span className="micro">TRY THE WORKFLOW</span><p>{lang === 'zh' ? '從一份訴願書，到一份可追溯的草稿。' : 'From an appeal to a traceable draft.'}</p></div><a className="text-link" href="https://github.com/wally0302/Aws_Hackathon" target="_blank" rel="noopener noreferrer">{lang === 'zh' ? '查看原始專案' : 'View source project'}<Arrow/></a></div>
        <CaseDemo slug={project.slug} locale={lang}/>
      </div> : <>{isKefu && <div className="case-live-demo page-width"><KefuDemo locale={lang}/></div>}<div className="case-cover page-width"><DecisionReveal project={project} locale={lang}/></div></>}
      <div className="case-body page-width"><aside className="case-toc"><span className="micro">{t.caseStudy.contents}</span><nav aria-label={t.caseStudy.contents}>{isAws && <a href="#interactive-demo"><span>↗</span>{lang === 'zh' ? '互動體驗' : 'Interactive demo'}</a>}{(isKefu || isBeachcomber) && <a href="#interactive-demo"><span>↗</span>{lang === 'zh' ? '互動體驗' : 'Interactive demo'}</a>}{p.sections.map((section,i) => <a key={section.id} href={`#${section.id}`}><span>0{i+1}</span>{section.title}</a>)}</nav></aside><div className="case-sections">{p.sections.map((section,i) => <section className="story-section" id={section.id} key={section.id}><span className="micro">0{i+1} / {section.eyebrow}</span><h2>{section.title}</h2>{section.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.points && <ul>{section.points.map(point => <li key={point}>{point}</li>)}</ul>}{!isAws && !isKefu && !isBeachcomber && i === 1 && <CaseDemo slug={project.slug} locale={lang}/>}</section>)}<section className="takeaway" aria-labelledby="takeaway-heading"><span className="micro" id="takeaway-heading">{t.caseStudy.takeaway}</span><p>{p.takeaway}</p></section></div></div>
      <div className="next-case page-width"><span className="micro">{t.caseStudy.next}</span><Link href={`/${lang}/projects/${next.slug}/`}><span>{next.copy[lang].title}</span><Arrow/></Link></div>
      <Contact locale={lang}/>
    </main><Footer locale={lang}/>
  </div>;
}
