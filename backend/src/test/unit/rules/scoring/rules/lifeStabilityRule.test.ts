// lifeStabilityRule.tst.ts

import { lifeStabilityRule } from '../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../helpers/createTestBird';
import { SCORE } from '../../../../../services/matching/utils/scoring.utils';

describe('lifeStabilityRule', () => {

  // CRITICAL (gap <= -2)
  it('returns CRITICAL when stability is far below requirement', () => {
    const result = lifeStabilityRule({
      adopter: createTestAdopter({ lifeStability: 'low' }), // 0
      pet: createTestBird({ lifespanYears: 20 }), // required = 2
    });

    expect(result.value).toBe(SCORE.CRITICAL);
  });

  // NEGATIVE (gap === -1)
  it('returns NEGATIVE when stability is slightly below requirement', () => {
    const result = lifeStabilityRule({
      adopter: createTestAdopter({ lifeStability: 'medium' }), // 1
      pet: createTestBird({ lifespanYears: 20 }), // required = 2
    });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });

  // MEDIUM (gap === 0)
  it('returns MEDIUM when stability matches requirement', () => {
    const result = lifeStabilityRule({
      adopter: createTestAdopter({ lifeStability: 'medium' }), // 1
      pet: createTestBird({ lifespanYears: 10 }), // required = 1
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  // HIGH (gap > 0)
  it('returns HIGH when stability exceeds requirement', () => {
    const result = lifeStabilityRule({
      adopter: createTestAdopter({ lifeStability: 'high' }), // 2
      pet: createTestBird({ lifespanYears: 5 }), // required = 0
    });

    expect(result.value).toBe(SCORE.HIGH);
  });

  // Edge: short-lived pet with low stability
  it('returns MEDIUM for low stability with short-lived pet', () => {
    const result = lifeStabilityRule({
      adopter: createTestAdopter({ lifeStability: 'low' }), // 0
      pet: createTestBird({ lifespanYears: 3 }), // required = 0
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

});