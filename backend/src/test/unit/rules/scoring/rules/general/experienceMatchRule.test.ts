// experienceMatchRule.test.ts

import { experienceMatchRule } from '../../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../../helpers/createTestBird';
import { SCORE } from '../../../../../../services/matching/utils/scoring.utils';

describe('experienceMatchRule', () => {

  ///////////////////////////////
  // AnimalType behavior
  ///////////////////////////////

  it('uses experience matching for the pet animalType only', () => {
    const result = experienceMatchRule({
      adopter: createTestAdopter({
        experienceYears: {
          dog: 10,
          bird: 0,
        },
      }),
      pet: createTestBird({
        animalType: 'bird',
        experienceLevel: 'intermediate',
      }),
    });

    // Should use bird experience, not dog experience
    expect(result.value).toBe(SCORE.NEGATIVE);

    expect(result.rule.description).toContain('bird');
  });

  ///////////////////////////////
  // Scoring behavior
  ///////////////////////////////

  describe('scoring logic', () => {

    it('returns CRITICAL when adopter is far underqualified', () => {
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

    it('returns NEGATIVE when adopter is slightly underqualified', () => {
      const result = experienceMatchRule({
        adopter: createTestAdopter({
          experienceYears: { bird: 2 }, // intermediate
        }),
        pet: createTestBird({
          experienceLevel: 'experienced',
        }),
      });

      expect(result.value).toBe(SCORE.NEGATIVE);
    });

    it('returns MEDIUM when adopter experience matches pet requirement', () => {
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

    it('returns HIGH for ideal advanced-to-advanced match', () => {
      const result = experienceMatchRule({
        adopter: createTestAdopter({
          experienceYears: { bird: 20 }, // advanced
        }),
        pet: createTestBird({
          experienceLevel: 'advanced',
        }),
      });

      expect(result.value).toBeGreaterThan(SCORE.HIGH);
    });

    it('returns HIGH when adopter is highly experienced for demanding bird', () => {
      const result = experienceMatchRule({
        adopter: createTestAdopter({
          experienceYears: { bird: 10 }, // advanced
        }),
        pet: createTestBird({
          experienceLevel: 'experienced',
        }),
      });

      expect(result.value).toBe(SCORE.HIGH);
    });

    it('returns MEDIUM when adopter is overqualified for beginner bird', () => {
      const result = experienceMatchRule({
        adopter: createTestAdopter({
          experienceYears: { bird: 10 }, // advanced
        }),
        pet: createTestBird({
          experienceLevel: 'beginner',
        }),
      });

      expect(result.value).toBe(SCORE.MEDIUM);
    });

  });

});