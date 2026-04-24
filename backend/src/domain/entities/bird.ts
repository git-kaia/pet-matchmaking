// domain/entities/bird.ts
/**
 * Bird Entity
 *
 * Represents an individual bird with behavioral and environmental traits.
 *
 * Responsibilities:
 * - Capture animal-specific attributes (behavior, needs, risks)
 * - Serve as the source data for matching
 *
 * This entity does not contain matching logic and is not normalized.
 * It is later transformed into a Pet model for matching.
 */

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
  sleepNeed: Level;
  flightNeed: Level;
}