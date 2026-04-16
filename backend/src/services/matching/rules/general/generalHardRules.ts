3// generalHardRules.ts
/**
 * General Hard Rules
 *
 * Contains species-independent rejection rules.
 *
 * Responsibilities:
 * - Define conditions under which a match is invalid
 * - Ensure basic welfare and feasibility constraints
 *
 * These rules apply to all pet types.
 * No evaluation logic is contained here, only rule definitions.
 */
import { MatchingContext } from '../../types/matching.types';

// 1. Allergy rule
export const allergyRule = (ctx: MatchingContext) => {
  const { adopter, pet } = ctx;

 if (
  adopter.household_allergy_sensitivity === 'specific_animal_allergy' &&
  adopter.specific_animal_allergies?.includes(pet.species)
) {
  return {
    rejected: true,
    reason: `Allergic to ${pet.species}`,
  };
}

  return { rejected: false };
};


// 2. No time rule
export const noTimeRule = (ctx: MatchingContext) => {
  if (ctx.adopter.daily_care_time === 0) {
    return { 
      rejected: true,
      rule: {
        rule_name: 'noTime',
        rule_type: 'hard_rule',
        value: 0,
        description: "User has no time for pet care",
      },
    };
  }
  return { rejected: false };
};

// 3. Commitment vs lifespan
export const commitmentRule = (ctx: MatchingContext) => {
  const { adopter, pet } = ctx;

  if (
    adopter.commitment_horizon_years &&
    pet.lifespan_years > adopter.commitment_horizon_years * 2
  ) {
    return {
      rejected: true,
      reason: 'Commitment too short for pet lifespan',
    };
  }

  return { rejected: false };
};

export const generalHardRules = [
  allergyRule,
  noTimeRule,
  commitmentRule,
];