import { describe, expect, it } from 'vitest';
import {
  canCancel,
  defaultAnswers,
  deriveRules,
  emptyAnswers,
  questionKeys,
  questions,
  specFor,
  type Answers,
  type Role,
} from './beachcomber-demo';

const roles: Role[] = ['pm', 'ui', 'eng', 'qa'];
const choices = [null, 0, 1] as const;

describe('fictional ceramics booking decision model', () => {
  it('provides independent empty and default answer records', () => {
    expect(emptyAnswers).toEqual({ payment: null, cancellation: null, capacity: null });
    expect(defaultAnswers).toEqual({ payment: 0, cancellation: 0, capacity: 0 });
    emptyAnswers.payment = 1;
    expect(defaultAnswers.payment).toBe(0);
    emptyAnswers.payment = null;
  });

  it('derives exact rules for all 27 answer configurations', () => {
    for (const payment of choices) {
      for (const cancellation of choices) {
        for (const capacity of choices) {
          const answers: Answers = { payment, cancellation, capacity };
          const rules = deriveRules(answers);
          expect(rules.payment).toBe(payment === null ? null : payment === 0 ? 'deposit' : 'arrival');
          expect(rules.cancellation).toBe(cancellation === null ? null : cancellation === 0 ? 'self' : 'contact');
          expect(rules.capacity).toBe(capacity === null ? null : capacity === 0 ? 4 : 1);
          expect(rules.confirmedCount).toBe([payment, cancellation, capacity].filter(value => value !== null).length);
        }
      }
    }
  });

  it('allows self-service cancellation at 24 hours and later only', () => {
    const selfService = deriveRules({ payment: null, cancellation: 0, capacity: null });
    expect(canCancel(selfService, 24)).toBe(true);
    expect(canCancel(selfService, 25)).toBe(true);
    expect(canCancel(selfService, 23.99)).toBe(false);
    expect(canCancel(selfService, -1)).toBe(false);
  });

  it('never automatically cancels when the choice requires contacting the studio or is unresolved', () => {
    expect(canCancel(deriveRules({ payment: null, cancellation: 1, capacity: null }), 48)).toBe(false);
    expect(canCancel(deriveRules({ payment: null, cancellation: null, capacity: null }), 48)).toBe(false);
  });

  it('keeps requirement and source IDs fixed for every role and locale', () => {
    for (const role of roles) {
      for (const locale of ['zh', 'en'] as const) {
        expect(specFor(role, emptyAnswers, locale).map(({ id, source, status }) => ({ id, source, status }))).toEqual(
          questions.map(question => ({ id: question.requirementId, source: question.sourceId, status: 'unresolved' })),
        );
      }
    }
  });

  it('reflects each selected branch in all role summaries without promoting unanswered choices', () => {
    for (const key of questionKeys) {
      for (const answer of [0, 1] as const) {
        const answers: Answers = { ...emptyAnswers, [key]: answer };
        for (const role of roles) {
          const lines = specFor(role, answers, 'en');
          const line = lines[questionKeys.indexOf(key)];
          const unanswered = lines.filter((_, index) => questionKeys[index] !== key);
          const question = questions.find(item => item.id === key)!;
          const option = question.options[answer];
          const expectedText = role === 'pm'
            ? option.answer.en
            : role === 'ui' && key === 'payment'
              ? answer === 0 ? 'NT$300 deposit per person' : 'NT$0 due at booking'
              : role === 'ui' && key === 'cancellation'
                ? answer === 0 ? '24 hours ahead' : 'Contact the studio'
                : role === 'ui'
                  ? answer === 0 ? 'cap the guest selector at 4' : 'cap the guest selector at 1'
                  : role === 'eng' && key === 'payment'
                    ? answer === 0 ? 'payment_mode=deposit' : 'payment_mode=arrival'
                    : role === 'eng' && key === 'cancellation'
                      ? answer === 0 ? 'cancellation_mode=self' : 'auto_cancel=false'
                      : role === 'eng'
                        ? answer === 0 ? 'seats_per_session=4' : 'seats_per_session=1'
                        : key === 'payment'
            ? answer === 0 ? 'expect NT$300 total' : 'expect NT$0 due at booking and NT$1,200 collected on arrival'
                          : key === 'cancellation'
                            ? answer === 0 ? '48 hours before start succeeds' : 'must not cancel automatically'
                            : answer === 0 ? 'reaches 4' : 'reaches 1';

          expect(line).toMatchObject({
            id: question.requirementId,
            source: question.sourceId,
            status: 'confirmed',
          });
          expect(line.text).toContain(expectedText);
          expect(line.text).not.toContain(option.impact.en);
          expect(unanswered.every(item => item.status === 'unresolved' && item.text.includes('Unresolved'))).toBe(true);
        }
      }
    }
  });

  it('keeps payment UI and QA examples consistent with both session capacities', () => {
    for (const capacity of [0, 1] as const) {
      const guests = capacity === 0 ? 2 : 1;
      for (const payment of [0, 1] as const) {
        const answers: Answers = { payment, cancellation: null, capacity };
        const uiLine = specFor('ui', answers, 'en')[0];
        const qaLine = specFor('qa', answers, 'en')[0];
        expect(uiLine.text).toContain(payment === 0 ? 'Simulate deposit & book' : 'Confirm simulated booking');
        if (payment === 0) {
          expect(qaLine.text).toContain(`Given ${guests} guest${guests === 1 ? '' : 's'}`);
          expect(qaLine.text).toContain(`NT$${guests * 300} total`);
        } else {
          expect(uiLine.text).toContain('NT$0 due at booking');
          expect(uiLine.text).toContain('NT$1,200 per person on arrival');
          expect(qaLine.text).toContain(`NT$0 due at booking and NT$${(guests * 1200).toLocaleString('en-US')} collected on arrival`);
        }
      }
    }
  });
});
