// birdSpecies.model.ts
export interface BirdSpecies {
  id: string;

  size: 'small' | 'medium' | 'large' | 'very_large';

  noiseLevel: Level;
  activityLevel: Level;
  socialNeed: Level;
  affectionLevel: Level;

  experienceLevel: 'beginner' | 'intermediate' | 'experienced' | 'advanced';

  lifespanYears: number;

  timeRequired?: number;
}