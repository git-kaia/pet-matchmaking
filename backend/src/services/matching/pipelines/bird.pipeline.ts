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

import { MatchingContext, MatchResult } from '../types/matching.types';
import { Adopter } from '../../../domain/entities/adopter';
import { Bird } from '../../../domain/entities/bird';

import { evaluateHardRules } from '../engines/hardRule.engine';
import { calculateScore } from '../engines/scoring.engine';

import { generalHardRules } from '../rules/general/generalHardRules';
import { generalScoringRules } from '../rules/general/generalScoringRules';

import { birdHardRules } from '../rules/animal-type/bird/birdHardRules';
import { birdScoringRules } from '../rules/animal-type/bird/birdScoringRules';

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

  // Apply hard rules using engine
  const hardRuleResult = evaluateHardRules(ctx, hardRules);

  if (hardRuleResult.rejected) {
    return {
      petId: pet.id,
      score: 0,
      welfareScore: 0,
      humanScore: 0,
      rejected: true,
      rejectionReason: hardRuleResult.reason,
      rules: [],
    };
  }

  //  Apply scoring rules using engine
  const scoringResult = calculateScore(ctx, scoringRules);

  return {
    petId: pet.id,
    score: scoringResult.score,
    welfareScore: scoringResult.welfareScore,
    humanScore: scoringResult.humanScore,
    rejected: false,
    rules: scoringResult.rules,
  };
};