// test/scenarios/adopterProfiles.ts

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
  commitmentHorizonYears: 5,

  rehomeResponsibilityLevel: 'low',
  financialPriority: 'low',

  hasPetExperience: true,
  learningWillingness: 'low',
  experienceYears: { cat: 5 },

  desiredPetSociability: 'low',
  desiredPetAffectionLevel: 'low',
  desiredHumanInteraction: 'low',

  problemBehaviorTolerance: 'low',

  // ---- Bird-specific fields ----
  sleepEnvironmentCommitment: 'low',
  freeFlightExpectation: 'low',
  freeRoamingTolerance: 'low',

  messTolerance: 'low',
  destructionTolerance: 'low',

  birdOverHumanAcceptance: 'low',

  tamenessRequirement: 'low',
  adoptionComplexityTolerance: 'low',

  willingnessMultipleBirds: 'low',

  noiseSensitivityTime: 'low',
  suddenNoiseTolerance: 'low',

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
  spaceLevel: 'high',

  householdNoiseLevel: 'low',

  householdWorkPattern: 'part_time',

  dailyCareTime: 240,
  aloneTimeHours: 'low',

  cleaningTolerance: 'high',
  noiseToleranceLevel: 'high',

  lifeStability: 'high',
  commitmentHorizonYears: 30,

  rehomeResponsibilityLevel: 'high',
  financialPriority: 'high',

  hasPetExperience: true,
  learningWillingness: 'high',
  experienceYears: { bird: 10 },

  desiredPetSociability: 'high',
  desiredPetAffectionLevel: 'high',
  desiredHumanInteraction: 'high',

  problemBehaviorTolerance: 'high',

  // ---- Bird-specific fields ----
  sleepEnvironmentCommitment: 'high',
  freeFlightExpectation: 'high',
  freeRoamingTolerance: 'high',

  messTolerance: 'high',
  destructionTolerance: 'high',

  desiredBondingStyle: 'one_person',
  birdOverHumanAcceptance: 'high',

  tamenessRequirement: 'high',
  adoptionComplexityTolerance: 'high',

  willingnessMultipleBirds: 'high',

  noiseSensitivityTime: 'low',
  suddenNoiseTolerance: 'high',

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
  spaceLevel: 'low',

  dailyCareTime: 0,
  aloneTimeHours: 'high',

  cleaningTolerance: 'low',
  noiseToleranceLevel: 'low',

  lifeStability: 'low',
  commitmentHorizonYears: 2,

  rehomeResponsibilityLevel: 'low',
  financialPriority: 'low',

  hasPetExperience: false,
  learningWillingness: 'low',

  desiredPetSociability: 'low',
  desiredPetAffectionLevel: 'low',
  desiredHumanInteraction: 'low',

  problemBehaviorTolerance: 'low',

  // ---- Bird-specific fields ----
  sleepEnvironmentCommitment: 'low',
  freeFlightExpectation: 'low',
  freeRoamingTolerance: 'low',

  messTolerance: 'low',
  destructionTolerance: 'low',

  birdOverHumanAcceptance: 'low',

  tamenessRequirement: 'low',
  adoptionComplexityTolerance: 'low',

  willingnessMultipleBirds: 'low',

  noiseSensitivityTime: 'low',
  suddenNoiseTolerance: 'low',

  enrichmentCommitment: 'low',
  trainingInterest: 'low',

  dietComplexityTolerance: 'low',
});

export const adopterProfiles: Adopter[] = [
  lowCommitmentLowToleranceAdopter,
  highlyExperiencedHighCommitmentAdopter,
  noTimeInexperiencedLowToleranceAdopter,
];