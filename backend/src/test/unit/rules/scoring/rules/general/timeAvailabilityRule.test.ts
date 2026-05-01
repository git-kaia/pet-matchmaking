// timeAvailabilityRule.test.ts

import { timeAvailabilityRule } from '../../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../../helpers/createTestBird';
import { SCORE } from '../../../../../../services/matching/utils/scoring.utils';

describe('timeAvailabilityRule', () => {
  it('returns HIGH when there is plenty of extra time', () => {
    const result = timeAvailabilityRule({
      adopter: createTestAdopter({ dailyCareTime: 180 }),
      pet: createTestBird({ timeRequired: 60 }),
    });

    expect(result.value).toBe(SCORE.HIGH);
  });

  it('returns MEDIUM when time is sufficient', () => {
    const result = timeAvailabilityRule({
      adopter: createTestAdopter({ dailyCareTime: 60 }),
      pet: createTestBird({ timeRequired: 60 }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  it('returns CRITICAL when time is insufficient', () => {
    const result = timeAvailabilityRule({
      adopter: createTestAdopter({ dailyCareTime: 30 }),
      pet: createTestBird({ timeRequired: 60 }),
    });

    expect(result.value).toBe(SCORE.CRITICAL);
  });
});