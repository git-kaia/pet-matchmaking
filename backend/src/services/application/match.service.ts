// match.service.ts
/**
 * Match Service (Application Layer - Orchestrator)
 *
 * Responsible for coordinating the full matching process.
 *
 * Responsibilities:
 * - Retrieve adopter and pet data from services/repositories
 * - Select appropriate matching pipeline via the matching engine (dispatcher)
 * - Execute matching process
 * - Return ranked match results
 *
 * This service does NOT implement matching logic itself.
 * It delegates all evaluation to the matching domain layer.
 */

import { getMatchingService } from '../matching/matchingEngine';

export const matchAdopterWithPets = async (
  adopter: any,
  pets: any[],
  petType: string
) => {
  const matchingService = getMatchingService(animalType);

  return matchingService.execute(adopter, pet);
};

