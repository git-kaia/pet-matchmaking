// aloneTimeRisk.unit.test.ts

import { aloneTimeRiskRule } from '../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../helpers/createTestBird';
import { SCORE } from '../../../../../services/matching/utils/scoring.utils';

describe('aloneTimeRiskRule', () => {
  it('returns CRITICAL for high alone time and high social need', () => {
    const result = aloneTimeRiskRule({
      adopter: createTestAdopter({ aloneTimeHours: 'high' }),
      pet: createTestBird({ socialNeed: 'high' }),
    });

    expect(result.value).toBe(SCORE.CRITICAL);
  });

  it('returns NEGATIVE for medium alone time and high social need', () => {
    const result = aloneTimeRiskRule({
      adopter: createTestAdopter({ aloneTimeHours: 'medium' }),
      pet: createTestBird({ socialNeed: 'high' }),
    });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });

  it('returns LOW for acceptable conditions', () => {
    const result = aloneTimeRiskRule({
      adopter: createTestAdopter({ aloneTimeHours: 'low' }),
      pet: createTestBird({ socialNeed: 'medium' }),
    });

    expect(result.value).toBe(SCORE.LOW);
  });
});