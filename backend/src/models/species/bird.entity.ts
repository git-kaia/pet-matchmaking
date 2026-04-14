// bird.entity.ts
// Defines types for the bird entity in db

export interface Bird {
  id: string;
  speciesId: string;

  name: string;
  ageYears: number;
  sex: 'male' | 'female';
  origin: string;

  tamenessLevel: string;
  handlingTolerance: string;
  humanTrustLevel: string;

  socialWithHumans: string;
  socialWithBirds: string;
  bondingStyle: string;

  activityLevel: string;
  stressSensitivity: string;

  bitingRisk: string;
  screamingLevel: string;
  featherPlucking: boolean;
  destructiveness: string;
  separationAnxiety: string;

  desiredContactLevel: string;
  affectionLevel: string;
  toleratesChildren: string;
  toleratesStrangers: string;

  requiresBirdPartner: boolean;
  canLiveWithOtherBirds: string;
  compatibilityWithOtherSpecies: string;

  trainingLevel: string;
  trainingNeed: string;
  mentalStimulationNeed: string;

  noiseLevel: string;
  screamingTime: string;
  noiseFrequency: string;
}