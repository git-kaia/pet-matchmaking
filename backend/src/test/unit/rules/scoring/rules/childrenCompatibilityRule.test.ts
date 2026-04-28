// childrenCompatibilityRule.tes.ts

import { childrenCompatibilityRule } from '../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../helpers/createTestBird';
import { SCORE } from '../../../../../services/matching/utils/scoring.utils';

describe('childrenCompatibilityRule', () => {

  ///////////////////////////////
  // No young children
  ///////////////////////////////

  it('returns LOW when there are no children', () => {
    const result = childrenCompatibilityRule({
      adopter: createTestAdopter({ kidsAge: 'none' }),
      pet: createTestBird({
        socialNeed: 'high',
        affectionLevel: 'high',
      }),
    });

    expect(result.value).toBe(SCORE.LOW);
  });

  it('returns LOW when children are over ten (rule should not apply)', () => {
    const result = childrenCompatibilityRule({
      adopter: createTestAdopter({ kidsAge: 'over_ten' }),
      pet: createTestBird({
        socialNeed: 'high',
        affectionLevel: 'high',
      }),
    });

    expect(result.value).toBe(SCORE.LOW);
  });

  ///////////////////////////////
  // Worst case
  ///////////////////////////////

  it('returns NEGATIVE for high social + high affection with young children', () => {
    const result = childrenCompatibilityRule({
      adopter: createTestAdopter({ kidsAge: 'under_ten' }),
      pet: createTestBird({
        socialNeed: 'high',
        affectionLevel: 'high',
      }),
    });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });

  ///////////////////////////////
  // Moderate mismatch
  ///////////////////////////////

  it('returns LOW for high social only with young children', () => {
    const result = childrenCompatibilityRule({
      adopter: createTestAdopter({ kidsAge: 'under_ten' }),
      pet: createTestBird({
        socialNeed: 'high',
        affectionLevel: 'low',
      }),
    });

    expect(result.value).toBe(SCORE.LOW);
  });

  it('returns LOW for high affection only with young children', () => {
    const result = childrenCompatibilityRule({
      adopter: createTestAdopter({ kidsAge: 'under_ten' }),
      pet: createTestBird({
        socialNeed: 'low',
        affectionLevel: 'high',
      }),
    });

    expect(result.value).toBe(SCORE.LOW);
  });

  ///////////////////////////////
  // Good case
  ///////////////////////////////

  it('returns MEDIUM for low needs with young children', () => {
    const result = childrenCompatibilityRule({
      adopter: createTestAdopter({ kidsAge: 'under_ten' }),
      pet: createTestBird({
        socialNeed: 'low',
        affectionLevel: 'low',
      }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

});