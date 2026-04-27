// level.utils.ts

import { Level, Level3 } from '../../../domain/types/common.types';

/////////////////////////////
// INTERNAL MAP            //
/////////////////////////////

// Canonical numeric representation of Level
export const levelMap: Record<Level, number> = {
  very_low: 0,
  low: 1,
  medium: 2,
  high: 3,
  very_high: 4,
};

/////////////////////////////
// DISTANCE                //
/////////////////////////////

/**
 * Computes distance between two levels (Level or Level3)
 */
export const distanceMixed = (a: Level | Level3, b: Level | Level3): number =>
  Math.abs(levelMap[a] - levelMap[b]);

/////////////////////////////
// LEVEL CHECKS            //
/////////////////////////////

/**
 * Returns true if level is on the high end of the spectrum
 */
export const isHigh = (level: Level | Level3): boolean => {
  return level === 'high' || level === 'very_high';
};

/**
 * Returns true if level is on the low end of the spectrum
 */
export const isLow = (level: Level | Level3): boolean => {
  const value = levelMap[level as Level];
  return value <= 1; // very_low (0) or low (1)
};