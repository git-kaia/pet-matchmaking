// createTestAdopter.ts

import { Adopter } from '../../domain/entities/adopter';

export const createTestAdopter = (
  overrides: Partial<Adopter> = {}
): Adopter => ({
  id: 'test-adopter',

  // ---- General pet fields ----

  spaceLevel: 'medium',
  householdType: 'apartment',
  kidsAge: 'none',

  hasCurrentPets: false,
  typeOfPet: [],

  householdNoiseLevel: 'medium',

  householdWorkPattern: 'full_time',
  householdWorkHours: '9-17',

  dailyCareTime: 60,
  aloneTimeHours: 'medium',

  cleaningTolerance: 'medium',
  noiseToleranceLevel: 'medium',

  householdAllergySensitivity: 'none',

  lifeStability: 'medium',
  commitmentHorizonYears: 10,

  rehomeResponsibilityLevel: 'medium',
  financialPriority: 'medium',

  hasPetExperience: false,
  learningWillingness: 'medium',

  experienceYears: {},

  desiredPetSociability: 'medium',
  desiredPetAffectionLevel: 'medium',
  desiredHumanInteraction: 'medium',

  problemBehaviorTolerance: 'medium',
  
  // ---- Bird-specific fields ----

  sleepEnvironmentCommitment: 'medium',
  freeFlightExpectation: 'medium',
  freeRoamingTolerance: 'medium',

  messTolerance: 'medium',
  destructionTolerance: 'medium',

  desiredBondingStyle: 'independent',
  birdOverHumanAcceptance: 'medium',

  tamenessRequirement: 'medium',
  adoptionComplexityTolerance: 'medium',

  willingnessMultipleBirds: 'medium',

  noiseSensitivityTime: 'medium',
  suddenNoiseTolerance: 'medium',

  enrichmentCommitment: 'medium',
  trainingInterest: 'medium',

  dietComplexityTolerance: 'medium',

  specificAnimalAllergies: [],

  ...overrides,
});