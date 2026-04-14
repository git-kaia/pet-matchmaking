import { pool } from '../../../db/db';
import { Bird } from '../bird/bird.model';

const mapBird = (row: any): Bird => ({
  id: row.id,
  speciesId: row.species_id,
  name: row.name,
  ageYears: row.age_years,
  sex: row.sex,
  origin: row.origin,

  tamenessLevel: row.tameness_level,
  handlingTolerance: row.handling_tolerance,
  humanTrustLevel: row.human_trust_level,

  socialWithHumans: row.social_with_humans,
  socialWithBirds: row.social_with_birds,
  bondingStyle: row.bonding_style,

  activityLevel: row.activity_level,
  stressSensitivity: row.stress_sensitivity,

  bitingRisk: row.biting_risk,
  screamingLevel: row.screaming_level,
  featherPlucking: row.feather_plucking,
  destructiveness: row.destructiveness,
  separationAnxiety: row.separation_anxiety,

  desiredContactLevel: row.desired_contact_level,
  affectionLevel: row.affection_level,
  toleratesChildren: row.tolerates_children,
  toleratesStrangers: row.tolerates_strangers,

  requiresBirdPartner: row.requires_bird_partner,
  canLiveWithOtherBirds: row.can_live_with_other_birds,
  compatibilityWithOtherSpecies: row.compatibility_with_other_species,

  trainingLevel: row.training_level,
  trainingNeed: row.training_need,
  mentalStimulationNeed: row.mental_stimulation_need,

  noiseLevel: row.noise_level,
  screamingTime: row.screaming_time,
  noiseFrequency: row.noise_frequency
});

export const getAllBirds = async (): Promise<Bird[]> => {
  const result = await pool.query('SELECT * FROM birds');
  return result.rows.map(mapBird);
};