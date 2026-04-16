// generalScoringRules.ts
/**
 * General Scoring Rules
 *
 * Contains species-independent scoring logic.
 *
 * Responsibilities:
 * - Evaluate compatibility between adopter and pet
 * - Contribute to welfare and human satisfaction scores
 *
 * These rules apply across all pet types.
 * No evaluation logic is contained here, only rule definitions.
 */

export const timeAvailabilityRule = (ctx) => {
  const time = ctx.adopter.daily_care_time;

  if (time >= 150) {
    return { type: 'welfare', value: 10 };
  }

  if (time >= 60) {
    return { type: 'welfare', value: 5 };
  }

  return { type: 'welfare', value: -10 };
};