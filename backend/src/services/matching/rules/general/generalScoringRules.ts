// generalScoringRules.ts
/**
 * General Scoring Rules
 *
 * Contains species-independent scoring logic.
 *
 * Responsibilities:
 * - Evaluate compatibility between adopter and pet
 * - Contribute to welfare and human satisfaction scores
 *
 * These rules apply across all pet types.
 * No evaluation logic is contained here, only rule definitions.
 */

//////////////
// IMPORTS //
////////////

import { ScoringRule } from '../../types/scoring.types';
import { RuleResult } from '../../types/matching.types';
import { Level } from '../../types/matching.types';

////////////
// UTILS //
//////////

// Utility to convert levels to numeric values for distance calculation
const levelMap = {
  very_low: 0,
  low: 1,
  medium: 2,
  high: 3,
  very_high: 4,
};

const distance = (a: Level, b: Level) => {
  return Math.abs(levelMap[a] - levelMap[b]);
};

////////////
// RULES //
////////// 

// 01. Time Availability Rule
export const timeAvailabilityRule: ScoringRule = (ctx) => {
  const time = ctx.adopter.daily_care_time;

  if (time >= 150) {
    return {
      type: 'welfare',
      value: 10,
      rule: {
        rule_name: 'timeAvailability',
        rule_type: 'welfare',
        value: 10,
        description: 'High daily care time available',
      },
    };
  }

  if (time >= 60) {
    return {
      type: 'welfare',
      value: 5,
      rule: {
        rule_name: 'timeAvailability',
        rule_type: 'welfare',
        value: 5,
        description: 'Moderate daily care time',
      },
    };
  }

  return {
    type: 'welfare',
    value: -10,
    rule: {
      rule_name: 'timeAvailability',
      rule_type: 'welfare',
      value: -10,
      description: 'Very low available care time',
    },
  };
};

// 02. Noise Tolerance Rule
export const noiseToleranceRule: ScoringRule = (ctx) => {
  const d = distance(
    ctx.adopter.noise_tolerance_level,
    ctx.pet.noise_level
  );

  if (d === 2) {
    return {
      type: 'human',
      value: -10,
      rule: {
        rule_name: 'noiseTolerance',
        rule_type: 'human',
        value: -10,
        description: 'High mismatch in noise tolerance',
      },
    };
  }

  if (d === 1) {
    return {
      type: 'human',
      value: -5,
      rule: {
        rule_name: 'noiseTolerance',
        rule_type: 'human',
        value: -5,
        description: 'Moderate mismatch in noise tolerance',
      },
    };
  }

  return {
    type: 'human',
    value: 0,
    rule: {
      rule_name: 'noiseTolerance',
      rule_type: 'human',
      value: 0,
      description: 'Good noise compatibility',
    },
  };
};

export const generalScoringRules = [
  timeAvailabilityRule,
  noiseToleranceRule,
];