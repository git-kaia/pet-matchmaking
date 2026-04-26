import { predationRule } from '../../../../services/matching/rules/general/generalHardRules';
import { createTestAdopter } from '../../../helpers/createTestAdopter';
import { createTestBird } from '../../../helpers/createTestBird';

import { describe, test, expect } from '@jest/globals';


describe('predationRule', () => {

  test('rejects when adopter has cat and bird is small', () => {
    const adopter = createTestAdopter({
      hasCurrentPets: true,
      typeOfPet: ['cat'],
    });

    const pet = createTestBird({
      size: 'small',
    });

    const result = predationRule({ adopter, pet });

    expect(result.rejected).toBe(true);
  });

  test('passes when no predator risk', () => {
    const adopter = createTestAdopter({
      hasCurrentPets: false,
    });

    const pet = createTestBird({
      size: 'small',
    });

    const result = predationRule({ adopter, pet });

    expect(result.rejected).toBe(false);
  });

});