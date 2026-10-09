import { describe, expect, it } from 'vitest';
import { elapsedDays, buildAppealDraft, exportAppealDraft } from './appeal-demo';

const sources = [
  { id: 'rule', title: 'Rule A', text: 'Included rule.' },
  { id: 'record', title: 'Record B', text: 'Evidence record.' },
  { id: 'prior', title: 'Prior case C', text: 'Comparison material.', comparison: true },
];

describe('appeal demo data integrity', () => {
  it('computes calendar differences and rejects missing, invalid or reversed dates', () => {
    expect(elapsedDays('2026-09-18', '2026-10-06')).toBe(18);
    expect(elapsedDays('2024-02-28', '2024-03-01')).toBe(2);
    expect(elapsedDays('2026-09-18', '2026-09-18')).toBe(0);
    for (const end of ['', '2026-02-30', '2026-09-17']) expect(elapsedDays('2026-09-18', end)).toBeNull();
  });
  it('includes only selected references, excluding comparison cases even if selected', () => {
    for (const locale of ['zh', 'en'] as const) {
      const draft = buildAppealDraft({ locale, filedDate: '2026-10-08', selected: ['record', 'prior'], sources });
      expect(draft).toContain('2026-10-08');
      expect(draft).toContain('Evidence record.');
      expect(draft).not.toContain('Included rule.');
      expect(draft).not.toContain('Comparison material.');
      expect(buildAppealDraft({ locale, filedDate: '2026-10-08', selected: ['prior'], sources })).toBe('');
    }
  });
  it('exports edits and human notes with a persistent simulation label', () => {
    const output = exportAppealDraft('My edited draft', 'Check the photograph', 'en');
    expect(output).toContain('FICTIONAL DEMO');
    expect(output).toContain('My edited draft');
    expect(output).toContain('Check the photograph');
    expect(exportAppealDraft('修改草稿', '', 'zh')).toContain('非正式決定書');
  });
});
