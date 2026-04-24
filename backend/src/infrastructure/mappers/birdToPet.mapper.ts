// birdToPet.mapper.ts
/**
 * Bird to Pet Mapper
 *
 * Transforms Bird (and optionally BirdSpecies) into a normalized
 * structure used by the matching logic.
 *
 * Responsibilities:
 * - Derive general matching attributes from bird-specific data
 * - Combine individual traits with species-level defaults
 * - Provide a consistent structure for rule evaluation
 *
 * Unlike other mappers, this is NOT a database mapper.
 * It is part of the matching logic and represents a transformation
 * between domain concepts.
 */

import { Bird } from '../../domain/entities/bird';
import { BirdSpecies } from '../../domain/entities/birdSpecies';
import { Pet } from '../../domain/types/pet';

export const mapBirdToPet = (
  bird: Bird,
  species: BirdSpecies
): Pet => ({
  id: bird.id,
  animalType: 'bird',

  size: species.size,

  // Prefer individual traits, fallback to species
  noiseLevel: bird.noiseLevel ?? species.noiseLevel,
  activityLevel: bird.activityLevel ?? species.activityLevel,

  // Species defines baseline need
  socialNeed: species.socialNeed,

  // Individual trait
  affectionLevel: bird.affectionLevel,

  // Species defines required experience
  experienceLevel: species.experienceLevel,

  lifespanYears: species.lifespanYears,
  timeRequired: species.timeRequired,
});