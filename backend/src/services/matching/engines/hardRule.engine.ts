// hardRule.service.ts
/**
 * Hard Rule Engine
 *
 * Executes a set of hard rules against a matching context.
 *
 * Responsibilities:
 * - Iterate through all provided hard rules
 * - Stop execution on first rejection
 * - Return rejection result if any rule fails
 *
 * This engine does not contain rule logic itself.
 */

import { MatchingContext } from '../types/matching.types';
import { HardRule, HardRuleEngineResult, HardRuleResult } from '../types/rule.types';

export const evaluateHardRules = (
  ctx: MatchingContext,
  rules: HardRule[]
): HardRuleEngineResult => {

  const results: HardRuleResult[] = [];

  for (const rule of rules) {
    const result = rule(ctx);

    results.push(result);

    if (result.rejected) {
      return {
        rejected: true,
        reason: result.reason,
        rules: results,
      };
    }
  }

  return {
    rejected: false,
    rules: results,
  };
};