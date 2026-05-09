// generalHardRules.ts
/**
 * General Hard Rules
 *
 * Contains rejection rules for all pets.
 *
 * Responsibilities:
 * - Define conditions under which a match is invalid
 * - Ensure basic welfare and feasibility constraints
 */

import { HardRule } from '../../types/rule.types';

// 1. Allergy rule
export const allergyRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  const allergies = adopter.specificAnimalAllergies || [];

  if (
    adopter.householdAllergySensitivity === 'specific_animal_allergy' &&
    allergies.includes(pet.animalType)
  ) {
    return {
      rejected: true,
      ruleName: 'allergyRule',
      reason: `Allergic to ${pet.animalType}`,

      adopterSnapshot: {
        allergySensitivity: adopter.householdAllergySensitivity,
        allergies,
      },

      petSnapshot: {
        species: pet.animalType,
      },
    };
  }

  return {
    rejected: false,
    ruleName: 'allergyRule',

    adopterSnapshot: {
      allergySensitivity: adopter.householdAllergySensitivity,
      allergies,
    },

    petSnapshot: {
      species: pet.animalType,
    },
  };
};

// 2. No time rule
export const noTimeRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  const time = adopter.dailyCareTime;

  if (time === 0) {
    return {
      rejected: true,
      ruleName: 'noTimeRule',
      reason: 'No time for pet care',

      adopterSnapshot: {
        dailyCareTime: time,
      },

      petSnapshot: {
        requiredCare: pet.careNeed ?? 'unknown'
      },
    };
  }

  return {
    rejected: false,
    ruleName: 'noTimeRule',

    adopterSnapshot: {
      dailyCareTime: time,
    },

    petSnapshot: {
      requiredCare: pet.careNeed ?? 'unknown',
    },
  };
};

// 3. Predation rule
export const predationRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  const hasCats = adopter.typeOfPet?.includes('cat');
  const hasPets = adopter.hasCurrentPets;
  const petSize = pet.size;

  if (hasPets && hasCats && petSize === 'small') {
    return {
      rejected: true,
      ruleName: 'predationRule',
      reason: 'Risk of predation: cat + small pet',
      adopterSnapshot: { hasPets, typeOfPet: adopter.typeOfPet },
      petSnapshot: { size: petSize },
    };
  }

  return {
    rejected: false,
    ruleName: 'predationRule',
    adopterSnapshot: { hasPets, typeOfPet: adopter.typeOfPet },
    petSnapshot: { size: petSize },
  };
};

// 4. Children safety rule
export const childrenSafetyRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  const kids = adopter.kidsAge;
  const aggression = pet.aggressionRisk;

  if (kids === 'under_ten' && aggression === 'high') {
    return {
      rejected: true,
      ruleName: 'childrenSafetyRule',
      reason: 'Unsafe: young children + high aggression risk',
      adopterSnapshot: { kidsAge: kids },
      petSnapshot: { aggressionRisk: aggression },
    };
  }

  return {
    rejected: false,
    ruleName: 'childrenSafetyRule',
    adopterSnapshot: { kidsAge: kids },
    petSnapshot: { aggressionRisk: aggression },
  };
};

export const generalHardRules: HardRule[] = [
  allergyRule,
  noTimeRule,
  predationRule,
  childrenSafetyRule,
];