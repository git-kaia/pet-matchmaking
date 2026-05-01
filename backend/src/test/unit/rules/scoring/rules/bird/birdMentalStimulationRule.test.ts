// birdMentalStimulationRule.test.ts

import { birdMentalStimulationRule } from '../../../../../../services/matching/rules/animal-type/bird/birdScoringRules';
import { createTestAdopter } from '../../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../../helpers/createTestBird';
import { SCORE } from '../../../../../../services/matching/utils/scoring.utils';

describe('birdMentalStimulationRule (average + gap logic)', () => {

  const cases = [
    // [enrichment, training, need, expectedScore]

    // --- CRITICAL (gap <= -2)
    ['low', 'low', 'high', SCORE.CRITICAL],

    // --- NEGATIVE (gap === -1)
    ['low', 'medium', 'high', SCORE.NEGATIVE],
    ['medium', 'low', 'high', SCORE.NEGATIVE],

    // --- MEDIUM (gap === 0)
    ['medium', 'medium', 'medium', SCORE.MEDIUM],
    ['high', 'low', 'medium', SCORE.MEDIUM],

    // --- HIGH (gap >= 1)
    ['high', 'high', 'medium', SCORE.HIGH],
    ['high', 'high', 'low', SCORE.HIGH],
  ] as const;

  it.each(cases)(
    'returns correct score for enrichment=%s, training=%s, need=%s',
    (enrichment, training, need, expectedScore) => {

      const result = birdMentalStimulationRule({
        adopter: createTestAdopter({
          enrichmentCommitment: enrichment,
          trainingInterest: training,
        }),
        pet: createTestBird({
          mentalStimulationNeed: need,
        }),
      });

      expect(result.value).toBe(expectedScore);
      expect(result.rule.ruleName).toBe('birdMentalStimulation');
    }
  );

});