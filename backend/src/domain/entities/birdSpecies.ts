// // domain/entities/birdSpecies.ts

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