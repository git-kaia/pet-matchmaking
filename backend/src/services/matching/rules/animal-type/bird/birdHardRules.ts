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

// 1. Bird companionship rule
export const birdCompanionshipRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  if (!isBird(pet)) return pass('birdCompanionshipRule');

  const requiresPartner = pet.requiresBirdPartner;
  const aloneTime = adopter.aloneTimeHours;

  if (requiresPartner && aloneTime === 'high') {
    return {
      rejected: true,
      ruleName: 'birdCompanionshipRule',
      reason: 'Bird requires companionship but adopter is often away',

      adopterSnapshot: { aloneTimeHours: aloneTime },
      petSnapshot: {
        requiresBirdPartner: requiresPartner,
        idealAloneTime: 'low',
      },
    };
  }

  return {
    rejected: false,
    ruleName: 'birdCompanionshipRule',
    adopterSnapshot: { aloneTimeHours: aloneTime },
    petSnapshot: { requiresBirdPartner: requiresPartner },
  };
};

// 2. Free flight rule
export const freeFlightRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  if (!isBird(pet)) return pass('freeFlightRule');

  const flightNeed = pet.flightNeed;
  const expectation = adopter.freeFlightExpectation;

  if (
    expectation === 'very_low' &&
    (flightNeed === 'high' || flightNeed === 'very_high')
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

// 3. Sleep rule
export const sleepRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  if (!isBird(pet)) return pass('sleepRule');

  const sleepCommitment = adopter.sleepEnvironmentCommitment;
  const sleepNeed = pet.sleepNeed;

  if (sleepCommitment === 'low' && sleepNeed === 'high') {
    return {
      rejected: true,
      ruleName: 'sleepRule',
      reason: 'Cannot provide sufficient sleep environment',
      adopterSnapshot: { sleepCommitment },
      petSnapshot: { sleepNeed },
    };
  }

  return {
    rejected: false,
    ruleName: 'sleepRule',
    adopterSnapshot: { sleepCommitment },
    petSnapshot: { sleepNeed },
  };
};

// 4. Social isolation rule
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

// 5. Human interaction mismatch rule
export const humanInteractionRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  if (!isBird(pet)) return pass('humanInteractionRule');

  const interaction = adopter.desiredHumanInteraction;
  const socialNeed = pet.socialNeed;
  const requiresPartner = pet.requiresBirdPartner;

  if (
    interaction === 'low' &&
    socialNeed === 'very_high' &&
    !requiresPartner
  ) {
    return {
      rejected: true,
      ruleName: 'humanInteractionRule',
      reason: 'High social bird with low human interaction',
      adopterSnapshot: { interaction },
      petSnapshot: { socialNeed, requiresBirdPartner: requiresPartner },
    };
  }

  return {
    rejected: false,
    ruleName: 'humanInteractionRule',
    adopterSnapshot: { interaction },
    petSnapshot: { socialNeed, requiresBirdPartner: requiresPartner },
  };
};

// 6. Behavior intolerance rule
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
  birdCompanionshipRule,
  freeFlightRule,
  sleepRule,
  socialIsolationRule,
  humanInteractionRule,
  behaviorToleranceRule,
];