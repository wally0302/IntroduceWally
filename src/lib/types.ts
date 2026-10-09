export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];
export type Localized<T> = Record<Locale, T>;
export type ProjectSlug = 'pitchcue' | 'kefu' | 'voting-system' | 'aws-hackathon';

export interface StorySection {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  points?: string[];
}

export interface ProjectCopy {
  title: string;
  question: string;
  summary: string;
  category: string;
  status: string;
  role: string;
  theme: string;
  insights: [string, string, string];
  takeaway: string;
  sections: StorySection[];
}

export interface Project {
  slug: ProjectSlug;
  number: string;
  visibility: 'public' | 'anonymized';
  accent: string;
  copy: Localized<ProjectCopy>;
}

export interface JourneyItem {
  year: string;
  title: string;
  body: string;
  keywords: string;
}

export interface Principle {
  number: string;
  title: string;
  body: string;
  project?: ProjectSlug;
}

export interface SiteCopy {
  nav: { work: string; journey: string; about: string; contact: string; menu: string; close: string; skip: string };
  hero: { title: [string, string]; description: string; explore: string; growth: string };
  work: { eyebrow: string; title: string; read: string; product: string; thinking: string; illustration: string; hint: string };
  journey: { eyebrow: string; title: string; intro: string; items: JourneyItem[] };
  principles: { eyebrow: string; title: string; intro: string; items: Principle[]; evidence: string };
  contact: { eyebrow: string; title: [string, string]; body: string; location: string; resume: string; email: string; linkedin: string };
  footer: { note: string; top: string };
  caseStudy: { back: string; overview: string; role: string; status: string; context: string; takeaway: string; next: string; illustration: string; contents: string };
}
