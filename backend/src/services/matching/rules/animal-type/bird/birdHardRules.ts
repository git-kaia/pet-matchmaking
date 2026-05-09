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
 * These rules only apply when the pet is a bird.
 * Non-bird pets automatically pass these rules.
 */

import { HardRule } from '../../../types/rule.types';
import { isHigh } from '../../../utils/level.utils';
import { isBird } from '../../../utils/typeGuard.utils';

///////////////////////
// Helper           //
///////////////////////

const pass = (ruleName: string) => ({
  rejected: false,
  ruleName,
});

///////////////////////
// RULES             //
///////////////////////

// 1. Free flight rule
export const freeFlightRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  if (!isBird(pet)) return pass('freeFlightRule');

  const flightNeed = pet.flightNeed;
  const expectation = adopter.freeFlightExpectation;

  if (
    expectation === 'very_low' &&
    isHigh(flightNeed)
  ) {
    return {
      rejected: true,
      ruleName: 'freeFlightRule',
      reason: 'Insufficient free flight for high-need bird',
      adopterSnapshot: { freeFlightExpectation: expectation },
      petSnapshot: { flightNeed },
    };
  }

  return {
    rejected: false,
    ruleName: 'freeFlightRule',
    adopterSnapshot: { freeFlightExpectation: expectation },
    petSnapshot: { flightNeed },
  };
};

// 2. Social isolation rule
export const socialIsolationRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  if (!isBird(pet)) return pass('socialIsolationRule');

  const requiresPartner = pet.requiresBirdPartner;
  const willingness = adopter.willingnessMultipleBirds;

  if (requiresPartner && willingness === 'low') {
    return {
      rejected: true,
      ruleName: 'socialIsolationRule',
      reason: 'Bird requires partner but adopter unwilling',
      adopterSnapshot: { willingness },
      petSnapshot: { requiresBirdPartner: requiresPartner },
    };
  }

  return {
    rejected: false,
    ruleName: 'socialIsolationRule',
    adopterSnapshot: { willingness },
    petSnapshot: { requiresBirdPartner: requiresPartner },
  };
};

// 3. Behavior intolerance rule
export const behaviorToleranceRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  if (!isBird(pet)) return pass('behaviorToleranceRule');

  const tolerance = adopter.adoptionComplexityTolerance;
  const aggression = pet.aggressionRisk;

  if (tolerance === 'low' && aggression === 'high') {
    return {
      rejected: true,
      ruleName: 'behaviorToleranceRule',
      reason: 'Adopter cannot handle high-risk behavior',
      adopterSnapshot: { tolerance },
      petSnapshot: { aggression },
    };
  }

  return {
    rejected: false,
    ruleName: 'behaviorToleranceRule',
    adopterSnapshot: { tolerance },
    petSnapshot: { aggression },
  };
};

///////////////////////
// Export            //
///////////////////////

export const birdHardRules: HardRule[] = [
  freeFlightRule,
  socialIsolationRule,
  behaviorToleranceRule,
];