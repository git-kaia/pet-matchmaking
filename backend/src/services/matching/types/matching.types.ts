// matching.types.ts
/**
 * Matching Types (Domain Models)
 */

export type Level = 'very_low' | 'low' | 'medium' | 'high' | 'very_high';

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
  dietComplexity?: Level;
  aggressionRisk?: 'low' | 'medium' | 'high';
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

  // bird-specific preferences
  desiredHumanInteraction: Level;
  willingnessMultipleBirds: 'low' | 'medium' | 'high';
};

////////////////////////////////////////////////////////////

export type MatchResult = {
  petId: string;

  score: number;
  welfareScore: number;
  humanScore: number;

  rejected: boolean;
  rejectionReason?: string;

  rules?: RuleResult[];
};

/////////////////////////////////////////////////////////////

export type RuleResult = {
  ruleName: string;
  ruleType: 'hard_rule' | 'welfare' | 'human';

  value: number;
  description: string;
};

////////////////////////////////////////////////////////////

export type MatchingContext = {
  adopter: Adopter;
  pet: Pet;
};

////////////////////////////////////////////////////////////

export type Species =
  | 'bird'
  | 'dog'
  | 'cat'
  | 'rodent'
  | 'reptile'
  | 'amphibian'
  | 'fish';