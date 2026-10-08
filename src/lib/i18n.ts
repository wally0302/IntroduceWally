import { locales, type Locale } from './types';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(locale: Locale, pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (isLocale(segments[0] ?? '')) segments.shift();
  return `/${[locale, ...segments].join('/')}/`;
}

export const localeStorageKey = 'wally-language';
