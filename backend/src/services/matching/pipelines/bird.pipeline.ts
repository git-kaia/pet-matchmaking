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

const hardRules = [...generalHardRules, ...birdHardRules];
const scoringRules = [...generalScoringRules, ...birdScoringRules];

for (const bird of birds) {
  const ctx = { adopter, pet: bird };

  // 1. HARD RULES
  const rejection = evaluateHardRules(ctx, hardRules);

  if (rejection.rejected) {
    results.push({
      pet_id: bird.id,
      score: 0,
      welfare_score: 0,
      human_score: 0,
      rejected: true,
      rejection_reason: rejection.reason,
    });
    continue;
  }

  // 2. SCORING
  const score = calculateScore(ctx, scoringRules);

  results.push({
    pet_id: bird.id,
    ...score,
    rejected: false,
  });
}