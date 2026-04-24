// matching.types.ts
/**
 * Matching Types
 * Used for matching logic
 */

// Import from global (domain) types
import { Pet } from '../../../domain/types/pet.';
import { Adopter } from '../../../domain/entities/adopter';


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