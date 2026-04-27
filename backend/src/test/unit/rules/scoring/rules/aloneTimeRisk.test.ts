// aloneTimeRisk.unit.test.ts

import { aloneTimeRiskRule } from '../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../helpers/createTestBird';
import { SCORE } from '../../../../../services/matching/utils/scoring.utils';

describe('aloneTimeRiskRule', () => {

  // CRITICAL
  it('returns CRITICAL when high alone time + high social need', () => {
    const result = aloneTimeRiskRule({
      adopter: createTestAdopter({ aloneTimeHours: 'high' }),
      pet: createTestBird({ socialNeed: 'high' }),
    });

    expect(result.value).toBe(SCORE.CRITICAL);
  });

  // NEGATIVE (case 1)
  it('returns NEGATIVE when medium alone time + high social need', () => {
    const result = aloneTimeRiskRule({
      adopter: createTestAdopter({ aloneTimeHours: 'medium' }),
      pet: createTestBird({ socialNeed: 'high' }),
    });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });

  // NEGATIVE (case 2)
  it('returns NEGATIVE when high alone time + medium social need', () => {
    const result = aloneTimeRiskRule({
      adopter: createTestAdopter({ aloneTimeHours: 'high' }),
      pet: createTestBird({ socialNeed: 'medium' }),
    });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });

  // HIGH
  it('returns HIGH when low alone time + high social need', () => {
    const result = aloneTimeRiskRule({
      adopter: createTestAdopter({ aloneTimeHours: 'low' }),
      pet: createTestBird({ socialNeed: 'high' }),
    });

    expect(result.value).toBe(SCORE.HIGH);
  });

  // MEDIUM (low need + low alone)
  it('returns MEDIUM when low social need + low alone time', () => {
    const result = aloneTimeRiskRule({
      adopter: createTestAdopter({ aloneTimeHours: 'low' }),
      pet: createTestBird({ socialNeed: 'low' }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  // MEDIUM (low need + medium alone)
  it('returns MEDIUM when low social need + medium alone time', () => {
    const result = aloneTimeRiskRule({
      adopter: createTestAdopter({ aloneTimeHours: 'medium' }),
      pet: createTestBird({ socialNeed: 'low' }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  // DEFAULT
  it('returns LOW for acceptable neutral case (medium + medium)', () => {
    const result = aloneTimeRiskRule({
      adopter: createTestAdopter({ aloneTimeHours: 'medium' }),
      pet: createTestBird({ socialNeed: 'medium' }),
    });

    expect(result.value).toBe(SCORE.LOW);
  });

  // DEFAULT (important edge case)
  it('returns LOW when high alone time + low social need', () => {
    const result = aloneTimeRiskRule({
      adopter: createTestAdopter({ aloneTimeHours: 'high' }),
      pet: createTestBird({ socialNeed: 'low' }),
    });

    expect(result.value).toBe(SCORE.LOW);
  });

});