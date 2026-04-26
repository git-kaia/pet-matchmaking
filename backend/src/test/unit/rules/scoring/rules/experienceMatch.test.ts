// experienceMatch.test.ts

import { experienceMatchRule } from '../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../helpers/createTestBird';
import { SCORE } from '../../../../../services/matching/utils/scoring.utils';

describe('experienceMatchRule', () => {
  it('returns CRITICAL when adopter is far underqualified', () => {
    const result = experienceMatchRule({
      adopter: createTestAdopter({
        hasPetExperience: false,
        experienceYears: {},
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
        hasPetExperience: true,
        experienceYears: { bird: 2 }, // intermediate (1)
      }),
      pet: createTestBird({
        experienceLevel: 'experienced', // 2
      }),
    });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });

  it('returns LOW when experience matches exactly', () => {
    const result = experienceMatchRule({
      adopter: createTestAdopter({
        hasPetExperience: true,
        experienceYears: { bird: 2 }, // intermediate (1)
      }),
      pet: createTestBird({
        experienceLevel: 'intermediate', // 1
      }),
    });

    expect(result.value).toBe(SCORE.LOW);
  });

  it('returns MEDIUM when adopter is overqualified', () => {
    const result = experienceMatchRule({
      adopter: createTestAdopter({
        hasPetExperience: true,
        experienceYears: { bird: 10 }, // experienced (2)
      }),
      pet: createTestBird({
        experienceLevel: 'beginner', // 0
      }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });
});