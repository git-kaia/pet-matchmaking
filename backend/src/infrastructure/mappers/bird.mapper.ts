// bird.mapper.ts
import { Bird } from '../../domain/entities/bird';

export const mapBirdFromDb = (row: any): Bird => ({
  id: row.id,
  speciesId: row.species_id,

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

  activityLevel: row.activity_level,
  noiseLevel: row.noise_level,
  affectionLevel: row.affection_level,
  sleepNeed: row.sleep_need,
  flightNeed: row.flight_need,
});