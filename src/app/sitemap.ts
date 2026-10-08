import type { MetadataRoute } from 'next';
import { projects } from '@/data/content';
import { publicOrigin } from '@/lib/metadata';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!publicOrigin) return [];
  const origin = publicOrigin.replace(/\/$/, '');
  return ['', ...projects.map(project => `projects/${project.slug}/`)].flatMap(path => (['zh', 'en'] as const).map(locale => ({ url: `${origin}/${locale}/${path}`, alternates: { languages: { 'zh-Hant': `${origin}/zh/${path}`, en: `${origin}/en/${path}` } } })));
}
