// createTestAdopter.ts

import { Adopter } from '../../domain/entities/adopter';

export const createTestAdopter = (
  overrides: Partial<Adopter> = {}
): Adopter => ({
  id: 'test-adopter',

  // ---- General pet fields ----

  kidsAge: 'none',

  hasCurrentPets: false,
  typeOfPet: [],

  householdWorkPattern: 'full_time',

  dailyCareTime: 60,
  aloneTimeHours: 'medium',

  cleaningTolerance: 'medium',
  noiseToleranceLevel: 'medium',

  householdAllergySensitivity: 'none',

  lifeStability: 'medium',
  commitmentHorizonYears: 10,

  financialPriority: 'medium',

  // hasPetExperience: false,
  learningWillingness: 'medium',

  experienceYears: {},

  desiredPetSociability: 'medium',
  desiredPetAffectionLevel: 'medium',
  desiredHumanInteraction: 'medium',

  problemBehaviorTolerance: 'medium',
  
  // ---- Bird-specific fields ----

  sleepEnvironmentCommitment: 'medium',
  freeFlightExpectation: 'medium',

  desiredBondingStyle: 'independent',

  adoptionComplexityTolerance: 'medium',

  willingnessMultipleBirds: 'medium',

  enrichmentCommitment: 'medium',
  trainingInterest: 'medium',

  dietComplexityTolerance: 'medium',

  specificAnimalAllergies: [],

  ...overrides,
});