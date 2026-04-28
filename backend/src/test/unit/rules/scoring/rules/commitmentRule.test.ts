// commitmentRule.test.ts
import { commitmentRule } from '../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../helpers/createTestBird';
import { SCORE } from '../../../../../services/matching/utils/scoring.utils';

describe('commitmentRule', () => {

  // CRITICAL (< 0.5)
  it('returns CRITICAL for very low commitment', () => {
    const result = commitmentRule({
      adopter: createTestAdopter({ commitmentHorizonYears: 5 }),
      pet: createTestBird({ lifespanYears: 20 }),
    });

    expect(result.value).toBe(SCORE.CRITICAL);
  });

  // NEGATIVE (< 1)
  it('returns NEGATIVE for commitment below requirement', () => {
    const result = commitmentRule({
      adopter: createTestAdopter({ commitmentHorizonYears: 10 }),
      pet: createTestBird({ lifespanYears: 20 }),
    });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });

  // MEDIUM (>=1 && <1.5)
  it('returns MEDIUM when commitment matches requirement', () => {
    const result = commitmentRule({
      adopter: createTestAdopter({ commitmentHorizonYears: 20 }),
      pet: createTestBird({ lifespanYears: 20 }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  // HIGH (>=1.5)
  it('returns HIGH for strong commitment', () => {
    const result = commitmentRule({
      adopter: createTestAdopter({ commitmentHorizonYears: 40 }),
      pet: createTestBird({ lifespanYears: 20 }),
    });

    expect(result.value).toBe(SCORE.HIGH);
  });

  // Edge: lifespan cap (very long-lived pet)
  it('uses capped lifespan for very long-lived pets', () => {
    const result = commitmentRule({
      adopter: createTestAdopter({ commitmentHorizonYears: 30 }),
      pet: createTestBird({ lifespanYears: 60 }), // capped to 30
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

});