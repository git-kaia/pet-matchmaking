// matchingEngine.ts
/**
 * Matching Engine (Dispatcher)
 *
 * Responsible for selecting the correct matching pipeline
 * based on the pet type (e.g. bird, dog, etc.).
 *
 * This enables the system to support multiple species
 * while keeping matching logic modular and extensible.
 */

import { runBirdPipeline } from './pipelines/bird.pipeline';
import { Pet } from '../../domain/entities/pet';
import { Bird } from '../../domain/entities/bird';
import { Adopter } from '../../domain/entities/adopter';
import { typeGuard } from './utils/typeGuard'

export const getMatchingService = (pet: Pet) => {
  switch (pet.animalType) {
    case 'bird':
      return {
        execute: (adopter: Adopter) =>
          runBirdPipeline(adopter, pet as Bird),
      };

    // placeholders for future pipelines
    case 'dog':
    case 'cat':
    case 'rodent':
    case 'reptile':
    case 'amphibian':
    case 'fish':
    default:
      return {
        execute: () => ({
          rejected: false,
          reason: 'No matching pipeline for pet type',
        }),
      };
  }
};