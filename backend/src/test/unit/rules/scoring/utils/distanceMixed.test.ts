// createDistanceScore.test.ts

import { distanceMixed } from '../../../../../services/matching/utils/level.utils';

describe('distanceMixed', () => {
  it('returns 0 for identical levels', () => {
    expect(distanceMixed('very_high', 'very_high')).toBe(0);
  });

  it('returns correct distance for adjacent levels', () => {
    expect(distanceMixed('medium', 'high')).toBe(1);
  });

  it('returns correct distance for far levels', () => {
    expect(distanceMixed('low', 'high')).toBe(2);
  });

  it('handles very_low to very_high correctly', () => {
    expect(distanceMixed('very_low', 'very_high')).toBe(4);
  });
});