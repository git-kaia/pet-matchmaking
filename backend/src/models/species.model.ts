export interface Species {
  id: string;
  norwegianName: string;
  latinName: string;

  size: string;
  noiseLevel: string;
  noiseFrequency: string;

  activityLevel: string;
  socialNeed: string;
  mentalStimulationNeed: string;
  trainingNeed: string;

  affectionLevel: string;
  dietComplexity: string;

  sleepNeedHours: number;
  requiresDarknessLevel: string;

  experienceLevel: string;
  spaceRequirement: string;

  lifespanYears: number;
}