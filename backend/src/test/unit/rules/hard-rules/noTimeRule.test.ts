import { noTimeRule } from '../../../../services/matching/rules/general/generalHardRules';
import { createTestAdopter } from '../../../helpers/createTestAdopter';
import { createTestBird } from '../../../helpers/createTestBird';

import { describe, test, expect } from '@jest/globals';

describe('noTimeRule', () => {

  test('rejects when dailyCareTime is 0', () => {
    const adopter = createTestAdopter({ dailyCareTime: 0 });
    const pet = createTestBird();

    const result = noTimeRule({ adopter, pet });

    expect(result.rejected).toBe(true);
    expect(result.reason).toBe('No time for pet care');
  });

  test('passes when adopter has time', () => {
    const adopter = createTestAdopter({ dailyCareTime: 60 });
    const pet = createTestBird();

    const result = noTimeRule({ adopter, pet });

    expect(result.rejected).toBe(false);
  });

});