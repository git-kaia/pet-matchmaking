// matching.types.ts
/**
 * Matching Types
 * Used for matching logic
 */

// Import from global (domain) types
import {
  Level,
  Species,
  ExperienceLevel,
  AllergySensitivity
} from '../../../domain/types/common.types';

///////////////////////////////////////////////////////////////

export type Pet = {
  id: string;

  species: Species;

  size: 'small' | 'medium' | 'large' | 'very_large';

  noiseLevel: Level;
  activityLevel: Level;
  socialNeed: Level;
  affectionLevel: Level;

  experienceLevel: 'beginner' | 'intermediate' | 'experienced' | 'advanced';

  lifespanYears: number;

  // generic needs (used in general logic)
  careNeed?: Level;
  // dietComplexity?: Level;
  aggressionRisk?: 'low' | 'medium' | 'high';
  sleepNeed?: Level;
  flightNeed?: Level;
};

/////////////////////////////////////////////////////////////

export type Bird = Pet & {
  species: 'bird';
  requiresBirdPartner: boolean;
};

////////////////////////////////////////////////////////////

export type Adopter = {
  id: string;

  dailyCareTime: number;

  householdAllergySensitivity:
    | 'none'
    | 'mild'
    | 'specific_animal_allergy'
    | 'respiratory_sensitivity';

  specificAnimalAllergies?: Species[];

  // keep 3-level (represents time buckets, not intensity)
  aloneTimeHours: 'low' | 'medium' | 'high';

  noiseToleranceLevel: Level;
  cleaningTolerance: 'low' | 'medium' | 'high';

  lifeStability: 'low' | 'medium' | 'high';
  commitmentHorizonYears: number;

  hasPetExperience: boolean;

  experienceYears: {
    bird?: number;
    dog?: number;
  };

  desiredPetSociability: Level;
  desiredPetAffectionLevel: Level;

  problemBehaviorTolerance: 'low' | 'medium' | 'high';

  householdWorkPattern?: 'full_time' | 'part_time' | 'flexible';
  hasCurrentPets?: boolean;
  typeOfPet?: Species[];
  kidsAge?: 'none' | 'under_ten' | 'over_ten';

  freeFlightExpectation?: Level;
  sleepEnvironmentCommitment?: Level;
  willingnessMultipleBirds?: 'low' | 'medium' | 'high';
  desiredHumanInteraction?: Level;
  adoptionComplexityTolerance?: 'low' | 'medium' | 'high';

};


///////////////////////////////////////////
// Types for matching context and result //
///////////////////////////////////////////

export type MatchResult = {
  petId: string;

  score: number;
  welfareScore: number;
  humanScore: number;

  rejected: boolean;
  rejectionReason?: string;

  rules?: RuleResult[];
};

export type RuleResult = {
  ruleName: string;
  passed: boolean;
  reason: string;

  adopter: Record<string, any>;
  pet: Record<string, any>;
};

export type MatchingContext = {
  adopter: Adopter;
  pet: Pet;
};