// bird.pipeline.ts
/**
 * Bird Matching Pipeline
 *
 * Executes the full matching process for bird-type pets.
 *
 * Responsibilities:
 * - Create matching context (adopter + pet)
 * - Apply hard rules (reject invalid matches)
 * - Apply scoring rules (rank valid matches)
 * - Aggregate and sort results
 *
 * This defines the sequence of evaluation steps for birds.
 */

import { MatchingContext, MatchResult, Adopter, Bird } from "../types/matching.types";

import { evaluateHardRules } from "../engines/hardRule.engine";
import { calculateScore } from "../engines/scoring.engine";

import { generalHardRules } from "../rules/general/generalHardRules";
import { generalScoringRules } from "../rules/general/generalScoringRules";

import { birdHardRules } from "../rules/animal-type/bird/birdHardRules";
import { birdScoringRules } from "../rules/animal-type/bird/birdScoringRules";

export const runBirdPipeline = (
  adopter: Adopter,
  pet: Bird,
  deps?: {
    hardRules: any[];
    scoringRules: any[];
  }
): MatchResult => {

  const hardRules = deps?.hardRules ?? [...generalHardRules, ...birdHardRules];
  const scoringRules = deps?.scoringRules ?? [...generalScoringRules, ...birdScoringRules];

  const ctx: MatchingContext = { adopter, pet };

  const rejection = evaluateHardRules(ctx, hardRules);

  if (rejection.rejected) {
    return {
      petId: pet.id,
      score: 0,
      welfareScore: 0,
      humanScore: 0,
      rejected: true,
      rejectionReason: rejection.rule?.description,
      rules: rejection.rule
        ? [{
            ruleName: rejection.rule.ruleName,
            ruleType: rejection.rule.ruleType,
            value: rejection.rule.value,
            description: rejection.rule.description,
          }]
        : [],
    };
  }

  const score = calculateScore(ctx, scoringRules);

  return {
    petId: pet.id,
    score: score.score,
    welfareScore: score.welfareScore,
    humanScore: score.humanScore,
    rejected: false,
    rules: [],
  };
};