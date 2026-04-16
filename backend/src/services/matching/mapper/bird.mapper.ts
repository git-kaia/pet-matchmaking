import { Bird } from '../types/matching.types';

export const mapBirdFromDB = (birdRow: any, speciesRow: any): Bird => {
  return {
    id: birdRow.id,

    species: 'bird',

    size: speciesRow.size,

    noiseLevel: speciesRow.noise_level,
    activityLevel: speciesRow.activity_level,

    socialNeed: speciesRow.social_need,
    affectionLevel: birdRow.affection_level,

    experienceLevel: speciesRow.experience_level,
    lifespanYears: speciesRow.lifespan_years,

    requiresBirdPartner: birdRow.requires_bird_partner,
  };
};