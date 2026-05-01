// birdFlockRequirementRule.test.ts

import { birdFlockRequirementRule } from '../../../../../../services/matching/rules/animal-type/bird/birdScoringRules';
import { createTestAdopter } from '../../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../../helpers/createTestBird';
import { SCORE } from '../../../../../../services/matching/utils/scoring.utils';

describe('birdFlockRequirementRule (after hard rule filtering)', () => {

  const cases = [
    // [requiresPartner, willingness, expectedScore]

    // --- Requires partner → medium willingness (NEGATIVE)
    [true, 'medium', SCORE.NEGATIVE],

    // --- Requires partner → high willingness (MEDIUM)
    [true, 'high', SCORE.MEDIUM],

    // --- No requirement → always MEDIUM
    [false, 'low', SCORE.MEDIUM],
    [false, 'medium', SCORE.MEDIUM],
    [false, 'high', SCORE.MEDIUM],
  ] as const;

  it.each(cases)(
    'returns correct score for requiresPartner=%s, willingness=%s',
    (requiresPartner, willingness, expectedScore) => {

      const result = birdFlockRequirementRule({
        adopter: createTestAdopter({
          willingnessMultipleBirds: willingness,
        }),
        pet: createTestBird({
          requiresBirdPartner: requiresPartner,
        }),
      });

      expect(result.value).toBe(expectedScore);
      expect(result.rule.ruleName).toBe('birdFlockRequirement');
    }
  );

});