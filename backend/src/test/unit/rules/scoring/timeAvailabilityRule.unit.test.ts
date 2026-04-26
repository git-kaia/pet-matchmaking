// timeAvailabilityRule.test.ts

import { timeAvailabilityRule } from '../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../helpers/createTestAdopter';
import { createTestPet } from '../../../helpers/createTestPet';
import { SCORE } from '../../../../services/matching/utils/scoring.utils';

describe('timeAvailabilityRule', () => {
  it('returns HIGH when adopter has plenty of extra time', () => {
    const adopter = createTestAdopter({
      dailyCareTime: 180,
    });

    const pet = createTestPet({
      timeRequired: 60,
    });

    const result = timeAvailabilityRule({ adopter, pet });

    expect(result.value).toBe(SCORE.HIGH);
  });

  it('returns MEDIUM when time is just sufficient', () => {
    const adopter = createTestAdopter({
      dailyCareTime: 60,
    });

    const pet = createTestPet({
      timeRequired: 60,
    });

    const result = timeAvailabilityRule({ adopter, pet });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  it('returns CRITICAL when not enough time', () => {
    const adopter = createTestAdopter({
      dailyCareTime: 30,
    });

    const pet = createTestPet({
      timeRequired: 60,
    });

    const result = timeAvailabilityRule({ adopter, pet });

    expect(result.value).toBe(SCORE.CRITICAL);
  });
});