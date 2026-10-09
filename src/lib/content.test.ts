import { describe, expect, it } from 'vitest';

import { projects, siteCopy } from '../data/content';
import { localizedPath } from './i18n';

const shapeOf = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(shapeOf);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, shapeOf(child)]));
  }
  return typeof value;
};

describe('portfolio content contract', () => {
  it('keeps both locales structurally complete', () => {
    expect(shapeOf(siteCopy.zh)).toEqual(shapeOf(siteCopy.en));
    for (const project of projects) {
      expect(shapeOf(project.copy.zh)).toEqual(shapeOf(project.copy.en));
    }
  });

  it('keeps project identities independent and localized', () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toEqual(['pitchcue', 'kefu', 'voting-system', 'aws-hackathon']);

    for (const project of projects) {
      expect(project.copy.zh.title).toBeTruthy();
      expect(project.copy.en.title).toBeTruthy();
      expect(project.copy.zh.sections.map((section) => section.id)).toEqual(
        project.copy.en.sections.map((section) => section.id),
      );
    }
  });

  it('does not contain placeholders or fabricated external contact links', () => {
    const serialized = JSON.stringify({ siteCopy, projects });
    expect(serialized).not.toMatch(/TODO|coming soon|待補/i);
    expect(serialized).not.toMatch(/https?:\/\//i);
  });

  it('builds stable deep links for both locales', () => {
    expect(localizedPath('zh', '/projects/pitchcue/')).toBe('/zh/projects/pitchcue/');
    expect(localizedPath('en', '/zh/projects/pitchcue/')).toBe('/en/projects/pitchcue/');
    expect(localizedPath('zh', '/en/projects/voting-system')).toBe('/zh/projects/voting-system/');
    expect(localizedPath('en', '/projects/kefu')).toBe('/en/projects/kefu/');
  });
});
