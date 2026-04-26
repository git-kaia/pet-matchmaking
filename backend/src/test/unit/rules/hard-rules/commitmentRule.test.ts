import { commitmentRule } from '../../../../services/matching/rules/general/generalHardRules';
import { createTestAdopter } from '../../../helpers/createTestAdopter';
import { createTestBird } from '../../../helpers/createTestBird';

import { describe, test, expect } from '@jest/globals';

describe('commitmentRule', () => {

  test('rejects when commitment is too short', () => {
    const adopter = createTestAdopter({ commitmentHorizonYears: 2 });
    const pet = createTestBird({ lifespanYears: 20 });

    const result = commitmentRule({ adopter, pet });

    expect(result.rejected).toBe(true);
  });

  test('passes when commitment is sufficient', () => {
    const adopter = createTestAdopter({ commitmentHorizonYears: 15 });
    const pet = createTestBird({ lifespanYears: 10 });

    const result = commitmentRule({ adopter, pet });

    expect(result.rejected).toBe(false);
  });

});