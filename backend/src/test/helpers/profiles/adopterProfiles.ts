// adopterProfiles.ts

import { createTestAdopter } from '../createTestAdopter';
import { Adopter } from '../../../domain/entities/adopter';

/////////////////////////////////
// INDIVIDUAL ADOPTER PROFILES //
/////////////////////////////////

/**
 * Low time, low tolerance, low commitment adopter
 * Likely poor match for most demanding pets
 */
export const lowCommitmentLowToleranceAdopter: Adopter = createTestAdopter({
  id: 'busy_cat_owner',

  // ---- General pet fields ----
  hasCurrentPets: true,
  typeOfPet: ['cat'],

  aloneTimeHours: 'high',

  cleaningTolerance: 'low',
  noiseToleranceLevel: 'low',

  lifeStability: 'low',
  commitmentHorizonYears: 10,

  financialPriority: 'low',

  learningWillingness: 'low',
  experienceYears: { cat: 5 },

  desiredPetSociability: 'low',
  desiredPetAffectionLevel: 'low',
  desiredHumanInteraction: 'low',

  problemBehaviorTolerance: 'low',

  // ---- Bird-specific fields ----
  sleepEnvironmentCommitment: 'low',
  freeFlightExpectation: 'low',
  adoptionComplexityTolerance: 'low',

  willingnessMultipleBirds: 'low',

  enrichmentCommitment: 'low',
  trainingInterest: 'low',

  dietComplexityTolerance: 'low',
});


/**
 * Highly experienced, committed, and capable adopter
 * Ideal for demanding or complex pets
 */
export const highlyExperiencedHighCommitmentAdopter: Adopter = createTestAdopter({
  id: 'experienced_bird_keeper',

  // ---- General pet fields ----

  householdWorkPattern: 'part_time',

  dailyCareTime: 240,
  aloneTimeHours: 'low',

  cleaningTolerance: 'high',
  noiseToleranceLevel: 'high',

  lifeStability: 'high',
  commitmentHorizonYears: 30,
  financialPriority: 'high',

  learningWillingness: 'high',
  experienceYears: { bird: 10 },

  desiredPetSociability: 'high',
  desiredPetAffectionLevel: 'high',
  desiredHumanInteraction: 'high',

  problemBehaviorTolerance: 'high',

  // ---- Bird-specific fields ----
  sleepEnvironmentCommitment: 'high',
  freeFlightExpectation: 'high',

  desiredBondingStyle: 'one_person',

  adoptionComplexityTolerance: 'high',

  willingnessMultipleBirds: 'high',

  enrichmentCommitment: 'high',
  trainingInterest: 'high',

  dietComplexityTolerance: 'high',
});


/**
 * No time, no experience, low tolerance adopter
 * Should fail most compatibility checks
 */
export const noTimeInexperiencedLowToleranceAdopter: Adopter = createTestAdopter({
  id: 'no_time_user',

  // ---- General pet fields ----

  dailyCareTime: 0,
  aloneTimeHours: 'high',

  cleaningTolerance: 'low',
  noiseToleranceLevel: 'low',

  lifeStability: 'low',
  commitmentHorizonYears: 2,

  financialPriority: 'low',

  learningWillingness: 'low',

  desiredPetSociability: 'low',
  desiredPetAffectionLevel: 'low',
  desiredHumanInteraction: 'low',

  problemBehaviorTolerance: 'low',

  // ---- Bird-specific fields ----
  sleepEnvironmentCommitment: 'low',
  freeFlightExpectation: 'low',

  adoptionComplexityTolerance: 'low',

  willingnessMultipleBirds: 'low',

  enrichmentCommitment: 'low',
  trainingInterest: 'low',

  dietComplexityTolerance: 'low',
});

export const adopterProfiles: Adopter[] = [
  lowCommitmentLowToleranceAdopter,
  highlyExperiencedHighCommitmentAdopter,
  noTimeInexperiencedLowToleranceAdopter,
];