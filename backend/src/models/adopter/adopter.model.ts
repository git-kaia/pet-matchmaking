// adopter.model.ts

export interface Adopter {
  id: string;

  spaceLevel: string;
  householdType: string;
  kidsAge: string;

  hasCurrentPets: boolean;
  typeOfPet: string[];

  householdNoiseLevel: string;

  householdWorkPattern: string;
  householdWorkHours: string;

  dailyCareTime: number;
  aloneTimeHours: string;

  cleaningTolerance: string;
  noiseToleranceLevel: string;

  householdAllergySensitivity: string;

  lifeStability: string;
  commitmentHorizonYears: number;

  rehomeResponsibilityLevel: string;
  financialPriority: string;

  hasPetExperience: boolean;
  learningWillingness: string;

  petExperienceType: string[];
  experienceYearsBird: number;

  desiredPetSociability: string;
  desiredPetAffectionLevel: string;
  desiredHumanInteraction: string;
  problemBehaviorTolerance: string;

  sleepEnvironmentCommitment: string;
  freeFlightExpectation: string;
  freeRoamingTolerance: string;

  messTolerance: string;
  destructionTolerance: string;

  desiredBondingStyle: string;
  birdOverHumanAcceptance: string;

  tamenessRequirement: string;
  adoptionComplexityTolerance: string;

  willingnessMultipleBirds: string;

  noiseSensitivityTime: string;
  suddenNoiseTolerance: string;

  enrichmentCommitment: string;
  trainingInterest: string;

  dietComplexityTolerance: string;
}