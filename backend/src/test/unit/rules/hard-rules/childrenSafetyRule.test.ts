import { childrenSafetyRule } from '../../../../services/matching/rules/general/generalHardRules';
import { createTestAdopter } from '../../../helpers/createTestAdopter';
import { createTestBird } from '../../../helpers/createTestBird';

import { describe, test, expect } from '@jest/globals';

describe('childrenSafetyRule', () => {

  test('rejects when young children and high aggression', () => {
    const adopter = createTestAdopter({
      kidsAge: 'under_ten',
    });

    const pet = createTestBird({
      aggressionRisk: 'high',
    });

    const result = childrenSafetyRule({ adopter, pet });

    expect(result.rejected).toBe(true);
  });

  test('passes when aggression is low', () => {
    const adopter = createTestAdopter({
      kidsAge: 'under_ten',
    });

    const pet = createTestBird({
      aggressionRisk: 'low',
    });

    const result = childrenSafetyRule({ adopter, pet });

    expect(result.rejected).toBe(false);
  });

});