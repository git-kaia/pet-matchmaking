import { Adopter } from '../../../../domain/entities/adopter';
import { Pet } from  '../../../../domain/entities/pet';
import { HardRule } from '../../types/rule.types';
import { MatchingContext } from '../../types/matching.types';

// 1. Allergy rule
export const allergyRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  const allergies = adopter.specificAnimalAllergies || [];

  if (
    adopter.householdAllergySensitivity === 'specific_animal_allergy' &&
    allergies.includes(pet.species)
  ) {
    return {
      rejected: true,
      ruleName: 'allergyRule',
      reason: `Allergic to ${pet.species}`,

      adopterSnapshot: {
        allergySensitivity: adopter.householdAllergySensitivity,
        allergies,
      },

      petSnapshot: {
        species: pet.species,
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
      species: pet.species,
    },
  };
};

// 2. No time rule
export const noTimeRule: HardRule = (ctx) => {
  const time = ctx.adopter.dailyCareTime;

  if (time === 0) {
    return {
      rejected: true,
      ruleName: 'noTimeRule',
      reason: 'No time for pet care',

      adopterSnapshot: {
        dailyCareTime: time,
      },

      petSnapshot: {
        requiredCare: 'unknown', // placeholder
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
      requiredCare: 'unknown', // placeholder
    },
  };
};

// 3. Commitment vs lifespan
export const commitmentRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  const adopterCommitment = adopter.commitmentHorizonYears;
  const petLifespan = pet.lifespanYears;
  const requiredMinimum = petLifespan / 2;

  if (petLifespan > adopterCommitment * 2) {
    return {
      rejected: true,
      ruleName: 'commitmentRule',
      reason: 'Commitment too short for pet lifespan',

      adopterSnapshot: {
        commitmentYears: adopterCommitment,
      },

      petSnapshot: {
        lifespanYears: petLifespan,
        requiredMinimum,
        difference: adopterCommitment - requiredMinimum,
      },
    };
  }

  return {
    rejected: false,
    ruleName: 'commitmentRule',

    adopterSnapshot: {
      commitmentYears: adopterCommitment,
    },

    petSnapshot: {
      lifespanYears: petLifespan,
      requiredMinimum,
    },
  };
};

// 4. Work pattern rule
export const workPatternRule: HardRule = (ctx) => {
  const { adopter, pet } = ctx;

  const workPattern = adopter.householdWorkPattern;
  const careNeed = pet.careNeed;

  if (workPattern === 'full_time' && careNeed === 'very_high') {
    return {
      rejected: true,
      ruleName: 'workPatternRule',
      reason: 'Full-time work incompatible with very high care needs',
      adopterSnapshot: { workPattern },
      petSnapshot: { careNeed },
    };
  }

  return {
    rejected: false,
    ruleName: 'workPatternRule',
    adopterSnapshot: { workPattern },
    petSnapshot: { careNeed },
  };
};

// 5. Predation rule
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

// 6. Children safety rule
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
  commitmentRule,
  workPatternRule,
  predationRule,
  childrenSafetyRule,
];