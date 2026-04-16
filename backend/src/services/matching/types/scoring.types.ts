// scoring.types.ts
/**
 * Scoring Rule Types
 *
 * Defines the structure of scoring rules and scoring outputs.
 *
 * Used by:
 * - Scoring rule implementations
 * - Scoring engine
 */

import { MatchingContext, RuleResult } from './matching.types';

export type ScoringRuleResult = {
  type: 'welfare' | 'human';
  value: number;
  rule: RuleResult;
};

export type ScoringRule = (ctx: MatchingContext) => ScoringRuleResult;