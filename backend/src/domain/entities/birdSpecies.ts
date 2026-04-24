// // domain/entities/birdSpecies.ts
/**
 * Bird Species Entity
 *
 * Represents species-level characteristics shared across birds.
 *
 * Responsibilities:
 * - Define baseline traits (e.g. size, lifespan, care needs)
 * - Provide default values used when individual traits are missing
 *
 * This entity is combined with Bird to produce a normalized Pet model.
 */

import { Level, ExperienceLevel } from '../types/common.types';

export interface BirdSpecies {
  id: string;
  name: string;

  size: 'small' | 'medium' | 'large' | 'very_large';

  lifespanYears: number;

  socialNeed: Level;
  activityLevel: Level;
  noiseLevel: Level;

  experienceLevel: ExperienceLevel;

  timeRequired: number;
}