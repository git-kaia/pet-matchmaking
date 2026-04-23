// adopter.repository.ts

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

export const saveAdopter = async (adopter: Adopter) => {
  await pool.query(
    `INSERT INTO adopters (
      id, space_level, household_type, kids_age,
      has_current_pets, type_of_pet,
      household_noise_level, household_work_pattern, household_work_hours,
      daily_care_time, alone_time_hours,
      cleaning_tolerance, noise_tolerance_level,
      household_allergy_sensitivity,
      life_stability, commitment_horizon_years,
      rehome_responsibility_level, financial_priority,
      has_pet_experience, learning_willingness,
      pet_experience_type, experience_years_bird,
      desired_pet_sociability, desired_pet_affection_level, problem_behavior_tolerance,
      sleep_environment_commitment, free_flight_expectation, free_roaming_tolerance,
      mess_tolerance, destruction_tolerance,
      desired_human_interaction, desired_bonding_style, bird_over_human_acceptance,
      tameness_requirement, adoption_complexity_tolerance,
      willingness_multiple_birds,
      noise_sensitivity_time, sudden_noise_tolerance,
      enrichment_commitment, training_interest,
      diet_complexity_tolerance
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
      $11,$12,$13,$14,$15,$16,$17,$18,$19,$20,
      $21,$22,$23,$24,$25,$26,$27,$28,$29,$30,
      $31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41
    )`,
    [
      adopter.id,
      adopter.spaceLevel,
      adopter.householdType,
      adopter.kidsAge,
      adopter.hasCurrentPets,
      adopter.typeOfPet,
      adopter.householdNoiseLevel,
      adopter.householdWorkPattern,
      adopter.householdWorkHours,
      adopter.dailyCareTime,
      adopter.aloneTimeHours,
      adopter.cleaningTolerance,
      adopter.noiseToleranceLevel,
      adopter.householdAllergySensitivity,
      adopter.lifeStability,
      adopter.commitmentHorizonYears,
      adopter.rehomeResponsibilityLevel,
      adopter.financialPriority,
      adopter.hasPetExperience,
      adopter.learningWillingness,
      adopter.experienceYears?.bird ?? null,
      adopter.desiredPetSociability,
      adopter.desiredPetAffectionLevel,
      adopter.problemBehaviorTolerance,
      adopter.sleepEnvironmentCommitment,
      adopter.freeFlightExpectation,
      adopter.freeRoamingTolerance,
      adopter.messTolerance,
      adopter.destructionTolerance,
      adopter.desiredHumanInteraction,
      adopter.desiredBondingStyle,
      adopter.birdOverHumanAcceptance,
      adopter.tamenessRequirement,
      adopter.adoptionComplexityTolerance,
      adopter.willingnessMultipleBirds,
      adopter.noiseSensitivityTime,
      adopter.suddenNoiseTolerance,
      adopter.enrichmentCommitment,
      adopter.trainingInterest,
      adopter.dietComplexityTolerance
    ]
  );
};