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
import { Pet } from './pet';

export interface Bird extends Pet{
  id: string;
  speciesId: string;
  animalType: 'bird';

  // Social behavioral traits
  bondingStyle: BondingStyle;
  requiresBirdPartner: boolean;

  // Cognitive / training
  mentalStimulationNeed: Level;

  // Environment
  sleepNeed: Level;
  flightNeed: Level;

  // Diet
  dietComplexity: Level3;
}