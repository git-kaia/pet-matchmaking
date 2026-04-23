// domain/entities/bird.ts

import { Level, Level3, BondingStyle, ExperienceLevel } from '../types/common.types';

export interface Bird {
  id: string;
  speciesId: string;

  // Core behavioral traits
  socialWithHumans: Level;
  socialWithBirds: Level;

  bondingStyle: BondingStyle;

  // Risk & behavior
  bitingRisk: Level3;
  screamingLevel: Level;
  destructiveness: Level3;
  separationAnxiety: Level;

  // Environment compatibility
  toleratesChildren: Level3;
  toleratesStrangers: Level3;

  // Social structure
  requiresBirdPartner: boolean;
  canLiveWithOtherBirds: Level3;

  // Cognitive / training
  trainingLevel: ExperienceLevel;
  mentalStimulationNeed: Level;

  // Additional traits used for mapping
  activityLevel: Level;
  noiseLevel: Level;
  affectionLevel: Level;
}