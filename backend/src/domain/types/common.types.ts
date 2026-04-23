// common.types.ts
/**
 * Global Domain Types
 * Used for all parts of the backend
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

export type TimeLevel = 'low' | 'medium' | 'high';

export type ToleranceLevel = 'low' | 'medium' | 'high';

export type StabilityLevel = 'low' | 'medium' | 'high';

export type HouseholdWorkPattern =
  | 'full_time'
  | 'part_time'
  | 'flexible';

export type KidsAge =
  | 'none'
  | 'under_ten'
  | 'over_ten';

/////////////////////////////
// Pet values              //
/////////////////////////////

export type BondingStyle =
  | 'one_person'
  | 'multiple_people'
  | 'independent';

export type AggressionRisk =
  | 'low'
  | 'medium'
  | 'high';