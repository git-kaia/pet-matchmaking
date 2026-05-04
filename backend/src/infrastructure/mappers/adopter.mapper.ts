// adopter.mapper.ts
/**
 * Adopter Mapper
 *
 * Transforms database rows into Adopter domain entities.
 *
 * Responsibilities:
 * - Convert raw SQL results into structured domain objects
 * - Map snake_case database fields to camelCase properties
 * - Shape flat database data into nested domain structures
 *
 * This mapper ensures the domain layer remains independent of
 * database-specific naming and structure.
 *
 * Does NOT contain business logic.
 */

import { Adopter } from '../../domain/entities/adopter';

// mapping between db rows and domain model
export const mapAdopterFromDb = (row: any): Adopter => ({
  id: row.id,

  // Household basics
  kidsAge: row.kids_age,

  hasCurrentPets: row.has_current_pets,
  typeOfPet: row.type_of_pet,
  householdWorkPattern: row.household_work_pattern,

  // Core matching inputs
  dailyCareTime: row.daily_care_time,
  aloneTimeHours: row.alone_time_hours,

  cleaningTolerance: row.cleaning_tolerance,
  noiseToleranceLevel: row.noise_tolerance_level,

  householdAllergySensitivity: row.household_allergy_sensitivity,

  lifeStability: row.life_stability,
  commitmentHorizonYears: row.commitment_horizon_years,

  financialPriority: row.financial_priority,

  learningWillingness: row.learning_willingness,

  experienceYears: row.experience_years ?? {},

  desiredPetSociability: row.desired_pet_sociability,
  desiredPetAffectionLevel: row.desired_pet_affection_level,

  problemBehaviorTolerance: row.problem_behavior_tolerance,

  // Bird-related (USED)
  desiredHumanInteraction: row.desired_human_interaction,
  sleepEnvironmentCommitment: row.sleep_environment_commitment,
  freeFlightExpectation: row.free_flight_expectation,

  desiredBondingStyle: row.desired_bonding_style,
  adoptionComplexityTolerance: row.adoption_complexity_tolerance,

  willingnessMultipleBirds: row.willingness_multiple_birds,

  enrichmentCommitment: row.enrichment_commitment,
  trainingInterest: row.training_interest,

  dietComplexityTolerance: row.diet_complexity_tolerance,

  specificAnimalAllergies: row.specific_animal_allergies ?? [],
});