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
import { HardRule } from '../../../types/rule.types';

export const birdCompanionshipRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;
  const bird = pet as any; // or proper type guard later

  if (bird.requires_bird_partner && adopter.alone_time_hours === 'high') {
    return {
      rejected: true,
      reason: 'Bird requires companionship but adopter is often away',
    };
  }

  return { rejected: false };
};

export const birdHardRules = [birdCompanionshipRule];