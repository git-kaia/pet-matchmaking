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
import { Adopter } from '../../domain/entities/adopter';
import { isBird } from './utils/typeGuard.utils';
import { MatchResult } from './types/matching.types';

export const getMatchingService = (pet: Pet) => {
  return {
    execute: (adopter: Adopter): MatchResult => {

      if (isBird(pet)) {
        return runBirdPipeline(adopter, pet);
      }

      // FUTURE PIPLELINES (not yet implemented)
      /*
      if (isDog(pet)) {
        return runDogPipeline(adopter, pet);
      }

      if (isCat(pet)) {
        return runCatPipeline(adopter, pet);
      }

      if (isRodent(pet)) {
        return runRodentPipeline(adopter, pet);
      }

      if (isReptile(pet)) {
        return runReptilePipeline(adopter, pet);
      }

      if (isAmphibian(pet)) {
        return runAmphibianPipeline(adopter, pet);
      }

      if (isFish(pet)) {
        return runFishPipeline(adopter, pet);
      }
      */

      // fallback for currently unsupported pets
      return {
        petId: pet.id,
        score: 0,
        percentage: 0,
        welfareScore: 0,
        humanScore: 0,
        rejected: true,
        rejectionReason: `No matching pipeline for pet type: ${pet.animalType}`,
        rules: [],
      };
    },
  };
};