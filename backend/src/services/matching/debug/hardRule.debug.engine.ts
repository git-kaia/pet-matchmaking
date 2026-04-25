// hardRule.debug.engine.ts

/**
 * Hard Rule Debug Engine
 *
 * Executes hard rules with detailed output for inspection.
 *
 * Responsibilities:
 * - Iterate through all provided hard rules
 * - Execute each rule against a matching context
 * - Collect pass/fail results for each rule
 * - Capture reasons and snapshots (adopter + pet)
 * - Track the first rejection and its reason
 *
 * This engine is used for debugging and testing.
 * It provides visibility into rule behavior but is not part of the production matching flow.
 */

import { MatchingContext } from '../types/matching.types';
import { HardRule } from '../types/rule.types';

export const evaluateHardRulesDetailed = (
  ctx: MatchingContext,
  rules: HardRule[]
) => {
  const results = [];

  let rejected = false;
  let rejectionReason = '';

  for (const rule of rules) {
    const result = rule(ctx);

    results.push({
      rule: result.ruleName,
      passed: !result.rejected,
      reason: result.reason || 'Passed',
      adopter: result.adopterSnapshot || {},
      pet: result.petSnapshot || {},
    });

    if (result.rejected && !rejected) {
      rejected = true;
      rejectionReason = result.reason || 'Rejected';
    }
  }

  return {
    rejected,
    rejectionReason,
    rules: results,
  };
};