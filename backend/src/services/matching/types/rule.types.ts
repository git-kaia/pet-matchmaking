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

import { MatchingContext } from './matching.types';

// For use in hardRules
export type HardRuleResult = {
  ruleName: string;
  rejected: boolean;
  reason?: string;

  adopterSnapshot?: Record<string, any>;
  petSnapshot?: Record<string, any>;
};

// For use in hardRule.engine
export type HardRuleEngineResult = {
  rejected: boolean;
  reason?: string;
  rules: HardRuleResult[];
};

export type HardRule = (ctx: MatchingContext) => HardRuleResult;

////////////////////////////////////////////////////////////

