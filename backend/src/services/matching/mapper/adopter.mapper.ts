import { Adopter } from '../types/matching.types';

export const mapAdopterFromDB = (row: any): Adopter => {
  return {
    id: row.id,

    dailyCareTime: row.daily_care_time,

    householdAllergySensitivity: row.household_allergy_sensitivity,
    specificAnimalAllergies: [],

    aloneTimeHours: row.alone_time_hours,

    noiseToleranceLevel: row.noise_tolerance_level,
    cleaningTolerance: row.cleaning_tolerance,

    lifeStability: row.life_stability,
    commitmentHorizonYears: row.commitment_horizon_years,

    hasPetExperience: row.has_pet_experience,

    experienceYears: {
      bird: row.experience_years_bird,
    },

    desiredPetSociability: row.desired_pet_sociability,
    desiredPetAffectionLevel: row.desired_pet_affection_level,

    problemBehaviorTolerance: row.problem_behavior_tolerance,

    householdWorkPattern: row.household_work_pattern,
    hasCurrentPets: row.has_current_pets,
    typeOfPet: row.type_of_pet,
    kidsAge: row.kids_age,

    freeFlightExpectation: row.free_flight_expectation,
    sleepEnvironmentCommitment: row.sleep_environment_commitment,
    adoptionComplexityTolerance: row.adoption_complexity_tolerance,
  };
};