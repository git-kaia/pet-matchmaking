import { allergyRule } from '../../../../services/matching/rules/general/generalHardRules';
import { createTestAdopter } from '../../../helpers/createTestAdopter';
import { createTestBird } from '../../../helpers/createTestBird';

import { describe, test, expect } from '@jest/globals';


describe('allergyRule', () => {

  test('rejects when adopter is allergic to bird', () => {
    const adopter = createTestAdopter({
      householdAllergySensitivity: 'specific_animal_allergy',
      specificAnimalAllergies: ['bird'],
    });

    const pet = createTestBird();

    const result = allergyRule({ adopter, pet });

    expect(result.rejected).toBe(true);
  });

  test('passes when no relevant allergy', () => {
    const adopter = createTestAdopter({
      householdAllergySensitivity: 'none',
    });

    const pet = createTestBird();

    const result = allergyRule({ adopter, pet });

    expect(result.rejected).toBe(false);
  });

});