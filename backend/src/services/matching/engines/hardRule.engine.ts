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

export const evaluateHardRules = (ctx, rules) => {
  for (const rule of rules) {
    const result = rule(ctx);

    if (result.rejected) {
      return result;
    }
  }

  return { rejected: false };
};