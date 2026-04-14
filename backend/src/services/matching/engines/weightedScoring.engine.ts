// scoring.service.ts
// Generic scoring engine (aggregates scoring rules only)

import { MatchingContext } from '../types/matching.types';
import { ScoringRule } from '../types/scoring.types';

export const calculateScore = (
  ctx: MatchingContext,
  rules: ScoringRule[]
) => {
  let welfare_score = 0;
  let human_score = 0;

  for (const rule of rules) {
    const result = rule(ctx);

    // Defensive: skip if rule returns nothing
    if (!result) continue;

    if (result.type === 'welfare') {
      welfare_score += result.value;
    }

    if (result.type === 'human') {
      human_score += result.value;
    }
  }

  return {
    score: welfare_score + human_score,
    welfare_score,
    human_score,
  };
};