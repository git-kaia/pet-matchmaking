import { cleaningToleranceRule } from '../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../helpers/createTestBird';
import { SCORE } from '../../../../../services/matching/utils/scoring.utils';

describe('cleaningToleranceRule', () => {

  ///////////////////////////////
  // Strong mismatch
  ///////////////////////////////
  it('returns NEGATIVE for low tolerance + high mess', () => {
    const result = cleaningToleranceRule({
      adopter: createTestAdopter({
        cleaningTolerance: 'low',
      }),
      pet: createTestBird({
        messLevel: 'high',
      }),
    });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });

  ///////////////////////////////
  // Moderate mismatch
  ///////////////////////////////

  it('returns LOW for medium tolerance + high mess', () => {
    const result = cleaningToleranceRule({
      adopter: createTestAdopter({
        cleaningTolerance: 'medium',
      }),
      pet: createTestBird({
        messLevel: 'high',
      }),
    });

    expect(result.value).toBe(SCORE.LOW);
  });

  it('returns LOW for low tolerance + medium mess', () => {
    const result = cleaningToleranceRule({
      adopter: createTestAdopter({
        cleaningTolerance: 'low',
      }),
      pet: createTestBird({
        messLevel: 'medium',
      }),
    });

    expect(result.value).toBe(SCORE.LOW);
  });

  ///////////////////////////////
  // Acceptable cases
  ///////////////////////////////

  it('returns MEDIUM for high tolerance + high mess', () => {
    const result = cleaningToleranceRule({
      adopter: createTestAdopter({
        cleaningTolerance: 'high',
      }),
      pet: createTestBird({
        messLevel: 'high',
      }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  it('returns MEDIUM for medium tolerance + medium mess', () => {
    const result = cleaningToleranceRule({
      adopter: createTestAdopter({
        cleaningTolerance: 'medium',
      }),
      pet: createTestBird({
        messLevel: 'medium',
      }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  it('returns MEDIUM for low tolerance + low mess', () => {
    const result = cleaningToleranceRule({
      adopter: createTestAdopter({
        cleaningTolerance: 'low', // accepts low to high tolerance for low mess
      }),
      pet: createTestBird({
        messLevel: 'low',
      }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

});