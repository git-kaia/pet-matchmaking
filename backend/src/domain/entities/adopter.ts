// domain/entities/adopter.ts

import { AllergySensitivity, AnimalType, Level, StabilityLevel, TimeLevel, ToleranceLevel } from "../types/common.types";

export interface Adopter {
  id: string;

  dailyCareTime: number;
  aloneTimeHours: TimeLevel;

  noiseToleranceLevel: Level;
  cleaningTolerance: ToleranceLevel;

  lifeStability: StabilityLevel;
  commitmentHorizonYears: number;

  hasPetExperience: boolean;
  experienceYears: {
    bird?: number;
    dog?: number;
  };

  learningWillingness?: 'low' | 'medium' | 'high';

  desiredPetSociability: Level;
  desiredPetAffectionLevel: Level;

  problemBehaviorTolerance?: 'low' | 'medium' | 'high';

  householdAllergySensitivity: AllergySensitivity;

  // household context
  hasCurrentPets?: boolean;
  typeOfPet?: AnimalType[];
  kidsAge?: 'none' | 'under_ten' | 'over_ten';

  // bird-specific preferences
  desiredHumanInteraction?: Level;
  willingnessMultipleBirds?: 'low' | 'medium' | 'high';
  adoptionComplexityTolerance?: 'low' | 'medium' | 'high';
}