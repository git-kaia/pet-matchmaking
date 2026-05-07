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
  bondingStyle: 'independent',

  requiresBirdPartner: false,
  mentalStimulationNeed: 'medium',

  sleepNeed: 'medium',
  flightNeed: 'medium',

  dietComplexity: 'medium',

  ...overrides,
});