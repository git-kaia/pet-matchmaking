// rule.types.ts 
/**
 * Hard Rule Types
 *
 * Defines the structure of hard rules and their results.
 *
 * Used by:
 * - Hard rule implementations
 * - Hard rule engine
 */

import { MatchingContext } from "./matching.types";

export type HardRuleResult = {
  rejected: boolean;
  reason?: string;
};

export type HardRule = (ctx: MatchingContext) => HardRuleResult;