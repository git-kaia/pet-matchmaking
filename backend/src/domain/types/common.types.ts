// common.types.ts
/**
 * Global Domain Types
 * Used for all parts of the backend
 */

/**
 * Global Domain Types
 * Shared vocabulary across the system
 */

/**
 * Global Domain Types
 * Shared vocabulary across the system
 */

/////////////////////////////
// Animal classification   //
/////////////////////////////

export type AnimalType =
  | 'bird'
  | 'dog'
  | 'cat'
  | 'rodent'
  | 'reptile'
  | 'amphibian'
  | 'fish';

/////////////////////////////
// Core scales / levels    //
/////////////////////////////

export type Level =
  | 'very_low'
  | 'low'
  | 'medium'
  | 'high'
  | 'very_high';

export type Level3 = 'low' | 'medium' | 'high';

export type ExperienceLevel =
  | 'beginner'
  | 'intermediate'
  | 'experienced'
  | 'advanced';

/////////////////////////////
// Adopter values          //
/////////////////////////////

export type AllergySensitivity =
  | 'none'
  | 'mild'
  | 'specific_animal_allergy'
  | 'respiratory_sensitivity';

export type TimeLevel = Level3;
export type ToleranceLevel = Level3;
export type StabilityLevel = Level3;

export type HouseholdWorkPattern =
  | 'full_time'
  | 'part_time'
  | 'flexible';

export type KidsAge =
  | 'none'
  | 'under_ten'
  | 'over_ten';

/////////////////////////////
// Preferences / behavior  //
/////////////////////////////

export type BondingStyle =
  | 'one_person'
  | 'multiple_people'
  | 'independent';

export type InteractionLevel = Level3;

export type CommitmentLevel = Level3;

/////////////////////////////
// Pet values              //
/////////////////////////////

export type AggressionRisk = Level3;