// learningWillingnessRule.test.ts

import { learningWillingnessRule } from '../../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../../helpers/createTestBird';
import { SCORE } from '../../../../../../services/matching/utils/scoring.utils';

describe('learningWillingnessRule', () => {

  ///////////////////////////////
  // High willingness
  ///////////////////////////////

  describe('high willingness', () => {

    it('returns HIGH for experienced adopter with high willingness', () => {
      const result = learningWillingnessRule({
        adopter: createTestAdopter({
          learningWillingness: 'high',
          experienceYears: {
            bird: 5,
          },
        }),

        pet: createTestBird({
          animalType: 'bird',
          experienceLevel: 'experienced',
        }),
      });

      expect(result.value).toBe(SCORE.HIGH);
    });

    it('returns MEDIUM for beginner with high willingness and beginner-friendly pet', () => {
      const result = learningWillingnessRule({
        adopter: createTestAdopter({
          learningWillingness: 'high',
          experienceYears: {
            bird: 0,
          },
        }),

        pet: createTestBird({
          animalType: 'bird',
          experienceLevel: 'beginner',
        }),
      });

      expect(result.value).toBe(SCORE.MEDIUM);
    });

    it('returns LOW for beginner with high willingness and demanding pet', () => {
      const result = learningWillingnessRule({
        adopter: createTestAdopter({
          learningWillingness: 'high',
          experienceYears: {
            bird: 0,
          },
        }),

        pet: createTestBird({
          animalType: 'bird',
          experienceLevel: 'advanced',
        }),
      });

      expect(result.value).toBe(SCORE.LOW);
    });

  });

  ///////////////////////////////
  // Medium willingness
  ///////////////////////////////

  describe('medium willingness', () => {

    it('returns MEDIUM for experienced adopter with medium willingness', () => {
      const result = learningWillingnessRule({
        adopter: createTestAdopter({
          learningWillingness: 'medium',
          experienceYears: {
            bird: 5,
          },
        }),

        pet: createTestBird({
          animalType: 'bird',
          experienceLevel: 'experienced',
        }),
      });

      expect(result.value).toBe(SCORE.MEDIUM);
    });

    it('returns LOW for inexperienced adopter with medium willingness', () => {
      const result = learningWillingnessRule({
        adopter: createTestAdopter({
          learningWillingness: 'medium',
          experienceYears: {
            bird: 0,
          },
        }),

        pet: createTestBird({
          animalType: 'bird',
          experienceLevel: 'beginner',
        }),
      });

      expect(result.value).toBe(SCORE.LOW);
    });

  });

  ///////////////////////////////
  // Low willingness
  ///////////////////////////////

  describe('low willingness', () => {

    it('returns NEGATIVE for adopter with low willingness', () => {
      const result = learningWillingnessRule({
        adopter: createTestAdopter({
          learningWillingness: 'low',
          experienceYears: {
            bird: 10,
          },
        }),

        pet: createTestBird({
          animalType: 'bird',
          experienceLevel: 'experienced',
        }),
      });

      expect(result.value).toBe(SCORE.NEGATIVE);
    });

  });

});