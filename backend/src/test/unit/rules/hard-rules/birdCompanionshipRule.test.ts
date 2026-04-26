import { birdCompanionshipRule } from '../../../../services/matching/rules/animal-type/bird/birdHardRules';
import { createTestAdopter } from '../../../helpers/createTestAdopter';
import { createTestBird } from '../../../helpers/createTestBird';

import { describe, test, expect } from '@jest/globals';


describe('birdCompanionshipRule', () => {

  test('rejects when bird needs partner and adopter is often away', () => {
    const adopter = createTestAdopter({ aloneTimeHours: 'high' });
    const bird = createTestBird({ requiresBirdPartner: true });

    const result = birdCompanionshipRule({ adopter, pet: bird });

    expect(result.rejected).toBe(true);
  });

  test('passes when adopter availability is sufficient', () => {
    const adopter = createTestAdopter({ aloneTimeHours: 'low' });
    const bird = createTestBird({ requiresBirdPartner: true });

    const result = birdCompanionshipRule({ adopter, pet: bird });

    expect(result.rejected).toBe(false);
  });

});