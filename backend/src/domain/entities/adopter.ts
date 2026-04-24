// domain/entities/adopter.ts
import {
  AnimalType,
  Level,
  Level3,
  TimeLevel,
  ToleranceLevel,
  StabilityLevel,
  AllergySensitivity,
  HouseholdWorkPattern,
  KidsAge,
  BondingStyle,
  InteractionLevel,
} from '../types/common.types';

export interface Adopter {
  id: string;

  // Household basics
  spaceLevel: Level3;
  householdType: string;
  kidsAge: KidsAge;

  hasCurrentPets: boolean;
  typeOfPet: AnimalType[];

  householdNoiseLevel: Level;

  householdWorkPattern: HouseholdWorkPattern;
  householdWorkHours: string;

  // Core matching inputs
  dailyCareTime: number;
  aloneTimeHours: TimeLevel;

  cleaningTolerance: ToleranceLevel;
  noiseToleranceLevel: Level;

  householdAllergySensitivity: AllergySensitivity;

  lifeStability: StabilityLevel;
  commitmentHorizonYears: number;

  rehomeResponsibilityLevel: Level3;
  financialPriority: Level3;

  hasPetExperience: boolean;
  learningWillingness: Level3;

  experienceYears: Partial<Record<AnimalType, number>>;

  desiredPetSociability: Level;
  desiredPetAffectionLevel: Level;
  desiredHumanInteraction: InteractionLevel;

  problemBehaviorTolerance: Level3;

  // Bird-related preferences (optional but included for now)
  sleepEnvironmentCommitment: Level3;
  freeFlightExpectation: Level;
  freeRoamingTolerance: Level3;

  messTolerance: Level3;
  destructionTolerance: Level3;

  desiredBondingStyle: BondingStyle;
  birdOverHumanAcceptance: Level3;

  tamenessRequirement: Level3;
  adoptionComplexityTolerance: Level3;

  willingnessMultipleBirds: Level3;

  noiseSensitivityTime: Level3;
  suddenNoiseTolerance: Level3;

  enrichmentCommitment: Level3;
  trainingInterest: Level3;

  dietComplexityTolerance: Level3;

  specificAnimalAllergies: AnimalType[];
}