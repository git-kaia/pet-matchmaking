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

export type RuleType = "hard_rule" | "welfare" | "human";

export type Rule = {
  ruleName: string;
  ruleType: RuleType;
  value: number;
  description: string;
};

////////////////////////////////////////////////////////////

import { MatchingContext, RuleResult } from './matching.types';

export type HardRuleResult = {
  rejected: boolean;
  rule?: RuleResult;
};

export type HardRule = (ctx: MatchingContext) => HardRuleResult;

////////////////////////////////////////////////////////////

