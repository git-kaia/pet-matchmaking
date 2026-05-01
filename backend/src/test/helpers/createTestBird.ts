// createTestBird.ts

import { Bird } from '../../domain/entities/bird';

export const createTestBird = (
  overrides: Partial<Bird> = {}
): Bird => ({
  id: 'test-bird',
  speciesId: 'test-species',

  animalType: 'bird',

  // ---- Pet base fields ----
  size: 'medium',

  noiseLevel: 'medium',
  activityLevel: 'medium',
  socialNeed: 'medium',
  affectionLevel: 'medium',

  experienceLevel: 'beginner',
  lifespanYears: 15,

  timeRequired: 60,
  messLevel: 'medium',
  financialBurden: 'medium',

  careNeed: 'medium',
  aggressionRisk: 'low',
  behaviourIssues: 'medium',

  // ---- Bird-specific fields ----
  socialWithHumans: 'medium',
  socialWithBirds: 'medium',
  bondingStyle: 'independent',

  bitingRisk: 'low',
  screamingLevel: 'medium',
  destructiveness: 'medium',
  separationAnxiety: 'medium',

  toleratesChildren: 'medium',
  toleratesStrangers: 'medium',

  requiresBirdPartner: false,
  canLiveWithOtherBirds: 'medium',

  trainingLevel: 'beginner',
  mentalStimulationNeed: 'medium',

  sleepNeed: 'medium',
  flightNeed: 'medium',

  dietComplexity: 'medium',

  ...overrides,
});