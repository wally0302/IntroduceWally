import { notFound } from 'next/navigation';
import { Home } from '@/components/Home';
import { siteCopy } from '@/data/content';
import { isLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return pageMetadata(lang, lang === 'zh' ? 'Wally Huang — 看見產品背後的判斷' : 'Wally Huang — Product, with perspective', siteCopy[lang].hero.description);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <Home locale={lang}/>;
}
