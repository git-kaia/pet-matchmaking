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

import { MatchingContext } from './matching.types';

// Used for result execution
export type ScoringRuleResult = {
  scoreType: 'welfare' | 'human';
  value: number;

  rule: {
    ruleName: string;
    description: string;
  };
};

export type ScoringRule = (ctx: MatchingContext) => ScoringRuleResult;