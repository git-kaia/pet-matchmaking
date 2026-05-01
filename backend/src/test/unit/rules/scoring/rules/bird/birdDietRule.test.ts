// birdDietRule.test.ts

import { birdDietRule } from '../../../../../../services/matching/rules/animal-type/bird/birdScoringRules';
import { createTestAdopter } from '../../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../../helpers/createTestBird';
import { SCORE } from '../../../../../../services/matching/utils/scoring.utils';

describe('birdDietRule (gap logic)', () => {

  const cases = [
    // [tolerance, complexity, expectedScore]

    // --- CRITICAL (gap <= -2)
    ['low', 'high', SCORE.CRITICAL],

    // --- NEGATIVE (gap === -1)
    ['medium', 'high', SCORE.NEGATIVE],
    ['low', 'medium', SCORE.NEGATIVE],

    // --- MEDIUM (gap === 0)
    ['medium', 'medium', SCORE.MEDIUM],
    ['high', 'high', SCORE.MEDIUM],
    ['low', 'low', SCORE.MEDIUM],

    // --- HIGH (gap >= 1)
    ['high', 'medium', SCORE.HIGH],
    ['high', 'low', SCORE.HIGH],
    ['medium', 'low', SCORE.HIGH],
  ] as const;

  it.each(cases)(
    'returns correct score for tolerance=%s, complexity=%s',
    (tolerance, complexity, expectedScore) => {

      const result = birdDietRule({
        adopter: createTestAdopter({
          dietComplexityTolerance: tolerance,
        }),
        pet: createTestBird({
          dietComplexity: complexity,
        }),
      });

      expect(result.value).toBe(expectedScore);
      expect(result.rule.ruleName).toBe('birdDiet');
    }
  );

});