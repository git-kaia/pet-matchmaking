// adopter.mapper.ts
import { Adopter } from './adopter.model';

// mapping between db rows and domain model
export const mapAdopterFromDb = (row: any): Adopter => ({
  id: row.id,
  spaceLevel: row.space_level,
  householdType: row.household_type,
  kidsAge: row.kids_age,

  hasCurrentPets: row.has_current_pets,
  typeOfPet: row.type_of_pet,

  householdNoiseLevel: row.household_noise_level,

  householdWorkPattern: row.household_work_pattern,
  householdWorkHours: row.household_work_hours,

  dailyCareTime: row.daily_care_time,
  aloneTimeHours: row.alone_time_hours,

  cleaningTolerance: row.cleaning_tolerance,
  noiseToleranceLevel: row.noise_tolerance_level,

  householdAllergySensitivity: row.household_allergy_sensitivity,

  lifeStability: row.life_stability,
  commitmentHorizonYears: row.commitment_horizon_years,

  rehomeResponsibilityLevel: row.rehome_responsibility_level,
  financialPriority: row.financial_priority,

  hasPetExperience: row.has_pet_experience,
  learningWillingness: row.learning_willingness,

  petExperienceType: row.pet_experience_type,
  experienceYears: {
    bird: row.experience_years_bird,
  },

  desiredPetSociability: row.desired_pet_sociability,
  desiredPetAffectionLevel: row.desired_pet_affection_level,
  problemBehaviorTolerance: row.problem_behavior_tolerance,

  sleepEnvironmentCommitment: row.sleep_environment_commitment,
  freeFlightExpectation: row.free_flight_expectation,
  freeRoamingTolerance: row.free_roaming_tolerance,

  messTolerance: row.mess_tolerance,
  destructionTolerance: row.destruction_tolerance,

  desiredBondingStyle: row.desired_bonding_style,
  birdOverHumanAcceptance: row.bird_over_human_acceptance,

  tamenessRequirement: row.tameness_requirement,
  adoptionComplexityTolerance: row.adoption_complexity_tolerance,

  desiredHumanInteraction: row.desired_human_interaction,
  willingnessMultipleBirds: row.willingness_multiple_birds,

  noiseSensitivityTime: row.noise_sensitivity_time,
  suddenNoiseTolerance: row.sudden_noise_tolerance,

  enrichmentCommitment: row.enrichment_commitment,
  trainingInterest: row.training_interest,

  dietComplexityTolerance: row.diet_complexity_tolerance

});