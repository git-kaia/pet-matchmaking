// birdFreeFlightRule.test.ts

import { birdFreeFlightRule } from '../../../../../../services/matching/rules/animal-type/bird/birdScoringRules';
import { createTestAdopter } from '../../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../../helpers/createTestBird';
import { SCORE } from '../../../../../../services/matching/utils/scoring.utils';

describe('birdFreeFlightRule (gap logic)', () => {

  const cases = [
    // [expectation, need, expectedScore]

    // --- NEGATIVE (gap <= -2, but hard rule already removed worst case)
    ['low', 'high', SCORE.CRITICAL],

    // --- LOW (gap === -1)
    ['medium', 'high', SCORE.NEGATIVE],
    ['low', 'medium', SCORE.NEGATIVE],

    // --- MEDIUM (gap === 0)
    ['medium', 'medium', SCORE.MEDIUM],
    ['high', 'high', SCORE.MEDIUM],

    // --- HIGH (gap >= 1)
    ['high', 'medium', SCORE.HIGH],
    ['high', 'low', SCORE.HIGH],
  ] as const;

  it.each(cases)(
    'returns correct score for expectation=%s, need=%s',
    (expectation, need, expectedScore) => {

      const result = birdFreeFlightRule({
        adopter: createTestAdopter({
          freeFlightExpectation: expectation,
        }),
        pet: createTestBird({
          flightNeed: need,
        }),
      });

      expect(result.value).toBe(expectedScore);
      expect(result.rule.ruleName).toBe('birdFreeFlight');
    }
  );

});