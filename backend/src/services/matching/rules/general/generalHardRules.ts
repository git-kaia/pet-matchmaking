import { MatchingContext } from '../../types/matching.types';
import { HardRule } from '../../types/rule.types';


// 1. Allergy rule
export const allergyRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  if (
    adopter.householdAllergySensitivity === 'specific_animal_allergy' &&
    adopter.specificAnimalAllergies?.includes(pet.species)
  ) {
    return {
      rejected: true,
      rule: {
        ruleName: 'allergy',
        ruleType: 'hard_rule',
        value: 0,
        description: `Allergic to ${pet.species}`,
      },
    };
  }

  return { rejected: false };
};


// 2. No time rule
export const noTimeRule: HardRule = (ctx) => {
  if (ctx.adopter.dailyCareTime === 0) {
    return {
      rejected: true,
      rule: {
        ruleName: 'noTime',
        ruleType: 'hard_rule',
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
    adopter.commitmentHorizonYears &&
    pet.lifespanYears > adopter.commitmentHorizonYears * 2
  ) {
    return {
      rejected: true,
      rule: {
        ruleName: 'commitment',
        ruleType: 'hard_rule',
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