export type QuestionKey = 'payment' | 'cancellation' | 'capacity';
export type Answer = 0 | 1 | null;
export type Answers = Record<QuestionKey, Answer>;
export type Locale = 'zh' | 'en';
export type Role = 'pm' | 'ui' | 'eng' | 'qa';

export const emptyAnswers: Answers = { payment: null, cancellation: null, capacity: null };
export const defaultAnswers: Answers = { payment: 0, cancellation: 0, capacity: 0 };
export const questionKeys: QuestionKey[] = ['payment', 'cancellation', 'capacity'];

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface QuestionOption {
  answer: LocalizedText;
  rule: LocalizedText;
  impact: LocalizedText;
}

export interface DemoQuestion {
  id: QuestionKey;
  requirementId: 'R-001' | 'R-002' | 'R-003';
  sourceId: 'S-002' | 'S-003' | 'S-004';
  label: LocalizedText;
  question: LocalizedText;
  why: LocalizedText;
  options: [QuestionOption, QuestionOption];
}

// All scenario text and outputs below are fictional portfolio demo data.
export const questions: DemoQuestion[] = [
  {
    id: 'payment',
    requirementId: 'R-001',
    sourceId: 'S-002',
    label: { zh: '付款方式', en: 'Payment timing' },
    question: {
      zh: '陶藝工作坊每人 NT$1,200，預約時要如何付款？',
      en: 'The ceramics workshop costs NT$1,200 per person. When should guests pay?',
    },
    why: {
      zh: '付款時間會影響預約確認流程與現場收款安排。',
      en: 'Payment timing affects booking confirmation and payment handling at the studio.',
    },
    options: [
      {
        answer: { zh: '預約時付 NT$300 訂金', en: 'Pay a NT$300 deposit when booking' },
        rule: { zh: '預約時收取每人 NT$300 訂金。', en: 'Collect a NT$300 deposit per person at booking.' },
        impact: { zh: '預約流程需收取訂金；其餘款項的收取方式未定。', en: 'Booking collects a deposit; how the remaining balance is collected is unresolved.' },
      },
      {
        answer: { zh: '到場時支付 NT$1,200', en: 'Pay NT$1,200 on arrival' },
        rule: { zh: '到場時收取每人 NT$1,200。', en: 'Collect NT$1,200 per person on arrival.' },
        impact: { zh: '預約時不收款；現場需收取完整費用。', en: 'No payment is collected at booking; collect the full price at the studio.' },
      },
    ],
  },
  {
    id: 'cancellation',
    requirementId: 'R-002',
    sourceId: 'S-003',
    label: { zh: '取消預約', en: 'Cancellation' },
    question: { zh: '顧客要如何取消預約？', en: 'How should a guest cancel a booking?' },
    why: {
      zh: '取消規則會決定顧客可自行操作的時機，以及工作室如何處理較晚的取消。',
      en: 'The cancellation rule determines when guests can act themselves and how the studio handles later requests.',
    },
    options: [
      {
        answer: { zh: '開始前 24 小時以前可自行取消', en: 'Allow self-service cancellation at least 24 hours before start' },
        rule: { zh: '開始前至少 24 小時可自行取消。', en: 'Self-service cancellation is available at least 24 hours before the start.' },
        impact: { zh: '開始前不足 24 小時時，不提供自行取消；後續處理方式未定。', en: 'Self-service cancellation is unavailable within 24 hours of the start; further handling is unresolved.' },
      },
      {
        answer: { zh: '聯絡工作室處理，不自動取消', en: 'Contact the studio; do not cancel automatically' },
        rule: { zh: '顧客需聯絡工作室處理，系統不自動取消。', en: 'The guest must contact the studio; the system does not cancel automatically.' },
        impact: { zh: '取消需由工作室聯絡處理；聯絡管道與處理時限未定。', en: 'Cancellation is handled through studio contact; contact channel and response time are unresolved.' },
      },
    ],
  },
  {
    id: 'capacity',
    requirementId: 'R-003',
    sourceId: 'S-004',
    label: { zh: '每場名額', en: 'Seats per session' },
    question: { zh: '每場工作坊要開放幾個名額？', en: 'How many seats should each workshop session offer?' },
    why: {
      zh: '名額會決定可預約人數與場次的剩餘座位。',
      en: 'Capacity determines how many guests can book and how remaining seats are shown.',
    },
    options: [
      {
        answer: { zh: '每場 4 個名額', en: '4 seats per session' },
        rule: { zh: '每場最多 4 人。', en: 'Each session has up to 4 seats.' },
        impact: { zh: '預約最多接受 4 人；超過人數不可完成此場預約。', en: 'A booking can include up to 4 people; larger groups cannot complete this session booking.' },
      },
      {
        answer: { zh: '每場 1 個名額', en: '1 seat per session' },
        rule: { zh: '每場最多 1 人。', en: 'Each session has up to 1 seat.' },
        impact: { zh: '預約最多接受 1 人；其他座位與加開安排未定。', en: 'A booking can include up to 1 person; other seat and additional-session arrangements are unresolved.' },
      },
    ],
  },
];

export interface DemoRules {
  payment: 'deposit' | 'arrival' | null;
  cancellation: 'self' | 'contact' | null;
  capacity: 4 | 1 | null;
  confirmedCount: number;
}

export function deriveRules(answers: Answers): DemoRules {
  return {
    payment: answers.payment === 0 ? 'deposit' : answers.payment === 1 ? 'arrival' : null,
    cancellation: answers.cancellation === 0 ? 'self' : answers.cancellation === 1 ? 'contact' : null,
    capacity: answers.capacity === 0 ? 4 : answers.capacity === 1 ? 1 : null,
    confirmedCount: questionKeys.filter(key => answers[key] !== null).length,
  };
}

export function canCancel(rules: DemoRules, hoursBefore: number): boolean {
  return rules.cancellation === 'self' && hoursBefore >= 24;
}

export interface SpecLine {
  id: DemoQuestion['requirementId'];
  source: DemoQuestion['sourceId'];
  text: string;
  status: 'confirmed' | 'unresolved';
}

function roleDetail(question: DemoQuestion, role: Role, answer: 0 | 1, locale: Locale, answers: Answers): string {
  const zh = locale === 'zh';
  if (role === 'pm') return question.options[answer].answer[locale];

  if (role === 'ui') {
    if (question.id === 'payment') {
      return answer === 0
        ? (zh ? '顯示每人 NT$300 訂金，按鈕標示「模擬付訂金並預約」。' : 'Show a NT$300 deposit per person and label the button “Simulate deposit & book.”')
        : (zh ? '顯示預約應付 NT$0、每人到場付 NT$1,200，按鈕標示「確認模擬預約」。' : 'Show NT$0 due at booking and NT$1,200 per person on arrival; label the button “Confirm simulated booking.”');
    }
    if (question.id === 'cancellation') {
      return answer === 0
        ? (zh ? '顯示提前至少 24 小時可自行取消；開始前 12 小時不可自行取消。' : 'Show self-cancellation at least 24 hours ahead; self-cancellation is unavailable 12 hours before start.')
        : (zh ? '顯示「聯絡工作室」取消方式，不提供自動取消操作。' : 'Show “Contact the studio” for cancellation; provide no automatic-cancel action.');
    }
    return answer === 0
      ? (zh ? '顯示每場 4 席；人數選擇上限為 4。' : 'Show 4 seats per session; cap the guest selector at 4.')
      : (zh ? '顯示每場 1 席；人數選擇上限為 1。' : 'Show 1 seat per session; cap the guest selector at 1.');
  }

  if (role === 'eng') {
    if (question.id === 'payment') {
      return answer === 0
        ? (zh ? '設定 payment_mode=deposit、deposit_per_guest=300（NT$）。' : 'Set payment_mode=deposit and deposit_per_guest=300 (NT$).')
        : (zh ? '設定 payment_mode=arrival、amount_due_per_guest=1200（NT$）。' : 'Set payment_mode=arrival and amount_due_per_guest=1200 (NT$).');
    }
    if (question.id === 'cancellation') {
      return answer === 0
        ? (zh ? '設定 cancellation_mode=self、self_cancel_min_hours_before=24。' : 'Set cancellation_mode=self and self_cancel_min_hours_before=24.')
        : (zh ? '設定 cancellation_mode=contact、auto_cancel=false。' : 'Set cancellation_mode=contact and auto_cancel=false.');
    }
    return answer === 0
      ? (zh ? '設定 seats_per_session=4，單場人數上限為 4。' : 'Set seats_per_session=4 and cap a session booking at 4 guests.')
      : (zh ? '設定 seats_per_session=1，單場人數上限為 1。' : 'Set seats_per_session=1 and cap a session booking at 1 guest.');
  }

  if (question.id === 'payment') {
    const guests = answers.capacity === 0 ? 2 : 1;
    const arrivalTotal = (guests * 1200).toLocaleString(locale === 'en' ? 'en-US' : 'zh-TW');
    return answer === 0
      ? (zh ? `給定 ${guests} 位顧客，當預約時計算訂金，預期合計 NT$${guests * 300}。` : `Given ${guests} guest${guests === 1 ? '' : 's'}, when the booking deposit is calculated, expect NT$${guests * 300} total.`)
      : (zh ? `給定 ${guests} 位顧客，預約時應付 NT$0；到場時應收合計 NT$${arrivalTotal}。` : `Given ${guests} guest${guests === 1 ? '' : 's'}, expect NT$0 due at booking and NT$${arrivalTotal} collected on arrival.`)
  }
  if (question.id === 'cancellation') {
    return answer === 0
      ? (zh ? '給定自行取消規則，開始前 48 小時取消應成功；12 小時前取消應被阻止。' : 'Given self-cancellation, a request 48 hours before start succeeds; one 12 hours before is blocked.')
      : (zh ? '給定需聯絡工作室，預約不應自動取消。' : 'Given studio-contact cancellation, the booking must not cancel automatically.')
  }
  return answer === 0
    ? (zh ? '給定每場 4 席，選到 4 人後，增加人數操作應停用。' : 'Given 4 seats per session, disable increasing guest count after it reaches 4.')
    : (zh ? '給定每場 1 席，選到 1 人後，增加人數操作應停用。' : 'Given 1 seat per session, disable increasing guest count after it reaches 1.')
}

export function specFor(role: Role, answers: Answers, locale: Locale): SpecLine[] {
  return questions.map(question => {
    const choice = answers[question.id];
    const detail = choice === null
      ? locale === 'zh' ? '尚未決定，待確認。' : 'Unresolved; confirmation is still needed.'
      : roleDetail(question, role, choice, locale, answers);

    return {
      id: question.requirementId,
      source: question.sourceId,
      text: detail,
      status: choice === null ? 'unresolved' : 'confirmed',
    };
  });
}
