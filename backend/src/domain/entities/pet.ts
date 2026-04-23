// domain/entities/pet.ts

import { AnimalType, ExperienceLevel, Level } from "../types/common.types";

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

  // optional generic traits
  aggressionRisk?: 'low' | 'medium' | 'high';
  careNeed?: Level;
}