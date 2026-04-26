import { behaviorToleranceRule } from '../../../../services/matching/rules/animal-type/bird/birdHardRules';
import { createTestAdopter } from '../../../helpers/createTestAdopter';
import { createTestBird } from '../../../helpers/createTestBird';

import { describe, test, expect } from '@jest/globals';

describe('behaviorToleranceRule', () => {

  test('rejects when adopter tolerance is low and aggression is high', () => {
    const adopter = createTestAdopter({ adoptionComplexityTolerance: 'low' });
    const bird = createTestBird({ aggressionRisk: 'high' });

    const result = behaviorToleranceRule({ adopter, pet: bird });

    expect(result.rejected).toBe(true);
  });

  test('passes when tolerance matches behavior', () => {
    const adopter = createTestAdopter({ adoptionComplexityTolerance: 'high' });
    const bird = createTestBird({ aggressionRisk: 'low' });

    const result = behaviorToleranceRule({ adopter, pet: bird });

    expect(result.rejected).toBe(false);
  });

});