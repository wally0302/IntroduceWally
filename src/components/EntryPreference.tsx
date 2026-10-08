'use client';

import { useEffect } from 'react';
import { isLocale, localeStorageKey } from '@/lib/i18n';

export function EntryPreference() {
  useEffect(() => {
    let locale = 'zh';
    try { const saved = localStorage.getItem(localeStorageKey); if (saved && isLocale(saved)) locale = saved; } catch { /* The Chinese default works without storage. */ }
    window.location.replace(`/${locale}/${window.location.hash}`);
  }, []);
  return null;
}
