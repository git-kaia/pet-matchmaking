import { Bird } from '../types/matching.types';

export const mapBirdFromDB = (birdRow: any, speciesRow: any): Bird => {
  return {
    id: birdRow.id,

    species: 'bird',

    size: speciesRow.size,
    noise_level: speciesRow.noise_level,
    activity_level: birdRow.activity_level,

    social_need: speciesRow.social_need,
    affection_level: birdRow.affection_level,

    experience_level: speciesRow.experience_level,
    lifespan_years: speciesRow.lifespan_years,

    requires_bird_partner: birdRow.requires_bird_partner,
  };
};