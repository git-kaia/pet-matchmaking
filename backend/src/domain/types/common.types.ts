// common.types.ts
/**
 * Common Domain Types
 *
 * Defines shared value types used across the entire system.
 *
 * Responsibilities:
 * - Provide a consistent vocabulary (e.g. Level, AnimalType)
 * - Ensure type safety across domain, services, and infrastructure
 * - Avoid duplication of common enums and value sets
 *
 * These types should be reusable and independent of any specific feature.
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

export type AllergySensitivity =
  | 'none'
  | 'mild'
  | 'specific_animal_allergy'
  | 'respiratory_sensitivity';

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

