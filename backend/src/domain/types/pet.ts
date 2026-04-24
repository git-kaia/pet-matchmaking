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

import { AnimalType, ExperienceLevel, Level } from "./common.types";

export interface Pet {
  id: string;

  animalType: AnimalType;

  size: 'small' | 'medium' | 'large' | 'very_large';

  noiseLevel: Level;
  activityLevel: Level;
  socialNeed: Level;
  affectionLevel: Level;

  experienceLevel: ExperienceLevel;
  lifespanYears: number;

  timeRequired: number;
  messLevel: Level;
  financialBurden: Level;

  careNeed: Level; 
  aggressionRisk: Level;
  sleepNeed: Level;

  // move this to bird?
  flightNeed: Level;
  requiredCare: Level;
  requiresBirdPartner?: boolean;
  mentalStimulationNeed?: Level;
  
}