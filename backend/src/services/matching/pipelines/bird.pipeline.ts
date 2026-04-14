// bird.service.ts
// 

const hardRules = [...generalHardRules, ...birdHardRules];
const scoringRules = [...generalWeightedRules, ...birdWeightedRules];

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