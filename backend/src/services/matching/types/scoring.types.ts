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

export type ScoringResult = {
  type: 'welfare' | 'human';
  value: number;
};

export type ScoringRule = (ctx: MatchingContext) => ScoringResult;