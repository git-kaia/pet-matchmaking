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

import { birdHardRules } from "../rules/species/bird/birdHardRules";
import { birdScoringRules } from "../rules/species/bird/birdScoringRules";

export const runBirdPipeline = (
  adopter: Adopter,
  pets: Bird[]
): MatchResult[] => {

  const hardRules = [...generalHardRules, ...birdHardRules];
  const scoringRules = [...generalScoringRules, ...birdScoringRules];

  const results: MatchResult[] = [];

  for (const pet of pets) {
    const ctx: MatchingContext = { adopter, pet };

    const rejection = evaluateHardRules(ctx, hardRules);

    if (rejection.rejected) {
      results.push({
        petId: pet.id,
        score: 0,
        welfareScore: 0,
        humanScore: 0,
        rejected: true,
        rejectionReason: rejection.rule?.description,

        rules: rejection.rule
          ? [{
              ruleName: rejection.rule.rule_name ?? rejection.rule.ruleName,
              ruleType: rejection.rule.rule_type ?? rejection.rule.ruleType,
              value: rejection.rule.value,
              description: rejection.rule.description,
            }]
          : [],
      });
      continue;
    }

    const score = calculateScore(ctx, scoringRules);

    results.push({
      petId: pet.id,
      score: score.score,
      welfareScore: score.welfareScore,
      humanScore: score.humanScore,
      rejected: false,
      rules: [],
    });
  }

  return results.sort((a, b) => b.score - a.score);
};