// experienceMatchRule.test.ts

import { experienceMatchRule } from '../../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../../helpers/createTestBird';
import { SCORE } from '../../../../../../services/matching/utils/scoring.utils';

describe('experienceMatchRule', () => {

  ///////////////////////////////
  // AnimalType behavior
  ///////////////////////////////
  describe('animalType handling', () => {

    it('uses pet.animalType instead of other experience', () => {
      const result = experienceMatchRule({
        adopter: createTestAdopter({
          experienceYears: {
            dog: 10,   // high experience
            bird: 0,   // no experience
          },
        }),
        pet: createTestBird({
          animalType: 'bird',
          experienceLevel: 'intermediate',
        }),
      });

      // Should NOT use dog experience
      expect(result.value).toBe(SCORE.LOW);
      expect(result.rule.description).toContain('bird');
    });

  });

  ///////////////////////////////
  // Scoring logic
  ///////////////////////////////
  describe('scoring logic', () => {

    it('returns CRITICAL when far underqualified', () => {
      const result = experienceMatchRule({
        adopter: createTestAdopter({
          experienceYears: { bird: 0 },
        }),
        pet: createTestBird({
          experienceLevel: 'advanced',
        }),
      });

      expect(result.value).toBe(SCORE.CRITICAL);
    });

    it('returns NEGATIVE when slightly underqualified', () => {
      const result = experienceMatchRule({
        adopter: createTestAdopter({
          experienceYears: { bird: 2 }, // intermediate
        }),
        pet: createTestBird({
          experienceLevel: 'experienced',
        }),
      });

      expect(result.value).toBe(SCORE.LOW);
    });

    it('returns MEDIUM when experience matches', () => {
      const result = experienceMatchRule({
        adopter: createTestAdopter({
          experienceYears: { bird: 5 }, // experienced
        }),
        pet: createTestBird({
          experienceLevel: 'experienced',
        }),
      });

      expect(result.value).toBe(SCORE.MEDIUM);
    });

    it('returns HIGH when adopter is overqualified', () => {
      const result = experienceMatchRule({
        adopter: createTestAdopter({
          experienceYears: { bird: 10 }, // advanced
        }),
        pet: createTestBird({
          experienceLevel: 'beginner',
        }),
      });

      expect(result.value).toBe(SCORE.HIGH);
    });

  });

});