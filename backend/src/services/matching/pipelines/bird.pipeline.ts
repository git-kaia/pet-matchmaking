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
  pets: Bird[],
  deps?: {
    hardRules: any[];
    scoringRules: any[];
  }
): MatchResult[] => {

const hardRules = deps?.hardRules ?? [...generalHardRules, ...birdHardRules];
const scoringRules = deps?.scoringRules ?? [...generalScoringRules, ...birdScoringRules];

  const results: MatchResult[] = [];

  for (const pet of pets) {
    const ctx: MatchingContext = { adopter, pet };

    const rejection = evaluateHardRules(ctx, hardRules);

    if (rejection.rejected) {
      results.push({
        pet_id: pet.id,
        score: 0,
        welfare_score: 0,
        human_score: 0,
        rejected: true,
        rejection_reason: rejection.rule?.description,
        rules: rejection.rule ? [rejection.rule] : [],
      });
      continue;
    }

    const score = calculateScore(ctx, scoringRules);

    results.push({
      pet_id: pet.id,
      ...score,
      rejected: false,
    });
  }

  return results.sort((a, b) => b.score - a.score);
};