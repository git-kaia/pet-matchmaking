// birdSleepRule.test.ts

import { birdSleepRule } from '../../../../../../services/matching/rules/animal-type/bird/birdScoringRules';
import { createTestAdopter } from '../../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../../helpers/createTestBird';
import { SCORE } from '../../../../../../services/matching/utils/scoring.utils';

describe('birdSleepRule (gap logic)', () => {

  const cases = [
    // [commitment, need, expectedScore]

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
    'returns correct score for commitment=%s, need=%s',
    (commitment, need, expectedScore) => {

      const result = birdSleepRule({
        adopter: createTestAdopter({
          sleepEnvironmentCommitment: commitment,
        }),
        pet: createTestBird({
          sleepNeed: need,
        }),
      });

      expect(result.value).toBe(expectedScore);
      expect(result.rule.ruleName).toBe('birdSleepEnvironment');
    }
  );

});