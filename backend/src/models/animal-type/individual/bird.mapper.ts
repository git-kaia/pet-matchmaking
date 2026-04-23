// bird.mapper.ts
import { Bird } from './bird.model';

export const mapBirdFromDB = (row: any): Bird => ({
  id: row.id,
  species: 'bird',

  size: row.size,

  noiseLevel: row.noise_level,
  activityLevel: row.activity_level,

  socialNeed: row.social_with_humans,
  affectionLevel: row.affection_level,

  experienceLevel: row.training_level,

  lifespanYears: row.lifespan_years,

  requiresBirdPartner: row.requires_bird_partner,
});