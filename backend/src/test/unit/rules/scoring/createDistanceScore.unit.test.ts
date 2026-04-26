// createDistanceScore.unit.test.ts

import { createDistanceScore } from '../../../../services/matching/utils/scoring.utils';
import { SCORE } from '../../../../services/matching/utils/scoring.utils';

describe('createDistanceScore', () => {
  it('returns NEGATIVE for large distance', () => {
    const result = createDistanceScore({
      scoreType: 'human',
      ruleName: 'test',
      label: 'test',
      a: 'very_low',
      b: 'very_high',
    });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });
});