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
// NORMALIZATION           //
/////////////////////////////

/**
 * Normalizes Level3 → Level
 * Ensures all comparisons operate on the same 5-step scale
 */
export const normalizeLevel = (level: Level | Level3): Level => {
  switch (level) {
    case 'low':
      return 'low';
    case 'medium':
      return 'medium';
    case 'high':
      return 'high';

    // Already Level
    case 'very_low':
    case 'very_high':
      return level;
  }
};

/////////////////////////////
// DISTANCE               //
/////////////////////////////

/**
 * Computes distance between two levels (Level or Level3)
 * Always normalizes first → guarantees consistency
 */
export const distanceMixed = (
  a: Level | Level3,
  b: Level | Level3
): number => {
  const normA = normalizeLevel(a);
  const normB = normalizeLevel(b);

  return Math.abs(levelMap[normA] - levelMap[normB]);
};

/////////////////////////////
// LEVEL CHECKS           //
/////////////////////////////

/**
 * Returns true if level is on the high end of the spectrum
 */
export const isHigh = (level: Level | Level3): boolean => {
  const normalized = normalizeLevel(level);
  return normalized === 'high' || normalized === 'very_high';
};

/////////////////////////////
// SCORING HELPERS        //
/////////////////////////////

/**
 * Converts distance → score
 * Default scoring pattern used across rules
 */
export const scoreFromDistance = (
  d: number,
  {
    far = -10,     // critical mismatch
    mid = -5,      // moderate mismatch
    close = 0,     // acceptable / good
  } = {}
): number => {
  if (d >= 2) return far;
  if (d === 1) return mid;
  return close;
};

/**
 * Converts distance → human-readable description
 */
export const describeDistance = (
  d: number,
  label: string
): string => {
  if (d >= 2) return `High mismatch in ${label}`;
  if (d === 1) return `Moderate mismatch in ${label}`;
  return `Good ${label} match`;
};