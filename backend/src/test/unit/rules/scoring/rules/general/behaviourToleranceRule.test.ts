// behaviourToleranceRule.test.ts

import { behaviorToleranceRule } from '../../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../../helpers/createTestBird';
import { SCORE } from '../../../../../../services/matching/utils/scoring.utils';

describe('behaviorToleranceRule', () => {

  // Within tolerance (<=)
  it('returns MEDIUM when behavior issues equal adopter tolerance', () => {
    const result = behaviorToleranceRule({
      adopter: createTestAdopter({
        problemBehaviorTolerance: 'medium',
      }),
      pet: createTestBird({
        behaviourIssues: 'medium',
      }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  it('returns MEDIUM when adopter tolerance exceeds pet issues', () => {
    const result = behaviorToleranceRule({
      adopter: createTestAdopter({
        problemBehaviorTolerance: 'high',
      }),
      pet: createTestBird({
        behaviourIssues: 'low',
      }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  // Slight mismatch (+1)
  it('returns LOW when behavior issues slightly exceed tolerance', () => {
    const result = behaviorToleranceRule({
      adopter: createTestAdopter({
        problemBehaviorTolerance: 'medium',
      }),
      pet: createTestBird({
        behaviourIssues: 'high',
      }),
    });

    expect(result.value).toBe(SCORE.LOW);
  });

  // Strong mismatch (>=2)
  it('returns NEGATIVE when behavior issues significantly exceed tolerance', () => {
    const result = behaviorToleranceRule({
      adopter: createTestAdopter({
        problemBehaviorTolerance: 'low',
      }),
      pet: createTestBird({
        behaviourIssues: 'high',
      }),
    });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });

});