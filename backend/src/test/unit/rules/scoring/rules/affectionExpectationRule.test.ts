// affectionExpectationRule.test.ts

import { affectionExpectationRule } from '../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../helpers/createTestBird';
import { SCORE } from '../../../../../services/matching/utils/scoring.utils';

describe('affectionExpectationRule', () => {

  it('returns MEDIUM for perfect match (distance 0)', () => {
    const result = affectionExpectationRule({
      adopter: createTestAdopter({
        desiredPetAffectionLevel: 'medium',
      }),
      pet: createTestBird({
        affectionLevel: 'medium',
      }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  it('returns LOW for moderate mismatch (distance 1)', () => {
    const result = affectionExpectationRule({
      adopter: createTestAdopter({
        desiredPetAffectionLevel: 'medium',
      }),
      pet: createTestBird({
        affectionLevel: 'high',
      }),
    });

    expect(result.value).toBe(SCORE.LOW);
  });

  it('returns NEGATIVE for large mismatch (distance 2)', () => {
    const result = affectionExpectationRule({
      adopter: createTestAdopter({
        desiredPetAffectionLevel: 'low',
      }),
      pet: createTestBird({
        affectionLevel: 'high',
      }),
    });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });

  it('returns NEGATIVE for extreme mismatch (distance >= 2)', () => {
    const result = affectionExpectationRule({
      adopter: createTestAdopter({
        desiredPetAffectionLevel: 'very_low',
      }),
      pet: createTestBird({
        affectionLevel: 'very_high',
      }),
    });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });

});