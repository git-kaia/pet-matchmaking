import { Bird } from '../../domain/entities/bird';
import { BirdSpecies } from '../../domain/entities/birdSpecies';
import { Pet } from '../../domain/types/pet.types';

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

  careNeed: bird.activityLevel, 
  aggressionRisk: bird.bitingRisk,
  sleepNeed: bird.sleepNeed,
  flightNeed: bird.flightNeed,
});