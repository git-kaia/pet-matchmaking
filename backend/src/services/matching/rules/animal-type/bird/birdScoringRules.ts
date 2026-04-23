// birdScoringRules.ts
/**
 * Bird Scoring Rules
 *
 * Contains species-specific scoring logic for birds.
 *
 * Responsibilities:
 * - Evaluate compatibility between adopter and bird
 * - Contribute to welfare and human satisfaction scores
 *
 * These rules apply across all pet types.
 * No evaluation logic is contained here, only rule definitions.
 */

import { ScoringRule } from '../../../types/scoring.types';
import { Pet } from '../../../../../domain/entities/pet';

// How to implement bird specific type:
// if (ctx.pet.animalType !== 'bird') return;
// const bird = ctx.pet;

// 01. Social Needs Rule (Bird-specific)
export const birdSocialNeedsRule: ScoringRule = (ctx) => {
  const bird = ctx.pet as Bird;

  const socialNeed = bird.social_need;
  const humanInteraction = ctx.adopter.desired_human_interaction;
  const multipleBirds = ctx.adopter.willingness_multiple_birds;

  // Case 1: VERY HIGH NEED + LOW EVERYTHING → BIG PENALTY
  if (
    socialNeed === 'very_high' &&
    humanInteraction === 'low' &&
    multipleBirds === 'low'
  ) {
    return {
      type: 'welfare',
      value: -15,
      rule: {
        rule_name: 'birdSocialNeeds',
        rule_type: 'welfare',
        value: -15,
        description:
          'Very social bird but adopter provides low interaction and no flock support',
      },
    };
  }

  // Case 2: HIGH NEED + LOW INTERACTION → MEDIUM PENALTY
  if (
    socialNeed === 'high' &&
    humanInteraction === 'low'
  ) {
    return {
      type: 'welfare',
      value: -10,
      rule: {
        rule_name: 'birdSocialNeeds',
        rule_type: 'welfare',
        value: -10,
        description:
          'Social bird with insufficient human interaction',
      },
    };
  }

  // Default → no penalty
  return {
    type: 'welfare',
    value: 0,
    rule: {
      rule_name: 'birdSocialNeeds',
      rule_type: 'welfare',
      value: 0,
      description: 'Social needs are adequately supported',
    },
  };
};

export const birdScoringRules = [
  birdSocialNeedsRule,
];