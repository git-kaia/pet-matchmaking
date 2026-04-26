import { humanInteractionRule } from '../../../../services/matching/rules/animal-type/bird/birdHardRules';

import { createTestAdopter } from '../../../helpers/createTestAdopter';
import { createTestBird } from '../../../helpers/createTestBird';

import { describe, test, expect } from '@jest/globals';


describe('humanInteractionRule', () => {

  test('rejects when low interaction and very high social need', () => {
    const adopter = createTestAdopter({ desiredHumanInteraction: 'low' });
    const bird = createTestBird({
      socialNeed: 'very_high',
      requiresBirdPartner: false,
    });

    const result = humanInteractionRule({ adopter, pet: bird });

    expect(result.rejected).toBe(true);
  });

});