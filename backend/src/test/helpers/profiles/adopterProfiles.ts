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

/**
 * Motivated beginner with strong willingness to learn.
 * Should perform well with moderate birds,
 * but struggle somewhat with highly demanding birds.
 */
export const motivatedBeginnerAdopter: Adopter = createTestAdopter({
  id: 'motivated_beginner',

  householdWorkPattern: 'part_time',

  dailyCareTime: 180,
  aloneTimeHours: 'medium',

  cleaningTolerance: 'medium',
  noiseToleranceLevel: 'medium',

  lifeStability: 'high',
  commitmentHorizonYears: 15,

  financialPriority: 'medium',

  learningWillingness: 'high',

  experienceYears: {
    bird: 1,
  },

  desiredPetSociability: 'high',
  desiredPetAffectionLevel: 'high',
  desiredHumanInteraction: 'high',

  problemBehaviorTolerance: 'medium',

  // Bird-specific
  sleepEnvironmentCommitment: 'high',
  freeFlightExpectation: 'high',

  desiredBondingStyle: 'multiple_people',

  adoptionComplexityTolerance: 'medium',

  willingnessMultipleBirds: 'high',

  enrichmentCommitment: 'high',
  trainingInterest: 'high',

  dietComplexityTolerance: 'medium',
});


/**
 * Capable adopter with strong lifestyle and welfare capacity,
 * but poor preference compatibility with demanding birds.
 *
 * Demonstrates separation between:
 * - welfare compatibility
 * - human/preference compatibility
 */
export const preferenceMismatchAdopter: Adopter = createTestAdopter({
  id: 'preference_mismatch_user',

  householdWorkPattern: 'flexible',

  dailyCareTime: 180,
  aloneTimeHours: 'low',

  cleaningTolerance: 'low',
  noiseToleranceLevel: 'low',

  lifeStability: 'high',
  commitmentHorizonYears: 20,

  financialPriority: 'high',

  learningWillingness: 'high',

  experienceYears: {
    bird: 6,
  },

  desiredPetSociability: 'low',
  desiredPetAffectionLevel: 'low',
  desiredHumanInteraction: 'low',

  problemBehaviorTolerance: 'low',

  // Bird-specific
  sleepEnvironmentCommitment: 'high',
  freeFlightExpectation: 'high',

  desiredBondingStyle: 'independent',

  adoptionComplexityTolerance: 'high',

  willingnessMultipleBirds: 'medium',

  enrichmentCommitment: 'high',
  trainingInterest: 'high',

  dietComplexityTolerance: 'high',
});


/**
 * Stable family household.
 * Balanced profile intended to produce moderate scores.
 */
export const familyHouseholdAdopter: Adopter = createTestAdopter({
  id: 'family_household_user',

  kidsAge: 'under_ten',

  householdWorkPattern: 'full_time',

  dailyCareTime: 120,
  aloneTimeHours: 'medium',

  cleaningTolerance: 'medium',
  noiseToleranceLevel: 'medium',

  lifeStability: 'high',
  commitmentHorizonYears: 15,

  financialPriority: 'medium',

  learningWillingness: 'medium',

  experienceYears: {
    bird: 2,
  },

  desiredPetSociability: 'medium',
  desiredPetAffectionLevel: 'medium',
  desiredHumanInteraction: 'medium',

  problemBehaviorTolerance: 'medium',

  // Bird-specific
  sleepEnvironmentCommitment: 'medium',
  freeFlightExpectation: 'medium',

  desiredBondingStyle: 'multiple_people',

  adoptionComplexityTolerance: 'medium',

  willingnessMultipleBirds: 'medium',

  enrichmentCommitment: 'medium',
  trainingInterest: 'medium',

  dietComplexityTolerance: 'medium',
});


/**
 * Lifestyle conflict adopter.
 * Should avoid rejection, but accumulate many scoring penalties.
 */
export const lifestyleConflictAdopter: Adopter = createTestAdopter({
  id: 'lifestyle_conflict_user',

  householdWorkPattern: 'full_time',

  dailyCareTime: 65,

  aloneTimeHours: 'high',

  cleaningTolerance: 'low',
  noiseToleranceLevel: 'low',

  lifeStability: 'low',
  commitmentHorizonYears: 5,

  financialPriority: 'low',

  learningWillingness: 'low',

  experienceYears: {},

  desiredPetSociability: 'low',
  desiredPetAffectionLevel: 'low',

  problemBehaviorTolerance: 'low',

  sleepEnvironmentCommitment: 'low',
  freeFlightExpectation: 'low',

  desiredBondingStyle: 'independent',

  willingnessMultipleBirds: 'low',

  enrichmentCommitment: 'low',
  trainingInterest: 'low',

  dietComplexityTolerance: 'low',
});

export const adopterProfiles: Adopter[] = [
  lowCommitmentLowToleranceAdopter,
  highlyExperiencedHighCommitmentAdopter,
  noTimeInexperiencedLowToleranceAdopter,
  motivatedBeginnerAdopter,
  preferenceMismatchAdopter,
  familyHouseholdAdopter,
  lifestyleConflictAdopter,
];