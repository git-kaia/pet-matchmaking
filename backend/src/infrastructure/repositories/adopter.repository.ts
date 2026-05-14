// adopter.repository.ts
/**
 * Adopter Repository
 *
 * Handles persistence and retrieval of adopter data.
 *
 * Responsibilities:
 * - Execute queries against the adopters table
 * - Retrieve adopter records from the database
 * - Use mapper to convert DB rows into domain entities
 *
 * This repository abstracts database access from the rest of the system.
 * It does NOT contain business or matching logic.
 */

import { pool } from '../../infrastructure/db/db';
import { Adopter } from '../../domain/entities/adopter';
import { mapAdopterFromDb } from '../../infrastructure/mappers/adopter.mapper';

export const getAdopterById = async (id: string): Promise<Adopter | null> => {
  const result = await pool.query(
    'SELECT * FROM adopters WHERE id = $1',
    [id]
  );

  return result.rows[0] ? mapAdopterFromDb(result.rows[0]) : null;
};

export const getAllAdopters = async (): Promise<Adopter[]> => {
  const result = await pool.query(`
    SELECT *
    FROM adopters
  `);

  return result.rows.map(mapAdopterFromDb);
};

export const saveAdopter = async (adopter: Adopter) => {
  await pool.query(
    `INSERT INTO adopters (
      id,
      kids_age,
      has_current_pets,
      type_of_pet,
      household_work_pattern,
      daily_care_time,
      alone_time_hours,
      cleaning_tolerance,
      noise_tolerance_level,
      household_allergy_sensitivity,
      life_stability,
      commitment_horizon_years,
      financial_priority,
      learning_willingness,
      experience_years,
      desired_pet_sociability,
      desired_pet_affection_level,
      problem_behavior_tolerance,
      desired_human_interaction,
      sleep_environment_commitment,
      free_flight_expectation,
      desired_bonding_style,
      adoption_complexity_tolerance,
      willingness_multiple_birds,
      enrichment_commitment,
      training_interest,
      diet_complexity_tolerance,
      specific_animal_allergies
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
      $11,$12,$13,$14,$15,$16,$17,$18,$19,$20,
      $21,$22,$23,$24,$25,$26,$27,$28
    )`,
    [
      adopter.id,
      adopter.kidsAge,
      adopter.hasCurrentPets,
      adopter.typeOfPet,
      adopter.householdWorkPattern,
      adopter.dailyCareTime,
      adopter.aloneTimeHours,
      adopter.cleaningTolerance,
      adopter.noiseToleranceLevel,
      adopter.householdAllergySensitivity,
      adopter.lifeStability,
      adopter.commitmentHorizonYears,
      adopter.financialPriority,
      adopter.learningWillingness,
      adopter.experienceYears,
      adopter.desiredPetSociability,
      adopter.desiredPetAffectionLevel,
      adopter.problemBehaviorTolerance,
      adopter.desiredHumanInteraction,
      adopter.sleepEnvironmentCommitment,
      adopter.freeFlightExpectation,
      adopter.desiredBondingStyle,
      adopter.adoptionComplexityTolerance,
      adopter.willingnessMultipleBirds,
      adopter.enrichmentCommitment,
      adopter.trainingInterest,
      adopter.dietComplexityTolerance,
      adopter.specificAnimalAllergies
    ]
  );
};