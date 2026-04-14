// scoring.types.ts
// Types for scoring
// Used by scoring logic

import { MatchingContext } from './matching.types';

export type ScoringResult = {
  type: 'welfare' | 'human';
  value: number;
};

export type ScoringRule = (ctx: MatchingContext) => ScoringResult;