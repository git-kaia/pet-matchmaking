// birdToPet.mapper.ts
import { Bird } from './bird.model';
import { Pet } from '../../../services/matching/types/matching.types';

export const mapBirdToPet = (bird: Bird, species: any): Pet => ({
  id: bird.id,
  species: 'bird',

  size: species.size,

  noiseLevel: bird.noiseLevel,
  activityLevel: bird.activityLevel,

  socialNeed: bird.socialWithHumans,
  affectionLevel: bird.affectionLevel,

  experienceLevel: species.experience_level,

  lifespanYears: species.lifespan_years,

  timeRequired: 120, // temporary default (or from species later)
});