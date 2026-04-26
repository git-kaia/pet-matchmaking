import { freeFlightRule } from '../../../../services/matching/rules/animal-type/bird/birdHardRules';
import { createTestAdopter } from '../../../helpers/createTestAdopter';
import { createTestBird } from '../../../helpers/createTestBird';

import { describe, test, expect } from '@jest/globals';


describe('freeFlightRule', () => {

  test('rejects when flight need is high but expectation is very low', () => {
    const adopter = createTestAdopter({ freeFlightExpectation: 'very_low' });
    const bird = createTestBird({ flightNeed: 'high' });

    const result = freeFlightRule({ adopter, pet: bird });

    expect(result.rejected).toBe(true);
  });

  test('passes when expectation matches flight need', () => {
    const adopter = createTestAdopter({ freeFlightExpectation: 'high' });
    const bird = createTestBird({ flightNeed: 'high' });

    const result = freeFlightRule({ adopter, pet: bird });

    expect(result.rejected).toBe(false);
  });

});