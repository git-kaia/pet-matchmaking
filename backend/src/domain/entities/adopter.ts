// domain/entities/adopter.ts
/**
 * Adopter Entity
 *
 * Represents a user looking to adopt a pet.
 *
 * Responsibilities:
 * - Store adopter preferences, constraints, and lifestyle factors
 * - Provide input data for the matching engine
 *
 * This entity reflects real-world adopter characteristics and is used
 * directly in matching logic.
 */

import {
  AnimalType,
  Level,
  Level3,
  AllergySensitivity,
  HouseholdWorkPattern,
  KidsAge,
  BondingStyle,
} from '../types/common.types';

export interface Adopter {
  id: string;

  // Household basics
  kidsAge: KidsAge;

  hasCurrentPets: boolean;
  typeOfPet: AnimalType[];
  householdWorkPattern: HouseholdWorkPattern;

  // Core matching inputs
  dailyCareTime: number;
  aloneTimeHours: Level3;

  cleaningTolerance: Level3;
  noiseToleranceLevel: Level;

  householdAllergySensitivity: AllergySensitivity;

  lifeStability: Level3;
  commitmentHorizonYears: number;

  financialPriority: Level3;

  learningWillingness: Level3;

  experienceYears: Partial<Record<AnimalType, number>>;

  desiredPetSociability: Level;
  desiredPetAffectionLevel: Level;

  problemBehaviorTolerance: Level3;

  // Bird-related preferences (optional but included for now)
  desiredHumanInteraction: Level3;
  sleepEnvironmentCommitment: Level3;
  freeFlightExpectation: Level;

  desiredBondingStyle: BondingStyle;
  adoptionComplexityTolerance: Level3;

  willingnessMultipleBirds: Level3;

  enrichmentCommitment: Level3;
  trainingInterest: Level3;

  dietComplexityTolerance: Level3;

  specificAnimalAllergies: AnimalType[];
}