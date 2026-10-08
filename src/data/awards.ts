import type { Localized } from '@/lib/types';

export type AwardCategory = 'award' | 'competition' | 'certificate' | 'recognition';

export interface AwardRecord {
  id: string;
  category: AwardCategory;
  year: number;
  month: string;
  title: Localized<string>;
  event: Localized<string>;
  result: Localized<string>;
  issuer?: Localized<string>;
  projectName?: string;
  context: Localized<string>;
  image: string;
  imageSize?: { width: number; height: number };
  placeholder: boolean;
}

const image = '/awards/futuremode-sitcon-hackathon.jpeg';

export const awards: AwardRecord[] = [
  { id: 'ntue-entrepreneurship-2026', category: 'award', year: 2026, month: '05', title: { zh: '最佳潛力獎', en: 'Best Potential Award' }, event: { zh: '2026 NTUE 校園創業競賽', en: '2026 NTUE Campus Entrepreneurship Competition' }, result: { zh: '最佳潛力獎', en: 'Best Potential Award' }, projectName: 'OOTT', context: { zh: '以 OOTT 參與校園創業競賽。', en: 'Participated with OOTT in a campus entrepreneurship competition.' }, image, placeholder: true },
  { id: 'nantou-digital-hackathon-2023', category: 'award', year: 2023, month: '12', title: { zh: '銀獎', en: 'Silver Award' }, event: { zh: '南投縣 2023 山城數位黑客松競賽', en: 'Nantou 2023 Digital Hackathon' }, result: { zh: '銀獎', en: 'Silver Award' }, issuer: { zh: '南投縣政府', en: 'Nantou County Government' }, context: { zh: '在山城數位黑客松競賽中獲得銀獎。', en: 'Received a Silver Award at the Nantou Digital Hackathon.' }, image: '/awards/nantou-digital-hackathon-2023-silver.jpeg', imageSize: { width: 906, height: 1280 }, placeholder: false },
  { id: 'future-innovator-workshop-2022', category: 'award', year: 2022, month: '10', title: { zh: '第一名', en: 'First Place' }, event: { zh: '「未來創新者工作坊」', en: 'Future Innovator Workshop' }, result: { zh: '第一名', en: 'First Place' }, issuer: { zh: '教育部青年發展署', en: 'Youth Development Administration, MOE' }, context: { zh: '參與未來創新者工作坊並獲得第一名。', en: 'Participated in the Future Innovator Workshop and placed first.' }, image, placeholder: true },
  { id: 'new-taipei-ai-smart-city-hackathon-2026', category: 'competition', year: 2026, month: '09', title: { zh: '新北市 AI 智慧城市黑客松', en: 'New Taipei AI Smart City Hackathon' }, event: { zh: '2026 新北市 AI 智慧城市黑客松競賽', en: '2026 New Taipei AI Smart City Hackathon' }, result: { zh: '完賽', en: 'Completed' }, context: { zh: '完成 2026 新北市 AI 智慧城市黑客松。', en: 'Completed the 2026 New Taipei AI Smart City Hackathon.' }, image, placeholder: true },
  { id: 'futuremode-sitcon-hackathon-2026', category: 'competition', year: 2026, month: '09', title: { zh: 'FUTUREMODE × SITCON', en: 'FUTUREMODE × SITCON' }, event: { zh: 'FUTUREMODE X SITCON Hackathon', en: 'FUTUREMODE X SITCON Hackathon' }, result: { zh: '參賽', en: 'Participation' }, context: { zh: '參與 FUTUREMODE × SITCON Hackathon。', en: 'Participated in the FUTUREMODE × SITCON Hackathon.' }, image, placeholder: false },
  { id: 'international-youth-entrepreneurship-2026', category: 'competition', year: 2026, month: '05', title: { zh: '國際青年創業家競賽', en: 'International Youth Entrepreneurship Competition' }, event: { zh: '2026 國際青年創業家競賽', en: '2026 International Youth Entrepreneurship Competition' }, result: { zh: '參賽', en: 'Participation' }, projectName: 'OOTT', context: { zh: '以 OOTT 參與國際青年創業家競賽。', en: 'Participated with OOTT in an international youth entrepreneurship competition.' }, image, placeholder: true },
  { id: 'startup-alliance-competition-2025', category: 'certificate', year: 2025, month: '11', title: { zh: '創業大聯盟培訓證明', en: 'Startup Alliance Training Certificate' }, event: { zh: '創業綻放－創業大聯盟競賽', en: 'Startup Bloom — Startup Alliance Competition' }, result: { zh: '完課／培訓證明', en: 'Training / course completion' }, issuer: { zh: '國家發展委員會', en: 'National Development Council' }, context: { zh: '完成線上培訓課程。', en: 'Completed the online training course.' }, image, placeholder: true },
  { id: 'reading-cafe-speaker-recognition-2025', category: 'recognition', year: 2025, month: '08', title: { zh: '講師感謝狀', en: 'Speaker Recognition' }, event: { zh: '閱人咖啡館', en: 'Reading Cafe' }, result: { zh: '講師感謝狀', en: 'Speaker recognition' }, issuer: { zh: '國立暨南國際大學學務處', en: 'Office of Student Affairs, NCNU' }, context: { zh: '獲頒閱人咖啡館講師感謝狀。', en: 'Received speaker recognition from Reading Cafe.' }, image, placeholder: true },
  { id: 'silicon-valley-research-institute-2025', category: 'certificate', year: 2025, month: '03', title: { zh: '結業證明', en: 'Certificate of Completion' }, event: { zh: 'Silicon Valley Research Institute Certificate', en: 'Silicon Valley Research Institute Certificate' }, result: { zh: '結業證明', en: 'Certificate of completion' }, issuer: { zh: 'Silicon Valley Research Institute', en: 'Silicon Valley Research Institute' }, context: { zh: '持有 Silicon Valley Research Institute 結業證明。', en: 'Holds a Silicon Valley Research Institute certificate of completion.' }, image, placeholder: true },
  { id: 'rotary-youth-leadership-awards-2025', category: 'certificate', year: 2025, month: '03', title: { zh: 'RYLA 結業證書', en: 'RYLA Program Completion' }, event: { zh: '扶輪青年領袖獎研習營（RYLA）', en: 'Rotary Youth Leadership Awards (RYLA)' }, result: { zh: '結業', en: 'Program completion' }, issuer: { zh: '國際扶輪 3482 地區', en: 'Rotary District 3482' }, context: { zh: '完成扶輪青年領袖獎研習營。', en: 'Completed the Rotary Youth Leadership Awards program.' }, image, placeholder: true },
  { id: 'google-solution-challenge-2024', category: 'competition', year: 2024, month: '01', title: { zh: 'Google Solution Challenge', en: 'Google Solution Challenge' }, event: { zh: 'Google Solution Challenge', en: 'Google Solution Challenge' }, result: { zh: '參賽／證明', en: 'Participation / certificate' }, issuer: { zh: 'Google', en: 'Google' }, context: { zh: '參與 Google Solution Challenge。', en: 'Participated in the Google Solution Challenge.' }, image, placeholder: true },
];

export const awardLabels: Localized<Record<AwardCategory, string>> = {
  zh: { award: '獎項', competition: '競賽參與', certificate: '證書', recognition: '公開肯定' },
  en: { award: 'Award', competition: 'Competition', certificate: 'Certificate', recognition: 'Recognition' },
};
