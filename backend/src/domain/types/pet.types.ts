// domain/entities/pet.ts

import { AnimalType, ExperienceLevel, Level } from "../../domain/types/common.types";

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

  careNeed: Level;
  aggressionRisk: Level;

  timeRequired: number;

  sleepNeed: Level;
  flightNeed: Level;
}