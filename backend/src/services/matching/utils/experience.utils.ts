// experience.utils.ts

import { MatchingContext } from '../types/matching.types';

/////////////////////////////
// EXPERIENCE HELPERS      //
/////////////////////////////

/**
 * Returns years of experience for the specific pet type
 */
export const getExperienceYears = (ctx: MatchingContext): number => {
  const petType = ctx.pet.animalType;
  return ctx.adopter.experienceYears?.[petType] ?? 0;
};

/**
 * Returns whether adopter has experience with this pet type
 */
export const hasExperienceForPet = (ctx: MatchingContext): boolean => {
  return getExperienceYears(ctx) > 0;
};

/**
 * Maps experience years → experience level (0–3 scale)
 */
export const getExperienceLevel = (years: number): number => {
  if (years >= 10) return 3; // advanced
  if (years >= 5) return 2;  // experienced
  if (years >= 2) return 1;  // intermediate
  return 0;                  // beginner
};