// childrenCompatibilityRule.test.ts

import { childrenCompatibilityRule } from '../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../helpers/createTestAdopter';
import { createTestPet } from '../../../helpers/createTestPet';
import { SCORE } from '../../../../services/matching/utils/scoring.utils';

describe('childrenCompatibilityRule', () => {
  it('returns LOW when no young children', () => {
    const adopter = createTestAdopter({
      kidsAge: 'none',
    });

    const pet = createTestPet({
      socialNeed: 'very_high',
      affectionLevel: 'very_high',
    });

    const result = childrenCompatibilityRule({ adopter, pet });

    expect(result.value).toBe(SCORE.LOW);
  });

  it('returns NEGATIVE for high attention pet with young children', () => {
    const adopter = createTestAdopter({
      kidsAge: 'under_ten',
    });

    const pet = createTestPet({
      socialNeed: 'very_high',
      affectionLevel: 'very_high',
    });

    const result = childrenCompatibilityRule({ adopter, pet });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });

  it('returns LOW for moderate mismatch', () => {
    const adopter = createTestAdopter({
      kidsAge: 'under_ten',
    });

    const pet = createTestPet({
      socialNeed: 'high',
      affectionLevel: 'medium',
    });

    const result = childrenCompatibilityRule({ adopter, pet });

    expect(result.value).toBe(SCORE.LOW);
  });
});