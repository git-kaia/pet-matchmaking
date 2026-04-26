import { workPatternRule } from '../../../../services/matching/rules/general/generalHardRules';
import { createTestAdopter } from '../../../helpers/createTestAdopter';
import { createTestBird } from '../../../helpers/createTestBird';

import { describe, test, expect } from '@jest/globals';

describe('workPatternRule', () => {

  test('rejects when full-time work and very high care need', () => {
    const adopter = createTestAdopter({
      householdWorkPattern: 'full_time',
    });

    const pet = createTestBird({
      careNeed: 'very_high',
    });

    const result = workPatternRule({ adopter, pet });

    expect(result.rejected).toBe(true);
  });

  test('passes when care need is manageable', () => {
    const adopter = createTestAdopter({
      householdWorkPattern: 'full_time',
    });

    const pet = createTestBird({
      careNeed: 'medium',
    });

    const result = workPatternRule({ adopter, pet });

    expect(result.rejected).toBe(false);
  });

});