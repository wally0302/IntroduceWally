import { contact } from '@/data/contact';
import { siteCopy } from '@/data/content';
import type { Locale } from '@/lib/types';
import { Arrow } from './Arrow';

export function Contact({ locale }: { locale: Locale }) {
  const t = siteCopy[locale].contact;
  return <section className="contact-section page-width" id="contact" aria-labelledby="contact-heading">
    <div className="section-label micro"><span>( 05 — {t.eyebrow} )</span><span>LET’S TALK</span></div>
    <div className="contact-grid"><h2 id="contact-heading">{t.title[0]}<br/><span>{t.title[1]}</span></h2><div className="contact-detail"><p>{t.body}</p><div className="contact-links">
      {contact.email && <a href={`mailto:${contact.email}`} className="text-link">{contact.email}<Arrow /></a>}
      {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn<Arrow /></a>}
      {contact.resume && <a href={contact.resume} className="text-link" target="_blank" rel="noopener noreferrer">{t.resume}<Arrow /></a>}
    </div><span className="micro contact-location">{t.location}</span></div></div>
  </section>;
}

export function Footer({ locale }: { locale: Locale }) {
  const t = siteCopy[locale].footer;
  return <footer className="site-footer page-width"><a href={`/${locale}/`} className="footer-name">Wally Huang<span>.</span></a><p>{t.note}</p><a className="text-link footer-top" href="#top">{t.top}<Arrow /></a><span className="micro copyright">© {new Date().getFullYear()} WALLY HUANG</span></footer>;
}
