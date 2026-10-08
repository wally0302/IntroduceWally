import type { Metadata } from 'next';
import type { Locale } from './types';

export const publicOrigin = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);

export function pageMetadata(locale: Locale, title: string, description: string, suffix = ''): Metadata {
  const path = `/${locale}/${suffix}`;
  return {
    title,
    description,
    icons: { icon: '/icon.svg' },
    metadataBase: publicOrigin ? new URL(publicOrigin) : undefined,
    alternates: {
      canonical: publicOrigin ? new URL(path, publicOrigin).toString() : undefined,
      languages: { 'zh-Hant': `/zh/${suffix}`, en: `/en/${suffix}`, 'x-default': `/zh/${suffix}` },
    },
    openGraph: { title, description, type: 'website', siteName: 'Wally Huang', locale: locale === 'zh' ? 'zh_TW' : 'en_US', alternateLocale: locale === 'zh' ? 'en_US' : 'zh_TW', ...(publicOrigin ? { url: new URL(path, publicOrigin).toString(), images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Wally Huang — Product Manager' }] } : {}) },
    twitter: { card: 'summary_large_image', title, description, ...(publicOrigin ? { images: ['/og.png'] } : {}) },
    robots: { index: Boolean(publicOrigin), follow: Boolean(publicOrigin) },
  };
}
