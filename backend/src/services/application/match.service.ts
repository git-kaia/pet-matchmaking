import { matchAdopterWithPet } from '../matching/matchingEngine';
import { Adopter } from '../../domain/entities/adopter';
import { Pet } from '../../domain/entities/pet';
import { MatchResult } from '../matching/types/matching.types';

// Adopter → many pets
export const matchAdopterWithPets = async (
  adopter: Adopter,
  pets: Pet[]
): Promise<MatchResult[]> => {

  const results = pets.map((pet) =>
    matchAdopterWithPet(adopter, pet)
  );

  return results
    .filter((r) => !r.rejected)
    .sort((a, b) => b.score - a.score);
};


// Pet → many adopters
export const matchPetWithAdopters = async (
  pet: Pet,
  adopters: Adopter[]
): Promise<MatchResult[]> => {

  const results = adopters.map((adopter) =>
    matchAdopterWithPet(adopter, pet)
  );

  return results
    .filter((r) => !r.rejected)
    .sort((a, b) => b.score - a.score);
};