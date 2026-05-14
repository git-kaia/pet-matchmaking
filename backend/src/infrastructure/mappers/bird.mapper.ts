// bird.mapper.ts
/**
 * Bird Mapper
 *
 * Transforms database rows into Bird domain entities.
 *
 * Responsibilities:
 * - Convert raw SQL rows into Bird objects
 * - Map database field names to domain properties
 * - Ensure type-safe data entering the domain layer
 *
 * This mapper only reflects the structure of stored bird data.
 * It does NOT perform any matching-related transformations.
 */

import { Bird } from '../../domain/entities/bird';

export const mapBirdFromDb = (row: any): Bird => ({
  id: row.id,
  speciesId: row.species_id,
  animalType: 'bird',

  size: row.size,
  noiseLevel: row.noise_level,
  socialNeed: row.social_need,
  affectionLevel: row.affection_level,

  experienceLevel: row.experience_level,
  lifespanYears: row.lifespan_years,

  timeRequired: row.time_required,
  messLevel: row.mess_level,
  financialBurden: row.financial_burden,

  careNeed: row.care_need,
  aggressionRisk: row.aggression_risk,
  behaviourIssues: row.behaviour_issues,

  bondingStyle: row.bonding_style,
  requiresBirdPartner: row.requires_bird_partner,

  mentalStimulationNeed: row.mental_stimulation_need,

  sleepNeed: row.sleep_need,
  flightNeed: row.flight_need,

  dietComplexity: row.diet_complexity,
});