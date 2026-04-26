// noiseToleranceRule.unit.test.ts

import { noiseToleranceRule } from '../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../helpers/createTestAdopter';
import { createTestPet } from '../../../helpers/createTestPet';
import { SCORE } from '../../../../services/matching/utils/scoring.utils';

describe('noiseToleranceRule', () => {
  it('returns LOW for perfect match', () => {
    const adopter = createTestAdopter({
      noiseToleranceLevel: 'medium',
    });

    const pet = createTestPet({
      noiseLevel: 'medium',
    });

    const result = noiseToleranceRule({ adopter, pet });

    expect(result.value).toBe(SCORE.LOW);
  });

  it('returns NEGATIVE for high mismatch', () => {
    const adopter = createTestAdopter({
      noiseToleranceLevel: 'low',
    });

    const pet = createTestPet({
      noiseLevel: 'very_high',
    });

    const result = noiseToleranceRule({ adopter, pet });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });
});

