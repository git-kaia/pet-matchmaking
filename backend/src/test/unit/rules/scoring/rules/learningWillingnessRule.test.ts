// learningWillingessRule.test.ts

import { learningWillingnessRule } from '../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../helpers/createTestBird';
import { SCORE } from '../../../../../services/matching/utils/scoring.utils';

describe('learningWillingnessRule', () => {

  ///////////////////////////////
  // AnimalType handling
  ///////////////////////////////
  describe('animalType handling', () => {

    it('uses pet.animalType to determine experience (ignores other animals)', () => {
      const result = learningWillingnessRule({
        adopter: createTestAdopter({
          experienceYears: {
            dog: 10,   // experienced with dogs
            bird: 0,   // no bird experience
          },
          learningWillingness: 'high',
        }),
        pet: createTestBird({
          animalType: 'bird',
        }),
      });

      // Should treat adopter as inexperienced for birds
      expect(result.value).toBe(SCORE.HIGH);
      expect(result.rule.description).toContain('bird');
    });

  });

  ///////////////////////////////
  // Scoring logic
  ///////////////////////////////
  describe('scoring logic', () => {

    it('returns HIGH for no experience + high willingness', () => {
      const result = learningWillingnessRule({
        adopter: createTestAdopter({
          experienceYears: { bird: 0 },
          learningWillingness: 'high',
        }),
        pet: createTestBird({}),
      });

      expect(result.value).toBe(SCORE.HIGH);
    });

    it('returns MEDIUM for experience + high willingness', () => {
      const result = learningWillingnessRule({
        adopter: createTestAdopter({
          experienceYears: { bird: 5 },
          learningWillingness: 'high',
        }),
        pet: createTestBird({}),
      });

      expect(result.value).toBe(SCORE.MEDIUM);
    });

    it('returns MEDIUM for no experience + medium willingness', () => {
      const result = learningWillingnessRule({
        adopter: createTestAdopter({
          experienceYears: { bird: 0 },
          learningWillingness: 'medium',
        }),
        pet: createTestBird({}),
      });

      expect(result.value).toBe(SCORE.MEDIUM);
    });

    it('returns LOW for experience + medium willingness', () => {
      const result = learningWillingnessRule({
        adopter: createTestAdopter({
          experienceYears: { bird: 5 },
          learningWillingness: 'medium',
        }),
        pet: createTestBird({}),
      });

      expect(result.value).toBe(SCORE.LOW);
    });

    it('returns LOW for low willingness regardless of experience', () => {
      const result = learningWillingnessRule({
        adopter: createTestAdopter({
          experienceYears: { bird: 10 },
          learningWillingness: 'low',
        }),
        pet: createTestBird({}),
      });

      expect(result.value).toBe(SCORE.LOW);
    });

  });

});