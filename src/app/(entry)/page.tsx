import { Home } from '@/components/Home';
import { EntryPreference } from '@/components/EntryPreference';
import { pageMetadata } from '@/lib/metadata';
import { siteCopy } from '@/data/content';

export const metadata = pageMetadata('zh', 'Wally Huang — 看見產品背後的判斷', siteCopy.zh.hero.description);

export default function EntryPage() {
  return <><Home locale="zh"/><EntryPreference/></>;
}
