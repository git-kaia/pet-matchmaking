// birdHardRules.ts
/**
 * Bird Hard Rules
 *
 * Contains species-specific rejection rules for birds.
 *
 * Responsibilities:
 * - Define conditions under which a bird match is invalid
 * - Ensure basic welfare and feasibility constraints
 *
 * These rules apply to all pet types.
 * No evaluation logic is contained here, only rule definitions.
 */

import { MatchingContext } from '../../../types/matching.types';

export const isRejected = (ctx: MatchingContext): boolean => {
  const { adopter, bird } = ctx;

  // Bird needs companion but adopter not willing (simplified)
  if (bird.requires_bird_partner && adopter.alone_time_hours === 'high') {
    return true;
  }

  return false;
};

export const birdHardRules = [
  isRejected,
];