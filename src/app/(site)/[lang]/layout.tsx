import { notFound } from 'next/navigation';
import '@fontsource-variable/host-grotesk/wght.css';
import '@fontsource-variable/noto-sans-tc/wght.css';
import '../../globals.css';
import { isLocale } from '@/lib/i18n';
import { locales } from '@/lib/types';

export function generateStaticParams() { return locales.map(lang => ({ lang })); }
export const dynamicParams = false;

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <html lang={lang === 'zh' ? 'zh-Hant' : 'en'}><body>{children}</body></html>;
}
