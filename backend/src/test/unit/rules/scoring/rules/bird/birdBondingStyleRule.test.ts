// birdBondingStyleRule.test.ts

import { birdBondingStyleRule } from '../../../../../../services/matching/rules/animal-type/bird/birdScoringRules';
import { createTestAdopter } from '../../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../../helpers/createTestBird';
import { SCORE } from '../../../../../../services/matching/utils/scoring.utils';

describe('birdBondingStyleRule (all combinations)', () => {

  const cases = [
    // [desired, actual, expectedScore]

    // --- MATCH (HIGH)
    ['one_person', 'one_person', SCORE.HIGH],
    ['multiple_people', 'multiple_people', SCORE.HIGH],
    ['independent', 'independent', SCORE.HIGH],

    // --- STRONG MISMATCH (NEGATIVE)
    ['independent', 'one_person', SCORE.NEGATIVE],

    // --- MODERATE MISMATCH (LOW)
    ['multiple_people', 'one_person', SCORE.LOW],
    ['one_person', 'independent', SCORE.LOW],

    // --- ACCEPTABLE (MEDIUM)
    ['one_person', 'multiple_people', SCORE.MEDIUM],
    ['multiple_people', 'independent', SCORE.MEDIUM],
    ['independent', 'multiple_people', SCORE.MEDIUM],
  ] as const;

  it.each(cases)(
    'returns correct score for desired=%s, actual=%s',
    (desired, actual, expectedScore) => {

      const result = birdBondingStyleRule({
        adopter: createTestAdopter({
          desiredBondingStyle: desired,
        }),
        pet: createTestBird({
          bondingStyle: actual,
        }),
      });

      expect(result.value).toBe(expectedScore);
      expect(result.rule.ruleName).toBe('birdBondingStyle');
    }
  );

});