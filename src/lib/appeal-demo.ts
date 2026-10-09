import type { Locale } from './types';

export function elapsedDays(start: string, end: string): number | null {
  const parse = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(date.valueOf()) && date.toISOString().slice(0, 10) === value ? date.valueOf() : NaN;
  };
  const days = (parse(end) - parse(start)) / 86400000;
  return Number.isFinite(days) && days >= 0 ? days : null;
}

export function buildAppealDraft(input: {
  locale: Locale;
  filedDate: string;
  selected: string[];
  sources: { id: string; title: string; text: string; comparison?: boolean }[];
}) {
  const selected = input.sources.filter(source => input.selected.includes(source.id) && !source.comparison);
  if (!selected.length) return '';
  const citations = selected.map((source, index) => `[${index + 1}] ${source.title}\n${source.text}`).join('\n\n');
  return input.locale === 'zh'
    ? `【虛構案件・展示草稿】\n\n主文\n本件處理方向待承辦人審閱後擬具，送交委員會決定。\n\n事實\n林○○不服城南區環境管理處 2026-09-18 之廢棄物棄置罰鍰，於 ${input.filedDate} 提起訴願。訴願人否認為行為人；機關以現場照片與稽查紀錄答辯。\n\n理由（預編寫示範）\n本案待釐清現場資料與行為人的連結。以下僅整理承辦人已選取的依據；尚未回答的爭點仍須人工確認。\n\n${citations}\n\n待確認事項\n現場照片是否足以辨識行為人？是否需要補充調查？`
    : `[FICTIONAL CASE · DEMO DRAFT]\n\nORDER\nThe case owner must review the proposed disposition before submission to the committee.\n\nFACTS\nLin appealed on ${input.filedDate} against a waste disposal fine issued by the South City Environmental Office on 2026-09-18. The appellant denies being the actor; the agency relies on site photos and an inspection record.\n\nREASONS (pre-written illustration)\nThe link between the site evidence and the actor remains unresolved. Only references selected by the case owner are included below. Open issues require human review.\n\n${citations}\n\nOPEN QUESTIONS\nDo the photos identify the actor? Is further investigation required?`;
}

export function exportAppealDraft(draft: string, note: string, locale: Locale) {
  const label = locale === 'zh' ? '虛構示範・非正式決定書' : 'FICTIONAL DEMO · NOT AN OFFICIAL DECISION';
  return `${label}\n\n${draft}${note.trim() ? `\n\n${locale === 'zh' ? '承辦人備註' : 'CASE OWNER NOTE'}\n${note.trim()}` : ''}\n`;
}
