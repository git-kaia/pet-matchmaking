// weightedScoring.service.ts
// Handles:
// Weighted scoring aggregator calculating scores (no matching rules here).

import { MatchingContext } from './types/matching.types';

// Aggregator for genrral pet scoring
export const calculateGeneralScore = (ctx) => {
  let welfare_score = 0;
  let human_score = 0;

  // 
  for (const rule of rules) {
    const result = rule(ctx);

    welfare_score += result.welfare || 0;
    human_score += result.human || 0;
  }

  return {
    score: welfare_score + human_score,
    welfare_score,
    human_score,
  };
};