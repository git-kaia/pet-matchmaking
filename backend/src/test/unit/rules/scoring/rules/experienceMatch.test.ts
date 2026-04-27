// experienceMatch.test.ts

import { experienceMatchRule } from '../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../helpers/createTestBird';
import { SCORE } from '../../../../../services/matching/utils/scoring.utils';

describe('experienceMatchRule', () => {

  it('returns CRITICAL when adopter is significantly underqualified (gap <= -2)', () => {
    // adopter: beginner (0)
    // pet: advanced (3)
    // gap = 0 - 3 = -3 → CRITICAL
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

  it('returns NEGATIVE when adopter is slightly underqualified (gap = -1)', () => {
    // adopter: intermediate (1)
    // pet: experienced (2)
    // gap = 1 - 2 = -1 → NEGATIVE
    const result = experienceMatchRule({
      adopter: createTestAdopter({
        hasPetExperience: true,
        experienceYears: { bird: 2 },
      }),
      pet: createTestBird({
        experienceLevel: 'experienced',
      }),
    });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });

  it('returns MEDIUM when adopter experience matches requirement exactly (gap = 0)', () => {
    // adopter: intermediate (1)
    // pet: intermediate (1)
    // gap = 1 - 1 = 0 → MEDIUM
    const result = experienceMatchRule({
      adopter: createTestAdopter({
        hasPetExperience: true,
        experienceYears: { bird: 2 },
      }),
      pet: createTestBird({
        experienceLevel: 'intermediate',
      }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  it('returns HIGH when adopter is overqualified (gap >= 1)', () => {
    // adopter: advanced (3)
    // pet: beginner (0)
    // gap = 3 - 0 = +3 → HIGH
    const result = experienceMatchRule({
      adopter: createTestAdopter({
        hasPetExperience: true,
        experienceYears: { bird: 10 },
      }),
      pet: createTestBird({
        experienceLevel: 'beginner',
      }),
    });

    expect(result.value).toBe(SCORE.HIGH);
  });

});