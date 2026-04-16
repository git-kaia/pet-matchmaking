import { MatchingContext } from '../../types/matching.types';
import { HardRule } from '../../types/rule.types';


// 1. Allergy rule
export const allergyRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  if (
    adopter.household_allergy_sensitivity === 'specific_animal_allergy' &&
    adopter.specific_animal_allergies?.includes(pet.species)
  ) {
    return {
      rejected: true,
      rule: {
        rule_name: 'allergy',
        rule_type: 'hard_rule',
        value: 0,
        description: `Allergic to ${pet.species}`,
      },
    };
  }

  return { rejected: false };
};


// 2. No time rule
export const noTimeRule: HardRule = (ctx) => {
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
export const commitmentRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  if (
    adopter.commitment_horizon_years &&
    pet.lifespan_years > adopter.commitment_horizon_years * 2
  ) {
    return {
      rejected: true,
      rule: {
        rule_name: 'commitment',
        rule_type: 'hard_rule',
        value: 0,
        description: 'Commitment too short for pet lifespan',
      },
    };
  }

  return { rejected: false };
};


export const generalHardRules: HardRule[] = [
  allergyRule,
  noTimeRule,
  commitmentRule,
];