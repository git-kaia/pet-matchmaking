// desiredSociabilityRule.test.ts
import { desiredSociabilityRule } from '../../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../../helpers/createTestBird';
import { SCORE } from '../../../../../../services/matching/utils/scoring.utils';

describe('desiredSociabilityRule (distance-based)', () => {

  it('returns MEDIUM for perfect match', () => { // difference = 0
    const result = desiredSociabilityRule({
      adopter: createTestAdopter({ desiredPetSociability: 'medium' }),
      pet: createTestBird({ socialNeed: 'medium' }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  it('returns LOW for small mismatch', () => { // difference = 1
    const result = desiredSociabilityRule({
      adopter: createTestAdopter({ desiredPetSociability: 'medium' }), 
      pet: createTestBird({ socialNeed: 'high' }),
    });

    expect(result.value).toBe(SCORE.LOW);
  });

  it('returns NEGATIVE for large mismatch', () => { // difference = 2 (threshold for large mismatch)
    const result = desiredSociabilityRule({
      adopter: createTestAdopter({ desiredPetSociability: 'low' }),
      pet: createTestBird({ socialNeed: 'high' }),
    });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });

});