// noiseToleranceRule.test.ts

import { noiseToleranceRule } from '../../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../../helpers/createTestBird';
import { SCORE } from '../../../../../../services/matching/utils/scoring.utils';

describe('noiseToleranceRule (directional)', () => {

  it('returns MEDIUM when pet noise is below adopter tolerance', () => {
    const result = noiseToleranceRule({
      adopter: createTestAdopter({ noiseToleranceLevel: 'very_high' }),
      pet: createTestBird({ noiseLevel: 'very_low' }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  it('returns MEDIUM when pet noise equals adopter tolerance', () => {
    const result = noiseToleranceRule({
      adopter: createTestAdopter({ noiseToleranceLevel: 'medium' }),
      pet: createTestBird({ noiseLevel: 'medium' }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  it('returns LOW when pet noise is slightly above tolerance', () => {
    const result = noiseToleranceRule({
      adopter: createTestAdopter({ noiseToleranceLevel: 'medium' }),
      pet: createTestBird({ noiseLevel: 'high' }), // diff = 1
    });

    expect(result.value).toBe(SCORE.LOW);
  });

  it('returns NEGATIVE when pet noise is far above tolerance', () => {
    const result = noiseToleranceRule({
      adopter: createTestAdopter({ noiseToleranceLevel: 'low' }),
      pet: createTestBird({ noiseLevel: 'high' }), // diff = 2-3
    });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });

});

