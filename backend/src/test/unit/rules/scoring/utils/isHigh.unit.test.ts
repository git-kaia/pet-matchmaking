// isHigh.unit.test.ts

import { isHigh } from '../../../../../services/matching/utils/level.utils'

describe('isHigh', () => {
  it('returns true for high levels', () => {
    expect(isHigh('high')).toBe(true);
    expect(isHigh('very_high')).toBe(true);
  });

  it('returns false for non-high levels', () => {
    expect(isHigh('medium')).toBe(false);
    expect(isHigh('low')).toBe(false);
    expect(isHigh('very_low')).toBe(false);
  });
});