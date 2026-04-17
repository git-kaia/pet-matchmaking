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