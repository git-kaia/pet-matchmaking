// hardRule.service.ts
// Handles:
// All reject logic for general pet rules and species specific rules (if available)

export const evaluateHardRules = (ctx, rules) => {
  for (const rule of rules) {
    const result = rule(ctx);

    if (result.rejected) {
      return result;
    }
  }

  return { rejected: false };
};