// matching.types.ts
/**
 * Matching Types
 * Used for matching logic
 */

// Import from global (domain) types
import { Pet } from '../../../domain/entities/pet';
import { Adopter } from '../../../domain/entities/adopter';

import { HardRuleResult } from './rule.types';
import { ScoringRuleResult } from './scoring.types';


///////////////////////////////////////////
// Types for matching context and result //
///////////////////////////////////////////

type RuleExecutionResult =
  | ScoringRuleResult
  | HardRuleResult;

export type MatchResult = {
  petId: string;

  score: number;
  welfareScore: number;
  humanScore: number;

  rejected: boolean;
  rejectionReason?: string;

  rules: any[];
  // rules?: RuleExecutionResult[];
};



export type MatchingContext = {
  adopter: Adopter;
  pet: Pet;
};