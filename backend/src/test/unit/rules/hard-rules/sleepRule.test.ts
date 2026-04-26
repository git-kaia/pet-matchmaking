import { noTimeRule } from '../../../../services/matching/rules/general/generalHardRules';
import { createTestAdopter } from '../../../helpers/createTestAdopter';
import { createTestBird } from '../../../helpers/createTestBird';

import { describe, test, expect } from '@jest/globals';

import { sleepRule } from '../../../../services/matching/rules/animal-type/bird/birdHardRules';


describe('sleepRule', () => {

  test('rejects when sleep need is high but commitment is low', () => {
    const adopter = createTestAdopter({ sleepEnvironmentCommitment: 'low' });
    const bird = createTestBird({ sleepNeed: 'high' });

    const result = sleepRule({ adopter, pet: bird });

    expect(result.rejected).toBe(true);
  });

  test('passes when sleep conditions are sufficient', () => {
    const adopter = createTestAdopter({ sleepEnvironmentCommitment: 'high' });
    const bird = createTestBird({ sleepNeed: 'medium' });

    const result = sleepRule({ adopter, pet: bird });

    expect(result.rejected).toBe(false);
  });

});