// bird.mapper.ts
// Converting raw db rows to Bird entities for matching logic and other business logic use

import { BirdEntity } from './bird.model';
import { Bird } from '../../services/matching/types';

export const mapBirdToMatching = (bird: BirdEntity): Bird => ({
  id: bird.id,

  size: 'medium', // example mapping

  noise_level: mapNoise(bird.noiseLevel),
  activity_level: mapActivity(bird.activityLevel),

  social_need: mapSocial(bird.socialWithHumans),
  affection_level: mapAffection(bird.affectionLevel),

  experience_level: mapExperience(bird.trainingLevel),

  lifespan_years: 20,

  requires_bird_partner: bird.requiresBirdPartner,
});