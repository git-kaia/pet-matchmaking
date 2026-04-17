// scoring.service.ts
/**
 * Scoring Engine
 *
 * Executes scoring rules and aggregates results.
 *
 * Responsibilities:
 * - Apply all scoring rules to a matching context
 * - Accumulate welfare and human scores
 * - Return total score breakdown
 *
 * This engine is generic and reusable across species.
 */

import { MatchingContext } from '../types/matching.types';
import { ScoringRule } from '../types/scoring.types';

export const calculateScore = (
  ctx: MatchingContext,
  rules: ScoringRule[]) => {
  let welfareScore = 0;
  let humanScore = 0;

  const ruleResults = [];

  for (const rule of rules) {
    const result = rule(ctx);

    if (result.type === 'welfare') {
      welfareScore += result.value;
    }

    if (result.type === 'human') {
      humanScore += result.value;
    }

    ruleResults.push(result.rule);
  }

  return {
    score: welfareScore + humanScore,
    welfareScore,
    humanScore,
    rules: ruleResults,
  };
};