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
  // Base
  id: row.id,
  speciesId: row.species_id,
  animalType: 'bird',

  // ----- Pet (shared attributes) -----
  size: row.size,

  noiseLevel: row.noise_level,
  activityLevel: row.activity_level,
  socialNeed: row.social_need,
  affectionLevel: row.affection_level,

  experienceLevel: row.experience_level,
  lifespanYears: row.lifespan_years,
  timeRequired: row.time_required,

  messLevel: row.mess_level,
  financialBurden: row.financial_burden,

  careNeed: row.care_need,
  aggressionRisk: row.aggression_risk,

  // ----- Bird-specific -----
  socialWithHumans: row.social_with_humans,
  socialWithBirds: row.social_with_birds,
  bondingStyle: row.bonding_style,

  bitingRisk: row.biting_risk,
  screamingLevel: row.screaming_level,
  destructiveness: row.destructiveness,
  separationAnxiety: row.separation_anxiety,

  toleratesChildren: row.tolerates_children,
  toleratesStrangers: row.tolerates_strangers,

  requiresBirdPartner: row.requires_bird_partner,
  canLiveWithOtherBirds: row.can_live_with_other_birds,

  trainingLevel: row.training_level,
  mentalStimulationNeed: row.mental_stimulation_need,

  sleepNeed: row.sleep_need,
  flightNeed: row.flight_need,
});