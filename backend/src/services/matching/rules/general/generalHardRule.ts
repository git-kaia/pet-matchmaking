// hardRule.service.ts
// Handles:
// All reject logic for general pet rules

import { MatchingContext } from '../../types/matching.types';

export const evaluateHardRules = (ctx: MatchingContext) => {
  const { adopter, pet } = ctx;

  // 1. Allergy rule
  if (
    adopter.household_allergy_sensitivity === 'specific_animal_allergy' &&
    adopter.pet_experience_types?.includes('bird') // Focusing on bird specific allergy for now (simplicity)
  ) {
    return reject('Allergy risk');
  }

  // 2. No time
  if (adopter.daily_care_time === 0) {
    return reject('No time for pet care');
  }

  // 3. Commitment vs lifespan (EXTREME ONLY)
  if (
    adopter.commitment_horizon_years &&
    pet.lifespan_years > adopter.commitment_horizon_years * 2
  ) {
    return reject('Commitment too short for lifespan');
  }

  return ok();
};

const reject = (reason: string) => ({
  rejected: true,
  reason,
});

const ok = () => ({
  rejected: false,
});