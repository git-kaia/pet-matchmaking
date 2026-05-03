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

  const ruleResults: any[] = [];

  for (const rule of rules) {
    const result = rule(ctx);

    if (result.scoreType === 'welfare') {
      welfareScore += result.value;
    }

    if (result.scoreType === 'human') {
      humanScore += result.value;
    }

    ruleResults.push({
      ruleName: typeof result.rule === 'string'
        ? result.rule
        : result.rule?.ruleName ?? 'unknown_rule',

      scoreType: result.scoreType,
      value: result.value,
    });

    if (!result || !result.rule || !result.rule.ruleName) {
      throw new Error('Invalid scoring rule result detected');
    }

    ruleResults.push({
      ruleName: result.rule.ruleName,
      scoreType: result.scoreType,
      value: result.value,
    });

  }

  return {
    score: welfareScore + humanScore,
    welfareScore,
    humanScore,
    rules: ruleResults,
  };
};