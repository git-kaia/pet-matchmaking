// createTestPet.ts

import { Pet } from '../../domain/entities/pet';

export const createTestPet = (
  overrides: Partial<Pet> = {}
): Pet => ({
  id: 'test-pet',

  animalType: 'dog', // Not bird by default (to test typeGuard)

  size: 'medium',

  noiseLevel: 'medium',
  socialNeed: 'medium',
  affectionLevel: 'medium',

  experienceLevel: 'beginner',
  lifespanYears: 10,

  timeRequired: 60,
  messLevel: 'medium',
  financialBurden: 'medium',

  careNeed: 'medium',
  aggressionRisk: 'low',
  behaviourIssues: 'medium',

  ...overrides,
});