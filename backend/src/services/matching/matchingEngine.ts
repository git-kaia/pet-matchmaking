/**
 * Matching Engine (Dispatcher)
 *
 * Responsible ONLY for selecting the correct matching pipeline
 * based on the runtime type of the pet.
 *
 * It does NOT implement matching logic.
 */

import { runBirdPipeline } from './pipelines/bird.pipeline';

import { Pet } from '../../domain/entities/pet';
import { Adopter } from '../../domain/entities/adopter';

import { isBird } from './utils/typeGuard.utils';

import { MatchResult, MatchingPipeline } from './types/matching.types';

// We use `any` at the boundary because TS cannot preserve narrowing across returns
type AnyPipeline = MatchingPipeline<any>;

/**
 * Selects the correct pipeline based on pet type
 */
export const getMatchingPipeline = (pet: Pet): AnyPipeline | null => {
  if (isBird(pet)) {
    return runBirdPipeline; // MatchingPipeline<Bird> 
  }

  // FUTURE PIPELINES
  /*
  if (isDog(pet)) return runDogPipeline;
  if (isCat(pet)) return runCatPipeline;
  */

  return null;
};

/**
 * Executes matching for ONE adopter ↔ ONE pet
 */
export const matchAdopterWithPet = (
  adopter: Adopter,
  pet: Pet
): MatchResult => {

  // Narrow type BEFORE selecting pipeline
  if (isBird(pet)) {
    return runBirdPipeline(adopter, pet); // fully type-safe
  }

  // Future types here...

  // Fallback (unsupported pet type)
  return {
    petId: pet.id,
    score: 0,
    welfareScore: 0,
    humanScore: 0,
    rejected: true,
    rejectionReason: `No matching pipeline for pet type: ${pet.animalType}`,
    rules: [],
  };
};