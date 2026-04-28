// domain/entities/pet.ts
/**
 * Pet-Related Types
 *
 * Defines types specific to animal classification and shared pet concepts.
 *
 * Responsibilities:
 * - Represent animal categories (e.g. AnimalType)
 * - Support typing for matching and domain entities
 *
 * This file complements common.types with domain-specific typing.
 */

import { AnimalType, ExperienceLevel, Level, Level3 } from "../types/common.types";

export interface Pet {
  id: string;

  animalType: AnimalType;

  size: 'very_small' | 'small' | 'medium' | 'large' | 'very_large';

  noiseLevel: Level;
  activityLevel: Level;
  socialNeed: Level;
  affectionLevel: Level;

  experienceLevel: ExperienceLevel;
  lifespanYears: number;

  timeRequired: number;
  messLevel: Level;
  financialBurden: Level3;

  careNeed: Level; 
  aggressionRisk: Level3;
  behaviourIssues: Level;
}