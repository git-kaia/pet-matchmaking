// financialPriorityRule.test.ts

import { financialPriorityRule } from '../../../../../../services/matching/rules/general/generalScoringRules';
import { createTestAdopter } from '../../../../../helpers/createTestAdopter';
import { createTestBird } from '../../../../../helpers/createTestBird';
import { SCORE } from '../../../../../../services/matching/utils/scoring.utils';

describe('financialPriorityRule', () => {

  // Low burden (always safe)
  it('returns MEDIUM for low burden + low priority', () => {
    const result = financialPriorityRule({
      adopter: createTestAdopter({ financialPriority: 'low' }),
      pet: createTestBird({ financialBurden: 'low' }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  it('returns MEDIUM for low burden + medium priority', () => {
    const result = financialPriorityRule({
      adopter: createTestAdopter({ financialPriority: 'medium' }),
      pet: createTestBird({ financialBurden: 'low' }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  it('returns MEDIUM for low burden + high priority', () => {
    const result = financialPriorityRule({
      adopter: createTestAdopter({ financialPriority: 'high' }),
      pet: createTestBird({ financialBurden: 'low' }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  // Medium burden
  it('returns LOW for medium burden + low priority', () => {
    const result = financialPriorityRule({
      adopter: createTestAdopter({ financialPriority: 'low' }),
      pet: createTestBird({ financialBurden: 'medium' }),
    });

    expect(result.value).toBe(SCORE.LOW);
  });

  it('returns MEDIUM for medium burden + medium priority', () => {
    const result = financialPriorityRule({
      adopter: createTestAdopter({ financialPriority: 'medium' }),
      pet: createTestBird({ financialBurden: 'medium' }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  it('returns MEDIUM for medium burden + high priority', () => {
    const result = financialPriorityRule({
      adopter: createTestAdopter({ financialPriority: 'high' }),
      pet: createTestBird({ financialBurden: 'medium' }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });

  // High burden
  it('returns NEGATIVE for high burden + low priority', () => {
    const result = financialPriorityRule({
      adopter: createTestAdopter({ financialPriority: 'low' }),
      pet: createTestBird({ financialBurden: 'high' }),
    });

    expect(result.value).toBe(SCORE.NEGATIVE);
  });

  it('returns LOW for high burden + medium priority', () => {
    const result = financialPriorityRule({
      adopter: createTestAdopter({ financialPriority: 'medium' }),
      pet: createTestBird({ financialBurden: 'high' }),
    });

    expect(result.value).toBe(SCORE.LOW);
  });

  it('returns MEDIUM for high burden + high priority', () => {
    const result = financialPriorityRule({
      adopter: createTestAdopter({ financialPriority: 'high' }),
      pet: createTestBird({ financialBurden: 'high' }),
    });

    expect(result.value).toBe(SCORE.MEDIUM);
  });


  // Edge case
  it('returns LOW when financial burden is missing', () => {
    const result = financialPriorityRule({
      adopter: createTestAdopter({ financialPriority: 'medium' }),
      pet: createTestBird({ financialBurden: undefined }),
    });

    expect(result.value).toBe(SCORE.LOW);
  });

});