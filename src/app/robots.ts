import type { MetadataRoute } from 'next';
import { publicOrigin } from '@/lib/metadata';

export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  return publicOrigin ? { rules: { userAgent: '*', allow: '/' }, sitemap: `${publicOrigin.replace(/\/$/, '')}/sitemap.xml` } : { rules: { userAgent: '*', disallow: '/' } };
}
